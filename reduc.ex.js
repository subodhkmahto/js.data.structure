// ========== SAMPLE DATA ==========
const orders = [
  { id:1, user:"U1", ts:"2025-01-05T10:00:00Z", items:[{name:"Laptop", price:80000, qty:1},{name:"Mouse", price:1000, qty:1}], payment:"card", location:"IN" },
  { id:2, user:"U2", ts:"2025-01-05T11:00:00Z", items:[{name:"Laptop", price:80000, qty:1}], payment:"card", location:"IN" },
  { id:3, user:"U1", ts:"2025-02-01T09:00:00Z", items:[{name:"Phone", price:40000, qty:1}], payment:"upi", location:"IN" },
  { id:4, user:"U3", ts:"2025-02-01T09:05:00Z", items:[{name:"Phone", price:40000, qty:1},{name:"Case", price:500, qty:1}], payment:"card", location:"PK" },
  { id:5, user:"U2", ts:"2025-02-10T15:00:00Z", items:[{name:"Mouse", price:1000, qty:2}], payment:"card", location:"IN" },
  { id:6, user:"U4", ts:"2025-03-03T12:00:00Z", items:[{name:"Book", price:600, qty:5}], payment:"card", location:"IN" },
  { id:7, user:"U1", ts:"2025-03-04T08:00:00Z", items:[{name:"Headphones", price:3000, qty:1}], payment:"card", location:"IN" },
  { id:8, user:"U5", ts:"2025-03-04T08:01:00Z", items:[{name:"Phone", price:41000, qty:1}], payment:"card", location:"IN" },
  { id:9, user:"U3", ts:"2025-03-04T08:02:00Z", items:[{name:"Laptop", price:82000, qty:1}], payment:"card", location:"RU" }, // unusual location
  { id:10,user:"U2", ts:"2025-03-05T14:00:00Z", items:[{name:"Charger", price:1500, qty:1}], payment:"card", location:"IN" },
];

// ========== HELPERS ==========
const monthKey = ts => ts.slice(0,7);
const toNumber = v => Number(v) || 0;
const euclidean = (a,b) => Math.sqrt(a.reduce((s,_,i)=> s + (a[i]-b[i])**2,0));

// ========== MEGA REDUCE PASS ==========
const base = {
  coPurchase: {},            // { A: {B: count, C: count}, ... }
  productSales: {},          // { product: qty }
  userSpend: {},             // { user: total }
  userOrders: {},            // { user: orderCount }
  userOrderTimes: {},        // { user: [timestamps] }
  monthlyRevenue: {},        // { '2025-01': rev }
  suspicious: {},            // filled later
  userProductsSet: {},       // { user: Set(product) }
};

const agg = orders.reduce((acc, order) => {
  // order-level revenue
  const orderTotal = order.items.reduce((s,it)=> s + it.price * it.qty, 0);

  // monthly revenue
  const m = monthKey(order.ts);
  acc.monthlyRevenue[m] = (acc.monthlyRevenue[m] || 0) + orderTotal;

  // user spend & orders
  acc.userSpend[order.user] = (acc.userSpend[order.user] || 0) + orderTotal;
  acc.userOrders[order.user] = (acc.userOrders[order.user] || 0) + 1;
  acc.userOrderTimes[order.user] = acc.userOrderTimes[order.user] || [];
  acc.userOrderTimes[order.user].push(new Date(order.ts).getTime());

  // track products per user
  acc.userProductsSet[order.user] = acc.userProductsSet[order.user] || new Set();
  order.items.forEach(it => acc.userProductsSet[order.user].add(it.name));

  // productSales
  order.items.forEach(it => {
    acc.productSales[it.name] = (acc.productSales[it.name] || 0) + it.qty;
  });

  // co-purchase: for each pair within order
  const names = order.items.map(i => i.name);
  for (let i=0;i<names.length;i++){
    for (let j=i+1;j<names.length;j++){
      const [a,b] = [names[i], names[j]].sort(); // canonical key
      acc.coPurchase[a] = acc.coPurchase[a] || {};
      acc.coPurchase[a][b] = (acc.coPurchase[a][b] || 0) + 1;
      // also mirror for quick lookup later
      acc.coPurchase[b] = acc.coPurchase[b] || {};
      acc.coPurchase[b][a] = (acc.coPurchase[b][a] || 0) + 1;
    }
  }

  // basic fraud signals: unusual location (example), high single-order amount flagged
  if (order.location && order.location !== "IN") {
    acc.suspicious[order.user] = acc.suspicious[order.user] || { locationAnomalies:0, highAmountAnomalies:0, rapidOrders:0 };
    acc.suspicious[order.user].locationAnomalies += 1;
  }
  if (orderTotal > 50000) { // arbitrary high-order threshold
    acc.suspicious[order.user] = acc.suspicious[order.user] || { locationAnomalies:0, highAmountAnomalies:0, rapidOrders:0 };
    acc.suspicious[order.user].highAmountAnomalies += 1;
  }

  return acc;
}, base);

// ========== POST-PROCESS: velocity-based fraud (rapid multiple orders within minutes) ==========
Object.entries(agg.userOrderTimes).forEach(([user, times]) => {
  times.sort((a,b)=>a-b);
  let rapid = 0;
  for (let i=1;i<times.length;i++){
    const deltaMin = (times[i]-times[i-1]) / (1000*60);
    if (deltaMin <= 2) rapid++; // order within 2 minutes
  }
  if (rapid > 0) {
    agg.suspicious[user] = agg.suspicious[user] || { locationAnomalies:0, highAmountAnomalies:0, rapidOrders:0 };
    agg.suspicious[user].rapidOrders += rapid;
  }
});

// ========== BUILD USER FEATURE VECTORS for clustering ==========
/*
 Features chosen (example):
 0: totalSpend (scaled)
 1: avgOrderValue
 2: orderFrequency (orders per month approx)
 3: uniqueProductsCount
*/
const userIds = Object.keys(agg.userSpend);
const userFeatures = {};
userIds.forEach(uid => {
  const total = agg.userSpend[uid] || 0;
  const ordersCount = agg.userOrders[uid] || 0;
  const monthsActive = new Set((agg.userOrderTimes[uid]||[]).map(ts => new Date(ts).toISOString().slice(0,7))).size || 1;
  const avgOrder = ordersCount ? total / ordersCount : 0;
  const uniqueProducts = agg.userProductsSet[uid] ? agg.userProductsSet[uid].size : 0;
  const orderFreq = ordersCount / monthsActive; // orders per month

  userFeatures[uid] = {
    raw: { total, avgOrder, orderFreq, uniqueProducts },
    vector: [ total, avgOrder, orderFreq, uniqueProducts ]
  };
});

// Simple feature scaling (min-max) to bring vectors to comparable ranges
const dims = userFeatures[userIds[0]].vector.length;
const mins = Array(dims).fill(Infinity), maxs = Array(dims).fill(-Infinity);
userIds.forEach(uid => {
  userFeatures[uid].vector.forEach((v,i)=>{
    if (v < mins[i]) mins[i]=v;
    if (v > maxs[i]) maxs[i]=v;
  });
});
userIds.forEach(uid => {
  userFeatures[uid].scaled = userFeatures[uid].vector.map((v,i)=>{
    const range = maxs[i]-mins[i];
    return range === 0 ? 0 : (v - mins[i]) / range;
  });
});

// ========== SIMPLE K-MEANS CLUSTERING ON USERS ==========
function kmeans(vectors, k=3, iterations=20) {
  // vectors: [{id, vec}]
  const dim = vectors[0].vec.length;
  // init centroids: pick first k
  let centroids = vectors.slice(0,k).map(v => v.vec.slice());
  let assign = new Array(vectors.length).fill(-1);

  for (let it=0; it<iterations; it++){
    // assignment step
    let changed = false;
    vectors.forEach((v, idx) => {
      let best = 0, bestDist = Infinity;
      centroids.forEach((c, ci) => {
        const d = euclidean(v.vec, c);
        if (d < bestDist) { bestDist = d; best = ci; }
      });
      if (assign[idx] !== best) { changed = true; assign[idx] = best; }
    });
    // update step
    const sums = Array(centroids.length).fill(0).map(()=>Array(dim).fill(0));
    const counts = Array(centroids.length).fill(0);
    vectors.forEach((v, idx) => {
      const c = assign[idx];
      counts[c] += 1;
      v.vec.forEach((val,i)=> sums[c][i] += val);
    });
    centroids = centroids.map((c, ci)=> counts[ci] ? sums[ci].map(x=> x / counts[ci]) : c );
    if (!changed) break;
  }
  // build clusters
  const clusters = {};
  assign.forEach((c, idx) => {
    clusters[c] = clusters[c] || [];
    clusters[c].push(vectors[idx].id);
  });
  return { centroids, clusters };
}

const vectors = userIds.map(id => ({ id, vec: userFeatures[id].scaled }));
const k = Math.min(3, vectors.length);
const { centroids, clusters } = kmeans(vectors, k, 50);

// ========== RECOMMENDATIONS: top co-purchase suggestions per user ==========
function topNRecommendationsForUser(uid, N=3) {
  // find user's products, then for each product, accumulate co-purchase weights
  const seen = agg.userProductsSet[uid] ? Array.from(agg.userProductsSet[uid]) : [];
  const scores = {};
  seen.forEach(prod => {
    const neighbors = agg.coPurchase[prod] || {};
    Object.entries(neighbors).forEach(([other, count]) => {
      if (!seen.includes(other)) scores[other] = (scores[other] || 0) + count;
    });
  });
  return Object.entries(scores).sort((a,b)=>b[1]-a[1]).slice(0,N).map(([name])=>name);
}

const recommendations = Object.fromEntries(userIds.map(uid => [uid, topNRecommendationsForUser(uid,3)]));

// ========== FRAUD SUMMARY: rule-based final flags ==========
const fraudFlags = {};
Object.keys(agg.suspicious).forEach(user => {
  const s = agg.suspicious[user];
  // simple rules combined:
  const score = (s.locationAnomalies||0)*2 + (s.highAmountAnomalies||0)*3 + (s.rapidOrders||0)*2;
  fraudFlags[user] = { ...s, score, flagged: score >= 3 };
});

// ========== OUTPUT ==========
console.log("=== Monthly Revenue ===", agg.monthlyRevenue);
console.log("=== Product Sales ===", agg.productSales);
console.log("=== Co-Purchase (partial) ===", agg.coPurchase);
console.log("=== User Raw Features ===", Object.fromEntries(userIds.map(u=>[u,userFeatures[u].raw])));
console.log("=== Clusters ===", clusters);
console.log("=== Recommendations per user ===", recommendations);
console.log("=== Fraud Flags ===", fraudFlags);

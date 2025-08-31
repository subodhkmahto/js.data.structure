// ---------- sample data ----------
const orders = [
  // format: { id, customerId, date: 'YYYY-MM-DD', items: [{name, price, qty, category}] }
  { id: 1, customerId: "C1", date: "2025-01-05", items: [{name: "Laptop", price: 80000, qty: 1, category: "Electronics"}] },
  { id: 2, customerId: "C2", date: "2025-01-10", items: [{name: "Phone", price: 40000, qty: 1, category: "Electronics"}, {name: "Case", price: 500, qty: 1, category: "Accessories"}] },
  { id: 3, customerId: "C1", date: "2025-02-02", items: [{name: "Mouse", price: 1000, qty: 2, category: "Electronics"}] },
  { id: 4, customerId: "C3", date: "2025-02-20", items: [{name: "Shirt", price: 2000, qty: 3, category: "Clothing"}] },
  { id: 5, customerId: "C4", date: "2025-03-01", items: [{name: "Laptop", price: 80000, qty: 1, category: "Electronics"}] },
  { id: 6, customerId: "C2", date: "2025-03-05", items: [{name: "Headphones", price: 3000, qty: 2, category: "Electronics"}] },
  { id: 7, customerId: "C5", date: "2025-03-18", items: [{name: "Book", price: 600, qty: 5, category: "Books"}] },
  { id: 8, customerId: "C1", date: "2025-04-02", items: [{name: "Phone", price: 42000, qty: 1, category: "Electronics"}] },
  { id: 9, customerId: "C3", date: "2025-04-10", items: [{name: "Jeans", price: 3000, qty: 1, category: "Clothing"}] },
  { id:10, customerId: "C2", date: "2025-04-29", items: [{name: "Phone", price: 41000, qty: 1, category: "Electronics"}] },
];

// ---------- utilities ----------
const monthKey = d => d.slice(0,7); // 'YYYY-MM'
const add = (a,b) => a+b;

// ---------- mega reduce pass ----------
const base = {
  monthlyRevenue: {},            // { '2025-01': 12345, ... }
  orderCountByMonth: {},         // { '2025-01': 10 }
  monthlyCategoryMatrix: {},     // { '2025-01': { Electronics: 123, Clothing: 45 } }
  productStats: {},              // { 'Laptop': { qty, revenue, ordersContaining, priceSum } }
  customerStats: {},             // { 'C1': { total, orders, firstOrderMonth, lastOrderMonth, monthsSet:Set } }
  customersByMonth: {},          // { '2025-01': Set([C1,C2]) } used for cohort/retention
  global: { totalRevenue: 0, totalOrders: 0 }
};

const analytics = orders.reduce((acc, order) => {
  const m = monthKey(order.date);
  // ensure month containers
  acc.monthlyRevenue[m] = acc.monthlyRevenue[m] || 0;
  acc.orderCountByMonth[m] = acc.orderCountByMonth[m] || 0;
  acc.monthlyCategoryMatrix[m] = acc.monthlyCategoryMatrix[m] || {};
  acc.customersByMonth[m] = acc.customersByMonth[m] || new Set();

  // order-level totals
  let orderRevenue = 0;
  // track distinct product names in this order for "ordersContaining"
  const productsInOrder = new Set();

  order.items.forEach(item => {
    const line = item.price * item.qty;
    orderRevenue += line;

    // productStats
    if (!acc.productStats[item.name]) acc.productStats[item.name] = { qty: 0, revenue: 0, ordersContaining: 0, priceSum: 0 };
    acc.productStats[item.name].qty += item.qty;
    acc.productStats[item.name].revenue += line;
    acc.productStats[item.name].priceSum += item.price * item.qty; // for avg price weight
    productsInOrder.add(item.name);

    // monthlyCategoryMatrix
    acc.monthlyCategoryMatrix[m][item.category] = (acc.monthlyCategoryMatrix[m][item.category] || 0) + line;
  });

  // increment ordersContaining for each product present in this order
  productsInOrder.forEach(pn => acc.productStats[pn].ordersContaining += 1);

  // monthly & global aggregates
  acc.monthlyRevenue[m] += orderRevenue;
  acc.orderCountByMonth[m] += 1;
  acc.global.totalRevenue += orderRevenue;
  acc.global.totalOrders += 1;

  // customerStats
  if (!acc.customerStats[order.customerId]) {
    acc.customerStats[order.customerId] = {
      total: 0, orders: 0, firstOrderMonth: m, lastOrderMonth: m, monthsSet: new Set()
    };
  }
  const cs = acc.customerStats[order.customerId];
  cs.total += orderRevenue;
  cs.orders += 1;
  cs.lastOrderMonth = m;
  cs.monthsSet.add(m);

  // customersByMonth (for cohort/retention checks)
  acc.customersByMonth[m].add(order.customerId);

  return acc;
}, base);

// ---------- post-processing / derivations ----------

// product avgPrice
Object.keys(analytics.productStats).forEach(name => {
  const p = analytics.productStats[name];
  p.avgPrice = Number((p.revenue / p.qty).toFixed(2));
});

// convert customersByMonth sets -> arrays for readability
const customersByMonth = Object.fromEntries(
  Object.entries(analytics.customersByMonth).map(([m,s]) => [m, Array.from(s)])
);

// top N helpers
function topNFromObjectBy(obj, keyFn, n=3) {
  return Object.entries(obj)
    .map(([k,v]) => ({ key: k, ...v, metric: keyFn(v) }))
    .sort((a,b) => b.metric - a.metric)
    .slice(0,n);
}

// Top 3 products globally by revenue
const top3ProductsGlobal = topNFromObjectBy(analytics.productStats, v => v.revenue, 3);

// Top 3 customers globally by spend
const top3CustomersGlobal = topNFromObjectBy(analytics.customerStats, v => v.total, 3);

// Top product per month by revenue (using monthlyCategoryMatrix insufficient — we need month-level per-product: derive)
const productsByMonth = {}; // { '2025-01': { 'Laptop': revenue, ... } }
orders.forEach(order => {
  const m = monthKey(order.date);
  productsByMonth[m] = productsByMonth[m] || {};
  order.items.forEach(item => {
    productsByMonth[m][item.name] = (productsByMonth[m][item.name] || 0) + item.price * item.qty;
  });
});
const topProductPerMonth = Object.fromEntries(
  Object.entries(productsByMonth).map(([m, pdata]) => {
    const top = Object.entries(pdata).sort((a,b) => b[1]-a[1])[0];
    return [m, top ? { product: top[0], revenue: top[1] } : null];
  })
);

// Top customers per month
const spendByCustomerPerMonth = {}; // { '2025-01': { 'C1': total, ... } }
orders.forEach(order => {
  const m = monthKey(order.date);
  spendByCustomerPerMonth[m] = spendByCustomerPerMonth[m] || {};
  const ordTotal = order.items.reduce((s,it) => s + it.price*it.qty, 0);
  spendByCustomerPerMonth[m][order.customerId] = (spendByCustomerPerMonth[m][order.customerId] || 0) + ordTotal;
});
const topCustomersPerMonth = Object.fromEntries(
  Object.entries(spendByCustomerPerMonth).map(([m, map]) => [m, Object.entries(map).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([id,tot])=>({customer:id, spend:tot}))])
);

// cumulative monthly revenue (sorted by month)
const monthlySorted = Object.entries(analytics.monthlyRevenue).sort(([a],[b]) => a < b ? -1 : 1);
let running = 0;
const cumulativeRevenue = Object.fromEntries(monthlySorted.map(([m, rev]) => {
  running += rev;
  return [m, running];
}));

// month-over-month growth & anomaly detection (spike > mean + 2*std of growths)
const growths = [];
for (let i=1;i<monthlySorted.length;i++) {
  const prev = monthlySorted[i-1][1], curr = monthlySorted[i][1];
  const growth = prev === 0 ? null : (curr - prev) / prev;
  growths.push({ month: monthlySorted[i][0], growth });
}
const numericGrowths = growths.map(g => g.growth).filter(x => x !== null);
const meanGrowth = numericGrowths.reduce((a,b)=>a+b,0) / (numericGrowths.length || 1);
const stdGrowth = Math.sqrt(numericGrowths.reduce((s,x)=>s+(x-meanGrowth)**2,0) / (numericGrowths.length || 1));
const anomalies = growths.filter(g => g.growth !== null && g.growth > meanGrowth + 2*stdGrowth).map(g => g.month);

// simple cohort retention: percent of customers who ordered in month M and again in M+1
const months = monthlySorted.map(([m]) => m);
const retention = {};
for (let i=0;i<months.length-1;i++) {
  const m = months[i], next = months[i+1];
  const setM = new Set(customersByMonth[m] || []);
  const setNext = new Set(customersByMonth[next] || []);
  let repeat = 0;
  setM.forEach(c => { if (setNext.has(c)) repeat++; });
  retention[m] = {
    baseCustomers: setM.size,
    retainedNextMonth: repeat,
    retentionRate: setM.size ? Number((repeat / setM.size * 100).toFixed(2)) : 0
  };
}

// finalize customer report with avg order value and monthsActive
const customerReport = Object.fromEntries(
  Object.entries(analytics.customerStats).map(([cid, cs]) => {
    return [cid, {
      total: cs.total,
      orders: cs.orders,
      avgOrderValue: Number((cs.total / cs.orders).toFixed(2)),
      monthsActive: Array.from(cs.monthsSet).sort()
    }];
  })
);

// ---------- outputs ----------
console.log("=== monthlyRevenue ===", analytics.monthlyRevenue);
console.log("=== orderCountByMonth ===", analytics.orderCountByMonth);
console.log("=== monthlyCategoryMatrix ===", analytics.monthlyCategoryMatrix);
console.log("=== productStats ===", analytics.productStats);
console.log("=== customerReport ===", customerReport);
console.log("=== top3ProductsGlobal ===", top3ProductsGlobal);
console.log("=== top3CustomersGlobal ===", top3CustomersGlobal);
console.log("=== topProductPerMonth ===", topProductPerMonth);
console.log("=== topCustomersPerMonth ===", topCustomersPerMonth);
console.log("=== cumulativeRevenue ===", cumulativeRevenue);
console.log("=== growths ===", growths);
console.log("=== anomalies (spike months) ===", anomalies);
console.log("=== retention month->next ===", retention);

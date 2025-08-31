const logs = [
  { service: "search", latency: 120 },
  { service: "ads", latency: 230 },
  { service: "search", latency: 100 },
  { service: "maps", latency: 95 },
  { service: "ads", latency: 300 },
  { service: "maps", latency: 110 },
];

// ✅ Service-wise average latency निकालना
const result = logs.reduce((acc, log) => {
  if (!acc[log.service]) {
    acc[log.service] = { total: 0, count: 0 };
  }
  acc[log.service].total += log.latency;
  acc[log.service].count++;
  return acc;
}, {});

const finalAvg = Object.fromEntries(
  Object.entries(result).map(([k, v]) => [k, v.total / v.count])
);

console.log(finalAvg);
/*
{
  search: 110,
  ads: 265,
  maps: 102.5
}
*/

const purchases = [
  { user: "A", items: ["Book", "Pen", "Laptop"] },
  { user: "B", items: ["Book", "Bag"] },
  { user: "C", items: ["Laptop", "Mouse", "Book"] },
];

// ✅ Product pair frequency निकालना
const coOccurrence = purchases.reduce((acc, order) => {
  order.items.forEach((item, i) => {
    order.items.slice(i + 1).forEach((other) => {
      const key = [item, other].sort().join(" & ");
      acc[key] = (acc[key] || 0) + 1;
    });
  });
  return acc;
}, {});

console.log(coOccurrence);
/*
{
  'Book & Pen': 1,
  'Book & Laptop': 2,
  'Book & Bag': 1,
  'Laptop & Mouse': 1
}
*/
const watchHistory = [
  { user: "U1", genre: "Action", time: 120 },
  { user: "U2", genre: "Drama", time: 200 },
  { user: "U1", genre: "Action", time: 90 },
  { user: "U3", genre: "Drama", time: 150 },
  { user: "U4", genre: "Comedy", time: 180 },
];

const genreStats = watchHistory.reduce((acc, w) => {
  if (!acc[w.genre]) acc[w.genre] = { total: 0, count: 0 };
  acc[w.genre].total += w.time;
  acc[w.genre].count++;
  return acc;
}, {});

const avgGenre = Object.fromEntries(
  Object.entries(genreStats).map(([g, v]) => [g, (v.total / v.count).toFixed(1)])
);

console.log(avgGenre);
/*
{
  Action: 105.0,
  Drama: 175.0,
  Comedy: 180.0
}
*/
const reviews = [
  "i love this product",
  "this product is bad",
  "love the quality of this product",
];

const wordFreq = reviews.reduce((acc, review) => {
  review.split(" ").forEach(word => {
    acc[word] = (acc[word] || 0) + 1;
  });
  return acc;
}, {});

console.log(wordFreq);
/*
{
  i: 1,
  love: 2,
  this: 3,
  product: 3,
  is: 1,
  bad: 1,
  the: 1,
  quality: 1,
  of: 1
}
*/

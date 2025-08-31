const purchases = [
  ["laptop", "mouse", "keyboard"],
  ["laptop", "bag"],
  ["mouse", "pad", "keyboard"]
];

const coPurchase = purchases.reduce((acc, basket) => {
  basket.forEach(item => {
    if (!acc[item]) acc[item] = {};
    basket.forEach(other => {
      if (item !== other) acc[item][other] = (acc[item][other] || 0) + 1;
    });
  });
  return acc;
}, {});

console.log("Co-Purchase Graph:", coPurchase);
const docs = [
  "ai is the future",
  "google uses ai",
  "ai is used in amazon"
];

const tf = docs.reduce((acc, doc) => {
  doc.split(" ").forEach(word => {
    acc[word] = (acc[word] || 0) + 1;
  });
  return acc;
}, {});

console.log("Word Frequency (TF):", tf);
const transactions = [
  { user: "A", amount: 100 },
  { user: "A", amount: 5000 },
  { user: "A", amount: 7000 },
  { user: "B", amount: 200 },
];

const userSpend = transactions.reduce((acc, tx) => {
  acc[tx.user] = (acc[tx.user] || 0) + tx.amount;
  return acc;
}, {});

const suspicious = Object.entries(userSpend)
  .filter(([_, total]) => total > 10000)
  .map(([user]) => user);

console.log("Suspicious Users:", suspicious);
const logs = [
  { service: "Auth", status: 500 },
  { service: "Auth", status: 200 },
  { service: "Payments", status: 500 },
  { service: "Auth", status: 500 },
  { service: "Payments", status: 200 },
];

const errorStats = logs.reduce((acc, log) => {
  if (!acc[log.service]) acc[log.service] = { errors: 0, total: 0 };
  acc[log.service].total++;
  if (log.status >= 500) acc[log.service].errors++;
  return acc;
}, {});

console.log("Error Stats:", errorStats);
// Output: { Auth: { errors: 2, total: 3 }, Payments: { errors: 1, total: 2 } }
const userClicks = [
  [0.2, 0.1, 0.4],
  [0.3, 0.7, 0.2],
  [0.9, 0.3, 0.5],
];

// Reduce se aggregate karke ek single vector banayenge
const embedding = userClicks.reduce(
  (acc, vec) => acc.map((val, i) => val + vec[i]),
  [0, 0, 0]
);

// Normalize
const norm = Math.sqrt(embedding.reduce((sum, v) => sum + v * v, 0));
const normalizedEmbedding = embedding.map(v => v / norm);

console.log("User Embedding:", normalizedEmbedding);

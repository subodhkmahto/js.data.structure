const orders = [
  { user: "Amit", category: "Electronics", amount: 1200 },
  { user: "Amit", category: "Books", amount: 300 },
  { user: "Riya", category: "Electronics", amount: 2000 },
  { user: "Riya", category: "Fashion", amount: 1500 },
  { user: "Riya", category: "Books", amount: 700 },
  { user: "Amit", category: "Fashion", amount: 1000 },
  { user: "Karan", category: "Books", amount: 800 },
  { user: "Karan", category: "Electronics", amount: 500 },
];

const result = orders.reduce((acc, order) => {
  // 1️⃣ हर user का खर्च जोड़ना
  if (!acc.userTotals[order.user]) {
    acc.userTotals[order.user] = 0;
  }
  acc.userTotals[order.user] += order.amount;

  // 2️⃣ category wise खर्च
  if (!acc.categoryTotals[order.category]) {
    acc.categoryTotals[order.category] = 0;
  }
  acc.categoryTotals[order.category] += order.amount;

  // 3️⃣ Grand Total
  acc.grandTotal += order.amount;

  return acc;
}, { userTotals: {}, categoryTotals: {}, grandTotal: 0 });

// अब सबसे ज़्यादा खर्च वाली category ढूंढते हैं
const topCategory = Object.entries(result.categoryTotals)
  .reduce((max, curr) => (curr[1] > max[1] ? curr : max));

console.log("User Totals:", result.userTotals);
console.log("Category Totals:", result.categoryTotals);
console.log("Grand Total:", result.grandTotal);
console.log("Top Category:", topCategory);

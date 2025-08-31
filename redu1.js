const transactions = [
  { user: "A", amount: 200, to: "X" },
  { user: "A", amount: 300, to: "Y" },
  { user: "A", amount: 250, to: "Z" },
  { user: "B", amount: 1000, to: "X" },
  { user: "B", amount: 50, to: "Y" },
];



const suspicious = transactions.reduce((acc, { user, amount }) => {
  acc[user] = (acc[user] || 0) + amount;
  return acc;
}, {});

console.log(suspicious);
/*
{
  A: 750,
  B: 1050
}
*/

// Rule: Agar ek din me ₹500+ transaction multiple accounts me gya -> suspicious
const flagged = Object.entries(suspicious)
  .filter(([user, total]) => total > 500)
  .map(([user]) => user);

console.log("Suspicious Users:", flagged);
// ["A", "B"]


const purchases = [
  { user: "U1", items: ["Laptop", "Mouse"] },
  { user: "U2", items: ["Laptop", "Bag"] },
  { user: "U3", items: ["Laptop", "Mouse", "Keyboard"] },
];

const coPurchase = purchases.reduce((acc, { items }) => {
  items.forEach((item, i) => {
    items.forEach((other, j) => {
      if (i !== j) {
        acc[item] = acc[item] || {};
        acc[item][other] = (acc[item][other] || 0) + 1;
      }
    });
  });
  return acc;
}, {});

console.log(coPurchase);
/*
{
  Laptop: { Mouse: 2, Bag: 1, Keyboard: 1 },
  Mouse: { Laptop: 2, Keyboard: 1 },
  Bag: { Laptop: 1 },
  Keyboard: { Laptop: 1, Mouse: 1 }
}
*/
// Rule: Agar ek item ke sath 2+ baar koi item kharida gaya -> suggest
const suggestions = Object.entries(coPurchase).reduce((acc, [item, related]) => {
  acc[item] = Object.entries(related)
    .filter(([other, count]) => count >= 2)
    .map(([other]) => other);
  return acc;
}, {});
console.log("Suggestions:", suggestions);


const docs = [
  { id: 1, text: "machine learning is fun" },
  { id: 2, text: "deep learning powers search engines" },
  { id: 3, text: "machine learning powers AI" },
];

const index = docs.reduce((acc, { id, text }) => {
  text.split(" ").forEach(word => {
    acc[word] = acc[word] || [];
    acc[word].push(id);
  });
  return acc;
}, {});

console.log(index);
/*
{
  machine: [1, 3],
  learning: [1, 2, 3],
  is: [1],
  fun: [1],
  deep: [2],
  powers: [2, 3],
  search: [2],
  engines: [2],
  AI: [3]
}
*/

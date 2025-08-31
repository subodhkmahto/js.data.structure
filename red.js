const clicks = [
  { user: "U1", page: "Home", time: 1 },
  { user: "U1", page: "Category", time: 2 },
  { user: "U1", page: "Product", time: 3 },
  { user: "U2", page: "Home", time: 1 },
  { user: "U2", page: "Search", time: 2 },
  { user: "U2", page: "Product", time: 3 },
];

const userJourneys = clicks.reduce((acc, { user, page }) => {
  acc[user] = acc[user] || [];
  acc[user].push(page);
  return acc;
}, {});

console.log(userJourneys);
/*
{
  U1: ["Home", "Category", "Product"],
  U2: ["Home", "Search", "Product"]
}
*/

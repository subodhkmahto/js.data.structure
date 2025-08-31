const userClicks = [
  { userId: 1, page: "Home", time: 2 },
  { userId: 1, page: "Product", time: 5 },
  { userId: 1, page: "Cart", time: 3 },
  { userId: 2, page: "Home", time: 4 },
  { userId: 2, page: "Search", time: 6 },
];

const sessions = userClicks.reduce((acc, click) => {
  acc[click.userId] = acc[click.userId] || { totalTime: 0, pages: [] };
  acc[click.userId].totalTime += click.time;
  acc[click.userId].pages.push(click.page);
  return acc;
}, {});

console.log(sessions);

/*
{
  '1': { totalTime: 10, pages: [ 'Home', 'Product', 'Cart' ] },
  '2': { totalTime: 10, pages: [ 'Home', 'Search' ] }
}
*/

const reviews = [
  { text: "Amazing product", sentiment: 0.9 },
  { text: "Very bad quality", sentiment: -0.7 },
  { text: "Good value for money", sentiment: 0.8 },
  { text: "Not worth it", sentiment: -0.6 },
];

const sentimentScore = reviews.reduce(
  (acc, review) => {
    acc.total += review.sentiment;
    acc.count++;
    return acc;
  },
  { total: 0, count: 0 }
);

console.log("Average Sentiment:", sentimentScore.total / sentimentScore.count);
// Average Sentiment: 0.1
const transactions = [
  { userId: 1, amount: 200, location: "Delhi" },
  { userId: 1, amount: 5000, location: "Delhi" },
  { userId: 1, amount: 50, location: "Russia" },
  { userId: 2, amount: 100, location: "Mumbai" },
];

const fraudCheck = transactions.reduce((acc, t) => {
  acc[t.userId] = acc[t.userId] || { total: 0, foreignTx: 0 };
  acc[t.userId].total += t.amount;
  if (t.location !== "Delhi" && t.userId === 1) acc[t.userId].foreignTx++;
  return acc;
}, {});

console.log(fraudCheck);

/*
{
  '1': { total: 5250, foreignTx: 1 },
  '2': { total: 100, foreignTx: 0 }
}
*/
const logs = [
  { service: "auth", status: 200 },
  { service: "auth", status: 500 },
  { service: "search", status: 200 },
  { service: "search", status: 200 },
  { service: "search", status: 500 },
];

const logSummary = logs.reduce((acc, log) => {
  acc[log.service] = acc[log.service] || { success: 0, error: 0 };
  if (log.status === 200) acc[log.service].success++;
  else acc[log.service].error++;
  return acc;
}, {});

console.log(logSummary);

/*
{
  auth: { success: 1, error: 1 },
  search: { success: 2, error: 1 }
}
*/

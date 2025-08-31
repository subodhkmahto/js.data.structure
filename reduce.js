let arr = [10, 20, 5, 40, 15];

let sum = arr.reduce((acc, num) => acc + num, 0);
let max = arr.reduce((acc, num) => (num > acc ? num : acc), arr[0]);
let min = arr.reduce((acc, num) => (num < acc ? num : acc), arr[0]);

console.log("Sum:", sum);   // 90
console.log("Max:", max);   // 40
console.log("Min:", min);   // 5

let fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

let count = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log(count);
// { apple: 3, banana: 2, orange: 1 }
let orders = [
    { product: "Laptop", price: 50000 },
    { product: "Mouse", price: 1000 },
    { product: "Keyboard", price: 2000 },
];

let totalPrice = orders.reduce((acc, item) => acc + item.price, 0);

console.log("Total Price:", totalPrice); // 53000
// Grouping example


let students = [
    { name: "Amit", grade: "A" },
    { name: "Rahul", grade: "B" },
    { name: "Neha", grade: "A" },
    { name: "Priya", grade: "C" },
];

let grouped = students.reduce((acc, student) => {
    (acc[student.grade] = acc[student.grade] || []).push(student.name);
    return acc;
}, {});

console.log(grouped);
// { A: ["Amit", "Neha"], B: ["Rahul"], C: ["Priya"] }


let nested = [[1, 2], [3, 4], [5, 6]];

let flat = nested.reduce((acc, curr) => acc.concat(curr), []);


console.log(flat); 
// [1, 2, 3, 4, 5, 6]
let str = "hello world";

let freq = str.split("").reduce((acc, char) => {
    if (char !== " ") {  // ignore space
        acc[char] = (acc[char] || 0) + 1;
    }
    return acc;
}, {});

// Find most used char

let mostUsed = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);

console.log("Frequencies:", freq);
console.log("Most used char:", mostUsed);

// Frequencies: { h: 1, e: 1, l: 3, o: 2, w: 1, r: 1, d: 1 }// Most used char: l
// Billing example with discounts and tax




let cart = [
    { item: "Laptop", price: 50000, qty: 1, discount: 0.1 }, // 10% off
    { item: "Mouse", price: 1000, qty: 2, discount: 0.05 },  // 5% off
    { item: "Keyboard", price: 2000, qty: 1, discount: 0 },  // no discount
];

let bill = cart.reduce((acc, product) => {
    let itemTotal = product.price * product.qty;
    let discount = itemTotal * product.discount;
    let afterDiscount = itemTotal - discount;
    let tax = afterDiscount * 0.18; // 18% GST
    acc.subTotal += itemTotal;
    acc.discount += discount;
    acc.tax += tax;
    acc.grandTotal += afterDiscount + tax;
    return acc;
}, { subTotal: 0, discount: 0, tax: 0, grandTotal: 0 });

console.log("🛒 Bill Details:", bill);

// { subTotal: 54000, discount: 5100, tax: 8820, grandTotal: 57720 }


let text = "google is big google has search google has maps amazon has shopping";

let wordCount = text.split(" ").reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
}, {});

console.log("Word Frequency:", wordCount);

// { google: 3, is: 1, big: 1, has: 3, search: 1, maps: 1, amazon: 1, shopping: 1 }

let nested = [1, [2, [3, [4, 5]]], 6];

function flatten(arr) {
    return arr.reduce((acc, curr) => {
        if (Array.isArray(curr)) {
            return acc.concat(flatten(curr)); // recursion + reduce
        } else {
            return acc.concat(curr);
        }
    }, []);
}

console.log("Flattened:", flatten(nested));
// [1, 2, 3, 4, 5, 6]


let logs = [
    { user: "Amit", action: "login" },
    { user: "Amit", action: "buy" },
    { user: "Rahul", action: "login" },
    { user: "Neha", action: "login" },
    { user: "Rahul", action: "buy" },
    { user: "Amit", action: "logout" }
];

let analytics = logs.reduce((acc, log) => {
    acc[log.user] = acc[log.user] || { login: 0, buy: 0, logout: 0 };
    acc[log.user][log.action] += 1;
    return acc;
}, {});

console.log("User Analytics:", analytics);
// { Amit: { login: 1, buy: 1, logout: 1 },
//   Rahul: { login: 1, buy: 1, logout: 0 },
//   Neha: { login: 1, buy: 0, logout: 0 } }        




let orders = [
  { id: 1, category: "Electronics", amount: 200 },
  { id: 2, category: "Clothing", amount: 100 },
  { id: 3, category: "Electronics", amount: 300 },
  { id: 4, category: "Books", amount: 150 },
  { id: 5, category: "Clothing", amount: 50 },
];

let result = orders.reduce((acc, order) => {
  // कुल revenue निकालना
  acc.totalRevenue += order.amount;

  // category-wise revenue add करना
  acc.byCategory[order.category] = 
    (acc.byCategory[order.category] || 0) + order.amount;

  return acc;
}, { totalRevenue: 0, byCategory: {} });

console.log(result);
// { totalRevenue: 800, byCategory: { Electronics: 500, Clothing: 150, Books: 150 } }



let playlists = [
  ["song1", "song2", "song3"],
  ["song2", "song4"],
  ["song5", "song1"]
];

let uniqueSongs = playlists.reduce((acc, list) => {
  list.forEach(song => acc.add(song));
  return acc;
}, new Set());

console.log([...uniqueSongs]);
// ["song1", "song2", "song3", "song4", "song5"]

let employees = [
  { name: "Amit", dept: "IT", salary: 60000 },
  { name: "Rahul", dept: "HR", salary: 50000 },
  { name: "Neha", dept: "IT", salary: 80000 },
  { name: "Priya", dept: "Finance", salary: 75000 }
];

let highest = employees.reduce((acc, emp) => {
  if (!acc[emp.dept] || emp.salary > acc[emp.dept].salary) {
    acc[emp.dept] = emp;
  }
  return acc;
}, {});

console.log(highest);

// { IT: { name: "Neha", dept: "IT", salary: 80000 },
//   HR: { name: "Rahul", dept: "HR", salary: 50000 },
//   Finance: { name: "Priya", dept: "Finance", salary: 75000 } }   


let orders = [
  { id: 1, customer: "Amit", items: [{ name: "Laptop", price: 50000, qty: 1 }, { name: "Mouse", price: 500, qty: 2 }] },
  { id: 2, customer: "Neha", items: [{ name: "Mobile", price: 20000, qty: 1 }, { name: "Charger", price: 1000, qty: 1 }] },
  { id: 3, customer: "Amit", items: [{ name: "Laptop", price: 50000, qty: 1 }] },
  { id: 4, customer: "Rahul", items: [{ name: "Headphones", price: 3000, qty: 2 }, { name: "Mouse", price: 500, qty: 1 }] }
];

let report = orders.reduce((acc, order) => {
    // 1. Customer-wise total
    let totalAmount = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    acc.customers[order.customer] = (acc.customers[order.customer] || 0) + totalAmount;

    // 2. Product-wise sales count
    order.items.forEach(item => {
        acc.products[item.name] = (acc.products[item.name] || 0) + item.qty;
    });

    return acc;
}, { customers: {}, products: {} });

console.log(report);

// { customers: { Amit: 100500, Neha: 21000, Rahul: 6500 },
//   products: { Laptop: 2, Mouse: 3, Mobile: 1, Charger: 1, Headphones: 2 } }  


let cart = [
  { name: "Laptop", category: "Electronics", price: 80000, quantity: 1 },
  { name: "Phone", category: "Electronics", price: 40000, quantity: 2 },
  { name: "Shirt", category: "Clothing", price: 2000, quantity: 3 },
  { name: "Jeans", category: "Clothing", price: 3000, quantity: 2 },
  { name: "Book", category: "Stationery", price: 500, quantity: 5 },
];

let result = cart.reduce(
  (acc, item) => {
    // 🔹 Total Bill
    acc.totalBill += item.price * item.quantity;

    // 🔹 Category wise grouping
    (acc.categories[item.category] = acc.categories[item.category] || []).push(item.name);

    // 🔹 Sabse expensive product
    if (item.price > acc.mostExpensive.price) {
      acc.mostExpensive = { name: item.name, price: item.price };
    }

    return acc;
  },
  {
    totalBill: 0,
    categories: {},
    mostExpensive: { name: null, price: 0 },
  }
);

console.log(result);

// {
//   totalBill: 170500,
//   categories: {
//     Electronics: ["Laptop", "Phone"],
//     Clothing: ["Shirt", "Jeans"],
//     Stationery: ["Book"]
//   },
//   mostExpensive: { name: "Laptop", price: 80000 }
// }


let orders = [
    { orderId: 1, customer: "Amit", items: [{ name: "Laptop", price: 50000 }, { name: "Mouse", price: 500 }] },
    { orderId: 2, customer: "Neha", items: [{ name: "Mobile", price: 20000 }] },
    { orderId: 3, customer: "Amit", items: [{ name: "Keyboard", price: 1500 }, { name: "Mouse", price: 500 }] },
    { orderId: 4, customer: "Rahul", items: [{ name: "Laptop", price: 50000 }] },
    { orderId: 5, customer: "Neha", items: [{ name: "Headphones", price: 2000 }, { name: "Mouse", price: 500 }] }
];

// Task:

// हर customer ne कितने पैसे खर्च किए

// हर product कितनी बार बिका

// सबसे ज्यादा खर्च करने वाला customer कौन है

// 🔹 1. Customer-wise total spending निकालना
let customerSpending = orders.reduce((acc, order) => {
    let total = order.items.reduce((sum, item) => sum + item.price, 0);
    acc[order.customer] = (acc[order.customer] || 0) + total;
    return acc;
}, {});

console.log("Customer Spending:", customerSpending);
// { Amit: 52000, Neha: 22500, Rahul: 50000 }

// 🔹 2. Product-wise total sales निकालना
let productSales = orders.reduce((acc, order) => {
    order.items.forEach(item => {
        acc[item.name] = (acc[item.name] || 0) + 1;
    });
    return acc;
}, {});

console.log("Product Sales:", productSales);
// { Laptop: 2, Mouse: 3, Mobile: 1, Keyboard: 1, Headphones: 1 }

// 🔹 3. सबसे ज्यादा खर्च करने वाला customer
let richestCustomer = Object.entries(customerSpending)
    .reduce((max, curr) => curr[1] > max[1] ? curr : max);

console.log("Biggest Spender:", richestCustomer);
// [ 'Amit', 52000 ]




// Customer Spending: { Amit: 52000, Neha: 22500, Rahul: 50000 }
// Product Sales: { Laptop: 2, Mouse: 3, Mobile: 1, Keyboard: 1, Headphones: 1 }
// Biggest Spender: [ 'Amit', 52000 ]


// Sample data (dates, qty, price)
const orders = [
  {
    id: 1,
    customer: "Amit",
    date: "2025-01-15",
    items: [
      { name: "Laptop", price: 80000, qty: 1, category: "Electronics" },
      { name: "Mouse",  price:  1000, qty: 2, category: "Electronics" },
    ],
  },
  {
    id: 2,
    customer: "Neha",
    date: "2025-01-28",
    items: [
      { name: "Phone",   price: 40000, qty: 1, category: "Electronics" },
      { name: "Charger", price:  1500, qty: 1, category: "Electronics" },
    ],
  },
  {
    id: 3,
    customer: "Amit",
    date: "2025-02-05",
    items: [
      { name: "Shirt", price: 2000, qty: 3, category: "Clothing" },
      { name: "Jeans", price: 3000, qty: 2, category: "Clothing" },
    ],
  },
  {
    id: 4,
    customer: "Rahul",
    date: "2025-02-18",
    items: [
      { name: "Laptop", price: 80000, qty: 1, category: "Electronics" },
    ],
  },
  {
    id: 5,
    customer: "Neha",
    date: "2025-03-02",
    items: [
      { name: "Headphones", price: 3000, qty: 2, category: "Electronics" },
      { name: "Mouse",      price: 1000, qty: 1, category: "Electronics" },
    ],
  },
  {
    id: 6,
    customer: "Priya",
    date: "2025-03-20",
    items: [
      { name: "Book", price: 600, qty: 5, category: "Stationery" },
      { name: "Shirt", price: 2000, qty: 1, category: "Clothing" },
    ],
  },
];

// Utility: YYYY-MM
const monthKey = (isoDate) => isoDate.slice(0, 7);

// One mega-reduce pass
const analytics = orders.reduce(
  (acc, order) => {
    const mKey = monthKey(order.date);

    // Order totals
    const { orderRevenue, productLines } = order.items.reduce(
      (inner, item) => {
        const lineRevenue = item.price * item.qty;
        inner.orderRevenue += lineRevenue;
        inner.productLines.push({ ...item, lineRevenue });
        return inner;
      },
      { orderRevenue: 0, productLines: [] }
    );

    // 1) Monthly revenue
    acc.monthly[mKey] = (acc.monthly[mKey] || 0) + orderRevenue;

    // 2) Product stats (qty + revenue)
    productLines.forEach(({ name, qty, lineRevenue }) => {
      if (!acc.products[name]) acc.products[name] = { qty: 0, revenue: 0 };
      acc.products[name].qty += qty;
      acc.products[name].revenue += lineRevenue;
    });

    // 3) Customer stats
    if (!acc.customers[order.customer]) {
      acc.customers[order.customer] = { total: 0, orders: 0 };
    }
    acc.customers[order.customer].total += orderRevenue;
    acc.customers[order.customer].orders += 1;

    // Global totals (optional)
    acc.global.totalRevenue += orderRevenue;
    acc.global.totalOrders += 1;

    return acc;
  },
  {
    monthly: {},               // { '2025-01':  ..., '2025-02': ... }
    products: {},              // { Mouse: { qty, revenue }, ... }
    customers: {},             // { Amit: { total, orders }, ... }
    global: { totalRevenue: 0, totalOrders: 0 },
  }
);

// Derivations (post-processing)

// A) Top 3 products by revenue
const top3Products = Object.entries(analytics.products)
  .map(([name, s]) => ({ name, ...s }))
  .sort((a, b) => b.revenue - a.revenue)
  .slice(0, 3);

// B) Add average spend per customer
const customerReport = Object.entries(analytics.customers).reduce(
  (obj, [name, { total, orders }]) => {
    obj[name] = {
      total,
      orders,
      avgSpend: Number((total / orders).toFixed(2)),
    };
    return obj;
  },
  {}
);

// C) Biggest spender
const [biggestSpenderName, biggestSpenderData] = Object.entries(analytics.customers)
  .reduce((max, curr) => (curr[1].total > max[1].total ? curr : max));

// D) Nice sorted monthly view
const monthlySorted = Object.entries(analytics.monthly)
  .sort(([a], [b]) => (a < b ? -1 : 1))
  .reduce((obj, [k, v]) => ((obj[k] = v), obj), {});

// ——— Results ———
console.log("Monthly Revenue (₹):", monthlySorted);
console.log("Product Stats:", analytics.products);
console.log("Top 3 Products (by revenue):", top3Products);
console.log("Customer Report:", customerReport);
console.log("Biggest Spender:", { name: biggestSpenderName, ...biggestSpenderData });
console.log("Global Totals:", analytics.global);

// Monthly Revenue (₹): { '2025-01': 121500, '2025-02': 86000, '2025-03': 8000 }
// Product Stats: { Laptop: { qty: 2, revenue: 160000 },
//   Mouse: { qty: 3, revenue: 3000 },
//   Phone: { qty: 1, revenue: 40000 },
//   Charger: { qty: 1, revenue: 1500 },
//   Shirt: { qty: 4, revenue: 8000 },
//   Jeans: { qty: 2, revenue: 6000 },
//   Headphones: { qty: 2, revenue: 6000 },
//   Book: { qty: 5, revenue: 3000 } }

// Top 3 Products (by revenue):
// [ { name: 'Laptop', qty: 2, revenue: 160000 },
//   { name: 'Phone', qty: 1, revenue: 40000 },
//   { name: 'Shirt', qty: 4, revenue: 8000 } ]     
// Customer Report:
// { Amit: { total: 52000, orders: 2, avgSpend:
//     26000 },
//   Neha: { total: 22500, orders: 2, avgSpend: 11250 },
//   Rahul: { total: 80000, orders: 1, avgSpend: 80000 },
//   Priya: { total: 8000, orders: 1, avgSpend: 8000 } }
// Biggest Spender: { name: 'Rahul', total: 80000, orders: 1 }
// Global Totals: { totalRevenue: 162500, totalOrders: 6 }  
// Note: ₹ = INR (Indian Rupee)
// Note: This is a comprehensive example demonstrating advanced usage of reduce for data analytics.
// Note: The data and scenarios are illustrative and can be adapted for various use-cases.
// Note: Focus is on clarity and step-by-step transformations using reduce.
// Note: Real-world scenarios may involve more complex data structures and additional validations.
// Note: Consider performance implications for very large datasets.
// Note: This example is for educational purposes and may not cover all edge cases. 
// Note: Always validate and sanitize input data in production code.
// Note: The analytics object can be further extended based on requirements.
// Note: JavaScript's reduce is a powerful tool for transforming and aggregating data.
// Note: Experiment with different datasets to see how reduce can be applied.
// Note: Happy coding! 🚀

const orders = [
  { user: "Alice", items: 3, total: 1200, category: "Electronics", discount: 200 },
  { user: "Bob", items: 2, total: 800, category: "Clothing", discount: 100 },
  { user: "Alice", items: 1, total: 500, category: "Clothing", discount: 50 },
  { user: "Charlie", items: 5, total: 2000, category: "Electronics", discount: 300 },
  { user: "Bob", items: 4, total: 1500, category: "Grocery", discount: 0 },
  { user: "Alice", items: 2, total: 700, category: "Grocery", discount: 100 }
];

const analytics = orders.reduce((acc, order) => {
  // 1️⃣ Per user spending
  acc.userSpending[order.user] = (acc.userSpending[order.user] || 0) + order.total;

  // 2️⃣ Category wise total purchase
  acc.categoryCount[order.category] = (acc.categoryCount[order.category] || 0) + order.total;

  // 3️⃣ Total discount given
  acc.totalDiscount += order.discount;

  return acc;
}, {
  userSpending: {},   // { Alice: 2400, Bob: 2300, ... }
  categoryCount: {},  // { Electronics: 3200, Clothing: 1300, Grocery: 2200 }
  totalDiscount: 0    // 750
});

console.log(analytics);
// { userSpending: { Alice: 2400, Bob: 2300, Charlie: 2000 },
//   categoryCount: { Electronics: 3200, Clothing: 1300, Grocery: 2200 },       
//   totalDiscount: 750 }
// Note: This example showcases multiple aggregations in a single reduce pass.
// Note: The structure of the analytics object can be modified as per requirements.
// Note: Always consider edge cases and validate data in production scenarios.
// Note: The dataset here is simplified for demonstration purposes.
// Note: JavaScript's reduce method is versatile and can handle complex transformations.        

const orders = [
  { id: 1, category: "Electronics", amount: 1200, customerId: "C1" },
  { id: 2, category: "Clothing", amount: 500, customerId: "C2" },
  { id: 3, category: "Electronics", amount: 800, customerId: "C3" },
  { id: 4, category: "Clothing", amount: 1200, customerId: "C1" },
  { id: 5, category: "Books", amount: 300, customerId: "C2" },
  { id: 6, category: "Electronics", amount: 400, customerId: "C2" },
  { id: 7, category: "Books", amount: 700, customerId: "C4" },
];

// 🔹 reduce() का use
const analytics = orders.reduce((acc, order) => {
  if (!acc[order.category]) {
    acc[order.category] = { totalSales: 0, customers: new Set() };
  }

  acc[order.category].totalSales += order.amount;
  acc[order.category].customers.add(order.customerId);

  return acc;
}, {});

// 🔹 अब unique customer count निकालते हैं
for (let category in analytics) {
  analytics[category].uniqueCustomers = analytics[category].customers.size;
  delete analytics[category].customers; // Set हटाकर केवल count रखेंगे
}

console.log(analytics);

/*
Output:
{
  Electronics: { totalSales: 2400, uniqueCustomers: 3 },
  Clothing: { totalSales: 1700, uniqueCustomers: 2 },
  Books: { totalSales: 1000, uniqueCustomers: 2 }
}
*/
// Note: यह example दिखाता है कि कैसे reduce() का use करके complex data aggregation किया जा सकता है।
// Note: यहाँ Set का use करके unique customers को track किया गया है। 
const orders = [
  {
    orderId: 1,
    products: [
      { name: "iPhone 15", category: "Electronics", price: 1200, qty: 2 },
      { name: "MacBook", category: "Electronics", price: 2500, qty: 1 },
    ],
  },
  {
    orderId: 2,
    products: [
      { name: "T-shirt", category: "Clothing", price: 20, qty: 5 },
      { name: "Jeans", category: "Clothing", price: 40, qty: 2 },
    ],
  },
  {
    orderId: 3,
    products: [
      { name: "iPhone 15", category: "Electronics", price: 1200, qty: 1 },
      { name: "Shoes", category: "Footwear", price: 100, qty: 3 },
    ],
  },
];

// 4X COMPLEX REDUCE
const summary = orders.reduce(
  (acc, order) => {
    order.products.forEach(p => {
      const revenue = p.price * p.qty;

      // 1. total revenue
      acc.totalRevenue += revenue;

      // 2. category-wise revenue
      acc.categoryRevenue[p.category] =
        (acc.categoryRevenue[p.category] || 0) + revenue;

      // 3. product count
      acc.productSales[p.name] =
        (acc.productSales[p.name] || 0) + p.qty;
    });
    return acc;
  },
  { totalRevenue: 0, categoryRevenue: {}, productSales: {} }
);

// सबसे ज्यादा बिकने वाला product निकालना
const topProduct = Object.entries(summary.productSales).reduce(
  (max, [name, qty]) => (qty > max.qty ? { name, qty } : max),
  { name: null, qty: 0 }
);

console.log("💰 Total Revenue:", summary.totalRevenue);
console.log("📊 Category Revenue:", summary.categoryRevenue);
console.log("🏆 Top Selling Product:", topProduct);


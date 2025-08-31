let fetchUser = new Promise(resolve => 
  setTimeout(() => resolve("👤 User data fetched"), 1000)
);

let fetchOrders = new Promise(resolve => 
  setTimeout(() => resolve("📦 Orders fetched"), 1500)
);

let fetchCart = new Promise(resolve => 
  setTimeout(() => resolve("🛒 Cart fetched"), 1200)
);

// Run all together
Promise.all([fetchUser, fetchOrders, fetchCart])
  .then(results => {
    console.log("✅ All data loaded:", results);
  });

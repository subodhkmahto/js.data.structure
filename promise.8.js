// Simulate login API
function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    console.log("⏳ Logging in...");
    setTimeout(() => {
      if (username === "subodh" && password === "1234") {
        resolve({ id: 101, username: "subodh" });
      } else {
        reject("❌ Invalid username or password");
      }
    }, 1000);
  });
}

// Fetch cart items
function fetchCart(userId) {
  return new Promise((resolve) => {
    console.log("⏳ Fetching cart...");
    setTimeout(() => {
      resolve(["Laptop", "Mouse", "Keyboard"]);
    }, 1500);
  });
}

// Fetch product prices in parallel
function fetchPrice(product) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const prices = { Laptop: 50000, Mouse: 500, Keyboard: 1500 };
      resolve({ product, price: prices[product] });
    }, Math.random() * 2000); // random delay like real APIs
  });
}

// Process payment
function makePayment(amount) {
  return new Promise((resolve) => {
    console.log("⏳ Processing payment of ₹" + amount);
    setTimeout(() => resolve("💳 Payment successful!"), 2000);
  });
}

// Generate invoice
function generateInvoice(user, items, total) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`🧾 Invoice for ${user.username}: ${items.join(", ")} | Total = ₹${total}`);
    }, 1000);
  });
}

// FULL WORKFLOW using async/await
async function placeOrder() {
  try {
    const user = await loginUser("subodh", "1234");
    console.log("✅ Logged in:", user.username);

    const cart = await fetchCart(user.id);
    console.log("🛒 Cart items:", cart);

    // Fetch all product prices in parallel
    const prices = await Promise.all(cart.map(fetchPrice));
    console.log("💰 Prices:", prices);

    // Calculate total
    const total = prices.reduce((acc, item) => acc + item.price, 0);
    console.log("🧮 Total amount = ₹" + total);

    const paymentStatus = await makePayment(total);
    console.log(paymentStatus);

    const invoice = await generateInvoice(user, cart, total);
    console.log(invoice);

    console.log("🎉 Order completed successfully!");
  } catch (err) {
    console.error(err);
  }
}

// Run the workflow
placeOrder();

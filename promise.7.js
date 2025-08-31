function selectProduct() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("📦 Product selected"), 1000);
  });
}

function makePayment() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("💳 Payment successful"), 1500);
  });
}

function generateInvoice() {
  return new Promise((resolve) => {
    setTimeout(() => resolve("🧾 Invoice generated"), 500);
  });
}

// Chain them
selectProduct()
  .then(result => {
    console.log(result);
    return makePayment();
  })
  .then(result => {
    console.log(result);
    return generateInvoice();
  })
  .then(result => {
    console.log(result);
    console.log("🎉 Order completed!");
  });

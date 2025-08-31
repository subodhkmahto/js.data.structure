async function checkout() {
  try {
    let product = await selectProduct();
    console.log(product);

    let payment = await makePayment();
    console.log(payment);

    let invoice = await generateInvoice();
    console.log(invoice);

    console.log("🎉 Order completed with async/await!");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

checkout();

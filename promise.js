let arr = [1, 2, 3, 4, 5, 6];

// A function that returns a Promise
function calculate(arr) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      reject("Input must be an array");
    }

    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }

    resolve(sum); // success
  });
}

// Using the promise
calculate(arr)
  .then((result) => {
    console.log("✅ Sum =", result);
  })
  .catch((error) => {
    console.error("❌ Error:", error);
  });

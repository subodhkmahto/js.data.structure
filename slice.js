let arr = [1, 2, 3, 4, 5, 6];
console.log(arr.slice(2, 5)); // [3, 4, 5]  (from index 2 to 4)
console.log(arr.slice(0, 3)); // [1, 2, 3]  (from start to index 2)
console.log(arr.slice(3));    // [4, 5, 6]  (from index 3 to end)
console.log(arr.slice(-3));   // [4, 5, 6] (last 3 elements)
console.log(arr.slice(-5, -2)); // [2, 3, 4] (from -5 to -3)a   `
console.log(arr.slice());     // [1, 2, 3, 4, 5, 6] (shallow copy of entire array)
console.log(arr); // Original array remains unchanged

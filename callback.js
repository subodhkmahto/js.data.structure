let arr = [1, 2, 3, 4, 5, 6];

function calculate(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

function myDisplay(arr, callback) {
   return callback(arr);  // call the callback with array
}

// call function
let result = myDisplay(arr, calculate);

console.log("Sum =", result);

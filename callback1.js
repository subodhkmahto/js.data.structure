let arr = [1, 2, 3, 4, 5, 6];
console.log(arr);

function processNumbers(arr, callback) {
    return callback(arr);
}


// callback 1 → sum
function sumNumbers(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
}


// callback 2 → square each number
function squareNumbers(arr) {
    return arr.map(num => num * num);
}

// callback 3 → filter even numbers
function evenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}

// using different callbacks
console.log("Sum:", processNumbers(arr, sumNumbers));
console.log("Squares:", processNumbers(arr, squareNumbers));
console.log("Evens:", processNumbers(arr, evenNumbers));

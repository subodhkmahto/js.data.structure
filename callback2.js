let arr = [1, 2, 3, 4, 5, 6];

function processArray(arr, callbacks) {
    let result = arr;
    for (let fn of callbacks) {
        result = fn(result); // pass result into next callback
    }
    return result;
}

// callback 1 → double each number
function doubleNumbers(arr) {
    return arr.map(num => num * 2);
}

// callback 2 → filter numbers greater than 5
function filterGreaterThanFive(arr) {
    return arr.filter(num => num > 5);
}

// callback 3 → sum all numbers
function sumNumbers(arr) {
    return arr.reduce((acc, num) => acc + num, 0);
}

// apply multiple callbacks in sequence
let finalResult = processArray(arr, [doubleNumbers, filterGreaterThanFive, sumNumbers]);

console.log("Final Result:", finalResult);






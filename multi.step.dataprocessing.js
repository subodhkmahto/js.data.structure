function processArray(arr, callbacks) {
    let result = arr;
    for (let fn of callbacks) {
        result = fn(result); // pass result into next callback
    }
    return result;
    
}

// callback 1 → remove duplicates
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

// callback 2 → square each number
function squareNumbers(arr) {
    return arr.map(num => num * num);
}

// callback 3 → keep only odd numbers
function filterOdd(arr) {
    return arr.filter(num => num % 2 !== 0);
}

// callback 4 → convert to string labels
function toLabels(arr) {
    return arr.map(num => `Value-${num}`);
}

// callback 5 → join into one string
function joinAsString(arr) {
    return arr.join(", ");
}

let numbers = [2, 3, 2, 4, 5, 5, 6];

let result = processArray(numbers, [
    removeDuplicates,
    squareNumbers,
    filterOdd,
    toLabels,
    joinAsString
]);

console.log("Final Result:", result);

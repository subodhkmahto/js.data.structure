// Start with an array
let fruits = ["apple", "banana", "cherry"];

console.log("Initial:", fruits);

// 1. push() → add to END
fruits.push("orange");
console.log("After push:", fruits); // ["apple","banana","cherry","orange"]

// 2. pop() → remove from END
let last = fruits.pop();
console.log("After pop:", fruits);  // ["apple","banana","cherry"]
console.log("Removed with pop:", last); // "orange"

// 3. unshift() → add to BEGINNING
fruits.unshift("mango");
console.log("After unshift:", fruits); // ["mango","apple","banana","cherry"]

// 4. shift() → remove from BEGINNING
let first = fruits.shift();
console.log("After shift:", fruits);   // ["apple","banana","cherry"]
console.log("Removed with shift:", first); // "mango"

# JavaScript Functions and Methods

## Callback Functions

A **callback function** is a function passed as an argument to another function and is executed after some operation is completed.

```js
function fetchData(callback) {
    setTimeout(() => {
        callback("Data loaded");
    }, 1000);
}

fetchData(function(message) {
    console.log(message); // "Data loaded"
});
```

## Promises

A **Promise** represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

```js
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data loaded");
        }, 1000);
    });
}

fetchData().then(message => {
    console.log(message); // "Data loaded"
});
```

## Array Methods

### `slice()`

Returns a shallow copy of a portion of an array.

```js
const fruits = ["apple", "banana", "cherry"];
const citrus = fruits.slice(1, 3);
console.log(citrus); // ["banana", "cherry"]
```

### `splice()`

Changes the contents of an array by removing or replacing existing elements and/or adding new elements.

```js
const fruits = ["apple", "banana", "cherry"];
fruits.splice(1, 1, "orange");
console.log(fruits); // ["apple", "orange", "cherry"]
```

### `split()`

Splits a string into an array of substrings.

```js
const text = "apple,banana,cherry";
const arr = text.split(",");
console.log(arr); // ["apple", "banana", "cherry"]
```

### `reduce()`

Executes a reducer function on each element of the array, resulting in a single output value.

```js
const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 10
```

### `map()`

Creates a new array with the results of calling a function for every array element.

```js
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6]
```

### `filter()`

Creates a new array with all elements that pass the test implemented by the provided function.

```js
const numbers = [1, 2, 3, 4];
const even = numbers.filter(n => n % 2 === 0);
console.log(even); // [2, 4]
```

---

> **Tip:** Try these examples in your browser console for hands-on experience!
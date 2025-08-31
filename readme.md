# JavaScript Functions and Methods

## What is a Function?

A **function** in JavaScript is a block of code designed to perform a particular task. It can take inputs (parameters), process them, and return an output.

```js
function add(a, b) {
    return a + b;
}
```

## What is a Method?

A **method** is a function that is a property of an object. Methods are used to define behaviors for objects.

```js
const person = {
    greet: function() {
        console.log("Hello!");
    }
};

person.greet(); // "Hello!"
```

## Predefined (Built-in) Functions

JavaScript provides many built-in functions, such as:

- `alert()`
- `parseInt()`
- `isNaN()`
- `eval()`

Example:

```js
alert("Welcome!");
let num = parseInt("123");
```

## Summary

- **Function:** Standalone block of code.
- **Method:** Function attached to an object.
- **Predefined Functions:** Built-in functions provided by JavaScript.
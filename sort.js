let are=[4,3,1,5,2,6];
console.log(are.sort()); // [1, 2, 3, 4, 5, 6] (sorts as strings by default)
console.log(are); // Original array is modified
let arr2 = ['banana', 'apple', 'cherry', 'date'];
console.log(arr2.sort()); // ['apple', 'banana', 'cherry', 'date
console.log(arr2); // Original array is modified
// Custom sort function for numbers
let arr3 = [40, 100, 1, 5, 25, 10];
arr3.sort((a, b) => a - b); // Ascending order
console.log(arr3); // [1, 5, 10, 25, 40, 100]
arr3.sort((a, b) => b - a); // Descending order 
console.log(arr3); // [100, 40, 25, 10, 5, 1]
// Custom sort function for strings (case-insensitive)
let arr4 = ['Banana', 'apple', 'cherry', 'Date'];
arr4.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log(arr4); // ['apple', 'Banana', 'cherry', 'Date']
// Sort objects by a property
let items = [
    { name: 'Edward', value: 21 },
    { name: 'Sharpe', value: 37 },
    { name: 'And', value: 45 },
    { name: 'The', value: -12 },
    { name: 'Magnetic', value: 13 },
    { name: 'Zeros', value: 37 }
];
items.sort((a, b) => a.value - b.value); // Sort by value property
console.log(items);
// Sort by name property
items.sort((a, b) => a.name.localeCompare(b.name));
console.log(items);
// Stable sort example
let stableArr = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 30 },
    { name: 'David', age: 25 }
];
stableArr.sort((a, b) => a.age - b.age); // Sort by age
console.log(stableArr); // Original relative order of equal elements is preserved
// Reverse the array
stableArr.reverse();
console.log(stableArr); // Array is reversed
// Shuffle the array (Fisher-Yates algorithm)
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}   
shuffle(stableArr);
console.log(stableArr); // Array is shuffled
// Sort with multiple criteria
stableArr.sort((a, b) => {
    if (a.age === b.age) {
        return a.name.localeCompare(b.name); // If ages are equal, sort by name
    }
    return a.age - b.age; // Otherwise, sort by age
});
console.log(stableArr);
// Sort numbers with precision
let preciseArr = [1.1, 1.01, 1.001,
    2.1, 2.01, 2.001,
    10.1, 10.01, 10.001];
preciseArr.sort((a, b) => a - b);
console.log(preciseArr); // Sorted with correct precision
// Sort strings with special characters
let specialStrArr = ['résumé', 'resume', 'café', 'cafe', 'naïve', 'naive'];
specialStrArr.sort((a, b) => a.localeCompare(b));
console.log(specialStrArr); // Sorted considering special characters
// Sort dates
let dateArr = [
    new Date(2020, 1, 1),   
    new Date(2019, 5, 15),
    new Date(2021, 0, 10),
    new Date(2018, 11, 31)
];
dateArr.sort((a, b) => a - b); // Sort by date
console.log(dateArr); // Dates sorted in ascending order
// Sort with undefined and null values


let mixedArr = [3, null, 1, undefined, 2, null];
mixedArr.sort((a, b) => {   
    if (a === null) return 1; // nulls at the end
    if (b === null) return -1;
    if (a === undefined) return 1; // undefineds at the end
    if (b === undefined) return -1;
    return a - b; // Sort numbers normally
});
console.log(mixedArr); // [1, 2, 3, null, null, undefined]
// Sort large arrays efficiently
let largeArr = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 10000));
console.time("Large Array Sort");
largeArr.sort((a, b) => a - b);
console.timeEnd("Large Array Sort");
console.log(largeArr); // Large array sorted
// Example usage in data analytics (sorting derived data)
const orders = [
    { orderId: 1, customerId: 'C1', date: '2025-01-15', items: [ { name: 'Laptop', price: 1000, qty: 1 }, { name: 'Mouse', price: 50, qty: 2 } ] },
    { orderId: 2, customerId: 'C2', date: '2025-01-20', items: [ { name: 'Keyboard', price: 80, qty: 1 } ] },
    { orderId: 3, customerId: 'C1', date: '2025-02-05', items: [ { name: 'Monitor', price: 300, qty: 2 } ] },
    { orderId: 4, customerId: 'C3', date: '2025-02-10', items: [ { name: 'Laptop', price: 950, qty: 1 }, { name: 'Headphones', price: 150, qty: 1 } ] },
    { orderId: 5, customerId: 'C2', date: '2025-03-12', items: [ { name: 'Mouse', price: 45, qty: 1 }, { name: 'Keyboard', price: 75, qty: 1 } ] },
    ];
const ordersWithTotal = orders.map(order => {
    const total = order.items.reduce((sum, item) => sum + item.price * item.qty, 0);
    return { ...order, total };
}
);
ordersWithTotal.sort((a, b) => b.total - a.total); // Sort by total amount descending
console.log(ordersWithTotal); // Orders sorted by total amount
console.log(orders); // Original orders array remains unchanged
// Note: The sort() method modifies the original array. To keep the original array unchanged, create a copy using slice() or spread operator before sorting.
let arr = [10, 5, 20, 15];
let sortedArr = [...arr].sort((a, b) => a - b); // Create a sorted copy
console.log("Original Array:", arr); // [10, 5, 20, 15]
console.log("Sorted Copy:", sortedArr); // [5, 10, 15,
// 20]          
// Sorting strings with localeCompare for internationalization
let intlArr = ['ångström', 'apple', 'Äpple', 'banana', 'Ångström'];
intlArr.sort((a, b) => a.localeCompare(b));
console.log(intlArr); // Sorted considering locale
// Sorting with a dynamic property
function dynamicSort(property) {
    return function (a, b) {
        if (a[property] < b[property]) return -1;
        if (a[property] > b[property]) return 1;
        return 0;
    };
}   
let dynArr = [
    { name: 'John', age: 25 },
    { name: 'Jane', age: 22 },
    { name: 'Jim', age: 27 }
];
dynArr.sort(dynamicSort('age'));
console.log(dynArr); // Sorted by age
// Sorting with nullish coalescing
let nullishArr = [3, null, 1, undefined, 2, null];
nullishArr.sort((a, b) => (a ?? Infinity) - (b ?? Infinity)); // null/undefined at the end
console.log(nullishArr); // [1, 2, 3, null, null
// , undefined]
// Sorting with custom comparator for complex objects
let complexArr = [
    { name: 'Alice', scores: [90, 80, 85] },
    { name: 'Bob', scores: [70, 75, 80] },
    { name: 'Charlie', scores: [95, 85, 90] }
];
complexArr.sort((a, b) => {
    const avgA = a.scores.reduce((sum, score) => sum + score, 0) / a.scores.length;
    const avgB = b.scores.reduce((sum, score) => sum + score, 0) / b.scores.length;
    return avgB - avgA; // Sort by average score descending
});
console.log(complexArr); // Sorted by average scores
// Sorting with a comparison function that handles different data types
let mixedTypeArr = [3, 'apple', 1, 'banana', 2, 'cherry'];                          
mixedTypeArr.sort((a, b) => {
    if (typeof a === 'number' && typeof b === 'number') {
        return a - b; // Sort numbers normally
    }
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b); // Sort strings alphabetically
    }
    return typeof a === 'number' ? -1 : 1; // Numbers come before strings
}
);
console.log(mixedTypeArr); // [1, 2, 3, 'apple', 'banana', 'cherry']
// Sorting with a custom order defined by an array  
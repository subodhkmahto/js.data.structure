let arr=[1,2,3,4,5,6];
console.log(arr.splice(2, 2)); // [3, 4] (remove 2 elements from index 2)
console.log(arr); // [1, 2, 5, 6] (original array is modified)
console.log(arr.splice(1, 0, 10, 20)); // [] (remove 0 elements, add 10 and 20 at index 1)
console.log(arr); // [1, 10, 20, 2, 5, 6] (original array is modified)
console.log(arr.splice(3, 1, 30)); // [2] (remove 1 element at index 3, add 30)
console.log(arr); // [1, 10, 20, 30, 5, 6] (original array is modified)
console.log(arr.splice(-2, 1)); // [5] (remove 1 element from second last position)
console.log(arr); // [1, 10, 20, 30, 6] (original array is modified)
console.log(arr.splice(0)); // [1, 10, 20, 30, 6] (remove all elements from index 0)
let arr2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
console.log(arr2.splice(1, 3, 'x', 'y', 'z')); // ['b', 'c', 'd'] (remove 3 elements from index 1, add 'x', 'y', 'z')
console.log(arr2); // ['a', 'x', 'y', 'z', 'e', 'f', 'g']

// Remove last 2 elements and insert new ones
console.log(arr2.splice(-2, 2, 'm', 'n')); // ['f', 'g']
console.log(arr2); // ['a', 'x', 'y', 'z', 'e', 'm', 'n']

// Insert elements without removing any
console.log(arr2.splice(4, 0, 'p', 'q')); // []
console.log(arr2); // ['a', 'x', 'y', 'z', 'p', 'q', 'e', 'm', 'n']
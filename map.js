const students = [
  { id: 1, name: "Aman", marks: 80 },
  { id: 2, name: "Ravi", marks: 90 },
  { id: 3, name: "Neha", marks: 85 }
];

// sirf names uppercase me
const studentNames = students.map(student => student.name.toUpperCase());

console.log(studentNames); // ["AMAN", "RAVI", "NEHA"]


const upperStudents = students.map(student => ({
  ...student, // purana data copy
  name: student.name.toUpperCase() // name uppercase
}));

console.log(upperStudents);
/*
[
  { id: 1, name: "AMAN", marks: 80 },
  { id: 2, name: "RAVI", marks: 90 },
  { id: 3, name: "NEHA", marks: 85 }
]
*/

const users = [
  { id: 1, profile: { name: "Subodh", age: 16 } },
  { id: 2, profile: { name: "Kiran", age: 20 } },
  { id: 3, profile: { name: "Raj", age: 18 } }
];

// sirf name aur age ka simple array
const simpleUsers = users.map(user => ({
  userName: user.profile.name.toUpperCase(),
  age: user.profile.age
}));

console.log(simpleUsers);
/*
[
  { userName: "SUBODH", age: 16 },
  { userName: "KIRAN", age: 20 },
  { userName: "RAJ", age: 18 }
]
*/

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];

// map se HTML list banana
const productList = products.map(
  p => `<li>${p.name} - ₹${p.price}</li>`
);

console.log(productList.join(""));
// Output: "<li>Laptop - ₹50000</li><li>Phone - ₹20000</li>"

const fruits = ["apple", "banana", "mango"];

// index ke sath numbering
const numbered = fruits.map((fruit, index) => `${index + 1}. ${fruit}`);

console.log(numbered); 
// ["1. apple", "2. banana", "3. mango"]

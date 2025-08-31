const students = [
  { id: 1, name: "Aman", marks: 80 },
  { id: 2, name: "Ravi", marks: 55 },
  { id: 3, name: "Neha", marks: 92 }
];

// Table ke liye data banaya
const tableRows = students.map(s => ({
  ...s,
  passFail: s.marks >= 60 ? "Pass" : "Fail",
  grade: s.marks >= 90 ? "A+" : s.marks >= 75 ? "A" : "B"
}));

console.log(tableRows);
/*
[
  { id: 1, name: "Aman", marks: 80, passFail: "Pass", grade: "A" },
  { id: 2, name: "Ravi", marks: 55, passFail: "Fail", grade: "B" },
  { id: 3, name: "Neha", marks: 92, passFail: "Pass", grade: "A+" }
]
*/

const classes = [
  { id: 1, name: "Class 1", students: ["Aman", "Ravi"] },
  { id: 2, name: "Class 2", students: ["Neha", "Kiran"] }
];

const result = classes.map(c => ({
  className: c.name,
  students: c.students.map(s => s.toUpperCase())
}));

console.log(result);
/*
[
  { className: "Class 1", students: ["AMAN", "RAVI"] },
  { className: "Class 2", students: ["NEHA", "KIRAN"] }
]
*/

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 }
];

const uiData = products.map(p => ({
  id: p.id,
  title: p.name,
  subtitle: `Price: ₹${p.price}`,
  buttonText: "Buy Now"
}));

console.log(uiData);
/*
[
  { id: 1, title: "Laptop", subtitle: "Price: ₹50000", buttonText: "Buy Now" },
  { id: 2, title: "Phone", subtitle: "Price: ₹20000", buttonText: "Buy Now" }
]
*/

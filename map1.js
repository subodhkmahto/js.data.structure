const students = [
  { id: 1, name: "Aman", marks: 95 },
  { id: 2, name: "Ravi", marks: 67 },
  { id: 3, name: "Neha", marks: 82 },
  { id: 4, name: "Kiran", marks: 45 }
];

const withGrades = students.map(student => {
  let grade;
  if (student.marks >= 90) grade = "A+";
  else if (student.marks >= 75) grade = "A";
  else if (student.marks >= 50) grade = "B";
  else grade = "C";

  return {
    ...student,
    grade
  };
});

console.log(withGrades);
/*
[
  { id: 1, name: "Aman", marks: 95, grade: "A+" },
  { id: 2, name: "Ravi", marks: 67, grade: "B" },
  { id: 3, name: "Neha", marks: 82, grade: "A" },
  { id: 4, name: "Kiran", marks: 45, grade: "C" }
]
*/

const apiResponse = [
  { user_id: 101, user_info: { full_name: "Subodh", city: "Delhi" } },
  { user_id: 102, user_info: { full_name: "Ravi", city: "Mumbai" } }
];

const cleanData = apiResponse.map(user => ({
  id: user.user_id,
  name: user.user_info.full_name.toUpperCase(),
  city: user.user_info.city
}));

console.log(cleanData);
/*
[
  { id: 101, name: "SUBODH", city: "Delhi" },
  { id: 102, name: "RAVI", city: "Mumbai" }
]
*/
const orders = [
  { id: 1, item: "Laptop", price: 50000, status: "pending" },
  { id: 2, item: "Phone", price: 20000, status: "delivered" },
  { id: 3, item: "Tablet", price: 15000, status: "pending" }
];


const processedOrders = orders.map(order => ({
  ...order,
  priceWithTax: order.price * 1.18, // 18% GST
  isDelivered: order.status === "delivered"
}));

console.log(processedOrders);
/*
[
  { id: 1, item: "Laptop", price: 50000, status: "pending", priceWithTax: 59000, isDelivered: false },
  { id: 2, item: "Phone", price: 20000, status: "delivered", priceWithTax: 23600, isDelivered: true },
  { id: 3, item: "Tablet", price: 15000, status: "pending", priceWithTax: 17700, isDelivered: false }
]
*/

const products = [
  { id: 1, name: "Shoes", price: 2000 },
  { id: 2, name: "Shirt", price: 1500 },
  { id: 3, name: "Jeans", price: 2500 }
];

// 10% discount sab pe
const discounted = products.map(p => ({
  ...p,
  discountedPrice: p.price * 0.9
}));

console.log(discounted);
/*
[
  { id: 1, name: "Shoes", price: 2000, discountedPrice: 1800 },
  { id: 2, name: "Shirt", price: 1500, discountedPrice: 1350 },
  { id: 3, name: "Jeans", price: 2500, discountedPrice: 2250 }
]
*/
const students = ["Aman", "Ravi", "Neha"];

const withRollNo = students.map((name, index) => ({
  rollNo: index + 1,
  name
}));

console.log(withRollNo);
/*
[
  { rollNo: 1, name: "Aman" },
  { rollNo: 2, name: "Ravi" },
  { rollNo: 3, name: "Neha" }
]
*/
const csv = [
  "1,Aman,80",
  "2,Ravi,90",
  "3,Neha,85"
];

const parsed = csv.map(line => {
  const [id, name, marks] = line.split(",");
  return { id: Number(id), name, marks: Number(marks) };
});

console.log(parsed);
/*
[
  { id: 1, name: "Aman", marks: 80 },
  { id: 2, name: "Ravi", marks: 90 },
  { id: 3, name: "Neha", marks: 85 }
]
*/

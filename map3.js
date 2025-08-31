const apiResponse = [
  {
    id: 1,
    user: { firstName: "Aman", lastName: "Kumar" },
    orders: [
      { product: "Laptop", price: 50000 },
      { product: "Mouse", price: 1000 }
    ]
  },
  {
    id: 2,
    user: { firstName: "Neha", lastName: "Sharma" },
    orders: [
      { product: "Phone", price: 20000 }
    ]
  }
];

// User ke saath total order price nikalna

const transformed = apiResponse.map(u => ({
  id: u.id,
  name: `${u.user.firstName} ${u.user.lastName}`,
  totalAmount: u.orders.map(o => o.price).reduce((a, b) => a + b, 0)
}));

console.log(transformed);

/*
[
  { id: 1, name: "Aman Kumar", totalAmount: 51000 },
  { id: 2, name: "Neha Sharma", totalAmount: 20000 }
]
*/

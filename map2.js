const users = [
  { id: 1, name: "Aman", email: "aman@example.com" },
  { id: 2, name: "Ravi", email: "ravi@example.com" },
  { id: 3, name: "Neha", email: "neha@example.com" }
];

// sirf id aur name nikalna

const idNameList = users.map(user => ({
  id: user.id,
  name: user.name
}));

console.log(idNameList);

/*
[
  { id: 1, name: "Aman" },
  { id: 2, name: "Ravi" },
  { id: 3, name: "Neha" }
]
*/

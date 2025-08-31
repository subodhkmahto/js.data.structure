const categories = [
  { id: "elc", name: "Electronics" },
  { id: "clt", name: "Clothes" },
  { id: "fnt", name: "Furniture" }
];

const dropdownOptions = categories.map(c => ({
  value: c.id,
  label: c.name.toUpperCase()
}));

console.log(dropdownOptions);
/*
[
  { value: "elc", label: "ELECTRONICS" },
  { value: "clt", label: "CLOTHES" },
  { value: "fnt", label: "FURNITURE" }
]
*/

const searchResults = [
  { id: 1, title: "iPhone 15", rating: 4.5, reviews: 2300 },
  { id: 2, title: "Samsung Galaxy S24", rating: 4.2, reviews: 1800 },
  { id: 3, title: "OnePlus 12", rating: 4.6, reviews: 1500 }
];

const formatted = searchResults.map(p => ({
  title: p.title,
  stars: "⭐".repeat(Math.round(p.rating)),
  reviewText: `${p.reviews} Reviews`
}));

console.log(formatted);
/*
[
  { title: "iPhone 15", stars: "⭐⭐⭐⭐⭐", reviewText: "2300 Reviews" },
  { title: "Samsung Galaxy S24", stars: "⭐⭐⭐⭐", reviewText: "1800 Reviews" },
  { title: "OnePlus 12", stars: "⭐⭐⭐⭐⭐", reviewText: "1500 Reviews" }
]
*/

const locations = [
  { id: 1, place: "Delhi", lat: 28.6, lng: 77.2 },
  { id: 2, place: "Mumbai", lat: 19.0, lng: 72.8 }
];

const markers = locations.map(loc => ({
  id: loc.id,
  label: loc.place,
  coords: [loc.lat, loc.lng]
}));

console.log(markers);
/*
[
  { id: 1, label: "Delhi", coords: [28.6, 77.2] },
  { id: 2, label: "Mumbai", coords: [19.0, 72.8] }
]
*/

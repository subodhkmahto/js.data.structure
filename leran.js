const clicks = [
  { user: "U1", page: "Home", time: 1 },
  { user: "U1", page: "Category", time: 2 },
  { user: "U1", page: "Product", time: 3 },
  { user: "U2", page: "Home", time: 1 },
  { user: "U2", page: "Search", time: 2 },
  { user: "U2", page: "Product", time: 3 },
];

// Higher-order function
function myDisplay(arr, callback) { 
  return callback(arr);
}

// Callback function to transform data
function showResult(result) {
  // calculate total time for all clicks
  const totalTime = result.reduce((acc, click) => acc + click.time, 0);

  // return transformed clicks
  return result.map((click) => ({
    ...click,
    totalTime,                // total time across all clicks
    timeSpent: click.time * 10 // example: multiply time by 10
  }));
}

// Run pipeline
let value = myDisplay(clicks, showResult);

console.log(value);

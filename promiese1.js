function fetchUser(id) {
  return new Promise((resolve, reject) => {
    console.log("⏳ Fetching user from DB...");
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "Subodh", role: "Student" });
      } else {
        reject("Invalid user ID");
      }
    }, 2000); // simulating 2 sec delay
  });
}

// Usage
fetchUser(1)
  .then(user => {
    console.log("✅ User fetched:", user);
  })
  .catch(err => {
    console.error("❌ Error:", err);
  });

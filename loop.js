let arr = [10, 20, 30, 40];

// 1. Classic for loop
console.log("1️⃣ Classic for loop:");
for (let i = 0; i < arr.length; i++) {
    console.log(`Index: ${i}, Value: ${arr[i]}`);
}

// 2. for...of loop
console.log("\n2️⃣ for...of loop:");
for (let value of arr) {
    console.log(`Value: ${value}`);
}

// 3. for...in loop
console.log("\n3️⃣ for...in loop:");
for (let index in arr) {
    console.log(`Index: ${index}, Value: ${arr[index]}`);
}

// 4. while loop
console.log("\n4️⃣ while loop:");
let i = 0;
while (i < arr.length) {
    console.log(`Index: ${i}, Value: ${arr[i]}`);
    i++;
}

// 5. do...while loop
console.log("\n5️⃣ do...while loop:");
let j = 0;
do {
    console.log(`Index: ${j}, Value: ${arr[j]}`);
    j++;
} while (j < arr.length);

// 6. forEach method
console.log("\n6️⃣ forEach loop:");
arr.forEach((value, index) => {
    console.log(`Index: ${index}, Value: ${value}`);
});

// 7. map method
console.log("\n7️⃣ map loop:");
let doubled = arr.map(num => num * 2);
console.log("Doubled Array:", doubled);

// 8. filter method
console.log("\n8️⃣ filter loop:");
let greaterThan20 = arr.filter(num => num > 20);
console.log("Filtered Array (>20):", greaterThan20);

// 9. reduce method
console.log("\n9️⃣ reduce loop:");
let sum = arr.reduce((acc, num) => acc + num, 0);
console.log("Sum of Array:", sum);

// 10. for await...of loop (Async Example)
console.log("\n🔟 for await...of loop:");
async function run() {
    let promises = [Promise.resolve(100), Promise.resolve(200), Promise.resolve(300)];
    for await (let value of promises) {
        console.log(`Resolved Value: ${value}`);
    }
}
run();

let str="i love javascript";
console.log(str.split(" ")); // ['i', 'love', 'javascript']
console.log(str.split("")); // ['i', ' ', 'l', 'o', 'v', 'e', ' ', 'j', 'a', 'v', 'a', 's', 'c', 'r', 'i', 'p', 't']
console.log(str.split(" ",2)); // ['i', 'love'] (limit to 2 parts)
console.log(str.split("o")); // ['i l', 've javascript'] (split at 'o')
console.log(str.split("o",2)); // ['i l', 've javascript'] (limit to 2 parts)
console.log(str.split("a")); // ['i love j', 'v', 'script'] (split at 'a')
console.log(str.split("a",2)); // ['i love j', 'v'] (limit to 2 parts)      
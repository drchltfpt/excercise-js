const module3 = require("my-third-module");

console.log("Using Person class of module");

const person = new module3.Person("Smith", 21);

person.showInfo();

console.log("=====================")
console.log("Using Multiple function of module");

const mul = module3.multiple(4, 5);

console.log("Value = " + mul);

console.log("=======================");
console.log("Using Variable of module");

const copyRight = module3.COPY_RIGHT;

console.log("Copy Right: " + copyRight);

// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const instArray = data.split('\n');

// part 1
let x = 0;
let y = 0;

for (let index = 0; index < instArray.length; index++) {
    const instruction = instArray[index];
    const value = Number(instruction.slice(instruction.length - 1));

    if (instruction.startsWith('forward')) {
        x += value;
    } else if (instruction.startsWith('up')) {
        y -= value;
    } else {
        y += value;
    }
}

// part 1
let x2 = 0;
let y2 = 0;
let aim = 0;

for (let index = 0; index < instArray.length; index++) {
    const instruction = instArray[index];
    const value = Number(instruction.slice(instruction.length - 1));

    if (instruction.startsWith('forward')) {
        x2 += value;
        y2 += aim * value;
    } else if (instruction.startsWith('up')) {
        aim -= value;
    } else if (instruction.startsWith('down')) {
        aim += value;
    }
}

// result
console.log('part 1', x * y);
console.log('part 2', x2 * y2);

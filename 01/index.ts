// base setup
import fs from 'fs';
const data = fs.readFileSync('./input.txt', 'utf8');
const numberArray = data.split('\n').map((txtNumber) => Number(txtNumber));

// part 1
let count1 = 0;
for (let index = 1; index < numberArray.length; index++) {
    if (numberArray[index] > numberArray[index - 1]) {
        count1++;
    }
}

// part 2
let count2 = 0;
for (let index = 3; index < numberArray.length; index++) {
    const mw1 = numberArray[index - 1] + numberArray[index - 2] + numberArray[index - 3];
    const mw2 = numberArray[index] + numberArray[index - 1] + numberArray[index - 2];
    if (mw2 > mw1) {
        count2++;
    }
}

// result
console.log('part 1', count1);
console.log('part 2', count2);

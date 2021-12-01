const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');

const numberArray = data.split('\n').map((txtNumer) => Number(txtNumer));
console.log(numberArray);

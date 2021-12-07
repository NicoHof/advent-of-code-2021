// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split(',').map((item) => Number(item));

const median = (values) => {
    if (values.length === 0) throw new Error('No inputs');
    values.sort(function (a, b) {
        return a - b;
    });
    var half = Math.floor(values.length / 2);
    if (values.length % 2) return values[half];
    return (values[half - 1] + values[half]) / 2.0;
};

const part1 = () => {
    const med = median(rawSplit);

    const fuel = rawSplit.reduce((prev, curr) => {
        const fuelNeeded = Math.abs(curr - med);
        return (prev += fuelNeeded);
    }, 0);

    return fuel;
};

const part2 = () => {
    const sum = rawSplit.reduce((prev, curr) => {
        return (prev += curr);
    }, 0);

    // must use floor and not round... close thing here.
    const avg = Math.floor(sum / rawSplit.length);

    const fuel = rawSplit.reduce((prev, curr) => {
        const stepsNeeded = Math.abs(curr - avg);
        const fuelNeeded = Array(stepsNeeded)
            .fill('')
            .reduce((prev, curr, currentIndex) => {
                return (prev += currentIndex + 1);
            }, 0);
        return (prev += fuelNeeded);
    }, 0);

    return fuel;
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

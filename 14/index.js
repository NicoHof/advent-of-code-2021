// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');
const seed = rawSplit[0];
const rules = rawSplit.slice(2);

function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
}

const part1 = () => {
    let newSeed = seed;

    for (let index = 0; index < 11; index++) {
        newSeed = newSeed.split('').reduce((prev, curr, currIndex) => {
            const toCheck = curr + newSeed[currIndex + 1];
            const found = rules.find((item) => item.startsWith(toCheck));
            if (found) {
                const toInsert = found.substr(found.length - 1);
                return `${prev}${curr}${toInsert}`;
            }
            return prev + curr;
        }, '');
    }

    const countMap = newSeed.split('').reduce((prev, cur) => {
        prev[cur] = (prev[cur] || 0) + 1;
        return prev;
    }, {});

    const sortedValues = Object.values(countMap).sort((a, b) => {
        return b - a;
    });

    // const highest = getKeyByValue(countMap, sortedValues[0]);
    // const lowest = getKeyByValue(countMap, sortedValues[sortedValues.length - 1]);

    return sortedValues[0] - sortedValues[sortedValues.length - 1];
};

const part2 = () => {
    // let currentValue = seed.length;
    // for (let step = 0; step < 10; step++) {
    //     currentValue = currentValue * 2 - 1;
    // }
    // return currentValue;
    // let newSeed = seed;
    // for (let index = 0; index < 10; index++) {
    //     newSeed = newSeed.split('').reduce((prev, curr, currIndex) => {
    //         const toCheck = curr + newSeed[currIndex + 1];
    //         const found = rules.find((item) => item.startsWith(toCheck));
    //         if (found) {
    //             const toInsert = found.substr(found.length - 1);
    //             return `${prev}${curr}${toInsert}`;
    //         }
    //         return prev + curr;
    //     }, '');
    //     const countMap = newSeed.split('').reduce((prev, cur) => {
    //         prev[cur] = (prev[cur] || 0) + 1;
    //         return prev;
    //     }, {});
    //     const sortedValues = Object.values(countMap).sort((a, b) => {
    //         return b - a;
    //     });
    //     console.log(sortedValues);
    // }
    // const highest = getKeyByValue(countMap, sortedValues[0]);
    // const lowest = getKeyByValue(countMap, sortedValues[sortedValues.length - 1]);
    // return sortedValues[0] - sortedValues[sortedValues.length - 1];
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

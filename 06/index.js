// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split(',').map((item) => Number(item));

const part1 = (days) => {
    const reproductionRate = 6; // 7 but 0 start
    const additionalFirstCyle = 2;
    let fishys = [...rawSplit];
    const interpolationValues = [];
    interpolationValues.push(fishys.length);

    for (let day = 0; day < days; day++) {
        const newFishys = [];
        for (let fishIndex = 0; fishIndex < fishys.length; fishIndex++) {
            const fish = fishys[fishIndex];
            if (fish === 0) {
                fishys[fishIndex] = reproductionRate;
                newFishys.push(reproductionRate + additionalFirstCyle); // a new fishy is born
            } else {
                fishys[fishIndex] = fish - 1;
            }
        }
        fishys = [...fishys, ...newFishys];
        interpolationValues.push(fishys.length);
    }
    fs.writeFileSync('./export.txt', interpolationValues, 'utf8');

    return fishys.length;
};

const part2 = (days) => {
    const reproductionRate = 6; // 7 but 0 start
    const additionalFirstCyle = 2;
    let fishys = [4];

    for (let day = 0; day < days; day++) {
        const newFishys = [];
        for (let fishIndex = 0; fishIndex < fishys.length; fishIndex++) {
            const fish = fishys[fishIndex];
            if (fish === 0) {
                fishys[fishIndex] = reproductionRate;
                newFishys.push(reproductionRate + additionalFirstCyle); // a new fishy is born
            } else {
                fishys[fishIndex] = fish - 1;
            }
        }
        fishys = [...fishys, ...newFishys];
        console.log(day);
    }

    return fishys.length;
};

// result
console.log('part 1', part1(100));
// console.log('part 2', part2(256));

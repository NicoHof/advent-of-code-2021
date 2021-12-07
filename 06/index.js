// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split(',').map((item) => Number(item));

const part1 = (days) => {
    const reproductionRate = 6; // 7 but 0 start
    const additionalFirstCyle = 2;
    let fishys = [...rawSplit];

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
    }

    return fishys.length;
};

const part2 = (days) => {
    let fishys = Array(9)
        .fill(0)
        .map((_, index) => {
            return rawSplit.filter((num) => {
                return num === index;
            }).length;
        });

    for (let day = 0; day < days; day++) {
        const newFishys = [];

        for (let fishIndex = fishys.length; fishIndex >= 0; fishIndex--) {
            if (fishIndex === 0) {
                // new ones
                newFishys[8] = fishys[fishIndex];
                // old ones
                newFishys[6] = fishys[fishIndex] + fishys[7];
            } else {
                newFishys[fishIndex - 1] = fishys[fishIndex];
            }
        }

        fishys = newFishys;
    }

    return fishys.reduce((prev, curr) => {
        return prev + curr;
    }, 0);
};

// result
console.log('part 1', part1(80));
console.log('part 2', part2(256));

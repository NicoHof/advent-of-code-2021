// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');
const map = rawSplit.map((row) => row.split('').map((item) => Number(item)));

const part1 = () => {
    let sum = 0;

    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const row = map[rowIndex];

        for (let index = 0; index < row.length; index++) {
            const item = row[index];

            // if not first row, check above
            if (rowIndex > 0) {
                if (map[rowIndex - 1][index] <= item) {
                    continue;
                }
            }
            // if not last row, check below
            if (rowIndex < map.length - 1) {
                if (map[rowIndex + 1][index] <= item) {
                    continue;
                }
            }
            // if not very left, check left
            if (index > 0) {
                if (row[index - 1] <= item) {
                    continue;
                }
            }
            // if not very right, check right
            if (index < row.length - 1) {
                if (row[index + 1] <= item) {
                    continue;
                }
            }

            sum += item + 1;
        }
    }

    return sum;
};

const part2 = () => {
    const basins = [];

    for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
        const row = map[rowIndex];

        for (let index = 0; index < row.length; index++) {
            const item = row[index];

            // if not first row, check above
            if (rowIndex > 0) {
                if (map[rowIndex - 1][index] <= item) {
                    continue;
                }
            }
            // if not last row, check below
            if (rowIndex < map.length - 1) {
                if (map[rowIndex + 1][index] <= item) {
                    continue;
                }
            }
            // if not very left, check left
            if (index > 0) {
                if (row[index - 1] <= item) {
                    continue;
                }
            }
            // if not very right, check right
            if (index < row.length - 1) {
                if (row[index + 1] <= item) {
                    continue;
                }
            }

            // WE HIT A BASIN LOWPOINT
            const tmpMap = JSON.parse(JSON.stringify(map));
            tmpMap[rowIndex][index] = -1;

            const foundPoints = [[rowIndex, index]];
            let someNew = true;
            while (someNew) {
                someNew = false;

                for (let searchIndex = 0; searchIndex < foundPoints.length; searchIndex++) {
                    const element = foundPoints[searchIndex];
                    const elRowIndex = element[0];
                    const elItemIndex = element[1];

                    // if not first row, check above
                    if (elRowIndex > 0) {
                        if (tmpMap[elRowIndex - 1][elItemIndex] !== 9 && tmpMap[elRowIndex - 1][elItemIndex] !== -1) {
                            tmpMap[elRowIndex - 1][elItemIndex] = -1;
                            foundPoints.push([elRowIndex - 1, elItemIndex]);
                            someNew = true;
                        }
                    }
                    // if not last row, check below
                    if (elRowIndex < tmpMap.length - 1) {
                        if (tmpMap[elRowIndex + 1][elItemIndex] !== 9 && tmpMap[elRowIndex + 1][elItemIndex] !== -1) {
                            tmpMap[elRowIndex + 1][elItemIndex] = -1;
                            foundPoints.push([elRowIndex + 1, elItemIndex]);
                            someNew = true;
                        }
                    }
                    // if not very left, check left
                    if (elItemIndex > 0) {
                        if (tmpMap[elRowIndex][elItemIndex - 1] !== 9 && tmpMap[elRowIndex][elItemIndex - 1] !== -1) {
                            tmpMap[elRowIndex][elItemIndex - 1] = -1;
                            foundPoints.push([elRowIndex, elItemIndex - 1]);
                            someNew = true;
                        }
                    }
                    // if not very right, check right
                    if (elItemIndex < row.length - 1) {
                        if (tmpMap[elRowIndex][elItemIndex + 1] !== 9 && tmpMap[elRowIndex][elItemIndex + 1] !== -1) {
                            tmpMap[elRowIndex][elItemIndex + 1] = -1;
                            foundPoints.push([elRowIndex, elItemIndex + 1]);
                            someNew = true;
                        }
                    }
                }
            }

            basins.push(foundPoints.length);
        }
    }

    const sorted = basins.sort(function (a, b) {
        return b - a;
    });

    return basins
        .sort((a, b) => {
            return b - a;
        })
        .slice(0, 3)
        .reduce((prev, curr) => {
            return prev * curr;
        }, 1);
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

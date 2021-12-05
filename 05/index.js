// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');

const part1 = () => {
    const mapSize = 1000;
    const map = Array(mapSize)
        .fill('')
        .map(() => Array(mapSize).fill(0));

    for (let itemIndex = 0; itemIndex < rawSplit.length; itemIndex++) {
        const item = rawSplit[itemIndex];
        // const item = '8,8 -> 3,8';
        const noSpaces = item.replace(/\s+/g, '');
        const splitUp = noSpaces.split('->');
        const coords = splitUp.map((item) => item.split(','));
        const from = coords[0].map((item) => Number(item));
        const to = coords[1].map((item) => Number(item));

        if (from[0] === to[0]) {
            // vertically
            const range = Math.abs(from[1] - to[1]);
            const start = Math.min(from[1], to[1]);
            for (let rangeIndex = 0; rangeIndex <= range; rangeIndex++) {
                map[start + rangeIndex][from[0]] = map[start + rangeIndex][from[0]] + 1;
            }
        } else if (from[1] === to[1]) {
            // horizontal
            const range = Math.abs(from[0] - to[0]);
            const start = Math.min(from[0], to[0]);
            for (let rangeIndex = 0; rangeIndex <= range; rangeIndex++) {
                map[from[1]][start + rangeIndex] = map[from[1]][start + rangeIndex] + 1;
            }
        }
    }

    let counter = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            const element = map[x][y];
            if (element >= 2) {
                counter++;
            }
        }
    }

    return counter;
};

const part2 = () => {
    const mapSize = 1000;
    const map = Array(mapSize)
        .fill('')
        .map(() => Array(mapSize).fill(0));

    for (let itemIndex = 0; itemIndex < rawSplit.length; itemIndex++) {
        const item = rawSplit[itemIndex];
        // const item = '3,1 -> 7,5';
        const noSpaces = item.replace(/\s+/g, '');
        const splitUp = noSpaces.split('->');
        const coords = splitUp.map((item) => item.split(','));
        const from = coords[0].map((item) => Number(item));
        const to = coords[1].map((item) => Number(item));

        if (from[0] === to[0]) {
            // vertically
            const range = Math.abs(from[1] - to[1]);
            const start = Math.min(from[1], to[1]);
            for (let rangeIndex = 0; rangeIndex <= range; rangeIndex++) {
                map[start + rangeIndex][from[0]] = map[start + rangeIndex][from[0]] + 1;
            }
        } else if (from[1] === to[1]) {
            // horizontal
            const range = Math.abs(from[0] - to[0]);
            const start = Math.min(from[0], to[0]);
            for (let rangeIndex = 0; rangeIndex <= range; rangeIndex++) {
                map[from[1]][start + rangeIndex] = map[from[1]][start + rangeIndex] + 1;
            }
        } else {
            // diagonal
            const range = Math.abs(from[0] - to[0]);
            const xMultiplyer = to[0] > from[0] ? 1 : -1;
            const yMultiplyer = to[1] > from[1] ? 1 : -1;
            for (let rangeIndex = 0; rangeIndex <= range; rangeIndex++) {
                map[from[1] + rangeIndex * yMultiplyer][from[0] + rangeIndex * xMultiplyer] =
                    map[from[1] + rangeIndex * yMultiplyer][from[0] + rangeIndex * xMultiplyer] + 1;
            }
        }
    }

    let counter = 0;

    for (let y = 0; y < map.length; y++) {
        for (let x = 0; x < map.length; x++) {
            const element = map[x][y];
            if (element >= 2) {
                counter++;
            }
        }
    }

    return counter;
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

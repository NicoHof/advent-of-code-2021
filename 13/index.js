// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');
const foldings = rawSplit.filter((item) => item.startsWith('fold along'));
const initialPoints = rawSplit
    .slice(0, rawSplit.length - (foldings.length + 1))
    .map((item) => item.split(',').map((str) => Number(str)));

const getMapSize = (points, pos) => {
    return points
        .map((item) => {
            return item[pos];
        })
        .sort((a, b) => {
            return b - a;
        })[0];
};

const fold = (points, axis, foldline) => {
    const newPoints = points.map((point) => {
        if (point[axis] < foldline) {
            return point;
        }
        return [
            axis === 0 ? point[0] - 2 * (point[0] - foldline) : point[0],
            axis === 1 ? point[1] - 2 * (point[1] - foldline) : point[1],
        ];
    });

    const withoutDuplicates = [
        ...new Set(
            newPoints.map((el) => {
                return `${el[0]},${el[1]}`;
            })
        ),
    ].map((item) => {
        return item.split(',').map((str) => Number(str));
    });

    return withoutDuplicates;
};

const part1 = () => {
    let points = initialPoints;

    for (let round = 0; round < foldings.length; round++) {
        const instruction = foldings[round];
        const split = instruction.split('=');
        const axis = split[0].slice(-1);
        const amount = Number(split[1]);
        points = fold(points, axis === 'x' ? 0 : 1, amount);
    }

    // day 1: stop after first iteration and return points length

    const mapSizeX = getMapSize(points, 0);
    const mapSizeY = getMapSize(points, 1);

    const finalMap = [];
    for (let row = 0; row <= mapSizeY; row++) {
        const rowArray = [];
        for (let index = 0; index <= mapSizeX; index++) {
            const point = points.find((p) => {
                return p[0] === index && p[1] === row;
            });
            if (point) {
                rowArray.push('#');
            } else {
                rowArray.push(' ');
            }
        }
        finalMap.push(rowArray);
    }
    const readableMap = finalMap.map((row) => row.join(' '));
    return readableMap;
};

// result
console.log(part1());

// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const inputMap = data.split('\n').map((row) => row.split('').map((item) => Number(item)));

const part1 = (map) => {
    const gridSize = map.length;
    const technicalGridSize = gridSize - 1;
    let paths = [
        {
            x: 0,
            y: 0,
            count: 0,
            done: false,
        },
    ];
    let currentWinner = 100000000;

    while (paths.length > 0) {
        const newPaths = [];
        for (let pIndex = 0; pIndex < paths.length; pIndex++) {
            const path = paths[pIndex];
            if (path.x < technicalGridSize) {
                if (path.y < technicalGridSize) {
                    newPaths.push({
                        x: path.x,
                        y: path.y + 1,
                        count: path.count + map[path.y + 1][path.x],
                        done: false,
                    });
                }

                path.x++;
                path.count += map[path.y][path.x];
            } else if (path.y < technicalGridSize) {
                path.y++;
                path.count += map[path.y][path.x];
            }
        }

        paths = [...paths, ...newPaths];

        for (let pIndex = 0; pIndex < paths.length; pIndex++) {
            const path = paths[pIndex];
            if (path.x === technicalGridSize && path.y === technicalGridSize) {
                path.done = true;
                if (path.count < currentWinner) {
                    currentWinner = path.count;
                }
            }
        }

        paths = paths.filter((path) => !path.done);

        const coordsToCheck = [];
        // only keep the paths with the lowest cost on the coordinates
        for (let index = 0; index < paths.length; index++) {
            const path = paths[index];
            const some = coordsToCheck.some((item) => item.x === path.x && item.y === path.y);
            if (!some) {
                coordsToCheck.push({ x: path.x, y: path.y });
            }
        }

        const newFullPaths = [];
        for (let index = 0; index < coordsToCheck.length; index++) {
            const element = coordsToCheck[index];
            const pathsToCompare = paths.filter((path) => path.x === element.x && path.y === element.y);
            const bestScore = Math.min(...pathsToCompare.map((item) => item.count));
            const winner = pathsToCompare.find((path) => {
                if (path.count === bestScore) {
                    return true;
                }
                return false;
            });
            newFullPaths.push(winner);
        }

        paths = newFullPaths;
    }

    return currentWinner;
};

const getExtendedMap = (multiplier) => {
    const mapSize = inputMap.length;
    let newMap = [];

    for (let rowIndex = 0; rowIndex < mapSize; rowIndex++) {
        const row = inputMap[rowIndex];
        const newRow = [...row];
        for (let multi = 0; multi < multiplier; multi++) {
            for (let index = 0; index < mapSize; index++) {
                const element = newRow[multi * mapSize + index];
                newRow.push(element + 1 > 9 ? 1 : element + 1);
            }
        }
        newMap.push(newRow);
    }

    let finalMap = [...newMap];
    for (let multi = 1; multi <= multiplier; multi++) {
        const newSection = newMap.map((row) => {
            return row.map((item) => {
                return item + multi > 9 ? item + multi - 9 : item + multi;
            });
        });
        finalMap = [...finalMap, ...newSection];
    }

    // console.log(finalMap);

    return finalMap;
};

// result
console.log('part 1', part1(inputMap));
console.log('part 2', part1(getExtendedMap(4)));

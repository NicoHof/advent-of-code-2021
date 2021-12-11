// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const map = data.split('\n').map((row) => row.split('').map((numberAsString) => Number(numberAsString)));

const part1 = () => {
    const steps = 100;
    let totalFlashes = 0;

    for (let step = 0; step < steps; step++) {
        // first increase all by 1
        for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
            const row = map[rowIndex];

            for (let index = 0; index < row.length; index++) {
                row[index] = row[index] + 1;
            }
        }

        // then do the recursive flashing
        let checkMoreFlashes = true;
        while (checkMoreFlashes) {
            checkMoreFlashes = false;

            const checkAndIncrease = (rowIndex, index) => {
                if (map[rowIndex][index] > 0) {
                    map[rowIndex][index] = map[rowIndex][index] + 1;
                    if (map[rowIndex][index] >= 10) {
                        checkMoreFlashes = true;
                    }
                }
            };

            for (let step = 0; step < steps; step++) {
                for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
                    const row = map[rowIndex];

                    for (let index = 0; index < row.length; index++) {
                        if (row[index] >= 10) {
                            // flash self first
                            row[index] = 0;
                            totalFlashes++;

                            // if not first row, check above
                            if (rowIndex > 0) {
                                // direct above
                                checkAndIncrease(rowIndex - 1, index);
                                // has left
                                if (index > 0) {
                                    checkAndIncrease(rowIndex - 1, index - 1);
                                }
                                // has right
                                if (index < row.length - 1) {
                                    checkAndIncrease(rowIndex - 1, index + 1);
                                }
                            }
                            // if not last row, check below
                            if (rowIndex < map.length - 1) {
                                // direct below
                                checkAndIncrease(rowIndex + 1, index);
                                // has left
                                if (index > 0) {
                                    checkAndIncrease(rowIndex + 1, index - 1);
                                }
                                // has right
                                if (index < row.length - 1) {
                                    checkAndIncrease(rowIndex + 1, index + 1);
                                }
                            }
                            // if not very left, check left
                            if (index > 0) {
                                checkAndIncrease(rowIndex, index - 1);
                            }
                            // if not very right, check right
                            if (index < row.length - 1) {
                                checkAndIncrease(rowIndex, index + 1);
                            }
                        }
                    }
                }
            }
        }
    }

    return totalFlashes;
};

const part2 = () => {
    const steps = 1000;
    let totalFlashes = 0;

    for (let step = 1; step < steps; step++) {
        let stepFlashCounter = 0;

        // first increase all by 1
        for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
            const row = map[rowIndex];

            for (let index = 0; index < row.length; index++) {
                row[index] = row[index] + 1;
            }
        }

        // then do the recursive flashing
        let checkMoreFlashes = true;
        while (checkMoreFlashes) {
            checkMoreFlashes = false;

            const checkAndIncrease = (rowIndex, index) => {
                if (map[rowIndex][index] > 0) {
                    map[rowIndex][index] = map[rowIndex][index] + 1;
                    if (map[rowIndex][index] >= 10) {
                        checkMoreFlashes = true;
                    }
                }
            };

            for (let step = 0; step < steps; step++) {
                for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
                    const row = map[rowIndex];

                    for (let index = 0; index < row.length; index++) {
                        if (row[index] >= 10) {
                            // flash self first
                            row[index] = 0;
                            totalFlashes++;
                            stepFlashCounter++;

                            // if not first row, check above
                            if (rowIndex > 0) {
                                // direct above
                                checkAndIncrease(rowIndex - 1, index);
                                // has left
                                if (index > 0) {
                                    checkAndIncrease(rowIndex - 1, index - 1);
                                }
                                // has right
                                if (index < row.length - 1) {
                                    checkAndIncrease(rowIndex - 1, index + 1);
                                }
                            }
                            // if not last row, check below
                            if (rowIndex < map.length - 1) {
                                // direct below
                                checkAndIncrease(rowIndex + 1, index);
                                // has left
                                if (index > 0) {
                                    checkAndIncrease(rowIndex + 1, index - 1);
                                }
                                // has right
                                if (index < row.length - 1) {
                                    checkAndIncrease(rowIndex + 1, index + 1);
                                }
                            }
                            // if not very left, check left
                            if (index > 0) {
                                checkAndIncrease(rowIndex, index - 1);
                            }
                            // if not very right, check right
                            if (index < row.length - 1) {
                                checkAndIncrease(rowIndex, index + 1);
                            }
                        }
                    }
                }
            }
        }

        if (stepFlashCounter === 100) {
            return step;
        }

        stepFlashCounter = 0;
    }

    return totalFlashes;
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

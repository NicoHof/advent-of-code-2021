// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const instArray = data.split('\n');

const part1 = () => {
    let finalGammaBits = '';
    let finalEpsilonBits = '';

    for (let indexX = 0; indexX < instArray[0].length; indexX++) {
        let gammaCounter = 0;
        let epsilonCounter = 0;

        for (let indexY = 0; indexY < instArray.length; indexY++) {
            const num = Number(instArray[indexY].charAt(indexX));
            if (num === 1) {
                gammaCounter++;
            } else {
                epsilonCounter++;
            }
        }

        if (gammaCounter > epsilonCounter) {
            finalGammaBits += '1';
            finalEpsilonBits += '0';
        } else {
            finalGammaBits += '0';
            finalEpsilonBits += '1';
        }
    }

    const gammaInt = parseInt(finalGammaBits, 2);
    const epsilonInt = parseInt(finalEpsilonBits, 2);

    return gammaInt * epsilonInt;
};

const part2 = () => {
    const reducer = (isOxy = true) => {
        let leftOversArray = [...instArray];

        for (let indexX = 0; indexX < instArray[0].length; indexX++) {
            let oxyCounter = 0;
            let co2Counter = 0;

            for (let indexY = 0; indexY < leftOversArray.length; indexY++) {
                const num = Number(leftOversArray[indexY].charAt(indexX));
                if (num === 1) {
                    oxyCounter++;
                } else {
                    co2Counter++;
                }
            }

            const getFilteredByNum = (num) => {
                return leftOversArray.filter((item) => {
                    return Number(item.charAt(indexX)) === num;
                });
            };

            if (isOxy) {
                if (oxyCounter > co2Counter) {
                    leftOversArray = getFilteredByNum(1);
                } else if (co2Counter > oxyCounter) {
                    leftOversArray = getFilteredByNum(0);
                } else if (oxyCounter === co2Counter) {
                    leftOversArray = getFilteredByNum(1);
                }
            } else {
                if (oxyCounter > co2Counter) {
                    leftOversArray = getFilteredByNum(0);
                } else if (co2Counter > oxyCounter) {
                    leftOversArray = getFilteredByNum(1);
                } else if (oxyCounter === co2Counter) {
                    leftOversArray = getFilteredByNum(0);
                }
            }

            if (leftOversArray.length === 1) {
                return leftOversArray[0];
            }
        }

        return 'o.0';
    };

    const oxygenBit = reducer(true);
    const co2Bit = reducer(false);

    const oxygenInt = parseInt(oxygenBit, 2);
    const co2Int = parseInt(co2Bit, 2);

    return oxygenInt * co2Int;
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

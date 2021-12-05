// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');
const drawList = rawSplit[0].split(',').map((txtNumber) => Number(txtNumber));

const part1 = () => {
    // prepare all those boards
    let boards = [];
    for (let index = 2; index < rawSplit.length; index += 6) {
        const board = [];
        for (let index2 = index; index2 < index + 5; index2++) {
            const rawRow = rawSplit[index2];
            let cleanRow = rawRow.replace(/\s+/g, ' ');
            if (cleanRow.startsWith(' ')) {
                cleanRow = cleanRow.substr(1, cleanRow.length);
            }
            const nums = cleanRow.split(' ').map((txt) => Number(txt));
            board.push(nums);
        }
        boards.push(board);
    }

    // play
    for (let round = 0; round < drawList.length; round++) {
        const roundNumber = drawList[round];
        let newBoards = [];
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];
            const newBoard = [];
            let winner = false;

            for (let bRowI = 0; bRowI < board.length; bRowI++) {
                const bRow = board[bRowI];

                const newRow = bRow.map((num) => {
                    if (num === roundNumber) {
                        return -1;
                    }
                    return num;
                });

                // check if this row won
                const checkSum = newRow.filter((item) => item !== -1);
                if (checkSum.length <= 0) {
                    console.log('row WIN');
                    winner = true;
                }

                newBoard.push(newRow);
            }

            // check if we won vertically
            for (let indexX = 0; indexX < 5; indexX++) {
                let checkSum = 0;

                for (let indexY = 0; indexY < 5; indexY++) {
                    const num = newBoard[indexY][indexX];
                    checkSum += num;
                }

                if (checkSum === -5) {
                    console.log('vertically WIN');
                    winner = true;
                }
            }

            if (winner) {
                let openFieldsCount = 0;
                console.log(newBoard, roundNumber);

                for (let indexX = 0; indexX < 5; indexX++) {
                    for (let indexY = 0; indexY < 5; indexY++) {
                        const num = newBoard[indexX][indexY];

                        if (num > 0) {
                            openFieldsCount += num;
                        }
                    }
                }

                return openFieldsCount * roundNumber;
            }

            // save for next round
            newBoards.push(newBoard);
        }
        // next round prep
        boards = newBoards;
    }
};

const part2 = () => {
    // prepare all those boards
    let boards = [];
    for (let index = 2; index < rawSplit.length; index += 6) {
        const board = [];
        for (let index2 = index; index2 < index + 5; index2++) {
            const rawRow = rawSplit[index2];
            let cleanRow = rawRow.replace(/\s+/g, ' ');
            if (cleanRow.startsWith(' ')) {
                cleanRow = cleanRow.substr(1, cleanRow.length);
            }
            const nums = cleanRow.split(' ').map((txt) => Number(txt));
            board.push(nums);
        }
        boards.push(board);
    }

    // play
    for (let round = 0; round < drawList.length; round++) {
        const roundNumber = drawList[round];
        let newBoards = [];
        for (let b = 0; b < boards.length; b++) {
            const board = boards[b];
            const newBoard = [];
            let winner = false;

            for (let bRowI = 0; bRowI < board.length; bRowI++) {
                const bRow = board[bRowI];

                const newRow = bRow.map((num) => {
                    if (num === roundNumber) {
                        return -1;
                    }
                    return num;
                });

                // check if this row won
                const checkSum = newRow.filter((item) => item !== -1);
                if (checkSum.length <= 0) {
                    winner = true;
                }

                newBoard.push(newRow);
            }

            // check if we won vertically
            for (let indexX = 0; indexX < 5; indexX++) {
                let checkSum = 0;

                for (let indexY = 0; indexY < 5; indexY++) {
                    const num = newBoard[indexY][indexX];
                    checkSum += num;
                }

                if (checkSum === -5) {
                    winner = true;
                }
            }

            if (winner && boards.length === 1) {
                let openFieldsCount = 0;
                console.log(newBoard, roundNumber);

                for (let indexX = 0; indexX < 5; indexX++) {
                    for (let indexY = 0; indexY < 5; indexY++) {
                        const num = newBoard[indexX][indexY];

                        if (num > 0) {
                            openFieldsCount += num;
                        }
                    }
                }

                return openFieldsCount * roundNumber;
            }

            if (!winner) {
                // save for next round
                newBoards.push(newBoard);
            }
        }
        // next round prep
        boards = newBoards;
    }
};

// result
console.log('part 1', part1());
console.log('part 2', part2());

// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');

const isOpeningTag = (tag) => {
    const openingTags = ['(', '[', '{', '<'];
    return openingTags.includes(tag);
};

const getScore = (tag) => {
    const closingTags = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
    };
    return closingTags[tag];
};

const matchingTags = (open, close) => {
    const map = {
        '(': ')',
        '[': ']',
        '{': '}',
        '<': '>',
    };
    return map[open] === close;
};

const part1 = () => {
    return rawSplit.reduce((prevCount, currItem) => {
        const items = currItem.split('');
        const openTags = [];

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (isOpeningTag(element)) {
                openTags.unshift(element);
            } else if (matchingTags(openTags[0], element)) {
                openTags.shift();
            } else {
                return prevCount + getScore(element);
            }
        }

        return prevCount;
    }, 0);
};

const getNewScore = (tag) => {
    const closingTags = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4,
    };
    return closingTags[tag];
};

const part2 = () => {
    const scores = rawSplit.reduce((resArray, currItem) => {
        const items = currItem.split('');
        const openTags = [];

        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            if (isOpeningTag(element)) {
                openTags.unshift(element);
            } else if (matchingTags(openTags[0], element)) {
                openTags.shift();
            } else {
                // corrupted
                return resArray;
            }
        }

        const score = openTags.reduce((count, item) => {
            return count * 5 + getNewScore(item);
        }, 0);

        resArray.push(score);
        return resArray;
    }, []);

    const sorted = scores.sort((a, b) => {
        return b - a;
    });

    console.log(sorted);

    return sorted[(sorted.length - 1) / 2];
};

// result
// console.log('part 1', part1());
console.log('part 2', part2());

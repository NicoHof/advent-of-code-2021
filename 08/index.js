// base setup
const fs = require('fs');
const data = fs.readFileSync('./input.txt', 'utf8');
const rawSplit = data.split('\n');

const part1 = () => {
    const uniqeLengths = [2, 4, 3, 7]; // 1, 4, 7, 8

    return rawSplit.reduce((prevItem, currItem) => {
        const element = currItem;
        const split = element.split(' | ');
        const output = split[1].split(' ');

        return (
            prevItem +
            output.reduce((prev, curr) => {
                if (uniqeLengths.includes(curr.length)) {
                    return prev + 1;
                }
                return prev;
            }, 0)
        );
    }, 0);
};

const intersection = (data) => {
    return data.reduce((a, b) => a.filter((c) => b.includes(c)));
};

const disjoint = (arr1, arr2) => {
    let comp1 = arr1;
    let comp2 = arr2;
    if (arr2.length > arr1.length) {
        comp1 = arr2;
        comp2 = arr1;
    }
    return comp1.filter((value) => !comp2.includes(value));
};

const part2 = () => {
    const split = rawSplit;
    // const split = ['acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'];
    return split.reduce((prevItem, currItem) => {
        const element = currItem;
        const split = element.split(' | ');
        const input = split[0].split(' ');
        const output = split[1].split(' ');

        // decode
        const one = input.find((item) => item.length === 2).split('');
        const four = input.find((item) => item.length === 4).split('');
        const seven = input.find((item) => item.length === 3).split('');
        const eight = input.find((item) => item.length === 7).split('');

        const a = disjoint(seven, one)[0];

        const all6ers = input.filter((item) => item.length === 6).map((item) => item.split(''));
        const f = intersection([...all6ers, one])[0];

        const c = disjoint(one, [f])[0];

        const all5ers = input.filter((item) => item.length === 5).map((item) => item.split(''));
        const three = all5ers.find((item) => intersection([item, one]).length === 2);

        const nine = all6ers.find((item) => intersection([item, three]).length === 5);

        const e = disjoint(eight, nine)[0];

        const zero = all6ers.find((item) => intersection([item, [e, c]]).length === 2);
        const six = all6ers.find((item) => !item.includes(c));
        const two = all5ers.find((item) => intersection([item, [e, c]]).length === 2);
        const five = all5ers.find((item) => intersection([item, [e, c]]).length === 0);

        // start the mapping
        const numbersMap = [zero, one, two, three, four, five, six, seven, eight, nine];
        const sortedItems = numbersMap.map((item) => item.sort());
        const plainStringItems = sortedItems.map((item) => item.join(''));

        const finalNumber = output.reduce((prev, curr) => {
            const index = plainStringItems.findIndex((item) => item === curr.split('').sort().join(''));
            return prev + index;
        }, '');

        return prevItem + Number(finalNumber);
    }, 0);
};

// result
// console.log('part 1', part1());
console.log('part 2', part2());

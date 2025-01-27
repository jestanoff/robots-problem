"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bottomLeftBoundary = [0, 0];
function move(input) {
    let output = '';
    console.log('Moving robots, please wait for output ...');
    const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split(/\r\n|\r|\n/);
    let upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number);
    const robotsInstructions = robotsInstructionsRaw.reduce((acc, curr, index, array) => {
        if (index % 3 === 0) {
            const initialPositionOrientation = curr.split(' ');
            const instructions = array[index + 1].split('');
            acc.push({ initialPositionOrientation, instructions });
        }
        return acc;
    }, []);
    console.log(JSON.stringify({ upperRightBoundary, robotsInstructions }, null, 2));
    return output;
}
move(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`);
exports.default = move;
//# sourceMappingURL=index.js.map
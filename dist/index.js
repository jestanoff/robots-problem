"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const moveOrRotate_1 = __importDefault(require("./utils/moveOrRotate"));
const lowerLeftBoundary = [0, 0];
/*
---------- N ----------
|  y                  |
|  3 |_|_|_|_|_|_|    |
W  2 |_|_|_|_|_|_|    E
|  1 |_|_|_|_|_|_|    |
|  0 |_|_|_|_|_|_|    |
|     0 1 2 3 4 5  x  |
---------- S ----------
*/
function processRobots(input) {
    console.log('Moving robots, please wait for output ...');
    const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split(/\r\n|\r|\n/);
    const upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number);
    const grid = [...upperRightBoundary, ...lowerLeftBoundary];
    const robotsInstructions = robotsInstructionsRaw.reduce((acc, curr, index, array) => {
        if (index % 3 === 0) {
            const [x, y, orientationRaw] = curr.split(' ');
            if (!(0, types_1.isOrientation)(orientationRaw))
                throw new Error(`Invalid orientation: ${orientationRaw}`);
            const initialPositionOrientation = [parseInt(x), parseInt(y), orientationRaw];
            const instructions = array[index + 1].split('');
            if (!instructions.every(types_1.isInstruction))
                throw new Error(`Invalid instruction: ${instructions.join('')}`);
            acc.push({ initialPositionOrientation, instructions });
        }
        return acc;
    }, []);
    const output = robotsInstructions.reduce((result, robotData, robotNumber) => {
        const { initialPositionOrientation, instructions } = robotData;
        const movements = instructions.reduce((moves, instruction, index) => {
            let newPosition;
            if (index === 0) {
                newPosition = (0, moveOrRotate_1.default)(initialPositionOrientation, instruction, grid);
            }
            else {
                const prevPosition = moves[index - 1];
                if (!(0, types_1.isPositionAndOrientation)(prevPosition)) {
                    return moves;
                }
                newPosition = (0, moveOrRotate_1.default)([prevPosition[0], prevPosition[1], prevPosition[2]], instruction, grid);
            }
            moves.push(newPosition);
            return moves;
        }, []);
        const currentOutput = movements[movements.length - 1].join(' ');
        return `${result}${robotNumber !== 0 ? '\n' : ''}${currentOutput}`;
    }, '');
    console.log(`Output: ${output}`);
    return output;
}
exports.default = processRobots;
//# sourceMappingURL=index.js.map
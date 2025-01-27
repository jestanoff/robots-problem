"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
describe('Martian Robots', () => {
    test.todo('test main functionality', () => {
        expect((0, _1.default)('5 3\n1 1 E\nRFRFRFRF\n3 2 N\nFRRFLLFFRRFLL\n0 3 W\nLLFFFLFLFL')).toBe('1 1 E\n3 3 N LOST\n2 3 S');
    });
    test.todo('isRobotOffGrid');
    test.todo('areCoordinatesLastGoodLocation');
});
//# sourceMappingURL=index.test.js.map
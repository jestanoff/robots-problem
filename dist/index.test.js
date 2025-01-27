"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("./"));
describe('Martian Robots', () => {
    test('should work for example movements', () => {
        expect((0, _1.default)(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`)).toBe(`1 1 E
3 3 N LOST
2 3 S`);
    });
});
//# sourceMappingURL=index.test.js.map
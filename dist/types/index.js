"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPositionAndOrientation = exports.isInstruction = exports.isOrientation = void 0;
function isOrientation(value) {
    return ['N', 'S', 'E', 'W'].includes(value);
}
exports.isOrientation = isOrientation;
function isInstruction(value) {
    return ['L', 'R', 'F'].includes(value);
}
exports.isInstruction = isInstruction;
function isPositionAndOrientation(value) {
    return (Array.isArray(value) &&
        value.length === 3 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number' &&
        typeof value[2] === 'string' &&
        isOrientation(value[2]));
}
exports.isPositionAndOrientation = isPositionAndOrientation;
//# sourceMappingURL=index.js.map
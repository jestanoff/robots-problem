export type Direction = 'L' | 'R';
export type Forward = 'F';
export type Instruction = Direction | Forward;
export type Coordinates = [x: number, y: number];
export type Orientation = 'N' | 'S' | 'E' | 'W';
export type PositionAndOrientation = [x: number, y: number, orientation: Orientation];
export type Lost = 'LOST';
export type Grid = [upperRightX: number, upperRightY: number, lowerLeftX: number, lowerLeftY: number];
export type PositionAndOrientationAndLost = [x: number, y: number, orientation: Orientation, lost?: Lost];
export type RobotInstruction = {
    initialPositionOrientation: PositionAndOrientation;
    instructions: Array<Instruction>;
};
export declare function isOrientation(value: string): value is Orientation;
export declare function isInstruction(value: string): value is Instruction;
export declare function isPositionAndOrientation(value: unknown): value is PositionAndOrientation;
//# sourceMappingURL=index.d.ts.map
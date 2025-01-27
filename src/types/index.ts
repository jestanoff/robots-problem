export type Direction = 'L' | 'R'
export type Forward = 'F'
export type Instruction = Direction | Forward 
export type Coordinates = [x: number, y: number]
export type Orientation = 'N' | 'S' | 'E' | 'W'
export type PositionAndOrientation = [x: number, y: number, orientation: Orientation]
export type Lost = 'LOST'
export type Grid = [upperRightX: number, upperRightY: number, lowerLeftX: number, lowerLeftY: number]
export type PositionAndOrientationAndLost = [x: number, y: number, orientation: Orientation, lost?: Lost]

export function isOrientation(value: string): value is Orientation {
  return ['N', 'S', 'E', 'W'].includes(value)
}

export function isInstruction(value: string): value is Instruction {
  return ['L', 'R', 'F'].includes(value)
}

export function isPositionAndOrientation(value: unknown): value is PositionAndOrientation {
  return Array.isArray(value) &&
    value.length === 3 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number' &&
    typeof value[2] === 'string' &&
    isOrientation(value[2])
}

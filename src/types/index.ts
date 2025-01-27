export type Rotation = 'L' | 'R'
export type Forward = 'F'
export type Instruction = Rotation | Forward
export type Coordinates = [x: number, y: number]
export type Orientation = 'N' | 'S' | 'E' | 'W'
export type Lost = 'LOST'
export type Grid = [upperRightX: number, upperRightY: number, lowerLeftX: number, lowerLeftY: number]
export type PositionAndOrientationAndLost = [x: number, y: number, orientation: Orientation, lost?: Lost]
export type RobotInstruction = {
  initialPosition: Coordinates
  orientation: Orientation
  instructions: Array<Instruction>
}
export type Scent = [x: number, y: number, orientation: Orientation]
export type ProcessInstructionsParams = {
  position: Coordinates
  orientation: Orientation
  instructions: Instruction[]
  grid: Grid
  isRobotLost?: boolean
}

export function isOrientation(value: string): value is Orientation {
  return ['N', 'S', 'E', 'W'].includes(value)
}

export function isInstruction(value: string): value is Instruction {
  return ['L', 'R', 'F'].includes(value)
}

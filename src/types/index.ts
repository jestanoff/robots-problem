export type Instruction = 'L' | 'R' | 'F'

export type Coordinates = [number, number]

export type Orientation = 'N' | 'S' | 'E' | 'W'

export type PositionAndOrientation = [number, number, Orientation]

export function isOrientation(value: string): value is Orientation {
  return ['N', 'S', 'E', 'W'].includes(value)
}

export function isInstruction(value: string): value is Instruction {
  return ['L', 'R', 'F'].includes(value)
}

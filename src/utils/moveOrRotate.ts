import {
  Coordinates,
  Grid,
  Instruction,
  Orientation,
  PositionAndOrientationAndLost,
  ProcessInstructionsParams,
  Scent,
} from '../types'
import checkCoordinatesOffGrid from './checkCoordinatesOffGrid'
import checkInScents from './checkScent'
import moveInDirection from './moveInDirection'
import rotate from './rotate'
import { INSTRUCTIONS, LOST } from './constants'

const scents: Scent[] = []

const processInstructions = ({ position, orientation, instructions, grid, isRobotLost }: ProcessInstructionsParams): PositionAndOrientationAndLost => {
  if (isRobotLost) {
    return [...position, orientation, LOST];
  }

  // When all instructions are processed return current position and orientation
  if (instructions.length === 0) {
    return [...position, orientation];
  }

  const [currentInstruction, ...restInstructions] = instructions

  if (currentInstruction === INSTRUCTIONS.FORWARD) {
    const newPosition: Coordinates = moveInDirection(position, orientation)

    if (checkCoordinatesOffGrid({ coordinates: newPosition, grid })) {
      // When a move is going off gird check if there is scent already for this position and orientation
      if (checkInScents(position, orientation, scents)) {
        // Robot is safe and instruction to move off grid should be ignored
        return processInstructions({ position, orientation, instructions: restInstructions, grid })
      } else {
        // Robot is lost at this point, add last on grid known position and orientation to the scents
        scents.push([...position, orientation])
        return processInstructions({ position, orientation, instructions: restInstructions, grid, isRobotLost: true })
      }
    } else {
      return processInstructions({ position: newPosition, orientation, instructions: restInstructions, grid })
    }
  } else {
    const newOrientation: Orientation = rotate(orientation, currentInstruction)
    return processInstructions({ position, orientation: newOrientation, instructions: restInstructions, grid })
  }
}

const moveOrRotate = (
  initialPosition: Coordinates,
  orientation: Orientation,
  instructions: Instruction[],
  grid: Grid,
): string => {

  if (grid?.[0] > 50 || grid?.[1] > 50) {
    throw new Error('Grid upper x or y limit is greater than 50')
  }

  const lastGoodPositionAndOrientation = processInstructions({ position: initialPosition, orientation, instructions, grid })
  return lastGoodPositionAndOrientation.join(' ')
}

export default moveOrRotate

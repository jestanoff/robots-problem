import {
  Coordinates,
  Grid,
  Instruction,
  Orientation,
  PositionAndOrientation,
  PositionAndOrientationAndLost,
} from '../types'
import checkCoordinatesOffGrid from './checkCoordinatesOffGrid'
import moveInDirection from './moveInDirection'
import rotate from './rotate'

const scents: Coordinates[] = []

const checkInScents = (position: Coordinates) =>
  scents.some((coordinates) => coordinates[0] === position[0] && coordinates[1] === position[1])

const moveOrRotate = (
  positionAndOrientation: PositionAndOrientation,
  instruction: Instruction,
  grid: Grid,
): PositionAndOrientationAndLost => {
  const currentPosition: Coordinates = [positionAndOrientation[0], positionAndOrientation[1]]
  const orientation: Orientation = positionAndOrientation[2]
  let newPositionOrientationAndLost: PositionAndOrientationAndLost

  if (instruction === 'F') {
    const newPosition: Coordinates = moveInDirection(currentPosition, orientation)

    // check if positions are off the grid
    if (checkCoordinatesOffGrid({ coordinates: newPosition, grid })) {
      // when position is off gird check if there is scent of a prev robot that has been there
      if (checkInScents(currentPosition)) {
        // robot is safe and should not be moved off grid
        newPositionOrientationAndLost = [...currentPosition, orientation]
      } else {
        // push the last on grid position to the scents
        scents.push(currentPosition)
        newPositionOrientationAndLost = [...currentPosition, orientation, 'LOST']
      }
    } else {
      newPositionOrientationAndLost = [...newPosition, orientation]
    }
  } else {
    const newOrientation: Orientation = rotate(orientation, instruction)
    newPositionOrientationAndLost = [...currentPosition, newOrientation]
  }

  return newPositionOrientationAndLost
}

export default moveOrRotate

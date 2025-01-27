import {
  Coordinates,
  Grid,
  Instruction,
  Orientation,
  PositionAndOrientation,
  PositionAndOrientationAndLost,
  Scent,
} from '../types'
import checkCoordinatesOffGrid from './checkCoordinatesOffGrid'
import moveInDirection from './moveInDirection'
import rotate from './rotate'

const scents: Scent[] = []

const checkInScents = (position: Coordinates, orientation: Orientation) =>
  scents.some((scent) => scent[0] === scent[0] && scent[1] === position[1] && scent[2] === orientation)

const moveOrRotate = (
  positionAndOrientation: PositionAndOrientation,
  instruction: Instruction,
  grid: Grid,
): PositionAndOrientationAndLost => {
  const currentPosition: Coordinates = [positionAndOrientation[0], positionAndOrientation[1]]
  const currentOrientation: Orientation = positionAndOrientation[2]
  let newPositionOrientationAndLost: PositionAndOrientationAndLost

  if (grid?.[0] > 50 || grid?.[1] > 50) {
    throw new Error('Grid upper bounds are greater than 50')
  }

  if (instruction === 'F') {
    const newPosition: Coordinates = moveInDirection(currentPosition, currentOrientation)

    // check if positions are off the grid
    if (checkCoordinatesOffGrid({ coordinates: newPosition, grid })) {
      // when position is off gird check if there is scent of a prev robot that has been there with the same orientation
      if (checkInScents(currentPosition, currentOrientation)) {
        // Robot is safe and should not be moved off grid
        newPositionOrientationAndLost = [...currentPosition, currentOrientation]
      } else {
        // push the last on grid position to the scents
        scents.push([...currentPosition, currentOrientation])
        newPositionOrientationAndLost = [...currentPosition, currentOrientation, 'LOST']
      }
    } else {
      newPositionOrientationAndLost = [...newPosition, currentOrientation]
    }
  } else {
    const newOrientation: Orientation = rotate(currentOrientation, instruction)
    newPositionOrientationAndLost = [...currentPosition, newOrientation]
  }

  return newPositionOrientationAndLost
}

export default moveOrRotate

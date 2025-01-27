import { Rotation, Orientation } from '../types'
import { DIRECTIONS, INSTRUCTIONS } from './constants'

const rotate = (orientation: Orientation, rotation: Rotation): Orientation => {
  switch (orientation) {
    case DIRECTIONS.NORTH:
      return rotation === INSTRUCTIONS.LEFT ? DIRECTIONS.WEST : DIRECTIONS.EAST
    case DIRECTIONS.SOUTH:
      return rotation === INSTRUCTIONS.LEFT ? DIRECTIONS.EAST : DIRECTIONS.WEST
    case DIRECTIONS.WEST:
      return rotation === INSTRUCTIONS.LEFT ? DIRECTIONS.SOUTH : DIRECTIONS.NORTH
    case DIRECTIONS.EAST:
      return rotation === INSTRUCTIONS.LEFT ? DIRECTIONS.NORTH : DIRECTIONS.SOUTH
    default:
      return orientation
  }
}

export default rotate

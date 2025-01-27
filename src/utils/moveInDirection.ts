import { Coordinates, Orientation } from '../types'
import { DIRECTIONS } from './constants'

const moveInDirection = ([x, y]: Coordinates, orientation: Orientation): Coordinates => {
  switch (orientation) {
    case DIRECTIONS.NORTH:
      return [x, y + 1]
    case DIRECTIONS.SOUTH:
      return [x, y - 1]
    case DIRECTIONS.EAST:
      return [x + 1, y]
    case DIRECTIONS.WEST:
      return [x - 1, y]
    default:
      return [x, y]
  }
}

export default moveInDirection

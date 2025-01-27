import { Coordinates, Orientation } from '../types'

const moveInDirection = ([x, y]: Coordinates, orientation: Orientation): Coordinates => {
  switch (orientation) {
    case 'N':
      return [x, y + 1]
    case 'S':
      return [x, y - 1]
    case 'E':
      return [x + 1, y]
    case 'W':
      return [x - 1, y]
    default:
      return [x, y]
  }
}

export default moveInDirection

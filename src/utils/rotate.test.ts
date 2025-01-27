import rotate from './rotate'
import { Direction, Orientation } from '../types'

const CARDINAL_DIRECTIONS_ROTATE_LEFT_MATRIX: Array<[Orientation, Direction, Orientation]> = [
  ['N', 'L', 'W'],
  ['W', 'L', 'S'],
  ['S', 'L', 'E'],
  ['E', 'L', 'N'],
]

const CARDINAL_DIRECTIONS_ROTATE_RIGHT_MATRIX: Array<[Orientation, Direction, Orientation]> = [
  ['N', 'R', 'E'],
  ['W', 'R', 'N'],
  ['S', 'R', 'W'],
  ['E', 'R', 'S'],
]

describe('Rotate', () => {
  test.each(CARDINAL_DIRECTIONS_ROTATE_LEFT_MATRIX)(
    'should rotate LEFT from %s to get %s',
    (startOrientation, direction, expectedOrientation) => {
      const appliedOrientation = rotate(startOrientation, direction);
      expect(appliedOrientation).toBe(expectedOrientation)
    }
  )

  test.each(CARDINAL_DIRECTIONS_ROTATE_RIGHT_MATRIX)(
    'should rotate RIGHT from %s to get %s',
    (startOrientation, direction, expectedOrientation) => {
      const appliedOrientation = rotate(startOrientation, direction);
      expect(appliedOrientation).toBe(expectedOrientation)
    }
  )
})

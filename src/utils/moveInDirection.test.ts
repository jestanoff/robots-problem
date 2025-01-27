import moveInDirection from './moveInDirection'
import { Coordinates } from '../types'

describe('moveInDirection', () => {
  const startPosition: Coordinates = [2, 2]

  describe('when moving from position [2,2]', () => {
    it('should increase Y when moving North', () => {
      const result = moveInDirection(startPosition, 'N')
      expect(result).toEqual([2, 3])
    })

    it('should decrease Y when moving South', () => {
      const result = moveInDirection(startPosition, 'S')
      expect(result).toEqual([2, 1])
    })

    it('should increase X when moving East', () => {
      const result = moveInDirection(startPosition, 'E')
      expect(result).toEqual([3, 2])
    })

    it('should decrease X when moving West', () => {
      const result = moveInDirection(startPosition, 'W')
      expect(result).toEqual([1, 2])
    })
  })

  describe('edge cases', () => {
    it('should handle moving from [0,0]', () => {
      const origin: Coordinates = [0, 0]
      expect(moveInDirection(origin, 'N')).toEqual([0, 1])
      expect(moveInDirection(origin, 'E')).toEqual([1, 0])
    })

    it('should handle negative coordinates', () => {
      const negativePosition: Coordinates = [-1, -1]
      expect(moveInDirection(negativePosition, 'N')).toEqual([-1, 0])
      expect(moveInDirection(negativePosition, 'W')).toEqual([-2, -1])
    })
  })
})

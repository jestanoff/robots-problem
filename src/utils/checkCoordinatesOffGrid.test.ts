import checkCoordinatesOffGrid from './checkCoordinatesOffGrid'
import { Coordinates, Grid } from '../types'

describe('checkCoordinatesOffGrid', () => {
  describe('with standard grid [5, 3, 0, 0]', () => {
    const grid: Grid = [5, 3, 0, 0]

    describe('when coordinates are within bounds', () => {
      it('should return false for coordinates in middle of grid', () => {
        const coordinates: Coordinates = [2, 2]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
      })

      it('should return false for coordinates at lower left boundary', () => {
        const coordinates: Coordinates = [0, 0]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
      })

      it('should return false for coordinates at upper right boundary', () => {
        const coordinates: Coordinates = [5, 3]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
      })
    })

    describe('when coordinates are outside bounds', () => {
      it('should return true when x is below lower left boundary', () => {
        const coordinates: Coordinates = [-1, 2]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
      })

      it('should return true when x is above upper right boundary', () => {
        const coordinates: Coordinates = [6, 2]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
      })

      it('should return true when y is below lower left boundary', () => {
        const coordinates: Coordinates = [2, -1]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
      })

      it('should return true when y is above upper right boundary', () => {
        const coordinates: Coordinates = [2, 4]
        expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
      })
    })
  })

  describe('with small grid [1, 1, 0, 0]', () => {
    const grid: Grid = [1, 1, 0, 0]

    it('should return false for coordinates within small grid', () => {
      const coordinates: Coordinates = [0, 1]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
    })

    it('should return false for coordinates at upper right boundary', () => {
      const coordinates: Coordinates = [1, 1]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
    })

    it('should return true for coordinates just outside small grid', () => {
      const coordinates: Coordinates = [2, 1]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
    })
  })

  describe('with negative boundary grid [-4, -12, 20, 30]', () => {
    const grid: Grid = [20, 30, -4, -12]

    it('should return false for coordinates within negative boundary grid', () => {
      const coordinates: Coordinates = [0, 0]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
    })

    it('should return false for coordinates at lower left boundary', () => {
      const coordinates: Coordinates = [20, 30]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
    })

    it('should return false for coordinates at upper right boundary', () => {
      const coordinates: Coordinates = [-4, -12]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(false)
    })

    it('should return true for coordinates outside negative boundary grid', () => {
      const coordinates: Coordinates = [-5, -13]
      expect(checkCoordinatesOffGrid({ coordinates, grid })).toBe(true)
    })
  })

  describe('with invalid grid coordinates', () => {
    it('should throw error when upper right X is lower than lower left X', () => {
      const grid: Grid = [1, 3, 2, 0]
      const coordinates: Coordinates = [1, 1]

      expect(() => checkCoordinatesOffGrid({ coordinates, grid })).toThrow(
        'upper X coordinate cannot be lower or equal to the lower X coordinate',
      )
    })

    it('should throw error when upper right Y is lower than lower left Y', () => {
      const grid: Grid = [5, 1, 0, 2]
      const coordinates: Coordinates = [1, 1]

      expect(() => checkCoordinatesOffGrid({ coordinates, grid })).toThrow(
        'upper Y coordinate cannot be lower or equal to the lower Y coordinate',
      )
    })

    it('should throw error when upper right X equals lower left X', () => {
      const grid: Grid = [2, 3, 2, 0]
      const coordinates: Coordinates = [1, 1]

      expect(() => checkCoordinatesOffGrid({ coordinates, grid })).toThrow(
        'upper X coordinate cannot be lower or equal to the lower X coordinate',
      )
    })

    it('should throw error when upper right Y equals lower left Y', () => {
      const grid: Grid = [5, 2, 0, 2]
      const coordinates: Coordinates = [1, 1]

      expect(() => checkCoordinatesOffGrid({ coordinates, grid })).toThrow(
        'upper Y coordinate cannot be lower or equal to the lower Y coordinate',
      )
    })
  })
})

import moveOrRotate from './moveOrRotate'
import { Coordinates, Grid, Orientation } from '../types'

describe('moveOrRotate', () => {
  const grid: Grid = [5, 3, 0, 0]

  describe('basic movement and rotation', () => {
    it('should move forward when facing North', () => {
      const position: Coordinates = [0, 0]
      const orientation: Orientation = 'N'
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('0 1 N')
    })

    it('should rotate left', () => {
      const position: Coordinates = [0, 0]
      const orientation: Orientation = 'N'
      expect(moveOrRotate(position, orientation, ['L'], grid)).toBe('0 0 W')
    })

    it('should rotate right', () => {
      const position: Coordinates = [0, 0]
      const orientation: Orientation = 'N'
      expect(moveOrRotate(position, orientation, ['R'], grid)).toBe('0 0 E')
    })
  })

  describe('grid boundaries and scents', () => {
    it('should mark robot as LOST when moving off grid', () => {
      const position: Coordinates = [5, 3]
      const orientation: Orientation = 'N'
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('5 3 N LOST')
    })

    it('should prevent robot from moving off grid where there is a scent', () => {
      // First robot gets lost
      const position: Coordinates = [5, 3]
      const orientation: Orientation = 'N'
      moveOrRotate(position, orientation, ['F'], grid)

      // Second robot should stay in place due to scent
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('5 3 N')
    })
  })

  describe('directional movement', () => {
    it('should move east correctly', () => {
      const position: Coordinates = [0, 0]
      const orientation: Orientation = 'E'
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('1 0 E')
    })

    it('should move south correctly', () => {
      const position: Coordinates = [0, 1]
      const orientation: Orientation = 'S'
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('0 0 S')
    })

    it('should move west correctly', () => {
      const position: Coordinates = [1, 0]
      const orientation: Orientation = 'W'
      expect(moveOrRotate(position, orientation, ['F'], grid)).toBe('0 0 W')
    })
  })

  describe('grid validation', () => {
    it('should throw error when grid upper bounds are greater than 50', () => {
      const position: Coordinates = [0, 0]
      const orientation: Orientation = 'W'

      expect(() => moveOrRotate(position, orientation, ['F'], [51, 3, 0, 0])).toThrow(
        'Grid upper x or y limit is greater than 50',
      )
      expect(() => moveOrRotate(position, orientation, ['F'], [-5, 52, 0, 0])).toThrow(
        'Grid upper x or y limit is greater than 50',
      )
    })
  })
})

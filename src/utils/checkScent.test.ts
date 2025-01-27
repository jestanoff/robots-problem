import { Coordinates, Scent } from '../types'
import checkScent from './checkScent'

describe('checkScent', () => {
  test('should return true when position and orientation match a scent', () => {
    const position: Coordinates = [3, 3]
    const orientation = 'N'
    const scents: Scent[] = [[3, 3, 'N']]

    expect(checkScent(position, orientation, scents)).toBe(true)
  })

  test('should return false when position matches but orientation differs', () => {
    const position: Coordinates = [3, 3]
    const orientation = 'S'
    const scents: Scent[] = [[3, 3, 'N']]

    expect(checkScent(position, orientation, scents)).toBe(false)
  })

  test('should return false when position differs but orientation matches', () => {
    const position: Coordinates = [2, 3]
    const orientation = 'N'
    const scents: Scent[] = [[3, 3, 'N']]

    expect(checkScent(position, orientation, scents)).toBe(false)
  })

  test('should return false when no scents exist', () => {
    const position: Coordinates = [3, 3]
    const orientation = 'N'
    const scents: Scent[] = []

    expect(checkScent(position, orientation, scents)).toBe(false)
  })

  test('should handle multiple scents correctly', () => {
    const position: Coordinates = [2, 1]
    const orientation = 'E'
    const scents: Scent[] = [
      [3, 3, 'N'],
      [2, 1, 'E'],
      [0, 0, 'W']
    ]

    expect(checkScent(position, orientation, scents)).toBe(true)
  })

  test('should return false when no scents match', () => {
    const position: Coordinates = [4, 4]
    const orientation = 'W'
    const scents: Scent[] = [
      [3, 3, 'N'],
      [2, 1, 'E'],
      [0, 0, 'W']
    ]

    expect(checkScent(position, orientation, scents)).toBe(false)
  })
})

import {
  Coordinates,
  PositionAndOrientation,
  isOrientation,
  isInstruction,
  PositionAndOrientationAndLost,
  Grid,
  isPositionAndOrientation,
  RobotInstruction,
} from './types'
import moveOrRotate from './utils/moveOrRotate'

const lowerLeftBoundary: Coordinates = [0, 0]

/*
---------- N ----------
|  y                  |
|  3 |_|_|_|_|_|_|    |
W  2 |_|_|_|_|_|_|    E
|  1 |_|_|_|_|_|_|    |
|  0 |_|_|_|_|_|_|    |
|     0 1 2 3 4 5  x  |
---------- S ----------
*/

export default function processRobots(input: string): string {
  console.log('Moving robots, please wait for output ...')
  const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split(/\r\n|\r|\n/)
  const upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number) as Coordinates
  const grid: Grid = [...upperRightBoundary, ...lowerLeftBoundary]
  const robotsInstructions = robotsInstructionsRaw.reduce((acc: RobotInstruction[], curr: string, index, array) => {
    if (index % 3 === 0) {
      const [x, y, orientationRaw] = curr.split(' ')
      if (!isOrientation(orientationRaw)) throw new Error(`Invalid orientation: ${orientationRaw}`)
      const initialPositionOrientation: PositionAndOrientation = [parseInt(x), parseInt(y), orientationRaw]

      const instructions = array[index + 1].split('')
      if (!instructions.every(isInstruction)) throw new Error(`Invalid instruction: ${instructions.join('')}`)

      acc.push({ initialPositionOrientation, instructions })
    }
    return acc
  }, [])

  const output = robotsInstructions.reduce((result, robotData, robotNumber) => {
    const { initialPositionOrientation, instructions } = robotData

    const movements = instructions.reduce((moves: PositionAndOrientationAndLost[], instruction, index) => {
      let newPosition: PositionAndOrientationAndLost
      if (index === 0) {
        newPosition = moveOrRotate(initialPositionOrientation, instruction, grid)
      } else {
        const prevPosition = moves[index - 1]

        if (!isPositionAndOrientation(prevPosition)) {
          return moves
        }

        newPosition = moveOrRotate([prevPosition[0], prevPosition[1], prevPosition[2]], instruction, grid)
      }

      moves.push(newPosition)

      return moves
    }, [])

    const currentOutput = movements[movements.length - 1].join(' ')

    return `${result}${robotNumber !== 0 ? '\n' : ''}${currentOutput}`
  }, '')

  console.log(`Output: ${output}`)

  return output
}

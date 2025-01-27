import { Coordinates, isOrientation, isInstruction, Grid, RobotInstruction } from './types'
import { INPUT_ARG, LOWER_LEFT_BOUNDARY } from './utils/constants'
import moveOrRotate from './utils/moveOrRotate'

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

export default function main(input: string): string {
  const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split('\n')
  const upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number) as Coordinates
  const grid: Grid = [...upperRightBoundary, ...LOWER_LEFT_BOUNDARY]
  const robotsInstructions = robotsInstructionsRaw.reduce((acc: RobotInstruction[], curr: string, index, array) => {
    if (index % 3 === 0) {
      const [x, y, orientation] = curr.split(' ')
      if (!isOrientation(orientation)) throw new Error(`Invalid orientation: ${orientation}`)
      const initialPosition: Coordinates = [Number(x), Number(y)]

      const instructions = array[index + 1].split('')
      if (!instructions.every(isInstruction)) throw new Error(`Invalid instruction: ${instructions.join('')}`)

      acc.push({ initialPosition, instructions, orientation })
    }
    return acc
  }, [])

  const output = robotsInstructions.reduce((result, robotData, robotNumber) => {
    const { initialPosition, instructions, orientation } = robotData
    const lastGoodPositionAndOrientation = moveOrRotate(initialPosition, orientation, instructions, grid)
    return `${result}${robotNumber !== 0 ? '\n' : ''}${lastGoodPositionAndOrientation}`
  }, '')

  console.log(`Output: ${output}`)

  return output
}

// CLI mode only requires getting an argument
if (require.main === module) {
  const args = process.argv.slice(2)
  const input = args.find((arg) => arg.startsWith(INPUT_ARG))?.split('=')[1]

  if (!input) {
    console.error(`Please provide input using ${INPUT_ARG}="<instructions>"`)
    process.exit(1)
  }

  main(input)
}

import { Coordinates, Instruction, PositionAndOrientation, isOrientation, isInstruction } from './types'

const bottomLeftBoundary: Coordinates = [0, 0]

type RobotInstruction = {
  initialPositionOrientation: PositionAndOrientation
  instructions: Array<Instruction>
}

function move(input: string): string {
  const output = ''
  console.log('Moving robots, please wait for output ...')
  const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split(/\r\n|\r|\n/)

  const upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number) as Coordinates
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

  return output
}

move(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`)

export default move

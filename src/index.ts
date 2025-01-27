import { Coordinates, Instruction, PositionAndOrientation } from './types'

const bottomLeftBoundary: Coordinates = [0, 0]

type RobotInstruction = {
  initialPositionOrientation: PositionAndOrientation,
  instructions: Array<Instruction>
}

function move(input: string): string {
  let output = ''
  console.log('Moving robots, please wait for output ...')
  const [upperRightBoundaryRaw, ...robotsInstructionsRaw] = input.split(/\r\n|\r|\n/)

  let upperRightBoundary = upperRightBoundaryRaw.split(' ').map(Number) as Coordinates
  const robotsInstructions = robotsInstructionsRaw.reduce((acc: RobotInstruction[], curr, index, array) => {
    if (index % 3 === 0) {
      const initialPositionOrientation = curr.split(' ') as PositionAndOrientation
      const instructions = array[index + 1].split('') as Array<Instruction>
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
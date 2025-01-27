import { Coordinates, Instruction, PositionAndOrientation, isOrientation, isInstruction, PositionAndOrientationAndLost, Grid, Orientation, Direction } from './types'
import checkCoordinatesOffGrid from './utils/checkCoordinatesOffGrid'
import rotate from './utils/rotate'

const lowerLeftBoundary: Coordinates = [0, 0]

type RobotInstruction = {
  initialPositionOrientation: PositionAndOrientation
  instructions: Array<Instruction>
}

const scents: Coordinates[] = []

function moveInDirection([x, y]: Coordinates, orientation: Orientation): Coordinates {
  switch (orientation) {
    case 'N':
      return [x, y + 1]
    case 'S':
      return [x, y - 1]
    case 'W':
      return [x + 1, y]
    case 'E':
      return [x - 1, y]
    default:
      return [x, y]
  }
}


function moveOrRotate(positionAndOrientation: PositionAndOrientation, instruction: Instruction, grid: Grid): PositionAndOrientationAndLost {
  const currentPosition: Coordinates = [positionAndOrientation[0], positionAndOrientation[1]]
  const orientation: Orientation = positionAndOrientation[2]
  let newPositionOrientationAndLost: PositionAndOrientationAndLost;

  if (instruction === 'F') {
    let newPosition: Coordinates = moveInDirection(currentPosition, orientation)

    // check if positions are off the grid
    if (checkCoordinatesOffGrid({ coordinates: newPosition, grid })) {
      // console.log('POSITION of grid', newPosition, grid)
      // when position is off gird check if there is scent of a prev robot that has been there
      if (scents.some((coordinates) => coordinates[0] === currentPosition[0] && coordinates[1] === currentPosition[1])) {
        // robot is safe and should not be moved off grid
        newPositionOrientationAndLost = [...currentPosition, orientation]
      } else {
        // push the last on grid position to the scents
        scents.push(currentPosition)
        newPositionOrientationAndLost = [...currentPosition, orientation, 'LOST']
      }
    } else {
      newPositionOrientationAndLost = [...currentPosition, orientation]
    }
  } else {
    const newOrientation: Orientation = rotate(orientation, instruction)
    newPositionOrientationAndLost = [...currentPosition, newOrientation]
  }

  return newPositionOrientationAndLost
}

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

  const output = robotsInstructions.reduce((result, robotData) => {
    let currentOutput
    const { initialPositionOrientation, instructions } = robotData

    if (instructions.length > 0) {
      const movements = instructions.reduce((accu: PositionAndOrientationAndLost[], instruction, index) => {
        let newPosition: PositionAndOrientationAndLost
        if (index === 0) {
          newPosition = moveOrRotate(initialPositionOrientation, instruction, grid)
        } else {
          const prevPosition = accu[index - 1]
          newPosition = moveOrRotate([prevPosition[0], prevPosition[1], prevPosition[2]], instruction, grid)
        }

        // if (isPositionAndOrientation(newPosition)) {
        accu.push(newPosition)
        // } else {
        //   const prevPosition = accu[index - 1]
        //   accu.push([prevPosition[0], prevPosition[1], prevPosition[2], 'LOST'])
        // }
        return accu
      }, [])
      currentOutput = movements[movements.length - 1].join(' ')
      // console.log('currentOutput', currentOutput)
    } else {
      currentOutput = initialPositionOrientation.join(' ')
    }

    return `${result}\n${currentOutput}`
  }, '')
  // console.log('output', output)

  return output
}

main(`5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`)

import { Coordinates, Grid } from "../types"

type Params = { coordinates: Coordinates, grid: Grid }

const checkCoordinatesOffGrid = ({ coordinates, grid }: Params): boolean => {
  const [x, y] = coordinates
  const [upperRightX, upperRightY, lowerLeftX, lowerLeftY] = grid

  if (upperRightX <= lowerLeftX) {
    throw new Error('upper X coordinate cannot be lower or equal to the lower X coordinate')
  }

  if (upperRightY <= lowerLeftY) {
    throw new Error('upper Y coordinate cannot be lower or equal to the lower Y coordinate')
  }

  return x < lowerLeftX ||
    x > upperRightX ||
    y < lowerLeftY ||
    y > upperRightY
}

export default checkCoordinatesOffGrid

import { Coordinates, Orientation, Scent } from "../types"

const checkInScents = (position: Coordinates, orientation: Orientation, scents: Scent[]) =>
  scents.some(([x, y, scentOrientation]) => x === position[0] && y === position[1] && scentOrientation === orientation)

export default checkInScents
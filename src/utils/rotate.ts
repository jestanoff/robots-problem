import { Direction, Orientation } from "../types";

const rotate = (orientation: Orientation, direction: Direction): Orientation => {
  switch (orientation) {
    case 'N':
      return direction === 'L' ? 'W' : 'E';
    case 'S':
      return direction === 'L' ? 'E' : 'W';
    case 'W':
      return direction === 'L' ? 'S' : 'N';
    case 'E':
      return direction === 'L' ? 'N' : 'S';
    default:
      return orientation
  }
}

export default rotate

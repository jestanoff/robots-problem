import { Coordinates } from "../types";

export const LOWER_LEFT_BOUNDARY: Coordinates = [0, 0]
export const INPUT_ARG = '--input='
export const LOST = 'LOST'
export enum DIRECTIONS {
  NORTH = 'N',
  EAST = 'E',
  SOUTH = 'S',
  WEST = 'W'
}
export enum INSTRUCTIONS {
  LEFT = 'L',
  RIGHT = 'R',
  FORWARD = 'F'
}
/**
 * Represents the orientation interface for the rover.
 */
import { Planet } from '../../grid/planet';
import { Movement } from './movement';

export interface Orientation {
  /**
   * Turns the rover to the left.
   * @returns The new orientation.
   */
  left(): Orientation;

  /**
   * Turns the rover to the right.
   * @returns The new orientation.
   */
  right(): Orientation;

  /**
   * Reverses the rover's direction.
   * @returns The new orientation.
   */
  reverse(): Orientation;

  /**
   * Moves the rover forward.
   * @param x - The current x-coordinate.
   * @param y - The current y-coordinate.
   * @param planet - The planet on which the rover is operating.
   * @param onOppositeSide - Whether the rover is on the opposite side of the planet.
   * @returns The movement result.
   */
  moveForward(
    x: number,
    y: number,
    planet: Planet,
    onOppositeSide: boolean
  ): Movement;

  /**
   * Moves the rover backward.
   * @param x - The current x-coordinate.
   * @param y - The current y-coordinate.
   * @param planet - The planet on which the rover is operating.
   * @param onOppositeSide - Whether the rover is on the opposite side of the planet.
   * @returns The movement result.
   */
  moveBackward(
    x: number,
    y: number,
    planet: Planet,
    onOppositeSide: boolean
  ): Movement;

  /**
   * Returns the string representation of the orientation.
   * @returns The string representation.
   */
  strRep(): string;
}

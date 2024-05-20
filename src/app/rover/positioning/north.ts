/**
 * Represents the North direction for the rover.
 */

import { West } from './west';
import { East } from './east';
import { Orientation } from './orientation';
import { Movement } from './movement';
import { South } from './south';
import { Planet } from '../../grid/planet';

export class North implements Orientation {
  /**
   * Checks the status of a coordinate on a planet.
   *
   * @param planet - The planet on which the coordinate is located.
   * @param x - The x-coordinate to check.
   * @param y - The y-coordinate to check.
   * @returns A string describing the status of the coordinate:
   *          - 'obstacle coordinate' if the coordinate has an obstacle,
   *          - 'null coordinate' if the coordinate is null,
   *          - 'standard coordinate' if the coordinate is a standard (non-obstacle, non-null) coordinate.
   */
  checkCoord(planet: Planet, x: number, y: number): string {
    const coordinate = planet.getCoordinate(x, y);
    if (coordinate.hasObs()) {
      return 'obstacle coordinate';
    } else if (coordinate.isNull()) {
      return 'null coordinate';
    } else {
      return 'standard coordinate';
    }
  }

  /**
   * Returns the string representation of the orientation.
   * @returns The string representation.
   */
  strRep(): string {
    return 'N';
  }

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
  ): Movement {
    // If Wrapping to the opposite side of the planet
    if (
      y + 1 > planet.diameter - 1 ||
      this.checkCoord(planet, x, y + 1) === 'null coordinate'
    ) {
      console.log('CROSSED BORDER');
      planet.getCoordinate(x, y).setOccupied(true); // Ensure nothing funky happens when crossing over, and that the same 2d coordinate is considered to be occupied.
      if (onOppositeSide === false) {
        return new Movement(0, 0, 'crossed opposite');
      } else {
        return new Movement(0, 0, 'crossed main');
      }
    }
    // If attempting to move onto a coordinate with an obstacle
    else if (
      this.checkCoord(planet, x, y + 1) === 'obstacle coordinate' &&
      onOppositeSide === false
    ) {
      return new Movement(x, y + 1, 'obstacle detected');
    } else {
      // If moving normally to any other coordinate
      planet.getCoordinate(x, y + 1).setOccupied(true);
      return new Movement(0, 1, '');
    }
  }

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
  ): Movement {
    // If Wrapping to the opposite side of the planet
    if (y - 1 < 0 || this.checkCoord(planet, x, y - 1) === 'null coordinate') {
      console.log('CROSSED BORDER');
      planet.getCoordinate(x, y).setOccupied(true); // Ensure nothing funky happens when crossing over, and that the same 2d coordinate is considered to be occupied.
      if (onOppositeSide === false) {
        return new Movement(0, 0, 'crossed opposite');
      } else {
        return new Movement(0, 0, 'crossed main');
      }
    }
    // If attempting to move onto a coordinate with an obstacle
    else if (this.checkCoord(planet, x, y - 1) === 'obstacle coordinate') {
      return new Movement(x, y - 1, 'obstacle detected');
    } else {
      // If moving normally to any other coordinate
      planet.getCoordinate(x, y - 1).setOccupied(true);
      return new Movement(0, -1, '');
    }
  }

  /**
   * Gets the increment in the relative left direction
   * @returns The the relative left direction.
   */
  left(): Orientation {
    return new West();
  }

  /**
   * Gets the increment in the relative right direction
   * @returns The the relative right direction.
   */
  right(): Orientation {
    return new East();
  }

  /**
   * Gets the increment in the relative opposite direction
   * @returns The the relative opposite direction.
   */
  reverse(): Orientation {
    return new South();
  }
}

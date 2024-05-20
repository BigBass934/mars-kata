/**
 * Represents a Mars rover.
 */
import { North } from './positioning/north';
import { Orientation } from './positioning/orientation';
import { Planet } from '../grid/planet';
import { Movement } from './positioning/movement';

export class Rover {
  x: number;
  y: number;
  direction: Orientation = new North();
  onOppositeSide: boolean = false;
  planet: Planet;
  newObstacleMessage: string = '';
  obsMsgOld: boolean = false;
  lastDirection: Orientation = new North();
  lastObstacleX: number = 0;
  lastObstacleY: number = 0;
  lastX: number = 0;
  lastY: number = 0;

  /**
   * Constructs a new Rover instance.
   * @param x - The initial x-coordinate of the rover.
   * @param y - The initial y-coordinate of the rover.
   * @param planet - The planet on which the rover is operating.
   */
  constructor(x: number, y: number, planet: Planet) {
    this.x = x;
    this.y = y;
    this.planet = planet;
  }

  /**
   * Gets whether the rover is on the opposite side of the planet.
   * @returns A boolean indicating if the rover is on the opposite side.
   */
  getOpposite() {
    return this.onOppositeSide;
  }

  /**
   * Toggles the onOppositeSide property and logs the change.
   */
  toggleOpposite() {
    this.onOppositeSide = !this.onOppositeSide;
    console.log(`On Opposite Side: ${this.getOpposite()}`);
  }

  /**
   * Handles the event when an obstacle is detected during movement.
   * @param movement - The attempted movement.
   */
  handleDetectedObs(movement: Movement) {
    //Helpful Console Logging Stuff
    console.log("YOU CAN'T MOVE THERE!!!");
    console.log(`${movement.x()}, ${this.lastObstacleX}`);
    console.log(`${movement.y()}, ${this.lastObstacleY}`);
    console.log(`${this.direction.strRep()}, ${this.lastDirection.strRep()}`);
    console.log(`${this.x}, ${this.lastX}`);
    console.log(`${this.y}, ${this.lastY}`);

    // If the rover attempts to move into the last obstacle it tried, from the same direction, from the same position, make the current message not bolded.
    if (
      movement.x() === this.lastObstacleX &&
      movement.y() === this.lastObstacleY &&
      this.lastDirection.strRep() === this.direction.strRep() &&
      this.x === this.lastX &&
      this.y === this.lastY
    ) {
      this.obsMsgOld = true;
      return;
    } else {
      this.obsMsgOld = false;
      this.lastObstacleX = movement.x();
      this.lastObstacleY = movement.y();
      this.newObstacleMessage = `Rover Movement in the [${this.direction.strRep()}] Compass Direction towards Coordinate (${movement.x()}, ${movement.y()}) Aborted: Obstacle Detected`;
    }
  }

  /**
   * Moves the rover forward.
   */
  moveForward() {
    const movement = this.direction.moveForward(
      this.x,
      this.y,
      this.planet,
      this.onOppositeSide
    );
    if (
      movement.msg() === 'crossed opposite' ||
      movement.msg() === 'crossed main'
    ) {
      this.toggleOpposite();
      this.reverse();
      this.newObstacleMessage = '';
    } else if (movement.msg() === 'obstacle detected') {
      this.handleDetectedObs(movement);
    } else {
      this.lastX = this.x;
      this.lastY = this.y;
      this.x = (this.x + movement.x()) % this.planet.diameter;
      this.y = (this.y + movement.y()) % this.planet.diameter;
      if (this.x < 0) this.x += this.planet.diameter;
      if (this.y < 0) this.y += this.planet.diameter;
      this.newObstacleMessage = '';
    }
    this.lastDirection = this.direction;
    this.printAdjacentCoordinates();
  }

  /**
   * Moves the rover backward.
   */
  moveBackward() {
    this.lastX = this.x;
    this.lastY = this.y;
    const movement = this.direction.moveBackward(
      this.x,
      this.y,
      this.planet,
      this.onOppositeSide
    );
    if (
      movement.msg() === 'crossed opposite' ||
      movement.msg() === 'crossed main'
    ) {
      this.toggleOpposite();
      this.reverse();
    } else if (movement.msg() === 'obstacle detected') {
      this.handleDetectedObs(movement);
    } else {
      this.x = (this.x + movement.x()) % this.planet.diameter;
      this.y = (this.y + movement.y()) % this.planet.diameter;
      if (this.x < 0) this.x += this.planet.diameter;
      if (this.y < 0) this.y += this.planet.diameter;
      this.newObstacleMessage = '';
    }
    this.lastDirection = this.direction;
    this.printAdjacentCoordinates();
  }

  /**
   * Prints the coordinates adjacent to the rover's current position.
   */
  printAdjacentCoordinates() {
    console.log(`\nCURRENT COORDINATE: (${this.x}, ${this.y})`);
    const adjacentCoordinates = [
      {
        x: (this.x + 1) % this.planet.diameter,
        y: this.y,
        direction: 'East',
        isNull: this.planet
          .getCoordinate((this.x + 1) % this.planet.diameter, this.y)
          .isNull(),
      },
      {
        x: (this.x - 1 + this.planet.diameter) % this.planet.diameter,
        y: this.y,
        direction: 'West',
        isNull: this.planet
          .getCoordinate(
            (this.x - 1 + this.planet.diameter) % this.planet.diameter,
            this.y
          )
          .isNull(),
      },
      {
        x: this.x,
        y: (this.y + 1) % this.planet.diameter,
        direction: 'North',
        isNull: this.planet
          .getCoordinate(this.x, (this.y + 1) % this.planet.diameter)
          .isNull(),
      },
      {
        x: this.x,
        y: (this.y - 1 + this.planet.diameter) % this.planet.diameter,
        direction: 'South',
        isNull: this.planet
          .getCoordinate(
            this.x,
            (this.y - 1 + this.planet.diameter) % this.planet.diameter
          )
          .isNull(),
      },
    ];

    adjacentCoordinates.forEach((coord) => {
      console.log(
        `Adjacent to (${this.x}, ${this.y}) ${coord.direction}: (${coord.x}, ${coord.y}) Null?: ${coord.isNull}`
      );
      console.log(`lastX: ${this.lastX}, lastY: ${this.lastY}`);
    });
  }

  /**
   * Turns the rover to the left.
   */
  turnLeft() {
    this.lastDirection = this.direction;
    this.direction = this.direction.left();
  }

  /**
   * Turns the rover to the right.
   */
  turnRight() {
    this.lastDirection = this.direction;
    this.direction = this.direction.right();
  }

  /**
   * Reverses the rover's direction.
   */
  reverse() {
    this.lastDirection = this.direction;
    this.direction = this.direction.reverse();
  }
}

/**
 * Represents a planet with a grid of coordinates.
 */
import { Coordinate } from './coordinate';

export class Planet {
  diameter: number = 15;
  radius: number = this.diameter / 2;
  body: Coordinate[][];

  constructor() {
    this.body = []; // Initialize the body array
    this.createPlanet();
    this.fillPlanet();
    this.seedObstacles();
  }

  /**
   * Creates the planet's grid and initializes coordinates.
   */
  private createPlanet() {
    for (let i = 0; i < this.diameter; i++) {
      this.body[i] = [];
      for (let j = 0; j < this.diameter; j++) {
        this.body[i][j] = new Coordinate(i, j, false, false); // Initialize each coordinate
      }
    }
    this.body[7][7].setOccupied(true);
    // Example obstacle and null coordinate
    // this.body[2][2].hasObstacle = true;
    // this.body[1][1].nullOrNot = true;
  }

  /**
   * Fills specific rows of the planet's grid with null coordinates.
   */
  private fillPlanet() {
    for (let yCoord = 0; yCoord < this.diameter; yCoord++) {
      if (yCoord === 0 || yCoord === this.diameter - 1) {
        this.fillRow(7, yCoord);
      } else if (yCoord === 1 || yCoord === this.diameter - 2) {
        this.fillRow(9, yCoord);
      } else if (yCoord === 2 || yCoord === this.diameter - 3) {
        this.fillRow(11, yCoord);
      } else if (yCoord === 3 || yCoord === this.diameter - 4) {
        this.fillRow(13, yCoord);
      }
    }
  }

  /**
   * Seeds obstacles randomly within the planet's grid.
   */
  private seedObstacles() {
    // First, choose how many obstacles will be on this planet

    const minCeiled = Math.ceil(6);
    const maxFloored = Math.floor(20);
    let obsAmt = Math.floor(
      Math.random() * (maxFloored - minCeiled) + minCeiled
    );

    // Second, seed the planet with the obstacles
    for (let i = 0; i < obsAmt; i++) {
      while (true) {
        let randX = Math.floor(Math.random() * (this.diameter - 1)) + 1;
        let randY = Math.floor(Math.random() * (this.diameter - 1)) + 1;
        // If the randomly generated coordinate is not Null, has No Obstacle already, and is not occupied by the player,
        // flag that coordinate to have an obstacle, and move on to the next coord
        if (!this.getCoordinate(randX, randY).isNull()) {
          if (!this.getCoordinate(randX, randY).hasObs()) {
            if (!this.getCoordinate(randX, randY).isOccupied) {
              this.getCoordinate(randX, randY).setObstacle(true);
              console.log(
                `Coordinate (${randX}, ${randY}) now has an obstacle!`
              );
              break;
            }
          }
        }
      }
    }
  }

  /**
   * Gets the coordinate at the specified x and y position.
   * @param x - The x position.
   * @param y - The y position.
   * @returns The coordinate at the specified position.
   * @throws Will throw an error if the coordinates are out of bounds.
   */
  getCoordinate(x: number, y: number): Coordinate {
    if (x < 0 || x >= this.diameter || y < 0 || y >= this.diameter) {
      throw new Error(`Coordinates out of bounds: (${x}, ${y})`);
    }
    return this.body[x][y];
  }

  /**
   * Fills a row with null coordinates.
   * @param diameter - The diameter used to determine which coordinates to set as null.
   * @param y - The y position of the row to fill.
   */
  fillRow(diameter: number, y: number) {
    if (diameter === 7) {
      this.body[0][y].setNull(true);
      this.body[1][y].setNull(true);
      this.body[2][y].setNull(true);
      this.body[3][y].setNull(true);

      this.body[this.diameter - 1][y].setNull(true);
      this.body[this.diameter - 2][y].setNull(true);
      this.body[this.diameter - 3][y].setNull(true);
      this.body[this.diameter - 4][y].setNull(true);
    } else if (diameter === 9) {
      this.body[0][y].setNull(true);
      this.body[1][y].setNull(true);

      this.body[this.diameter - 1][y].setNull(true);
      this.body[this.diameter - 2][y].setNull(true);
    } else if (diameter === 11) {
      this.body[0][y].setNull(true);
      this.body[this.diameter - 1][y].setNull(true);
    } else if (diameter === 13) {
      this.body[0][y].setNull(false);
      this.body[this.diameter - 1][y].setNull(false);
    }
  }
}

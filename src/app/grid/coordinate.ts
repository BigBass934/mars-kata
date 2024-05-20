/**
 * Represents a coordinate on the grid.
 */
export class Coordinate {
  xPos: number;
  yPos: number;
  hasObstacle: boolean;
  nullOrNot: boolean;
  isOccupied: boolean = false;

  /**
   * Creates a new Coordinate instance.
   * @param x - The x position of the coordinate.
   * @param y - The y position of the coordinate.
   * @param obs - Indicates if the coordinate has an obstacle.
   * @param isNull - Indicates if the coordinate is null.
   */
  constructor(x: number, y: number, obs: boolean, isNull: boolean) {
    this.xPos = x;
    this.yPos = y;
    this.hasObstacle = obs;
    this.nullOrNot = isNull;
  }

  /**
   * Gets the x position of the coordinate.
   * @returns The x position.
   */
  x() {
    return this.xPos;
  }

  /**
   * Gets the y position of the coordinate.
   * @returns The y position.
   */
  y() {
    return this.yPos;
  }

  /**
   * Checks if the coordinate has an obstacle.
   * @returns True if the coordinate has an obstacle, otherwise false.
   */
  hasObs() {
    return this.hasObstacle;
  }

  /**
   * Checks if the coordinate is null.
   * @returns True if the coordinate is null, otherwise false.
   */
  isNull() {
    return this.nullOrNot;
  }

  /**
   * Checks if the coordinate is occupied.
   * @returns True if the coordinate is occupied, otherwise false.
   */
  occupied() {
    return this.isOccupied;
  }

  /**
   * Sets the occupied status of the coordinate.
   * @param status - The occupied status to set.
   */
  setOccupied(status: boolean) {
    this.isOccupied = status;
  }

  /**
   * Sets the obstacle status of the coordinate.
   * @param status - The obstacle status to set.
   */
  setObstacle(status: boolean) {
    this.hasObstacle = status;
  }

  /**
   * Sets the null status of the coordinate.
   * @param status - The null status to set.
   */
  setNull(status: boolean) {
    this.nullOrNot = status;
  }
}

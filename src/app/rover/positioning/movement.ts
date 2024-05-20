/**
 * Represents a movement result.
 */
export class Movement {
  xInc: number = 0;
  yInc: number = 0;
  strMsg: string = '';

  /**
   * Constructs a new Movement instance.
   * @param xInc - The increment in the x-direction.
   * @param yInc - The increment in the y-direction.
   * @param strMsg - The message describing the movement.
   */
  constructor(xInc: number, yInc: number, strMsg: string) {
    this.xInc = xInc;
    this.yInc = yInc;
    this.strMsg = strMsg;
  }

  /**
   * Gets the increment in the x-direction.
   * @returns The x increment.
   */
  x() {
    return this.xInc;
  }

  /**
   * Gets the increment in the y-direction.
   * @returns The y increment.
   */
  y() {
    return this.yInc;
  }

  /**
   * Gets the message describing the movement.
   * @returns The movement message.
   */
  msg() {
    return this.strMsg;
  }
}

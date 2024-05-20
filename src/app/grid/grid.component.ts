/**
 * Grid component for displaying the planet grid.
 */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Planet } from '../grid/planet';
import { Coordinate } from '../grid/coordinate';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent {
  @Input() planet!: Planet;
  @Input() roverPosition!: { x: number; y: number };
  @Input() direction!: string;
  @Input() onOppositeSide!: boolean;

  constructor() {}

  /**
   * Gets the rows for the grid based on the planet's diameter.
   * @returns An array representing the grid rows.
   */
  get gridRows(): number[] {
    return Array.from({ length: this.planet.diameter }, (_, index) => index);
  }

  /**
   * Gets the columns for the grid based on the planet's diameter.
   * @returns An array representing the grid columns.
   */
  get gridColumns(): number[] {
    return Array.from({ length: this.planet.diameter }, (_, index) => index);
  }

  /**
   * Checks if a given grid cell is the rover's position.
   * @param row - The row index of the cell.
   * @param column - The column index of the cell.
   * @returns True if the cell is the rover's position, otherwise false.
   */
  isRoverPosition(row: number, column: number): boolean {
    if (!this.roverPosition) return false;
    const adjustedX =
      (this.roverPosition.x + this.planet.diameter) % this.planet.diameter;
    const adjustedY =
      (this.roverPosition.y + this.planet.diameter) % this.planet.diameter;
    return adjustedX === column && adjustedY === this.planet.diameter - 1 - row;
  }

  /**
   * Checks if a given grid cell has an obstacle.
   * @param row - The row index of the cell.
   * @param column - The column index of the cell.
   * @returns True if the cell has an obstacle, otherwise false.
   */
  hasObstacle(row: number, column: number): boolean {
    return this.planet
      .getCoordinate(column, this.planet.diameter - 1 - row)
      .hasObs();
  }

  /**
   * Checks if a given grid cell is a null coordinate.
   * @param row - The row index of the cell.
   * @param column - The column index of the cell.
   * @returns True if the cell is a null coordinate, otherwise false.
   */
  isNullCoordinate(row: number, column: number): boolean {
    return this.planet
      .getCoordinate(column, this.planet.diameter - 1 - row)
      .isNull();
  }
}

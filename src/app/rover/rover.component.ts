import { Component } from '@angular/core';
import { Rover } from './rover';
import { Planet } from '../grid/planet';
import { FormsModule } from '@angular/forms';
import { GridComponent } from '../grid/grid.component';

/**
 * The RoverComponent class is an Angular component that manages a rover on a planet grid.
 * It allows the rover to move forward, backward, and turn left or right based on input commands.
 */
@Component({
  selector: 'app-rover',
  standalone: true,
  imports: [FormsModule, GridComponent],
  templateUrl: './rover.component.html',
  styleUrls: ['./rover.component.css'],
})
export class RoverComponent {
  rover: Rover;
  planet: Planet;
  commandString: string = '';

  /**
   * Initializes the planet and rover objects.
   */
  constructor() {
    this.planet = new Planet();
    this.rover = new Rover(7, 7, this.planet);
  }

  /**
   * Resets the rover to its initial position on the current planet.
   */
  resetRover() {
    this.rover = new Rover(7, 7, this.planet);
  }

  /**
   * Resets both the planet and the rover to their initial states.
   */
  resetSimulation() {
    this.planet = new Planet();
    this.rover = new Rover(7, 7, this.planet);
  }

  /**
   * Moves the rover forward by one unit.
   */
  moveForward() {
    this.rover.moveForward();
  }

  /**
   * Moves the rover backward by one unit.
   */
  moveBackward() {
    this.rover.moveBackward();
  }

  /**
   * Turns the rover to the left.
   */
  turnLeft() {
    this.rover.turnLeft();
  }

  /**
   * Turns the rover to the right.
   */
  turnRight() {
    this.rover.turnRight();
  }

  /**
   * Executes a series of commands to control the rover.
   * The commands are provided in a string where each character represents a command:
   * 'f' - move forward,
   * 'b' - move backward,
   * 'l' - turn left,
   * 'r' - turn right.
   * Logs an error for any invalid command.
   */
  executeCommands() {
    for (let i = 0; i < this.commandString.length; i++) {
      const command = this.commandString[i];
      switch (command) {
        case 'f':
          this.moveForward();
          break;
        case 'b':
          this.moveBackward();
          break;
        case 'l':
          this.turnLeft();
          break;
        case 'r':
          this.turnRight();
          break;
        default:
          console.log(`Invalid command: ${command}`);
      }
    }
    this.commandString = '';
  }
}

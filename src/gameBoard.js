import shipMake from './shipClass.js';
import boardDom from './boardDom.js';
export default class gameBoard {
  #playerBoardArray = [];
  #computerBoardArray = [];
  #domManager = new boardDom();
  #playerShips = {
    Carrier: new shipMake(5),
    Battleship: new shipMake(4),
    Cruiser: new shipMake(3),
    Submarine: new shipMake(3),
    Destroyer: new shipMake(2),
  };
  #enemyShips = {
    Carrier: new shipMake(5),
    Battleship: new shipMake(4),
    Cruiser: new shipMake(3),
    Submarine: new shipMake(3),
    Destroyer: new shipMake(2),
  };

  constructor(playerBoard, computerBoard) {
    this.#domManager.makeBoard(playerBoard, this.#playerBoardArray);
    this.#domManager.makeBoard(computerBoard, this.#computerBoardArray);
    this.#domManager.initializeInput(playerBoard, this.#playerShips);
    this.#domManager.computerPlacer(computerBoard, this.#enemyShips);
    this.#domManager.initializeCannons(computerBoard, this.#enemyShips);
  }
}

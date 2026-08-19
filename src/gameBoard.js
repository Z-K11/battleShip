import shipMake from './shipClass.js';
import { boardDom } from './boardDom.js';
export default class gameBoard {
  #playerBoardArray = [];
  #computerBoardArray = [];
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
    boardDom.makeBoard(playerBoard, this.#playerBoardArray);
    boardDom.makeBoard(computerBoard, this.#computerBoardArray);
  }
}

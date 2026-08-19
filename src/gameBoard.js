import { boardDom } from './boardDom.js';
export default class gameBoard {
  #playerBoardArray = [];
  #computerBoardArray = [];
  constructor(playerBoard, computerBoard) {
    boardDom.makeBoard(playerBoard, this.#playerBoardArray);
    boardDom.makeBoard(computerBoard, this.#computerBoardArray);
  }
}

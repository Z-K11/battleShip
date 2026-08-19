export default class gameBoard {
  #boardArray = [];
  constructor() {
    this.#makeBoard('playerOne');
    this.#makeBoard('playerTwo');
  }
  #makeBoard(player) {
    for (let i = 0; i < 20; i++) {
      this.#boardArray[i] = document.createElement('div');
      this.#boardArray[i].classList.add('gridBox');
      this.#boardArray[i].style.height = '5px';
      this.#boardArray[i].style.width = '5px';
      this.#boardArray[i].setAttribute('id', `${player}GrideBox${i}`);
    }
  }
}

class boardManipulator {
  makeBoard(player, boardArray) {
    for (let i = 0; i < 100; i++) {
      boardArray[i] = document.createElement('div');
      boardArray[i].classList.add('gridBox');
      boardArray[i].style.height = '50px';
      boardArray[i].style.width = '50px';
      boardArray[i].setAttribute('id', `${player}GrideBox${i}`);
      player.appendChild(boardArray[i]);
    }
  }
}
export let boardDom = new boardManipulator();

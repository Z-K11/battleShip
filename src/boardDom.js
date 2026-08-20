// class for handling all dom calls for gameBoard
export default class boardManipulator {
  // decides which ship's turn is it to be placed
  #shiPlacementIndex = 0;

  // takes a parent node and an array as arguement builds a grid appends it to the parent node and saves the references to the nodes in the array
  makeBoard(player, boardArray) {
    for (let i = 0; i < 100; i++) {
      boardArray[i] = document.createElement('div');
      boardArray[i].classList.add('gridBox');
      boardArray[i].style.height = '50px';
      boardArray[i].style.width = '50px';
      boardArray[i].setAttribute('id', `${player.id}GridBox${i}`);
      player.appendChild(boardArray[i]);
    }
  }
  playerPlacer(node, shipObject) {
    node.addEventListener('click', (e) => {
      if (this.#shiPlacementIndex > 4) return;
      const shipNames = Object.keys(shipObject);
      let currentShip = this.#retunShipType(shipObject);

      const target = e.target.id;
      const referenceBox = parseInt(target.substring(18));
      const range = parseInt(target.slice(-1));
      if (9 - range >= currentShip.shipsLength - 1) {
        for (let i = 0; i < currentShip.shipsLength; i++) {
          const currentBox = document.querySelector(
            `#playerBoardGridBox${referenceBox + i}`
          );
          currentBox.dataset.shipType = shipNames[this.#shiPlacementIndex];
          currentBox.classList.add('ship');
        }
        this.#shiPlacementIndex++;
      } else {
        return;
      }
    });
  }
  #retunShipType(shipObject) {
    switch (this.#shiPlacementIndex) {
      case 0:
        return shipObject.Carrier;
      case 1:
        return shipObject.Battleship;
      case 2:
        return shipObject.Cruiser;
      case 3:
        return shipObject.Submarine;
      case 4:
        return shipObject.Destroyer;
      default:
        console.log('Error in playerPlacer switch statement');
        break;
    }
  }
}

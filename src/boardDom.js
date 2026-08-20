// random number genarator
import { numberisor } from './numberisor.js';
// class for handling all dom calls for gameBoard
export default class boardManipulator {
  // decides which ship's turn is it to be placed
  #playerShiPlacementIndex = 0;
  #computerShiplacementIndex = 0;

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
      if (this.#playerShiPlacementIndex > 4) return;
      const shipNames = Object.keys(shipObject);
      let currentShip = this.#returnShipType(
        shipObject,
        this.#playerShiPlacementIndex
      );

      const target = e.target.id;
      if (e.target.classList.contains('ship')) return;
      const referenceBox = parseInt(target.substring(18));
      const range = parseInt(target.slice(-1));
      if (9 - range >= currentShip.shipsLength - 1) {
        for (let i = 0; i < currentShip.shipsLength; i++) {
          const currentBox = document.querySelector(
            `#playerBoardGridBox${referenceBox + i}`
          );
          currentBox.dataset.shipType =
            shipNames[this.#playerShiPlacementIndex];
          currentBox.classList.add('ship');
        }
        this.#playerShiPlacementIndex++;
      } else {
        return;
      }
    });
  }
  computerPlacer(node, shipObject) {
    if (this.#computerShiplacementIndex > 4) return;
    let visited = [];
    const shipName = Object.keys(shipObject);
    while (this.#computerShiplacementIndex <= 4) {
      let num = numberisor(0, 100);
      while (visited.includes(num)) num = numberisor(0, 100);
      const currentShip = this.#returnShipType(
        shipObject,
        this.#computerShiplacementIndex
      );
      const gridBox = document.querySelector(`#computerBoardGridBox${num}`);
      const range = parseInt(gridBox.id.slice(-1));
      if (9 - range >= currentShip.shipsLength - 1) {
        for (let i = 0; i < currentShip.shipsLength; i++) {
          const currentBox = document.querySelector(
            `#computerBoardGridBox${num + i}`
          );
          currentBox.dataset.shipType =
            shipName[this.#computerShiplacementIndex];
          currentBox.classList.add('ship');
          visited.push(num + i);
        }
        this.#computerShiplacementIndex++;
      }
    }
  }
  #returnShipType(shipObject, shipIndex) {
    switch (shipIndex) {
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

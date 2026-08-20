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
    //click event listner
    node.addEventListener('click', (e) => {
      // if all ships already placed return do nothing
      if (this.#playerShiPlacementIndex > 4) return;
      // ship names to be assigned to dataset attribue later
      const shipNames = Object.keys(shipObject);
      // function which returns the correct ship type using current index
      let currentShip = this.#returnShipType(
        shipObject,
        this.#playerShiPlacementIndex
      );

      const target = e.target.id;
      // if target already has a ship assigned return
      if (e.target.classList.contains('ship')) return;
      // extracting grid number from targetID as an integer
      const referenceBox = parseInt(target.substring(18));
      // extracting column number from the current row
      const range = parseInt(target.slice(-1));

      //if column can accomodate a ship place a ship
      if (9 - range >= currentShip.shipsLength - 1) {
        // looping until we place the ship on grid
        for (let i = 0; i < currentShip.shipsLength; i++) {
          // placing ship from origin to adjacent right node every turn
          const currentBox = document.querySelector(
            `#playerBoardGridBox${referenceBox + i}`
          );
          // added ship type to dataset
          currentBox.dataset.shipType =
            shipNames[this.#playerShiPlacementIndex];
          // adding ship class to display the ship on screen
          currentBox.classList.add('ship');
        }
        // increases index for next ship type
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

  // returns the correct ship type using ship index
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

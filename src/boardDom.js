// random number generator
import { numberisor } from './numberisor.js';
import { uniqueRangedNumberGenerator } from './numberisor.js';
import { gameRef } from './gameReferee.js';
// class for handling all dom calls for gameBoard
export default class boardManipulator {
  // decides which ship's turn is it to be placed
  #playerShiPlacementIndex = 0;
  #computerShiplacementIndex = 0;

  #endGame = false;

  #referee = new gameRef();

  // takes a parent node and an array as argument builds a grid appends it to the parent node and saves the references to the nodes in the array
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

  // initialize player input event handler
  initializeInput(node, shipObject) {
    //click event listener
    node.addEventListener('click', (e) => {
      // if all ships already placed return do nothing
      if (this.#playerShiPlacementIndex <= 4) this.#playerPlacer(e, shipObject);
    });
  }

  // place enemy ships on the cell
  computerPlacer(node, shipObject) {
    let visited = [];
    // storing ship names
    const shipName = Object.keys(shipObject);
    // looping until all ships are placed
    while (this.#computerShiplacementIndex <= 4) {
      // generating random cell number
      let num = numberisor(0, 100);

      // if the random number was already previously generated, generate again
      while (visited.includes(num)) num = numberisor(0, 100);

      // getting current ship type to place on grid cell
      const currentShip = this.#returnShipType(
        shipObject,
        this.#computerShiplacementIndex
      );
      // stores previous cell numbers where ship blocks have been placed
      let previousCells = [];
      // extracting column number from cell number
      const range = parseInt(String(num).slice(-1));

      // checking if all adjacent columns can accommodate current ship
      if (9 - range >= currentShip.shipsLength - 1) {
        for (let i = 0; i < currentShip.shipsLength; i++) {
          const currentBox = document.querySelector(
            `#computerBoardGridBox${num + i}`
          );

          //check if current node cell is colliding with another ship
          if (currentBox.classList.contains('ship')) {
            // remove ship from the grid in case of collision
            for (let currentCell of previousCells) {
              const currentNode = document.querySelector(
                `#computerBoardGridBox${currentCell}`
              );
              // delete dataset shipType from colliding cell
              delete currentNode.dataset.shipType;
              // remove ship from ui
              // mark current point us visited to avoid placing ship again
              visited.push(currentCell);
            }
            // reverting ship index back
            this.#computerShiplacementIndex--;
            // break out of current loop to start ship placement again
            continue;
          }

          // assign ship type as dataset
          currentBox.dataset.shipType =
            shipName[this.#computerShiplacementIndex];
          // add current cell number into visited for tracking
          visited.push(num + i);
          previousCells.push(num + i);
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
  #playerPlacer(e, shipObject) {
    // ship names to be assigned to dataset attribute later
    const shipNames = Object.keys(shipObject);
    // function which returns the correct ship type using current index
    let currentShip = this.#returnShipType(
      shipObject,
      this.#playerShiPlacementIndex
    );

    const target = e.target.id;
    // extracting grid number from targetID as an integer
    const referenceBox = parseInt(target.substring(18));
    // extracting column number from the current row
    const range = parseInt(target.slice(-1));

    let shipCellLocation = [];
    //if column can accommodate a ship place a ship
    if (9 - range >= currentShip.shipsLength - 1) {
      // looping until we place the ship on grid
      for (let i = 0; i < currentShip.shipsLength; i++) {
        // placing ship from origin to adjacent right node every turn
        const currentBox = document.querySelector(
          `#playerBoardGridBox${referenceBox + i}`
        );
        // checking if the current cell is occupied
        if (currentBox.classList.contains('ship')) {
          alert('Cannot place ship required cell(s) already occupied');
          // looping over non previously occupied cells to remove the ship blocks
          for (let cellNumber of shipCellLocation) {
            const removeCell = document.querySelector(
              `#playerBoardGridBox${cellNumber}`
            );
            // removing type data set
            delete removeCell.dataset.shipType;
            removeCell.classList.remove('ship');
          }
          return;
        }
        // added ship type to dataset
        currentBox.dataset.shipType = shipNames[this.#playerShiPlacementIndex];
        // adding ship class to display the ship on screen
        currentBox.classList.add('ship');
        // keeping track of already visited empty nodes
        shipCellLocation.push(referenceBox + i);
      }
      // increases index for next ship type
      this.#playerShiPlacementIndex++;
    } else {
      return;
    }
  }

  initializeCannons(node, enemyShips, playerShips) {
    node.addEventListener('click', (e) => {
      if (this.#playerShiPlacementIndex <= 4) return;
      if (this.#endGame) return;
      this.#attack(e, enemyShips);
      if (this.#referee.checkPlayerWin(enemyShips)) {
        alert('Player Won');
        this.#endGame = true;
      }
      this.#enemyCanonFire(playerShips);
      if (this.#referee.checkEnemyWin(playerShips)) {
        alert('Enemy Won');
        this.#endGame = true;
      }
    });
  }

  // function to register a hit on an enemy ship
  #attack(e, enemyShips) {
    console.log('attack fired');
    const target = e.target;
    if (target.hasAttribute('data-ship-type')) {
      const ship = target.dataset.shipType;
      enemyShips[ship].hit();
      target.classList.add('shipHit');
    }
  }
  #enemyCanonFire(playerShips) {
    console.log('cannonFired');
    const num = uniqueRangedNumberGenerator();
    const currentNode = document.querySelector(`#playerBoardGridBox${num}`);
    if (currentNode.hasAttribute('data-ship-type')) {
      const ship = currentNode.dataset.shipType;
      playerShips[ship].hit();
      currentNode.classList.remove('ship');
      currentNode.classList.add('shipHurt');
    }
  }
}

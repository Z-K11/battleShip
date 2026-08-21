export class gameRef {
  checkPlayerWin(enemyShips) {
    for (let ship of Object.values(enemyShips)) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }

  checkEnemyWin(playerShips) {
    for (let ship of Object.values(playerShips)) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
}

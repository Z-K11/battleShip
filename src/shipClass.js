// class for creating ships in the game
export default class ships {
  // private fields that keep track of the length of the ship the number of time it has been hit and if it has sunk or not;
  #shipLength;
  #numberOfHits;
  #sinkStatus;
  constructor(l) {
    // initialy a ship will have zero hits and sink status is set to false because ship has not sunk yet lol
    this.#shipLength = l;
    this.#numberOfHits = 0;
    this.#sinkStatus = false;
  }
  // increases number of hits taken by the ship on call
  hit() {
    this.#numberOfHits++;
  }
}

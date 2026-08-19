import shipMaker from './shipClass.js';
let testShip = new shipMaker(3);

describe('the battleship :', () => {
  test("doesn't sink when it has not been hit number of times, equal to it's length", () => {
    expect(testShip.isSunk()).toBe(false);
  });
  test("sinks when it has been hit a number of times equal to it's length", () => {
    for (let i = 0; i < 3; i++) testShip.hit();
    expect(testShip.isSunk()).toBe(true);
  });
  test('sink Status is sink if the ship was detected to have sunk already before', () => {
    expect(testShip.isSunk()).toBe(true);
  });
});

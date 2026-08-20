import { numberisor } from './numberisor.js';

test('Returns a random number 10 and 13', () => {
  const result = numberisor(10, 13);
  expect(result).toBeGreaterThanOrEqual(10);
  expect(result).toBeLessThan(13);
});

test('Always returns a random number between any range', () => {
  for (let i = 0; i < 100; i++) {
    const result = numberisor(i, i + 5);
    expect(result).toBeGreaterThanOrEqual(i);
    expect(result).toBeLessThan(i + 5);
  }
});

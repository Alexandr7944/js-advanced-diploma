import { calcTileType } from '../utils';

test('test function calcTileType(top-left)', () => {
  expect(calcTileType(0, 8)).toBe('top-left');
});

test('test function calcTileType(top)', () => {
  expect(calcTileType(1, 8)).toBe('top');
});

test('test function calcTileType(bottom-right)', () => {
  expect(calcTileType(63, 8)).toBe('bottom-right');
});

test('test function calcTileType(left)', () => {
  expect(calcTileType(7, 7)).toBe('left');
});

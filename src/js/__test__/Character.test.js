import Character from '../Character';

test('test Character error', () => {
  expect(() => {
    // eslint-disable-next-line no-new
    new Character(1, 2, 3);
  }).toThrow('Disabling class Character()');
});

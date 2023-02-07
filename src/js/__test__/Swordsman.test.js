import Swordsman from '../characters/Swordsman';

test('test properties class Swordsman', () => {
  const instance = new Swordsman(1);
  expect(instance.attack).toBe(40);
});

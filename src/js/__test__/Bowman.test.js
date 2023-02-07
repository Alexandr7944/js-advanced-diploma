import Bowman from '../characters/Bowman';

test('test properties class Bowman', () => {
  const instance = new Bowman(1);
  expect(instance.type).toBe('bowman');
});

/* eslint-disable max-len */
/* eslint-disable new-cap */
import Team from './Team';

/**
 * Формирует экземпляр персонажа из массива allowedTypes со
 * случайным уровнем от 1 до maxLevel
 *
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @returns генератор, который при каждом вызове
 * возвращает новый экземпляр класса персонажа
 *
 */
export function* characterGenerator(allowedTypes, maxLevel) {
  const random = () => {
    const type = Math.floor(Math.random() * allowedTypes.length);
    const level = Math.ceil(Math.random() * maxLevel);
    return new allowedTypes[type](level);
  };
  while (true) yield random();
  // TODO: write logic here
}

/**
 * Формирует массив персонажей на основе characterGenerator
 * @param allowedTypes массив классов
 * @param maxLevel максимальный возможный уровень персонажа
 * @param characterCount количество персонажей, которое нужно сформировать
 * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount
 * */
export function generateTeam(allowedTypes, maxLevel, characterCount) {
  const playerGenerator = characterGenerator(allowedTypes, maxLevel);
  const playerTypes = [];
  for (let i = 1; i <= characterCount; i += 1) {
    const player = playerGenerator.next().value;
    playerTypes.push(player);
  }
  return new Team(playerTypes);
  // TODO: write logic here
}

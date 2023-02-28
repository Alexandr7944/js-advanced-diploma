import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import Team from './Team';

export default class GameTeam {
  constructor(maxLevel, boardSize) {
    this.maxLevel = maxLevel;
    this.boardSize = boardSize;
  }

  // если уровень №1, то формирование новой комманды
  // если уровень не первый, то левая комманда остается старая
  newTeams(left) {
    const teamLeft = left.length !== 0
      ? new Team(left)
      : generateTeam([Bowman, Swordsman, Magician], this.maxLevel, 3);
    const teamRight = generateTeam([Vampire, Undead, Daemon], this.maxLevel, 3);
    const teamLeftPosition = this.teamPositionedCharacter(teamLeft.characters);
    const teamRightPosition = this.teamPositionedCharacter(teamRight.characters);
    return teamLeftPosition.concat(teamRightPosition);
  }

  // метод принимает комманду и создает объект класса PositionedCharacter
  teamPositionedCharacter(team) {
    const cache = [];

    const validPosition = (character) => {
      const position = this.generatorPosition(character);
      if (cache.indexOf(position) > -1) {
        return validPosition(character);
      }
      cache.push(position);
      return position;
    };

    return team.map((item) => {
      const position = validPosition(item);
      return new PositionedCharacter(item, position);
    });
  }

  // принимает персонажа и генерирует его позицию
  generatorPosition(character) {
    const bordEl = Math.floor(Math.random() * this.boardSize * 2);
    const positionLeft = Math.floor(bordEl / 2) * this.boardSize + (bordEl % 2);
    if (character.team === 'left') return positionLeft;
    return positionLeft + this.boardSize - 2;
  }
}

import themes from './themes';
import Bowman from './characters/Bowman';
import Swordsman from './characters/Swordsman';
import Magician from './characters/Magician';
import Vampire from './characters/Vampire';
import Undead from './characters/Undead';
import Daemon from './characters/Daemon';
import PositionedCharacter from './PositionedCharacter';
import { generateTeam } from './generators';
import GamePlay from './GamePlay';
import GameState from './GameState';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.maxLevel = 1;
    this.teamPosition = null;
    this.selectedHero = null;
    this.cellChild = null;
  }

  init() {
    // TODO: add event listeners to gamePlay events
    this.gamePlay.drawUi(themes.prairie);
    GameState.from('left');
    const teamLeft = generateTeam([Bowman, Swordsman, Magician], this.maxLevel, 3);
    const teamRight = generateTeam([Vampire, Undead, Daemon], this.maxLevel, 3);
    const teamLeftPosition = this.teamPositionedCharacter(teamLeft.characters);
    const teamRightPosition = this.teamPositionedCharacter(teamRight.characters);
    this.teamPosition = teamLeftPosition.concat(teamRightPosition);
    this.gamePlay.redrawPositions(this.teamPosition);
    this.listener();
  }

  listener() {
    this.listenerCellEnter();
    this.listenerCellClick();
    this.listenerCellLeave();
  }

  listenerCellClick() {
    this.onCellClick = this.onCellClick.bind(this);
    this.gamePlay.addCellClickListener(this.onCellClick);
  }

  listenerCellEnter() {
    this.onCellEnter = this.onCellEnter.bind(this);
    this.gamePlay.addCellEnterListener(this.onCellEnter);
  }

  listenerCellLeave() {
    this.onCellLeave = this.onCellLeave.bind(this);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
  }

  onCellClick(index) {
    if (GameState.from() === 'left' && this.cellChild) this.setSelectedHero(index);

    if (this.selectedHero) {
      if (this.cellChild) {
        if (this.validAttacka(index)
          && (this.cellChild.className.includes('undead')
          || this.cellChild.className.includes('daemon')
          || this.cellChild.className.includes('vampire'))) {
          const attacker = this.selectedHero.character;
          const target = this.teamPosition.find((hero) => hero.position === index);
          const attack = Math.max(
            attacker.attack - target.character.defence,
            attacker.attack * 0.1,
          );
          target.character.health -= attack;

          this.gamePlay.showDamage(index, `- ${attack}`).then(() => {
            this.reset();
            if (target.character.health <= 0) {
              this.teamPosition = this.teamPosition.filter((hero) => hero !== target);
              this.gamePlay.redrawPositions(this.teamPosition);
              if (!this.teamPosition.some((item) => item.character.type === 'undead'
                    || item.character.type === 'daemon'
                    || item.character.type === 'vampire')) {
                this.nextLevel();
              }
            }
          });
        }
      } else if (this.validPosition(index)) {
        const indexHero = this.teamPosition.indexOf(this.selectedHero);
        this.teamPosition[indexHero].position = index;
        this.reset();
      }
    }
  }

  onCellEnter(index) {
    const { cells } = this.gamePlay;
    this.cellChild = cells[index].querySelector('.character');

    if (this.cellChild) {
      this.teamPosition.forEach((item) => {
        if (item.position === index) {
          this.gamePlay.showCellTooltip(`
          🎖 ${item.character.level} ⚔ ${item.character.attack} 🛡 ${item.character.defence} ❤ ${item.character.health}
          `, index);
        }
      });
    }

    if (GameState.from() === 'left' && this.selectedHero) {
      if (!this.cellChild) {
        if (this.validPosition(index)) {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor('pointer');
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      } else if (this.cellChild.className.includes('undead')
        || this.cellChild.className.includes('daemon')
        || this.cellChild.className.includes('vampire')) {
        if (this.validAttacka(index)) {
          this.gamePlay.selectCell(index, 'red');
          this.gamePlay.setCursor('crosshair');
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      } else {
        this.gamePlay.setCursor('pointer');
      }
    }
  }

  onCellLeave(index) {
    if (this.cellChild) {
      this.gamePlay.hideCellTooltip(index);
      if (this.cellChild.className.includes('undead')
      || this.cellChild.className.includes('daemon')
      || this.cellChild.className.includes('vampire')) {
        this.gamePlay.deselectCell(index);
      }
    } else {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor('auto');
  }

  reset() {
    this.gamePlay.redrawPositions(this.teamPosition);
    this.selectedHero = null;
    // this.gamePlay.setCursor('auto');
    // GameState.from('right');
    this.gamePlay.cells.forEach((item, index) => {
      if (item.className.includes('selected')) {
        this.gamePlay.deselectCell(index);
      }
    });
  }

  // повышение уровня
  nextLevel() {
    this.maxLevel += 1;
    this.init();
  }

  // определяет дальность перемещения для каждого героя
  // вызывает requirementPosition с данными героя
  validPosition(index) {
    if (this.selectedHero.character.type === 'magician'
      || this.selectedHero.character.type === 'daemon') {
      return this.requirementPosition(index, 1);
    }
    if (this.selectedHero.character.type === 'bowman'
      || this.selectedHero.character.type === 'vampire') {
      return this.requirementPosition(index, 2);
    }
    if (this.selectedHero.character.type === 'swordsman'
      || this.selectedHero.character.type === 'undead') {
      return this.requirementPosition(index, 4);
    }
    return false;
  }

  // определяет дальность атаки для каждого героя
  // вызывает requirementAttacka с данными героя
  validAttacka(index) {
    if (this.selectedHero.character.type === 'magician'
      || this.selectedHero.character.type === 'daemon') {
      return this.requirementAttacka(index, 4);
    }
    if (this.selectedHero.character.type === 'bowman'
      || this.selectedHero.character.type === 'vampire') {
      return this.requirementAttacka(index, 2);
    }
    if (this.selectedHero.character.type === 'swordsman'
      || this.selectedHero.character.type === 'undead') {
      return this.requirementAttacka(index, 1);
    }
    return false;
  }

  // условие для проведения перемещения
  requirementPosition(index, n) {
    const { position } = this.selectedHero;
    const lengthBoard = this.gamePlay.boardSize;

    const x1 = Math.floor(position / lengthBoard);
    const x2 = Math.floor(index / lengthBoard);
    const y1 = position % lengthBoard;
    const y2 = index % lengthBoard;
    if ((x1 === x2 && Math.abs(y1 - y2) <= n)
        || (y1 === y2 && Math.abs(x1 - x2) <= n)
        || (Math.abs(y1 - y2) === Math.abs(x1 - x2)
        && Math.abs(x1 - x2) <= n)) {
      return true;
    }
    return false;
  }

  // условие для проведения атаки
  requirementAttacka(index, n) {
    const { position } = this.selectedHero;
    const lengthBoard = this.gamePlay.boardSize;

    const x1 = Math.floor(position / lengthBoard);
    const x2 = Math.floor(index / lengthBoard);
    const y1 = position % lengthBoard;
    const y2 = index % lengthBoard;
    if ((x1 + n >= x2 && x1 - n <= x2)
        && (y1 + n >= y2 && y1 - n <= y2)) {
      return true;
    }
    return false;
  }

  // ищет героя о индексу
  searchHero(index) {
    return this.teamPosition.find((item) => item.position === index);
  }

  // Выбор героя по индексу, сообщение об ошибке
  setSelectedHero(index) {
    const { cells } = this.gamePlay;
    const select = cells.findIndex((item) => item.className.includes('selected'));
    if (select !== -1) this.gamePlay.deselectCell(select);

    if (this.cellChild.className.includes('bowman')
      || this.cellChild.className.includes('swordsman')
      || this.cellChild.className.includes('magician')) {
      this.gamePlay.selectCell(index);
      this.selectedHero = this.searchHero(index);
    } else if (!this.selectedHero) {
      GamePlay.showError('Выберете игрока из своей комманды');
    }
  }

  // метод принимает комманду и создает объект класса PositionedCharacter
  teamPositionedCharacter(team) {
    const cache = [];

    const validPosition = (character) => {
      const position = this.generatorPosition(character);
      if (cache.indexOf(position) !== -1) {
        return validPosition(character);
      }
      cache.push(position);
      return position;
    };

    return team.map((item) => {
      const position = validPosition(item.type);
      return new PositionedCharacter(item, position);
    });
  }

  // принимает персонажа и генерирует его позицию
  generatorPosition(character) {
    const bordEl = Math.floor(Math.random() * this.gamePlay.boardSize * 2);
    const positionLeft = Math.floor(bordEl / 2) * this.gamePlay.boardSize + (bordEl % 2);
    const positionRight = positionLeft + this.gamePlay.boardSize - 2;

    return (character === 'bowman'
      || character === 'swordsman'
      || character === 'magician')
      ? positionLeft
      : positionRight;
  }
}

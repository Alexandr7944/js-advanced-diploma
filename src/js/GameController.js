/* eslint-disable no-param-reassign */
import themes from './themes';
import GamePlay from './GamePlay';
import GameState from './GameState';
import GameTeam from './GameTeam';

export default class GameController {
  constructor(gamePlay, stateService) {
    this.gamePlay = gamePlay;
    this.stateService = stateService;
    this.gameState = new GameState();
    this.teamPosition = null;
    this.selectedHero = null;
    this.cellChild = null;
    this.teamLeft = [];
  }

  init() {
    // TODO: add event listeners to gamePlay events
    const themesArray = [themes.prairie, themes.desert, themes.arctic, themes.mountain];
    this.gamePlay.drawUi(themesArray[this.gameState.maxLevel - 1]);
    this.gameState.state = 'left';
    this.teamPosition = new GameTeam(
      this.gameState.maxLevel,
      this.gamePlay.boardSize,
    ).newTeams(this.teamLeft);

    this.gamePlay.redrawPositions(this.teamPosition);

    this.onCellClick = this.onCellClick.bind(this);
    this.gamePlay.addCellClickListener(this.onCellClick);
    this.onCellEnter = this.onCellEnter.bind(this);
    this.gamePlay.addCellEnterListener(this.onCellEnter);
    this.onCellLeave = this.onCellLeave.bind(this);
    this.gamePlay.addCellLeaveListener(this.onCellLeave);
  }

  onCellClick(index) {
    if (this.gameState.state === 'left' && this.cellChild) this.setSelectedHero(index);
    if (this.selectedHero) {
      if (this.cellChild) {
        if (this.validAttacka(index)
          && (this.positionRight().includes(index))) {
          const attacker = this.selectedHero.character;
          const target = this.teamPosition.find((hero) => hero.position === index);
          const attack = Math.max(
            attacker.attack - target.character.defence,
            attacker.attack * 0.1,
          );
          target.character.health -= attack;

          this.gamePlay.showDamage(index, `- ${attack}`).then(() => {
            if (target.character.health <= 0) {
              this.teamPosition = this.teamPosition.filter((hero) => hero !== target);
              if (!this.teamPosition.some((item) => item.character.team === 'right')) {
                return this.nextLevel();
              }
              return this.reset();
            }
            return this.reset();
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

    if (this.gameState.state === 'left' && this.selectedHero) {
      if (!this.cellChild) {
        if (this.validPosition(index)) {
          this.gamePlay.selectCell(index, 'green');
          this.gamePlay.setCursor('pointer');
        } else {
          this.gamePlay.setCursor('not-allowed');
        }
      } else if (this.positionRight().includes(index)) {
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
      if (this.positionRight().includes(index)) {
        this.gamePlay.deselectCell(index);
      }
    } else {
      this.gamePlay.deselectCell(index);
    }
    this.gamePlay.setCursor('auto');
  }

  reset() {
    if (this.gameState.state === 'right') {
      this.gameState.state = 'left';
    } else {
      this.gamePlay.cells.forEach((item, index) => {
        if (item.className.includes('selected')) {
          this.gamePlay.deselectCell(index);
        }
      });
      this.selectedHero = null;
      this.gameState.state = 'right';
      this.attackRight();
    }
    this.gamePlay.redrawPositions(this.teamPosition);
  }

  // повышение уровня
  nextLevel() {
    this.gameState.maxLevel += 1;
    this.teamLeft = [];
    this.teamPosition
      .filter((item) => item.character.team === 'left')
      .forEach((item) => {
        item.character.level += 1;
        item.character.calcState();
        this.teamLeft.push(item.character);
      });
    this.init();
  }

  // условие для проведения перемещения
  validPosition(index) {
    const { position, character } = this.selectedHero;
    const lengthBoard = this.gamePlay.boardSize;

    const x1 = Math.floor(position / lengthBoard);
    const x2 = Math.floor(index / lengthBoard);
    const y1 = position % lengthBoard;
    const y2 = index % lengthBoard;
    if ((x1 === x2 && Math.abs(y1 - y2) <= character.maxStep)
        || (y1 === y2 && Math.abs(x1 - x2) <= character.maxStep)
        || (Math.abs(y1 - y2) === Math.abs(x1 - x2)
        && Math.abs(x1 - x2) <= character.maxStep)) {
      return true;
    }
    return false;
  }

  // условие для проведения атаки
  validAttacka(index, hero = this.selectedHero) {
    const { position } = hero;
    const { maxAttackRange } = hero.character;
    const lengthBoard = this.gamePlay.boardSize;

    const x1 = Math.floor(position / lengthBoard);
    const x2 = Math.floor(index / lengthBoard);
    const y1 = position % lengthBoard;
    const y2 = index % lengthBoard;
    if ((x1 + maxAttackRange >= x2 && x1 - maxAttackRange <= x2)
        && (y1 + maxAttackRange >= y2 && y1 - maxAttackRange <= y2)) {
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
    if (select > -1) this.gamePlay.deselectCell(select);

    if (this.positionLeft().includes(index)) {
      this.gamePlay.selectCell(index);
      this.selectedHero = this.searchHero(index);
    } else if (!this.selectedHero) {
      GamePlay.showError('Выберете игрока из своей комманды');
    }
  }

  positionLeft() {
    const result = [];
    this.teamPosition.forEach((item) => {
      if (item.character.team === 'left') {
        result.push(item.position);
      }
    });
    return result;
  }

  positionRight() {
    const result = [];
    this.teamPosition.forEach((item) => {
      if (item.character.team === 'right') {
        result.push(item.position);
      }
    });
    return result;
  }

  // логика атаки комманды противника (не работает Promise)
  attackRight() {
    const teamLeft = this.teamPosition.filter((item) => item.character.team === 'left')
      .sort((a, b) => b.character.attack - a.character.attack);
    const teamRight = this.teamPosition.filter((item) => item.character.team === 'right')
      .sort((a, b) => b.character.attack - a.character.attack);
    let fight = [];

    for (let i = 0; i < teamRight.length; i += 1) {
      for (let j = 0; j < teamLeft.length; j += 1) {
        if (this.validAttacka(teamLeft[j].position, teamRight[i])) {
          fight = [teamRight[i], teamLeft[j]];
          break;
        }
      }
    }

    if (fight.length === 2) {
      const [attacker, target] = fight;
      const attack = Math.max(
        attacker.character.attack - target.character.defence,
        attacker.character.attack * 0.1,
      );
      // eslint-disable-next-line no-param-reassign
      target.character.health -= attack;

      // this.gamePlay.showDamage(target.position, `- ${attack}`).then(() => {
      console.log(target.position, `- ${attack}`);
      this.reset();
      if (target.character.health <= 0) {
        this.teamPosition = this.teamPosition.filter((hero) => hero !== target);
        this.gamePlay.redrawPositions(this.teamPosition);
        if (!this.teamPosition.some((item) => item.character.team === 'left')) {
          console.log('Game over!');
        }
      }
    } else {
      const lengthBoard = this.gamePlay.boardSize;
      const y1 = Math.floor(teamRight[0].position / lengthBoard);
      const y2 = Math.floor(teamLeft[0].position / lengthBoard);
      const x1 = teamRight[0].position % lengthBoard;
      const x2 = teamLeft[0].position % lengthBoard;
      const resX = Math.abs(x1 - x2);
      const resY = Math.abs(y1 - y2);
      if (resX > resY) {
        if (x1 > x2) {
          if (resX > teamRight[0].character.maxStep) {
            teamRight[0].position -= teamRight[0].character.maxStep;
          } else if (resX <= teamRight[0].character.maxStep) {
            teamRight[0].position -= resX - 1;
          }
        }
        if (x1 < x2) {
          if (resX > teamRight[0].character.maxStep) {
            teamRight[0].position += teamRight[0].character.maxStep;
          } else if (resX <= teamRight[0].character.maxStep) {
            teamRight[0].position += resX - 1;
          }
        }
      } else if (resX < resY) {
        if (y1 > y2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position -= teamRight[0].character.maxStep * lengthBoard;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position -= (resY - 1) * lengthBoard;
          }
        }
        if (y1 < y2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position += teamRight[0].character.maxStep * lengthBoard;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position += (resY - 1) * lengthBoard;
          }
        }
      } else if (resX === resY) {
        if (y1 > y2 && x1 > x2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              - teamRight[0].character.maxStep * lengthBoard
              - teamRight[0].character.maxStep;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              - (resY - 1) * lengthBoard
              - resY + 1;
          }
        } else if (y1 > y2 && x1 < x2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              - teamRight[0].character.maxStep * lengthBoard
              + teamRight[0].character.maxStep;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              - (resY - 1) * lengthBoard
              + resY - 1;
          }
        } else if (y1 < y2 && x1 > x2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              + teamRight[0].character.maxStep * lengthBoard
              - teamRight[0].character.maxStep;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              + (resY - 1) * lengthBoard
              - resY + 1;
          }
        } else if (y1 < y2 && x1 < x2) {
          if (resY > teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              + teamRight[0].character.maxStep * lengthBoard
              + teamRight[0].character.maxStep;
          } else if (resY <= teamRight[0].character.maxStep) {
            teamRight[0].position = teamRight[0].position
              + (resY - 1) * lengthBoard
              + resY - 1;
          }
        }
      }
      this.reset();
    }
  }
}

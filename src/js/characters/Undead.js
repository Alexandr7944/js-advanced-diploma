import Character from '../Character';

export default class Undead extends Character {
  constructor(level) {
    super(level, 40, 10, 'undead');
    this.team = 'right';
    this.maxStep = 4;
    this.maxAttackRange = 1;
  }
}

import Character from '../Character';

export default class Swordsman extends Character {
  constructor(level) {
    super(level, 40, 10, 'swordsman');
    this.team = 'left';
    this.maxStep = 4;
    this.maxAttackRange = 1;
  }
}

import Character from '../Character';

export default class Magician extends Character {
  constructor(level) {
    super(level, 10, 40, 'magician');
    this.team = 'left';
    this.maxStep = 1;
    this.maxAttackRange = 4;
  }
}

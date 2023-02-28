import Character from '../Character';

export default class Daemon extends Character {
  constructor(level) {
    super(level, 10, 10, 'daemon');
    this.team = 'right';
    this.maxStep = 1;
    this.maxAttackRange = 4;
  }
}

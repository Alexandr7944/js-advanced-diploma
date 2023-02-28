import Character from '../Character';

export default class Bowman extends Character {
  constructor(level) {
    super(level, 25, 25, 'bowman');
    this.team = 'left';
    this.maxStep = 2;
    this.maxAttackRange = 2;
  }
}

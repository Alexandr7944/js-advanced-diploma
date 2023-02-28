import Character from '../Character';

export default class Vampire extends Character {
  constructor(level) {
    super(level, 25, 25, 'vampire');
    this.team = 'right';
    this.maxStep = 2;
    this.maxAttackRange = 2;
  }
}

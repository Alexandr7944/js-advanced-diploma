/**
 * Базовый класс, от которого наследуются классы персонажей
 * @property level - уровень персонажа, от 1 до 4
 * @property attack - показатель атаки
 * @property defence - показатель защиты
 * @property health - здоровье персонажа
 * @property type - строка с одним из допустимых значений:
 * swordsman
 * bowman
 * magician
 * daemon
 * undead
 * vampire
 */
export default class Character {
  constructor(level, attack, defence, type = 'generic') {
    this.level = level;
    this.attack = attack;
    this.defence = defence;
    this.health = 50;
    this.type = type;
    this.calcState();
    // TODO: выбросите исключение, если кто-то использует "new Character()"
    if (new.target.name === 'Character') {
      throw new Error('Disabling class Character()');
    }
  }

  calcState() {
    if (this.level > 1) {
      this.attack = Math.floor(Math.max(
        this.attack,
        (this.attack * (80 + this.health + this.level * 10)) / 100,
      ));

      this.defence = Math.floor(Math.max(
        this.defence,
        (this.defence * (80 + this.health + this.level * 10)) / 100,
      ));

      this.health += 80;
      if (this.health > 100) this.health = 100;
    }
  }
}

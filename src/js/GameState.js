export default class GameState {
  // constructor() {
  //   this.state = 'left';
  //   this.from = this.from.bind(this);
  // }

  static from(value) {
    if (value) this.state = value;
    return this.state;
    // TODO: create object
  }
}

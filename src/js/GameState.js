/* eslint-disable no-underscore-dangle */
export default class GameState {
  constructor() {
    this.maxLevel = 1;
  }

  set state(item) {
    this._state = item;
  }

  get state() {
    return this._state;
  }
}

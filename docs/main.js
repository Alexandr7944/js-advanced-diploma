/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css/style.css */ \"./src/css/style.css\");\n/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/app */ \"./src/js/app.js\");\n\n\n\n// Точка входа webpack\n// Не пишите код в данном файле\n\n//# sourceURL=webpack://js-advanced-diploma/./src/index.js?");

/***/ }),

/***/ "./src/js/Character.js":
/*!*****************************!*\
  !*** ./src/js/Character.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Character; }\n/* harmony export */ });\n/**\r\n * Базовый класс, от которого наследуются классы персонажей\r\n * @property level - уровень персонажа, от 1 до 4\r\n * @property attack - показатель атаки\r\n * @property defence - показатель защиты\r\n * @property health - здоровье персонажа\r\n * @property type - строка с одним из допустимых значений:\r\n * swordsman\r\n * bowman\r\n * magician\r\n * daemon\r\n * undead\r\n * vampire\r\n */\nclass Character {\n  constructor(level, attack, defence) {\n    let type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'generic';\n    this.level = level;\n    this.attack = attack;\n    this.defence = defence;\n    this.health = 50;\n    this.type = type;\n    // TODO: выбросите исключение, если кто-то использует \"new Character()\"\n    if (new.target.name === 'Character') {\n      throw new Error('Disabling class Character()');\n    }\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/Character.js?");

/***/ }),

/***/ "./src/js/GameController.js":
/*!**********************************!*\
  !*** ./src/js/GameController.js ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GameController; }\n/* harmony export */ });\n/* harmony import */ var _themes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themes */ \"./src/js/themes.js\");\n/* harmony import */ var _characters_Bowman__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./characters/Bowman */ \"./src/js/characters/Bowman.js\");\n/* harmony import */ var _characters_Swordsman__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./characters/Swordsman */ \"./src/js/characters/Swordsman.js\");\n/* harmony import */ var _characters_Magician__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./characters/Magician */ \"./src/js/characters/Magician.js\");\n/* harmony import */ var _characters_Vampire__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./characters/Vampire */ \"./src/js/characters/Vampire.js\");\n/* harmony import */ var _characters_Undead__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./characters/Undead */ \"./src/js/characters/Undead.js\");\n/* harmony import */ var _characters_Daemon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./characters/Daemon */ \"./src/js/characters/Daemon.js\");\n/* harmony import */ var _PositionedCharacter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./PositionedCharacter */ \"./src/js/PositionedCharacter.js\");\n/* harmony import */ var _generators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./generators */ \"./src/js/generators.js\");\n/* harmony import */ var _GamePlay__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./GamePlay */ \"./src/js/GamePlay.js\");\n/* harmony import */ var _GameState__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./GameState */ \"./src/js/GameState.js\");\n\n\n\n\n\n\n\n\n\n\n\nclass GameController {\n  constructor(gamePlay, stateService) {\n    this.gamePlay = gamePlay;\n    this.stateService = stateService;\n    this.maxLevel = 1;\n    this.teamPosition = null;\n    this.selectedHero = null;\n    this.cellChild = null;\n  }\n  init() {\n    // TODO: add event listeners to gamePlay events\n    this.gamePlay.drawUi(_themes__WEBPACK_IMPORTED_MODULE_0__[\"default\"].prairie);\n    _GameState__WEBPACK_IMPORTED_MODULE_10__[\"default\"].from('left');\n    const teamLeft = (0,_generators__WEBPACK_IMPORTED_MODULE_8__.generateTeam)([_characters_Bowman__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _characters_Swordsman__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _characters_Magician__WEBPACK_IMPORTED_MODULE_3__[\"default\"]], this.maxLevel, 3);\n    const teamRight = (0,_generators__WEBPACK_IMPORTED_MODULE_8__.generateTeam)([_characters_Vampire__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _characters_Undead__WEBPACK_IMPORTED_MODULE_5__[\"default\"], _characters_Daemon__WEBPACK_IMPORTED_MODULE_6__[\"default\"]], this.maxLevel, 3);\n    const teamLeftPosition = this.teamPositionedCharacter(teamLeft.characters);\n    const teamRightPosition = this.teamPositionedCharacter(teamRight.characters);\n    this.teamPosition = teamLeftPosition.concat(teamRightPosition);\n    this.gamePlay.redrawPositions(this.teamPosition);\n    this.listener();\n  }\n  listener() {\n    this.listenerCellEnter();\n    this.listenerCellClick();\n    this.listenerCellLeave();\n  }\n  listenerCellClick() {\n    this.onCellClick = this.onCellClick.bind(this);\n    this.gamePlay.addCellClickListener(this.onCellClick);\n  }\n  listenerCellEnter() {\n    this.onCellEnter = this.onCellEnter.bind(this);\n    this.gamePlay.addCellEnterListener(this.onCellEnter);\n  }\n  listenerCellLeave() {\n    this.onCellLeave = this.onCellLeave.bind(this);\n    this.gamePlay.addCellLeaveListener(this.onCellLeave);\n  }\n  onCellClick(index) {\n    if (_GameState__WEBPACK_IMPORTED_MODULE_10__[\"default\"].from() === 'left' && this.cellChild) this.setSelectedHero(index);\n    if (this.selectedHero) {\n      if (this.cellChild) {\n        if (this.validAttacka(index) && (this.cellChild.className.includes('undead') || this.cellChild.className.includes('daemon') || this.cellChild.className.includes('vampire'))) {\n          const attacker = this.selectedHero.character;\n          const target = this.teamPosition.find(hero => hero.position === index);\n          const attack = Math.max(attacker.attack - target.character.defence, attacker.attack * 0.1);\n          target.character.health -= attack;\n          this.gamePlay.showDamage(index, `- ${attack}`).then(() => {\n            this.reset();\n            if (target.character.health <= 0) {\n              this.teamPosition = this.teamPosition.filter(hero => hero !== target);\n              this.gamePlay.redrawPositions(this.teamPosition);\n              if (!this.teamPosition.some(item => item.character.type === 'undead' || item.character.type === 'daemon' || item.character.type === 'vampire')) {\n                this.nextLevel();\n              }\n            }\n          });\n        }\n      } else if (this.validPosition(index)) {\n        const indexHero = this.teamPosition.indexOf(this.selectedHero);\n        this.teamPosition[indexHero].position = index;\n        this.reset();\n      }\n    }\n  }\n  onCellEnter(index) {\n    const {\n      cells\n    } = this.gamePlay;\n    this.cellChild = cells[index].querySelector('.character');\n    if (this.cellChild) {\n      this.teamPosition.forEach(item => {\n        if (item.position === index) {\n          this.gamePlay.showCellTooltip(`\n          🎖 ${item.character.level} ⚔ ${item.character.attack} 🛡 ${item.character.defence} ❤ ${item.character.health}\n          `, index);\n        }\n      });\n    }\n    if (_GameState__WEBPACK_IMPORTED_MODULE_10__[\"default\"].from() === 'left' && this.selectedHero) {\n      if (!this.cellChild) {\n        if (this.validPosition(index)) {\n          this.gamePlay.selectCell(index, 'green');\n          this.gamePlay.setCursor('pointer');\n        } else {\n          this.gamePlay.setCursor('not-allowed');\n        }\n      } else if (this.cellChild.className.includes('undead') || this.cellChild.className.includes('daemon') || this.cellChild.className.includes('vampire')) {\n        if (this.validAttacka(index)) {\n          this.gamePlay.selectCell(index, 'red');\n          this.gamePlay.setCursor('crosshair');\n        } else {\n          this.gamePlay.setCursor('not-allowed');\n        }\n      } else {\n        this.gamePlay.setCursor('pointer');\n      }\n    }\n  }\n  onCellLeave(index) {\n    if (this.cellChild) {\n      this.gamePlay.hideCellTooltip(index);\n      if (this.cellChild.className.includes('undead') || this.cellChild.className.includes('daemon') || this.cellChild.className.includes('vampire')) {\n        this.gamePlay.deselectCell(index);\n      }\n    } else {\n      this.gamePlay.deselectCell(index);\n    }\n    this.gamePlay.setCursor('auto');\n  }\n  reset() {\n    this.gamePlay.redrawPositions(this.teamPosition);\n    this.selectedHero = null;\n    // this.gamePlay.setCursor('auto');\n    // GameState.from('right');\n    this.gamePlay.cells.forEach((item, index) => {\n      if (item.className.includes('selected')) {\n        this.gamePlay.deselectCell(index);\n      }\n    });\n  }\n\n  // повышение уровня\n  nextLevel() {\n    this.maxLevel += 1;\n    this.init();\n  }\n\n  // определяет дальность перемещения для каждого героя\n  // вызывает requirementPosition с данными героя\n  validPosition(index) {\n    if (this.selectedHero.character.type === 'magician' || this.selectedHero.character.type === 'daemon') {\n      return this.requirementPosition(index, 1);\n    }\n    if (this.selectedHero.character.type === 'bowman' || this.selectedHero.character.type === 'vampire') {\n      return this.requirementPosition(index, 2);\n    }\n    if (this.selectedHero.character.type === 'swordsman' || this.selectedHero.character.type === 'undead') {\n      return this.requirementPosition(index, 4);\n    }\n    return false;\n  }\n\n  // определяет дальность атаки для каждого героя\n  // вызывает requirementAttacka с данными героя\n  validAttacka(index) {\n    if (this.selectedHero.character.type === 'magician' || this.selectedHero.character.type === 'daemon') {\n      return this.requirementAttacka(index, 4);\n    }\n    if (this.selectedHero.character.type === 'bowman' || this.selectedHero.character.type === 'vampire') {\n      return this.requirementAttacka(index, 2);\n    }\n    if (this.selectedHero.character.type === 'swordsman' || this.selectedHero.character.type === 'undead') {\n      return this.requirementAttacka(index, 1);\n    }\n    return false;\n  }\n\n  // условие для проведения перемещения\n  requirementPosition(index, n) {\n    const {\n      position\n    } = this.selectedHero;\n    const lengthBoard = this.gamePlay.boardSize;\n    const x1 = Math.floor(position / lengthBoard);\n    const x2 = Math.floor(index / lengthBoard);\n    const y1 = position % lengthBoard;\n    const y2 = index % lengthBoard;\n    if (x1 === x2 && Math.abs(y1 - y2) <= n || y1 === y2 && Math.abs(x1 - x2) <= n || Math.abs(y1 - y2) === Math.abs(x1 - x2) && Math.abs(x1 - x2) <= n) {\n      return true;\n    }\n    return false;\n  }\n\n  // условие для проведения атаки\n  requirementAttacka(index, n) {\n    const {\n      position\n    } = this.selectedHero;\n    const lengthBoard = this.gamePlay.boardSize;\n    const x1 = Math.floor(position / lengthBoard);\n    const x2 = Math.floor(index / lengthBoard);\n    const y1 = position % lengthBoard;\n    const y2 = index % lengthBoard;\n    if (x1 + n >= x2 && x1 - n <= x2 && y1 + n >= y2 && y1 - n <= y2) {\n      return true;\n    }\n    return false;\n  }\n\n  // ищет героя о индексу\n  searchHero(index) {\n    return this.teamPosition.find(item => item.position === index);\n  }\n\n  // Выбор героя по индексу, сообщение об ошибке\n  setSelectedHero(index) {\n    const {\n      cells\n    } = this.gamePlay;\n    const select = cells.findIndex(item => item.className.includes('selected'));\n    if (select !== -1) this.gamePlay.deselectCell(select);\n    if (this.cellChild.className.includes('bowman') || this.cellChild.className.includes('swordsman') || this.cellChild.className.includes('magician')) {\n      this.gamePlay.selectCell(index);\n      this.selectedHero = this.searchHero(index);\n    } else if (!this.selectedHero) {\n      _GamePlay__WEBPACK_IMPORTED_MODULE_9__[\"default\"].showError('Выберете игрока из своей комманды');\n    }\n  }\n\n  // метод принимает комманду и создает объект класса PositionedCharacter\n  teamPositionedCharacter(team) {\n    const cache = [];\n    const validPosition = character => {\n      const position = this.generatorPosition(character);\n      if (cache.indexOf(position) !== -1) {\n        return validPosition(character);\n      }\n      cache.push(position);\n      return position;\n    };\n    return team.map(item => {\n      const position = validPosition(item.type);\n      return new _PositionedCharacter__WEBPACK_IMPORTED_MODULE_7__[\"default\"](item, position);\n    });\n  }\n\n  // принимает персонажа и генерирует его позицию\n  generatorPosition(character) {\n    const bordEl = Math.floor(Math.random() * this.gamePlay.boardSize * 2);\n    const positionLeft = Math.floor(bordEl / 2) * this.gamePlay.boardSize + bordEl % 2;\n    const positionRight = positionLeft + this.gamePlay.boardSize - 2;\n    return character === 'bowman' || character === 'swordsman' || character === 'magician' ? positionLeft : positionRight;\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/GameController.js?");

/***/ }),

/***/ "./src/js/GamePlay.js":
/*!****************************!*\
  !*** ./src/js/GamePlay.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GamePlay; }\n/* harmony export */ });\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./src/js/utils.js\");\n/* eslint-disable no-alert */\n/* eslint-disable no-restricted-syntax */\n\nclass GamePlay {\n  constructor() {\n    this.boardSize = 8;\n    this.container = null;\n    this.boardEl = null;\n    this.cells = [];\n    this.cellClickListeners = [];\n    this.cellEnterListeners = [];\n    this.cellLeaveListeners = [];\n    this.newGameListeners = [];\n    this.saveGameListeners = [];\n    this.loadGameListeners = [];\n  }\n  bindToDOM(container) {\n    if (!(container instanceof HTMLElement)) {\n      throw new Error('container is not HTMLElement');\n    }\n    this.container = container;\n  }\n\n  /**\r\n   * Draws boardEl with specific theme\r\n   *\r\n   * @param theme\r\n   */\n  drawUi(theme) {\n    this.checkBinding();\n    this.container.innerHTML = `\n      <div class=\"controls\">\n        <button data-id=\"action-restart\" class=\"btn\">New Game</button>\n        <button data-id=\"action-save\" class=\"btn\">Save Game</button>\n        <button data-id=\"action-load\" class=\"btn\">Load Game</button>\n      </div>\n      <div class=\"board-container\">\n        <div data-id=\"board\" class=\"board\"></div>\n      </div>\n    `;\n    this.newGameEl = this.container.querySelector('[data-id=action-restart]');\n    this.saveGameEl = this.container.querySelector('[data-id=action-save]');\n    this.loadGameEl = this.container.querySelector('[data-id=action-load]');\n    this.newGameEl.addEventListener('click', event => this.onNewGameClick(event));\n    this.saveGameEl.addEventListener('click', event => this.onSaveGameClick(event));\n    this.loadGameEl.addEventListener('click', event => this.onLoadGameClick(event));\n    this.boardEl = this.container.querySelector('[data-id=board]');\n    this.boardEl.classList.add(theme);\n    for (let i = 0; i < this.boardSize ** 2; i += 1) {\n      const cellEl = document.createElement('div');\n      cellEl.classList.add('cell', 'map-tile', `map-tile-${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.calcTileType)(i, this.boardSize)}`);\n      cellEl.addEventListener('mouseenter', event => this.onCellEnter(event));\n      cellEl.addEventListener('mouseleave', event => this.onCellLeave(event));\n      cellEl.addEventListener('click', event => this.onCellClick(event));\n      this.boardEl.appendChild(cellEl);\n    }\n    this.cells = Array.from(this.boardEl.children);\n  }\n\n  /**\r\n   * Draws positions (with chars) on boardEl\r\n   *\r\n   * @param positions array of PositionedCharacter objects\r\n   */\n  redrawPositions(positions) {\n    for (const cell of this.cells) {\n      cell.innerHTML = '';\n    }\n    for (const position of positions) {\n      const cellEl = this.boardEl.children[position.position];\n      const charEl = document.createElement('div');\n      charEl.classList.add('character', position.character.type);\n      const healthEl = document.createElement('div');\n      healthEl.classList.add('health-level');\n      const healthIndicatorEl = document.createElement('div');\n      healthIndicatorEl.classList.add('health-level-indicator', `health-level-indicator-${(0,_utils__WEBPACK_IMPORTED_MODULE_0__.calcHealthLevel)(position.character.health)}`);\n      healthIndicatorEl.style.width = `${position.character.health}%`;\n      healthEl.appendChild(healthIndicatorEl);\n      charEl.appendChild(healthEl);\n      cellEl.appendChild(charEl);\n    }\n  }\n\n  /**\r\n   * Add listener to mouse enter for cell\r\n   *\r\n   * @param callback\r\n   */\n  addCellEnterListener(callback) {\n    this.cellEnterListeners.push(callback);\n  }\n\n  /**\r\n   * Add listener to mouse leave for cell\r\n   *\r\n   * @param callback\r\n   */\n  addCellLeaveListener(callback) {\n    this.cellLeaveListeners.push(callback);\n  }\n\n  /**\r\n   * Add listener to mouse click for cell\r\n   *\r\n   * @param callback\r\n   */\n  addCellClickListener(callback) {\n    this.cellClickListeners.push(callback);\n  }\n\n  /**\r\n   * Add listener to \"New Game\" button click\r\n   *\r\n   * @param callback\r\n   */\n  addNewGameListener(callback) {\n    this.newGameListeners.push(callback);\n  }\n\n  /**\r\n   * Add listener to \"Save Game\" button click\r\n   *\r\n   * @param callback\r\n   */\n  addSaveGameListener(callback) {\n    this.saveGameListeners.push(callback);\n  }\n\n  /**\r\n   * Add listener to \"Load Game\" button click\r\n   *\r\n   * @param callback\r\n   */\n  addLoadGameListener(callback) {\n    this.loadGameListeners.push(callback);\n  }\n  onCellEnter(event) {\n    event.preventDefault();\n    const index = this.cells.indexOf(event.currentTarget);\n    this.cellEnterListeners.forEach(o => o.call(null, index));\n  }\n  onCellLeave(event) {\n    event.preventDefault();\n    const index = this.cells.indexOf(event.currentTarget);\n    this.cellLeaveListeners.forEach(o => o.call(null, index));\n  }\n  onCellClick(event) {\n    const index = this.cells.indexOf(event.currentTarget);\n    this.cellClickListeners.forEach(o => o.call(null, index));\n  }\n  onNewGameClick(event) {\n    event.preventDefault();\n    this.newGameListeners.forEach(o => o.call(null));\n  }\n  onSaveGameClick(event) {\n    event.preventDefault();\n    this.saveGameListeners.forEach(o => o.call(null));\n  }\n  onLoadGameClick(event) {\n    event.preventDefault();\n    this.loadGameListeners.forEach(o => o.call(null));\n  }\n  static showError(message) {\n    alert(message);\n  }\n  static showMessage(message) {\n    alert(message);\n  }\n  selectCell(index) {\n    let color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yellow';\n    this.deselectCell(index);\n    this.cells[index].classList.add('selected', `selected-${color}`);\n  }\n  deselectCell(index) {\n    const cell = this.cells[index];\n    cell.classList.remove(...Array.from(cell.classList).filter(o => o.startsWith('selected')));\n  }\n  showCellTooltip(message, index) {\n    this.cells[index].title = message;\n  }\n  hideCellTooltip(index) {\n    this.cells[index].title = '';\n  }\n  showDamage(index, damage) {\n    return new Promise(resolve => {\n      const cell = this.cells[index];\n      const damageEl = document.createElement('span');\n      damageEl.textContent = damage;\n      damageEl.classList.add('damage');\n      cell.appendChild(damageEl);\n      damageEl.addEventListener('animationend', () => {\n        cell.removeChild(damageEl);\n        resolve();\n      });\n    });\n  }\n  setCursor(cursor) {\n    this.boardEl.style.cursor = cursor;\n  }\n  checkBinding() {\n    if (this.container === null) {\n      throw new Error('GamePlay not bind to DOM');\n    }\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/GamePlay.js?");

/***/ }),

/***/ "./src/js/GameState.js":
/*!*****************************!*\
  !*** ./src/js/GameState.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GameState; }\n/* harmony export */ });\nclass GameState {\n  // constructor() {\n  //   this.state = 'left';\n  //   this.from = this.from.bind(this);\n  // }\n\n  static from(value) {\n    if (value) this.state = value;\n    return this.state;\n    // TODO: create object\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/GameState.js?");

/***/ }),

/***/ "./src/js/GameStateService.js":
/*!************************************!*\
  !*** ./src/js/GameStateService.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ GameStateService; }\n/* harmony export */ });\nclass GameStateService {\n  constructor(storage) {\n    this.storage = storage;\n  }\n  save(state) {\n    this.storage.setItem('state', JSON.stringify(state));\n  }\n  load() {\n    try {\n      return JSON.parse(this.storage.getItem('state'));\n    } catch (e) {\n      throw new Error('Invalid state');\n    }\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/GameStateService.js?");

/***/ }),

/***/ "./src/js/PositionedCharacter.js":
/*!***************************************!*\
  !*** ./src/js/PositionedCharacter.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ PositionedCharacter; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Character */ \"./src/js/Character.js\");\n\nclass PositionedCharacter {\n  constructor(character, position) {\n    if (!(character instanceof _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\n      throw new Error('character must be instance of Character or its children');\n    }\n    if (typeof position !== 'number') {\n      throw new Error('position must be a number');\n    }\n    this.character = character;\n    this.position = position;\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/PositionedCharacter.js?");

/***/ }),

/***/ "./src/js/Team.js":
/*!************************!*\
  !*** ./src/js/Team.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Team; }\n/* harmony export */ });\n/**\r\n * Класс, представляющий персонажей команды\r\n *\r\n * @todo Самостоятельно продумайте хранение персонажей в классе\r\n * Например\r\n * @example\r\n * ```js\r\n * const characters = [new Swordsman(2), new Bowman(1)]\r\n * const team = new Team(characters);\r\n *\r\n * team.characters // [swordsman, bowman]\r\n * ```\r\n * */\nclass Team {\n  constructor(characters) {\n    this.characters = characters;\n  }\n  // TODO: write your logic here\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/Team.js?");

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _GamePlay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GamePlay */ \"./src/js/GamePlay.js\");\n/* harmony import */ var _GameController__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./GameController */ \"./src/js/GameController.js\");\n/* harmony import */ var _GameStateService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./GameStateService */ \"./src/js/GameStateService.js\");\n/**\r\n * Entry point of app: don't change this\r\n */\n\n\n\nconst gamePlay = new _GamePlay__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\ngamePlay.bindToDOM(document.querySelector('#game-container'));\nconst stateService = new _GameStateService__WEBPACK_IMPORTED_MODULE_2__[\"default\"](localStorage);\nconst gameCtrl = new _GameController__WEBPACK_IMPORTED_MODULE_1__[\"default\"](gamePlay, stateService);\ngameCtrl.init();\n\n// don't write your code here\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/app.js?");

/***/ }),

/***/ "./src/js/characters/Bowman.js":
/*!*************************************!*\
  !*** ./src/js/characters/Bowman.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Bowman; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Bowman extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 25, 25, 'bowman');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Bowman.js?");

/***/ }),

/***/ "./src/js/characters/Daemon.js":
/*!*************************************!*\
  !*** ./src/js/characters/Daemon.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Daemon; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Daemon extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 10, 10, 'daemon');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Daemon.js?");

/***/ }),

/***/ "./src/js/characters/Magician.js":
/*!***************************************!*\
  !*** ./src/js/characters/Magician.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Magician; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Magician extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 10, 40, 'magician');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Magician.js?");

/***/ }),

/***/ "./src/js/characters/Swordsman.js":
/*!****************************************!*\
  !*** ./src/js/characters/Swordsman.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Swordsman; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Swordsman extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 40, 10, 'swordsman');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Swordsman.js?");

/***/ }),

/***/ "./src/js/characters/Undead.js":
/*!*************************************!*\
  !*** ./src/js/characters/Undead.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Undead; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Undead extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 40, 10, 'undead');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Undead.js?");

/***/ }),

/***/ "./src/js/characters/Vampire.js":
/*!**************************************!*\
  !*** ./src/js/characters/Vampire.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Vampire; }\n/* harmony export */ });\n/* harmony import */ var _Character__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Character */ \"./src/js/Character.js\");\n\nclass Vampire extends _Character__WEBPACK_IMPORTED_MODULE_0__[\"default\"] {\n  constructor(level) {\n    super(level, 25, 25, 'vampire');\n  }\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/characters/Vampire.js?");

/***/ }),

/***/ "./src/js/generators.js":
/*!******************************!*\
  !*** ./src/js/generators.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"characterGenerator\": function() { return /* binding */ characterGenerator; },\n/* harmony export */   \"generateTeam\": function() { return /* binding */ generateTeam; }\n/* harmony export */ });\n/* harmony import */ var _Team__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Team */ \"./src/js/Team.js\");\n/* eslint-disable max-len */\n/* eslint-disable new-cap */\n\n\n/**\r\n * Формирует экземпляр персонажа из массива allowedTypes со\r\n * случайным уровнем от 1 до maxLevel\r\n *\r\n * @param allowedTypes массив классов\r\n * @param maxLevel максимальный возможный уровень персонажа\r\n * @returns генератор, который при каждом вызове\r\n * возвращает новый экземпляр класса персонажа\r\n *\r\n */\nfunction* characterGenerator(allowedTypes, maxLevel) {\n  const random = () => {\n    const type = Math.floor(Math.random() * allowedTypes.length);\n    const level = Math.ceil(Math.random() * maxLevel);\n    return new allowedTypes[type](level);\n  };\n  while (true) yield random();\n  // TODO: write logic here\n}\n\n/**\r\n * Формирует массив персонажей на основе characterGenerator\r\n * @param allowedTypes массив классов\r\n * @param maxLevel максимальный возможный уровень персонажа\r\n * @param characterCount количество персонажей, которое нужно сформировать\r\n * @returns экземпляр Team, хранящий экземпляры персонажей. Количество персонажей в команде - characterCount\r\n * */\nfunction generateTeam(allowedTypes, maxLevel, characterCount) {\n  const playerGenerator = characterGenerator(allowedTypes, maxLevel);\n  const playerTypes = [];\n  for (let i = 1; i <= characterCount; i += 1) {\n    const player = playerGenerator.next().value;\n    playerTypes.push(player);\n  }\n  return new _Team__WEBPACK_IMPORTED_MODULE_0__[\"default\"](playerTypes);\n  // TODO: write logic here\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/generators.js?");

/***/ }),

/***/ "./src/js/themes.js":
/*!**************************!*\
  !*** ./src/js/themes.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\nconst themes = {\n  prairie: 'prairie',\n  desert: 'desert',\n  arctic: 'arctic',\n  mountain: 'mountain'\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (themes);\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/themes.js?");

/***/ }),

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calcHealthLevel\": function() { return /* binding */ calcHealthLevel; },\n/* harmony export */   \"calcTileType\": function() { return /* binding */ calcTileType; }\n/* harmony export */ });\n/**\r\n * @todo\r\n * @param index - индекс поля\r\n * @param boardSize - размер квадратного поля (в длину или ширину)\r\n * @returns строка - тип ячейки на поле:\r\n *\r\n * top-left\r\n * top-right\r\n * top\r\n * bottom-left\r\n * bottom-right\r\n * bottom\r\n * right\r\n * left\r\n * center\r\n *\r\n * @example\r\n * ```js\r\n * calcTileType(0, 8); // 'top-left'\r\n * calcTileType(1, 8); // 'top'\r\n * calcTileType(63, 8); // 'bottom-right'\r\n * calcTileType(7, 7); // 'left'\r\n * ```\r\n * */\nfunction calcTileType(index, boardSize) {\n  // TODO: ваш код будет тут\n  if (index === boardSize - 1) return 'top-right';\n  if (index === 0) return 'top-left';\n  if (index < boardSize) return 'top';\n  if (index === boardSize ** 2 - boardSize) return 'bottom-left';\n  if (index === boardSize ** 2 - 1) return 'bottom-right';\n  if (index > boardSize ** 2 - boardSize && index < boardSize ** 2 - 1) return 'bottom';\n  if (index % boardSize === 0) return 'left';\n  if (index % boardSize === 7) return 'right';\n  return 'center';\n}\nfunction calcHealthLevel(health) {\n  if (health < 15) {\n    return 'critical';\n  }\n  if (health < 50) {\n    return 'normal';\n  }\n  return 'high';\n}\n\n//# sourceURL=webpack://js-advanced-diploma/./src/js/utils.js?");

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://js-advanced-diploma/./src/css/style.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
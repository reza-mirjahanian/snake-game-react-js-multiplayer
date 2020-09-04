const _ = require('lodash');

const DIRECTIONS = ['R', 'L', 'D', 'U'];

module.exports = class Snake {
  static DIRECTIONS = {
    UP: 'U',
    RIGHT: 'R',
    DOWN: 'D',
    LEFT: 'L',
  }
  constructor(name = 'snake1', body = [{
    x: 1,
    y: 1
  }], color = 'green',id='') {
    this._id = id;
    this._live = true;
    this._hasFood = false;
    this._name = name;
    this._body = body;
    this._color = color;
    this._direction = Snake.DIRECTIONS.RIGHT;
  }

  get name() {
    return this._name;
  }
  get id() {
    return this._id;
  }

  get body() {
    return this._body;
  }

  get color() {
    return this._color;
  }

  get direction() {
    return this._direction;
  }

  set direction(direction) {
    if (DIRECTIONS.includes(direction)) {
      //Preventing head move back
      if (this._direction === Snake.DIRECTIONS.RIGHT && direction === Snake.DIRECTIONS.LEFT) {
        return;
      }
      if (this._direction === Snake.DIRECTIONS.LEFT && direction === Snake.DIRECTIONS.RIGHT) {
        return;
      }
      if (this._direction === Snake.DIRECTIONS.UP && direction === Snake.DIRECTIONS.DOWN) {
        return;
      }
      if (this._direction === Snake.DIRECTIONS.DOWN && direction === Snake.DIRECTIONS.UP) {
        return;
      }

      this._direction = direction;
    }
  }

  getHead() {
    return _.last(this.body);
  }
  kill() {
    this._live = false;
  }

  isDeath() {
    return !this._live;
  }

  eat() {
    this._hasFood = true;
  }

  //@todo check self collide, death
  move() {
    if (this.isDeath()) {
      return;
    }
    const snakeHead = this.getHead();
    if (!this._hasFood) {
      this._body.shift();
    } else {
      this._hasFood = false;
    }

    if (this._direction === Snake.DIRECTIONS.RIGHT) {
      this._body.push({
        x: snakeHead.x + 1,
        y: snakeHead.y
      })
    }
    if (this._direction === Snake.DIRECTIONS.LEFT) {
      this._body.push({
        x: snakeHead.x - 1,
        y: snakeHead.y
      })
    }

    if (this._direction === Snake.DIRECTIONS.DOWN) {
      this._body.push({
        x: snakeHead.x,
        y: snakeHead.y + 1
      })
    }
    if (this._direction === Snake.DIRECTIONS.UP) {
      this._body.push({
        x: snakeHead.x,
        y: snakeHead.y - 1
      })
    }
  }


}
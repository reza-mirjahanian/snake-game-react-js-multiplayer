const
  _ = require('lodash'),
  Snake = require('./snake.js'),
  colorList = require('./util/colors.json'), //@todo create color generator
  constants = require('./constants');

const FOOD_COLOR = constants.FOOD_COLOR;
const COL_SIZE = constants.COL_SIZE;
const emptyBoard = [];

class GameEngine {

  static gameBoard = [];
  static snakesList = [];
  static foodList = [];

  static init() {
    //Create clean board
    for (let y = 1; y <= COL_SIZE; y++) {
      for (let x = 1; x <= COL_SIZE; x++) {
        emptyBoard.push({
          id: x + ((y - 1) * COL_SIZE),
          bgColor: 'white',
          x,
          y
        });
      }
    }
    this.gameBoard = _.cloneDeep(emptyBoard);
  }


  static redraw() {

    this.snakesList.forEach(snake => {
      if (this.wallCollisionDetection(snake)) {
        snake.kill();
      }
      const eatenFood = this.foodCollisionDetection(snake);
      if (eatenFood) {
        snake.eat();
        this.removeFood(eatenFood);
      }
      snake.move();
    });
    this.isEnoughFood();

    return this.drawOnBoard(_.cloneDeep(emptyBoard));
  }

  static _isCellEmpty(cell) {
    return _.get(cell, 'bgColor', '') === 'white';
  }

  static isEnoughFood() {
    if (this.snakesList.length === this.foodList.length) return;
    if (this.snakesList.length < this.foodList.length) {
      this.foodList.pop();
      return;
    }

    const requiredFood = this.snakesList.length - this.foodList.length;
    const occupiedCells = [];
    this.snakesList.forEach(snake => {
      occupiedCells.push(...snake.body)
    });
    occupiedCells.push(...this.foodList);

    // @todo. better way is find empty cells
    const newFoods = [];
    while (true) {
      if (requiredFood <= newFoods.length) break;

      const x = _.random(1, COL_SIZE);
      const y = _.random(1, COL_SIZE);
      if (!_.find(occupiedCells, {
          x,
          y
        }) && !_.find(newFoods, {
          x,
          y
        })) {
        newFoods.push({
          x,
          y
        })
      }
    }
    this.foodList.push(...newFoods);

  };

  static removeFood(eatenFood) {
    _.remove(this.foodList, {
      x: eatenFood.x,
      y: eatenFood.y
    });
  };



  static updateDirection(snakeId, direction) {
    const index = _.findIndex(this.snakesList, {
      id: snakeId
    });
    if (index >= 0) {
      this.snakesList[index].direction = direction
    }
  };

  static cleanUpSnakes() {
    const deathSnakes = [];
    this.snakesList = this.snakesList.filter((snake) => {
      if (snake.isDeath()) {
        deathSnakes.push(snake)
        return false
      } else {
        return true
      }
    });

    return deathSnakes;
  };

  static wallCollisionDetection(movingSnake) {

    if (movingSnake.direction === Snake.DIRECTIONS.RIGHT && movingSnake.getHead().x === COL_SIZE) {
      return true;
    }
    if (movingSnake.direction === Snake.DIRECTIONS.LEFT && movingSnake.getHead().x === 1) {
      return true;
    }
    if (movingSnake.direction === Snake.DIRECTIONS.UP && movingSnake.getHead().y === 1) {
      return true;
    }
    if (movingSnake.direction === Snake.DIRECTIONS.DOWN && movingSnake.getHead().y === COL_SIZE) {
      return true;
    }
    return false;
  }

  static foodCollisionDetection(movingSnake) {
    const {
      x,
      y
    } = movingSnake.getHead();
    for (const food of this.foodList) {
      if (food.x === x && food.y === y) {
        return food;
      }
    }
    return false;
  }

  /**
   * @param {[]} board
   */
  static drawOnBoard(board = []) {

    this.foodList.forEach(food => {
      const index = food.x + ((food.y - 1) * COL_SIZE);
      board[index - 1].bgColor = FOOD_COLOR
    });

    this.snakesList.forEach(snake => {
      if (snake.isDeath()) return;
      snake.body.forEach(bodyLocation => {
        const index = bodyLocation.x + ((bodyLocation.y - 1) * COL_SIZE);
        board[index - 1].bgColor = snake.color
      });
    });


    return board;


  }

  static createNewSnake(snakeId) {
    const cells = this.gameBoard;
    const snakeCount = this.snakesList.length;
    const color = colorList[(snakeCount) % colorList.length];

    const playerName = 'player-' + snakeCount + 1;

    //Find an empty place for the new snake.
    //It's not a smart method. We should consider vertical snake and other directions.
    let headX = 0;
    let headY = 0;
    while (true) {
      headX = _.random(1, COL_SIZE - 1);
      headY = _.random(1, COL_SIZE);
      const tailX = headX - 1;
      const nextX = headX + 1;
      const headIndex = headX + ((headY - 1) * COL_SIZE);
      const tailIndex = tailX + ((headY - 1) * COL_SIZE);
      const nextIndex = nextX + ((headY - 1) * COL_SIZE);
      if (this._isCellEmpty(cells[headIndex]) && this._isCellEmpty(cells[tailIndex]) && this._isCellEmpty(cells[nextIndex])) {
        break;
      }

    }
    const snakeBody = [{
      x: headX - 1,
      y: headY
    }, {
      x: headX,
      y: headY
    }];

    const newSnake = new Snake(playerName, snakeBody, color, snakeId);
    this.snakesList.push(newSnake);
  };


}

module.exports = GameEngine;
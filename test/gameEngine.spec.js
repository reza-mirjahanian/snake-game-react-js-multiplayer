'use strict';
const chai = require('chai');
chai.should();

const gameEngine = require('../server/gameEngine');
const constants = require('../server/constants');
const Snake = require('../server/snake');
const _ = require('lodash');



describe('server/GameEngine', function() {

  it('should init function work correctly', () => {
    gameEngine.gameBoard.length.should.to.equal(0);
    gameEngine.init();
    gameEngine.gameBoard.length.should.to.equal(constants.COL_SIZE * constants.COL_SIZE);

  });

  it('should isEnoughFood function work correctly', () => {
    gameEngine.foodList.length.should.to.equal(0);
    gameEngine.createNewSnake('123');
    gameEngine.isEnoughFood();
    gameEngine.foodList.length.should.to.equal(1);
    gameEngine.isEnoughFood();
    gameEngine.foodList.length.should.to.equal(1);
  });

  it('should wallCollisionDetection function work correctly', () => {
    const snake1 = new Snake('name-1', [{
      x: 1,
      y: 2
    }], 'blue', '123');
    gameEngine.init();
    snake1.direction = Snake.DIRECTIONS.UP;
    snake1.move();
    console.log(snake1);
    const collision = gameEngine.wallCollisionDetection(snake1);
    collision.should.to.equal(true);
  });

  it('should updateDirection function work correctly', () => {
    const snakeId = '123';
    const snake1 = new Snake('name-1', [{
      x: 0,
      y: 0
    }], 'blue', snakeId);
    snake1.direction = Snake.DIRECTIONS.LEFT;
    gameEngine.snakesList.push(snake1);
    gameEngine.updateDirection(snakeId, Snake.DIRECTIONS.DOWN);
    const updateSnake = _.find(gameEngine.snakesList, {
      id: snakeId
    });
    updateSnake.direction.should.to.equal(Snake.DIRECTIONS.DOWN);
  });





});
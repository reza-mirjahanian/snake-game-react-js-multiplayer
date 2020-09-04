'use strict';
const chai = require('chai');
chai.should();

const Snake = require('../server/snake');



describe('server/snake', function() {

  it('should Snake class work OK', () => {
    const snakeBody = [{
      x: 5,
      y: 5
    }, {
      x: 6,
      y: 5
    }];
    const snakeName = 'player-3';
    const snakeColor = 'blue';
    const snakeId = '1234';
    const newSnake = new Snake(snakeName, snakeBody, snakeColor, snakeId);
    newSnake.id.should.to.equal(snakeId);
    newSnake.color.should.to.equal(snakeColor);
    newSnake.name.should.to.equal(snakeName);
    newSnake.body.length.should.to.equal(snakeBody.length);
    newSnake.getHead().should.to.deep.equal({
      x: 6,
      y: 5
    });
    newSnake.direction = Snake.DIRECTIONS.DOWN;
    newSnake.direction.should.to.equal(Snake.DIRECTIONS.DOWN);

    newSnake.direction = Snake.DIRECTIONS.LEFT;
    newSnake.direction.should.to.equal(Snake.DIRECTIONS.LEFT);

    newSnake.direction = 'wrong';
    newSnake.direction.should.to.equal(Snake.DIRECTIONS.LEFT);
  });

  it('should Snake death function correctly', () => {
    const snakeBody = [{
      x: 5,
      y: 5
    }, {
      x: 6,
      y: 5
    }];
    const snakeName = 'player-3';
    const snakeColor = 'blue';
    const snakeId = '1234';
    const newSnake = new Snake(snakeName, snakeBody, snakeColor, snakeId);
    newSnake.isDeath().should.to.equal(false);
    newSnake.kill();
    newSnake.isDeath().should.to.equal(true);
  });

  it('should Snake move function correctly', () => {
    const snakeBody = [{
      x: 5,
      y: 5
    }, {
      x: 6,
      y: 5
    }];
    const snakeName = 'player-3';
    const snakeColor = 'blue';
    const snakeId = '1234';
    const newSnake = new Snake(snakeName, snakeBody, snakeColor, snakeId);
    newSnake.direction = Snake.DIRECTIONS.RIGHT;
    newSnake.getHead().should.to.deep.equal({
      x: 6,
      y: 5
    });
    newSnake.move();
    newSnake.getHead().should.to.deep.equal({
      x: 7,
      y: 5
    });

    newSnake.eat();
    newSnake.body.length.should.to.equal(2);
    newSnake.move();
    newSnake.body.length.should.to.equal(3);
  });


});
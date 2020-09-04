const io = require('socket.io')(),
  logger = require('./util/logger'),
  GameEngine = require('./gameEngine.js'),
  _ = require('lodash'),
  constants = require('./constants');

const GAME_SPEED_MS = constants.GAME_SPEED_MS;

let socketClients = [];

class GameServer {

  static start() {
    io.listen(constants.SERVER_SOCKET_PORT);
    io.on('connection', (socket) => {
      logger.log('a user connected');

      socket.on('disconnect', () => {
        logger.log('user disconnected');
      });

      socket.on('keydown', (data) => {
        const {
          direction,
          id
        } = data;
        GameEngine.updateDirection(id, direction);
      });

      this._userConnected(socket);
    });

    GameEngine.init();

    setInterval(() => {
      const deathSnakes = GameEngine.cleanUpSnakes();
      if (deathSnakes.length > 0) {
        this.cleanUpClients(deathSnakes);
      }
      const newBoard = GameEngine.redraw();
      io.emit('boardUpdated', newBoard);

    }, GAME_SPEED_MS);
    //todo check collision with other player
  }

  static _userConnected(socket) {
    socketClients.push(socket);
    GameEngine.createNewSnake(socket.id);
  };

  static cleanUpClients(deathSnakes = []) {
    try {
      socketClients = socketClients.filter((socket) => {
        const deathSnake = _.find(deathSnakes, (snake) => {
          return snake.id === socket.id;
        });
        if (deathSnake) {
          socket.disconnect();
          return false
        } else {
          return true
        }
      });
    } catch (e) {
      logger.error(e)
    }

  };
}

module.exports = GameServer;
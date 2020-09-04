'use strict';
module.exports = {
  SERVER_SOCKET_PORT: Number(process.env.SERVER_SOCKET_PORT) || 5000,
  FOOD_COLOR: process.env.FOOD_COLOR || 'red',
  COL_SIZE: Number(process.env.COL_SIZE) || 25,
  GAME_SPEED_MS: Number(process.env.GAME_SPEED_MS) || 200, //millisecond
};
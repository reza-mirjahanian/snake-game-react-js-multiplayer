'use strict';
const
  logger = require('./util/logger'),
  gameServer = require('./gameServer');


(() => {
  try {
    gameServer.start();
    logger.log('Service started');

  } catch (e) {
    logger.error('error on initiating server', {
      err: e
    });
  }

})();

process
  .on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at Promise', {
      reason,
      p
    });
  })
  .on('uncaughtException', err => {
    logger.error('Uncaught Exception thrown', {
      err
    });
  });



async function graceFullShutdown() {
  try {
    logger.log('Service shutting down ...');
    await new Promise((resolve) => setTimeout(resolve, 1000));
    process.exit(0);
  } catch (e) {
    logger.error('bad error in exiting Service', {
      err: e
    });
    process.exit(0);
  }
}

process.on('SIGTERM', graceFullShutdown);
process.on('SIGINT', graceFullShutdown);
process.on('SIGUSR1', graceFullShutdown);
import config from './config/index.js';
import express from 'express';
import loaders from './loaders/index.js';
import Logger from './loaders/logger.js';
import socket from './socket.js'

async function startServer() {
  const app = express();

  await loaders(app);

  const server = app.listen(config.port, () => {
    Logger.info(`server listening on port : ${config.port}`);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

  socket(server);
}

startServer();

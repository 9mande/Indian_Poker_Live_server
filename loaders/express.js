import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import methodOverride from 'method-override'
import routes from '../api/index.js';
import config from '../config/index.js';

export default (app) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });
  app.enable('trust proxy');
  app.use(cors());
  app.use(methodOverride());
  app.use(express.json());
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({ extended: false }));
  
  console.log("this : " + config);
  app.use(config.api.prefix, routes());
  //TODO
  
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  app.use((err, req, res, next) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === 'UnauthorizedError') {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });

  return app;
}
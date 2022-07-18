import { Router } from 'express';
import middlewares from '../middlewares/index.js';
const router = Router();

export default (app) => {
  app.use('/users', router);

  router.get('/me', (req, res) => {
    console.log('asdf');
    return res.json({ user: 'TODO' }).status(200);
  });
  
};
import { Router } from 'express';
import UserService from '../../services/user.js';
import middlewares from '../middlewares/index.js';
// 클라이언트 요청 검증 라이브러리 celebrate
import { celebrate, Joi } from 'celebrate';
import Logger from '../../loaders/logger.js';

const router = Router();

export default (app) => {
  app.use('/auth', router);

  router.get('/', (req, res, next)=>{
    res.status(200).send('to signup, use /signup\nto signin, use /signin');
  });

  router.post( 
    '/signup',
    celebrate({
      body: Joi.object({
        user: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      Logger.debug('Calling Sign-Up endpoint with body: %o', req.body );

      try {
        const obj = JSON.parse(req.body.user);
        
        console.log(obj);
        await UserService.SignUp(obj);

        return res
        .status(200)
        .json({ success: true, result: "카카오 저장", message: "hello" });
      } catch (e) {
        Logger.error('🔥 error: %o', e);
        return res.status(201).send('no id');
      }
    },
  );

  router.post(
    '/signin',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {      
      Logger.debug('Calling Sign-In endpoint with body: %o', req.body);

      try {
        const result = await UserService.SignIn(req.body);
        console.log(result);
        return res
        .status(200)
        .json(result);
      } catch (e) {
        Logger.error('🔥 error: %o',  e );
      }
    },
  );

  
  router.post('/logout', (req, res, next) => {
    Logger.debug('Calling Sign-Out endpoint with body: %o', req.body);
    try {
    //   UserService.Logout(req.user)
      return res.status(200).end();
    } catch (e) {
      Logger.error('🔥 error %o', e);
      return next(e);
    }
  });
};

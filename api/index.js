import { Router } from 'express';
import auth from './routes/auth.js';
import user from './routes/user.js';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	auth(app);
	user(app);
	
	return app;
}
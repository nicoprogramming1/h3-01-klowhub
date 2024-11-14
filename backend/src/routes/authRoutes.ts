import { Router } from 'express';
import { register, login } from '../controllers/authController';

const routerAuth = Router();

routerAuth.post('/register', register );
routerAuth.post('/login', login);

export default routerAuth;

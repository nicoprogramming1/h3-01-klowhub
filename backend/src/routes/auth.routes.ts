import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { validateRegister, validateLogin, validateLogout, handleValidationErrors } from '../utils/middlewares';
import passport from 'passport';

const authRouter = Router();
const authenticate = passport.authenticate('jwt', { session: false })

// Definir las rutas
authRouter.post('/register', validateRegister, handleValidationErrors, register);
authRouter.post('/login', validateLogin, handleValidationErrors, login);
authRouter.post('/logout', authenticate, validateLogout, handleValidationErrors, logout);

export default authRouter;
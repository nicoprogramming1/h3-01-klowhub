import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, validateLogin, validateLogout, handleValidationErrors } from '../utils/middlewares';
import passport from 'passport';

const authRouter = Router();

// Definir las rutas
authRouter.post('/register', validateRegister, handleValidationErrors, register);
authRouter.post('/login', validateLogin, handleValidationErrors, login);
authRouter.post('/logout', passport.authenticate('jwt', { session: false }), validateLogout, handleValidationErrors, logout);

export default authRouter;
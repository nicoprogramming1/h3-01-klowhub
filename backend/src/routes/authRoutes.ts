import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, validateLogin, validateLogout, handleValidationErrors } from '../utils/middlewares';

const authRouter = Router();

// Definir las rutas
authRouter.post('/register', validateRegister, handleValidationErrors, register);
authRouter.post('/login', validateLogin, handleValidationErrors, login);
authRouter.delete('/logout', validateLogout, handleValidationErrors, logout);

export default authRouter;
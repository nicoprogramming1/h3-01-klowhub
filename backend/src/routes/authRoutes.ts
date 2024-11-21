import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, validateLogin, validateLogout, handleValidationErrors } from '../utils/middlewares';

const routerAuth = Router();

// Definir las rutas
routerAuth.post('/register', validateRegister, handleValidationErrors, register);
routerAuth.post('/login', validateLogin, handleValidationErrors, login);
routerAuth.delete('/logout', validateLogout, handleValidationErrors, logout);

export default routerAuth;

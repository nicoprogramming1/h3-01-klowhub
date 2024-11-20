import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares';

const routerAuth = Router();

// Definir las rutas
routerAuth.post('/register', validateRegister, handleValidationErrors, register);
routerAuth.post('/login', validateLogin, handleValidationErrors, login);
routerAuth.delete('/logout', logout);

export default routerAuth;

import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { validateRegister, handleValidationErrors } from '../middlewares/validateMdw';

const routerAuth = Router();

// Definir las rutas
routerAuth.post('/register', validateRegister, handleValidationErrors, register);
routerAuth.post('/login', login);
routerAuth.delete('/logout', logout);

export default routerAuth;

import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';

const routerAuth = Router();

// Definir las rutas
routerAuth.post('/register', register);
routerAuth.post('/login', login);
routerAuth.delete("logout", logout);

export default routerAuth;

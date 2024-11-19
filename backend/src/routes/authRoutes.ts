import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';

const authRouter = Router();

// Definir las rutas
authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.delete("logout", logout);

export default authRouter;

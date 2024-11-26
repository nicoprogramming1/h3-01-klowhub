import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import courseRoutes from './course.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/user', userRoutes);
router.use('/course', courseRoutes);

export default router;

import { Router } from 'express';
import { createCourse } from '../controllers/courseController';
import {
  validateCourseRegistration,
  handleValidationErrors,
} from '../utils/middlewares';
import passport from 'passport';

const courseRouter = Router();
const authenticate = passport.authenticate('jwt', { session: false });

courseRouter
  .route('/')
  .post(
    authenticate,
    validateCourseRegistration,
    handleValidationErrors,
    createCourse
  );

courseRouter.route('/:id').get();

export default courseRouter;

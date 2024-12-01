import { Router } from 'express';
import { createCourse, getOneCourse } from '../controllers/course.controller';
import {
  validateCourseRegistration,
  handleValidationErrors,
  validateFetchCourse,
} from '../middlewares';
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

courseRouter
  .route('/:id')
  .get(validateFetchCourse, handleValidationErrors, getOneCourse);

export default courseRouter;

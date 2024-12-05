import { Router } from 'express';
import { createCourse, getOneCourse, listCourses, buyCourse, deleteCourse } from '../controllers/course.controller';
import {
  validateCourseRegistration,
  handleValidationErrors,
  validateFetchCourse,
  uploadImageMdw,
  idByParameterValidator
} from '../middlewares';
import { imageController } from "../controllers";
import passport from 'passport';

const courseRouter = Router();
const authenticate = passport.authenticate('jwt', { session: false });
const multerMdw = uploadImageMdw.single('imageProfile')    // mdw de carga de imagen

courseRouter.route('/imageCourse/:id')
  .post(authenticate, idByParameterValidator, multerMdw, handleValidationErrors, imageController.imageRegisterCourse)

courseRouter.route('/imageLesson/:id')
  .post(authenticate, idByParameterValidator, multerMdw, handleValidationErrors, imageController.imageRegisterLesson)

courseRouter
  .route('/:id')
  .get(idByParameterValidator, validateFetchCourse, handleValidationErrors, getOneCourse)
  .post(authenticate, validateCourseRegistration, handleValidationErrors, createCourse)

courseRouter
  .route('/buy/:id')
  .post(authenticate, handleValidationErrors, buyCourse)

courseRouter
  .route('/delete/:id')
  .delete(authenticate, handleValidationErrors, deleteCourse)

courseRouter
  .route('/')
  .get(handleValidationErrors, listCourses)

export default courseRouter;

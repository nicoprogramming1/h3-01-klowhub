import { Router } from 'express';
import { createCourse, getOneCourse } from '../controllers/course.controller';
import {
  validateCourseRegistration,
  handleValidationErrors,
  validateFetchCourse,
  uploadImageMdw,
  idByParameterValidator
} from '../middlewares';
import { imageProController } from "../controllers";
import passport from 'passport';

const courseRouter = Router();
const authenticate = passport.authenticate('jwt', { session: false });
const multerMdw = uploadImageMdw.single('imageProfile')    // mdw de carga de imagen

courseRouter
  .route('/')
  .post(
    authenticate,
    validateCourseRegistration,
    handleValidationErrors,
    createCourse
  );

courseRouter.route('/imageCourse/:id')
  .post(authenticate, idByParameterValidator, multerMdw, handleValidationErrors, imageProController.imageRegisterCourse)

courseRouter.route('/imageLesson/:id')
  .post(authenticate, idByParameterValidator, multerMdw, handleValidationErrors, imageProController.imageRegisterLesson)

courseRouter
  .route('/:id')
  .get(idByParameterValidator, validateFetchCourse, handleValidationErrors, getOneCourse);

export default courseRouter;

import { Router } from "express";
import { createCourse } from "../controllers/courseController";
import {validateCourseRegistration, handleValidationErrors} from '../utils/middlewares'

const courseRouter = Router();

courseRouter.post("/", validateCourseRegistration, handleValidationErrors, createCourse);

export default courseRouter;

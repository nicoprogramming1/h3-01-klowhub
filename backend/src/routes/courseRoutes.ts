import { Router } from "express";
import { createCourse } from "../controllers/courseController";

const courseRouter = Router();

courseRouter.post("/register", createCourse);

export default courseRouter;

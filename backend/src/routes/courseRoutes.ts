import { Router } from "express";
import { createCourse } from "../controllers/courseController";

const courseRouter = Router();

courseRouter.post("/", createCourse);

export default courseRouter;

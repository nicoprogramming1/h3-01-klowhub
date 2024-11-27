import passport from "passport";
import express from 'express';
import { getOneUser, deactivateUser, updateUser } from '../controllers/user.controller'
import { deactivateUserValidator, getOneUserValidator, handleValidationErrors, updateUserValidator } from '../utils/middlewares'

const userRouter = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

userRouter.route('/:id')
    .get(authenticate, getOneUserValidator, handleValidationErrors, getOneUser)
    .delete(authenticate, deactivateUserValidator, handleValidationErrors, deactivateUser)
    .put(authenticate, updateUserValidator, handleValidationErrors, updateUser);

export default userRouter;
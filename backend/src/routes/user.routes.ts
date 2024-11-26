import passport from "passport";
import express from 'express';
import { getOneUser, deactivateUser, updateUser } from '../controllers/user.controller'

const userRouter = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

userRouter.route('/:id')
    .get(authenticate, getOneUser)
    .delete(authenticate, deactivateUser)
    .put(authenticate, updateUser);

export default userRouter;
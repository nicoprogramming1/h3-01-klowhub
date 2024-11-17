import passport from "passport";
import express from 'express';
import { getOneUser, deactivateUser, updateUser } from '../controllers/userController'
const userRouter = express.Router();

userRouter.route('/:id')
    .get(passport.authenticate('jwt', { session: false }), getOneUser)
    .delete(passport.authenticate('jwt', { session: false }), deactivateUser)
    .put(passport.authenticate('jwt', { session: false }), updateUser);

export default userRouter;
import passport from "passport";
import express from 'express';
import { getOneUser, deactivateUser, updateUser, getUserMembership, changeMembership } from '../controllers/user.controller'
import { changeMembershipValidator, idByParameterValidator, handleValidationErrors, updateUserValidator } from '../middlewares'

const userRouter = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

userRouter.route('/:id')
    .get(authenticate, idByParameterValidator, handleValidationErrors, getOneUser)
    .delete(authenticate, idByParameterValidator, handleValidationErrors, deactivateUser)
    .put(authenticate, updateUserValidator, handleValidationErrors, updateUser);

userRouter.route('/membership/:id')
    .get(authenticate, idByParameterValidator, handleValidationErrors, getUserMembership)
    .put(authenticate, idByParameterValidator, changeMembershipValidator, handleValidationErrors, changeMembership)

export default userRouter;
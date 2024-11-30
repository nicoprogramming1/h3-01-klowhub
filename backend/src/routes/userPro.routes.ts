import passport from "passport";
import express from 'express';
import { getUserProByUserId, registerUserPro } from '../controllers/user.controller'
import { idByParameterValidator, handleValidationErrors } from '../middlewares'

const userRouter = express.Router();
const authenticate = passport.authenticate('jwt', { session: false });

// User PRO -> el id es del user básico asociado a su perfil PRO
userRouter.route('/:id')
    .post(authenticate, idByParameterValidator, handleValidationErrors, registerUserPro)
    .get(authenticate, idByParameterValidator, handleValidationErrors, getUserProByUserId)
    /* .put(authenticate, idByParameterValidator, changeMembershipValidator, handleValidationErrors, ) */

export default userRouter;
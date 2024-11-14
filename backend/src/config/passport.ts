import dotenv from 'dotenv';
dotenv.config();

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStatic } from 'passport';
import UserModel from '../models/UserModel';

interface JwtPayload {
  id: string;
}

export const configurePassport = (passport: PassportStatic) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET not found');
  };

  const Options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
  };

  passport.use(
    new Strategy(Options, async (jwtPayload: JwtPayload, done: Function) => {
      try {
        const user = await UserModel.findOne({ where: { id: jwtPayload.id } });

        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      } catch (error) {
        console.error('JWT verification error: ', error);
        return done(error, false);
      }
    })
  );
};

export default configurePassport;


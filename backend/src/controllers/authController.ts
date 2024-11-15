import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';

export const register = async (req: Request, res: Response) => {
  const { password, ...User } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = await UserModel.create({ User, password: hashedPassword });
  const  {password: _, ...user } = userData;
  res.json({ user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userData = await UserModel.findOne({ where: { email } });
  if (userData && (await bcrypt.compare(password, userData.password))) {
    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    const { password: _, ...user } = userData;
    res.json({ user, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

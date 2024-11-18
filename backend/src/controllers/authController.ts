import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import DeviceSession from '../models/DeviceSession';


//Controlador de registrar usuarios 
export const register = async (req: Request, res: Response) => {
  try {
    const { password, email, ...User } = req.body;
    const existingUser = await UserModel.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({
        message: "Email is already in use",
      })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ ...User, email, password: hashedPassword });

    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//Controlador de inicio de sesión y añadiendo dispositivo de donde se inicio
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, device, app, country, city, ipAddress } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Mandatory data missing" });
      return;
    }

    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: "1d" });
    if (device && app && country) {
      const [session, created] = await DeviceSession.findOrCreate({
        where: { userId: userData.id, device, app },
        defaults: { country, city, ipAddress, isActive: true },
      });

      if (!created) {
        await session.update({ isActive: true, ipAddress });
      }
    }

    const { password: _, ...userWithoutPassword } = userData.toJSON();

    res.json({ user: userWithoutPassword, token });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};


//Cierra la sesion del usuario y actualiza que el despositivo esta en cuenta cerrada
export const logout = async (req: Request, res: Response) => {
  try {
    const { device, app } = req.body;
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      res.status(400).json({ message: "Token not provided" });
      return;
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (device && app && decoded.id) {
      const session = await DeviceSession.findOne({ where: { userId: decoded.id, device, app } });
      if (session) {
        await session.update({ isActive: false });
      }
    }

    res.json({ message: "Successfully logged out" });

  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};
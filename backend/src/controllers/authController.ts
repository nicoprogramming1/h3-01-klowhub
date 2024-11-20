import dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import DeviceSession from '../models/DeviceSession';
import { registerUser, loginUser } from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { longName, email, password } = req.body;

    const newUser = await registerUser(longName, email, password);

    res.status(201).json({
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser.id,
        longName: newUser.longName,
        email: newUser.email,
        role: newUser.role,
        isValid: newUser.isValid,
      },
    });
  } catch (error: any) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    if (error.message === 'Este email ya está registrado') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};



//Controlador de inicio de sesión y añadiendo dispositivo de donde se inicio
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password, device, app, country, city, ipAddress } = req.body;

    const { user, token } = await loginUser(email, password, device, app, country, city, ipAddress);

    res.json({ user, token });
  } catch (error: any) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    // Manejo de errores
    if (error.message === 'Credenciales de acceso inválidas') {
      res.status(401).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Login error' });
    }
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
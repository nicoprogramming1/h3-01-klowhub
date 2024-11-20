import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import DeviceSession from '../models/DeviceSession';

export const registerUser = async (
  longName: string,
  email: string,
  password: string
) => {
  try {
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('Este email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      longName,
      email,
      password: hashedPassword,
    });

    return newUser;
  } catch (error: any) {
    if (error.message === 'Este email ya está registrado') {
      throw error;
    }
    throw new Error('Error al crear el usuario');
  }
};

export const loginUser = async (
  email: string,
  password: string,
  device: string | undefined,
  app: string | undefined,
  country: string | undefined,
  city: string | undefined,
  ipAddress: string | undefined
) => {
  try {
    const userData = await UserModel.findOne({ where: { email } });
    if (!userData) {
      throw new Error('Credenciales de acceso inválidas');
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales de acceso inválidas');
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // Si se proporcionan datos de dispositivo, manejar la sesión
    if (device && app && country) {
      const [session, created] = await DeviceSession.findOrCreate({
        where: { userId: userData.id, device, app },
        defaults: { country, city, ipAddress, isActive: true },
      });

      if (!created) {
        await session.update({ isActive: true, ipAddress });
      }
    }

    // Devolver la información del usuario (sin la contraseña) y el token
    const { password: _, ...userWithoutPassword } = userData.toJSON();

    return { user: userWithoutPassword, token };
  } catch (error: any) {
    throw new Error(error.message || 'Login error');
  }
};
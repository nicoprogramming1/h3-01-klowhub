import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/User.model';
import DeviceSession from '../models/DeviceSession.model';

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
    
    // Verificar si el usuario existe y está activo
    if (!userData) {
      throw new Error('Cuenta no encontrada');
    }
    if (!userData.isValid) {
      throw new Error('Cuenta desactivada');
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error('Credenciales de acceso inválidas');
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });

    // Solo crea o actualiza la sesión si se proporcionan datos de dispositivo y aplicación
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
    throw new Error(error.message || 'Error en el login');
  }
};

export const logoutUser = async (device: string, app: string, token: string) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    if (!decoded.id) {
      throw new Error('El token proveído es inválido');
    }

    if (device && app && decoded.id) {
      // Buscar la sesión activa del usuario
      const session = await DeviceSession.findOne({ where: { userId: decoded.id, device, app } });
      
      if (session) {
        // Desactivar la sesión
        await session.update({ isActive: false });
      } else {
        throw new Error('No se encuentra la sesión');
      }
    }

    return { message: 'Se ha cerrado su sesión con éxito' };
  } catch (error: any) {
    throw new Error('Error cerrando sesión');
  }
};
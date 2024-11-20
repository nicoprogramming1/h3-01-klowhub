import bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';

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

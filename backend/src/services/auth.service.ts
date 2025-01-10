import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserDTO } from "../dtos/user.dto";
import { MESSAGES } from "../utils/messages";
import * as userRepository from "../repositories/userRepository";
import { registerUser, loginUser, logoutUser } from "./utils";

export const registerUser = async (
  userData: UserDTO, imageProfile: string
): Promise<UserDTO | null> => {
  try {
    const email = userData.email;
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error(MESSAGES.EMAIL_ALREADY);
    }

    if (!userData.password) {
      throw new Error(MESSAGES.PASSWORD_REQUIRED);
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await userRepository.createUser({
      longName: userData.longName,
      email: userData.email,
      password: hashedPassword,
      imageProfile: imageProfile,
    });

    if (!newUser) {
      throw new Error(MESSAGES.USER_CREATE_ERROR);
    }

    return newUser ? (newUser.toJSON() as UserDTO) : null;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
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
    const userData = await userRepository.findUserByEmail(email);
    if (!userData) {
      throw new Error("Cuenta no encontrada");
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      throw new Error("Credenciales de acceso inválidas");
    }

    const token = jwt.sign({ id: userData.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Si hay dispositivo y app, maneja la sesión
    if (device && app && country) {
      await userRepository.createOrUpdateDeviceSession(
        userData.id,
        device,
        app,
        country,
        city,
        ipAddress
      );
    }

    // Devolver usuario sin la contraseña y el token
    const { password: _, ...userWithoutPassword } = userData.toJSON();
    return { user: userWithoutPassword, token };
  } catch (error: any) {
    throw new Error(error.message || "Error en el login");
  }
};

export const logoutUser = async (
  device: string,
  app: string,
  token: string
) => {
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    if (!decoded.id) {
      throw new Error("El token es inválido");
    }

    if (device && app && decoded.id) {
      const session = await userRepository.updateSessionStatus(
        device,
        app,
        decoded.id,
        false
      );

      if (!session) {
        throw new Error("No se encuentra la sesión");
      }
    }

    return { message: "Se ha cerrado su sesión con éxito" };
  } catch (error: any) {
    throw new Error("Error cerrando sesión");
  }
};

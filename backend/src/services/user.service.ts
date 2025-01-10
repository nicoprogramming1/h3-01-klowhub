import { UserDTO } from "../dtos/user.dto";
import { MESSAGES } from "../utils/messages";
import { Membership } from "../models/enum/enum";
import * as userRepository from "../repositories/userRepository";
import { encryptPassword, validatePassword } from "../utils/passwords";
import { Transaction } from "sequelize";
import sequelize from "../config/database";

export const findUserDTOByPk = async (id: string): Promise<UserDTO | null> => {
  try {
    const user = await userRepository.findUserById(id);

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    return {
      longName: user.longName,
      email: user.email,
      about: user.about,
      imageProfile: user.imageProfile,
    };
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(`${MESSAGES.FETCH_ERROR} + ${error.message}`);
  }
};

export const findUserByEmail = async (email: string): Promise<boolean> => {
  try {
    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      const error: any = new Error(MESSAGES.EMAIL_ALREADY);
      error.status = 400;
      throw error;
    }
    return false;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateUserById = async (
  id: string,
  updateData?: Partial<UserDTO>,
  password?: string
): Promise<UserDTO | null> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const user = await userRepository.findUserById(id);

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    if (password) {
      validatePassword(password);
      user.password = await encryptPassword(password);
    }

    Object.assign(user, updateData);
    await user.save({ transaction });

    await transaction.commit();

    return {
      longName: user.longName,
      email: user.email,
      about: user.about,
      imageProfile: user.imageProfile,
    };
  } catch (error: any) {
    await transaction.rollback();
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(`${MESSAGES.FETCH_ERROR} | ${error.message}`);
  }
};

export const deactivateUserByPk = async (id: string): Promise<UserDTO | null> => {
  const transaction: Transaction = await sequelize.transaction();
  
  try {
    const user = await userRepository.deactivateUser(id, transaction);
    
    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    await transaction.commit();

    return {
      longName: user.longName,
      email: user.email,
      about: user.about,
      imageProfile: user.imageProfile,
    };
  } catch (error: any) {
    await transaction.rollback();
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(error.message || MESSAGES.FETCH_ERROR);
  }
};

export const changeMembership = async (
  id: string,
  membership: Membership
): Promise<UserDTO> => {
  try {
    if (!(Object.values(Membership) as string[]).includes(membership)) {
      throw new Error("La membresía proporcionada no es válida");
    }

    const updatedUser = await userRepository.changeUserMembership(id, membership);

    if (!updatedUser) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    return updatedUser as UserDTO;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(error.message || "Error al cambiar la membresía del usuario");
  }
};

export const getUserMembership = async (id: string): Promise<Membership | null> => {
  try {
    const user = await userRepository.findUserById(id);

    if (!user) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    return user.membership || null;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(MESSAGES.FETCH_ERROR);
  }
};

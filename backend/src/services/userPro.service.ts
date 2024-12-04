import { UserModel } from "../models";
import { UserProDTO } from "../dtos/user.dto";
import { MESSAGES } from "../utils/messages";
import sequelize from "../config/database";
import UserProModel from "../models/UserPro.model";
import { Transaction } from "sequelize";

export const saveUserPro = async (
  userProData: Partial<UserProDTO>,
  id: string
): Promise<Partial<UserProDTO> | null> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    // Verificar si el usuario ya tiene un perfil de vendedor
    const existingUser = await UserModel.findOne({
      where: { id, isValid: true },
      transaction,
    });
    if (!existingUser) {
      const error: any = new Error(MESSAGES.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    if (existingUser.isVendor) {
      const error: any = new Error(
        "Este usuario ya tiene un perfil de vendedor"
      );
      error.status = 400;
      throw error;
    }

    // Actualizar el campo isVendor a true del UserModel básico
    existingUser.isVendor = true;
    await existingUser.save({ transaction });

    const newUserPro = await UserProModel.create(userProData, { transaction });

    const newUserProDTO: Partial<UserProDTO> = {
      firstName: newUserPro.firstName,
      lastName: newUserPro.lastName,
      about: newUserPro.about,
      country: newUserPro.country,
      sector: newUserPro.sector,
      sectorsExperience: newUserPro.sectorsExperience,
      tools: newUserPro.tools,
      toolsExperience: newUserPro.toolsExperience,
      portfolioLink: newUserPro.portfolioLink,
      academicFormation: newUserPro.academicFormation,
      certificationLink: newUserPro.certificationLink,
      paymentMethod: newUserPro.paymentMethod,
      imageProfile: newUserPro.imageProfile,
    }

    await transaction.commit();
    return newUserProDTO;
  } catch (error: any) {
    await transaction.rollback(); // Revertir cambios en caso de error
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const getUserProByUserId = async (
  userId: string
): Promise<UserProDTO | null> => {
  try {
    if (!userId) {
      const error: any = new Error(MESSAGES.MISSED_DATA);
      error.status = 400;
      throw error;
    }

    const existingUser = await UserProModel.findOne({ where: { userId } });

    if (!existingUser) {
      const error: any = new Error(MESSAGES.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    return existingUser;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateUserPro = async (
  id: string,
  userData: Partial<UserProDTO>
): Promise<UserProDTO | null> => {
  try {
    const existingUser = await UserProModel.findOne({
      where: { id, isValid: true },
    });

    if (!existingUser) {
      const existError: any = new Error(MESSAGES.USER_NOT_FOUND);
      existError.status = 404;
      throw existError;
    }

    Object.assign(existingUser, userData);
    await existingUser.save();
    return existingUser;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error; // Re-lanza otros errores para que sean manejados por el controller
  }
};
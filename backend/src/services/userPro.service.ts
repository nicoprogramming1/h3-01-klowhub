// userProService.ts
import * as userProRepository from "../repositories/userProRepository";
import { MESSAGES } from "../utils/messages";
import { UserProDTO } from "../dtos/user.dto";
import sequelize from "../config/database";
import { Transaction } from "sequelize";

export const saveUserPro = async (userProData: Partial<UserProDTO>, userId: string): Promise<Partial<UserProDTO> | null> => {
  try {
    const userPro = await sequelize.transaction(async (transaction: Transaction) => {
      const existingUser = await userProRepository.findUserProByUserId(userId, transaction);
      if (existingUser) {
        const error = new Error(MESSAGES.USER_PRO_ALREADY);
        error.status = 404;
        throw error;
      }

      const newUserPro = await userProRepository.createUserPro(userProData, transaction);

      return {
        id: newUserPro.id,
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
        isMentor: newUserPro.isMentor || false,
        mentor: null, // Esto puede ser cargado después
      };
    });

    return userPro;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const getUserProById = async (id: string): Promise<UserProDTO | null> => {
  try {
    const foundedUserPro = await userProRepository.findUserProById(id);
    if (!foundedUserPro) {
      const error = new Error(MESSAGES.USER_PRO_NOEXIST);
      error.status = 404;
      throw error;
    }

    const mentor = await userProRepository.getMentorByUserProId(foundedUserPro.id);
    return {
      firstName: foundedUserPro.firstName,
      lastName: foundedUserPro.lastName,
      about: foundedUserPro.about,
      country: foundedUserPro.country,
      sector: foundedUserPro.sector,
      certificationLink: foundedUserPro.certificationLink,
      academicFormation: foundedUserPro.academicFormation,
      tools: foundedUserPro.tools,
      paymentMethod: foundedUserPro.paymentMethod,
      portfolioLink: foundedUserPro.portfolioLink,
      accountData: foundedUserPro.accountData,
      imageProfile: foundedUserPro.imageProfile,
      sectorsExperience: foundedUserPro.sectorsExperience,
      toolsExperience: foundedUserPro.toolsExperience,
      mentor,
    };
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const getMyUserProById = async (userId: string): Promise<UserProDTO | null> => {
  try {
    if (!userId) {
      throw new Error(MESSAGES.MISSED_DATA);
    }

    const existingUser = await userProRepository.findUserProByUserId(userId);
    if (!existingUser) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    return existingUser.toJSON() as UserProDTO;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateUserPro = async (userId: string, userData: Partial<UserProDTO>): Promise<UserProDTO | undefined> => {
  try {
    const existingUser = await userProRepository.findUserProByUserId(userId);
    if (!existingUser) {
      throw new Error(MESSAGES.USER_NOT_FOUND);
    }

    const [rowsAffected] = await userProRepository.updateUserProById(existingUser.id, userData);
    if (rowsAffected === 0) {
      throw new Error(MESSAGES.UPDATE_ERROR);
    }

    const updatedUserPro = await userProRepository.findUserProById(existingUser.id);
    return updatedUserPro ? (updatedUserPro.toJSON() as UserProDTO) : undefined;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

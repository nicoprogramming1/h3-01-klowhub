// userProRepository.ts
import { UserProModel } from "../models/UserPro.model";
import { Transaction } from "sequelize";
import { UserProDTO } from "../dtos/user.dto";

// Aquí se realizan las consultas directas a la base de datos.
export const findUserProByUserId = async (userId: string, transaction?: Transaction) => {
  return UserProModel.findOne({
    where: { userId },
    transaction,
  });
};

export const findUserProById = async (id: string) => {
  return UserProModel.findByPk(id);
};

export const createUserPro = async (userProData: Partial<UserProDTO>, transaction: Transaction) => {
  return UserProModel.create(userProData, { transaction });
};

export const updateUserProById = async (id: string, userData: Partial<UserProDTO>) => {
  return UserProModel.update(userData, { where: { id } });
};

export const getMentorByUserProId = async (userProId: string) => {
  // Imaginemos que mentorService.getMentor está disponible
  return mentorService.getMentor(userProId);
};

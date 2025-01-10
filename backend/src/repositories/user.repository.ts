import { UserModel, UserProModel } from "../models";
import { UserDTO } from "../dtos/user.dto";
import { Membership } from "../models/enum/enum";
import { Transaction } from "sequelize";

// Buscar un usuario por ID
export const findUserById = async (id: string) => {
  return await UserModel.findOne({ where: { id, isValid: true } });
};

// Buscar un usuario por email
export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ where: { email } });
};

// Buscar perfil Pro por id de usuario
export const findUserProByUserId = async (userId: string) => {
  return await UserProModel.findOne({ where: { userId, isValid: true } });
};

// Cambiar membresía de un usuario
export const changeUserMembership = async (id: string, membership: Membership) => {
  const user = await UserModel.findOne({ where: { id, isValid: true } });
  if (user) {
    user.membership = membership;
    await user.save();
  }
  return user;
};

// Desactivar un usuario y su perfil Pro si existe
export const deactivateUser = async (id: string, transaction: Transaction) => {
  const user = await UserModel.findOne({ where: { id, isValid: true }, transaction });

  if (user) {
    // Desactivamos también el perfil Pro si existe
    const userPro = await UserProModel.findOne({ where: { userId: id, isValid: true }, transaction });
    if (userPro) {
      userPro.isValid = false;
      await userPro.save({ transaction });
    }

    user.isValid = false;
    await user.save({ transaction });
  }

  return user;
};

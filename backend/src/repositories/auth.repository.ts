import { Op } from "sequelize";
import UserModel from "../models/User.model";
import DeviceSession from "../models/DeviceSession.model";

export const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ where: { email } });
};

export const createUser = async (userData: any) => {
  return await UserModel.create(userData);
};

export const createOrUpdateDeviceSession = async (
  userId: number,
  device: string,
  app: string,
  country: string,
  city: string,
  ipAddress: string
) => {
  const [session, created] = await DeviceSession.findOrCreate({
    where: { userId, device, app },
    defaults: { country, city, ipAddress, isActive: true },
  });

  if (!created) {
    await session.update({ isActive: true, ipAddress });
  }
  return session;
};

export const updateSessionStatus = async (
  device: string,
  app: string,
  userId: number,
  isActive: boolean
) => {
  const session = await DeviceSession.findOne({
    where: { userId, device, app },
  });

  if (session) {
    return await session.update({ isActive });
  }
  return null;
};

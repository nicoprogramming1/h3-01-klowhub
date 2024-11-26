import { Request, Response } from "express";
import { userService } from "../services/";
import { MESSAGES } from "../utils/messages";
import { UserDTO } from "../dto/userDTO.interface";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    const updatedUser = await userService.updateUserById(
      id,
      updateData,
      password
    );

    // DTO para no exponer datos sensibles como la pass
    const userDTO: UserDTO = {
      longName: updatedUser.longName,
      email: updatedUser.email,
      country: updatedUser.country,
      imageProfile: updatedUser.imageProfile,
    };

    res.status(200).json({
      user: userDTO,
      message: MESSAGES.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    console.error(MESSAGES.UPDATE_ERROR, error.message);
    if (error.message === MESSAGES.USER_NOT_FOUND) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: MESSAGES.UPDATE_ERROR });
    }
  }
};

//Llamar a un usuario por id
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const userFounded = await userService.findUserByPk(id);
    if (!userFounded) {
      res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
      return;
    }

    const userDTO: UserDTO = {
      longName: userFounded.longName,
      email: userFounded.email,
      country: userFounded.country,
      imageProfile: userFounded.imageProfile,
    };

    res.status(200).json({ user: userDTO, message: MESSAGES.FETCH_SUCCESS });
  } catch (error: any) {
    console.error(MESSAGES.UPDATE_ERROR, error.message);
    if (error.message === MESSAGES.USER_NOT_FOUND) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: MESSAGES.UPDATE_ERROR });
    }
  }
};

//Desactivar la cuenta del usuario
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userFounded = await userService.deactivateUserByPk(id);

    const userDTO: UserDTO = {
        longName: userFounded.longName,
        email: userFounded.email,
        country: userFounded.country,
        imageProfile: userFounded.imageProfile,
      };

    res.status(200).json({
      message: MESSAGES.ELIMINATE_SUCCESS,
      user: userDTO
    });
  } catch (error: any) {
    console.error(MESSAGES.UPDATE_ERROR, error.message);
    if (error.message === MESSAGES.USER_NOT_FOUND) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: MESSAGES.UPDATE_ERROR });
    }
  }
};
import { Request, Response } from "express";
import { userService } from "../services";
import { MESSAGES } from "../utils/messages";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, ...updateData } = req.body;

    const updatedUser = await userService.updateUserById(id, updateData, password);

    res.status(200).json({
      user: updatedUser,
      message: MESSAGES.UPDATE_SUCCESS,
    });
  } catch (error: any) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    console.error(MESSAGES.UPDATE_ERROR, error.message);
    res.status(error.message === MESSAGES.USER_NOT_FOUND ? 404 : 500).json({ message: error.message });
  }
};


//Llamar a un usuario por id
export const getOneUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const user = await userService.findUserDTOByPk(id);
    if (!user) {
      res.status(404).json({ message: MESSAGES.USER_NOT_FOUND });
      return;
    }

    res.status(200).json({ user, message: MESSAGES.FETCH_SUCCESS });
  } catch (error: any) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    console.error(MESSAGES.FETCH_ERROR, error.message);
    res.status(404).json({ message: MESSAGES.FETCH_ERROR + error.message });
  }
};


//Desactivar la cuenta del usuario
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deactivatedUser = await userService.deactivateUserByPk(id);

    res.status(200).json({
      message: MESSAGES.ELIMINATE_SUCCESS,
      user: deactivatedUser,
    });
  } catch (error: any) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    console.error(MESSAGES.ELIMINATE_ERROR, error.message);
    res.status(error.message === MESSAGES.USER_NOT_FOUND ? 404 : 500).json({ message: error.message });
  }
};

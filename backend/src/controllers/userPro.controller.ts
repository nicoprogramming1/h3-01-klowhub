import { Request, Response } from "express";
import { userProService } from "../services";
import { MESSAGES } from "../utils/messages";

export const registerUserPro = async (req: Request, res: Response) => {
  try {
    if (!req.body) {
      res.status(400).json({
        message: MESSAGES.MISSED_DATA,
      });
      return;
    }

    const { id } = req.params; // ID del usuario asociado
    const userProData = req.body;

    if (!id) {
      res.status(400).json({
        message: MESSAGES.ID_MISSING,
      });
      return;
    }

    if (userProData.isMentor) {
      const isMentor = await userProService.isMentor(id);
      if (isMentor) {
        res.status(400).json({
          message: MESSAGES.MENTOR_ALREADY,
        });
        return;
      }
    }

    // Asignar imagen de perfil por default desde la carpeta 'public/images'
    const DEFAULT_IMAGE_URL = `${req.protocol}://${req.get("host")}/static/images/default-profile.jpg`;
    userProData.imageProfile = DEFAULT_IMAGE_URL;

    userProData.userId = id

    const newUserPro = await userProService.saveUserPro(userProData, id);

    res.status(201).json({
      message: MESSAGES.CREATE_SUCCESS,
      data: newUserPro,
    });
  } catch (error: any) {
    if (res.headersSent) {
      console.error("Error en registerPro: ", MESSAGES.HEADERS_SENT);
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    console.error("Error en saveUserPro:", error);
    if (error.message === "Este usuario ya es vendedor") {
      res.status(400).json({ message: error.message });
      return;
    } else {
      res.status(500).json({
        message: MESSAGES.CREATE_ERROR,
        data: null,
      });
    }
  }
};

export const getUserProByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await userProService.getUserProByUserId(id);

    if (!user) {
      res.status(404).json({
        message: MESSAGES.USER_NOT_FOUND,
      });
    }

    res.status(200).json({
      message: MESSAGES.FETCH_SUCCESS,
      data: user,
    });
  } catch (error: any) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ message: error.message });
  }
};

export const updateUserPro = async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const { id } = req.params;

    if (!id || !userData) {
      res.status(400).json({
        message: MESSAGES.MISSED_DATA,
      });
      return;
    }

    const updatedUser = await userProService.updateUserPro(id, userData);

    res.status(200).json({
      message: MESSAGES.UPDATE_SUCCESS,
      data: updatedUser,
    });
  } catch (error: any) {
    if (res.headersSent) {
      console.error("Error en updateUserPro: ", MESSAGES.HEADERS_SENT);
      return;
    }

    const statusCode = error.status || 500;
    const message = error.message || MESSAGES.FETCH_ERROR;

    res.status(statusCode).json({ message });
  }
};

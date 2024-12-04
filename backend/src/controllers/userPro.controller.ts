import { Request, Response } from "express";
import { mentorService, userProService, userService } from "../services";
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
    const { mentor, ...userProData } = req.body;

    console.log(mentor)

    if (!id) {
      res.status(400).json({
        message: MESSAGES.ID_MISSING,
      });
      return;
    }

    const gotMembership = await userService.getUserMembership(id)
    if(!gotMembership){
      res.status(404).json({
        message: MESSAGES.MEMBERSHIP_NULL
      })
      return
    }

    // Asignar imagen de perfil por defecto desde la carpeta 'public/images'
    const DEFAULT_IMAGE_URL = `${req.protocol}://${req.get(
      "host"
    )}/static/images/default-profile.jpg`;
    userProData.imageProfile = DEFAULT_IMAGE_URL;
    
    userProData.userId = id;
    
    const newUserPro = await userProService.saveUserPro(userProData, id);
    
    if(!newUserPro){
      res.status(500).json({
        message: MESSAGES.USER_CREATE_ERROR
      })
      return
    }

    if(mentor){
      mentor.userProId = newUserPro.id
      const newMentor = await mentorService.saveMentor(mentor)
      newUserPro.mentor = newMentor
    }
    
    res.status(201).json({
      message: MESSAGES.CREATE_SUCCESS,
      data: newUserPro,
    });
  } catch (error: any) {
    if (res.headersSent) {
      console.error("Error en registerPro: ", MESSAGES.HEADERS_SENT);
      return;
    }
    const statusCode = error.status || 500;
    const message = error.message || MESSAGES.CREATE_ERROR;
    
    res.status(statusCode).json({ message });
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
    if (res.headersSent) {
      console.error("Error en registerPro: ", MESSAGES.HEADERS_SENT);
      return;
    }
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

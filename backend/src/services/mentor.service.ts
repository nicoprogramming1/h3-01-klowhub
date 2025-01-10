import * as mentorRepository from "../repositories/mentorRepository";
import { MESSAGES } from "../utils/messages";
import { MentorDTO } from "../dtos/user.dto";

export const saveMentor = async (mentor: MentorDTO): Promise<MentorDTO | undefined> => {
  try {
    const existingMentor = await mentorRepository.findMentorById(mentor.userProId);

    if (existingMentor) {
      const error: any = new Error(MESSAGES.MENTOR_ALREADY);
      error.statusCode = 400;
      throw error;
    }

    const newMentor = await mentorRepository.createMentor(mentor);

    if (!newMentor) {
      const error: any = new Error(MESSAGES.MENTOR_CREATE_ERROR);
      error.statusCode = 500;
      throw error;
    }

    return newMentor.toJSON() as MentorDTO;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const getMentor = async (userProId: string): Promise<MentorDTO | null> => {
  try {
    const mentor = await mentorRepository.findMentorById(userProId);
    return mentor ? mentor.toJSON() as MentorDTO : null;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateMentor = async (userProId: string, mentor: MentorDTO): Promise<MentorDTO | undefined> => {
  try {
    const existingMentor = await mentorRepository.findMentorById(userProId);

    if (!existingMentor) {
      const error: any = new Error(MESSAGES.MENTOR_NOT_FOUNDED);
      error.statusCode = 404;
      throw error;
    }

    const id = existingMentor.id;

    const [rowsAffected] = await mentorRepository.updateMentorById(id, mentor);

    if (rowsAffected === 0) {
      const error: any = new Error(MESSAGES.UPDATE_ERROR);
      error.status = 204;
      throw error;
    }

    const updatedMentor = await mentorRepository.findMentorByPK(id);
    return updatedMentor ? (updatedMentor.toJSON() as MentorDTO) : undefined;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

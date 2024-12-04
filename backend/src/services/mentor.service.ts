import { MESSAGES } from "../utils/messages";
import { MentorDTO } from "../dtos/user.dto";
import MentorModel from "../models/Mentor.model";

export const saveMentor = async (
  mentor: MentorDTO
): Promise<MentorDTO | undefined> => {
  try {

    const existingMentor = await getMentor(mentor.userProId)

    if(existingMentor){
        const error: any = new Error(MESSAGES.MENTOR_ALREADY)
        error.statusCode = 400
        throw error
    }

    const newMentor = await MentorModel.create({
        userProId: mentor.userProId,
        expertiseArea: mentor.expertiseArea,
        expertiseLevel: mentor.expertiseLevel,
        platform: mentor.platform,
        mentoryCost: mentor.mentoryCost,
        aboutMentories: mentor.aboutMentories,
        language: mentor.language,
      });

      if(!newMentor){
        const error: any = new Error(MESSAGES.MENTOR_CREATE_ERROR)
        error.statusCode = 500
        throw error
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
        const findedMentor = await MentorModel.findOne({where: {userProId}})

        if(!findedMentor){
            return null
        }

        return findedMentor.toJSON() as MentorDTO;
    } catch (error: any) {
        if (error.name === "SequelizeConnectionError") {
            throw new Error(MESSAGES.CONNECTION_ERROR);
          }
          throw error;
        }
      };
import MentorModel from "../models/Mentor.model";
import { MentorDTO } from "../dtos/user.dto";

// Crea un nuevo mentor
export const createMentor = async (mentor: MentorDTO) => {
  return await MentorModel.create({
    userProId: mentor.userProId,
    expertiseArea: mentor.expertiseArea,
    expertiseLevel: mentor.expertiseLevel,
    platform: mentor.platform,
    mentoryCost: mentor.mentoryCost,
    aboutMentories: mentor.aboutMentories,
    language: mentor.language,
  });
};

// Encuentra un mentor por su ID
export const findMentorById = async (userProId: string) => {
  return await MentorModel.findOne({ where: { userProId } });
};

// Actualiza un mentor
export const updateMentorById = async (id: string, mentor: MentorDTO) => {
  return await MentorModel.update(mentor, { where: { id } });
};

// Busca un mentor por su ID
export const findMentorByPK = async (id: string) => {
  return await MentorModel.findByPk(id);
};

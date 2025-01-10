import { Op, Transaction } from "sequelize";
import { CourseModel, CourseModuleModel, LessonModel, UserModel } from "../models";
import sequelize from "../config/database";

export const createCourse = async (
  courseData: any, transaction: Transaction
) => {
  return await CourseModel.create(courseData, { transaction });
};

export const createCourseModule = async (
  moduleData: any, courseId: string, transaction: Transaction
) => {
  return await CourseModuleModel.create(
    { ...moduleData, courseId }, 
    { transaction }
  );
};

export const createLesson = async (
  lessonData: any, moduleId: string, transaction: Transaction
) => {
  return await LessonModel.create(
    { ...lessonData, courseModuleId: moduleId }, 
    { transaction }
  );
};

export const findCourseById = async (courseId: string) => {
  return await CourseModel.findOne({
    where: { id: courseId },
    include: [
      { model: CourseModuleModel, include: [ { model: LessonModel } ] }
    ],
  });
};

export const findAllCourses = async () => {
  return await CourseModel.findAll();
};

export const updateCourse = async (
  courseId: string, courseData: any
) => {
  return await CourseModel.update(courseData, { where: { id: courseId } });
};

export const findCourseForUser = async (courseId: string) => {
  return await CourseModel.findByPk(courseId);
};

export const findUserById = async (userId: string) => {
  return await UserModel.findOne({ where: { id: userId } });
};

export const addProductToUser = async (
  userId: string, courseId: string, transaction: Transaction
) => {
  const user = await UserModel.findOne({ where: { id: userId, isValid: true } });
  if (!user) throw new Error("Usuario no encontrado");

  user.products = [...(user.products || []), courseId];
  await user.save({ transaction });
};

export const deleteCourse = async (
  courseId: string, transaction: Transaction
) => {
  return await CourseModel.destroy({ where: { id: courseId }, transaction });
};

export const findUsersWithProduct = async (courseId: string) => {
  return await UserModel.findAll({
    where: { products: { [Op.contains]: [courseId] } },
  });
};

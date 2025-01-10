import { Transaction } from "sequelize";
import { CourseDTO, LessonDataDTO } from "../dtos/course.dto";
import { MESSAGES } from "../utils/messages";
import * as courseRepository from "../repositories/courseRepository";

export const saveCourse = async (courseData: CourseDTO): Promise<CourseDTO | null> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const course = await courseRepository.createCourse(courseData.course, transaction);
    const modulesWithLessons = [];

    // Crear módulos y lecciones dentro de la transacción
    for (const moduleData of courseData.modules!) {
      const module = await courseRepository.createCourseModule(
        moduleData, course.id, transaction
      );

      const lessons = [];
      for (const lessonData of moduleData.lessons!) {
        const lesson = await courseRepository.createLesson(
          lessonData, module.id, transaction
        );
        lessons.push(lesson);
      }
      modulesWithLessons.push({ ...module.toJSON(), lessons });
    }

    await transaction.commit();

    return {
      course: course.toJSON(),
      modules: modulesWithLessons,
    };
  } catch (error: any) {
    await transaction.rollback();
    throw new Error(MESSAGES.CREATE_ERROR);
  }
};

export const getCourse = async (courseId: string) => {
  try {
    const course = await courseRepository.findCourseById(courseId);
    return course;
  } catch (error: any) {
    throw new Error(MESSAGES.FETCH_ERROR);
  }
};

export const getAllCourses = async (): Promise<any[]> => {
  try {
    const allCourses = await courseRepository.findAllCourses();
    if (!allCourses.length) throw new Error(MESSAGES.COURSES_EMPTY);
    return allCourses;
  } catch (error: any) {
    throw new Error(MESSAGES.FETCH_ERROR);
  }
};

export const updateCourse = async (
  id: string,
  courseData: Partial<CourseDTO>
): Promise<CourseDTO | null> => {
  try {
    const rowsAffected = await courseRepository.updateCourse(id, courseData);
    if (rowsAffected === 0) throw new Error(MESSAGES.UPDATE_ERROR);

    const updatedCourse = await courseRepository.findCourseById(id);
    return updatedCourse ? (updatedCourse.toJSON() as CourseDTO) : null;
  } catch (error: any) {
    throw new Error(MESSAGES.UPDATE_ERROR);
  }
};

export const buyCourse = async (userId: string, courseId: string) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const course = await courseRepository.findCourseForUser(courseId);
    if (!course) throw new Error(MESSAGES.COURSE_NOT_FOUND);

    const user = await courseRepository.findUserById(userId);
    if (!user) throw new Error(MESSAGES.USER_NOT_FOUND);

    const userProducts = user.products || [];

    if (userProducts.includes(courseId)) {
      throw new Error(MESSAGES.COURSE_ALREADY_BOUGHT);
    }

    await courseRepository.addProductToUser(userId, courseId, transaction);

    await transaction.commit();
    return course;
  } catch (error: any) {
    await transaction.rollback();
    throw new Error(MESSAGES.BUY_ERROR);
  }
};

export const deleteCourse = async (courseId: string) => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const course = await courseRepository.findCourseById(courseId);
    if (!course) throw new Error(MESSAGES.COURSE_NOT_FOUND);

    await courseRepository.deleteCourse(courseId, transaction);
    const users = await courseRepository.findUsersWithProduct(courseId);

    await Promise.all(users.map(async (user) => {
      user.products = user.products.filter((productId) => productId !== courseId);
      await user.save({ transaction });
    }));

    await transaction.commit();
    return courseId;
  } catch (error: any) {
    await transaction.rollback();
    throw new Error(MESSAGES.DELETE_ERROR);
  }
};

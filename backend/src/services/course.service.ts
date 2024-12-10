import { Op, Transaction } from "sequelize";
import sequelize from "../config/database";
import {
  CourseModel,
  CourseModuleModel,
  LessonModel,
  UserModel,
} from "../models/";
import { MESSAGES } from "../utils/messages";
import { CourseDTO, LessonDataDTO } from "../dtos/course.dto";

const saveCourse = async (courseData: CourseDTO): Promise<CourseDTO | null> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const course = await CourseModel.create(courseData.course, { transaction });

    const modulesWithLessons = [];

    // Crear los módulos y sus lecciones asociadas
    for (const moduleData of courseData.modules!) {
      const module = await CourseModuleModel.create(
        {
          ...moduleData,
          courseId: course.id, // Relacionar el módulo con el curso
        },
        { transaction }
      );

      const lessons = [];
      for (const lessonData of moduleData.lessons!) {
        const lesson = await LessonModel.create(
          {
            ...lessonData,
            courseModuleId: module.id, // Relacionar la lección con el módulo
          },
          { transaction }
        );
        lessons.push(lesson); // Agregar lección a la lista
      }

      modulesWithLessons.push({ ...module.toJSON(), lessons }); // Relacionar módulo con sus lecciones
    }

    await transaction.commit();

    return {
      course: course.toJSON(),
      modules: modulesWithLessons,
    };
  } catch (error: any) {
    await transaction.rollback();
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(`${MESSAGES.CREATE_ERROR} | ${error.message}`);
  }
};

const findCourse = async (courseId: string) => {
  try {
    const course = await CourseModel.findOne({
      where: { id: courseId },
      include: [
        {
          model: CourseModuleModel,
          include: [
            {
              model: LessonModel,
            },
          ],
        },
      ],
    });
    return course;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw new Error(`${MESSAGES.FETCH_ERROR} | ${error.message}`);
  }
};

export const getAllCourses = async (): Promise<CourseModel[] | null> => {
  try {
    const allCourses = await CourseModel.findAll();

    if (!allCourses) {
      const error: any = new Error(MESSAGES.COURSES_EMPTY);
      error.statusCode = 204;
      throw error;
    }

    return allCourses;
  } catch (error: any) {
    if (error === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateCourse = async (
  id: string,
  courseData: Partial<CourseDTO>
): Promise<CourseDTO | null> => {
  try {
    const [rowsAffected] = await CourseModel.update(courseData, {
      where: { id },
    });

    if (rowsAffected === 0) {
      const error: any = new Error(MESSAGES.UPDATE_ERROR);
      error.status = 204;
      throw error;
    }

    const updatedCourse = await CourseModel.findByPk(id);
    return updatedCourse ? (updatedCourse.toJSON() as CourseDTO) : null;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const updateLesson = async (
  id: string,
  lessonData: Partial<LessonDataDTO>
): Promise<CourseDTO | null> => {
  try {
    const [rowsAffected] = await CourseModel.update(lessonData, {
      where: { id },
    });

    if (rowsAffected === 0) {
      const error: any = new Error(MESSAGES.UPDATE_ERROR);
      error.status = 204;
      throw error;
    }

    const updatedCourse = await CourseModel.findByPk(id);
    return updatedCourse ? (updatedCourse.toJSON() as CourseDTO) : null;
  } catch (error: any) {
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const buyCourse = async (
  userId: string,
  courseId: string
): Promise<CourseModel | null> => {
  const transaction: Transaction = await sequelize.transaction();
  try {
    const course = await CourseModel.findByPk(courseId);

    if (!course) {
      const error: any = new Error(MESSAGES.COURSE_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    const user = await UserModel.findOne({ where: { id: userId, isValid: true } }); // Ajuste en la búsqueda del usuario

    if (!user) {
      const error: any = new Error(MESSAGES.USER_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    const userProducts = user.products || [];

    if (userProducts.includes(courseId)) {
      const error: any = new Error(MESSAGES.COURSE_ALREADY_BOUGHT);
      error.status = 409;
      throw error;
    }

    user.products = [...userProducts, courseId];
    await user.save({ transaction });

    await transaction.commit();
    return course;
  } catch (error: any) {
    await transaction.rollback();
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};

export const deleteCourse = async (courseId: string): Promise<string | null> => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const course = await CourseModel.findByPk(courseId);
    if (!course) {
      const error: any = new Error(MESSAGES.COURSE_NOT_FOUND);
      error.status = 404;
      throw error;
    }

    // Eliminar el curso de la tabla courses
    const rowsAffected = await CourseModel.destroy({ where: { id: courseId }, transaction });
    if (rowsAffected === 0) {
      const error: any = new Error(MESSAGES.ELIMINATE_ERROR);
      error.status = 500;
      throw error;
    }

    // Recuperar usuarios que tengan este curso en su lista de productos
    const users = await UserModel.findAll({
      where: { products: { [Op.contains]: [courseId] } }, // Usuarios cuyo campo 'products' incluye el courseId
      transaction,
    });

    // Eliminar el curso de la lista de productos de cada usuario
    await Promise.all(
      users.map(async (user) => {
        user.products = user.products.filter((productId) => productId !== courseId);
        await user.save({ transaction });
      })
    );

    // Confirmar la transacción
    await transaction.commit();
    return courseId;
  } catch (error: any) {
    await transaction.rollback();
    if (error.name === "SequelizeConnectionError") {
      throw new Error(MESSAGES.CONNECTION_ERROR);
    }
    throw error;
  }
};



export default {
  saveCourse,
  findCourse,
  updateCourse,
  updateLesson,
  getAllCourses,
  buyCourse,
  deleteCourse,
};

import { Transaction } from "sequelize";
import sequelize from "../config/database";
import CourseModel from "../models/CourseModel";
import CourseModuleModel from "../models/CourseModuleModel";
import LessonModel from "../models/LessonModel";
import { CourseData } from "../models/interfaces/course.interface";


const saveCourse = async (courseData: CourseData) => {
  const transaction: Transaction = await sequelize.transaction();

  try {
    const course = await CourseModel.create(courseData.course, { transaction });

    for (const moduleData of courseData.modules) {
      const module = await CourseModuleModel.create(
        {
          ...moduleData,
          courseId: course.id,
        },
        { transaction }
      );

      for (const lessonData of moduleData.lessons) {
        await LessonModel.create(
          {
            ...lessonData,
            courseModuleId: module.id,
          },
          { transaction }
        );
      }
    }

    await transaction.commit();

    return course;
  } catch (error) {
    // Revertir cambios en caso de error
    await transaction.rollback();
    throw new Error(`Error al crear el curso: ${error}`);
  }
};

export default { saveCourse };

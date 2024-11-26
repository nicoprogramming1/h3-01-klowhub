import CourseModel from './Course.model';
import CourseModuleModel from './CourseModule.model';
import DeviceSession from './DeviceSession.model';
import LessonModel from './Lesson.model';
import UserModel from './User.model';

// DeviceSession con User
DeviceSession.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(DeviceSession, { foreignKey: 'userId' });

// Course con User
UserModel.hasMany(CourseModel, { foreignKey: 'ownerId' });

// Course con CourseModule
CourseModel.hasMany(CourseModuleModel, { foreignKey: 'courseId' });
CourseModuleModel.belongsTo(CourseModel, { foreignKey: 'courseId' });

// CourseModule con Lesson
CourseModuleModel.hasMany(LessonModel, { foreignKey: 'courseModuleId' });
LessonModel.belongsTo(CourseModuleModel, { foreignKey: 'courseModuleId' });

export {
  CourseModel,
  CourseModuleModel,
  LessonModel,
  DeviceSession,
  UserModel,
};

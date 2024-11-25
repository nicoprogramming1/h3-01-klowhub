import CourseModel from './CourseModel';
import CourseModuleModel from './CourseModuleModel';
import DeviceSession from './DeviceSession';
import LessonModel from './LessonModel';
import UserModel from './UserModel';

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

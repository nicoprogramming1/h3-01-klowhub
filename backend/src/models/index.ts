import CourseModel from './CourseModel';
import CourseModuleModel from './CourseModuleModel';
import DeviceSession from './DeviceSession';
import LessonModel from './LessonModel';
import UserModel from './UserModel';

DeviceSession.belongsTo(UserModel, { foreignKey: 'userId' });
UserModel.hasMany(DeviceSession, { foreignKey: 'userId' });
UserModel.hasMany(CourseModel, { foreignKey: 'ownerId' });

CourseModel.hasMany(CourseModuleModel, { foreignKey: 'courseId' });
CourseModuleModel.belongsTo(CourseModel, { foreignKey: 'courseId' });

CourseModuleModel.hasMany(LessonModel, { foreignKey: 'courseModuleId' });
LessonModel.belongsTo(CourseModuleModel, { foreignKey: 'courseModuleId' });

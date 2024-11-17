import DeviceSession from "./DeviceSession";
import UserModel from "./UserModel";

DeviceSession.belongsTo(UserModel);
UserModel.hasMany(DeviceSession);
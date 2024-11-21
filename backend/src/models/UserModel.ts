import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

function generateShortID(): string {
  return (
    Date.now().toString(36).substring(0, 6) +
    Math.random().toString(36).substring(2, 6)
  ).substring(0, 10);
}

class UserModel extends Model {
  public id!: string;
  public longName!: string;
  public email!: string;
  public password!: string;
  /* creo que habiamos dicho no incluir pais ni telefono por el mom
  public country!: string;
  public phone!: number; */
  public role!: string;
  public isValid!: boolean;
}

UserModel.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      defaultValue: generateShortID,
    },
    longName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "long_name"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
      validate: {
        isIn: [["user", "admin"]],
      },
    },
    /* country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    }, */
    isValid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: "is_valid"
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    hooks: {
      beforeCreate: (user: UserModel) => {
        user.id = generateShortID();
      },
    },
  }
);

export default UserModel;
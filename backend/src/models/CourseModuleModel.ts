import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

function generateShortID(): string {
  return (
    Date.now().toString(36).substring(0, 6) +
    Math.random().toString(36).substring(2, 6)
  ).substring(0, 10);
}

class CourseModule extends Model {
  public id!: string;
  public courseId!: string; // el id del curso al que pertenece el modulo
  public title!: string;
  public detail!: string;
  public lections!: string;
}

CourseModule.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      defaultValue: generateShortID,
    },
    courseId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "course_id",
      references: {
        // foreign key a la tabla cursos
        model: "courses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CourseModel",
    tableName: "course_modules",
    timestamps: true,
    hooks: {
      beforeCreate: (module: CourseModule) => {
        module.id = generateShortID();
      },
    },
  }
);

export default CourseModule;

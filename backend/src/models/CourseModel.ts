import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { ProductModel } from "./ProductModel";

function generateShortID(): string {
  return (
    Date.now().toString(36).substring(0, 6) +
    Math.random().toString(36).substring(2, 6)
  ).substring(0, 10);
}

enum Competence {
  BASIC = "Basic",
  INTERMEDIATE = "Intermediate",
}

class CourseModel extends ProductModel {
  public competence!: Competence;
  public aboutLearn!: string;
}

CourseModel.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      defaultValue: generateShortID,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutLearn: {
      type: DataTypes.STRING,
      allowNull: true,
      field: "about_learn",
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    ownerId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "owner_id",
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Course",
    tableName: "courses",
    timestamps: true,
    hooks: {
      beforeCreate: (course: CourseModel) => {
        course.id = generateShortID();
      },
    },
  }
);

export default CourseModel;

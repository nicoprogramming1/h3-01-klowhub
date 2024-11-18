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
  public modules!: CourseModel[];
  public aboutLearn!: string; // es una descripcion de qué se va a aprender en el curso
}

CourseModel.init(
    {
        id: {
          type: DataTypes.STRING(10),
          primaryKey: true,
          defaultValue: generateShortID,
        },
        detail: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        aboutLearn: {
          type: DataTypes.STRING,
          allowNull: true, // la dejamos true para null x el mom
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
          allowNull: true, // allow null
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
            // foreign key a la tabla users
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

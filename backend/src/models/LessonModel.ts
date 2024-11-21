import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

function generateShortID(): string {
  return (
    Date.now().toString(36).substring(0, 6) +
    Math.random().toString(36).substring(2, 6)
  ).substring(0, 10);
}

class LessonModel extends Model {
  public id!: string;
  public courseModuleId!: string;
  public title!: string;
  public detail!: string;
  public lessonLink!: string;
  public additionalPdfs!: string[]; // Almacena URLs en formato JSON
}

LessonModel.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      defaultValue: generateShortID,
    },
    courseModuleId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'course_module_id',
      references: {
        model: 'course_modules',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lessonLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    additionalPdfs: {
      type: DataTypes.JSON, // JSON para almacenar una lista de URLs
      allowNull: true, // Puede ser opcional
      validate: {
        isArrayOfStrings(value: any) {
          if (
            !Array.isArray(value) ||
            value.some((v) => typeof v !== 'string')
          ) {
            throw new Error('additionalPdfs debe ser un array de strings.');
          }
          if (value.length > 2) {
            throw new Error('No se permiten más de 2 PDFs adicionales.');
          }
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Lesson',
    tableName: 'lessons',
    timestamps: true,
    hooks: {
      beforeCreate: (lesson: LessonModel) => {
        lesson.id = generateShortID();
      },
    },
  }
);

export default LessonModel;

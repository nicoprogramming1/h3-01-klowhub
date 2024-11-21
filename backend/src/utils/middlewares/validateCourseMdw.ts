import { body, ValidationChain } from 'express-validator';
import { Platform, Sector } from '../../models/interfaces/product.interface';
import { Competence } from '../../models/interfaces/course.interface';

// Validadores para el curso principal
export const validateCourse: ValidationChain[] = [
  body('course.title')
    .notEmpty()
    .withMessage('El título del curso es requerido.')
    .isString()
    .withMessage('El título del curso debe ser un texto.'),
  body('course.detail')
    .notEmpty()
    .withMessage('El detalle del curso es requerido.')
    .isString()
    .withMessage('El detalle debe ser un texto.'),
  body('course.competence')
    .optional()
    .isIn(Object.values(Competence))
    .withMessage('La competencia debe ser Basic o Intermediate.'),
  body('course.aboutLearn')
    .optional()
    .isString()
    .withMessage('Lo que aprenderás debe ser un texto.'),
  body('course.platform')
    .notEmpty()
    .withMessage('La plataforma es requerida.')
    .isIn(Object.values(Platform))
    .withMessage('La plataforma no es válida.'),
  body('course.imageMain')
    .notEmpty()
    .withMessage('La URL de la imagen es requerida.')
    .isURL()
    .withMessage('La URL de la imagen debe ser válida.'),
  body('course.sector')
    .notEmpty()
    .withMessage('El sector es requerido.')
    .isIn(Object.values(Sector))
    .withMessage('El sector no es válido.'),
  body('course.tags')
    .optional()
    .isString()
    .withMessage('Los tags deben ser un texto.'),
  body('course.price')
    .notEmpty()
    .withMessage('El precio es requerido.')
    .isFloat({ gt: 0 })
    .withMessage('El precio debe ser un número mayor a 0.'),
  body('course.ownerId')
    .notEmpty()
    .withMessage('El ID del propietario es requerido.')
    .isString()
    .withMessage('El ID del propietario debe ser un texto.'),
];

// Validadores para los módulos
export const validateModules: ValidationChain[] = [
  body('modules')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un módulo.'),
  body('modules.*.title')
    .notEmpty()
    .withMessage('El título del módulo es requerido.')
    .isString()
    .withMessage('El título del módulo debe ser un texto.'),
  body('modules.*.detail')
    .notEmpty()
    .withMessage('El detalle del módulo es requerido.')
    .isString()
    .withMessage('El detalle del módulo debe ser un texto.'),
];

// Validadores para las lecciones dentro de los módulos
export const validateLessons: ValidationChain[] = [
  body('modules.*.lessons')
    .isArray({ min: 1 })
    .withMessage('Cada módulo debe incluir al menos una lección.'),
  body('modules.*.lessons.*.title')
    .notEmpty()
    .withMessage('El título de la lección es requerido.')
    .isString()
    .withMessage('El título de la lección debe ser un texto.'),
  body('modules.*.lessons.*.detail')
    .notEmpty()
    .withMessage('El detalle de la lección es requerido.')
    .isString()
    .withMessage('El detalle de la lección debe ser un texto.'),
  body('modules.*.lessons.*.lessonLink')
    .notEmpty()
    .withMessage('El enlace de la lección es requerido.')
    .isURL()
    .withMessage('El enlace de la lección debe ser una URL válida.'),
  body('modules.*.lessons.*.additionalPdfs')
    .optional() // Puede ser vacío si no se suben PDFs
    .isArray()
    .withMessage('additionalPdfs debe ser un arreglo.')
    .custom((value) => {
      if (value && value.length > 2) {
        throw new Error('No se pueden cargar más de 2 PDFs.');
      }
      return true;
    })
    .custom((value) => {
      if (value && value.some((url: string) => !/^https?:\/\/.+\.(pdf)$/.test(url))) {
        throw new Error('Cada PDF debe ser una URL válida.');
      }
      return true;
    }),
];

// Combinar todos los validadores
export const validateCourseRegistration = [
  ...validateCourse,
  ...validateModules,
  ...validateLessons,
];

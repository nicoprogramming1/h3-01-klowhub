import { body, ValidationChain, param } from 'express-validator';
import { Competence, Platform, Sector, Tag } from '../models/enum/enum';

// Validadores para el curso principal
export const validateCourseRegister: ValidationChain[] = [
  body('course.title')
    .notEmpty()
    .withMessage('El título del curso es requerido.')
    .isString()
    .withMessage('El título del curso debe ser un texto.'),
  body('course.description')
    .notEmpty()
    .withMessage('El detalle del curso es requerido.')
    .isString()
    .withMessage('El detalle debe ser un texto.'),
  body('course.competence')
    .notEmpty()
    .withMessage('La competencia es requerida.')
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
  body('course.sector')
    .notEmpty()
    .withMessage('El sector es requerido.')
    .isIn(Object.values(Sector))
    .withMessage('El sector elegido no es válido.'),
  body('course.tags')
    .optional()
    .isArray()
    .withMessage('Los tags deben ser un arreglo.')
    .custom((value: Tag[]) => {
      if (!value.every((v) => Object.values(Tag).includes(v))) {
        throw new Error('Los tags contienen valores no válidos.');
      }
      return true;
    }),
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
export const validateModuleRegister: ValidationChain[] = [
  body('modules')
    .isArray({ min: 1 })
    .withMessage('Debe incluir al menos un módulo.'),
  body('modules.*.title')
    .notEmpty()
    .withMessage('El título del módulo es requerido.')
    .isString()
    .withMessage('El título del módulo debe ser un texto.'),
  body('modules.*.description')
    .notEmpty()
    .withMessage('El detalle del módulo es requerido.')
    .isString()
    .withMessage('El detalle del módulo debe ser un texto.'),
];

// Validadores para las lecciones dentro de los módulos
export const validateLessonsRegister: ValidationChain[] = [
  body('modules.*.lessons')
    .isArray({ min: 1 })
    .withMessage('Cada módulo debe incluir al menos una lección.'),
  body('modules.*.lessons.*.title')
    .notEmpty()
    .withMessage('El título de la lección es requerido.')
    .isString()
    .withMessage('El título de la lección debe ser un texto.'),
  body('modules.*.lessons.*.description')
    .notEmpty()
    .withMessage('El detalle de la lección es requerido.')
    .isString()
    .withMessage('El detalle de la lección debe ser un texto.'),
  body('modules.*.lessons.*.lessonLink')
    .notEmpty()
    .withMessage('El enlace de la lección es requerido.')
    .isURL()
    .withMessage('El enlace de la lección debe ser una URL válida.'),
];

// Combinar todos los validadores
export const validateCourseRegistration = [
  ...validateCourseRegister,
  ...validateModuleRegister,
  ...validateLessonsRegister,
];


// Validar el getOneCourse
export const validateFetchCourse: ValidationChain[] = [
  param('id')
    .notEmpty()
    .withMessage('Se requiere un id')
    .isString()
    .withMessage('El id debe ser un texto')
    .isLength({ min: 10, max: 10 })
    .withMessage('El id debe tener 10 caracteres'),
];

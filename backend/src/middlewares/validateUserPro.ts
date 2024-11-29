import { body, param, ValidationChain } from "express-validator";
import { Membership, PaymentMethod, Sector, Tool } from "../models/enum/enum";

export const validateUserPro: ValidationChain[] = [
  param("id")
    .isString()
    .isLength({ min: 10, max: 10 })
    .withMessage("El ID del usuario debe ser un string de 10 caracteres"),

  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

  body("description")
    .optional()
    .isString()
    .isLength({ max: 500 })
    .withMessage("La descripción no debe exceder los 500 caracteres"),

  body("country")
    .optional()
    .isString()
    .withMessage("El país debe ser un string válido"),

  body("sector")
    .isArray({ min: 1 })
    .withMessage("El sector debe ser un array con al menos un elemento")
    .custom((value) =>
      value.every((sector: string) =>
        (Object.values(Sector) as string[]).includes(sector)
      )
    )
    .withMessage("El sector contiene valores no válidos"),

  body("sectorsExperience")
    .optional()
    .isString()
    .withMessage("La experiencia en sectores debe ser un string"),

  body("tools")
    .isArray({ min: 1 })
    .withMessage("Las herramientas deben ser un array con al menos un elemento")
    .custom((value) =>
      value.every((tool: string) =>
        (Object.values(Tool) as string[]).includes(tool)
      )
    )
    .withMessage("Las herramientas contienen valores no válidos"),

  body("toolsExperience")
    .optional()
    .isString()
    .withMessage("La experiencia en herramientas debe ser un string"),

  body("portfolioLink")
    .optional()
    .isURL()
    .withMessage("El enlace del portafolio debe ser una URL válida"),

  body("academicFormation")
    .optional()
    .isString()
    .withMessage("La formación académica debe ser un string"),

  body("certificationLink")
    .optional()
    .isURL()
    .withMessage("El enlace de certificación debe ser una URL válida"),

  body("certificationFiles")
    .optional()
    .isArray()
    .withMessage("Los archivos de certificación deben ser un array")
    .custom((value) => value.every((file: string) => typeof file === "string"))
    .withMessage("Todos los archivos de certificación deben ser strings"),

  body("PaymentMethod")
    .isString()
    .isIn(Object.values(PaymentMethod) as string[])
    .withMessage("El método de pago es inválido"),

  body("accountData")
    .isString()
    .notEmpty()
    .withMessage("Los datos de cuenta son obligatorios"),

  body("imageProfile")
    .optional()
    .custom((value) => Buffer.isBuffer(value))
    .withMessage("La imagen de perfil debe ser un BLOB"),

  body("membership")
    .isString()
    .isIn(Object.values(Membership) as string[])
    .withMessage("La membresía es inválida"),

  body("isMentor")
    .optional()
    .isBoolean()
    .withMessage("El valor de mentor debe ser un booleano"),
];

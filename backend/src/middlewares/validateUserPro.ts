import { body, ValidationChain } from "express-validator";
import { Expertise, Language, PaymentMethod, Platform, Sector, Tool } from "../models/enum/enum";

export const validateUserPro: ValidationChain[] = [
  body("firstName")
    .isString()
    .notEmpty()
    .withMessage("El nombre es obligatorio"),

  body("lastName")
    .isString()
    .notEmpty()
    .withMessage("El apellido es obligatorio"),

  body("about")
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

  body("paymentMethod")
    .isString()
    .isIn(Object.values(PaymentMethod) as string[])
    .withMessage("El método de pago es inválido"),

  body("accountData")
    .isString()
    .notEmpty()
    .withMessage("Los datos de cuenta son obligatorios"),

  // Validación del mentor (opcional)
  body("mentor").optional().custom((mentor) => {
    // Validar que el objeto `mentor` tenga el esquema correcto
    if (typeof mentor !== "object") {
      throw new Error("El mentor debe ser un objeto válido");
    }

    const errors: string[] = [];

    // Validar cada campo del mentor
    if (!Array.isArray(mentor.expertiseArea) || mentor.expertiseArea.length < 1) {
      errors.push("El área de experiencia debe ser un array con al menos un elemento válido");
    } else if (
      !mentor.expertiseArea.every((area: string) =>
        (Object.values(Sector) as string[]).includes(area)
      )
    ) {
      errors.push("El área de experiencia contiene valores no válidos");
    }

    if (!Object.values(Expertise).includes(mentor.expertiseLevel)) {
      errors.push("El nivel de experiencia es inválido");
    }

    if (!Object.values(Platform).includes(mentor.plataformas)) {
      errors.push("La plataforma es inválida");
    }
    if (typeof mentor.mentoryCost !== "number" || mentor.mentoryCost <= 0) {
      errors.push("El costo de mentorías debe ser un número positivo");
    }

    if (!Array.isArray(mentor.language) || mentor.language.length < 1) {
      errors.push("Los idiomas deben ser un array con al menos un elemento válido");
    } else if (
      !mentor.language.every((lang: string) =>
        (Object.values(Language) as string[]).includes(lang)
      )
    ) {
      errors.push("Los idiomas contienen valores no válidos");
    }

    if (typeof mentor.aboutMentories !== "string" || mentor.aboutMentories.length > 500) {
      errors.push("La descripción de las mentorías debe ser un string de hasta 500 caracteres");
    }

    if (errors.length > 0) {
      throw new Error(errors.join(". "));
    }

    return true;
  }),
];


export const validateUpdateUserPro: ValidationChain[] = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("El nombre debe ser un string"),

  body("lastName")
    .optional()
    .isString()
    .withMessage("El apellido debe ser un string"),

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
    .optional()
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
    .optional()
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

  body("paymentMethod")
    .optional()
    .isString()
    .isIn(Object.values(PaymentMethod) as string[])
    .withMessage("El método de pago es inválido"),

  body("accountData")
    .optional()
    .isString()
    .withMessage("Los datos de cuenta deben ser un string"),
];

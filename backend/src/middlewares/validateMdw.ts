import { Request, Response, NextFunction } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';

export const validateRegister: ValidationChain[] = [
  check('longName')
    .notEmpty()
    .withMessage('El campo longName es requerido'),
  check('email')
    .notEmpty()
    .withMessage('El campo email es requerido')
    .isEmail()
    .withMessage('Debe proveer un email válido'),
  check('password')
    .notEmpty()
    .withMessage('El campo password es requerido')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
];

export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }
  next(); // Si no hay errores, pasa al siguiente middleware o controlador
};

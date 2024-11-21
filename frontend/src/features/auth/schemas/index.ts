import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Correo electrónico invalido",
  }),
  password: z.string().min(1, {
    message: "Ingresar Contraseña",
  }),
  code: z.string().optional(),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Correo electrónico invalido",
  }),
  password: z.string().min(8, {
    message: "Minimo 8 caracteres",
  }),
  longName: z.string().min(1, {
    message: "Ingrese su nombre",
  }),
});

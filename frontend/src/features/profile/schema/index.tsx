import { z } from "zod";

export const createProfileSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().trim().min(1, "Mínimo 1 caracter"),
  lastName: z.string().trim().min(1, "Mínimo 1 caracter"),
  description: z.string().trim().min(1, "Mínimo 1 caracter").optional(),
  imageProfile: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  tags: z
    .array(z.string().trim().min(1))
    .min(1, "Ingrese al menos una habilidad")
    .optional(),
  country: z.string().trim().min(1, "Mínimo 1 caracter").optional(),
  sector: z.array(z.string().trim().min(1, "Ingrese al menos un sector")),
  sectorsExperience: z.string().trim().min(1, "Mínimo 1 caracter"),
  tools: z.array(z.string().trim().min(1, "Ingrese al menos una herramienta")),
  toolsExperience: z.string().trim().min(1, "Mínimo 1 caracter"),
  portfolioLink: z.string().optional(),
  academicFormation: z.string().trim().min(1, "Mínimo 1 caracter"),
  certificationLink: z.string().optional(),
  paymentMethod: z.string().trim(), // Ajusta según la definición de PaymentMethod
  accountData: z.string().trim().min(1, "Mínimo 1 caracter"),

  isMentor: z.boolean(),
});

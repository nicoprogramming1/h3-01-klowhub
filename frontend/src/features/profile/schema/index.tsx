import { z } from "zod";

export const SectorEnum = z.enum([
  "E-commerce",
  "Industria",
  "Gestión del tiempo",
  "Gestión de proyectos",
  "Logística y transporte",
  "Gestión de inventarios",
  "Servicios profesionales",
  "Marketing digital",
  "Entretenimiento y medios",
  "Seguridad y vigilancia",
  "Investigación y desarrollo",
  "Administración",
  "Agicultura y medio ambiente",
  "Obras y construcción",
]);

export const ToolEnum = z.enum([
  "Google Sheets",
  "MySQL",
  "Looker Studio",
  "PostgreSQL",
  "Salesforce",
  "Dropbox",
  "Box",
  "Google Analytics",
  "Zapier",
  "Wordpress",
  "Shopify",
  "WhatsApp Api",
  "Power BI",
  "Twilo",
  "Google Calendar",
  "Google Drive",
]);

export const LanguageEnum = z.enum([
  "Español",
  "Inglés",
  "Alemán",
  "Portugués",
]);

export const PlatformEnum = z.enum(["AppSheet", "PowerApps"]);

export const ExpertiseEnum = z.enum(["Junior", "Semi senior", "Senior"]);

export const PaymentMethodEnum = z.enum(["Criptomonedas", "Paypal", "Stripe"]);

export const MentorDTOSchema = z.object({
});

export const createProfileProSchema = z.object({
  id: z.string().optional(),
  firstName: z.string().trim().min(1, "El nombre es obligatorio"),
  lastName: z.string().trim().min(1, "El apellido es obligatorio"),
  about: z.string().trim().min(1, "La descripción es obligatoria").optional(),
  imageProfile: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === "" ? undefined : value)),
    ])
    .optional(),
  tags: z
    .array(
      z.string().trim().min(1, "Cada habilidad debe tener al menos 1 carácter")
    )
    .optional(),
  country: z.string().trim().min(1, "Escriba el país").optional(),
  sector: z.array(SectorEnum).nonempty("Debe seleccionar al menos un sector"),
  sectorsExperience: z
    .string()
    .trim()
    .min(1, "Debe ingresar experiencia en los sectores")
    .optional(),
  tools: z
    .array(ToolEnum)
    .nonempty("Debe seleccionar al menos una herramienta"),
  toolsExperience: z
    .string()
    .trim()
    .min(1, "Debe describir su experiencia con las herramientas"),
  portfolioLink: z
    .string()
    .url("El enlace del portafolio debe ser una URL válida")
    .optional(),
  academicFormation: z
    .string()
    .trim()
    .min(1, "Debe ingresar su formación académica"),
  certificationLink: z
    .string()
    .url("El enlace de certificación debe ser una URL válida")
    .optional(),
  paymentMethod: PaymentMethodEnum,
  accountData: z
    .string()
    .trim()
    .min(1, "Debe proporcionar los datos de la cuenta"),
    mentor: MentorDTOSchema,
  isMentor: z.boolean(),
});

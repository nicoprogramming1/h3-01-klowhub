import * as z from "zod";

// Esquema para una lección
const LessonSchema = z.object({
  title: z.string(), // Título de la lección
  detail: z.string(), // Detalles de la lección
  lessonLink: z.string().url(), // Enlace de la lección
  additionalPdf1: z.string().url(), // Enlace al PDF adicional 1
  additionalPdf2: z.string().url(), // Enlace al PDF adicional 2
});

// Esquema para un módulo
const ModuleSchema = z.object({
  title: z.string(), // Título del módulo
  detail: z.string(), // Detalles del módulo
  lessons: z.array(LessonSchema), // Array de lecciones
});

// Esquema para el curso
const CourseSchema = z.object({
  title: z.string(), // Título del curso
  detail: z.string(), // Detalles del curso
  competence: z.string(), // Nivel de competencia
  aboutLearn: z.string(), // Temas a aprender
  platform: z.string(), // Plataforma
  imageMain: z.string().url(), // URL de la imagen principal
  sector: z.string(), // Sector
  tags: z.string(), // Etiquetas
  price: z.number().nonnegative(), // Precio no negativo
  ownerId: z.string(), // ID del propietario
});

// Esquema completo con módulos opcionales
const CompleteCourseSchema = z.object({
  course: CourseSchema, // Datos del curso
  modules: z.array(ModuleSchema).optional(), // Array de módulos opcional
});

export { CompleteCourseSchema, CourseSchema, ModuleSchema, LessonSchema };

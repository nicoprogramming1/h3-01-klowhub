import { Request, Response } from "express";
import courseService from "../services/courseService";

export const createCourse = async (req: Request, res: Response): Promise<void> => {
  try {
    const courseData = req.body;

    if (!courseData || !courseData.course || !courseData.modules) {
      res.status(400).json({
        message: "Faltan datos necesarios para crear el curso.",
      });
      return;
    }

    const newCourse = await courseService.saveCourse(courseData);

    res.status(201).json({
      message: "Curso registrado con éxito",
      data: newCourse,
    });
  } catch (error) {
    if (res.headersSent) {
      return; // Si los encabezados ya se enviaron, no hacer nada más
    }
    console.error("Error en createCourse:", error);
    res.status(500).json({
      message: "Error al crear el curso",
      error: error,
    });
  }
};

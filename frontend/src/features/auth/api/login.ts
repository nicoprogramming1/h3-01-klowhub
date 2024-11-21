import * as z from "zod";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import setToken from "./setToken";
import { LoginSchema } from "../schemas";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    toast.error("Campos Invalidos");
  }

  try {
    // window.alert(JSON.stringify(values));
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error al Ingresar");
      return { error: errorData.message || "Error al Ingresar" };
    }
    const data = await response.json();
    const { token } = data; // Suponiendo que el token viene en la respuesta con la clave "token"

    if (token) {
      // Establecer la cookie de autenticación

      setToken(token);

      toast.success("Usuario conectado");
      return { success: "Usuario conectado" };
    }
  } catch (error) {
    toast.error("Error de coneccion con el servidor");
    return { message: "Error de conexión con el servidor", error: error };
  }
};

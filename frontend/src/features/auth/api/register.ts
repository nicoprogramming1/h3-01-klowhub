import * as z from "zod";
import { toast } from "sonner";
import { RegisterSchema } from "../schemas";
import { API_URL } from "@/constants";

export const useregister = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    toast.error("Campos Invalidos");
  }

  try {
    // window.alert(JSON.stringify(values));
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error(errorData.message || "Error al registrar");
      return { error: errorData.message || "Error al registrar" };
    }
    toast.success("Registro exitoso");
    return { success: "Registro exitoso" };
  } catch (error) {
    toast.error("Error de coneccion con el servidor");
    return { message: "Error de conexión con el servidor", error: error };
  }
};

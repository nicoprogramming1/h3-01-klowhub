// "use server";
import * as z from "zod";
import jwt, { JwtPayload } from "jsonwebtoken";

import { API_URL } from "@/constants";
import { getToken } from "@/features/utils/token";
import { ProfileBasicSchema } from "../schema";
import { toast } from "sonner";

interface DecodedToken extends JwtPayload {
  id?: string; // Agrega aquí las propiedades esperadas
}

export const patchUser = async (values: z.infer<typeof ProfileBasicSchema>) => {
  const { setUser } = useAuth();
  const validateFields = ProfileBasicSchema.safeParse(values);
  if (!validateFields) {
    toast.error("Campos Invalidos");
  }
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Error al obtener el token de authenticacion");
    }

    const dataToken = jwt.decode(token.value) as DecodedToken | null;
    const { id } = dataToken || {};
    const response = await fetch(`${API_URL}/api/user/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.log({ errorData });
      toast.error(errorData.errors[0].msg || "Error al registrar");
      throw new Error(errorData.message || "Error al registrar");
    }
    const userBASIC = await response.json();
    console.log({ userBASIC });
    toast.success("Registro exitoso");
    return { success: "Registro exitoso" };
  } catch {
    toast.error("Error de coneccion con el servidor");
    throw new Error("Error de conexión con el servidor");
  }
};

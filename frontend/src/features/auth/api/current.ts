"use server";
import jwt, { JwtPayload } from "jsonwebtoken";

import { API_URL } from "@/constants";
import { getToken } from "@/features/utils/token";

interface DecodedToken extends JwtPayload {
  id?: string; // Agrega aquí las propiedades esperadas
}

export const currentUser = async () => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Error al obtener el token de authenticacion");
    }

    const dataToken = jwt.decode(token.value) as DecodedToken | null;
    const { id } = dataToken || {};
    const response = await fetch(`${API_URL}/api/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    // toast.success(`${dataToken?.id} está conectado`);
    const data = await response.json();
    console.log({ data });
    return data.user;
  } catch {
    throw new Error("Error de conexión con el servidor");
  }
};

"use server";

import { API_URL } from "@/constants";
import { getToken } from "@/features/utils/token";

export const getCourse = async (id: string) => {
  try {
    const token = await getToken();

    if (!token) {
      throw new Error("Error al obtener el token de authenticacion");
    }

    const response = await fetch(`${API_URL}/api/course/profile/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    const data = await response.json();
    console.log({ data });
    return data.data;
  } catch {
    throw new Error("Error de conexión con el servidor");
  }
};

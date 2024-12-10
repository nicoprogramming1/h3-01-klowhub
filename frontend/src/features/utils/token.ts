"use server";
import { AUTH_COOKIE } from "@/constants";
import { cookies } from "next/headers";

export const setToken = async (token: string | null) => {
  const cookieStore = await cookies();
  if (token) {
    cookieStore.set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      path: "/",
    });
  }
};

export const getToken = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE) || null;
  return token;
};

export const deleteToken = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};

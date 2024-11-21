"use server";
import { AUTH_COOKIE } from "@/constants";
import { cookies } from "next/headers";

const setToken = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set({
    name: AUTH_COOKIE,
    value: token,
    httpOnly: true,
    path: "/",
  });
};

export default setToken;

"use server";

import * as z from "zod";

// import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { LoginSchema } from "../schemas";

interface LoginProps {
  values: z.infer<typeof LoginSchema>;
  callbackUrl?: string | null;
}

export const login = async ({ values }: LoginProps) => {
  const validateFields = LoginSchema.safeParse(values);
  console.log({ validateFields });
  if (!validateFields.success) {
    return { error: "Password o email incorrecto" };
  }
  return { success: "Entrando..." };
  // const { email, password } = validateFields.data;
};

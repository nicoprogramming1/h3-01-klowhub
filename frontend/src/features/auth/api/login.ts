"use server";

import * as z from "zod";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

import { LoginSchema } from "../schemas";

interface LoginProps {
  values: z.infer<typeof LoginSchema>;
  callbackUrl?: string | null;
}

export const login = async ({ values, callbackUrl }: LoginProps) => {
  const validateFields = LoginSchema.safeParse(values);
  console.log({ validateFields });
  if (!validateFields.success) {
    return { error: "Password o email incorrecto" };
  }
  const { email, password } = validateFields.data;
};

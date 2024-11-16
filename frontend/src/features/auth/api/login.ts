"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
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

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: true,
      redirectTo: callbackUrl ?? DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Password o email incorrecto" };
        default:
          return { error: "Algo salió mal" };
      }
    }
    throw error;
  }
};

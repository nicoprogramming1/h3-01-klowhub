"use client";
import * as z from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import { login } from "../api/login";
import { RegisterSchema } from "../schemas";
import CardWrapper from "./card-wrapper";
import BackButton from "./back-button";

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      login({ values, callbackUrl })
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data?.error);
          }
          if (data?.success) {
            form.reset();
            setSuccess(data?.success);
          }
        })
        .catch(() => {
          setError("Algo ah salido mal");
        });
    });
  };

  return (
    <CardWrapper
      headerLabel="Regístrate"
      backButtonText="¿Ya tienes una cuenta?"
      backButtonLabel="Ingresa aquí"
      backButtonHref="/auth/login"
      showSocial
    >
      <div className="flex flex-col  gap-y-4 text-xs w-full lg:pt-4">
        <div className="flex flex-col gap-y-2 text-sm justify-center items-center lg:items-start ">
          <p className="text-start">Explora, aprende, enseña y conecta.</p>
          <p className="text-justify">
            Crea tu cuenta en KlowHub y accede a un mundo de posibilidades.
          </p>
        </div>
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 px-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Correo electrónico</FormLabel> */}
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Nombre Completo"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Correo electrónico</FormLabel> */}
                    <FormControl>
                      <Input
                        disabled={isPending}
                        {...field}
                        placeholder="Correo Electrónico"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Contraseña</FormLabel> */}
                    <FormControl>
                      <div className="relative">
                        <Input
                          disabled={isPending}
                          {...field}
                          placeholder="Contraseña"
                          type={showPassword ? "text" : "password"}
                        />

                        <p
                          onClick={togglePasswordVisibility}
                          className="absolute right-0 top-0 h-full flex items-center  border-background    rounded-r-sm hover:bg-opacity-50 dark:hover:bg-opacity-50 hover:cursor-pointer px-2 text-sm"
                        >
                          {showPassword ? <IoIosEye /> : <IoIosEyeOff />}
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <BackButton
                      href={"/auth/reset"}
                      label={"Click aquí"}
                      text="¿Olvido su contraseña?"
                      className=" justify-start gap-x-1"
                    />
                    <BackButton
                      href={"/"}
                      label={"Condiciones de uso"}
                      text="Al registrarte aceptas nuestras"
                      className=" pb-0 gap-x-0"
                    />{" "}
                    <BackButton
                      href={"/"}
                      label={"Politicas de privacidad"}
                      text=" y "
                      className=" gap-x-0 "
                    />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <div className="flex justify-center ">
              <Button
                disabled={isPending}
                type="submit"
                className=""
                variant={"primario"}
                size={"lg"}
              >
                Continuar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </CardWrapper>
  );
};

export default RegisterForm;

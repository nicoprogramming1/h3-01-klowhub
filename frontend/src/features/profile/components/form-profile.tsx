"use client";
import { z } from "zod";

import { ImageIcon } from "lucide-react";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DashboardContent from "@/components/content-dashboard";
import PartBody from "@/components/part-body";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createProfileSchema } from "../schema";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import { toast } from "sonner";

const FormProfile = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<z.infer<typeof createProfileSchema>>({
    resolver: zodResolver(createProfileSchema),
    defaultValues: {
      imageProfile: "",
      tags: [],
      isMentor: false,
    },
  });

  const onSubmit = (data: z.infer<typeof createProfileSchema>) => {
    const payload = {
      ...data,
      // tags: data.tags.join(","), // Convierte a cadena aquí
    };
    window.alert(JSON.stringify(payload));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("imageProfile", file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onError = (errors: any) => {
    // Convierte los errores a un mensaje legible
    const errorMessages = Object.entries(errors)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .map(([field, error]: any) => `${field}: ${error.message}`)
      .join("\n");

    toast.error(`Errores en el formulario:\n${errorMessages}`);
  };
  return (
    <DashboardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="w-full h-full flex flex-col gap-2 "
        >
          <PartBody
            title="Mi Perfil"
            className="bg-transparent dark:bg-transparent py-0 sm:py-0"
          ></PartBody>

          <div className="flex flex-col sm:flex-row gap-2 w-full h-full">
            <PartBody className="sm:w-2/3 gap-2 h-full">
              <div className="flex flex-row gap-2 w-full h-full">
                <div className="flex flex-col gap-2 w-1/3">
                  <FormField
                    control={form.control}
                    name="imageProfile"
                    render={({ field }) => (
                      <div className="flex flex-col items-center gap-5">
                        {field.value ? (
                          <div className="flex ">
                            <Avatar className="size-24 hover:opacity-75 transition ">
                              <AvatarImage
                                src={
                                  field.value instanceof File
                                    ? URL.createObjectURL(field.value)
                                    : field.value
                                }
                                alt="header"
                                className="rounded-full"
                              />
                            </Avatar>
                          </div>
                        ) : (
                          <Avatar className="size-24 ">
                            <AvatarFallback className="bg-white dark:bg-muted">
                              <ImageIcon className="size-[36px] text-neutral-500  dark:text-neutral-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className="flex flex-col gap-1 justify-center items-center">
                          <p className="text-xs text-primario-300">
                            Sube tu foto de perfil{" "}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            JPG, PNG, SVG or JPEG
                          </p>
                          <input
                            className="hidden"
                            type="file"
                            accept=".jpg, .jpeg, .png, .svg"
                            ref={inputRef}
                            onChange={handleImageChange}
                            disabled={false}
                          />
                          {field.value ? (
                            <Button
                              type="button"
                              disabled={false}
                              variant={"destructive"}
                              size="sm"
                              className="w-fit "
                              onClick={() => {
                                field.onChange(null);
                                if (inputRef.current)
                                  inputRef.current.value = "";
                              }}
                            >
                              Borrar Imagen
                            </Button>
                          ) : (
                            <Button
                              type="button"
                              disabled={false}
                              variant={"teritary"}
                              size="sm"
                              className="w-fit "
                              onClick={() => inputRef.current?.click()}
                            >
                              Subir Imagen
                            </Button>
                          )}
                        </div>
                      </div>
                    )}
                    // TODO: Add error handling
                  />

                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Nombre</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingrese nombre"
                            className="text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Nombre</FormLabel> */}
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Ingrese Apellido"
                            className="text-xs"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-2 w-2/3 text-sm justify-center h-full ">
                  <p>
                    Vendedor{" "}
                    <span className="bg-custom-gradient-light dark:bg-custom-gradient-dark p-1 rounded-sm">
                      PRO
                    </span>
                  </p>{" "}
                  <p>Escribe una breve descripción de ti</p>
                  <p className="text-muted-foreground text-xs">
                    Esta será la información que los compradores verán cuando
                    visiten tu perfil. Te recomendamos incluir tus áreas de
                    experiencia y los tipos de soluciones que ofreces.
                  </p>
                  <div className="flex flex-col h-full">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem className="flex flex-col w-full h-full">
                          <FormLabel>Descripcion</FormLabel>
                          <FormControl className="">
                            <Textarea
                              {...field}
                              placeholder="Descripcion"
                              className="w-full h-full text-xs"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full h-full">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Habilidades</FormLabel>
                      <FormControl>
                        <div className="w-full flex flex-col gap-2">
                          <div className="flex flex-wrap gap-2 items-center w-full">
                            {field.value?.map((tag: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit"
                              >
                                {tag}
                                <button
                                  type="button"
                                  className="text-red-500"
                                  onClick={() => {
                                    const updatedTags = [...field.value];
                                    updatedTags.splice(index, 1); // Elimina el tag
                                    field.onChange(updatedTags);
                                  }}
                                >
                                  ×
                                </button>
                              </span>
                            ))}
                            <Input
                              type="text"
                              placeholder="Agregar una habilidad"
                              className=" text-xs"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                  e.preventDefault();
                                  const newTag = e.currentTarget.value
                                    .trim()
                                    .toUpperCase();
                                  if (newTag && !field.value.includes(newTag)) {
                                    field.onChange([...field.value, newTag]);
                                    e.currentTarget.value = ""; // Limpia el input
                                  }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </PartBody>

            <PartBody className="w-full sm:w-1/3 sm:p-0 sm:px-0 flex-col h-full  justify-start gap-2 rounded-lg ">
              <div className="flex  w-full min-h-[150px]  relative overflow-hidden rounded-t-lg">
                <Image src="/images/default.png" alt="header" fill />
              </div>
              <div className="flex flex-col w-full h-full  justify-around items-center text-sm gap-2 p-2">
                <h1>Optimiza tu perfil</h1>
                <p className="text-xs text-muted-foreground">
                  Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé
                  a recursos exclusivos que te ayudarán a mejorar tus
                  habilidades y maximizar el potencial de tus proyectos.
                </p>
                <Button variant="outline" className="w-full">
                  Ir a los recursos
                </Button>
              </div>
            </PartBody>
          </div>

          <Button type="submit">submit</Button>
        </form>
      </Form>
    </DashboardContent>
  );
};

export default FormProfile;

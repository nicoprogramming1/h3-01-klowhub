"use client";
import { z } from "zod";
import Image from "next/image";
import { toast } from "sonner";

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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  createProfileProSchema,
  ExpertiseEnum,
  LanguageEnum,
  PlatformEnum,
  SectorEnum,
  ToolEnum,
} from "../schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DocumentUpload from "@/components/document-upload";
import { Checkbox } from "@/components/ui/checkbox";

const FormProfilePro = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const sectorOptions = Object.values(SectorEnum.Enum);
  const toolsOptions = Object.values(ToolEnum.Enum);
  const languageOptions = Object.values(LanguageEnum.Enum);
  const PlatformEnum = Object.values(PlatformEnum.Enum);
  const ExpertiseEnum = Object.values(ExpertiseEnum.Enum);

  const form = useForm<z.infer<typeof createProfileProSchema>>({
    resolver: zodResolver(createProfileProSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      about: "",
      imageProfile: undefined,
      tags: [],
      country: "",
      sector: [],
      sectorsExperience: "",
      tools: [],
      toolsExperience: "",
      portfolioLink: "",
      academicFormation: "",
      certificationLink: "",
      paymentMethod: "Criptomonedas", // Uno de los valores del enum PaymentMethodEnum
      accountData: "",
      mentor: {
        expertiseArea: [],
        expertiseLevel: undefined, // Enum: "Junior" | "Semi senior" | "Senior"
        platform: [], // Enum: "AppSheet" | "PowerApps"
        mentoryCost: 0,
        aboutMentories: "",
        language: [], // Enum: "Español" | "Inglés" | "Alemán" | "Portugués"
      },
      isMentor: false,
    },
  });

  const onSubmit = (data: z.infer<typeof createProfileProSchema>) => {
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

  // const isMentor = form.watch("isMentor");
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
                      name="about"
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
              <div className="flex flex-col lg:flex-row gap-2 w-full h-full">
                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full h-full">
                      <FormLabel>Habilidades</FormLabel>
                      <FormControl>
                        <div className="w-full flex flex-col  gap-2">
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
                                    const updatedTags = [
                                      ...(field.value || []),
                                    ];
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
                              className=" text-xs lg:w-[180px]  w-full"
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === ",") {
                                  e.preventDefault();
                                  const newTag = e.currentTarget.value
                                    .trim()
                                    .toUpperCase();
                                  if (
                                    newTag &&
                                    !field.value?.includes(newTag)
                                  ) {
                                    field.onChange([
                                      ...(field.value || []),
                                      newTag,
                                    ]);
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

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="flex flex-col  h-full justify-end ">
                      <FormLabel>País</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Ingrese el país"
                          className="text-xs"
                        />
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

          <PartBody className="text-sm gap-3">
            <h1 className=" text-primario dark:text-primario-300 text-lg">
              Experiencia
            </h1>
            <p>Completa tu perfil PRO</p>
            <p className="text-muted-foreground text-xs">
              Estamos a solo un paso de completar tu perfil de vendedor.
              Proporciónanos algunos detalles adicionales para poder validar tu
              identidad y ofrecerte la mejor experiencia como creador en nuestra
              plataforma.
            </p>

            <div className="flex flex-col md:flex-row gap-2 w-full h-full">
              <div className="flex flex-col w-full h-full gap-2">
                <FormField
                  control={form.control}
                  name="sector"
                  render={({ field }) => {
                    const handleAddSector = (
                      newSector: (typeof SectorEnum._def.values)[number]
                    ) => {
                      if (newSector && !field.value?.includes(newSector)) {
                        field.onChange([...(field.value || []), newSector]);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>
                          Seleccioná los sectores en las que tenés experiencia
                        </FormLabel>
                        <FormControl>
                          <div className="w-full flex flex-col gap-2">
                            {/* Lista de sectores seleccionados */}
                            <div className="flex flex-wrap gap-2 items-center w-full">
                              {field.value?.map(
                                (item: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit"
                                  >
                                    {item}
                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() => {
                                        const updatedItem = [...field.value];
                                        updatedItem.splice(index, 1); // Elimina el tag
                                        field.onChange(updatedItem);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              )}
                            </div>

                            <div className="flex flex-row gap-2  items-center">
                              {/* Select para sectores existentes y opción de agregar */}
                              <Select
                                onValueChange={(value) => {
                                  const validSector =
                                    SectorEnum.safeParse(value);
                                  if (validSector.success) {
                                    handleAddSector(validSector.data);
                                  } else {
                                    alert(
                                      "El sector seleccionado no es válido"
                                    );
                                  }
                                }}

                                // onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full  ">
                                  <SelectValue placeholder="Selecciona sectores" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Sectores</SelectLabel>
                                    {sectorOptions.map((sector) => (
                                      <SelectItem key={sector} value={sector}>
                                        {sector}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="sectorsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Describa la experiencia que posee en estos sectores.
                      </FormLabel>
                      <FormControl className="">
                        <Textarea
                          {...field}
                          placeholder="Describa aquí tu experiencia..."
                          className="w-full h-fit sm:h-fit  text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col w-full h-full gap-2">
                <FormField
                  control={form.control}
                  name="tools"
                  render={({ field }) => {
                    const handleAddItem = (
                      newItem: (typeof ToolEnum._def.values)[number]
                    ) => {
                      if (newItem && !field.value?.includes(newItem)) {
                        field.onChange([...(field.value || []), newItem]);
                      }
                    };
                    return (
                      <FormItem>
                        <FormLabel>
                          ¿Con qué herramientas tenés experiencia?
                        </FormLabel>
                        <FormControl>
                          <div className="w-full flex flex-col gap-2">
                            {/* Lista de sectores seleccionados */}
                            <div className="flex flex-wrap gap-2 items-center w-full">
                              {field.value?.map(
                                (item: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit"
                                  >
                                    {item}
                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() => {
                                        const updatedItem = [...field.value];
                                        updatedItem.splice(index, 1); // Elimina el tag
                                        field.onChange(updatedItem);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              )}
                            </div>

                            <div className="flex flex-row gap-2 justify-center items-center">
                              {/* Select para sectores existentes y opción de agregar */}
                              <Select
                                onValueChange={(value) => {
                                  const validItem = ToolEnum.safeParse(value);
                                  if (validItem.success) {
                                    handleAddItem(validItem.data);
                                  } else {
                                    alert(
                                      "El sector seleccionado no es válido"
                                    );
                                  }
                                }}
                              >
                                <SelectTrigger className="w-full  ">
                                  <SelectValue placeholder="Selecciona Herramientas" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Herramientas</SelectLabel>
                                    {toolsOptions.map((item) => (
                                      <SelectItem key={item} value={item}>
                                        {item}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="toolsExperience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Describa la experiencia que posee en estas herramientas.
                      </FormLabel>
                      <FormControl className="">
                        <Textarea
                          {...field}
                          placeholder="Describa aquí tu experiencia..."
                          className="w-full h-fit sm:h-fit  text-xs"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <p>
              Añade un enlace a tu portafolio o sitio web{" "}
              <span className="text-muted-foreground">(Opcional)</span>
            </p>

            <p className="text-muted-foreground text-xs">
              Si tienes un portafolio en línea, este es el lugar perfecto para
              destacarlo y mostrar tu trabajo a posibles compradores.
            </p>

            <FormField
              control={form.control}
              name="portfolioLink"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full md:w-1/2 ">
                  <FormLabel>Portafolio Link</FormLabel>
                  <FormControl className="">
                    <Input
                      {...field}
                      placeholder="https://www.example.com"
                      className="text-xs"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </PartBody>

          <PartBody className="text-sm gap-2 flex-col sm:flex-row h-full">
            <div className="flex flex-col  gap-3 sm:w-2/3 h-full w-full">
              <h1 className=" text-primario dark:text-primario-300 text-lg font-semibold">
                Educación
              </h1>
              <p className="text-xs">
                Detallá la formación académica y las certificaciones que avalen
                tu conocimiento.
              </p>

              <FormField
                control={form.control}
                name="academicFormation"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full h-full">
                    <FormLabel>Ingresá tu formación académica</FormLabel>
                    <FormControl className="">
                      <Textarea
                        {...field}
                        placeholder="Ingrese aquí tu formación académica..."
                        className="w-full h-full   text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col sm:w-1/3 gap-2">
              <p>Agregá certificaciones relevantes</p>
              <div className="flex w-full justify-center items-center">
                <DocumentUpload />
              </div>

              <FormField
                control={form.control}
                name="certificationLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Certificaciones</FormLabel>
                    <FormControl className="">
                      <Input
                        {...field}
                        placeholder="https://www.example.com"
                        className="text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </PartBody>

          <PartBody className="text-sm gap-3">
            <p className=" text-primario dark:text-primario-300 font-semibold text-lg">
              Datos de Cobro
            </p>
            <p>Elige cómo te gustaría recibir los pagos de tus ventas.</p>
            <div className="flex flex-col sm:flex-row w-full gap-2">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full sm:w-1/2">
                    <FormLabel>Selecciona el método de pago</FormLabel>
                    <FormControl className="w-full">
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="w-full ">
                          <SelectValue placeholder="Selecciona el método" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Métodos de Pago</SelectLabel>
                            <SelectItem value="criptomonedas">
                              Criptomonedas
                            </SelectItem>
                            <SelectItem value="paypal">Paypal</SelectItem>
                            <SelectItem value="stripe">Stripe</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accountData"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full sm:w-1/2">
                    <FormLabel>Datos de la cuenta</FormLabel>
                    <FormControl className="">
                      <Input
                        {...field}
                        placeholder="1002003456"
                        className="text-xs"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </PartBody>

          <PartBody className="text gap-3">
            <p className=" text-primario dark:text-primario-300 font-semibold">
              Ofrece sesiones de mentoría
            </p>
            <p className="text-sm dark:text-muted-foreground">
              Además de vender tus cursos y apps, ahora puedes ofrecer sesiones
              de mentoría personalizadas a otros creadores y emprendedores.
              Comparte tu experiencia y ayuda a otros a alcanzar sus objetivos,
              mientras expandes tu red y monetizas tus conocimientos.
              Conviértete en mentor y deja tu huella en la comunidad.
            </p>
            <FormField
              control={form.control}
              name="isMentor"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Activar perfil como mentor</FormLabel>
                    <FormDescription>
                      Tendrás acceso a funcionalidades de mentor
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* {isMentor && (
              <div className="flex flex-col gap-2 w-full">
                hola
                <FormField
                  control={form.control}
                  name="mentor.expertiseArea"
                  render={({ field }) => {
                    const handleAddItem = (
                      newSector: (typeof SectorEnum._def.values)[number]
                    ) => {
                      if (newSector && !field.value?.includes(newSector)) {
                        field.onChange([...(field.value || []), newSector]);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>¿En qué área eres experto?</FormLabel>
                        <FormControl>
                          <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2 items-center w-full">
                              {field.value?.map(
                                (item: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit"
                                  >
                                    {item}
                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() => {
                                        const updatedItem = [...field.value];
                                        updatedItem.splice(index, 1); // Elimina el tag
                                        field.onChange(updatedItem);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              )}
                            </div>

                            <div className="flex flex-row gap-2  items-center">
                              <Select
                                onValueChange={(value) => {
                                  const validSector =
                                    SectorEnum.safeParse(value);
                                  if (validSector.success) {
                                    handleAddItem(validSector.data);
                                  } else {
                                    alert(
                                      "El sector seleccionado no es válido"
                                    );
                                  }
                                }}

                                // onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full  ">
                                  <SelectValue placeholder="Selecciona sectores" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Sectores</SelectLabel>
                                    {sectorOptions.map((sector) => (
                                      <SelectItem key={sector} value={sector}>
                                        {sector}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="mentor.expertiseLevel"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Indica tu nivel de expertise.</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            {ExpertiseEnum.map((expertise) => (
                              <div
                                key={expertise}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={field.value === expertise}
                                  onCheckedChange={(checked) =>
                                    field.onChange(checked ? expertise : "")
                                  }
                                />
                                <label>{expertise}</label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="mentor.platform"
                  render={({ field }) => {
                    const handleToggleItem = (
                      sector: (typeof PlatformEnum._def.values)[number]
                    ) => {
                      if (field.value?.includes(sector)) {
                        // Eliminar si ya está seleccionado
                        field.onChange(
                          field.value.filter((item) => item !== sector)
                        );
                      } else {
                        // Agregar si no está seleccionado
                        field.onChange([...(field.value || []), sector]);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>¿En qué área eres experto?</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-4">
                            {PlatformEnum.map((sector) => (
                              <div
                                key={sector}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  checked={field.value?.includes(sector)}
                                  onCheckedChange={() =>
                                    handleToggleItem(sector)
                                  }
                                />
                                <label className="text-sm">{sector}</label>
                              </div>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="mentor.mentoryCost"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          ¿Cuál es el costo de tu hora de mentoria?
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            placeholder="INgrese el moonto por hora"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="mentor.aboutMentories"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>
                          Cuenta un poco más sobre tus mentorías
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Ingrese aquí tus mentorías"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name="mentor.language"
                  render={({ field }) => {
                    const handleAddItem = (
                      newSector: (typeof LanguageEnum._def.values)[number]
                    ) => {
                      if (newSector && !field.value?.includes(newSector)) {
                        field.onChange([...(field.value || []), newSector]);
                      }
                    };

                    return (
                      <FormItem>
                        <FormLabel>
                          ¿En qué idiomas ofreces las mentorias?
                        </FormLabel>
                        <FormControl>
                          <div className="w-full flex flex-col gap-2">
                            <div className="flex flex-wrap gap-2 items-center w-full">
                              {field.value?.map(
                                (item: string, index: number) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit"
                                  >
                                    {item}
                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() => {
                                        const updatedItem = [...field.value];
                                        updatedItem.splice(index, 1); // Elimina el tag
                                        field.onChange(updatedItem);
                                      }}
                                    >
                                      ×
                                    </button>
                                  </span>
                                )
                              )}
                            </div>

                            <div className="flex flex-row gap-2  items-center">
                              <Select
                                onValueChange={(value) => {
                                  const validSector =
                                    LanguageEnum.safeParse(value);
                                  if (validSector.success) {
                                    handleAddItem(validSector.data);
                                  } else {
                                    alert(
                                      "El sector seleccionado no es válido"
                                    );
                                  }
                                }}

                                // onValueChange={field.onChange}
                              >
                                <SelectTrigger className="w-full  ">
                                  <SelectValue placeholder="Selecciona sectores" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Sectores</SelectLabel>
                                    {languageOptions.map((sector) => (
                                      <SelectItem key={sector} value={sector}>
                                        {sector}
                                      </SelectItem>
                                    ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            )} */}
          </PartBody>
          <Button type="submit">submit</Button>
        </form>
      </Form>
    </DashboardContent>
  );
};

export default FormProfilePro;

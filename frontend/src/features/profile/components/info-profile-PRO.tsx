"use client";

import DashboardContent from "@/components/content-dashboard";
import LoadingDefault from "@/components/loading";
import PartBody from "@/components/part-body";
import { StarRating } from "@/components/start-rating";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/auth-provider";
import { ImageIcon, TvMinimalPlay } from "lucide-react";
import Image from "next/image";

export default function InfoProfilePRO() {
  const { user } = useAuth();
  console.log({ user });

  if (!user) {
    return <LoadingDefault />;
  }

  return (
    <DashboardContent>
      <PartBody
        title="Mi Perfil"
        className="bg-transparent dark:bg-transparent py-0 sm:py-0"
      ></PartBody>

      <div className="flex flex-col sm:flex-row gap-2 w-full h-full">
        <PartBody className="sm:w-2/3 gap-4  pt-6 h-full">
          <div className="flex flex-row gap-2 w-full h-full">
            <div className="flex flex-col gap-2 w-1/3 md:w-1/4 items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                {user.imageProfile ? (
                  <div className="flex ">
                    <Avatar className="size-24  transition ">
                      <AvatarImage
                        src={user.imageProfile}
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
                <p className=" font-semibold">{user.longName}</p>{" "}
              </div>
            </div>
            <div className="flex flex-col gap-5 w-2/3 md:w-3/4 text-sm justify-between  ">
              <div className="flex w-full items-center justify-between">
                <p className="text-sm ">
                  Usuario
                  <span className="bg-custom-gradient-light dark:bg-custom-gradient-dark p-1 rounded-sm">
                    {user.membership || "PRO"}
                  </span>
                </p>{" "}
                <Button variant="outline" className="">
                  Editar
                </Button>
              </div>

              <div className="flex flex-col h-full w-full bg-white/40 dark:bg-gray-800 px-4 py-3 rounded-md  gap-2 ">
                <p>Sobre mi </p>
                <p className=" text-xs text-muted-foreground">
                  {user.about || "Edita tu perfil para agregar tu biografía"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center justify-stretch w-full">
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"REACT"}
            </span>
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"UX/UI"}
            </span>
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"JAVASCRIPT"}
            </span>
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"REACT"}
            </span>
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"REACT"}
            </span>
            <span className="px-3 py-1  rounded-sm flex items-center gap-2 border border-primary text-[10px] h-fit">
              {"UX/UI"}
            </span>
          </div>
        </PartBody>

        <PartBody className="w-full sm:w-1/3 sm:p-0 sm:px-0 flex-col h-full  justify-start gap-2 rounded-lg ">
          <div className="flex  w-full min-h-[130px]  relative overflow-hidden rounded-t-lg">
            <Image src="/images/card/image1.png" alt="header" fill />
          </div>
          <div className="flex flex-col w-full h-full  justify-around items-center text-sm gap-2 p-2">
            <h1>Optimiza tu perfil</h1>
            <p className="text-xs text-muted-foreground">
              Optimizá tu perfil y llevá tus apps al siguiente nivel. Accedé a
              recursos exclusivos que te ayudarán a mejorar tus habilidades y
              maximizar el potencial de tus proyectos.
            </p>
            <Button variant="outline" className="w-full">
              Ir a los recursos
            </Button>
          </div>
        </PartBody>
      </div>

      <PartBody className="text-sm gap-3 ">
        <h1 className=" text-primario dark:text-primario-300">
          Ofrece sesiones de mentoría
        </h1>
        <p className="text-xs dark:text-muted-foreground">
          Además de vender tus cursos y apps, ahora puedes ofrecer sesiones de
          mentoría personalizadas a otros creadores y emprendedores. Comparte tu
          experiencia y ayuda a otros a alcanzar sus objetivos, mientras
          expandes tu red y monetizas tus conocimientos. Conviértete en mentor y
          deja tu huella en la comunidad.
        </p>
        <div className="flex flex-row text-xs gap-2 items-center">
          <TvMinimalPlay className="size-5" /> <span>50 Sesiones</span>{" "}
          <span>(35 Reseñas)</span>{" "}
          <p>
            <span>idioma:</span> Español
          </p>
        </div>
        <div className="flex justify-between">
          <p>6USD/Hora</p>
          <Button variant={"primario"} size={"sm"}>
            {" "}
            Reserva una Membresia
          </Button>
        </div>
      </PartBody>
      <div className="flex flex-col md:flex-row gap-2 w-full h-full">
        <PartBody className="text-sm gap-4 ">
          <h1 className=" text-primario dark:text-primario-300 font-semibold">
            Experiencia
          </h1>
          <p>Completa tu perfil PRO</p>
          <p className="text-xs text-muted-foreground">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
          <p>Selecciona los sectores en las que tenés experiencia</p>
          <div className="flex gap-3 items-center text-xs">
            <div className="border rounded-lg border-primario-300 text-primario-300 bg-transparent px-2 py-1">
              <p>Sector de Experiencia</p>
            </div>
            <div className="border rounded-lg border-primario-300 text-primario-300 bg-transparent px-2 py-1">
              <p>Sector de Experiencia</p>
            </div>
          </div>
          <p>Experiencia en otros sectores</p>
          <p className="text-xs  text-muted-foreground">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
          <p>Herramientas utilizadas</p>
          <div className="flex gap-3 items-center text-xs">
            <div className="border rounded-lg border-primario-300 text-primario-300 bg-transparent px-2 py-1">
              <p>Herramienta</p>
            </div>
            <div className="border rounded-lg border-primario-300 text-primario-300 bg-transparent px-2 py-1">
              <p>Herramienta</p>
            </div>
          </div>
          <p>Experiencia con las Herramientas utilizadas</p>
          <p className="text-xs  text-muted-foreground">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
          <p>Enlace al porfolio</p>
          <Button
            className="text-xs p-0 text-muted-foreground max-w-fit"
            variant="link"
            size="sm"
          >
            http//www.porfolio.com
          </Button>
        </PartBody>
        <PartBody className="text-sm gap-4 h-full items-start justify-start">
          <h1 className=" text-primario dark:text-primario-300 font-semibold">
            Educación
          </h1>
          <p>Formación académica</p>
          <p className="text-xs ">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
          <p className="text-xs ">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
          <p className="text-xs ">
            Estamos a solo un paso de completar tu perfil de vendedor.
            Proporciónanos algunos detalles adicionales para poder validar tu
            identidad y ofrecerte la mejor experiencia como creador en nuestra
            plataforma.
          </p>
        </PartBody>
      </div>
      <PartBody className="text-sm gap-4 h-full items-start justify-start">
        <h1 className=" text-primario dark:text-primario-300 font-semibold">
          Comentarios y valoraciones
        </h1>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-row gap-x-2">
            <p>Maria Lopez</p>
            <StarRating rating={2.8} />
          </div>
          <p className="text-xs">
            Nunca pensé que podría organizar mi negocio tan rapido Gracias a
            Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy
            recomendado!
          </p>
          <Separator className="w-full" />
        </div>
        <div className="flex flex-col gap-y-4 w-full">
          <div className="flex flex-row gap-x-2">
            <p>Maria Lopez</p>
            <StarRating rating={4.4} />
          </div>
          <p className="text-xs">
            Nunca pensé que podría organizar mi negocio tan rapido Gracias a
            Sebastián, ahora puedo automatizar varias tareas en mi trabajo. ¡Muy
            recomendado!
          </p>
          <Separator className="w-full" />
        </div>
      </PartBody>
    </DashboardContent>
  );
}

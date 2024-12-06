import { BsClockHistory } from "react-icons/bs";
import Image from "next/image";

import DashboardContent from "@/components/content-dashboard";
import PartBody from "@/components/part-body";

import { CourseData } from "../interfaces";
import { StarRating } from "@/components/start-rating";
import CarouselImages from "@/components/carousel-images";
import { fakeDataImages } from "@/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/auth-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Box,
  FileChartColumnIncreasing,
  MessageSquare,
  ShoppingCart,
  Star,
  Youtube,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import CarouselCourses from "@/features/dashboard/components/carousel-courses";

interface CourseInfoProps {
  info: CourseData;
}

const CourseInfo = ({ info }: CourseInfoProps) => {
  const { user } = useAuth();

  const avatarFallback = user?.longName
    ? user?.longName.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase() ?? "U";

  return (
    <DashboardContent>
      {/* <div className="flex flex-col w-full h-full gap-2 "> */}
      <div className="flex flex-col w-full h-full gap-2 sm:flex-row">
        <div className="flex flex-col w-full h-full sm:basis-4/6 gap-2">
          <PartBody title={info.title} className="gap-y-2">
            <div className="flex gap-x-2  items-center">
              <BsClockHistory />{" "}
              <p className="text-xs">Ultima actualización: 6/2024</p>
            </div>
            <p>{info.description}</p>
            <StarRating rating={info.calification} />

            <CarouselImages
              images={fakeDataImages}
              className="w-full max-w-[150px] h-[150px]"
            />
          </PartBody>
          <PartBody className="sm:px-4 gap-y-4 text-sm">
            <div className="flex flex-row gap-2">
              <div className="flex flex-col items-center justify-center gap-2 ">
                <Avatar className="size-12">
                  <AvatarImage src={user?.image} alt="header" />
                  <AvatarFallback className="text-white bg-primario-300  dark:bg-primario font-medium flex items-center justify-center text-2xl">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="text-xs text-primario hover:underline dark:text-primario-200 w-[55px]">
                  <Link href={"/profile"}>Ver perfil</Link>
                </div>
              </div>
              <div className="flex flex-col  px-2 gap-2">
                <h1 className="text-sm">Diego Martínez </h1>
                <p className="text-xs text-justify leading-normal">
                  Experto en desarrollo de aplicaciones no-code con más de 5
                  años de experiencia en AppSheet, ayudando a empresas y
                  emprendedores a optimizar sus procesos de manera eficiente y
                  accesible.
                </p>
              </div>
            </div>
            <h2>
              Una aplicación que te ayudará a gestionar mejor tus proyectos
            </h2>
            <p className="text-xs text-justify leading-normal">
              ¿Quieres optimizar tus procesos y mejorar la productividad de tu
              pequeña empresa sin invertir una fortuna en desarrollo de
              software? Esta aplicación te permitirá gestionar tus proyectos,
              clientes, inventario y mucho más. Imagina tener una herramienta a
              medida que se adapte a las necesidades únicas de tu negocio, sin
              necesidad de escribir una sola línea de código.Gracias a esta
              aplicación podrás: automatizar tareas repetitivas, mejorar la
              colaboración entre equipos, acceder a tus datos en tiempo real y
              tomar decisiones más informadas.
            </p>

            <h2>Todo para la gestión de tus proyectos</h2>

            <ul
              id="taskList"
              className="list-disc pl-5 marker:text-primario dark:marker:text-primario-300 flex flex-col gap-y-2"
            >
              <li className="text-xs ">
                Organiza y asigna tareas de manera intuitiva, facilitando la
                colaboración y el seguimiento de cada actividad.
              </li>
              <li className="text-xs">
                Organiza y asigna tareas de manera intuitiva, facilitando la
                colaboración y el seguimiento de cada actividad.
              </li>
              <li className="text-xs">
                Organiza y asigna tareas de manera intuitiva, facilitando la
                colaboración y el seguimiento de cada actividad.
              </li>
            </ul>
            <div className="flex w-full items-center justify-center md:justify-start">
              <Button variant="primario" className="md:w-fit md:px-8 w-full ">
                <ShoppingCart /> Añadir al Carrito
              </Button>
            </div>
            <div className="flex flex-col gap-2">
              <h2>Informacion y funcionalidades de la app</h2>
              <div className="grid grid-cols-2 md:grid-cols-4  gap-2 rounded-md border-primario-200 border p-4 text-xs text-center">
                <div className="flex flex-col gap-y-2 ">
                  <h3>Funcionalidades</h3>
                  <div className="flex items-center justify-center gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full ">
                    <p className="">APIS - Integraciones</p>
                  </div>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2 ">
                  <h3>Funcionalidades</h3>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3>Funcionalidades</h3>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                </div>
                <div className="flex flex-col gap-y-2">
                  <h3>Funcionalidades</h3>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                  <div className="flex items-center justify-center  gap-x-2 rounded-md bg-primario/80 dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1  w-full">
                    <p>APIS - Integraciones</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 ">
              <h2>25 Reseñas </h2>
              <StarRating rating={info.calification} />
              <Separator className="w-full" />
              <div className="flex flex-col gap-y-4">
                <div className="flex flex-row gap-x-2">
                  <p>Maria Lopez</p>
                  <StarRating rating={info.calification} />
                </div>
                <p className="text-xs">
                  Nunca pensé que podría organizar mi negocio tan rapido Gracias
                  a Sebastián, ahora puedo automatizar varias tareas en mi
                  trabajo. ¡Muy recomendado!
                </p>
                <Separator className="w-full" />
              </div>
            </div>
          </PartBody>
        </div>
        <div className="flex  w-full h-full sm:basis-2/6 flex-col gap-2">
          <PartBody className=" sm:px-2 dark:bg-gray-800 relative">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-center justify-start gap-2 pl-4">
                <Avatar className="size-10">
                  <AvatarImage src={user?.image} alt="header" />
                  <AvatarFallback className="text-white bg-primario-300  dark:bg-primario font-medium flex items-center justify-center text-xl">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="text-sm flex gap-y-1 flex-col">
                  <h1>Diego Martínez </h1>
                  <p className="text-xs">Instructor y desarrollador</p>
                </div>
              </div>
              <Separator className="w-full" />
              <div className="flex flex-col  px-2 gap-2">
                <div className="flex items-center gap-x-2 text-xs">
                  <Star className="size-5 text-primario-400 dark:text-primario-200" />
                  <p> Calificacion del instructor: 5</p>
                </div>
                <div className="flex items-center gap-x-2 text-xs">
                  <MessageSquare className="size-5 text-primario-400 dark:text-primario-200" />
                  <p>4.3 (52 Reseñas)</p>
                </div>
                <div className="flex items-center gap-x-2 text-xs">
                  <FileChartColumnIncreasing className="size-5 text-primario-400 dark:text-primario-200" />
                  <p>60 Aplicaciones vendidas</p>
                </div>
                <div className="flex items-center gap-x-2 text-xs">
                  <Youtube className="size-5 text-primario-400 dark:text-primario-200" />
                  <p>Instructor verificado</p>
                </div>
                <div className="text-xs text-primario hover:underline dark:text-primario-200  text-end w-full">
                  <Link href={"/profile"}>Ver perfil</Link>
                </div>
              </div>
            </div>
          </PartBody>
          <PartBody className="items-center justify-center  flex-row gap-2 dark:bg-gray-800">
            <Box />
            <p>AppSheet</p>
          </PartBody>
          <PartBody className="items-center justify-center  flex-col gap-4 dark:bg-gray-800 text-sm sm:px-4">
            <p>¿Qué recibirás?</p>
            <div className="flex flex-col gap-y-2 text-start w-full">
              <p className="text-primario dark:text-primario-200 text-xs">
                La compra incluye
              </p>
              <h2>App para gestión de proyectos</h2>
              <p className="text-xs ">
                Acceso completo a la aplicación: Descargá y utilizá la app en
                todos tus dispositivos sin restricciones.
              </p>
              <p className="text-xs ">
                Acceso completo a la aplicación: Descargá y utilizá la app en
                todos tus dispositivos sin restricciones.
              </p>
              <p className="text-xs ">
                Acceso completo a la aplicación: Descargá y utilizá la app en
                todos tus dispositivos sin restricciones.
              </p>
            </div>
          </PartBody>
          <div className="flex w-full items-center justify-center md:justify-start">
            <Button variant="primario" className=" md:px-8 w-full ">
              <ShoppingCart /> Añadir al Carrito
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full">
        <CarouselCourses />
      </div>
    </DashboardContent>
  );
};

export default CourseInfo;

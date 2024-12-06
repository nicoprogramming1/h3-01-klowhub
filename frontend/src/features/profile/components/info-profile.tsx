"use client";

import DashboardContent from "@/components/content-dashboard";
import LoadingDefault from "@/components/loading";
import PartBody from "@/components/part-body";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-provider";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

export default function InfoProfile() {
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
        <PartBody className="sm:w-2/3 gap-2 h-full pt-8">
          <div className="flex flex-row gap-2 w-full h-full">
            <div className="flex flex-col gap-2 w-1/3 items-center justify-center">
              <div className="flex flex-col items-center justify-center gap-2">
                {user.imageProfile ? (
                  <div className="flex ">
                    <Avatar className="size-24 hover:opacity-75 transition ">
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
                <p className=" font-semibold">
                  {user.longName.split(" ")[0].toUpperCase()}
                  {/* <span className="bg-custom-gradient-light dark:bg-custom-gradient-dark p-1 rounded-sm">
                  PRO
                </span> */}
                </p>{" "}
              </div>
            </div>
            <div className="flex flex-col gap-2 w-2/3 text-sm justify-center h-full ">
              <p className="text-sm ">
                Usuario
                <span className="bg-custom-gradient-light dark:bg-custom-gradient-dark p-1 rounded-sm">
                  {user.membership || "BÁSICO"}
                </span>
              </p>{" "}
              <p>Sobre mi </p>
              <div className="flex flex-col h-full bg-primario-100/40 dark:bg-gray-800 px-4 py-3 rounded-md">
                <p className=" text-xs">
                  {user.about || "Edita tu perfil para agregar tu biografía"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 w-full h-full">
            <div className="w-full flex flex-col gap-2">
              <div className="flex flex-wrap gap-2 items-center w-full">
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
                  {"NODEJS"}
                </span>
                {/* {field.value?.map((tag: string, index: number) => (
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
                ))} */}
              </div>
            </div>
          </div>
        </PartBody>

        <PartBody className="w-full sm:w-1/3 sm:p-0 sm:px-0 flex-col h-full  justify-start gap-2 rounded-lg ">
          <div className="flex  w-full min-h-[150px]  relative overflow-hidden rounded-t-lg">
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
    </DashboardContent>
  );
}

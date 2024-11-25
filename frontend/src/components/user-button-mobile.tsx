"use client";

import { Headset, LogIn, LogOut, User, UserRoundPlus } from "lucide-react";
import Link from "next/link";

import { useAuth } from "@/hooks/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toogle";
import { NotificationMobile } from "./notification";
import { Button } from "./ui/button";
import Navigation from "./navigation";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const UserButtonMobile = () => {
  const { logout, user, isAuthenticated } = useAuth();
  const router = useRouter();

  const name = user?.longName;
  const email = user?.email;

  const avatarFallback = user?.longName
    ? user?.longName.charAt(0).toUpperCase()
    : user?.email.charAt(0).toUpperCase() ?? "U";

  const Item = ({ children }: { children?: React.ReactNode }) => {
    return (
      <DropdownMenuItem className=" flex items-center  font-medium cursor-pointer">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="hover:bg-transparent/5  cursor-pointer flex justify-between w-full"
        >
          {children}
        </Button>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <HamburgerMenuIcon className="size-5 hover:opacity-75 transition  text-primario-200 dark:text-primario-400" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60  dark:bg-custom-gradient-dark bg-custom-gradient-light text-xs"
        sideOffset={10}
      >
        {isAuthenticated === true ? (
          <>
            <div className="flex flex-row items-center justify-center gap-2 px-2.5 py-4 ">
              <Avatar className="size-10 hover:opacity-75 transition ">
                <AvatarImage
                  src={user?.image}
                  alt="avatar"
                  className="rounded-full"
                />
                <AvatarFallback className="text-white bg-primario-400  dark:bg-primario font-medium flex items-center justify-center">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-primary">
                  {name ? name.charAt(0).toUpperCase() + name.slice(1) : "User"}
                </p>
                <p className="text-xs text-neutral-500">{email}</p>
              </div>
            </div>
            <Separator className="px-1 mx-auto bg-primary " />
          </>
        ) : (
          <Link
            href="/"
            className="flex flex-row items-center justify-center gap-2 px-2.5 py-4 "
          >
            <div className="flex dark:bg-gray-500 bg-white p-1 rounded-sm">
              <Image src="/logo.svg" alt="logo" width={50} height={20} />
              <h1 className="text-2xl font-semibold">
                <span className="bg-primario p-1 rounded-md text-white font-medium text-start text-lg ml-2">
                  Klowhub{" "}
                </span>{" "}
              </h1>
            </div>
          </Link>
        )}

        <Navigation
          mode={"vertical"}
          className="p-2 items-center gap-y-4 pl-4"
        />
        <Separator className="px-1 mx-auto bg-primary " />
        <Link href="/">
          <Item>
            {" "}
            <User /> Perfil{" "}
          </Item>
        </Link>
        <DropdownMenuItem className=" flex items-center justify-between font-medium ">
          <ModeToggle className="w-full" addText={true} />
        </DropdownMenuItem>

        <Link href="/">
          <Item>
            {" "}
            <Headset /> Soporte{" "}
          </Item>
        </Link>
        <Separator className="px-1 mx-auto bg-primary " />

        {isAuthenticated === true ? (
          <>
            <DropdownMenuItem className=" p-2">
              {" "}
              <NotificationMobile />{" "}
            </DropdownMenuItem>

            <Separator className="px-1 mx-auto bg-primary " />
            <DropdownMenuItem
              onClick={() => {
                logout();
              }}
              className="h-10 flex items-center justify-center dark:text-primario-400 text-primario font-medium cursor-pointer  hover:text-amber-700 "
            >
              <LogOut className="mr-2 size-4" />
              Salir
            </DropdownMenuItem>
          </>
        ) : (
          <div className="flex flex-col justify-around gap-2 p-2">
            <DropdownMenuItem
              onClick={() => {
                router.push("/auth/login");
              }}
              className="h-8 flex items-center justify-center bg-transparent/10 dark:text-primario-400 text-primario font-medium cursor-pointer  hover:text-amber-700 "
            >
              <LogIn className="mr-2 size-4" />
              Iniciar Sessión
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() => {
                router.push("/auth/register");
              }}
              className="h-8 flex items-center justify-center bg-transparent/5 dark:text-primario-400 text-primario font-medium cursor-pointer  hover:text-amber-700 "
            >
              <UserRoundPlus className="mr-2 size-4" />
              Registrate
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

"use client";

import { Headset, LogOut, User } from "lucide-react";
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

import { Button } from "./ui/button";

export const UserButton = () => {
  const { logout, user } = useAuth();

  if (!user) return null;

  const { longName: name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

  const Item = ({ children }: { children?: React.ReactNode }) => {
    return (
      <DropdownMenuItem className=" flex items-center  font-medium cursor-pointer">
        <Button
          variant={"ghost"}
          size={"sm"}
          className="hover:bg-transparent/5  cursor-pointer flex justify-between w-full gap-x-2"
        >
          {children}
        </Button>
      </DropdownMenuItem>
    );
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition  ">
          <AvatarImage src={user.image} alt="avatar" className="rounded-full" />
          <AvatarFallback className="text-white bg-primario-400 dark:bg-primario font-medium flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60  dark:bg-custom-gradient-dark bg-custom-gradient-light text-xs"
        sideOffset={10}
      >
        <div className="flex flex-row items-center justify-center gap-2 px-2.5 py-4 ">
          <Avatar className="size-10 hover:opacity-75 transition ">
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
        <Link href="/profile">
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
        <DropdownMenuItem
          onClick={() => {
            logout();
          }}
          className="h-10 flex items-center justify-center dark:text-primario-400 text-primario font-medium cursor-pointer  hover:text-amber-700 "
        >
          <LogOut className="mr-2 size-4" />
          Salir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

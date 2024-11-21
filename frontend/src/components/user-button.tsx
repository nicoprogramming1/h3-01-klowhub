"use client";

import { LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "./ui/separator";
import { ModeToggle } from "./mode-toogle";

export const UserButton = () => {
  const user = {
    name: "Steeven",
    email: "steven@klowhub.com",
    image: undefined,
  };
  //   if (isLoading)
  //     return (
  //       <div>
  //         <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
  //           <Loader className="size-4 animate-spin text-muted-foreground" />
  //         </div>
  //       </div>
  //     );

  if (!user) return null;

  const { name, email } = user;

  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase() ?? "U";

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
        className="w-60  dark:bg-custom-gradient-dark bg-custom-gradient-light"
        sideOffset={10}
      >
        <div className="flex flex-row items-center justify-center gap-2 px-2.5 py-4 ">
          <Avatar className="size-10 hover:opacity-75 transition ">
            <AvatarFallback className="text-white bg-primario-400  dark:bg-primario font-medium flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-primary">{name || "User"}</p>
            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>
        <Separator className="px-1 mx-auto bg-primary " />
        <DropdownMenuItem
          onClick={() => {}}
          className="h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer"
        >
          <LogOut className="mr-2 size-4" />
          Salir
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ModeToggle />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

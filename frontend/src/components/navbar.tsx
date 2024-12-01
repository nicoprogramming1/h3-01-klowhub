"use client";

import Link from "next/link";
import Image from "next/image";

import { UserButton } from "./user-button";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAuth } from "@/hooks/auth-provider";
import { NotificationDesktop } from "./notification";
import { UserButtonMobile } from "./user-button-mobile";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  return (
    <nav className="bg-[url('/images/navbar/image.png')] bg-cover bg-center bg-no-repeat pt-2  h-16 w-full">
      <div className="flex  w-full h-full justify-between bg-black/20 backdrop-blur px-2 items-center ">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={80} height={20} />
        </Link>
        <ScrollArea className="hidden items-center md:flex   text-center  justify-center gap-4 px-4 ">
          <div className="flex p-2">
            <Navigation />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        {isAuthenticated === true ? (
          <div className="hidden md:flex items-center justify-center gap-x-2 ">
            <Button
              asChild
              variant={"primario"}
              size={"md"}
              className="hidden md:flex "
            >
              <Link href="/plan">Conviertete en PRO</Link>
            </Button>
            <NotificationDesktop />
            <div className="flex items-center justify-center  pr-4">
              <UserButton />
            </div>
          </div>
        ) : (
          <div className="flex gap-x-2">
            <Button variant={"outline"}>
              <Link href="/auth/register">Registrate</Link>
            </Button>
            <Button variant="primario">
              <Link href="/auth/login">Iniciar Sesión</Link>
            </Button>
          </div>
        )}
        <div className="flex md:hidden">
          <UserButtonMobile />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

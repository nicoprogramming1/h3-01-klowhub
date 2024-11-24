"use client";

import Link from "next/link";
import Image from "next/image";

import { UserButton } from "./user-button";
import Navigation from "./navigation";
import { Button } from "./ui/button";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { useAuth } from "@/context/auth-provider";

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

        <Button
          asChild
          variant={"primario"}
          size={"md"}
          className="hidden md:flex "
        >
          <Link href="/plan">Conviertete en PRO</Link>
        </Button>
        {isAuthenticated === true ? (
          <div className="flex items-center justify-center gap-4 px-4 ">
            <UserButton />
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;

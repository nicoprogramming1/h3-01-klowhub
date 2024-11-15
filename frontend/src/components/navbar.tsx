import Link from "next/link";
import Image from "next/image";

import Navigation from "./navigation";
import { UserButton } from "./user-button";

const Navbar = () => {
  return (
    <nav className="bg-[url('/images/navbar/image.png')] bg-cover bg-center bg-no-repeat pt-2  h-16">
      <div className="flex  w-full h-full justify-between bg-black/20 backdrop-blur px-2">
        <Link href="/">
          <Image src="/logo.svg" alt="logo" width={80} height={20} />
        </Link>
        <div className="hidden items-center  md:flex justify-beetwen gap-4 px-4">
          <Navigation />
        </div>
        <div className="hidden items-center  md:flex justify-center gap-4  ">
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

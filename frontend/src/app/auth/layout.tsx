"use client";
import Footer from "@/features/auth/components/footer";
import Header from "@/features/auth/components/header";
import { usePathname } from "next/navigation";

interface LayoutAuthProps {
  children: React.ReactNode;
}

const LayoutAuth = ({ children }: LayoutAuthProps) => {
  const pathname = usePathname();
  const header = pathname === "/auth/login" ? "Inicia Sesión" : "Registrate";
  return (
    <div className="flex justify-end w-full h-full min-h-screen first-line:lg:h-screen bg-[url('/images/auth/bgLight.png')] dark:bg-[url('/images/auth/bg.png')]  lg:bg-[url('/images/auth/bgLight-lg.png')] dark:lg:bg-[url('/images/auth/bg-lg.png')] bg-center lg:bg-left   bg-no-repeat bg-cover bg-fixed ">
      <div className="flex flex-col  sm:h-svh  w-screen min-h-screen ">
        <div className="flex  lg:justify-end w-full sm:h-full h-screen">
          <div className=" hidden lg:flex absolute top-5 left-5 ">
            <Header label={header} className="justify-start items-start" />
          </div>
          <div className="flex lg:w-[50vw] w-full  h-full justify-center items-center  dark:bg-background/20  bg-primario-100/40 dark:backdrop-blur-none  ">
            {children}
          </div>
        </div>
        <div className="flex  lg:h-[150px] h-auto w-full  ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LayoutAuth;

import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { TvMinimalPlay, User } from "lucide-react";

interface CardMemberProps {
  id: number;
  image?: string;
  name: string;
  reviews: number;
  language: string;
  price: number;
  link?: string;
}

const CardMember = ({
  image,
  name,
  reviews,
  language,
  price,
}: CardMemberProps) => {
  return (
    <Card className="flex flex-col  w-full min-h-[350px] h-full   bg-primario-200/80 dark:bg-gray-700/80  rounded-md overflow-hidden ">
      <CardHeader className="flex basis-2/5    p-0 m-0 relative ">
        <Image src={image ?? "/images/user/image-3.png"} alt="header" fill />

        <div
          className={cn(
            "absolute top-2 right-4 flex items-center gap-x-2 rounded-md bg-primario/60 dark:bg-primario-100/80 text-primario-100 dark:text-primario-300 px-2 py-1 text-xs"
          )}
        >
          <p>♡</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col basis-3/5  p-4  text-sm justify-between">
        <h1 className="font-semibold">{name}</h1>

        <div className="flex  text-xs bg-primario-200 dark:bg-gray-600 rounded-md px-2 py-1  min-w-[80px] text-primario-700 dark:text-primary items-center justify-center">
          <User className="size-6 pr-2" />
          <p>AppSheet</p>
        </div>
        <div className="flex gap-x-2 text-xs">
          <TvMinimalPlay className="size-4" />
          <p>50 sesiones</p>
          <p>{`(${reviews} reseñas)`}</p>
        </div>

        <div className="text-xs">
          <p> {language}</p>
        </div>
        <div>
          <p>$ {price}</p>
        </div>

        <div className="flex   justify-center w-full gap-2">
          <Button
            variant={"link"}
            size={"sm"}
            className="w-fit text-xs text-primario dark:text-primario-200"
          >
            Ver Detalles
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardMember;

import Image from "next/image";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface CardLearningProgressProps {
  type: string;
  title: string;
  description: string;
  tags?: string[];
  progreso?: number;
  link: string;
  image?: string;
}

const CardLearningProgress = ({
  title,
  description,
  tags,
  progreso,
  link,
  type,
  image,
}: CardLearningProgressProps) => {
  return (
    <Card className="flex flex-col sm:flex-row  w-full min-h-[500px] h-full  sm:w-full sm:min-h-[250px]  bg-background dark:bg-gray-700/80  rounded-md overflow-hidden ">
      <CardHeader className="flex basis-2/5 sm:basis-1/2 lg:basis-1/3   p-0 m-0 relative">
        <Image src={image ?? "/images/card/image1.png"} alt="header" fill />
        <div className="absolute top-2 left-4 flex items-center gap-x-2 rounded-md bg-primario/60 dark:bg-primario-100/80 text-primario-100 dark:text-primario-300 px-2 py-1 text-xs">
          <p>{type}</p>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col basis-3/5 sm:basis-1/2 lg:basis-2/3 p-4 gap-y-3 text-sm justify-between">
        <h1 className="font-semibold">{title}</h1>

        <p className="text-xs">{description}</p>
        <div className="flex gap-x-2 ">
          {tags?.map((tag, index) => (
            <div
              key={index}
              className="flex items-center gap-x-2 rounded-md bg-primario dark:bg-primario-100/80 text-primario-100 dark:text-primario px-2 py-1 text-xs"
            >
              <p>{tag}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-y-2">
          <p> Mi progreso:</p>
          <div className="flex items-center gap-x-1">
            <Progress value={progreso ?? 0} />
            <span>{progreso ?? 0}%</span>
          </div>
        </div>
        <div className="flex   justify-start w-full">
          <Button variant={"primario"} className="w-full sm:w-1/2">
            Continuar viendo
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardLearningProgress;

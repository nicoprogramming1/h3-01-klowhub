"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import CardGeneral from "@/components/card-general";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface CardData {
  id: number;
  type: string;
  title: string;
  description: string;
  tags: string[];
  calification: number;
  link: string;
  image: string;
  price: number;
}

interface CarouselCardProps {
  data: CardData[];
  link: string;
}

const CarouselCard = ({ data, link }: CarouselCardProps) => {
  const router = useRouter();

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, current]);

  const handleclickCard = (index: number) => {
    setSelectedIndex(index);
  };
  const handleClick = () => {
    router.push(link);
  };
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-y-2">
      <Carousel
        opts={{
          align: "center",
        }}
        className=" w-full h-auto "
        setApi={setApi}
      >
        <CarouselContent className=" sm:-ml-0  h-auto">
          {data.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="flex-shrink-0 sm:basis-1/2 lg:basis-1/3  p-4 justify-center items-center flex "
              onClick={() => {
                handleclickCard(index);
              }}
            >
              <div
                className={cn(
                  "flex items-center justify-center  transition-all duration-300 rounded-md   hover:shadow-lg max-w-[350px] max-h-[500px] w-full h-full",
                  selectedIndex === index ? " shadow-lg" : "scale-100"
                )}
              >
                <CardGeneral {...item} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext className="-ml-4" /> */}
        <div className="flex justify-center items-center mt-2  gap-2 ">
          {Array.from({ length: count }).map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "w-3 h-3 rounded-full transition-all",
                current === index + 1 ? "bg-primario scale-125" : "bg-gray-500 "
              )}
            ></button>
          ))}
        </div>
      </Carousel>
      <Button variant={"outline"} onClick={() => handleClick()}>
        {" "}
        Ver más
      </Button>
    </div>
  );
};

export default CarouselCard;

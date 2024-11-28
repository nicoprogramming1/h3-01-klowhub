"use client";

import FindByCard from "./find-by-card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import PartBody from "@/components/part-body";

const CarouselHeader = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const fakeData = [
    {
      id: 1,
      title: "Aprende en KlowHub",
      link: "/",
    },
    {
      id: 2,
      title: "Encuentra aplicaciones",
      link: "/",
    },
    {
      id: 3,
      title: "Elige un mentor",
      link: "/",
    },
    {
      id: 4,
      title: "Publica proyectos",
      link: "/",
    },
  ];

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
    console.log({ current });
  }, [api, current]);

  const handleclick = (index: number) => {
    setSelectedIndex(index);
  };
  return (
    <PartBody className="sm:px-0 py-2 gap-0 sm:gap-0">
      <div className="flex flex-col justify-center items-center w-full h-full">
        <Carousel
          opts={{
            align: "center",
          }}
          className=" w-full "
          setApi={setApi}
        >
          <CarouselContent className="  sm:-ml-0">
            {fakeData.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="sm:basis-1/2 md:basis-1/3 lg:basis-1/4 sm:p-4 justify-center items-center flex"
                onClick={() => {
                  handleclick(index);
                }}
              >
                <div
                  className={cn(
                    "flex items-center justify-center  transition-all duration-300 rounded-md cursor-pointer  hover:scale-[1.01]",
                    selectedIndex === index ? " shadow-lg" : "scale-100"
                  )}
                >
                  <FindByCard title={item.title} link={item.link} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <CarouselPrevious />
        <CarouselNext className="-ml-4" /> */}
          <div className="flex justify-center items-center mt-2  gap-2 lg:hidden">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  current === index + 1
                    ? "bg-primario scale-125"
                    : "bg-gray-500 "
                )}
              ></button>
            ))}
          </div>
        </Carousel>
      </div>
    </PartBody>
  );
};

export default CarouselHeader;

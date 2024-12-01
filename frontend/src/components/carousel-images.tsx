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
import Image from "next/image";

interface ImageData {
  id: number;
  image: string;
}
interface CarouselImagesProps {
  images: ImageData[];
  className?: string;
}

const CarouselImages = ({ images, className }: CarouselImagesProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [focusImage, setFocusImage] = useState(images[0].image);

  const fakeData = images;

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

  const handleclick = (index: number, id: number) => {
    setSelectedIndex(index);
    const image = fakeData.find((item) => item.id === id);
    setFocusImage(image?.image || "/images/default.png");
  };
  return (
    <>
      <div className="flex p-4">
        <div className="relative block items-center justify-center rounded-md overflow-hidden w-full h-[300px]  ">
          <Image src={focusImage} alt="header" fill />
        </div>
      </div>
      <Carousel
        opts={{
          align: "center",
        }}
        className=" w-full p-2 sm:px-0 overflow-hidden"
        setApi={setApi}
      >
        <CarouselContent className=" p-0 sm:px-0">
          {fakeData.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 sm:p-4 justify-center items-center flex "
              onClick={() => {
                handleclick(index, item.id);
              }}
            >
              <div
                className={cn(
                  "flex items-center justify-center  transition-all duration-300 rounded-md cursor-pointer hover:scale-[1.01] w-[200px] h-[200px] overflow-hidden relative",
                  selectedIndex === index ? " shadow-lg" : "",
                  className
                )}
              >
                <Image
                  src={item.image || "/images/default.png"}
                  alt="header"
                  fill
                />
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
                current === index + 1 ? "bg-primario scale-125" : "bg-gray-500 "
              )}
            ></button>
          ))}
        </div>
      </Carousel>
    </>
  );
};

export default CarouselImages;

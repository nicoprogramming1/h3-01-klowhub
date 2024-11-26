"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  // CarouselNext,
  // CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import CardPlan from "./card";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CarouselPlan = ({
  onPlanSelect,
}: {
  onPlanSelect: (id: number) => void;
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const fakeData = [
    {
      id: 1,
      title: "Basic",
      description: [
        "Acceso limitado a funciones básicas.",
        "Ideal para principiantes que desean explorar la plataforma",
        "Soporte por correo electrónico.",
        "Uso de plantillas predefinidas y recursos básicos.",
      ],
      price: "9,99",
      comisiones: "PayPal 20%, Stripe 15%, Cripto 12%",
      image: "/images/auth/bg-lg.png",
    },
    {
      id: 2,
      title: "Profesional",
      description: [
        "Acceso limitado a funciones básicas.",
        "Ideal para principiantes que desean explorar la plataforma",
        "Soporte por correo electrónico.",
        "Uso de plantillas predefinidas y recursos básicos.",
      ],
      price: "9,99",
      comisiones: "PayPal 20%, Stripe 15%, Cripto 12%",
      image: "/images/auth/bg.png",
    },
    {
      id: 3,
      title: "Experto",
      description: [
        "Acceso limitado a funciones básicas.",
        "Ideal para principiantes que desean explorar la plataforma",
        "Soporte por correo electrónico.",
        "Uso de plantillas predefinidas y recursos básicos.",
      ],
      price: "9,99",
      comisiones: "PayPal 20%, Stripe 15%, Cripto 12%",
      image: "/images/auth/bgLight.png",
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

  const handleclick = (index: number, item: { id: number }) => {
    setSelectedIndex(index);
    onPlanSelect(item.id);
    toast.success(`A seleccionado el plan ${item.id}`);
  };
  return (
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
              key={index}
              className="md:basis-1/2 lg:basis-1/3 sm:p-4 justify-center items-center flex"
              onClick={() => {
                handleclick(index, item);
              }}
            >
              <div
                className={cn(
                  "flex items-center justify-center p-1 transition-all duration-300 rounded-md cursor-pointer w-full hover:scale-105",
                  selectedIndex === index
                    ? "sm:scale-[1.03] shadow-lg  dark:shadow-green-600 shadow-green-300"
                    : "scale-100"
                )}
              >
                <CardPlan
                  {...item}
                  className={cn(
                    selectedIndex === index
                      ? " border-2 dark:border-green-700 border-primario "
                      : ""
                  )}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* <CarouselPrevious />
        <CarouselNext className="-ml-4" /> */}
        <div className="flex justify-center items-center mt-4 gap-2 lg:hidden">
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
    </div>
  );
};

export default CarouselPlan;

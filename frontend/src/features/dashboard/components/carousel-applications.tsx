"use client";

import CarouselCard from "@/components/carousel-card";
import { fakeDataApplications } from "@/data";

const CarouselApplications = () => {
  const fakeData = fakeDataApplications;
  return (
    <div className="flex flex-col  justify-center p-4 sm:px-8 w-full h-full bg-primario-100/80 dark:bg-gray-900  rounded-sm gap-y-4 sm:gap-y-6">
      <div className="flex flex-col w-full gap-y-2">
        <h2 className="text-lg font-semibold">Cursos recomendados</h2>
        <p className="text-sm">
          Descubre los cursos más destacados y lleva tus habilidades al
          siguiente nivel. Aprende de expertos y aplica tus conocimientos en
          proyectos reales.
        </p>
      </div>
      <div className="flex px-2 items-center justify-center ">
        <CarouselCard data={fakeData} link={"/aplications"} />
      </div>
    </div>
  );
};

export default CarouselApplications;

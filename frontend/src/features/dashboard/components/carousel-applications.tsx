"use client";

import CarouselCard from "@/components/carousel-card";
import PartBody from "@/components/part-body";
import { fakeDataApplications } from "@/data";

const CarouselApplications = () => {
  const fakeData = fakeDataApplications;
  return (
    <PartBody
      title={"Aplicaciones recomendados"}
      description={
        "Explorá soluciones listas para usar. Encontrá la app perfecta para tu proyecto y empezá a trabajar de inmediato."
      }
    >
      <div className="flex px-2 items-center justify-center ">
        <CarouselCard data={fakeData} link={"/aplications/all"} />
      </div>
    </PartBody>
  );
};

export default CarouselApplications;

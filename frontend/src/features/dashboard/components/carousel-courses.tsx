"use client";

import CarouselCard from "@/components/carousel-card";
import PartBody from "@/components/part-body";
import { fakeDataCurses } from "@/data";

const CarouselCourses = () => {
  const fakeData = fakeDataCurses;
  return (
    <PartBody
      title={"Cursos recomendados"}
      description={
        "Descubre los cursos más destacados y lleva tus habilidades al siguiente nivel. Aprende de expertos y aplica tus conocimientos en proyectos reales."
      }
    >
      <div className="flex px-2 items-center justify-center ">
        <CarouselCard data={fakeData} link={"/courses/all"} />
      </div>
    </PartBody>
  );
};

export default CarouselCourses;

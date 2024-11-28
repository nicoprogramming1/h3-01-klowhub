import CarouselCard from "@/components/carousel-card";
import PartBody from "@/components/part-body";
import { fakeDataCurses } from "@/data";

const CoursesFinished = () => {
  const fakeData = fakeDataCurses;
  return (
    <PartBody
      title={"Cursos terminados"}
      description={
        "Tus cursos quedarán guardados en la plataforma para que los puedas revisar cuando quieras"
      }
    >
      <div className="flex px-2 items-center justify-center ">
        <CarouselCard data={fakeData} link={"/courses"} />
      </div>
    </PartBody>
  );
};

export default CoursesFinished;

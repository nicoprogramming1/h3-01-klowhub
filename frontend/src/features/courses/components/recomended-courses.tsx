import CarouselCard from "@/components/carousel-card";
import PartBody from "@/components/part-body";
import { fakeDataCurses } from "@/data";

const RecomendedCourses = () => {
  const fakeData = fakeDataCurses;
  return (
    <PartBody
      title={"Cursos recomendados en función de tu perfil"}
      description={"También te pueden interesar estas lecciones y cursos"}
    >
      <div className="flex px-2 items-center justify-center ">
        <CarouselCard data={fakeData} link={"/courses"} />
      </div>
    </PartBody>
  );
};

export default RecomendedCourses;

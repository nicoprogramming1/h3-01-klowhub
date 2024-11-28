import CardLearningProgress from "@/components/card-learning-progress";
import PartBody from "@/components/part-body";
import { fakeDataLearningProgress } from "@/data";

const LearningProgressCourses = () => {
  const fakeData = fakeDataLearningProgress;
  return (
    <PartBody
      title={"Mis Cursos"}
      description={
        "Retoma donde lo dejaste. Vuelve a ver tu último video y sigueaprendiendo sin perder el ritmo."
      }
    >
      <div className="flex px-2 items-center justify-center ">
        <CardLearningProgress {...fakeData} />
      </div>
    </PartBody>
  );
};

export default LearningProgressCourses;

import CardLearningProgress from "@/components/card-learning-progress";
import PartBody from "@/components/part-body";
import { fakeDataLearningProgress } from "@/data";

const LearningProgressDashboard = () => {
  const fakeData = fakeDataLearningProgress;
  return (
    <PartBody
      title={"Continuá tu aprendizaje"}
      description={
        "Retomá donde lo dejaste. Volvé a ver tu último video y seguí aprendiendo sin perder el ritmo."
      }
      className="gap-y-4"
    >
      <div className="flex px-2 items-center justify-center ">
        <CardLearningProgress {...fakeData} />
      </div>
    </PartBody>
  );
};

export default LearningProgressDashboard;

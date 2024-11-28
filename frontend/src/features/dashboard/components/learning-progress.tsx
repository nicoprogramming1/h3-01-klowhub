import CardLearningProgress from "@/components/card-learning-progress";
import { fakeDataLearningProgress } from "@/data";

const LearningProgressDashboard = () => {
  const fakeData = fakeDataLearningProgress;
  return (
    <div className="flex flex-col  justify-center p-4 sm:px-8 w-full h-full bg-primario-100/80 dark:bg-gray-900  rounded-sm gap-y-4 sm:gap-y-6">
      <div className="flex flex-col w-full gap-y-2">
        <h2 className="text-lg font-semibold">Continuá tu aprendizaje</h2>
        <p className="text-sm">
          Retomá donde lo dejaste. Volvé a ver tu último video y seguí
          aprendiendo sin perder el ritmo.
        </p>
      </div>
      <div className="flex px-2 items-center justify-center ">
        <CardLearningProgress {...fakeData} />
      </div>
    </div>
  );
};

export default LearningProgressDashboard;

import ContentPlan from "./content";
import HeaderPlan from "./header-plan";

const PlanComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-y-4 h-full w-full">
      <HeaderPlan />
      <ContentPlan />
    </div>
  );
};

export default PlanComponent;

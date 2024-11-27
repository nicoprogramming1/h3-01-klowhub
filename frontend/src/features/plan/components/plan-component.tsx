import DashboardContent from "@/components/content-dashboard";
import ContentPlan from "./content";
import HeaderPlan from "./header-plan";

const PlanComponent = () => {
  return (
    <DashboardContent>
      <HeaderPlan />
      <ContentPlan />
    </DashboardContent>
  );
};

export default PlanComponent;

import DashboardContent from "@/components/content-dashboard";
import CarouselHeader from "@/features/dashboard/components/carousel-header";
import LearningProgressCourses from "./learning-progress";
import CoursesFinished from "./curses-finished";
import RecomendedCourses from "./recomended-courses";
import SearchCourses from "./search-courses";

const CoursesComponent = () => {
  return (
    <DashboardContent>
      <CarouselHeader />
      <SearchCourses />
      <LearningProgressCourses />
      <CoursesFinished />
      <RecomendedCourses />
    </DashboardContent>
  );
};

export default CoursesComponent;

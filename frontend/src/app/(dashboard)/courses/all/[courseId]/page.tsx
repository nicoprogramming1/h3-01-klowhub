"use client";
import DashboardContent from "@/components/content-dashboard";
import PartBody from "@/components/part-body";
import { fakeDataCursesBig } from "@/data";
import CourseInfo from "@/features/courses/components/course-info";
import { useRouter } from "next/navigation";

interface CourseIdProps {
  params: {
    courseId: string;
  };
}

const CourseById = ({ params }: CourseIdProps) => {
  const router = useRouter();
  const allCurses = fakeDataCursesBig;

  const thisCurse = allCurses.find(
    (course) => course.id.toString() === params.courseId
  );

  console.log({ params });

  if (!thisCurse) {
    setTimeout(() => {
      router.back();
    }, 1000);
    return (
      <DashboardContent>
        <PartBody
          title="Curso no encontrado"
          description="Redirijiendo..."
          className="h-fit"
        />
      </DashboardContent>
    );
  }

  return <CourseInfo info={thisCurse} />;
};

export default CourseById;

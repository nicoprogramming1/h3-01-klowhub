"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { fakeDataCursesBig } from "@/data";
import SearchComponent from "@/components/search";
import CardGeneral from "@/components/card-general";
import PartBody from "@/components/part-body";
import DashboardContent from "@/components/content-dashboard";

import MyPagination from "@/components/my-pagination";

const AllCoursesComponent = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  useEffect(() => {
    setSearch(searchParams.get("query")?.toString() || "");
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const mockCourses = fakeDataCursesBig;

  const filteredCourses = mockCourses.filter((course) =>
    course.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const router = useRouter();

  const handleCardClick = (id: number) => {
    router.push(`/courses/all/${id}`);
  };
  useEffect(() => {
    const section = document.getElementById("top-section");
    section?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  return (
    <DashboardContent>
      <PartBody
        description="Encuentra el aprendizaje que estás buscando"
        className="gap-y-2"
      >
        <SearchComponent placeholder={"Busca cursos"} />
      </PartBody>

      <PartBody className="items-center justify-center gap-y-2">
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {currentCourses.map((course) => (
            <CardGeneral
              {...course}
              handleNavigation={handleCardClick}
              key={course.id}
            />
          ))}
        </div>
        <MyPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </PartBody>
    </DashboardContent>
  );
};

export default AllCoursesComponent;

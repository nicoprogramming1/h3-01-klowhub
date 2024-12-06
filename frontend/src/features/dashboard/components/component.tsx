"use client";
import DashboardContent from "@/components/content-dashboard";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/auth-provider";
import CarouselHeader from "./carousel-header";
import CarouselCourses from "./carousel-courses";
import CarouselApplications from "./carousel-applications";
import MemberData from "./member-data";
import LearningProgressDashboard from "./learning-progress";

const DashboardComponent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  // Use useEffect para establecer el estado de carga cuando se verifique el estado de autenticación

  useEffect(() => {
    if (isAuthenticated !== null) {
      // Verifica si ya se sabe el estado de la autenticación
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    // Puedes mostrar un loader o un mensaje mientras esperas la autenticación
    return <div>Loading...</div>;
  }
  return (
    <DashboardContent>
      <CarouselHeader />
      {isAuthenticated && <LearningProgressDashboard />}
      <CarouselCourses />
      <CarouselApplications />
      <MemberData />
    </DashboardContent>
  );
};

export default DashboardComponent;

"use client";

import CarouselCard from "@/components/carousel-card";

const CarouselApplications = () => {
  const fakeData = [
    {
      id: 1,
      type: "app",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      progreso: 70,
      link: "/",
      image: "/images/card/image5.png",
    },
    {
      id: 2,
      type: "app",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      progreso: 70,
      link: "/",
      image: "/images/card/image2.png",
    },
    {
      id: 3,
      type: "app",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      progreso: 70,
      link: "/",
      image: "/images/card/image3.png",
    },
    {
      id: 4,
      type: "app",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      progreso: 70,
      link: "/",
      image: "/images/card/image1.png",
    },
  ];
  return <CarouselCard data={fakeData} link={"/applications"} />;
};

export default CarouselApplications;

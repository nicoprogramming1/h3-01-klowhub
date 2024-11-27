"use client";

import CarouselCard from "@/components/carousel-card";

const CarouselCourses = () => {
  const fakeData = [
    {
      id: 1,
      type: "curso",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      calification: 2,
      link: "/",
      image: "/images/card/image1.png",
      price: 99.99,
    },
    {
      id: 2,
      type: "curso",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      calification: 4.6,
      link: "/",
      image: "/images/card/image4.png",
      price: 99.99,
    },
    {
      id: 3,
      type: "curso",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      calification: 1,
      link: "/",
      image: "/images/card/image2.png",
      price: 99.99,
    },
    {
      id: 4,
      type: "curso",
      title: "Automatización de flujos de trabajo con AppSheet",
      description:
        "Aprende a crear flujos de trabajo automatizados en AppSheet, optimizando la gestión de tareas y aprobaciones, lo que mejorará la productividad en tus proyectos.",
      tags: ["CRM", "Clientes", "Ventas"],
      calification: 3,
      link: "/",
      image: "/images/card/image3.png",
      price: 99.99,
    },
  ];
  return <CarouselCard data={fakeData} link={"/courses"} />;
};

export default CarouselCourses;

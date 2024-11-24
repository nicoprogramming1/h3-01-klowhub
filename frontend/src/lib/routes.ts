import {
  GoHome,
  GoCheckCircle,
  GoHomeFill,
  GoCheckCircleFill,
} from "react-icons/go";
import {
  RiStore2Line,
  RiStore2Fill,
  RiInformationLine,
  RiInformationFill,
} from "react-icons/ri"; // Ajusta los iconos según tu proyecto
import { GrProjects } from "react-icons/gr";

export const routes = [
  {
    label: "Inicio",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Mis cursos",
    href: "/curses",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Mis Aplicaciones",
    href: "/applications",
    icon: RiStore2Line,
    activeIcon: RiStore2Fill,
  },
  {
    label: "Mis Mentorías",
    href: "/projects",
    icon: GrProjects,
    activeIcon: GrProjects,
  },

  {
    label: "Sobre Klowhub",
    href: "/about",
    icon: RiInformationLine,
    activeIcon: RiInformationFill,
  },
  {
    label: "Planes PRO",
    href: "/plan",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
];

export const routesMobile = [
  {
    label: "Mis cursos",
    href: "/curses",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Mis Aplicaciones",
    href: "/applications",
    icon: RiStore2Line,
    activeIcon: RiStore2Fill,
  },
  {
    label: "Mis Mentorías",
    href: "/projects",
    icon: GrProjects,
    activeIcon: GrProjects,
  },

  {
    label: "Sobre Klowhub",
    href: "/about",
    icon: RiInformationLine,
    activeIcon: RiInformationFill,
  },
];

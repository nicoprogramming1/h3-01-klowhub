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
    label: "Dashboard",
    href: "/",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "Cursos y Lecciones",
    href: "/curses",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "AppStore",
    href: "/appstore",
    icon: RiStore2Line,
    activeIcon: RiStore2Fill,
  },
  {
    label: "Proyectos",
    href: "/projects",
    icon: GrProjects,
    activeIcon: GrProjects,
  },
  {
    label: "Consultoría",
    href: "/consultancy",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Sobre AppSheet",
    href: "/about",
    icon: RiInformationLine,
    activeIcon: RiInformationFill,
  },
];

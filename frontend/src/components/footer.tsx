import Link from "next/link";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const categories = [
    {
      label: "Cursos",
      href: "",
      icon: null,
    },
    {
      label: "Aplicaciones",
      href: "",
    },
    {
      label: "Venta de un Curso",
      href: "",
    },
    {
      label: "Vende una App",
      href: "",
    },
  ];

  const acercaDe = [
    {
      label: "Instructores",
      href: "",
    },
    {
      label: "Cursos",
      href: "",
    },
    {
      label: "Terminos de servicio",
      href: "",
    },
    {
      label: "Politicas de Privacidad",
      href: "",
    },
  ];

  const soporte = [
    {
      label: "FAQ",
      href: "",
    },
    {
      label: "Contacto",
      href: "",
    },
    {
      label: "Foro",
      href: "",
    },
  ];

  const socialLinks = [
    {
      label: "facebook",
      href: "",
      icon: FaFacebookF,
    },
    {
      label: "twitter",
      href: "",
      icon: FaTwitter,
    },
    {
      label: "linkedin",
      href: "",
      icon: FaLinkedinIn,
    },
  ];

  interface List {
    label: string;
    href: string;
    icon?: React.ReactNode | null;
  }
  interface ListFootProps {
    title: string;
    list: List[];
  }

  const ListFooter = ({ title, list }: ListFootProps) => (
    <ul className="list-none space-y-2">
      <li className="text-gray-500 dark:text-gray-400">{title}</li>
      {list.map((item, index) => (
        <li key={index} className="hover:underline transition ease-out">
          <Link href={item.href}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="flex flex-wrap w-full text-xs dark:bg-custom-gradient-background bg-primario-100/40 backdrop-blur-sm pt-2 pl-4 sm:pl-12  font-light">
      <div className="w-1/2 sm:w-1/4  p-2 truncate">
        <ListFooter title="Categorias" list={categories} />
      </div>
      <div className="w-1/2 sm:w-1/4  p-2 truncate">
        <ListFooter title="Acerca De" list={acercaDe} />
      </div>
      <div className="w-1/2 sm:w-1/4  p-2 truncate">
        <ListFooter title="Soporte" list={soporte} />
      </div>
      <div className="w-1/2 sm:w-1/4  p-2 truncate">
        <ul className="list-none space-y-0 flex flex-col gap-4">
          <li className="text-gray-500 dark:text-gray-400">Encuentranos en</li>
          <div className="flex flex-row gap-x-6 pb-4">
            {Object.entries(socialLinks).map(([key, Social]) => (
              <li key={key}>
                <Link href={Social.href}>
                  <Social.icon />
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

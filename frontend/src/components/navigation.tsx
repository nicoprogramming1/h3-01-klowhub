"use client";

// import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NavigationProps {
  className?: string;
  mode?: "horizontal" | "vertical";
}
const Navigation = ({ className, mode = "horizontal" }: NavigationProps) => {
  // const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex  gap-x-4 gap-y-2 text-sm text-primario-200 truncate items-center",
        mode === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      {routes.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className="hover:text-primario-200 transition relative group "
        >
          {item.label}
          <span className="absolute inset-0 flex justify-end items-end">
            <span className="block w-0 h-[1px] bg-primario-200 transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;

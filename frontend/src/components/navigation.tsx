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
        "flex  gap-x-4 gap-y-2 text-sm text-primario-200  items-center ",
        mode === "vertical"
          ? "flex-col text-primario-600 dark:text-primario-200"
          : "flex-row",
        className
      )}
    >
      {routes.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          className={cn(
            "hover:text-primario-200 transition relative group truncate",
            mode === "vertical"
              ? " hover:text-primario-400 hover:dark:text-primario-300"
              : ""
          )}
        >
          {item.label}
          <span className="absolute inset-0 flex justify-end items-end">
            <span
              className={cn(
                "block w-0 h-[1px] bg-primario-200 transition-all duration-300 group-hover:w-full",
                mode === "vertical"
                  ? " bg-primario-400 dark:bg-primario-300"
                  : ""
              )}
            ></span>
          </span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;

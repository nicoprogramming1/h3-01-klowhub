"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
  text: string;
  className?: string;
}

const BackButton = ({
  href,
  label,
  text,
  className,
}: Readonly<BackButtonProps>) => {
  return (
    <div
      className={cn(
        "flex gap-x-2 text-xs w-full justify-center items-center",
        className
      )}
    >
      <span>{text}</span>
      <Button
        variant={"link"}
        size={"sm"}
        className="text-primario-400 dark:text-primario-300  font-normal text-xs"
        asChild
      >
        <Link href={href}>{label}</Link>
      </Button>
    </div>
  );
};

export default BackButton;

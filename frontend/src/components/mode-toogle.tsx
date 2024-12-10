"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
  tipe?: "button" | "switch";
  addText?: boolean;
}

export function ModeToggle({
  className,
  tipe = "button",
  addText = false,
}: Readonly<ModeToggleProps>) {
  const { setTheme, theme, systemTheme } = useTheme();

  const onhandleClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  let textToogle: string | undefined = systemTheme;

  if (theme === "dark") {
    textToogle = "Cambiar modo Dia";
  } else {
    textToogle = " Cambiar modo Noche";
  }

  return (
    <div className={cn("flex justify-between items-center gap-x-2", className)}>
      {tipe === "switch" && (
        <Switch
          checked={theme === "dark"}
          onCheckedChange={(isChecked) =>
            setTheme(isChecked ? "dark" : "light")
          }
          aria-label="Toggle Dark Mode"
        />
      )}
      {tipe === "button" && (
        <Button
          variant={"ghost"}
          size={"sm"}
          className="hover:bg-transparent/5  cursor-pointer flex justify-between w-full"
          onClick={() => onhandleClick()}
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
          {addText && <p>{textToogle}</p>}
        </Button>
      )}
    </div>
  );
}

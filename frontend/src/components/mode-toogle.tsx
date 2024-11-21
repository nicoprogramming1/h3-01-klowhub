"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

import { Switch } from "./ui/switch";
import { cn } from "@/lib/utils";

interface ModeToggleProps {
  className?: string;
}

export function ModeToggle({ className }: ModeToggleProps) {
  const { setTheme, theme } = useTheme();

  return (
    <div className={cn("flex justify-between items-center gap-x-2", className)}>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={(isChecked) => setTheme(isChecked ? "dark" : "light")}
        aria-label="Toggle Dark Mode"
      />
      <Button
        variant={"ghost"}
        size={"sm"}
        className="hover:bg-transparent  cursor-context-menu"
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </div>
  );
}

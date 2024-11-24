import { cn } from "@/lib/utils";
import { Mail, Bell, ShoppingCart } from "lucide-react";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

interface NotificationProps {
  className?: string;
}
export const NotificationDesktop = ({ className }: NotificationProps) => {
  return (
    <div
      className={cn(
        "flex  flex-row gap-x-2 w-full items-center justify-around text-primario-200",
        className
      )}
    >
      <Button variant="outline" size={"sm"} className="border-none">
        <ShoppingCart className="size-5 " />
      </Button>
      <Separator orientation="vertical" className="h-4 bg-primario-200" />
      <Button variant="outline" size={"sm"} className="border-none">
        <Bell className="size-5" />
      </Button>
      <Separator orientation="vertical" className="h-4 bg-primario-200" />
      <Button variant="outline" size={"sm"} className="border-none">
        <Mail className="size-5" />
      </Button>
    </div>
  );
};

export const NotificationMobile = ({ className }: NotificationProps) => {
  return (
    <div
      className={cn(
        "flex  flex-row gap-x-2 w-full items-center justify-around",
        className
      )}
    >
      <Button variant="outline" size={"sm"} className="border-2">
        <ShoppingCart className="size-5" />
      </Button>
      <Separator orientation="vertical" className="h-4 " />
      <Button variant="outline" size={"sm"} className="border-2">
        <Bell className="size-5" />
      </Button>
      <Separator orientation="vertical" className="h-4 " />
      <Button variant="outline" size={"sm"} className="border-2">
        <Mail className="size-5" />
      </Button>
    </div>
  );
};

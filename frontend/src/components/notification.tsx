import { cn } from "@/lib/utils";
import { Mail, Bell, ShoppingCart } from "lucide-react";

import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

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
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="outline" size={"sm"} className="border-none">
            <ShoppingCart className="size-5 " />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>No tiene Cursos disponibles</HoverCardContent>
      </HoverCard>
      <Separator orientation="vertical" className="h-4 bg-primario-200" />
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="outline" size={"sm"} className="border-none">
            <Bell className="size-5" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>No tiene Notificaciones Pendientes</HoverCardContent>
      </HoverCard>
      <Separator orientation="vertical" className="h-4 bg-primario-200" />
      <HoverCard>
        <HoverCardTrigger>
          <Button variant="outline" size={"sm"} className="border-none">
            <Mail className="size-5" />
          </Button>
        </HoverCardTrigger>
        <HoverCardContent>No tiene Mensajes Pendientes</HoverCardContent>
      </HoverCard>
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
      <Button variant="outline" size={"sm"} className="border-none">
        <ShoppingCart className="size-5" />
      </Button>
      <Separator orientation="vertical" className="h-4 " />
      <Button variant="outline" size={"sm"} className="border-none">
        <Bell className="size-5" />
      </Button>
      <Separator orientation="vertical" className="h-4 " />
      <Button variant="outline" size={"sm"} className="border-none">
        <Mail className="size-5" />
      </Button>
    </div>
  );
};

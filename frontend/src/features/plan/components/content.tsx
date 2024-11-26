"use client";
import { useState } from "react";

import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

import TablePlan from "./table";
import CarouselPlan from "./carousel";

const ContentPlan = () => {
  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);

  const handlePlanSelect = (id: number) => {
    setSelectedPlanId(id);
  };

  const handleContinue = () => {
    if (selectedPlanId) {
      // Redirigir con el ID del plan seleccionado
      console.log("Continuar con el plan: ", selectedPlanId);
    } else {
      alert("Por favor selecciona un plan antes de continuar.");
    }
  };

  return (
    <div className="flex flex-col  justify-center p-4 w-full h-full bg-primario-100/80 dark:bg-gray-900  rounded-sm gap-y-4">
      <h2 className="text-lg font-semibold">
        ¡Bienvenido a la comunidad de Vendedores !
      </h2>
      <p className="text-sm">
        Elige el plan que mejor se adapte a tus necesidades y comienza a
        monetizar tus creacione. Desde el plan gratuito hasta las opciones
        premium, cada uno ofrece herramientas diseñadas para maximizar tu éxito
        como creador.
      </p>
      <h3 className="text-md font-semibold">Detalles del plan seleccionado</h3>
      <p className="text-sm">
        A continuación, encontrarás una descripción detallada de las
        características y beneficios del plan seleccionado.
      </p>

      <div className="flex flex-col gap-y-4 w-full h-full rounded-md bg-primario-200/80 dark:bg-gray-700/80 p-4">
        <div className="text-xs flex gap-x-2 flex-wrap justify-center items-center">
          <p>Facturación Mensual </p>
          <Switch className="data-[state=checked]:bg-primario data-[state=unchecked]:bg-primario-100 dark:data-[state=checked]:bg-primario-300 dark:data-[state=unchecked]:bg-primario-100" />
          <p className="text-primario dark:text-primario-300">
            Facturación Anual ahorra el 15%{" "}
          </p>
        </div>
        <Separator />

        <div className="flex w-full justify-center items-center">
          <CarouselPlan onPlanSelect={handlePlanSelect} />
        </div>
      </div>
      <div className="flex">
        <TablePlan />
      </div>
      <Button
        variant={"primario"}
        className="min-w-min"
        onClick={handleContinue}
      >
        Continuar
      </Button>
    </div>
  );
};

export default ContentPlan;

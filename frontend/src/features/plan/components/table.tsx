import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleCheckBig } from "lucide-react";

const TablePlan = () => {
  return (
    <Table className="w-full  rounded-md ">
      {/* <TableCaption>Tabla de contenidos</TableCaption> */}

      <TableHeader className="  ">
        <TableRow className="">
          <TableHead className="text-primary">Comprar Planes</TableHead>
          <TableHead className="text-primary">Free</TableHead>
          <TableHead className="text-primary">
            <div className="flex flex-col items-center justify-center">
              <p>$25/mes</p>
              <p className="text-primario-300 text-xs">Seleccionar plan</p>
            </div>
          </TableHead>
          <TableHead className="text-primary">
            <div className="flex flex-col items-center justify-center">
              <p>$25/mes</p>
              <p className="text-primario-300 text-xs">Seleccionar plan</p>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-xs">
        <TableRow className="">
          <TableCell>Aspecto </TableCell>
          <TableCell>
            Perfecto para quienes recién empiezan y quieren explorar la
            plataforma.{" "}
          </TableCell>
          <TableCell>
            Desbloquea funcionalidades avanzadas y personaliza tu experiencia.
          </TableCell>
          <TableCell>
            Accede a todas nuestras funciones exclusivas y maximiza tu potencial
            como creador.
          </TableCell>
        </TableRow>
        <TableRow className="">
          <TableCell>Aspecto </TableCell>
          <TableCell>Publica hasta 3 aplicaciones.</TableCell>
          <TableCell>Publica hasta 10 aplicaciones.</TableCell>
          <TableCell>Publicaciones ilimitadas.</TableCell>
        </TableRow>
        <TableRow className="">
          <TableCell>Análisis avanzado y personalización</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            {" "}
            <div className="flex items-center justify-center text-primario-300">
              <CircleCheckBig />
            </div>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Soporte exclusivo 24/7.</TableCell>
          <TableCell></TableCell>
          <TableCell>
            <div className="flex items-center justify-center text-primario-300">
              <CircleCheckBig />
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center justify-center text-primario-300">
              <CircleCheckBig />
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TablePlan;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface CardPlanProps {
  title: string | undefined;
  image: string | StaticImport;
  description: string[];
  price: string;
  comisiones?: string;
  className?: string;
}

const CardPlan = ({
  title,
  description,
  price,
  image,
  comisiones,
  className,
}: CardPlanProps) => {
  return (
    <Card
      className={cn(
        "max-w-[380px] bg-primario-100 dark:bg-gray-600/80 rounded-sm text-gray-700 dark:text-primary",
        className
      )}
    >
      <CardHeader className="flex justify-center items-center max-h-[240px]  p-3">
        <Image
          src={image || "/images/auth/bg.png"}
          alt="logo"
          width={380}
          height={80}
          className="rounded-md overflow-hidden"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-y-4">
        <div className=" flex flex-col items-start justify-center text-md font-semibold">
          <p>{title || "Static"}</p>
          <p>$ {price || "9,99"}</p>
        </div>
        <div className="flex flex-col items-start justify-center text-sm ">
          <ul className="list-disc pl-5 marker:text-primario dark:marker:text-primario-300">
            {description.map((item, index) => (
              <li key={index}>{item || `Descripcion ${index + 1}`}</li>
            ))}
          </ul>
        </div>
        <div className="flex text-sm justify-center items-center">
          <p>
            <span className="font-semibold">Comisiones :</span>{" "}
            {comisiones ||
              `PayPal 20%,
            Stripe 15%, Cripto 12%`}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardPlan;

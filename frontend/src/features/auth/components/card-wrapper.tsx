import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Header from "./header";
import Social from "./social";
import BackButton from "./back-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonText: string;
  backButtonHref: string;
  showSocial?: boolean;
}

const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonText,
  backButtonHref,
  showSocial,
}: Readonly<CardWrapperProps>) => {
  return (
    <Card className=" flex flex-col items-center justify-center  w-full max-w-[600px] lg:max-w-[450px] h-full lg:max-h-[600px] border-none shadow-none bg-transparent p-0 m-0  rounded-none  ">
      <CardHeader className="lg:hidden ">
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent className="w-full pb-2">{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col gap-y-2 justify-center w-full">
          <p className="text-xs"> o conecta tu cuenta con </p>
          <Social />
        </CardFooter>
      )}
      <CardFooter className="flex flex-col gap-y-6 justify-center w-full">
        <div className="flex items-center space-x-2">
          <Checkbox id="notifications" />
          <Label htmlFor="notifications" className="text-xs">
            Quiero recibir novedades y consejos de la plataforma.
          </Label>
        </div>

        <BackButton
          href={backButtonHref}
          label={backButtonLabel}
          text={backButtonText}
        />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;

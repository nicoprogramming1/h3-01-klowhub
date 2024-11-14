import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 px-10">
      <h1 className="text-green-400">KlowHub</h1>
      <div className="flex gap-x-2">
        <Button variant={"primario"}>Primary</Button>
        <Button variant={"outline"} size={"lg"}>
          Outline
        </Button>
        <Button size={"sm"} variant={"destructive"}>
          Destructive
        </Button>
        <Button variant="link" size="icon">
          P
        </Button>
        <Button variant="secudario">Secundario</Button>
        {/* Este se podría hacer un componente para el botton Back separado  */}
        <Button variant="outline" className="">
          A
        </Button>
      </div>
    </div>
  );
}

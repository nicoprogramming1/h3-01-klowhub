import { cn } from "@/lib/utils";

interface HeaderProps {
  label: string;
  className?: string;
}

const Header = ({ label, className }: Readonly<HeaderProps>) => {
  return (
    <div
      className={cn(
        " w-full flex flex-col gap-y-6  justify-center items-center ",
        className
      )}
    >
      {/* <div className="flex dark:bg-gray-500 bg-white p-1 rounded-sm">
        <h1 className="text-2xl font-semibold">
          Klowhub{" "}
          <span className="bg-primario p-1 rounded-md text-white font-medium text-start text-xl ml-2">
            {label}
          </span>{" "}
        </h1>
      </div> */}
      <div className="flex rounded-sm">
        <h1 className="text-2xl font-semibold">Klowhub </h1>
      </div>

      {/* <div className="w-full flex flex-col items-center justify-center gap-y-2">
        <p className="text-sm text-primary font-medium text-start  dark:text-shadow-none text-shadow-white ">
          {text}
        </p>
      </div> */}
    </div>
  );
};

export default Header;

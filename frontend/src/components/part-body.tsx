import { cn } from "@/lib/utils";

interface PartBodyProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
}

const PartBody = ({
  title,
  description,
  children,
  className,
}: PartBodyProps) => {
  return (
    <div
      className={cn(
        "flex flex-col  justify-center p-4 sm:px-8 w-full h-fit bg-primario-100/40 dark:bg-gray-900  rounded-sm ",
        className
      )}
    >
      {(description ?? title) && (
        <div className="flex flex-col w-full gap-y-2">
          {title && <h2 className="text-lg font-semibold">{title}</h2>}
          {description && <p className="text-sm">{description}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PartBody;

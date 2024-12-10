import { useRouter } from "next/navigation";

interface FindByCardProps {
  title: string;
  link: string;
}

const FindByCard = ({ title, link }: FindByCardProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(link);
  };
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer  bg-[url('/images/dashboard/headerLigh1.png')] bg-cover bg-center  dark:bg-[url('/images/dashboard/header1.png')] p-4 rounded-lg hover:scale-[1.01] max-w-[290px] min-w-[230px] h-[80px] gap-y-2"
      onClick={() => handleClick()}
    >
      <h1 className="text-md font-semibold">{title || "New Title"}</h1>
    </div>
  );
};

export default FindByCard;

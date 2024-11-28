import CarouselCardMember from "@/components/carousel-card-member";
import { fakeDataMember } from "@/data";

const MemberData = () => {
  const fakeData = fakeDataMember;
  return (
    <div className="flex flex-col  justify-center p-4 sm:px-8 w-full h-full bg-primario-100/80 dark:bg-gray-900  rounded-sm gap-y-4 sm:gap-y-6">
      <div className="flex px-2 items-center justify-center ">
        <CarouselCardMember data={fakeData} link="/" />
      </div>
    </div>
  );
};

export default MemberData;

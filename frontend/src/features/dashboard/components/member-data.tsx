import CarouselCardMember from "@/components/carousel-card-member";
import PartBody from "@/components/part-body";
import { fakeDataMember } from "@/data";
import MemberTitle from "./member-title";

const MemberData = () => {
  const fakeData = fakeDataMember;
  return (
    <PartBody>
      <MemberTitle />
      <div className="flex  items-center justify-center ">
        <CarouselCardMember data={fakeData} link="/members" />
      </div>
    </PartBody>
  );
};

export default MemberData;

import CarouselCardMember from "@/components/carousel-card-member";

const MemberData = () => {
  const fakeData = [
    {
      id: 1,
      image: "/images/user/image-3.png",
      name: "Juan Ramirez",
      reviews: 20,
      language: "Español",
      price: 99.99,
      link: "/",
    },
    {
      id: 2,
      image: "/images/user/image-2.png",
      name: "Juan Ramirez",
      reviews: 13,
      language: "Español",
      price: 99.99,
      link: "/",
    },
    {
      id: 3,
      image: "/images/user/image-1.png",
      name: "Juan Ramirez",
      reviews: 7,
      language: "Español",
      price: 99.99,
      link: "/",
    },
    {
      id: 4,
      image: "/images/user/image-4.png",
      name: "Juan Ramirez",
      reviews: 9,
      language: "Español",
      price: 99.99,
      link: "/",
    },
  ];
  return <CarouselCardMember data={fakeData} link="/" />;
};

export default MemberData;

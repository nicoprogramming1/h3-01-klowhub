"use client";
import FormProfilePro from "@/features/profile/components/form-profile-PRO";
import { useRouter } from "next/navigation";

const ProfileProPage = () => {
  const router = useRouter();
  
  return (
    <div>
      <FormProfilePro router={router} />
    </div>
  );
};

export default ProfileProPage;

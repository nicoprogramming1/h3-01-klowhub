"use client";
import UnauthorizedPage from "@/components/unauthorized-page";
import InfoProfile from "@/features/profile/components/info-profile";

import { useAuth } from "@/hooks/auth-provider";

const ProfilePage = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <UnauthorizedPage />;
  }
  return <InfoProfile></InfoProfile>;
};

export default ProfilePage;

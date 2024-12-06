"use client";
import LoadingDefault from "@/components/loading";
import UnauthorizedPage from "@/components/unauthorized-page";
import InfoProfile from "@/features/profile/components/info-profile";
import InfoProfilePRO from "@/features/profile/components/info-profile-PRO";

import { useAuth } from "@/hooks/auth-provider";
import { Suspense, useEffect, useState } from "react";

const ProfilePage = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <UnauthorizedPage />;
  }

  return <InfoProfilePRO></InfoProfilePRO>;
};

export default ProfilePage;

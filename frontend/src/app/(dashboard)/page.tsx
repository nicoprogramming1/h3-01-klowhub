"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-provider";

const DashboardPage = () => {
  const { isAuthenticated, user, logout } = useAuth();
  console.log({ user });
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-4xl font-bold">Dashboard</h1>
      <p>Is Authenticated: {isAuthenticated ? "true" : "false"}</p>
      <p>User: {user?.longName}</p>
      <Button onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default DashboardPage;

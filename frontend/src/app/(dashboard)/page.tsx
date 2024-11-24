"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/auth-provider";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user, logout } = useAuth();
  // Use useEffect para establecer el estado de carga cuando se verifique el estado de autenticación
  useEffect(() => {
    if (isAuthenticated !== null) {
      // Verifica si ya se sabe el estado de la autenticación
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    // Puedes mostrar un loader o un mensaje mientras esperas la autenticación
    return <div>Loading...</div>;
  }

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

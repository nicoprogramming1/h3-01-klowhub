import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-full bg-background">
      <div className="max-w-md w-full px-4">
        <Alert className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error de autorización</AlertTitle>
          <AlertDescription>
            No tienes permiso para acceder a esta página.
          </AlertDescription>
        </Alert>
        <div className="text-center">
          <Link href="/auth/login">
            <Button>Inicia Sesión</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

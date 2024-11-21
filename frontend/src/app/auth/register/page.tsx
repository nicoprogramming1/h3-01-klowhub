import { Suspense } from "react";
import { ModeToggle } from "@/components/mode-toogle";

import RegisterForm from "@/features/auth/components/register-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ModeToggle className="absolute top-0 right-0" />
      <RegisterForm />
    </Suspense>
  );
};

export default LoginPage;

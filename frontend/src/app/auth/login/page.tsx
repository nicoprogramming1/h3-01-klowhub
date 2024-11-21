import { Suspense } from "react";
import { ModeToggle } from "@/components/mode-toogle";

import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <ModeToggle className="absolute top-0 right-0" />
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;

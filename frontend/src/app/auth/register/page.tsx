import { ModeToggle } from "@/components/mode-toogle";

import RegisterForm from "@/features/auth/components/register-form";

const LoginPage = () => {
  return (
    <>
      <ModeToggle className="absolute top-0 right-0" />
      <RegisterForm />
    </>
  );
};

export default LoginPage;

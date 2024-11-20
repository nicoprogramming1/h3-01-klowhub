import { ModeToggle } from "@/components/mode-toogle";

import LoginForm from "@/features/auth/components/login-form";

const LoginPage = () => {
  return (
    <>
      <ModeToggle className="absolute top-0 right-0" />
      <LoginForm />
    </>
  );
};

export default LoginPage;

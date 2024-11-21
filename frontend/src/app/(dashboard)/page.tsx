import { AUTH_COOKIE } from "@/constants";
import { cookies } from "next/headers";

const DashboardPage = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE) || null;
  console.log({ token });
  return (
    <div>
      {token ? (
        <p>Hola, bienvenido de nuevo! {token.value} </p>
      ) : (
        <p>No estás autenticado. Por favor inicia sesión.</p>
      )}
    </div>
  );
};

export default DashboardPage;

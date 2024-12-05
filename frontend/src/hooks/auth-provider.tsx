"use client";

import * as z from "zod";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { API_URL } from "@/constants";
import { currentUser } from "@/features/auth/api/current";
import { LoginSchema } from "@/features/auth/schemas";
import { deleteToken, getToken, setToken } from "@/features/utils/token";
import { usePathname, useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  longName: string;
  imageProfile?: string;
  about: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (values: z.infer<typeof LoginSchema>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [newToken, setNewToken] = useState(false);

  const router = useRouter();
  const pathname = usePathname();

  const defaultValues = useMemo(
    () => ({
      app: "yourAppName",
      country: "yourCountry",
      ipAddress: "yourIPAddress",
      device: "yourDeviceInfo",
    }),
    []
  );

  useEffect(() => {
    if (pathname.startsWith("/")) {
      // Solo rutas internas
      // Guardamos la página anterior si no es '/auth/login'
      const previousPage = localStorage.getItem("lastVisitedPage");
      if (
        pathname !== "/auth/" &&
        !pathname.startsWith("/auth/") &&
        previousPage !== pathname
      ) {
        localStorage.setItem("lastVisitedPage", pathname);
      }
    }
  }, [pathname]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const data = await currentUser();
        setIsLoggedIn(!!data);
        setUser(data || null);
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
        console.error("Error al verificar el estado de autenticación:", error);
      }
    };

    checkAuthStatus();
  }, [newToken]);

  // Usar useCallback para evitar la redefinición de login en cada render
  const login = useCallback(
    async (values: z.infer<typeof LoginSchema>) => {
      const validateFields = LoginSchema.safeParse(values);
      if (!validateFields.success) {
        toast.error("Campos Invalidos");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...values, ...defaultValues }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          toast.error(errorData.message || "Error al Ingresar");
          return;
        }

        const data = await response.json();
        const { token } = data;

        if (token) {
          setToken(token);
          setNewToken(true);
          setIsLoggedIn(true);
          // setUser(data.user);
          toast.success("Usuario conectado");
          const lastVisitedPage =
            localStorage.getItem("lastVisitedPage") ?? "/";
          router.push(lastVisitedPage); // Regresar a la última página visitada
        }
      } catch (error) {
        toast.error("Error de conexión con el servidor");
        console.error(error);
      }
    },
    [defaultValues, router]
  );

  const logout = useCallback(async () => {
    try {
      const token = await getToken();
      if (token?.value) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.value}`,
          },
          body: JSON.stringify(defaultValues),
        });
      }

      setIsLoggedIn(false);
      setNewToken(false);
      setUser(null);
      deleteToken();

      // TODO: Manejar la navegación a la página de inicio después de cerrar sesión
      const lastVisitedPage = localStorage.getItem("lastVisitedPage");
      const isProtected =
        lastVisitedPage && lastVisitedPage.startsWith("/auth/");
      const redirectTo = isProtected ? "/" : lastVisitedPage ?? "/";
      router.push(redirectTo);
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  }, [defaultValues, router]);

  const value = useMemo(
    () => ({
      isAuthenticated: isLoggedIn,
      user,
      login,
      logout,
    }),
    [isLoggedIn, user, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};

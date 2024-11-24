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
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  longName: string;
  image?: string;
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

  const router = useRouter();

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
  }, []);

  // Usar useCallback para evitar la redefinición de login en cada render
  const login = useCallback(async (values: z.infer<typeof LoginSchema>) => {
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
        setIsLoggedIn(true);
        setUser(data.user);
        toast.success("Usuario conectado");
        router.push("/");
      }
    } catch (error) {
      toast.error("Error de conexión con el servidor");
      console.error(error);
    }
  }, []);

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
      setUser(null);
      deleteToken();
    } catch (error) {
      console.error("Error durante el cierre de sesión:", error);
    }
  }, [setUser, defaultValues]);

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

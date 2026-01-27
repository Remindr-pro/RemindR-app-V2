"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthService, RegisterData } from "./auth-service";

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  userType: string;
  familyId?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté au chargement
    const checkAuth = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser();

        setUser(currentUser);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await AuthService.login({ email, password });

    setUser(response.data.user);
    // Le token est déjà défini dans AuthService.login
  };

  const register = async (data: RegisterData) => {
    const response = await AuthService.register(data);

    setUser(response.data.user);
    // Le token est déjà défini dans AuthService.register
  };

  const logout = async () => {
    await AuthService.logout();

    setUser(null);
    // Le token est déjà supprimé dans AuthService.logout
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }
  return context;
}

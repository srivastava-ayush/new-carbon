"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { auth, User } from "@/lib/auth";
import { fetchAPI } from "@/lib/api";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const initAuth = () => {
      const storedToken = auth.getToken();
      const storedUser = auth.getUser();
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetchAPI("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      
      if (response.success && response.data) {
        const { token, user } = response.data;
        auth.setSession(token, user);
        setToken(token);
        setUser(user);
        router.push("/dashboard");
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      const response = await fetchAPI("/auth/register", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password, role: "UNIVERSITY_ADMIN" }),
      });
      // The user wants to redirect to login after signup, so we don't auto-login here.
    } catch (error: any) {
      throw error;
    }
  };

  const logout = () => {
    auth.clearSession();
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

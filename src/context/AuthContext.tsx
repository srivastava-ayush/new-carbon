"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// DEMO-ONLY auth context backed by the V2 backend's JWT flow.
// The JWT lives in localStorage under "token"; the raw backend user record
// (as returned by /auth/login & /auth/register) lives under "user".

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  universityId?: string;
}

/** Raw user object returned by the V2 auth endpoints. */
export interface BackendUser {
  id: string;
  username?: string;
  email?: string;
  role?: string;
  organisationId?: string | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  setAuth: (token: string, backendUser: BackendUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function toContextUser(u: BackendUser): User {
  const name = u.username || "";
  const [firstName = "", ...rest] = name.split(" ");
  return {
    id: u.id,
    firstName,
    lastName: rest.join(" ") || undefined,
    email: u.email ?? "",
    role: u.role,
    universityId: u.organisationId ?? undefined,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [backendUser, setBackendUser] = useState<BackendUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUserJson = localStorage.getItem("user");
      if (storedToken && storedUserJson) {
        setToken(storedToken);
        setBackendUser(JSON.parse(storedUserJson) as BackendUser);
      }
    } catch {
      // Corrupt storage: treat as logged out.
    }
    setLoading(false);
  }, []);

  const setAuth = useCallback((newToken: string, newBackendUser: BackendUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newBackendUser));
    setToken(newToken);
    setBackendUser(newBackendUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setBackendUser(null);
    router.push("/auth/signin");
  }, [router]);

  const value = useMemo<AuthContextType>(
    () => ({
      user: backendUser ? toContextUser(backendUser) : null,
      token,
      isAuthenticated: !!token && !!backendUser,
      loading,
      setAuth,
      logout,
    }),
    [backendUser, token, loading, setAuth, logout],
  );

  return (
    <AuthContext.Provider value={value}>
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

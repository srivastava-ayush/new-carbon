"use client";

import React, { createContext, useContext, useMemo } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth/client";

export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  role?: string;
  universityId?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const session = authClient.useSession();

  const value = useMemo<AuthContextType>(() => {
    const sessionUser = session.data?.user;
    const name = sessionUser?.name || "";
    const [firstName = "", ...rest] = name.split(" ");

    return {
      user: sessionUser
        ? {
            id: sessionUser.id,
            firstName,
            lastName: rest.join(" ") || undefined,
            email: sessionUser.email,
          }
        : null,
      token: null,
      isAuthenticated: !!sessionUser,
      loading: session.isPending,
      logout: () => {
        authClient.signOut().finally(() => {
          router.push("/auth/signin");
        });
      },
    };
  }, [session.data, session.isPending, router]);

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

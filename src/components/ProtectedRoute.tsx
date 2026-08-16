"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#fafafa]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/10 border-t-[#16a34a]" />
      </div>
    );
  }

  return <>{children}</>;
}

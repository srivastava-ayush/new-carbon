import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard — Carbonsynq",
  description: "Carbon emission analytics dashboard.",
};

export default function DashboardPage() {
  return (
    
      <Dashboard />
  );
}

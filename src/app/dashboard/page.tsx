import type { Metadata } from "next";
import Dashboard from "@/components/dashboard/Dashboard";

export const metadata: Metadata = {
  title: "Dashboard — Carbonsynq",
  description: "Carbon emission analytics dashboard.",
};

export default function DashboardPage() {
  return <Dashboard />;
}

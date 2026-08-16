"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useDashboard } from "./useDashboard";

const DashboardContext = createContext<any>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useDashboard();

  return (
    <DashboardContext.Provider value={{ data, loading, error }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardContext() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboardContext must be used within DashboardProvider");
  }
  return context;
}

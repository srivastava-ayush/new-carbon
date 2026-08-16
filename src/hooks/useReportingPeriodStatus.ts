"use client";

import { useState, useEffect } from "react";
import { fetchAPI } from "@/lib/api";

export function useReportingPeriodStatus() {
  const [isLocked, setIsLocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkStatus() {
      const uId = localStorage.getItem("universityId");
      const pId = localStorage.getItem("reportingPeriodId");

      if (!uId || !pId) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetchAPI(`/reporting-periods/${pId}`);
        if (response.success && response.data) {
          setIsLocked(response.data.status === "LOCKED");
        }
      } catch (err) {
        console.error("Failed to check period status", err);
      } finally {
        setLoading(false);
      }
    }

    checkStatus();
    
    // Optional: listen to storage changes if period is changed in another tab
    const handleStorageChange = () => checkStatus();
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return { isLocked, loading };
}

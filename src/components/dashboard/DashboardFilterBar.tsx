"use client";

import { useEffect, useState } from "react";
import { useDashboardContext } from "@/hooks/useDashboardContext";
import { fetchAPI } from "@/lib/api";

export default function DashboardFilterBar() {
  const { filters, setFilters } = useDashboardContext();
  
  const [reportingPeriods, setReportingPeriods] = useState<any[]>([]);
  const [campuses, setCampuses] = useState<any[]>([]);
  const [buildings, setBuildings] = useState<any[]>([]);
  const [floors, setFloors] = useState<any[]>([]);

  useEffect(() => {
    async function loadDropdowns() {
      const uId = typeof window !== "undefined" ? localStorage.getItem("universityId") || "" : "";
      if (!uId) return;

      try {
        const [rpRes, campRes, buildRes, floorRes] = await Promise.all([
          fetchAPI(`/reporting-periods?universityId=${uId}`),
          fetchAPI(`/campuses?universityId=${uId}`),
          fetchAPI(`/buildings?universityId=${uId}`),
          fetchAPI(`/floors?universityId=${uId}`)
        ]);

        if (rpRes.success) setReportingPeriods(rpRes.data);
        if (campRes.success) setCampuses(campRes.data);
        if (buildRes.success) setBuildings(buildRes.data);
        if (floorRes.success) setFloors(floorRes.data);
      } catch (e) {
        console.error("Failed to load dashboard dropdowns", e);
      }
    }
    loadDropdowns();
  }, []);

  // Set default reporting period if one exists and none is selected
  useEffect(() => {
    if (reportingPeriods.length > 0 && !filters.reportingPeriodId) {
      const defaultPeriod = reportingPeriods.find(rp => rp.isBaseline) || reportingPeriods[0];
      setFilters((prev: any) => ({ ...prev, reportingPeriodId: defaultPeriod.id }));
    }
  }, [reportingPeriods, filters.reportingPeriodId, setFilters]);

  return (
    <div className="flex flex-wrap items-center gap-[12px] rounded-[12px] border border-black/[0.08] bg-white p-[16px] shadow-[0_1px_3px_rgba(0,0,0,0.02)] mb-[24px]">
      <div className="flex items-center gap-[8px]">
        <span className="text-[12px] font-semibold text-[#71717a] uppercase tracking-wide">Filters</span>
      </div>

      <div className="h-[24px] w-[1px] bg-black/[0.08] mx-[4px]"></div>

      <div className="flex flex-wrap items-center gap-[12px]">
        {/* Reporting Period */}
        <div className="flex flex-col gap-[4px]">
          <select 
            className="rounded-[6px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={filters.reportingPeriodId}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, reportingPeriodId: e.target.value }))}
          >
            <option value="">All Periods</option>
            {reportingPeriods.map(rp => (
              <option key={rp.id} value={rp.id}>{rp.name}</option>
            ))}
          </select>
        </div>

        {/* Campus */}
        <div className="flex flex-col gap-[4px]">
          <select 
            className="rounded-[6px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={filters.campusId}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, campusId: e.target.value, buildingId: "", floorId: "" }))}
          >
            <option value="">All Campuses</option>
            {campuses.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        {/* Building (Filtered by Campus) */}
        <div className="flex flex-col gap-[4px]">
          <select 
            className="rounded-[6px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={filters.buildingId}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, buildingId: e.target.value, floorId: "" }))}
            disabled={!filters.campusId}
          >
            <option value="">All Buildings</option>
            {buildings.filter(b => b.campusId === filters.campusId).map(b => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* Floor (Filtered by Building) */}
        <div className="flex flex-col gap-[4px]">
          <select 
            className="rounded-[6px] border border-black/[0.1] bg-white px-[10px] py-[6px] text-[13px] text-black outline-none focus:border-black focus:ring-1 focus:ring-black"
            value={filters.floorId}
            onChange={(e) => setFilters((prev: any) => ({ ...prev, floorId: e.target.value }))}
            disabled={!filters.buildingId}
          >
            <option value="">All Floors</option>
            {floors.filter(f => f.buildingId === filters.buildingId).map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

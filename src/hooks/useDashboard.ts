import { useState, useEffect } from 'react';
import { getDashboardSummary } from '../lib/api';
import * as demoData from '../lib/demo-data';

export function useDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // By default, it will read token & ID from localStorage (via api.ts)
        const response = await getDashboardSummary();
        
        if (response.success) {
          setData(mapBackendToFrontend(response.data));
        } else {
          console.warn("Backend fetch returned false, falling back to demo data.", response.message);
          setData(demoData);
        }
      } catch (err: any) {
        console.warn("Backend fetch failed, falling back to demo data.", err);
        setData(demoData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, loading, error };
}

// Maps the backend format to the exact frontend structures expected
function mapBackendToFrontend(backendData: any) {
  const b = backendData;

  const MONTHLY = (b.trends || []).map((t: any) => {
    const d = new Date(t.month);
    return {
      month: d.toLocaleString('default', { month: 'short' }),
      total: Math.round(t.totalKg / 1000),
      scope1: Math.round(t.scope1Kg / 1000),
      scope2: Math.round(t.scope2Kg / 1000),
      scope3: 0 // backend doesn't seem to return scope 3 trends right now
    };
  });

  const TOTAL_12M = Math.round(b.overview?.totalEmissionsTonnes || 0);
  const SCOPE1_12M = Math.round(b.overview?.scope1Tonnes || 0);
  const SCOPE2_12M = Math.round(b.overview?.scope2Tonnes || 0);
  const SCOPE3_12M = 0; // Update when scope 3 is available

  const SCOPES = [
    { key: "scope1", name: "Scope 1 — Direct", value: SCOPE1_12M, share: TOTAL_12M ? SCOPE1_12M / TOTAL_12M : 0, color: "#15803d" },
    { key: "scope2", name: "Scope 2 — Energy", value: SCOPE2_12M, share: TOTAL_12M ? SCOPE2_12M / TOTAL_12M : 0, color: "#22c55e" },
    { key: "scope3", name: "Scope 3 — Value chain", value: SCOPE3_12M, share: TOTAL_12M ? SCOPE3_12M / TOTAL_12M : 0, color: "#86efac" },
  ];

  const CATEGORIES = (b.categories || []).map((c: any) => ({
    name: c.category.replace(/_/g, ' ').toLowerCase(),
    scope: c.scope === "SCOPE_1" ? "S1" : c.scope === "SCOPE_2" ? "S2" : "S3",
    value: Math.round(c.tonnesCO2e),
    share: TOTAL_12M ? c.tonnesCO2e / TOTAL_12M : 0,
    trend: c.trend || 0, 
    sources: 1, 
  }));

  const KPIS = [
    {
      label: "Total footprint",
      value: TOTAL_12M,
      suffix: " tCO₂e",
      delta: b.overview?.delta || 0,
      deltaLabel: "vs last 12 months",
      good: (b.overview?.delta || 0) <= 0,
      spark: MONTHLY.map((m: any) => m.total),
    },
    {
      label: "Scope 1 emissions",
      value: SCOPE1_12M,
      suffix: " tCO₂e",
      delta: TOTAL_12M ? Number((SCOPE1_12M / TOTAL_12M * 100).toFixed(1)) : 0,
      deltaLabel: "share of total",
      good: false,
      spark: MONTHLY.map((m: any) => m.scope1),
    },
    {
      label: "Scope 2 emissions",
      value: SCOPE2_12M,
      suffix: " tCO₂e",
      delta: TOTAL_12M ? Number((SCOPE2_12M / TOTAL_12M * 100).toFixed(1)) : 0,
      deltaLabel: "share of total",
      good: false,
      spark: MONTHLY.map((m: any) => m.scope2),
    },
    {
      label: "Reduction vs baseline",
      value: b.overview?.reductionPercentage || 0,
      decimals: 1,
      suffix: "%",
      delta: 0,
      deltaLabel: "of baseline",
      good: (b.overview?.reductionPercentage || 0) > 0,
      spark: [],
    },
  ];

  const SCOPE_DETAILS = [
    {
      key: "scope1",
      num: "1",
      name: "Direct emissions",
      headline: "Sources you own or control",
      description: "Emissions from owned or controlled sources, including on-site fuel combustion, the company fleet and refrigerants.",
      color: "#15803d",
      share: TOTAL_12M ? SCOPE1_12M / TOTAL_12M : 0,
      total: SCOPE1_12M,
      delta: 0,
      intensity: 0,
      monthly: MONTHLY.map((m: any) => ({ month: m.month, value: m.scope1 })),
      sources: (b.categories || [])
        .filter((c: any) => c.scope === "SCOPE_1")
        .map((c: any) => ({ name: c.category, value: Math.round(c.tonnesCO2e), share: SCOPE1_12M ? c.tonnesCO2e / SCOPE1_12M : 0 })),
    },
    {
      key: "scope2",
      num: "2",
      name: "Energy purchases",
      headline: "Indirect emissions from energy",
      description: "Emissions from purchased electricity, heating and cooling that is generated upstream of your operations.",
      color: "#22c55e",
      share: TOTAL_12M ? SCOPE2_12M / TOTAL_12M : 0,
      total: SCOPE2_12M,
      delta: 0,
      intensity: 0,
      monthly: MONTHLY.map((m: any) => ({ month: m.month, value: m.scope2 })),
      sources: (b.categories || [])
        .filter((c: any) => c.scope === "SCOPE_2")
        .map((c: any) => ({ name: c.category, value: Math.round(c.tonnesCO2e), share: SCOPE2_12M ? c.tonnesCO2e / SCOPE2_12M : 0 })),
    },
    {
      key: "scope3",
      num: "3",
      name: "Value chain",
      headline: "All other indirect emissions",
      description: "Emissions across the full value chain, from purchased goods and travel to how customers use your products.",
      color: "#86efac",
      share: TOTAL_12M ? SCOPE3_12M / TOTAL_12M : 0,
      total: SCOPE3_12M,
      delta: 0,
      intensity: 0,
      monthly: MONTHLY.map((m: any) => ({ month: m.month, value: m.scope3 })),
      sources: (b.categories || [])
        .filter((c: any) => c.scope === "SCOPE_3")
        .map((c: any) => ({ name: c.category, value: Math.round(c.tonnesCO2e), share: SCOPE3_12M ? c.tonnesCO2e / SCOPE3_12M : 0 })),
    },
  ];

  return {
    MONTHLY,
    TOTAL_12M,
    SCOPE1_12M,
    SCOPE2_12M,
    SCOPE3_12M,
    SCOPES,
    CATEGORIES,
    KPIS,
    SCOPE_DETAILS,
    FOOTPRINT_GROUPS: b.groups || [],
    ACTIVITY: b.recentActivity || [],
    TARGETS: b.targets || [],
  };
}

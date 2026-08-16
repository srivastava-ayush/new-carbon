export interface MonthlyEmissions {
  month: string;
  total: number;
  scope1: number;
  scope2: number;
  scope3: number;
}

export const MONTHLY: MonthlyEmissions[] = [
  { month: "Aug", total: 524, scope1: 63, scope2: 147, scope3: 314 },
  { month: "Sep", total: 508, scope1: 61, scope2: 142, scope3: 305 },
  { month: "Oct", total: 496, scope1: 60, scope2: 139, scope3: 297 },
  { month: "Nov", total: 510, scope1: 61, scope2: 143, scope3: 306 },
  { month: "Dec", total: 488, scope1: 59, scope2: 137, scope3: 292 },
  { month: "Jan", total: 472, scope1: 57, scope2: 132, scope3: 283 },
  { month: "Feb", total: 465, scope1: 56, scope2: 130, scope3: 279 },
  { month: "Mar", total: 478, scope1: 57, scope2: 134, scope3: 287 },
  { month: "Apr", total: 456, scope1: 55, scope2: 128, scope3: 273 },
  { month: "May", total: 448, scope1: 54, scope2: 125, scope3: 269 },
  { month: "Jun", total: 441, scope1: 53, scope2: 123, scope3: 265 },
  { month: "Jul", total: 430, scope1: 52, scope2: 120, scope3: 258 },
];

export const TOTAL_12M = MONTHLY.reduce((acc, m) => acc + m.total, 0);
export const SCOPE1_12M = MONTHLY.reduce((acc, m) => acc + m.scope1, 0);
export const SCOPE2_12M = MONTHLY.reduce((acc, m) => acc + m.scope2, 0);
export const SCOPE3_12M = MONTHLY.reduce((acc, m) => acc + m.scope3, 0);

export const SCOPES = [
  { key: "scope1", name: "Scope 1 — Direct", value: SCOPE1_12M, share: 0.12, color: "#15803d" },
  { key: "scope2", name: "Scope 2 — Energy", value: SCOPE2_12M, share: 0.28, color: "#22c55e" },
  { key: "scope3", name: "Scope 3 — Value chain", value: SCOPE3_12M, share: 0.6, color: "#86efac" },
];

export interface Category {
  name: string;
  scope: string;
  value: number;
  share: number;
  trend: number;
  sources: number;
}

export const CATEGORIES: Category[] = [
  { name: "Purchased goods & services", scope: "S3", value: 1830, share: 0.32, trend: 3.2, sources: 84 },
  { name: "Electricity", scope: "S2", value: 1200, share: 0.21, trend: -8.4, sources: 27 },
  { name: "Other scope 3", scope: "S3", value: 1028, share: 0.18, trend: 1.1, sources: 112 },
  { name: "Business travel", scope: "S3", value: 515, share: 0.09, trend: -6.8, sources: 431 },
  { name: "Transport & logistics", scope: "S3", value: 457, share: 0.08, trend: 2.6, sources: 58 },
  { name: "On-site fuel", scope: "S1", value: 343, share: 0.06, trend: -3.9, sources: 12 },
  { name: "Purchased heating", scope: "S2", value: 343, share: 0.06, trend: -5.2, sources: 9 },
];

export interface FootprintItem {
  name: string;
  value: number;
  scope: string;
}

export interface FootprintGroup {
  key: string;
  name: string;
  icon: "airplane" | "users" | "building" | "truck" | "factory";
  value: number;
  share: number;
  delta: number;
  description: string;
  spark: number[];
  items: FootprintItem[];
}

export const FOOTPRINT_GROUPS: FootprintGroup[] = [
  {
    key: "travel",
    name: "Travel",
    icon: "airplane",
    value: 515,
    share: 0.09,
    delta: -6.8,
    description: "Employee business travel across flights, rail, hotels and rental cars.",
    spark: [64, 58, 60, 52, 48, 45, 42, 40, 39, 38, 36, 33],
    items: [
      { name: "Air travel — long haul", value: 218, scope: "S3" },
      { name: "Air travel — short haul", value: 92, scope: "S3" },
      { name: "Rental cars & taxis", value: 87, scope: "S3" },
      { name: "Hotel stays", value: 84, scope: "S3" },
      { name: "Rail", value: 34, scope: "S3" },
    ],
  },
  {
    key: "employees",
    name: "Employees",
    icon: "users",
    value: 342,
    share: 0.06,
    delta: 4.1,
    description: "Commuting, remote work energy and employee-owned equipment.",
    spark: [28, 28, 29, 30, 29, 30, 31, 31, 32, 32, 33, 34],
    items: [
      { name: "Commute — car", value: 118, scope: "S3" },
      { name: "Remote work energy", value: 87, scope: "S3" },
      { name: "Company vehicles", value: 76, scope: "S1" },
      { name: "Commute — transit", value: 41, scope: "S3" },
      { name: "Employee-owned equipment", value: 20, scope: "S3" },
    ],
  },
  {
    key: "offices",
    name: "Offices",
    icon: "building",
    value: 1280,
    share: 0.22,
    delta: -9.3,
    description: "Energy, water and waste from the 14 owned and leased offices.",
    spark: [132, 128, 122, 118, 116, 112, 108, 104, 102, 100, 98, 95],
    items: [
      { name: "Electricity", value: 720, scope: "S2" },
      { name: "Natural gas heating", value: 296, scope: "S1" },
      { name: "Waste disposal", value: 154, scope: "S3" },
      { name: "Water & sewage", value: 63, scope: "S3" },
      { name: "District heating", value: 47, scope: "S2" },
    ],
  },
  {
    key: "logistics",
    name: "Logistics",
    icon: "truck",
    value: 457,
    share: 0.08,
    delta: 2.6,
    description: "Freight, first- and last-mile movement of goods to customers.",
    spark: [37, 38, 38, 39, 40, 39, 40, 40, 41, 41, 42, 42],
    items: [
      { name: "Freight — road", value: 176, scope: "S3" },
      { name: "Freight — air", value: 94, scope: "S3" },
      { name: "First-mile pickup", value: 88, scope: "S3" },
      { name: "Freight — sea", value: 51, scope: "S3" },
      { name: "Last-mile delivery", value: 48, scope: "S3" },
    ],
  },
  {
    key: "supply-chain",
    name: "Supply chain",
    icon: "factory",
    value: 3122,
    share: 0.55,
    delta: 3.2,
    description: "Upstream and downstream emissions across the value chain.",
    spark: [252, 256, 258, 260, 262, 258, 260, 264, 266, 268, 270, 272],
    items: [
      { name: "Purchased goods", value: 1830, scope: "S3" },
      { name: "Capital goods", value: 612, scope: "S3" },
      { name: "Upstream transport", value: 403, scope: "S3" },
      { name: "Downstream logistics", value: 277, scope: "S3" },
    ],
  },
];

export interface ScopeDetail {
  key: "scope1" | "scope2" | "scope3";
  num: string;
  name: string;
  headline: string;
  description: string;
  color: string;
  share: number;
  total: number;
  delta: number;
  intensity: number;
  monthly: { month: string; value: number }[];
  sources: { name: string; value: number; share: number }[];
}

export const SCOPE_DETAILS: ScopeDetail[] = [
  {
    key: "scope1",
    num: "1",
    name: "Direct emissions",
    headline: "Sources you own or control",
    description:
      "Emissions from owned or controlled sources, including on-site fuel combustion, the company fleet and refrigerants.",
    color: "#15803d",
    share: 0.12,
    total: SCOPE1_12M,
    delta: -4.2,
    intensity: 1.8,
    monthly: MONTHLY.map((m) => ({ month: m.month, value: m.scope1 })),
    sources: [
      { name: "On-site fuel combustion", value: 343, share: 0.5 },
      { name: "Company fleet", value: 176, share: 0.26 },
      { name: "Process emissions", value: 87, share: 0.13 },
      { name: "Refrigerants & fugitive", value: 82, share: 0.12 },
    ],
  },
  {
    key: "scope2",
    num: "2",
    name: "Energy purchases",
    headline: "Indirect emissions from energy",
    description:
      "Emissions from purchased electricity, heating and cooling that is generated upstream of your operations.",
    color: "#22c55e",
    share: 0.28,
    total: SCOPE2_12M,
    delta: -7.1,
    intensity: 3.6,
    monthly: MONTHLY.map((m) => ({ month: m.month, value: m.scope2 })),
    sources: [
      { name: "Purchased electricity", value: 1200, share: 0.75 },
      { name: "Purchased heating", value: 343, share: 0.21 },
      { name: "Purchased cooling", value: 57, share: 0.04 },
    ],
  },
  {
    key: "scope3",
    num: "3",
    name: "Value chain",
    headline: "All other indirect emissions",
    description:
      "Emissions across the full value chain, from purchased goods and travel to how customers use your products.",
    color: "#86efac",
    share: 0.6,
    total: SCOPE3_12M,
    delta: 0.6,
    intensity: 9.4,
    monthly: MONTHLY.map((m) => ({ month: m.month, value: m.scope3 })),
    sources: [
      { name: "Purchased goods & services", value: 1830, share: 0.53 },
      { name: "Business travel", value: 515, share: 0.15 },
      { name: "Transport & logistics", value: 457, share: 0.13 },
      { name: "Employee commuting", value: 230, share: 0.07 },
      { name: "Waste & water", value: 154, share: 0.04 },
      { name: "Upstream energy", value: 242, share: 0.07 },
    ],
  },
];

export interface Kpi {
  label: string;
  value: number;
  decimals?: number;
  suffix: string;
  delta: number;
  deltaLabel: string;
  good: boolean;
  spark: number[];
}

export const KPIS: Kpi[] = [
  {
    label: "Total footprint",
    value: TOTAL_12M,
    suffix: " tCO₂e",
    delta: -12.4,
    deltaLabel: "vs last 12 months",
    good: true,
    spark: MONTHLY.map((m) => m.total),
  },
  {
    label: "Scope 3 emissions",
    value: SCOPE3_12M,
    suffix: " tCO₂e",
    delta: 0.6,
    deltaLabel: "share of total",
    good: false,
    spark: MONTHLY.map((m) => m.scope3),
  },
  {
    label: "Offsets purchased",
    value: 1204,
    suffix: " tCO₂e",
    delta: 21.1,
    deltaLabel: "footprint covered",
    good: true,
    spark: [180, 220, 260, 310, 420, 560, 640, 720, 820, 960, 1100, 1204],
  },
  {
    label: "Reduction vs baseline",
    value: 18.6,
    decimals: 1,
    suffix: "%",
    delta: 44.3,
    deltaLabel: "of 2030 target",
    good: true,
    spark: [4, 6, 8, 7, 10, 12, 11, 14, 16, 15, 17, 18.6],
  },
];

export interface Activity {
  source: string;
  type: string;
  scope: string;
  value: string;
  status: "Synced" | "Processed" | "Needs review";
}

export const ACTIVITY: Activity[] = [
  { source: "Invoice 1042 — E.ON", type: "Electricity bill", scope: "S2", value: "42.6 tCO₂e", status: "Synced" },
  { source: "Fuel log Q2 — Fleet 12", type: "Fuel record", scope: "S1", value: "18.2 tCO₂e", status: "Processed" },
  { source: "Travel report — May", type: "Business travel", scope: "S3", value: "9.4 tCO₂e", status: "Synced" },
  { source: "Supplier PO-8841", type: "Purchased goods", scope: "S3", value: "121.0 tCO₂e", status: "Needs review" },
  { source: "District heating — HQ", type: "Heating bill", scope: "S2", value: "14.8 tCO₂e", status: "Processed" },
  { source: "Refrigerant top-up — Site B", type: "Refrigerants", scope: "S1", value: "2.1 tCO₂e", status: "Synced" },
];

export const ACTIVITY_STATS = {
  total: 6,
  draft: 0,
  submitted: 3,
  underReview: 1,
  verified: 0,
  rejected: 0,
  calculated: 2,
  pending: 4,
  verifiedTotal: 0
};

export const TARGETS = [
  { label: "2023 baseline", value: 7002, unit: "tCO₂e", complete: false },
  { label: "2026 reduction", value: 5716, unit: "tCO₂e", complete: false },
  { label: "2030 target (−42%)", value: 4061, unit: "tCO₂e", complete: true },
];

export const reductionProgress = ((TOTAL_12M - 7002) / (4061 - 7002)) * 100;

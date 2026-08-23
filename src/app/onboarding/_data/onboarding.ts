export interface SubOption {
  value: string;
  label: string;
}

export const INDUSTRIES: { value: string; label: string; subsectors: SubOption[] }[] = [
  {
    value: "manufacturing",
    label: "Manufacturing",
    subsectors: [
      { value: "automotive", label: "Automotive" },
      { value: "chemicals", label: "Chemicals" },
      { value: "electronics", label: "Electronics & Semiconductors" },
      { value: "machinery", label: "Machinery & Equipment" },
      { value: "pharmaceutical", label: "Pharmaceuticals" },
      { value: "textiles", label: "Textiles & Apparel" },
      { value: "food-beverage", label: "Food & Beverage Processing" },
    ],
  },
  {
    value: "technology",
    label: "Information Technology",
    subsectors: [
      { value: "software", label: "Software & SaaS" },
      { value: "hardware", label: "Hardware & Devices" },
      { value: "data-centers", label: "Data Centers" },
      { value: "cloud", label: "Cloud & Hosting Services" },
      { value: "telecom-equipment", label: "Telecom Equipment" },
    ],
  },
  {
    value: "energy",
    label: "Oil, Gas & Energy",
    subsectors: [
      { value: "upstream", label: "Upstream (Exploration & Production)" },
      { value: "midstream", label: "Midstream (Transport & Storage)" },
      { value: "downstream", label: "Downstream (Refining & Marketing)" },
      { value: "renewables", label: "Renewables" },
      { value: "utilities", label: "Utilities" },
    ],
  },
  {
    value: "financial",
    label: "Financial Services",
    subsectors: [
      { value: "banking", label: "Banking" },
      { value: "insurance", label: "Insurance" },
      { value: "asset-mgmt", label: "Asset Management" },
      { value: "private-equity", label: "Private Equity" },
      { value: "fintech", label: "Fintech" },
    ],
  },
  {
    value: "retail",
    label: "Retail & Consumer Goods",
    subsectors: [
      { value: "retail-stores", label: "Retail Stores" },
      { value: "ecommerce", label: "E-commerce" },
      { value: "consumer-packaged", label: "Consumer Packaged Goods" },
      { value: "luxury", label: "Luxury Goods" },
      { value: "grocery", label: "Grocery" },
    ],
  },
  {
    value: "transport",
    label: "Transportation & Logistics",
    subsectors: [
      { value: "freight", label: "Freight & Trucking" },
      { value: "aviation", label: "Aviation" },
      { value: "maritime", label: "Maritime & Shipping" },
      { value: "rail", label: "Rail" },
      { value: "delivery", label: "Parcel & Last-mile Delivery" },
    ],
  },
  {
    value: "healthcare",
    label: "Healthcare",
    subsectors: [
      { value: "hospitals", label: "Hospitals & Health Systems" },
      { value: "pharma", label: "Pharmaceuticals & Biotech" },
      { value: "medtech", label: "Medical Devices" },
      { value: "insurance-hc", label: "Health Insurance" },
    ],
  },
  {
    value: "realestate",
    label: "Real Estate & Construction",
    subsectors: [
      { value: "commercial", label: "Commercial Real Estate" },
      { value: "residential", label: "Residential Real Estate" },
      { value: "construction", label: "Construction" },
      { value: "property-mgmt", label: "Property Management" },
    ],
  },
  {
    value: "professional",
    label: "Professional Services",
    subsectors: [
      { value: "consulting", label: "Consulting" },
      { value: "legal", label: "Legal" },
      { value: "accounting-firm", label: "Accounting & Auditing" },
      { value: "marketing", label: "Marketing & Advertising" },
    ],
  },
  {
    value: "agriculture",
    label: "Agriculture & Food",
    subsectors: [
      { value: "crop", label: "Crop Production" },
      { value: "livestock", label: "Livestock & Dairy" },
      { value: "agri-processing", label: "Food Processing" },
      { value: "agtech", label: "AgTech" },
    ],
  },
  {
    value: "mining",
    label: "Mining & Metals",
    subsectors: [
      { value: "ferrous", label: "Ferrous Metals" },
      { value: "non-ferrous", label: "Non-ferrous Metals" },
      { value: "precious", label: "Precious Metals" },
      { value: "minerals", label: "Industrial Minerals" },
    ],
  },
  {
    value: "telecom",
    label: "Telecommunications",
    subsectors: [
      { value: "mobile", label: "Mobile Operators" },
      { value: "isp", label: "Broadband & ISPs" },
      { value: "network-infra", label: "Network Infrastructure" },
    ],
  },
  {
    value: "other",
    label: "Other",
    subsectors: [],
  },
];

export const COUNTRIES = [
  "Australia", "Austria", "Belgium", "Brazil", "Canada", "China", "Denmark", "Finland",
  "France", "Germany", "Hong Kong", "India", "Indonesia", "Ireland", "Israel", "Italy",
  "Japan", "Luxembourg", "Malaysia", "Mexico", "Netherlands", "New Zealand", "Nigeria",
  "Norway", "Philippines", "Poland", "Portugal", "Saudi Arabia", "Singapore", "South Africa",
  "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", "Thailand", "Turkey",
  "United Arab Emirates", "United Kingdom", "United States", "Vietnam",
] as const;

export const FACILITY_TYPES = [
  "Offices",
  "Manufacturing plant",
  "Warehouse / Distribution center",
  "Retail store",
  "Data center",
  "R&D laboratory",
  "Production site",
  "Other",
] as const;

export const OWNERSHIP_STATUSES = [
  { value: "owned", label: "We own most of our sites", description: "Direct control over energy and emissions" },
  { value: "leased", label: "Mostly leased", description: "Landlords control base-building utilities" },
  { value: "mixed", label: "A mix of owned and leased", description: "Common for larger portfolios" },
] as const;

export const ON_SITE_ENERGY = [
  "Solar PV", "Wind", "Battery storage", "CHP / Cogeneration", "Geothermal", "Bioenergy", "None",
] as const;

export const REPORTING_FRAMEWORKS = [
  "GHG Protocol", "CSRD (EU)", "SBTi", "CDP", "GRI", "ISSB / IFRS S2", "TCFD", "SEC Climate Rule",
  "ISO 14064", "SASB", "UN Global Compact", "B Corp", "Other",
] as const;

export const REPORTING_TYPES = [
  { value: "voluntary", label: "Voluntary", description: "Disclosing proactively to build trust" },
  { value: "regulatory", label: "Regulatory", description: "Compliance with a legal mandate" },
  { value: "investor", label: "Investor-grade", description: "Structured for capital markets and ratings" },
  { value: "internal", label: "Internal", description: "For executive and board decision-making" },
] as const;

export const PREVIOUS_REPORTING_OPTIONS = [
  { value: "none", label: "None — this is our first year", description: "We'll help you build the baseline" },
  { value: "internal", label: "Internal tracking only", description: "Spreadsheets or in-house tools" },
  { value: "external", label: "Third-party reported", description: "Prepared by a consultant or auditor" },
  { value: "partial", label: "Partial / fragmented", description: "Some scopes or regions covered" },
] as const;

export const ASSURANCE_OPTIONS = [
  { value: "none", label: "None", description: "No external review planned" },
  { value: "limited", label: "Limited assurance", description: "Light-touch review by an auditor" },
  { value: "reasonable", label: "Reasonable assurance", description: "Full external audit" },
] as const;

export const REPORTING_AUDIENCES = [
  "Board & investors", "Regulators", "Customers", "Employees", "Suppliers", "Public / media", "Lenders & insurers",
] as const;

export const PRIMARY_REASONS = [
  { value: "regulatory", label: "Meet regulatory deadlines", description: "CSRD, SEC, CDP and more" },
  { value: "investor", label: "Answer investor & rating requests", description: "ESG ratings, RFPs and diligence" },
  { value: "targets", label: "Track progress to net zero", description: "Operationalize SBTi or internal targets" },
  { value: "efficiency", label: "Find cost & energy savings", description: "Reduce spend while cutting emissions" },
  { value: "competitiveness", label: "Win climate-conscious customers", description: "Bid eligibility and brand value" },
  { value: "other", label: "Something else", description: "Tell us what you have in mind" },
] as const;

export const ERP_OPTIONS = [
  "SAP", "Oracle EBS", "Oracle NetSuite", "Microsoft Dynamics 365", "Workday", "Infor", "Sage X3",
  "Epicor", "SAP S/4HANA", "Other", "None",
] as const;

export const ACCOUNTING_OPTIONS = [
  "QuickBooks", "Xero", "NetSuite", "Sage", "SAP Concur", "FreshBooks", "Wave", "Other", "None",
] as const;

export const FLEET_OPTIONS = [
  "Geotab", "Samsara", "Verizon Connect", "Fleetio", "Motive", "Azuga", "Other", "None",
] as const;

export const TRAVEL_OPTIONS = [
  "SAP Concur", "American Express GBT", "Navan", "TravelPerk", "Deem", "BCD Travel", "Other", "None",
] as const;

export const PROCUREMENT_OPTIONS = [
  "Coupa", "SAP Ariba", "GEP", "Jaggaer", "Ivalua", "Workday Procurement", "Other", "None",
] as const;

export const IOT_OPTIONS = [
  "Schneider EcoStruxure", "Siemens", "Honeywell", "Enel X", "GridPoint", "Custom / in-house", "None",
] as const;

export const DATA_INPUT_METHODS = [
  { value: "api", label: "API integrations", description: "Connect systems that feed data automatically" },
  { value: "upload", label: "File upload (CSV / Excel)", description: "Monthly or quarterly batches" },
  { value: "manual", label: "Manual entry", description: "Small portfolios, occasional inputs" },
  { value: "iot", label: "Live IoT / meter feeds", description: "Near-real-time energy data" },
  { value: "mixed", label: "A mix of methods", description: "Whatever each data source allows" },
] as const;

export const CENTRALIZATION_OPTIONS = [
  { value: "centralized", label: "Centralized", description: "One team collects and owns all data" },
  { value: "decentralized", label: "Decentralized", description: "Each business unit reports independently" },
  { value: "hybrid", label: "Hybrid", description: "Business units collect; central team coordinates" },
] as const;

export const SCOPE1_FUELS = [
  "Natural gas", "Diesel", "Petrol / Gasoline", "LPG", "Coal", "Biomass", "Aviation fuel", "Marine fuel",
  "Refrigerant gases", "Fugitive emissions", "None",
] as const;

export const REFRIGERANTS = [
  "HFCs", "CFCs", "HFOs", "Ammonia", "CO₂-based", "Other", "None",
] as const;

export const ELECTRICITY_SOURCES = [
  { value: "grid", label: "Grid electricity", description: "Purchased from the local grid" },
  { value: "onsite-renewable", label: "On-site renewable", description: "Owned solar, wind or similar" },
  { value: "ppa", label: "Purchased renewable (PPA / VPPA)", description: "Contract-backed green power" },
  { value: "mixed", label: "A mix of sources", description: "Grid plus renewables" },
] as const;

export const REC_OPTIONS = [
  { value: "none", label: "Not currently", description: "We can model grid-average emissions" },
  { value: "have", label: "Yes — we hold RECs / EACs", description: "Energy attribute certificates" },
  { value: "exploring", label: "Exploring options", description: "Considering PPAs or certificates" },
] as const;

export const STEAM_OPTIONS = [
  { value: "none", label: "None", description: "No purchased heat" },
  { value: "steam", label: "Purchased steam", description: "From an industrial or utility source" },
  { value: "district", label: "District heating", description: "Municipal or district network" },
  { value: "both", label: "Both steam and district heating", description: "" },
] as const;

export const SUPPLIER_DATA_OPTIONS = [
  { value: "none", label: "Not available", description: "We'd estimate from spend data" },
  { value: "partial", label: "Partially available", description: "Some key suppliers can report" },
  { value: "readily", label: "Readily available", description: "Suppliers report regularly" },
] as const;

export const SPEND_CATEGORIES = [
  "Purchased goods & services", "Capital goods", "Upstream transportation", "Waste from operations",
  "Business travel", "Employee commuting", "Downstream transportation", "Investments",
] as const;

export const COMMUTING_OPTIONS = [
  { value: "no-data", label: "No data", description: "We'll apply industry averages" },
  { value: "survey", label: "Employee survey data", description: "Collected in the last 2 years" },
  { value: "estimate", label: "Rough estimate", description: "High-level baseline available" },
] as const;

export const BUSINESS_TRAVEL_OPTIONS = [
  { value: "none", label: "Minimal", description: "Little or no corporate travel" },
  { value: "moderate", label: "Moderate", description: "Regular regional travel" },
  { value: "significant", label: "Significant", description: "Heavy international travel" },
] as const;

export const LOGISTICS_OPTIONS = [
  { value: "own", label: "Our own fleet", description: "Vehicles we own or operate" },
  { value: "3pl", label: "Third-party logistics", description: "Carriers and 3PL providers" },
  { value: "both", label: "Both", description: "Mix of owned and contracted" },
] as const;

export const WASTE_OPTIONS = [
  { value: "none", label: "Not tracked", description: "We can estimate from activity data" },
  { value: "partial", label: "Partially tracked", description: "Some sites or streams covered" },
  { value: "full", label: "Fully tracked", description: "Complete waste data available" },
] as const;

export const CLOUD_PROVIDERS = [
  "AWS", "Microsoft Azure", "Google Cloud", "Oracle Cloud", "IBM Cloud", "Alibaba Cloud", "Other", "None",
] as const;

export const TARGET_OPTIONS = [
  { value: "none", label: "No formal targets yet", description: "We can help you define them" },
  { value: "internal", label: "Internal reduction target", description: "Company-defined goal" },
  { value: "sbti", label: "Science-based target (SBTi)", description: "Validated near-term or net-zero" },
] as const;

export const COMMITMENTS = [
  "Net zero by 2050", "Net zero by 2030–2040", "RE100 (100% renewables)", "Race to Zero", "CDP disclosure", "Other",
] as const;

export const CARBON_CREDIT_OPTIONS = [
  { value: "none", label: "Not currently", description: "Focusing on internal reductions first" },
  { value: "exploring", label: "Exploring offsets", description: "Researching credible programs" },
  { value: "active", label: "Actively purchasing", description: "We buy credits or invest in projects" },
] as const;

export const USER_ROLES = [
  "Sustainability / ESG Manager", "CSO / Chief Sustainability Officer", "CFO / Finance", "Operations Manager",
  "Facilities / Energy Manager", "IT / Systems Administrator", "Consultant or advisor",
] as const;

export const WORKFLOWS = [
  "Scope 1 monitoring", "Scope 2 monitoring", "Supplier engagement", "Regulatory reporting",
  "Board & investor reporting", "Budgeting & forecasting", "Net zero tracking",
] as const;

export const FACILITY_COUNT_OPTIONS = [
  "0 — no facilities", "1 – 10", "11 – 50", "51 – 200", "200 – 1,000", "1,000+",
] as const;

export const EMPLOYEE_OPTIONS = [
  "1 – 50", "51 – 250", "251 – 1,000", "1,001 – 5,000", "5,001 – 10,000", "10,000+",
] as const;

export const REVENUE_OPTIONS = [
  "Under $10M", "$10M – $50M", "$50M – $250M", "$250M – $1B", "$1B – $5B", "$5B+",
] as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October",
  "November", "December",
] as const;

export const VEHICLE_OPTIONS = [
  "None", "1 – 25", "26 – 100", "101 – 500", "500 – 2,000", "2,000+",
] as const;

export const FLOOR_AREA_OPTIONS = [
  "Under 10,000 m²", "10,000 – 50,000 m²", "50,000 – 250,000 m²", "250,000 – 1M m²", "1M+ m²", "Not sure",
] as const;

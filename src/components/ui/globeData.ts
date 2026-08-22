export interface GlobeNode {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  color: string;
  keyInitiative: string;
  emissionsTracked: string;
  reductionRate: string;
}

export interface GlobeArc {
  id: string;
  fromId: string;
  toId: string;
  color: string;
  pulseSpeed: number;
}

const CYAN = '#00f5ff';
const GOLD = '#fbbf24';
const AMBER = '#f59e0b';
const MINT = '#10e7b4';
const EMERALD = '#34d399';

export const GLOBE_NODES: GlobeNode[] = [
  {
    id: 'uk-london',
    name: 'London',
    country: 'United Kingdom',
    lat: 51.5,
    lng: -0.12,
    color: CYAN,
    keyInitiative: 'Net Zero 2030 city cluster with district-level heat decarbonization and ULEZ expansion.',
    emissionsTracked: '8.4M tCO₂e',
    reductionRate: '−12.4% YoY',
  },
  {
    id: 'uk-manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    lat: 53.48,
    lng: -2.24,
    color: MINT,
    keyInitiative: 'Hydrogen-ready industrial corridor retrofitting legacy manufacturing heat systems.',
    emissionsTracked: '2.1M tCO₂e',
    reductionRate: '−9.8% YoY',
  },
  {
    id: 'uk-edinburgh',
    name: 'Edinburgh',
    country: 'United Kingdom',
    lat: 55.95,
    lng: -3.19,
    color: EMERALD,
    keyInitiative: 'Scotland carbon capture cluster anchored by the Acorn CCS project.',
    emissionsTracked: '1.3M tCO₂e',
    reductionRate: '−7.6% YoY',
  },
  {
    id: 'eu-frankfurt',
    name: 'Frankfurt',
    country: 'Germany',
    lat: 50.11,
    lng: 8.68,
    color: AMBER,
    keyInitiative: 'CBAM-compliant heavy industry telemetry hub covering the Rhine-Main corridor.',
    emissionsTracked: '6.7M tCO₂e',
    reductionRate: '−14.2% YoY',
  },
  {
    id: 'eu-paris',
    name: 'Paris',
    country: 'France',
    lat: 48.86,
    lng: 2.35,
    color: CYAN,
    keyInitiative: 'Low-carbon construction mandate with EPD tracking across public procurement.',
    emissionsTracked: '3.9M tCO₂e',
    reductionRate: '−11.0% YoY',
  },
  {
    id: 'eu-amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    lat: 52.37,
    lng: 4.9,
    color: MINT,
    keyInitiative: 'Circular port economy with shore power and green-corridor shipping lanes.',
    emissionsTracked: '2.6M tCO₂e',
    reductionRate: '−10.5% YoY',
  },
  {
    id: 'eu-copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    lat: 55.68,
    lng: 12.57,
    color: EMERALD,
    keyInitiative: 'District heating electrification paired with North Sea offshore wind offtake.',
    emissionsTracked: '1.1M tCO₂e',
    reductionRate: '−15.3% YoY',
  },
  {
    id: 'india-delhi',
    name: 'Delhi NCR',
    country: 'India',
    lat: 28.61,
    lng: 77.21,
    color: GOLD,
    keyInitiative: 'National CAP coalition scaling PMUY clean cooking and EV fleet transitions.',
    emissionsTracked: '12.8M tCO₂e',
    reductionRate: '−8.9% YoY',
  },
  {
    id: 'india-mumbai',
    name: 'Mumbai',
    country: 'India',
    lat: 19.08,
    lng: 72.88,
    color: MINT,
    keyInitiative: 'Green finance gateway issuing blended-capital instruments for coastal resilience.',
    emissionsTracked: '7.2M tCO₂e',
    reductionRate: '−10.1% YoY',
  },
  {
    id: 'india-bengaluru',
    name: 'Bengaluru',
    country: 'India',
    lat: 12.97,
    lng: 77.59,
    color: CYAN,
    keyInitiative: 'Tech-sector science-based targets with 24/7 carbon-free energy matching.',
    emissionsTracked: '3.4M tCO₂e',
    reductionRate: '−13.7% YoY',
  },
  {
    id: 'global-newyork',
    name: 'New York',
    country: 'United States',
    lat: 40.71,
    lng: -74.01,
    color: EMERALD,
    keyInitiative: 'Local Law 97 compliance analytics for large building portfolios.',
    emissionsTracked: '9.6M tCO₂e',
    reductionRate: '−9.2% YoY',
  },
  {
    id: 'global-singapore',
    name: 'Singapore',
    country: 'Singapore',
    lat: 1.35,
    lng: 103.82,
    color: GOLD,
    keyInitiative: 'Asia-Pacific carbon services and voluntary market integrity hub.',
    emissionsTracked: '4.1M tCO₂e',
    reductionRate: '−8.4% YoY',
  },
  {
    id: 'global-dubai',
    name: 'Dubai',
    country: 'UAE',
    lat: 25.2,
    lng: 55.27,
    color: AMBER,
    keyInitiative: 'Mega-event legacy program converting temporary infrastructure to solar microgrids.',
    emissionsTracked: '5.5M tCO₂e',
    reductionRate: '−7.9% YoY',
  },
  {
    id: 'global-saopaulo',
    name: 'São Paulo',
    country: 'Brazil',
    lat: -23.55,
    lng: -46.63,
    color: MINT,
    keyInitiative: 'REDD+ jurisdictional credits with satellite-verified deforestation baselines.',
    emissionsTracked: '6.3M tCO₂e',
    reductionRate: '−11.6% YoY',
  },
  {
    id: 'global-nairobi',
    name: 'Nairobi',
    country: 'Kenya',
    lat: -1.29,
    lng: 36.82,
    color: CYAN,
    keyInitiative: 'Geothermal-led grid decarbonization and cookstove distribution network.',
    emissionsTracked: '1.8M tCO₂e',
    reductionRate: '−16.2% YoY',
  },
  {
    id: 'global-sydney',
    name: 'Sydney',
    country: 'Australia',
    lat: -33.87,
    lng: 151.21,
    color: EMERALD,
    keyInitiative: 'Safeguard mechanism reporting for resources and heavy transport sectors.',
    emissionsTracked: '4.9M tCO₂e',
    reductionRate: '−9.5% YoY',
  },
];

export const GLOBE_ARCS: GlobeArc[] = [
  // Europe <-> UK <-> India primary corridor
  { id: 'arc-lon-fra', fromId: 'uk-london', toId: 'eu-frankfurt', color: CYAN, pulseSpeed: 1.4 },
  { id: 'arc-fra-del', fromId: 'eu-frankfurt', toId: 'india-delhi', color: GOLD, pulseSpeed: 1.2 },
  { id: 'arc-lon-del', fromId: 'uk-london', toId: 'india-delhi', color: AMBER, pulseSpeed: 0.9 },
  { id: 'arc-man-lon', fromId: 'uk-manchester', toId: 'uk-london', color: MINT, pulseSpeed: 1.8 },
  { id: 'arc-edi-lon', fromId: 'uk-edinburgh', toId: 'uk-london', color: EMERALD, pulseSpeed: 1.6 },

  // Europe mesh
  { id: 'arc-fra-par', fromId: 'eu-frankfurt', toId: 'eu-paris', color: CYAN, pulseSpeed: 1.7 },
  { id: 'arc-par-ams', fromId: 'eu-paris', toId: 'eu-amsterdam', color: MINT, pulseSpeed: 1.5 },
  { id: 'arc-ams-cph', fromId: 'eu-amsterdam', toId: 'eu-copenhagen', color: EMERALD, pulseSpeed: 1.3 },
  { id: 'arc-cph-fra', fromId: 'eu-copenhagen', toId: 'eu-frankfurt', color: CYAN, pulseSpeed: 1.1 },

  // India mesh
  { id: 'arc-del-bom', fromId: 'india-delhi', toId: 'india-mumbai', color: GOLD, pulseSpeed: 1.6 },
  { id: 'arc-bom-blr', fromId: 'india-mumbai', toId: 'india-bengaluru', color: MINT, pulseSpeed: 1.5 },
  { id: 'arc-blr-del', fromId: 'india-bengaluru', toId: 'india-delhi', color: AMBER, pulseSpeed: 1.2 },

  // Global links
  { id: 'arc-lon-nyc', fromId: 'uk-london', toId: 'global-newyork', color: EMERALD, pulseSpeed: 0.8 },
  { id: 'arc-nyc-sao', fromId: 'global-newyork', toId: 'global-saopaulo', color: MINT, pulseSpeed: 0.9 },
  { id: 'arc-sao-nbo', fromId: 'global-saopaulo', toId: 'global-nairobi', color: CYAN, pulseSpeed: 0.85 },
  { id: 'arc-nbo-dxb', fromId: 'global-nairobi', toId: 'global-dubai', color: AMBER, pulseSpeed: 1.0 },
  { id: 'arc-dxb-del', fromId: 'global-dubai', toId: 'india-delhi', color: GOLD, pulseSpeed: 1.15 },
  { id: 'arc-del-sin', fromId: 'india-delhi', toId: 'global-singapore', color: MINT, pulseSpeed: 1.05 },
  { id: 'arc-sin-syd', fromId: 'global-singapore', toId: 'global-sydney', color: EMERALD, pulseSpeed: 0.95 },
  { id: 'arc-sin-blr', fromId: 'global-singapore', toId: 'india-bengaluru', color: CYAN, pulseSpeed: 1.35 },
];

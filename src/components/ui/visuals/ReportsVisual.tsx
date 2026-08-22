export default function ReportsVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Audit ready report visual">
      <style>{`
        @keyframes vc-pulse {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
        .vc-pulse {
          animation: vc-pulse 2.4s ease-in-out infinite;
        }
      `}</style>

      <rect width="480" height="360" rx="24" fill="#fafafa" />

      <g fill="#16a34a" opacity="0.07">
        {[0, 1, 2, 3, 4].map((row) =>
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((col) => (
            <circle key={`${row}-${col}`} cx={30 + col * 52} cy={26 + row * 62} r="1.5" />
          ))
        )}
      </g>

      <circle cx="120" cy="56" r="3" fill="#16a34a" />
      <text x="132" y="60" fontSize="11" fontWeight="600" letterSpacing="0.14em" fill="#a1a1aa">
        04 — REPORT
      </text>

      <g>
        <rect x="120" y="84" width="112" height="180" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="136" y="104" fontSize="9" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          TREND · Q1 2026
        </text>
        <line x1="136" y1="126" x2="216" y2="126" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="136" y1="144" x2="216" y2="144" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="136" y1="162" x2="216" y2="162" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="136" y1="180" x2="216" y2="180" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="136" y1="198" x2="216" y2="198" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="136" y1="216" x2="216" y2="216" stroke="#f0f0f0" strokeWidth="1.5" />
        <polyline
          points="136,216 158,198 180,204 200,180 216,170"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="vc-pulse" cx="216" cy="170" r="3.5" fill="#22c55e" />
        <text x="216" y="160" textAnchor="end" fontSize="9" fontWeight="600" letterSpacing="0.1em" fill="#15803d">
          −42%
        </text>
      </g>

      <g>
        <rect x="248" y="84" width="112" height="180" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="262" y="102" width="72" height="9" rx="2" fill="#16a34a" fillOpacity="0.85" />
        <rect x="262" y="126" width="40" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="318" y="126" width="30" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <rect x="262" y="140" width="34" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="318" y="140" width="30" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <rect x="262" y="154" width="44" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="318" y="154" width="30" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <line x1="262" y1="172" x2="344" y2="172" stroke="#f0f0f0" strokeWidth="1.5" />
        <rect x="262" y="182" width="82" height="20" rx="4" fill="#0d3b2d" />
        <text x="303" y="195" textAnchor="middle" fontSize="8" fontWeight="600" letterSpacing="0.12em" fill="#ffffff">
          12,480 TCO₂E
        </text>
        <rect x="262" y="210" width="82" height="26" rx="6" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <circle cx="276" cy="223" r="7" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M273 223l2.5 2.5 4.5-5" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="290" y="227" fontSize="6" fontWeight="600" letterSpacing="0.12em" fill="#15803d">
          AUDIT READY
        </text>
      </g>

      <g>
        <rect x="120" y="276" width="240" height="30" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <circle className="vc-pulse" cx="138" cy="291" r="4" fill="#22c55e" />
        <text x="152" y="295" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">
          AI · SHIFT 12% LOGISTICS TO RAIL
        </text>
      </g>
    </svg>
  );
}

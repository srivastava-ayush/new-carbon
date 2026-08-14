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
            <circle key={`${row}-${col}`} cx={28 + col * 55} cy={24 + row * 62} r="1.5" />
          ))
        )}
      </g>

      <text x="56" y="64" fontSize="11" fontWeight="600" letterSpacing="0.14em" fill="#a1a1aa">
        04 — REPORT
      </text>

      <g>
        <rect x="56" y="92" width="160" height="124" rx="6" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="74" y="114" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          TREND · Q1 2026
        </text>
        <line x1="74" y1="140" x2="198" y2="140" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="74" y1="160" x2="198" y2="160" stroke="#f0f0f0" strokeWidth="1.5" />
        <line x1="74" y1="180" x2="198" y2="180" stroke="#f0f0f0" strokeWidth="1.5" />
        <polyline
          points="74,180 106,166 138,170 168,152 198,142"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle className="vc-pulse" cx="198" cy="142" r="3.5" fill="#22c55e" />
        <text x="198" y="132" textAnchor="end" fontSize="9" fontWeight="600" letterSpacing="0.1em" fill="#15803d">
          −42%
        </text>
      </g>

      <g>
        <rect x="228" y="76" width="196" height="208" rx="6" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="246" y="96" width="96" height="10" rx="2" fill="#16a34a" fillOpacity="0.85" />
        <text x="366" y="105" fontSize="9" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          Q1 2026
        </text>
        <rect x="246" y="126" width="64" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="126" width="60" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <rect x="246" y="146" width="52" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="146" width="60" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <rect x="246" y="166" width="58" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="166" width="60" height="5" rx="2.5" fill="#16a34a" fillOpacity="0.35" />
        <line x1="246" y1="184" x2="404" y2="184" stroke="#f0f0f0" strokeWidth="1.5" />
        <rect x="246" y="198" width="158" height="22" rx="4" fill="#0d3b2d" />
        <text x="325" y="213" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="0.14em" fill="#ffffff">
          12,480 TCO₂E
        </text>
        <rect x="246" y="232" width="128" height="26" rx="4" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <circle cx="262" cy="245" r="9" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M257.5 245l3 3 5.5-6" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="278" y="249" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#15803d">
          AUDIT READY
        </text>
      </g>

      <g>
        <path d="M56 284h156" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="4 6" opacity="0.4" />
        <circle cx="212" cy="284" r="3.5" fill="#22c55e" />
        <text x="56" y="320" fontSize="11" fontWeight="500" letterSpacing="0.08em" fill="#71717a">
          AI · SHIFT 12% OF LOGISTICS TO RAIL
        </text>
      </g>
    </svg>
  );
}
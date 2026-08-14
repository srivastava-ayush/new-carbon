export default function CalculateVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Calculating emissions visual">
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
        03 — CALCULATE
      </text>

      <g>
        <rect x="120" y="84" width="128" height="180" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="136" y="104" fontSize="9" fontWeight="600" letterSpacing="0.08em" fill="#a1a1aa">
          SCOPE BREAKDOWN
        </text>

        <text x="136" y="134" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">SCOPE 1</text>
        <text x="222" y="134" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">18%</text>
        <rect x="136" y="142" width="84" height="4" rx="2" fill="#e4e4e7" />
        <rect x="136" y="142" width="16" height="4" rx="2" fill="#16a34a" />

        <text x="136" y="162" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">SCOPE 2</text>
        <text x="222" y="162" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">13%</text>
        <rect x="136" y="170" width="84" height="4" rx="2" fill="#e4e4e7" />
        <rect x="136" y="170" width="11" height="4" rx="2" fill="#16a34a" />

        <text x="136" y="190" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">SCOPE 3</text>
        <text x="222" y="190" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">69%</text>
        <rect x="136" y="198" width="84" height="4" rx="2" fill="#e4e4e7" />
        <rect x="136" y="198" width="58" height="4" rx="2" fill="#16a34a" />
      </g>

      <g>
        <rect x="252" y="84" width="124" height="180" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="262" y="104" fontSize="9" fontWeight="600" letterSpacing="0.08em" fill="#a1a1aa">
          TOTAL EMISSIONS
        </text>
        <text x="262" y="150" fontSize="32" fontWeight="700" fill="#15803d" fontFamily="DM Serif Display, serif">
          48.2K
        </text>
        <text x="262" y="170" fontSize="9" fontWeight="600" letterSpacing="0.08em" fill="#a1a1aa">
          TCO₂E / YEAR
        </text>
        <line x1="262" y1="184" x2="344" y2="184" stroke="#f0f0f0" strokeWidth="1.5" />
        <text x="262" y="208" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">
          VS BASELINE
        </text>
        <text x="344" y="208" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">
          −42%
        </text>
        <rect x="262" y="216" width="80" height="4" rx="2" fill="#e4e4e7" />
        <rect x="262" y="216" width="46" height="4" rx="2" fill="#16a34a" />
      </g>

      <g>
        <rect x="120" y="286" width="240" height="30" rx="8" fill="#0d3b2d" />
        <circle className="vc-pulse" cx="138" cy="301" r="4" fill="#22c55e" />
        <text x="152" y="305" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a7f3d0">
          CERTIFIED · ISO 14064
        </text>
      </g>
    </svg>
  );
}

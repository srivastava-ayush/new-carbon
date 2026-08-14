export default function CalculateVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Calculating emissions visual">
      <style>{`
        @keyframes vc-arc {
          to { stroke-dashoffset: -150; }
        }
        .vc-arc {
          animation: vc-arc 3.2s ease-in-out infinite alternate;
        }
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
        03 — CALCULATE
      </text>

      <g>
        <circle cx="190" cy="186" r="92" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <circle
          cx="190"
          cy="186"
          r="92"
          fill="none"
          stroke="#16a34a"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="330"
          strokeDashoffset="92"
          transform="rotate(-90 190 186)"
          className="vc-arc"
        />
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 190 186" to="360 190 186" dur="24s" repeatCount="indefinite" />
          <circle cx="190" cy="94" r="2" fill="#16a34a" fillOpacity="0.5" />
        </g>
        <text x="190" y="176" textAnchor="middle" fontSize="44" fontWeight="700" fill="#15803d" fontFamily="DM Serif Display, serif">
          −42%
        </text>
        <text x="190" y="200" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.14em" fill="#a1a1aa">
          SCOPE 1 · 2 · 3
        </text>
        <circle cx="158" cy="216" r="2.5" fill="#16a34a" fillOpacity="0.3" />
        <circle cx="190" cy="216" r="2.5" fill="#16a34a" className="vc-pulse" />
        <circle cx="222" cy="216" r="2.5" fill="#16a34a" fillOpacity="0.3" />
      </g>

      <g>
        <line x1="364" y1="112" x2="364" y2="196" stroke="#16a34a" strokeWidth="1.5" />
        <line x1="392" y1="132" x2="392" y2="196" stroke="#16a34a" strokeWidth="1.5" opacity="0.4" />
        <line x1="420" y1="150" x2="420" y2="196" stroke="#16a34a" strokeWidth="1.5" opacity="0.15" />
        <line x1="352" y1="196" x2="432" y2="196" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="392" y="232" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          PER QUARTER
        </text>
      </g>

      <g>
        <rect x="56" y="300" width="116" height="30" rx="4" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="72" y="310" width="6" height="6" fill="#16a34a" />
        <text x="86" y="319" fontSize="11" fontWeight="500" letterSpacing="0.08em" fill="#71717a">
          ISO 14064
        </text>
      </g>
    </svg>
  );
}
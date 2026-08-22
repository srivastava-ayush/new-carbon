export default function ProcessVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Processing data visual">
      <style>{`
        @keyframes vc-flow {
          to { stroke-dashoffset: -24; }
        }
        .vc-flow {
          animation: vc-flow 1.4s linear infinite;
        }
        @keyframes vc-track {
          from { transform: translateX(0); }
          to { transform: translateX(150px); }
        }
        .vc-track {
          animation: vc-track 3.6s ease-in-out infinite alternate;
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
            <circle key={`${row}-${col}`} cx={30 + col * 52} cy={26 + row * 62} r="1.5" />
          ))
        )}
      </g>

      <circle cx="120" cy="56" r="3" fill="#16a34a" />
      <text x="132" y="60" fontSize="11" fontWeight="600" letterSpacing="0.14em" fill="#a1a1aa">
        02 — PROCESS
      </text>

      <g>
        <rect x="120" y="116" width="76" height="112" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="134" y="136" width="20" height="26" rx="4" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M144 146v8M140 150h8" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="160" y="140" width="22" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="160" y="152" width="18" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="134" y="176" width="48" height="5" rx="2.5" fill="#000000" fillOpacity="0.08" />
        <rect x="134" y="188" width="36" height="5" rx="2.5" fill="#000000" fillOpacity="0.08" />
        <text x="158" y="214" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          INPUT
        </text>
      </g>

      <g stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
        <line x1="196" y1="172" x2="212" y2="172" strokeDasharray="3 7" className="vc-flow" />
        <line x1="268" y1="172" x2="284" y2="172" strokeDasharray="3 7" className="vc-flow" />
      </g>

      <g>
        <circle cx="240" cy="172" r="32" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <circle cx="240" cy="172" r="23" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <circle className="vc-pulse" cx="240" cy="172" r="5" fill="#22c55e" />
        <text x="240" y="228" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          AI AGENT
        </text>
      </g>

      <g>
        <rect x="284" y="116" width="76" height="112" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="298" y="136" width="42" height="7" rx="3.5" fill="#16a34a" fillOpacity="0.85" />
        <rect x="298" y="152" width="36" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="298" y="164" width="30" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="298" y="176" width="34" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="298" y="196" width="18" height="8" rx="4" fill="#16a34a" />
        <text x="322" y="214" textAnchor="middle" fontSize="9" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          LEDGER
        </text>
      </g>

      <g>
        <line x1="120" y1="300" x2="360" y2="300" stroke="#e4e4e7" strokeWidth="1.5" />
        <line x1="120" y1="300" x2="270" y2="300" stroke="#16a34a" strokeWidth="1.5" />
        <g className="vc-track">
          <circle cx="120" cy="300" r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
        </g>
        <text x="360" y="304" textAnchor="end" fontSize="10" fontWeight="600" letterSpacing="0.1em" fill="#15803d">
          68%
        </text>
      </g>
    </svg>
  );
}

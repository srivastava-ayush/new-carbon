export default function ProcessVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Processing data visual">
      <style>{`
        @keyframes vc-flow {
          to { stroke-dashoffset: -28; }
        }
        .vc-flow {
          animation: vc-flow 1.4s linear infinite;
        }
        @keyframes vc-track {
          from { transform: translateX(0); }
          to { transform: translateX(186px); }
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
            <circle key={`${row}-${col}`} cx={28 + col * 55} cy={24 + row * 62} r="1.5" />
          ))
        )}
      </g>

      <text x="56" y="64" fontSize="11" fontWeight="600" letterSpacing="0.14em" fill="#a1a1aa">
        02 — PROCESS
      </text>

      <g>
        <rect x="60" y="120" width="96" height="112" rx="6" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="78" y="142" width="22" height="28" rx="3" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <rect x="86" y="152" width="6" height="6" fill="#16a34a" fillOpacity="0.4" />
        <rect x="110" y="142" width="30" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="110" y="154" width="26" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="110" y="166" width="24" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="78" y="190" width="62" height="5" rx="2.5" fill="#000000" fillOpacity="0.08" />
        <rect x="78" y="202" width="44" height="5" rx="2.5" fill="#000000" fillOpacity="0.08" />
        <text x="108" y="248" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          INPUT
        </text>
      </g>

      <g stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" opacity="0.45">
        <line x1="156" y1="176" x2="192" y2="176" strokeDasharray="3 7" className="vc-flow" />
        <line x1="288" y1="176" x2="324" y2="176" strokeDasharray="3 7" className="vc-flow" />
      </g>

      <g>
        <circle cx="240" cy="176" r="38" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <circle cx="240" cy="176" r="26" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <circle className="vc-pulse" cx="240" cy="176" r="5" fill="#22c55e" />
        <text x="240" y="248" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          AI AGENT
        </text>
      </g>

      <g>
        <rect x="324" y="120" width="96" height="112" rx="6" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="342" y="142" width="60" height="7" rx="3.5" fill="#16a34a" fillOpacity="0.85" />
        <rect x="342" y="162" width="52" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="176" width="44" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="190" width="48" height="5" rx="2.5" fill="#000000" fillOpacity="0.1" />
        <rect x="342" y="210" width="22" height="8" rx="4" fill="#16a34a" />
        <text x="372" y="248" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a1a1aa">
          LEDGER
        </text>
      </g>

      <g>
        <line x1="140" y1="292" x2="340" y2="292" stroke="#e4e4e7" strokeWidth="1.5" />
        <line x1="140" y1="292" x2="246" y2="292" stroke="#16a34a" strokeWidth="1.5" />
        <g className="vc-track">
          <circle cx="140" cy="292" r="5" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" />
        </g>
        <text x="352" y="296" fontSize="10" fontWeight="500" letterSpacing="0.1em" fill="#15803d">
          68%
        </text>
      </g>
    </svg>
  );
}
export default function UploadVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Uploading data visual">
      <style>{`
        @keyframes vc-flow {
          to { stroke-dashoffset: -28; }
        }
        .vc-flow {
          animation: vc-flow 1.4s linear infinite;
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
        01 — UPLOAD SOURCES
      </text>

      <g>
        <line x1="168" y1="190" x2="210" y2="190" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="3 7" strokeLinecap="round" className="vc-flow" opacity="0.45" />
        <circle cx="178" cy="190" r="2.5" fill="#16a34a" opacity="0.6" />
      </g>

      <g>
        <g>
          <animateTransform attributeName="transform" type="rotate" from="0 128 238" to="360 128 238" dur="18s" repeatCount="indefinite" />
          <circle cx="128" cy="238" r="44" fill="none" stroke="#16a34a" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="1 6" />
        </g>
        <circle cx="128" cy="238" r="34" fill="none" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M128 218v26M116 232l12-14 12 14" stroke="#16a34a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <g>
        <rect x="224" y="104" width="176" height="204" rx="6" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="242" y="126" width="112" height="11" rx="2" fill="#16a34a" fillOpacity="0.85" />
        <rect x="242" y="158" width="140" height="6" rx="3" fill="#000000" fillOpacity="0.08" />
        <rect x="242" y="176" width="116" height="6" rx="3" fill="#000000" fillOpacity="0.08" />
        <rect x="242" y="194" width="140" height="6" rx="3" fill="#000000" fillOpacity="0.08" />
        <rect x="242" y="212" width="92" height="6" rx="3" fill="#000000" fillOpacity="0.08" />
        <rect x="242" y="240" width="140" height="3" rx="1.5" fill="#e4f3ea" />
        <rect x="242" y="240" width="92" height="3" rx="1.5" fill="#16a34a" />
        <text x="382" y="264" textAnchor="end" fontSize="10" fontWeight="600" letterSpacing="0.1em" fill="#15803d">
          68% UPLOADED
        </text>
      </g>

      <g>
        <rect x="242" y="278" width="140" height="12" rx="6" fill="#f4f4f5" />
        <rect x="252" y="281" width="20" height="6" rx="3" fill="#16a34a" fillOpacity="0.35" />
        <rect x="278" y="281" width="88" height="6" rx="3" fill="#e4e4e7" />
      </g>

      <g>
        <rect x="56" y="306" width="220" height="30" rx="4" fill="none" stroke="#e4e4e7" strokeWidth="1.5" />
        <rect x="72" y="316" width="6" height="6" fill="#16a34a" />
        <text x="88" y="323" fontSize="11" fontWeight="500" letterSpacing="0.08em" fill="#71717a">
          INVOICES · FUEL · ENERGY
        </text>
      </g>
    </svg>
  );
}
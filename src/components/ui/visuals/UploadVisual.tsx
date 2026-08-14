export default function UploadVisual() {
  return (
    <svg viewBox="0 0 480 360" preserveAspectRatio="xMidYMid slice" className="h-full w-full" role="img" aria-label="Uploading data visual">
      <style>{`
        @keyframes vc-flow {
          to { stroke-dashoffset: -24; }
        }
        .vc-flow {
          animation: vc-flow 1.4s linear infinite;
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
        01 — UPLOAD
      </text>

      <g>
        <rect x="120" y="104" width="112" height="136" rx="12" fill="#ffffff" stroke="#16a34a" strokeWidth="1.5" strokeDasharray="5 5" strokeOpacity="0.4" />
        <circle cx="176" cy="148" r="26" fill="#f0fdf4" stroke="#16a34a" strokeWidth="1.5" />
        <path d="M176 134v22M166 144l10-10 10 10" stroke="#16a34a" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <text x="176" y="202" textAnchor="middle" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#15803d">
          DROP FILES
        </text>
        <text x="176" y="222" textAnchor="middle" fontSize="9" fontWeight="500" letterSpacing="0.08em" fill="#a1a1aa">
          PDF · CSV · XLSX
        </text>
      </g>

      <g>
        <rect x="248" y="104" width="112" height="40" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="260" y="118" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">INVOICES.PDF</text>
        <text x="348" y="118" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">100%</text>
        <rect x="260" y="128" width="88" height="4" rx="2" fill="#e4e4e7" />
        <rect x="260" y="128" width="88" height="4" rx="2" fill="#16a34a" />

        <rect x="248" y="152" width="112" height="40" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="260" y="166" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">FUEL.XLSX</text>
        <text x="348" y="166" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">64%</text>
        <rect x="260" y="176" width="88" height="4" rx="2" fill="#e4e4e7" />
        <rect x="260" y="176" width="56" height="4" rx="2" fill="#16a34a" />

        <rect x="248" y="200" width="112" height="40" rx="8" fill="#ffffff" stroke="#e4e4e7" strokeWidth="1.5" />
        <text x="260" y="214" fontSize="9" fontWeight="600" letterSpacing="0.06em" fill="#3f3f46">ENERGY.CSV</text>
        <text x="348" y="214" textAnchor="end" fontSize="9" fontWeight="600" fill="#15803d">38%</text>
        <rect x="260" y="224" width="88" height="4" rx="2" fill="#e4e4e7" />
        <rect x="260" y="224" width="34" height="4" rx="2" fill="#16a34a" />
      </g>

      <g>
        <rect x="120" y="286" width="240" height="30" rx="8" fill="#0d3b2d" />
        <circle className="vc-pulse" cx="138" cy="301" r="4" fill="#22c55e" />
        <text x="152" y="305" fontSize="10" fontWeight="600" letterSpacing="0.12em" fill="#a7f3d0">
          SYNCING 3 SOURCES
        </text>
      </g>
    </svg>
  );
}

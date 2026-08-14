"use client";

export interface HeroGlobeProps {
  rx?: number;
  ry?: number;
  hovering?: boolean;
  flip?: boolean;
  onGlobeEnter?: () => void;
  onGlobeLeave?: () => void;
}

export default function HeroGlobe({
  rx = 0,
  ry = 0,
  hovering = false,
  flip = false,
  onGlobeEnter,
  onGlobeLeave,
}: HeroGlobeProps) {
  return (
    <div
      className="relative h-full w-full"
      style={{ perspective: "900px" }}
      onMouseEnter={onGlobeEnter}
      onMouseLeave={onGlobeLeave}
    >
      <style>{`
        @keyframes globe-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes globe-intro {
          from { transform: rotate(-40deg) scale(0.6); opacity: 0; }
          to   { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        @keyframes globe-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.7;  transform: scale(1.05); }
        }
        @keyframes ring-intro {
          from { transform: scale(0.3); opacity: 0; }
          60%  { transform: scale(1.04); opacity: 1; }
          to   { transform: scale(1); opacity: 1; }
        }
        .globe-spin {
          transform-origin: center;
          animation: globe-spin 30s linear infinite;
        }
        .globe-intro {
          transform-origin: center;
          animation: globe-intro 1.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards;
        }
        .globe-pulse {
          transform-origin: center;
          animation: globe-pulse 3.5s ease-in-out 1.6s infinite;
        }
        .ring-intro {
          transform-origin: center;
          animation: ring-intro 1.6s cubic-bezier(0.215, 0.61, 0.355, 1) 0.3s both;
        }
        .axis-flip {
          transform-origin: center;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .axis-flipped {
          transform: rotate(90deg);
        }
      `}</style>

      <svg
        viewBox="0 0 400 400"
        className="h-full w-full"
        style={{
          transform: `rotateX(${rx}deg) rotateY(${ry}deg)`,
          transition: hovering ? "transform 0.12s ease-out" : "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
        role="img"
        aria-label="Animated globe"
      >
        <defs>
          <radialGradient id="globe-glow" cx="50%" cy="42%" r="55%">
            <stop offset="0%" stopColor="#16a34a" stopOpacity="0.35" />
            <stop offset="55%" stopColor="#16a34a" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="200" cy="200" r="160" fill="url(#globe-glow)" />

        <circle className="globe-pulse" cx="200" cy="200" r="170" fill="none" stroke="#16a34a" strokeOpacity="0.18" strokeWidth="1" strokeDasharray="6 8" />

        <g className="ring-intro">
          <g className="globe-intro">
<g className={`axis-flip ${flip ? "axis-flipped" : ""}`}>
          <g className="globe-spin">
            <ellipse cx="200" cy="200" rx="160" ry="58" fill="none" stroke="#16a34a" strokeOpacity="0.25" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="160" ry="116" fill="none" stroke="#16a34a" strokeOpacity="0.18" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="160" ry="160" fill="none" stroke="#16a34a" strokeOpacity="0.12" strokeWidth="1" />
          </g>
        </g>

        <g className={`axis-flip ${flip ? "axis-flipped" : ""}`}>
          <ellipse cx="200" cy="200" rx="160" ry="30" fill="none" stroke="#16a34a" strokeOpacity="0.2" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="160" ry="90" fill="none" stroke="#16a34a" strokeOpacity="0.15" strokeWidth="1" />
          <ellipse cx="200" cy="200" rx="160" ry="150" fill="none" stroke="#16a34a" strokeOpacity="0.12" strokeWidth="1" />

          <circle cx="200" cy="200" r="160" fill="none" stroke="#16a34a" strokeOpacity="0.4" strokeWidth="2" />
        </g>

            <g className="globe-spin">
              <circle cx="200" cy="142" r="4" fill="#16a34a" fillOpacity="0.9">
                <animate attributeName="fillOpacity" values="0.9;0.4;0.9" dur="2.4s" begin="1.6s" repeatCount="indefinite" />
              </circle>
              <circle cx="200" cy="258" r="4" fill="#16a34a" fillOpacity="0.7">
                <animate attributeName="fillOpacity" values="0.7;0.3;0.7" dur="2.4s" begin="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="280" cy="200" r="3" fill="#22c55e" fillOpacity="0.8">
                <animate attributeName="fillOpacity" values="0.8;0.3;0.8" dur="2.4s" begin="2.4s" repeatCount="indefinite" />
              </circle>
              <circle cx="120" cy="200" r="3" fill="#22c55e" fillOpacity="0.8">
                <animate attributeName="fillOpacity" values="0.8;0.3;0.8" dur="2.4s" begin="2.8s" repeatCount="indefinite" />
              </circle>
              <circle cx="322" cy="158" r="3" fill="#22c55e" fillOpacity="0.7">
                <animate attributeName="fillOpacity" values="0.7;0.3;0.7" dur="2.4s" begin="3.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="78" cy="242" r="3" fill="#22c55e" fillOpacity="0.7">
                <animate attributeName="fillOpacity" values="0.7;0.3;0.7" dur="2.4s" begin="3.6s" repeatCount="indefinite" />
              </circle>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}

import type { ConceptVisualKind } from "@/data/portfolio";

const font = { fontFamily: "var(--font-body)" } as const;
const line = "rgba(142,186,255,0.55)";
const faint = "rgba(255,255,255,0.14)";
const nodeFill = "rgba(59,130,246,0.14)";

function GrowthSystemSketch() {
  const nodes = ["Positioning", "Content", "Paid media", "Conversion"];
  return (
    <svg viewBox="0 0 520 240" role="img" aria-label="Sketch: positioning leads to content, paid media and conversion, and what is measured feeds back into positioning" width="100%">
      {nodes.map((label, i) => {
        const x = 14 + i * 130;
        return (
          <g key={label}>
            <rect x={x} y={64} width={102} height={54} rx={14} fill={nodeFill} stroke={line} />
            <text x={x + 51} y={96} textAnchor="middle" fill="#e4ecfa" fontSize="13" fontWeight="600" style={font}>
              {label}
            </text>
            {i < nodes.length - 1 ? (
              <>
                <path d={`M${x + 106} 91 H${x + 124}`} stroke={line} strokeWidth="1.5" />
                <path d={`M${x + 120} 86 L${x + 127} 91 L${x + 120} 96`} fill="none" stroke={line} strokeWidth="1.5" />
              </>
            ) : null}
          </g>
        );
      })}
      <path d="M455 124 C455 196 65 196 65 124" fill="none" stroke={line} strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M59 134 L65 122 L71 134" fill="none" stroke={line} strokeWidth="1.5" />
      <text x="260" y="188" textAnchor="middle" fill="#a3afc2" fontSize="12" style={font}>
        Measure, then adjust
      </text>
    </svg>
  );
}

function WebsiteSketch() {
  return (
    <svg viewBox="0 0 520 250" role="img" aria-label="Wireframe sketch of a business website: a first screen with a heading and two buttons, then three service cards" width="100%">
      <rect x="20" y="12" width="480" height="226" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.22)" />
      {[40, 54, 68].map((cx) => (
        <circle key={cx} cx={cx} cy="32" r="4" fill="rgba(255,255,255,0.25)" />
      ))}
      <rect x="92" y="25" width="190" height="15" rx="7.5" fill="rgba(255,255,255,0.07)" />
      {[340, 378, 416, 454].map((x) => (
        <rect key={x} x={x} y="29" width="28" height="6" rx="3" fill={faint} />
      ))}
      <rect x="44" y="62" width="196" height="13" rx="6.5" fill="rgba(238,243,251,0.82)" />
      <rect x="44" y="83" width="140" height="13" rx="6.5" fill="rgba(238,243,251,0.82)" />
      <rect x="44" y="108" width="206" height="6" rx="3" fill={faint} />
      <rect x="44" y="120" width="168" height="6" rx="3" fill={faint} />
      <rect x="44" y="140" width="94" height="26" rx="13" fill="#2563eb" />
      <rect x="148" y="140" width="78" height="26" rx="13" fill="none" stroke={line} />
      <rect x="300" y="58" width="176" height="110" rx="12" fill={nodeFill} stroke="rgba(142,186,255,0.35)" />
      <path d="M300 168 L360 118 L404 150 L440 124 L476 152" fill="none" stroke={line} strokeWidth="1.5" />
      {[44, 194, 344].map((x) => (
        <g key={x}>
          <rect x={x} y="184" width="132" height="42" rx="10" fill="rgba(255,255,255,0.04)" stroke={faint} />
          <rect x={x + 12} y="196" width="52" height="7" rx="3.5" fill="rgba(238,243,251,0.6)" />
          <rect x={x + 12} y="210" width="88" height="5" rx="2.5" fill={faint} />
        </g>
      ))}
    </svg>
  );
}

/** Abstract sketches for concept work. They are diagrams, not screenshots or results. */
export function ConceptVisual({ kind }: { kind: ConceptVisualKind }) {
  return kind === "growth-system" ? <GrowthSystemSketch /> : <WebsiteSketch />;
}

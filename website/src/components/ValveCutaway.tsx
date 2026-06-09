/* ─── Animated knife-gate valve cutaway ───────────────────────────────
   A self-contained SVG "in-operation" animation: slurry flows through the
   bore, the hardened gate strokes open/closed on its rising stem, and the
   handwheel turns. Pure CSS keyframes (see index.css → .kg-* classes).
   100% original artwork — no third-party footage. */

/* One extra particle before each clip window so the stream never shows a
   gap when the 60px translate loop resets. */
const UP_PARTICLES = [-60, 0, 60, 120, 180, 240, 300]
const DN_PARTICLES = [400, 460, 520, 580, 640, 700, 760]

export default function ValveCutaway() {
  return (
    <svg viewBox="0 0 760 360" className="w-full h-auto" role="img"
      aria-label="Animated cutaway of an ISA knife-gate valve operating — slurry flowing through the open bore, gate stroking closed, then re-opening">

      <defs>
        {/* Metallic body gradient */}
        <linearGradient id="kg-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#e2e8f0" />
          <stop offset="0.5" stopColor="#94a3b8" />
          <stop offset="1" stopColor="#64748b" />
        </linearGradient>
        <linearGradient id="kg-gate" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#cbd5e1" />
          <stop offset="0.5" stopColor="#f1f5f9" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="kg-bore" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1e293b" />
          <stop offset="1" stopColor="#0f172a" />
        </linearGradient>
        {/* Clip flow particles to the bore on each side of the valve */}
        <clipPath id="kg-clip-up"><rect x="0" y="196" width="300" height="54" /></clipPath>
        <clipPath id="kg-clip-dn"><rect x="460" y="196" width="300" height="54" /></clipPath>
      </defs>

      {/* ── Bore channel ── */}
      <rect x="0" y="196" width="760" height="54" fill="url(#kg-bore)" />

      {/* ── Slurry flow particles (drawn beneath body so the gate blocks them) ── */}
      <g clipPath="url(#kg-clip-up)">
        <g className="kg-flow">
          {UP_PARTICLES.map((x, i) => (
            <circle key={i} cx={x} cy={223} r={i % 2 ? 6 : 4.5}
              fill={i % 3 === 0 ? '#f97316' : '#38bdf8'} opacity="0.9" />
          ))}
        </g>
      </g>
      <g clipPath="url(#kg-clip-dn)" className="kg-down-flow">
        <g className="kg-flow">
          {DN_PARTICLES.map((x, i) => (
            <circle key={i} cx={x} cy={223} r={i % 2 ? 6 : 4.5}
              fill={i % 3 === 0 ? '#f97316' : '#38bdf8'} opacity="0.9" />
          ))}
        </g>
      </g>

      {/* ── Pipe walls ── */}
      <rect x="0" y="178" width="760" height="18" fill="#cbd5e1" />
      <rect x="0" y="250" width="760" height="18" fill="#94a3b8" />

      {/* ── Flanges ── */}
      <rect x="276" y="160" width="24" height="126" rx="3" fill="#64748b" />
      <rect x="460" y="160" width="24" height="126" rx="3" fill="#64748b" />

      {/* ── Valve body ── */}
      <rect x="300" y="148" width="160" height="150" rx="10" fill="url(#kg-body)" stroke="#475569" strokeWidth="1.5" />
      {/* Bonnet (gate chest) */}
      <rect x="350" y="64" width="60" height="86" rx="6" fill="url(#kg-body)" stroke="#475569" strokeWidth="1.5" />
      {/* Seat ring inside body — orange highlight */}
      <rect x="300" y="194" width="160" height="58" fill="none" stroke="#f97316" strokeWidth="2.5" opacity="0.55" />

      {/* ── Gate + stem assembly (animated stroke) ── */}
      <g className="kg-gate-grp">
        {/* Rising stem */}
        <rect x="376" y="20" width="8" height="135" rx="3" fill="#475569" />
        {/* Knife gate plate with pointed bottom */}
        <path d="M366 150 H394 V272 L380 290 L366 272 Z"
          fill="url(#kg-gate)" stroke="#475569" strokeWidth="1.5" />
        <line x1="380" y1="156" x2="380" y2="266" stroke="#94a3b8" strokeWidth="1.5" opacity="0.6" />
      </g>

      {/* ── Handwheel (spins) ── */}
      <g className="kg-wheel" style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <circle cx="380" cy="26" r="26" fill="none" stroke="#334155" strokeWidth="6" />
        <circle cx="380" cy="26" r="7" fill="#334155" />
        <line x1="380" y1="2" x2="380" y2="50" stroke="#334155" strokeWidth="4" />
        <line x1="356" y1="26" x2="404" y2="26" stroke="#334155" strokeWidth="4" />
      </g>

      {/* ── Callout labels ── */}
      <g fontFamily="Inter, sans-serif" fontWeight="700">
        {/* Rising stem */}
        <line x1="408" y1="60" x2="470" y2="60" stroke="#94a3b8" strokeWidth="1" />
        <text x="474" y="56" fontSize="13" fill="#334155">Rising Stem</text>
        <text x="474" y="71" fontSize="10" fill="#94a3b8" fontWeight="500">Visual position indicator</text>

        {/* Hardened gate */}
        <line x1="394" y1="200" x2="560" y2="130" stroke="#94a3b8" strokeWidth="1" />
        <text x="564" y="128" fontSize="13" fill="#334155">Hardened Gate</text>
        <text x="564" y="143" fontSize="10" fill="#94a3b8" fontWeight="500">466% longer service life</text>

        {/* Replaceable seat */}
        <line x1="455" y1="223" x2="560" y2="223" stroke="#f97316" strokeWidth="1" />
        <text x="564" y="220" fontSize="13" fill="#c2410c">Replaceable Seat</text>
        <text x="564" y="235" fontSize="10" fill="#94a3b8" fontWeight="500">Field-serviceable lining</text>

        {/* Slurry flow */}
        <line x1="140" y1="223" x2="140" y2="320" stroke="#38bdf8" strokeWidth="1" />
        <text x="96" y="338" fontSize="13" fill="#0369a1">Abrasive Slurry Flow</text>
      </g>
    </svg>
  )
}

/* ─── Animated industrial process-plant scene ──────────────────────────
   Original artwork — no third-party footage, copyright-clean. Steam rises
   from the stacks, the flare flickers, product flows through the pipe rack
   and the foreground main, the cooling fan turns and control LEDs blink.
   Pure CSS keyframes (see index.css → .plant-* classes). */

/* Steam puffs rising from a stack at (x, y) */
function Steam({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <>
      {[0, 1, 2, 3].map(i => (
        <ellipse key={i} cx={x} cy={y} rx={13} ry={9} fill="#ffffff"
          className="plant-steam" style={{ animationDelay: `${delay + i * 1.1}s` }} />
      ))}
    </>
  )
}

export default function PlantScene({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1200 500" className={className} preserveAspectRatio="xMidYMid slice"
      role="img" aria-label="Animated industrial process plant — steam, flare, flowing pipelines and turning machinery">
      <defs>
        <linearGradient id="plant-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfe6ff" />
          <stop offset="1" stopColor="#eef6ff" />
        </linearGradient>
        <linearGradient id="plant-steel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="0.5" stopColor="#cbd5e1" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
        <linearGradient id="plant-tank" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.45" stopColor="#e2e8f0" />
          <stop offset="1" stopColor="#94a3b8" />
        </linearGradient>
      </defs>

      {/* ── Sky ── */}
      <rect x="0" y="0" width="1200" height="500" fill="url(#plant-sky)" />
      <circle cx="1055" cy="92" r="52" fill="#fde68a" opacity="0.45" />
      <circle cx="1055" cy="92" r="30" fill="#fef3c7" opacity="0.7" />

      {/* ── Clouds ── */}
      <g className="plant-cloud" fill="#ffffff" opacity="0.85">
        <g><ellipse cx="200" cy="80" rx="38" ry="20" /><ellipse cx="240" cy="74" rx="30" ry="22" /><ellipse cx="165" cy="86" rx="26" ry="16" /></g>
        <g><ellipse cx="640" cy="62" rx="34" ry="18" /><ellipse cx="676" cy="58" rx="26" ry="18" /><ellipse cx="610" cy="68" rx="22" ry="14" /></g>
      </g>

      {/* ── Distant haze ── */}
      <rect x="0" y="346" width="1200" height="22" fill="#dbe6f1" opacity="0.7" />

      {/* ── Ground ── */}
      <rect x="0" y="360" width="1200" height="140" fill="#cbd5e1" />
      <rect x="0" y="360" width="1200" height="6" fill="#94a3b8" />

      {/* ── Distillation column ── */}
      <path d="M153 120 V96 H214" stroke="#94a3b8" strokeWidth="5" fill="none" />
      <rect x="130" y="120" width="46" height="240" fill="url(#plant-steel)" stroke="#64748b" strokeWidth="1.5" />
      <ellipse cx="153" cy="120" rx="23" ry="9" fill="#e2e8f0" stroke="#94a3b8" />
      {[175, 235, 300].map(y => (
        <rect key={y} x="122" y={y} width="62" height="5" fill="#94a3b8" />
      ))}

      {/* ── Cooling fan unit ── */}
      <rect x="270" y="300" width="110" height="62" fill="url(#plant-steel)" stroke="#64748b" strokeWidth="1.5" />
      <circle cx="325" cy="300" r="36" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
      <g className="plant-fan">
        {[0, 45, 90, 135].map(a => (
          <ellipse key={a} cx="325" cy="300" rx="32" ry="7" fill="#94a3b8" opacity="0.85"
            transform={`rotate(${a} 325 300)`} />
        ))}
        <circle cx="325" cy="300" r="7" fill="#64748b" />
      </g>

      {/* ── Steam stacks ── */}
      <rect x="452" y="246" width="20" height="116" fill="#cbd5e1" stroke="#94a3b8" />
      <rect x="452" y="246" width="20" height="8" fill="#f97316" />
      <rect x="604" y="262" width="18" height="100" fill="#cbd5e1" stroke="#94a3b8" />
      <rect x="604" y="262" width="18" height="8" fill="#f97316" />
      <Steam x={462} y={246} delay={0} />
      <Steam x={613} y={262} delay={1.6} />

      {/* ── LPG sphere ── */}
      {[762, 782, 800, 818].map(x => (
        <line key={x} x1={x} y1="320" x2="790" y2="305" stroke="#64748b" strokeWidth="4" />
      ))}
      <circle cx="790" cy="300" r="42" fill="url(#plant-tank)" stroke="#94a3b8" strokeWidth="1.5" />
      <path d="M748 300 H832 M790 258 V342" stroke="#cbd5e1" strokeWidth="1.5" opacity="0.8" />

      {/* ── Storage tanks ── */}
      <rect x="880" y="244" width="120" height="118" fill="url(#plant-tank)" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="940" cy="244" rx="60" ry="13" fill="#eef2f7" stroke="#94a3b8" />
      <line x1="880" y1="286" x2="1000" y2="286" stroke="#cbd5e1" />
      <line x1="880" y1="324" x2="1000" y2="324" stroke="#cbd5e1" />
      <rect x="912" y="296" width="56" height="16" rx="2" fill="#f97316" opacity="0.85" />
      <rect x="1012" y="270" width="90" height="92" fill="url(#plant-tank)" stroke="#94a3b8" strokeWidth="1.5" />
      <ellipse cx="1057" cy="270" rx="45" ry="11" fill="#eef2f7" stroke="#94a3b8" />

      {/* ── Flare stack ── */}
      <rect x="1142" y="74" width="10" height="286" fill="#64748b" />
      {[120, 170, 220, 270, 320].map(y => (
        <line key={y} x1="1142" y1={y} x2="1152" y2={y} stroke="#475569" strokeWidth="2" />
      ))}
      <g className="plant-flare">
        <path d="M1147 36 C1135 58 1138 66 1147 74 C1156 66 1159 58 1147 36 Z" fill="#fb923c" />
        <path d="M1147 48 C1141 60 1142 66 1147 72 C1152 66 1153 60 1147 48 Z" fill="#fde047" />
      </g>

      {/* ── Pipe rack with flowing product ── */}
      {[200, 400, 600, 800, 1000].map(x => (
        <rect key={x} x={x - 4} y="324" width="8" height="40" fill="#64748b" />
      ))}
      <rect x="180" y="316" width="860" height="8" fill="#475569" />
      {/* steel pipes */}
      <line x1="180" y1="330" x2="1040" y2="330" stroke="#e2e8f0" strokeWidth="11" strokeLinecap="round" />
      <line x1="180" y1="346" x2="1040" y2="346" stroke="#e2e8f0" strokeWidth="11" strokeLinecap="round" />
      {/* flowing product */}
      <line x1="180" y1="330" x2="1040" y2="330" stroke="#fb923c" strokeWidth="7"
        strokeDasharray="20 16" className="plant-flow" />
      <line x1="180" y1="346" x2="1040" y2="346" stroke="#38bdf8" strokeWidth="7"
        strokeDasharray="20 16" className="plant-flow-rev" />

      {/* ── Foreground main + valve ── */}
      <rect x="0" y="430" width="1200" height="28" fill="#cbd5e1" />
      <rect x="0" y="430" width="1200" height="5" fill="#e2e8f0" />
      <line x1="0" y1="444" x2="1200" y2="444" stroke="#fb923c" strokeWidth="10"
        strokeDasharray="28 22" className="plant-flow" />
      {/* gate valve on the main */}
      <rect x="498" y="410" width="44" height="48" rx="3" fill="url(#plant-steel)" stroke="#475569" strokeWidth="1.5" />
      <rect x="512" y="392" width="16" height="20" fill="#64748b" />
      <rect x="494" y="426" width="52" height="9" fill="#f97316" opacity="0.9" />
      <g>
        <circle cx="520" cy="386" r="15" fill="none" stroke="#334155" strokeWidth="4" />
        <line x1="505" y1="386" x2="535" y2="386" stroke="#334155" strokeWidth="3" />
        <line x1="520" y1="371" x2="520" y2="401" stroke="#334155" strokeWidth="3" />
      </g>

      {/* ── Control panel LEDs ── */}
      <rect x="40" y="398" width="74" height="40" rx="4" fill="#334155" />
      <rect x="48" y="404" width="58" height="14" rx="2" fill="#0f172a" />
      <circle cx="55" cy="429" r="4" className="plant-led" fill="#22c55e" />
      <circle cx="70" cy="429" r="4" className="plant-led" style={{ animationDelay: '0.5s' }} fill="#f97316" />
      <circle cx="85" cy="429" r="4" className="plant-led" style={{ animationDelay: '0.9s' }} fill="#38bdf8" />
    </svg>
  )
}

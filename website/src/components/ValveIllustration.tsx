interface Props {
  type: 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve'
  className?: string
}

function BallValveSVG() {
  return (
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Left pipe */}
      <rect x="0" y="62" width="64" height="36" fill="#334155" rx="3" />
      <rect x="0" y="68" width="64" height="24" fill="#1e293b" rx="1" />
      {/* Right pipe */}
      <rect x="176" y="62" width="64" height="36" fill="#334155" rx="3" />
      <rect x="176" y="68" width="64" height="24" fill="#1e293b" rx="1" />
      {/* Left flange */}
      <rect x="58" y="50" width="14" height="60" fill="#475569" rx="2" />
      {/* Right flange */}
      <rect x="168" y="50" width="14" height="60" fill="#475569" rx="2" />
      {/* Ball body housing */}
      <circle cx="120" cy="80" r="50" fill="#475569" />
      <circle cx="120" cy="80" r="44" fill="#334155" />
      {/* Ball */}
      <circle cx="120" cy="80" r="32" fill="#64748b" />
      <circle cx="120" cy="80" r="32" fill="url(#ballGrad)" />
      {/* Flow bore through ball */}
      <ellipse cx="120" cy="80" rx="16" ry="12" fill="#0f172a" />
      {/* Handle stem */}
      <rect x="116" y="18" width="8" height="30" fill="#ea580c" rx="2" />
      {/* Handle bar */}
      <rect x="98" y="14" width="44" height="10" fill="#c2410c" rx="3" />
      {/* Handle grip indicators */}
      <rect x="108" y="14" width="4" height="10" fill="#9a3412" rx="1" />
      <rect x="128" y="14" width="4" height="10" fill="#9a3412" rx="1" />
      {/* Stem collar */}
      <rect x="112" y="46" width="16" height="8" fill="#64748b" rx="1" />
      {/* Flange bolts */}
      {[58, 168].map(x => [54, 96].map(y => (
        <circle key={`${x}-${y}`} cx={x + 7} cy={y} r="3" fill="#94a3b8" />
      )))}
      <defs>
        <radialGradient id="ballGrad" cx="40%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1e293b" stopOpacity="0.2" />
        </radialGradient>
      </defs>
    </svg>
  )
}

function ButterflyValveSVG() {
  return (
    <svg viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Left pipe */}
      <rect x="0" y="62" width="72" height="36" fill="#334155" rx="3" />
      <rect x="0" y="68" width="72" height="24" fill="#1e293b" rx="1" />
      {/* Right pipe */}
      <rect x="168" y="62" width="72" height="36" fill="#334155" rx="3" />
      <rect x="168" y="68" width="72" height="24" fill="#1e293b" rx="1" />
      {/* Wafer body */}
      <rect x="72" y="44" width="96" height="72" fill="#475569" rx="4" />
      <rect x="76" y="48" width="88" height="64" fill="#334155" rx="3" />
      {/* Flow bore */}
      <ellipse cx="120" cy="80" rx="36" ry="28" fill="#0f172a" />
      {/* Disc / butterfly */}
      <ellipse cx="120" cy="80" rx="34" ry="10" fill="#2563eb" transform="rotate(-20 120 80)" />
      <ellipse cx="120" cy="80" rx="34" ry="10" fill="#3b82f6" transform="rotate(-20 120 80)" opacity="0.6" />
      {/* Shaft / stem */}
      <rect x="118" y="10" width="4" height="70" fill="#94a3b8" rx="1" />
      <rect x="118" y="120" width="4" height="28" fill="#94a3b8" rx="1" />
      {/* Gear actuator */}
      <rect x="102" y="4" width="36" height="24" fill="#475569" rx="3" />
      <rect x="106" y="7" width="28" height="18" fill="#334155" rx="2" />
      {/* Gear teeth detail */}
      {[0,1,2,3,4].map(i => (
        <rect key={i} x={108 + i * 5} y="5" width="3" height="4" fill="#64748b" rx="0.5" />
      ))}
      {/* Gear indicator */}
      <circle cx="120" cy="16" r="4" fill="#ea580c" />
      {/* Body bolts */}
      {[55, 185].map(x => [60, 100].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#94a3b8" />
      )))}
    </svg>
  )
}

function GateValveSVG() {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Left pipe */}
      <rect x="0" y="100" width="60" height="36" fill="#334155" rx="3" />
      <rect x="0" y="106" width="60" height="24" fill="#1e293b" rx="1" />
      {/* Right pipe */}
      <rect x="180" y="100" width="60" height="36" fill="#334155" rx="3" />
      <rect x="180" y="106" width="60" height="24" fill="#1e293b" rx="1" />
      {/* Left flange */}
      <rect x="54" y="88" width="14" height="60" fill="#475569" rx="2" />
      {/* Right flange */}
      <rect x="172" y="88" width="14" height="60" fill="#475569" rx="2" />
      {/* Main valve body (yoke + bonnet) */}
      <rect x="68" y="76" width="104" height="64" fill="#475569" rx="4" />
      <rect x="72" y="80" width="96" height="56" fill="#334155" rx="3" />
      {/* Bonnet (upper body) */}
      <rect x="84" y="40" width="72" height="42" fill="#475569" rx="3" />
      <rect x="88" y="44" width="64" height="34" fill="#3f4f63" rx="2" />
      {/* Gate (wedge) - visible in bore */}
      <rect x="110" y="82" width="20" height="52" fill="#64748b" rx="1" />
      <polygon points="110,134 130,134 120,148" fill="#475569" />
      {/* Flow bore */}
      <rect x="72" y="106" width="96" height="24" fill="#0f172a" rx="1" />
      {/* Rising stem */}
      <rect x="117" y="6" width="6" height="40" fill="#94a3b8" rx="1" />
      {/* Handwheel */}
      <circle cx="120" cy="10" r="18" fill="none" stroke="#2563eb" strokeWidth="4" />
      <circle cx="120" cy="10" r="5" fill="#2563eb" />
      {/* Handwheel spokes */}
      {[0, 60, 120, 180, 240, 300].map(angle => {
        const rad = (angle * Math.PI) / 180
        return <line key={angle} x1="120" y1="10" x2={120 + 13 * Math.cos(rad)} y2={10 + 13 * Math.sin(rad)} stroke="#2563eb" strokeWidth="2" />
      })}
      {/* Yoke arms */}
      <rect x="84" y="76" width="8" height="20" fill="#475569" rx="1" />
      <rect x="148" y="76" width="8" height="20" fill="#475569" rx="1" />
    </svg>
  )
}

function KnifeGateValveSVG() {
  return (
    <svg viewBox="0 0 240 180" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Left pipe */}
      <rect x="0" y="104" width="62" height="32" fill="#334155" rx="3" />
      <rect x="0" y="110" width="62" height="20" fill="#1e293b" rx="1" />
      {/* Right pipe */}
      <rect x="178" y="104" width="62" height="32" fill="#334155" rx="3" />
      <rect x="178" y="110" width="62" height="20" fill="#1e293b" rx="1" />
      {/* Flat body / wafer */}
      <rect x="62" y="88" width="116" height="60" fill="#475569" rx="3" />
      <rect x="66" y="92" width="108" height="52" fill="#334155" rx="2" />
      {/* Flow bore */}
      <rect x="66" y="108" width="108" height="20" fill="#0f172a" rx="1" />
      {/* Gate blade */}
      <rect x="110" y="32" width="20" height="90" fill="#64748b" rx="1" />
      {/* Knife edge at bottom of gate */}
      <polygon points="110,122 130,122 120,136" fill="#475569" />
      {/* Gate guide channels */}
      <rect x="106" y="92" width="6" height="52" fill="#334155" />
      <rect x="128" y="92" width="6" height="52" fill="#334155" />
      {/* Pneumatic cylinder */}
      <rect x="104" y="4" width="32" height="32" fill="#475569" rx="3" />
      <rect x="108" y="7" width="24" height="26" fill="#3f4f63" rx="2" />
      {/* Cylinder rod */}
      <rect x="118" y="36" width="4" height="10" fill="#94a3b8" />
      {/* Air ports */}
      <circle cx="108" cy="14" r="3" fill="#ea580c" />
      <circle cx="132" cy="24" r="3" fill="#ea580c" />
      {/* Piston indicator */}
      <rect x="110" y="14" width="20" height="6" fill="#64748b" rx="1" />
      {/* Body bolts */}
      {[74, 166].map(x => [96, 128].map(y => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="3" fill="#94a3b8" />
      )))}
      {/* Ceramic lining indicator on bore */}
      <rect x="66" y="108" width="108" height="3" fill="#fbbf24" opacity="0.6" />
      <rect x="66" y="125" width="108" height="3" fill="#fbbf24" opacity="0.6" />
    </svg>
  )
}

const components = {
  'ball-valve': BallValveSVG,
  'butterfly-valve': ButterflyValveSVG,
  'gate-valve': GateValveSVG,
  'knife-gate-valve': KnifeGateValveSVG,
}

export default function ValveIllustration({ type, className = '' }: Props) {
  const Component = components[type]
  return (
    <div className={`select-none ${className}`}>
      <Component />
    </div>
  )
}

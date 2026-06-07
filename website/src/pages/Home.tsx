import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, ChevronRight, Check, X, MapPin, Star, Download, Calculator, BookOpen, ChevronDown } from 'lucide-react'
import { products } from '../data/products'
import ProductModal from '../components/ProductModal'
import ValveIllustration from '../components/ValveIllustration'
import { ISALogoHero, ISAWatermark } from '../components/ISALogo'
import type { Product } from '../types'

/* ── Animated counter hook ── */
function useCountUp(target: number, suffix = '', duration = 2200) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        const start = performance.now()
        const step = (now: number) => {
          const p = Math.min((now - start) / duration, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setDisplay(String(Math.floor(ease * target)) + suffix)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { threshold: 0.4 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])
  return { display, ref }
}

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect() }
    }, { threshold })
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, inView }
}

/* ── Ball Valve SVG Hero Render ── */
function ValveHeroRender() {
  return (
    <div className="w-full flex items-center justify-center py-4 animate-float">
      <svg viewBox="0 0 500 400" className="w-full max-w-lg drop-shadow-2xl" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bodyG" cx="46%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#1a3d80"/>
            <stop offset="55%" stopColor="#0c2260"/>
            <stop offset="100%" stopColor="#071640"/>
          </radialGradient>
          <radialGradient id="ballG" cx="36%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#d4dced"/>
            <stop offset="45%" stopColor="#8a9ab8"/>
            <stop offset="100%" stopColor="#2a3858"/>
          </radialGradient>
          <linearGradient id="flangeG" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c3c7a"/>
            <stop offset="100%" stopColor="#0a2050"/>
          </linearGradient>
          <linearGradient id="stemG" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0e2660"/>
            <stop offset="40%" stopColor="#1e4488"/>
            <stop offset="100%" stopColor="#0e2660"/>
          </linearGradient>
          <filter id="glowF" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="glowSm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="arrB" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6Z" fill="#006DFF"/>
          </marker>
        </defs>

        {/* Ambient background glow */}
        <ellipse cx="250" cy="200" rx="170" ry="130" fill="rgba(0,109,255,0.05)"/>

        {/* Left pipe */}
        <rect x="30" y="176" width="110" height="48" fill="url(#flangeG)" opacity="0.9"/>
        <rect x="30" y="185" width="110" height="30" fill="rgba(0,109,255,0.1)"/>
        {/* Left flange face */}
        <rect x="18" y="155" width="24" height="90" rx="5" fill="url(#flangeG)" stroke="#2a5098" strokeWidth="1.5"/>
        {/* Flange bolts left */}
        {[165, 183, 217, 235].map((y, i) => (
          <circle key={i} cx="30" cy={y} r="5.5" fill="#081D42" stroke="#2a5098" strokeWidth="1.2"/>
        ))}

        {/* Right pipe */}
        <rect x="360" y="176" width="110" height="48" fill="url(#flangeG)" opacity="0.9"/>
        <rect x="360" y="185" width="110" height="30" fill="rgba(0,109,255,0.1)"/>
        {/* Right flange face */}
        <rect x="458" y="155" width="24" height="90" rx="5" fill="url(#flangeG)" stroke="#2a5098" strokeWidth="1.5"/>
        {/* Flange bolts right */}
        {[165, 183, 217, 235].map((y, i) => (
          <circle key={i} cx="470" cy={y} r="5.5" fill="#081D42" stroke="#2a5098" strokeWidth="1.2"/>
        ))}

        {/* Body outer shell */}
        <circle cx="250" cy="200" r="112" fill="#0a1e48" stroke="#1e3870" strokeWidth="2"/>
        {/* Body fill */}
        <circle cx="250" cy="200" r="107" fill="url(#bodyG)"/>
        {/* Body depth band */}
        <rect x="145" y="177" width="210" height="46" fill="rgba(0,0,0,0.18)"/>

        {/* Ball */}
        <circle cx="250" cy="200" r="76" fill="url(#ballG)" stroke="rgba(200,210,230,0.2)" strokeWidth="1.5"/>
        {/* Ball specular highlight */}
        <ellipse cx="228" cy="177" rx="22" ry="15" fill="rgba(255,255,255,0.09)"/>

        {/* Flow bore through ball */}
        <rect x="190" y="183" width="120" height="34" rx="17" fill="#081D42"/>
        {/* Flow bore inner glow */}
        <rect x="194" y="186" width="112" height="28" rx="14" fill="rgba(0,109,255,0.14)"/>
        {/* Flow connection to pipes */}
        <rect x="140" y="183" width="55" height="34" fill="rgba(0,109,255,0.06)"/>
        <rect x="305" y="183" width="55" height="34" fill="rgba(0,109,255,0.06)"/>

        {/* Stem */}
        <rect x="240" y="24" width="20" height="96" rx="4" fill="url(#stemG)" stroke="#2a5098" strokeWidth="1.2"/>
        <rect x="244" y="26" width="5" height="88" rx="2" fill="rgba(255,255,255,0.05)"/>
        {/* Packing gland */}
        <rect x="232" y="82" width="36" height="26" rx="4" fill="#0e2660" stroke="#3060a8" strokeWidth="1.5"/>
        <rect x="236" y="86" width="28" height="18" rx="3" fill="#142c70" stroke="#3060a8" strokeWidth="1"/>

        {/* Handwheel */}
        <rect x="200" y="8" width="100" height="12" rx="6" fill="url(#stemG)" stroke="#3060a8" strokeWidth="1.5"/>
        <circle cx="200" cy="14" r="8" fill="#1a3870" stroke="#3060a8" strokeWidth="1.5"/>
        <circle cx="300" cy="14" r="8" fill="#1a3870" stroke="#3060a8" strokeWidth="1.5"/>
        <circle cx="250" cy="14" r="5" fill="#0e2260" stroke="#3060a8" strokeWidth="1"/>

        {/* Flow arrows */}
        <line x1="4" y1="200" x2="68" y2="200" stroke="#006DFF" strokeWidth="2" markerEnd="url(#arrB)" strokeDasharray="5,4"/>
        <line x1="432" y1="200" x2="496" y2="200" stroke="#006DFF" strokeWidth="2" markerEnd="url(#arrB)" strokeDasharray="5,4"/>

        {/* Orange accent on stem tip */}
        <circle cx="250" cy="24" r="5.5" fill="#FF6A00" filter="url(#glowSm)"/>

        {/* Blue dots at bore entry/exit */}
        <circle cx="190" cy="200" r="3.5" fill="#006DFF" filter="url(#glowSm)" opacity="0.9"/>
        <circle cx="310" cy="200" r="3.5" fill="#006DFF" filter="url(#glowSm)" opacity="0.9"/>

        {/* Dimension line */}
        <line x1="144" y1="324" x2="356" y2="324" stroke="#2a4880" strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="144" y1="318" x2="144" y2="330" stroke="#2a4880" strokeWidth="1"/>
        <line x1="356" y1="318" x2="356" y2="330" stroke="#2a4880" strokeWidth="1"/>
        <text x="250" y="342" textAnchor="middle" fill="#4a6898" fontSize="9" fontFamily="monospace">Ø 210mm BODY · PN16–PN40</text>

        {/* Model label */}
        <text x="250" y="370" textAnchor="middle" fill="#3a5888" fontSize="8.5" fontFamily="monospace" fontWeight="600">ISA Titan™ Ball Valve · API 6D · ISO 9001:2015</text>

        {/* ISA on ball */}
        <text x="250" y="205" textAnchor="middle" fill="rgba(200,215,235,0.45)" fontSize="10" fontFamily="Space Grotesk, Inter" fontWeight="700" letterSpacing="3">ISA</text>
      </svg>
    </div>
  )
}

/* ── Stat Card ── */
function StatCard({ value, prefix = '', suffix = '', label, sub, delay = 0 }: {
  value: number; prefix?: string; suffix?: string; label: string; sub: string; delay?: number
}) {
  const { display, ref } = useCountUp(value, suffix)
  return (
    <div ref={ref} className={`glass-light p-5 rounded-2xl text-center reveal reveal-delay-${delay + 1}`}>
      <div className="font-display text-4xl sm:text-5xl font-bold text-accent-500 mb-1 tabular-nums">
        {prefix}{display}
      </div>
      <div className="font-display text-sm font-bold text-white mb-1">{label}</div>
      <div className="text-xs text-muted leading-snug">{sub}</div>
    </div>
  )
}

/* ── Product Carousel ── */
const carouselItems = [
  { slug: 'ball-valve',       brand: 'ISA Titan™',    tagline: 'DN15–DN600 · API 6D Certified',          color: '#0066CC' },
  { slug: 'butterfly-valve',  brand: 'ISA Hydra™',   tagline: 'DN50–DN1200 · WRAS Approved',             color: '#10b981' },
  { slug: 'gate-valve',       brand: 'ISA Core™',     tagline: 'Full-Bore Isolation · SABS 664',          color: '#8b5cf6' },
  { slug: 'knife-gate-valve', brand: 'ISA ProSeal™',  tagline: 'Slurry · Ceramic-Lined',                  color: '#f59e0b' },
  { slug: 'pinch-valve',      brand: 'ISA Shield™',   tagline: 'ISO 5208 Grade A · Zero Leakage',         color: '#FF8A00' },
  { slug: 'dxst-kgv',         brand: 'ISA DXST™',    tagline: '466% Longer Life · Natural Rubber Lined', color: '#10b981' },
] as const

function ProductCarousel() {
  const [active, setActive] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % carouselItems.length), 3500)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  const item = carouselItems[active]

  return (
    <div style={{ background: 'rgba(0,0,0,0.25)', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 items-center gap-0">
          <div className="flex items-center justify-center py-8 lg:py-12 relative overflow-hidden">
            <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${item.color}12, transparent)` }} />
            <div className="relative z-10 w-72 sm:w-96 transition-all duration-500">
              <ValveIllustration type={item.slug} className="w-full drop-shadow-2xl" />
            </div>
          </div>
          <div className="py-8 lg:py-12 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/5">
            <div className="flex gap-2 mb-6">
              {carouselItems.map((_, i) => (
                <button key={i}
                  onClick={() => { setActive(i); if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = setInterval(() => setActive(a => (a + 1) % carouselItems.length), 3500) } }}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{ width: i === active ? '28px' : '8px', background: i === active ? item.color : 'rgba(255,255,255,0.2)' }} />
              ))}
            </div>
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: item.color }}>{item.brand}</div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
              {products.find(p => p.slug === item.slug)?.name}
            </h3>
            <p className="text-muted text-sm mb-3">{item.tagline}</p>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 line-clamp-3">
              {products.find(p => p.slug === item.slug)?.tagline}
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link to={`/products/${item.slug}`} className="btn-primary text-sm px-5 py-2.5">
                View Specs <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/rfq" className="btn-secondary text-sm px-5 py-2.5">Get Quote</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const brandedProducts = [
  { slug: 'ball-valve',       brandName: 'ISA Titan™',    color: '#006DFF', tagColor: 'rgba(0,109,255,0.1)',   tagBorder: 'rgba(0,109,255,0.25)' },
  { slug: 'butterfly-valve',  brandName: 'ISA Hydra™',   color: '#10b981', tagColor: 'rgba(16,185,129,0.1)', tagBorder: 'rgba(16,185,129,0.25)' },
  { slug: 'gate-valve',       brandName: 'ISA Core™',     color: '#8b5cf6', tagColor: 'rgba(139,92,246,0.1)', tagBorder: 'rgba(139,92,246,0.25)' },
  { slug: 'knife-gate-valve', brandName: 'ISA ProSeal™',  color: '#f59e0b', tagColor: 'rgba(245,158,11,0.1)', tagBorder: 'rgba(245,158,11,0.25)' },
  { slug: 'pinch-valve',      brandName: 'ISA Shield™',   color: '#ef4444', tagColor: 'rgba(239,68,68,0.1)',  tagBorder: 'rgba(239,68,68,0.25)' },
  { slug: 'dxst-kgv',         brandName: 'ISA DXST™',    color: '#FF6A00', tagColor: 'rgba(255,106,0,0.1)',  tagBorder: 'rgba(255,106,0,0.25)' },
]

const whyISA = [
  { feature: 'Average valve life (mining slurry)',  isa: '14 months avg',  typical: '3 months avg' },
  { feature: 'Same-day technical support',          isa: true,              typical: false },
  { feature: 'On-site performance audit',           isa: 'Included',        typical: 'Extra cost' },
  { feature: 'ISO 9001:2015 full traceability',     isa: true,              typical: 'Partial' },
  { feature: 'Ceramic-lined slurry options',        isa: true,              typical: false },
  { feature: 'Application engineering',             isa: 'Included',        typical: false },
  { feature: 'Southern Africa local stock',         isa: true,              typical: false },
  { feature: 'Custom sizing DN15–DN1200',           isa: true,              typical: 'Limited' },
]

const qaSteps = [
  { icon: '🔬', step: 'Material Verification',  desc: 'Chemical composition verified against mill certificates before any machining begins.' },
  { icon: '⚡', step: 'Spectro Analysis',       desc: 'Spectroscopic analysis confirms exact alloy specification per material standard.' },
  { icon: '💧', step: 'Hydrostatic Test',       desc: 'Body and seat pressure-tested at 1.5× rated working pressure per ISO 5208.' },
  { icon: '💨', step: 'Pneumatic Seat Test',    desc: 'Zero-leakage seat test per ISO 5208 Grade A — each valve individually tested.' },
  { icon: '📐', step: 'Dimensional Inspection', desc: 'Full dimensional check against drawing: bore, face-to-face, flange drilling.' },
  { icon: '📋', step: 'Documentation Package',  desc: 'MTC, hydro test report, PMI, inspection record — full traceability per ISO 9001.' },
  { icon: '🚚', step: 'Certified Dispatch',     desc: 'Tagged, preserved, and shipped with complete documentation ready for your audit.' },
]

const testimonials = [
  {
    quote: "Switching to ISA's DXST KGV series was the best decision we made. Valves now last 14 months instead of 3 — saving us over R1.2M per year in parts and planned shutdowns.",
    name: 'Maintenance Manager',
    role: 'Copper Mining Operation · Northern Cape',
    rating: 5,
  },
  {
    quote: "ISA's team came on-site, understood our slurry chemistry and flow conditions, then specified the right sleeve compound. Zero cavitation issues and zero unplanned valve replacements since.",
    name: 'Process Engineer',
    role: 'Water Treatment Plant · Gauteng',
    rating: 5,
  },
  {
    quote: "Full MTCs, hydro test reports, and traceability documents on every valve — exactly what our API 6D compliance audits demand. No other local supplier comes close to this standard.",
    name: 'Procurement Manager',
    role: 'Oil & Gas Midstream · Western Cape',
    rating: 5,
  },
]

const industries = [
  { name: 'Mining & Resources',       icon: '⛏', desc: 'Slurry, tailings, thickener underflow — ceramic and rubber-lined solutions for extreme abrasion.', to: '/industries/mining', color: '#F59E0B' },
  { name: 'Water Treatment',          icon: '💧', desc: 'WRAS and SABS-approved valves for municipal supply, treatment plants and irrigation networks.', to: '/industries/water-treatment', color: '#06B6D4' },
  { name: 'Oil & Gas',                icon: '🛢', desc: 'API 6D certified ball valves with full traceability documentation for upstream and midstream.', to: '/industries/oil-gas', color: '#8B5CF6' },
  { name: 'Chemical & Petrochemical', icon: '⚗', desc: 'PTFE and PEEK-seated valves rated for aggressive acids, solvents and chlorinated media.', to: '/industries/chemical', color: '#EF4444' },
  { name: 'HVAC & Building',          icon: '🌡', desc: 'Compact quarter-turn and gate valves for commercial HVAC, fire protection and building services.', to: '/industries/hvac', color: '#10B981' },
  { name: 'Pulp & Paper',             icon: '📄', desc: 'Full-bore knife gate valves that shear fibrous stock, black liquor and process effluent cleanly.', to: '/industries/pulp-paper', color: '#6366F1' },
]

const certs = [
  { name: 'ISO 9001:2015', desc: 'Quality Management System — full production traceability', icon: '✦' },
  { name: 'API 6D',        desc: 'Pipeline & piping valves — upstream/midstream service', icon: '⬡' },
  { name: 'ISO 5208 Grd A',desc: 'Zero-leakage seat test — verified on every pinch valve', icon: '◈' },
  { name: 'WRAS',          desc: 'Approved for potable water contact applications', icon: '◉' },
  { name: 'SABS',          desc: 'South African Bureau of Standards certification', icon: '◆' },
]

const coverage = [
  { country: 'South Africa', flag: '🇿🇦', note: 'Headquarters & Stock', primary: true },
  { country: 'Zambia',       flag: '🇿🇲', note: 'Mining operations',    primary: false },
  { country: 'Botswana',     flag: '🇧🇼', note: 'Water & mining',       primary: false },
  { country: 'Namibia',      flag: '🇳🇦', note: 'Mining & energy',      primary: false },
  { country: 'Zimbabwe',     flag: '🇿🇼', note: 'Industrial & mining',  primary: false },
  { country: 'Mozambique',   flag: '🇲🇿', note: 'Oil, gas & ports',     primary: false },
]

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null)
  const [openQA, setOpenQA] = useState<number | null>(null)

  const statsReveal      = useReveal()
  const productsReveal   = useReveal()
  const whyReveal        = useReveal()
  const industriesReveal = useReveal()
  const qaReveal         = useReveal()
  const testimReveal     = useReveal()
  const certsReveal      = useReveal()
  const coverageReveal   = useReveal()
  const proofReveal      = useReveal()
  const ctaReveal        = useReveal()
  const resourcesReveal  = useReveal()

  const featuredProducts = brandedProducts.map(bp => {
    const p = products.find(p => p.slug === bp.slug)
    return p ? { ...p, ...bp } : null
  }).filter(Boolean) as (Product & typeof brandedProducts[0])[]

  return (
    <div style={{ background: '#081D42' }}>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Hero banner photo — very subtle overlay */}
        <img
          src="/images/hero/control-valves.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.08] pointer-events-none"
        />
        <div className="absolute inset-0 bg-grid opacity-70" />
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 70% at 60% 50%, rgba(0,102,204,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 60% at 20% 30%, rgba(255,138,0,0.08) 0%, transparent 55%)'
        }} />
        {/* ISA triangle watermark — very subtle */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center opacity-[0.035] pointer-events-none hidden lg:flex">
          <ISAWatermark size={700} opacity={1} />
        </div>
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40" style={{ background: 'linear-gradient(to bottom, transparent, #071B2E)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              {/* Logo — prominent in hero */}
              <div className="mb-8">
                <ISALogoHero />
              </div>

              {/* Cert badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300 mb-6"
                style={{ background: 'rgba(0,102,204,0.1)', border: '1px solid rgba(0,102,204,0.25)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ISO 9001:2015 · API 6D · SABS · WRAS · ISO 5208 Grade A
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-[4rem] font-bold text-white leading-[1.06] mb-5">
                YOUR PARTNER IN<br />
                <span className="shimmer-text">VALVE SOLUTIONS</span>
              </h1>

              <p className="text-lg text-muted leading-relaxed mb-3 max-w-xl">
                Industrial Valve Specialists · Flow Control · Mining · Water · Oil & Gas · Chemical Processing
              </p>
              <p className="text-sm font-semibold text-accent-400 mb-8">
                ↑ 72% less downtime · R1.2M annual saving · Copper mining, Northern Cape
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link to="/products" className="btn-primary text-base px-8 py-4">
                  View Products <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/rfq" className="btn-secondary text-base px-8 py-4">
                  Request a Quote
                </Link>
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <Link to="/configure" className="flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors">
                  <Zap className="w-3.5 h-3.5" /> Try AI Valve Selector
                </Link>
              </div>

              {/* Cert icons */}
              <div className="flex flex-wrap gap-2 mt-6">
                {['ISO 9001:2015', 'API 6D', 'SABS', 'WRAS', 'ISO 5208 Grd A'].map(c => (
                  <span key={c} className="text-xs font-bold text-blue-300 px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(0,102,204,0.08)', border: '1px solid rgba(0,102,204,0.2)' }}>
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Valve illustration */}
            <div className="hidden lg:block">
              <ValveHeroRender />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted opacity-60">
          <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE CAROUSEL ─────────────────────────────── */}
      <ProductCarousel />

      {/* ── SCROLLING TRUST STRIP ─────────────────────────────────── */}
      <div className="py-4 section-sep overflow-hidden" style={{ background: 'rgba(0,109,255,0.04)' }}>
        <div className="flex gap-10 items-center justify-center flex-wrap px-6">
          {[
            'ISO 9001:2015 Certified', 'API 6D Pipeline Valves', 'SABS Approved', 'WRAS Potable Water',
            'ISO 5208 Grade A', '25 Years Experience', 'R1.2M Customer Savings', '72% Downtime Reduction'
          ].map(item => (
            <span key={item} className="text-xs font-semibold text-slate-400 tracking-wide whitespace-nowrap">{item}</span>
          ))}
        </div>
      </div>

      {/* ── STATS ─────────────────────────────────────────────────── */}
      <section className="py-20" ref={statsReveal.ref}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${statsReveal.inView ? 'in-view' : ''}`}>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard value={72}  suffix="%" label="Less Downtime"   sub="Copper mining, Northern Cape" delay={0} />
            <StatCard value={1200000} prefix="R" suffix="" label="Annual Saving" sub="Parts & shutdown costs" delay={1} />
            <StatCard value={14} suffix=" mo" label="Valve Life"     sub="vs 3 mo with standard valves" delay={2} />
            <StatCard value={25} suffix=" yr"  label="Experience"    sub="Precision valve engineering" delay={3} />
            <StatCard value={100} suffix="%"   label="Documentation" sub="Full traceability every valve" delay={4} />
            <StatCard value={24}  suffix="/7"  label="Engineering"   sub="Technical support available" delay={5} />
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────────── */}
      <section className="py-24 section-sep" ref={productsReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between mb-12 reveal ${productsReveal.inView ? 'in-view' : ''}`}>
            <div>
              <p className="eng-label mb-3">Product Families</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Six Engineered<br />Valve Technologies</h2>
              <p className="text-muted mt-3 max-w-xl">Every product ISO 9001:2015 certified and pressure-tested at 1.5× rated pressure before dispatch.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              View all products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <button
                key={product.slug}
                onClick={() => setModalProduct(product)}
                className={`group text-left glass p-0 overflow-hidden hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl reveal reveal-delay-${Math.min(i + 1, 6)} ${productsReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {/* Valve illustration */}
                <div className="relative overflow-hidden flex items-center justify-center py-6 px-4"
                  style={{ background: `linear-gradient(135deg, ${product.tagColor}, rgba(7,27,46,0.8))`, minHeight: '140px' }}>
                  <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${product.color}10, transparent)` }} />
                  <ValveIllustration type={product.slug as 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve' | 'pinch-valve' | 'dxst-kgv'} className="w-40 relative z-10" />
                  {/* Brand badge */}
                  <div className="absolute top-3 right-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-full"
                      style={{ background: `${product.color}25`, border: `1px solid ${product.color}50`, color: product.color }}>
                      {product.brandName}
                    </span>
                  </div>
                </div>
                {/* Content */}
                <div className="p-5">
                  <h3 className="font-display text-base font-bold text-white mb-1.5 group-hover:text-blue-300 transition-colors">{product.name}</h3>
                  <p className="text-xs text-muted leading-relaxed mb-3 line-clamp-2">{product.tagline}</p>
                  <div className="space-y-1 mb-3">
                    {product.specs.filter(s => ['Size range', 'Pressure rating', 'Pressure Class', 'Certification'].includes(s.label)).slice(0,2).map(s => (
                      <div key={s.label} className="flex items-center gap-2 text-xs text-muted">
                        <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                        <span className="text-slate-400">{s.label}:</span>
                        <span className="text-slate-300 font-medium truncate">{s.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:opacity-100 opacity-70 transition-opacity">
                      View specs <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="w-3.5 h-3.5" /> Data Sheet
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="btn-secondary">View all products <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── AI VALVE SELECTOR ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,109,255,0.06) 0%, rgba(8,29,66,0) 60%)' }}>
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,109,255,0.07) 0%, transparent 70%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="glass p-10 sm:p-14 pulse-blue" style={{ border: '1px solid rgba(0,109,255,0.2)' }}>
            {/* Icon */}
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(0,109,255,0.2), rgba(0,109,255,0.05))', border: '1px solid rgba(0,109,255,0.3)' }}>
              <Zap className="w-7 h-7 text-blue-400" />
            </div>
            <p className="eng-label mb-4">AI Engineering Assistant</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Find The Right Valve<br />
              <span className="shimmer-blue">In Under 60 Seconds</span>
            </h2>
            <p className="text-muted text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
              Answer 6 questions about your industry, fluid, pressure, temperature, pipe size and connection type. Our AI cross-references all six valve families and delivers a precise engineering recommendation — instantly.
            </p>
            {/* Step indicators */}
            <div className="hidden sm:flex items-center justify-center gap-2 mb-10">
              {['Industry', 'Fluid', 'Pressure', 'Temperature', 'Pipe Size', 'Valve'].map((step, i) => (
                <div key={step} className="flex items-center gap-2">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white mb-1"
                      style={{ background: i === 5 ? '#FF6A00' : 'rgba(0,109,255,0.25)', border: `1px solid ${i === 5 ? '#FF6A00' : 'rgba(0,109,255,0.4)'}` }}>
                      {i + 1}
                    </div>
                    <span className="text-[9px] text-muted whitespace-nowrap">{step}</span>
                  </div>
                  {i < 5 && <div className="w-6 h-px bg-blue-500/30 mb-4" />}
                </div>
              ))}
            </div>
            <Link to="/configure" className="btn-primary text-lg px-12 py-4 inline-flex">
              Start AI Selector <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ISA ───────────────────────────────────────────────── */}
      <section className="py-24 section-sep" ref={whyReveal.ref}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 reveal ${whyReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">The ISA Difference</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Why engineers<br />choose ISA</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Not all valve suppliers are equal. Here's how we compare to a typical distributor on the criteria that matter to engineers and procurement teams.</p>
          </div>
          <div className={`glass overflow-hidden reveal reveal-delay-2 ${whyReveal.inView ? 'in-view' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest px-6 py-4"
              style={{ background: 'rgba(0,109,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-muted">Specification</span>
              <span className="text-blue-400 text-center">ISA Valve Solutions</span>
              <span className="text-muted text-center">Typical Supplier</span>
            </div>
            {whyISA.map((row, i) => (
              <div key={row.feature} className="grid grid-cols-3 px-6 py-4 items-center hover:bg-white/[0.02] transition-colors"
                style={{ borderBottom: i < whyISA.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span className="text-sm text-slate-300 pr-4">{row.feature}</span>
                <div className="flex justify-center">
                  {typeof row.isa === 'boolean'
                    ? <span className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-400" /></span>
                    : <span className="text-sm font-bold text-emerald-400">{row.isa}</span>
                  }
                </div>
                <div className="flex justify-center">
                  {typeof row.typical === 'boolean'
                    ? (row.typical
                        ? <span className="w-7 h-7 rounded-full bg-emerald-500/15 flex items-center justify-center"><Check className="w-4 h-4 text-emerald-400" /></span>
                        : <span className="w-7 h-7 rounded-full bg-white/[0.04] flex items-center justify-center"><X className="w-4 h-4 text-slate-600" /></span>)
                    : <span className="text-sm text-muted">{row.typical}</span>
                  }
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-8 reveal reveal-delay-3 ${whyReveal.inView ? 'in-view' : ''}`}>
            <Link to="/rfq" className="btn-primary">Request a Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── INDUSTRY SOLUTIONS ────────────────────────────────────── */}
      <section className="py-24" ref={industriesReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 reveal ${industriesReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">Industry Solutions</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Built for<br />your sector</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <Link key={ind.to} to={ind.to}
                className={`group glass p-6 hover:-translate-y-1.5 transition-all duration-300 block reveal reveal-delay-${Math.min(i + 1, 6)} ${industriesReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                    style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                    {ind.icon}
                  </div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-blue-300 transition-colors">{ind.name}</h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore solutions <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY ASSURANCE TIMELINE ───────────────────────────── */}
      <section className="py-24 section-sep relative overflow-hidden" ref={qaReveal.ref}>
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-14 reveal ${qaReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">Quality Assurance</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Every valve passes<br />a 7-stage process</h2>
            <p className="text-muted text-lg max-w-xl mx-auto">From raw material verification to certified dispatch — ISO 9001:2015 compliance at every step.</p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[22px] sm:left-1/2 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(to bottom, rgba(0,109,255,0), rgba(0,109,255,0.3), rgba(0,109,255,0))' }} />

            <div className="space-y-4">
              {qaSteps.map((step, i) => {
                const isLeft = i % 2 === 0
                return (
                  <div key={step.step}
                    className={`relative flex gap-4 sm:gap-0 reveal reveal-delay-${Math.min(i + 1, 6)} ${qaReveal.inView ? 'in-view' : ''} ${isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    {/* Content */}
                    <div className={`flex-1 sm:w-1/2 ${isLeft ? 'sm:pr-10 sm:text-right' : 'sm:pl-10 sm:text-left'} pl-12 sm:pl-0`}>
                      <button
                        onClick={() => setOpenQA(openQA === i ? null : i)}
                        className="w-full text-left sm:text-inherit"
                      >
                        <div className="glass p-5 group cursor-pointer hover:-translate-y-0.5 transition-all duration-200"
                          style={{ border: openQA === i ? '1px solid rgba(0,109,255,0.3)' : '1px solid rgba(255,255,255,0.06)' }}>
                          <div className={`flex items-center gap-3 ${isLeft ? 'sm:flex-row-reverse' : ''}`}>
                            <span className="text-xl">{step.icon}</span>
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Step {i + 1}</span>
                              </div>
                              <h3 className="font-display text-sm font-bold text-white">{step.step}</h3>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${openQA === i ? 'rotate-180' : ''}`} />
                          </div>
                          {openQA === i && (
                            <p className={`text-xs text-muted leading-relaxed mt-3 pt-3 border-t border-white/5 ${isLeft ? 'sm:text-right' : ''}`}>
                              {step.desc}
                            </p>
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-5 flex items-center justify-center">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                        style={{ background: 'rgba(0,109,255,0.15)', border: '1px solid rgba(0,109,255,0.35)' }}>
                        {i + 1}
                      </div>
                    </div>

                    {/* Spacer for right side on desktop */}
                    <div className="hidden sm:block flex-1" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── MINING CASE STUDY ─────────────────────────────────────── */}
      <section className="py-24" ref={proofReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div className={`reveal ${proofReveal.inView ? 'in-view' : ''}`}>
              <p className="eng-label mb-4">Case Study · Copper Mining · Northern Cape</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                466% longer valve life.<br />
                <span className="text-accent-400">R1.2M saved annually.</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                A copper mine replaced standard knife gate valves — failing every 3 months — with ISA DXST™ Series valves featuring injection-moulded natural rubber linings. The result: 466% increase in service life and 72% reduction in maintenance downtime.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  { metric: '3 months → 14 months', desc: 'Valve service life extended by 466%' },
                  { metric: '72% reduction',          desc: 'In unplanned maintenance downtime' },
                  { metric: 'R1.2M per year',          desc: 'Saved in parts and shutdown costs' },
                ].map(row => (
                  <div key={row.metric} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                    </span>
                    <div>
                      <span className="font-bold text-white text-sm">{row.metric}</span>
                      <span className="text-muted text-sm"> — {row.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/products/dxst-kgv" className="btn-primary">
                View ISA DXST™ <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className={`glass p-8 rounded-2xl reveal reveal-delay-2 ${proofReveal.inView ? 'in-view' : ''}`} style={{ border: '1px solid rgba(255,106,0,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent-500/15 flex items-center justify-center text-2xl">⛏</div>
                <div>
                  <div className="font-bold text-white">Copper Mining Operation</div>
                  <div className="text-xs text-muted">Northern Cape, South Africa · Thickener Underflow</div>
                </div>
              </div>
              <div className="space-y-5">
                {[
                  { label: 'Previous valve life', val: '3 months → 14 months', pct: 21, actual: 100 },
                  { label: 'Downtime reduction',  val: '72% less downtime',    pct: 28, actual: 72  },
                  { label: 'Annual cost saved',   val: 'R1.2M per year',       pct: 85, actual: 85  },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-muted">{row.label}</span>
                      <span className="font-bold text-accent-400">{row.val}</span>
                    </div>
                    {/* Dual bar: before/after */}
                    <div className="space-y-1">
                      <div className="h-1.5 rounded-full bg-dark-600/60 overflow-hidden">
                        <div className="h-full rounded-full bg-red-500/40" style={{ width: `${row.pct}%` }} />
                      </div>
                      <div className="h-1.5 rounded-full bg-dark-600/60 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400" style={{ width: `${row.actual}%` }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-[10px] mt-1 text-muted">
                      <span>Before ISA</span><span className="text-accent-400">After ISA</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────── */}
      <section className="py-24 section-sep relative overflow-hidden" ref={testimReveal.ref}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 reveal ${testimReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">Customer Stories</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">What engineers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`glass p-7 flex flex-col reveal reveal-delay-${i + 1} ${testimReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-blue-400">{t.name[0]}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{t.name}</div>
                    <div className="text-xs text-muted">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────────── */}
      <section className="py-20 section-sep" ref={certsReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 reveal ${certsReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">Certifications & Standards</p>
            <h2 className="font-display text-3xl font-bold text-white">Standards you can audit</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certs.map((c, i) => (
              <div key={c.name} className={`glass-light p-5 text-center rounded-2xl hover:-translate-y-1 transition-all duration-300 reveal reveal-delay-${i + 1} ${certsReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="text-2xl text-blue-400 mb-3">{c.icon}</div>
                <div className="font-display text-base font-bold text-white mb-1">{c.name}</div>
                <div className="text-[11px] text-muted leading-tight">{c.desc}</div>
                <div className="mt-3 flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-400">
                  <Shield className="w-3 h-3" /> Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING RESOURCES TEASER ────────────────────────── */}
      <section className="py-24" ref={resourcesReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`reveal ${resourcesReveal.inView ? 'in-view' : ''}`}>
            <p className="eng-label mb-3">Knowledge Centre</p>
            <div className="grid lg:grid-cols-2 gap-8 items-end mb-8">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Engineering resources for your team</h2>
              <div>
                <p className="text-muted text-lg leading-relaxed mb-4">From valve sizing calculators to chemical compatibility tables — everything your engineering team needs to specify the right valve, first time.</p>
                <div className="flex flex-wrap gap-3">
                  <Link to="/resources" className="btn-secondary">
                    <BookOpen className="w-4 h-4" /> Resource Centre
                  </Link>
                  <Link to="/calculators" className="btn-secondary">
                    <Calculator className="w-4 h-4" /> Calculators
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Calculator className="w-5 h-5" />, title: 'Engineering Calculators', desc: 'Cv, pressure drop, flow rate, pipe velocity and valve sizing', to: '/calculators', color: '#006DFF' },
              { icon: <BookOpen className="w-5 h-5" />, title: 'Valve Selection Guide', desc: 'Flowchart and comparison table to choose the right valve type', to: '/resources', color: '#10B981' },
              { icon: <Download className="w-5 h-5" />, title: 'Technical Data Sheets', desc: 'PDF specifications, dimensional drawings and test reports', to: '/catalog', color: '#F59E0B' },
              { icon: <Shield className="w-5 h-5" />, title: 'Chemical Compatibility', desc: 'Elastomer and body material compatibility for 100+ chemicals', to: '/resources#compatibility', color: '#8B5CF6' },
            ].map((item, i) => (
              <Link key={item.title} to={item.to}
                className={`group glass p-5 hover:-translate-y-1 transition-all duration-300 block reveal reveal-delay-${i + 1} ${resourcesReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${item.color}18`, border: `1px solid ${item.color}30`, color: item.color }}>
                  {item.icon}
                </div>
                <h3 className="font-display text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Open <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL COVERAGE ───────────────────────────────────────── */}
      <section className="py-24 section-sep" ref={coverageReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center reveal ${coverageReveal.inView ? 'in-view' : ''}`}>
            <div>
              <p className="eng-label mb-3">Regional Reach</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Serving<br />Southern Africa</h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Headquartered in South Africa with active supply across six southern African nations — local stock, short lead times, and on-site engineering support where you operate.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {coverage.map(c => (
                  <div key={c.country} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${c.primary ? 'bg-accent-500/10 border border-accent-500/25' : 'bg-white/[0.03] border border-white/[0.06]'}`}>
                    <span className="text-xl">{c.flag}</span>
                    <div>
                      <div className={`text-sm font-semibold ${c.primary ? 'text-accent-400' : 'text-white'}`}>{c.country}</div>
                      <div className="text-xs text-muted">{c.note}</div>
                    </div>
                    {c.primary && <MapPin className="w-3.5 h-3.5 text-accent-500 ml-auto flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>

            {/* SVG map */}
            <div className="flex items-center justify-center">
              <div className="glass p-8 rounded-2xl w-full max-w-xs mx-auto" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <svg viewBox="0 0 200 260" className="w-full" fill="none">
                  <path d="M60,10 L140,10 L155,40 L160,80 L150,120 L140,160 L120,200 L100,240 L80,200 L60,160 L50,120 L40,80 L45,40 Z"
                    fill="rgba(0,109,255,0.04)" stroke="rgba(0,109,255,0.15)" strokeWidth="1.5"/>
                  <circle cx="100" cy="160" r="7" fill="#FF6A00" opacity="0.95"/>
                  <circle cx="100" cy="160" r="14" fill="#FF6A00" opacity="0.12"/>
                  <circle cx="100" cy="95"  r="4.5" fill="#006DFF" opacity="0.8"/>
                  <circle cx="80"  cy="140" r="4"   fill="#006DFF" opacity="0.7"/>
                  <circle cx="62"  cy="110" r="4"   fill="#006DFF" opacity="0.7"/>
                  <circle cx="122" cy="125" r="4"   fill="#006DFF" opacity="0.7"/>
                  <circle cx="138" cy="110" r="4"   fill="#006DFF" opacity="0.7"/>
                  {([[100,95],[80,140],[62,110],[122,125],[138,110]] as [number,number][]).map(([x,y], i) => (
                    <line key={i} x1="100" y1="160" x2={x} y2={y} stroke="rgba(0,109,255,0.2)" strokeWidth="1" strokeDasharray="3,3"/>
                  ))}
                  <text x="112" y="165" fill="#FF6A00" fontSize="7" fontWeight="600">S. Africa</text>
                  <text x="104" y="92"  fill="#A8B2C5" fontSize="6">Zambia</text>
                  <text x="84"  y="152" fill="#A8B2C5" fontSize="6">Botswana</text>
                  <text x="40"  y="113" fill="#A8B2C5" fontSize="6">Namibia</text>
                  <text x="124" y="122" fill="#A8B2C5" fontSize="6">Zimbabwe</text>
                  <text x="140" y="107" fill="#A8B2C5" fontSize="6">Mozambique</text>
                </svg>
                <div className="text-center mt-2">
                  <div className="text-xs text-muted">6-country distribution network</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ─────────────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" ref={ctaReveal.ref}>
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.07) 0%, rgba(0,109,255,0.04) 100%)' }} />
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 reveal ${ctaReveal.inView ? 'in-view' : ''}`}>
          <p className="eng-label mb-4">Need Engineering Assistance?</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Ready to specify?
          </h2>
          <p className="text-muted text-xl mb-10 max-w-2xl mx-auto">
            Get a quotation or engineering recommendation today. Our team responds within 24 hours with a full technical proposal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/rfq" className="btn-primary text-lg px-12 py-5">
              Request a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/configure" className="btn-secondary text-lg px-12 py-5">
              <Zap className="w-5 h-5 text-accent-400" /> AI Valve Selector
            </Link>
          </div>
        </div>
      </section>

      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </div>
  )
}

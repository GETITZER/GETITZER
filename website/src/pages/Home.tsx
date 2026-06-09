import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield,
  HardHat, Droplets, Flame, FlaskConical, Building2, FileText,
  Wrench, Award, Truck, Phone, Mail, MapPin,
  Download, Calculator, BookOpen, ChevronRight,
} from 'lucide-react'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'
import type { Product } from '../types'
import ProductModal from '../components/ProductModal'
import { ISAMark } from '../components/ISALogo'

/* ── Scroll reveal hook ───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('revealed'); obs.disconnect() }
    }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return ref
}

/* ── Animated counter ─────────────────────────────────────────────── */
function StatCard({ target, suffix, label, sub }: {
  target: number; suffix?: string; label: string; sub: string
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.4 })
    obs.observe(el); return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let step = 0; const steps = 55
    const id = setInterval(() => {
      step++
      setCount(Math.min(Math.round((target / steps) * step), target))
      if (step >= steps) clearInterval(id)
    }, 2000 / steps)
    return () => clearInterval(id)
  }, [started, target])

  return (
    <div ref={ref} className="text-center px-6 py-10">
      <div className="text-5xl font-extrabold text-isa-500 mb-1.5 tabular-nums tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  )
}

/* ── Data ───────────────────────────────────────────────────────── */
const STATS = [
  { target: 35,  suffix: '+',  label: 'Years Experience',    sub: 'Proven engineering expertise' },
  { target: 500, suffix: '+',  label: 'Projects Completed',  sub: 'Across multiple industries' },
  { target: 8,   suffix: '+',  label: 'Countries Served',    sub: 'Southern & Central Africa' },
  { target: 24,  suffix: '/7', label: 'Engineering Support', sub: 'Technical assistance' },
]

const CERTS = [
  { code: 'ISO 9001:2015', name: 'Quality Management' },
  { code: 'API 6D',        name: 'Pipeline Valves' },
  { code: 'ISO 5208',      name: 'Zero Leakage' },
  { code: 'WRAS',          name: 'Potable Water' },
  { code: 'SABS 664',      name: 'Gate Valves SA' },
]

const PRODUCT_CATS = [
  { title: 'ISA DXST™ Slurry KGV',      sub: '466% longer service life', spec: 'DN50–DN600 · Mining grade',   slug: 'dxst-kgv',        img: '/images/products/knife-gate-valve-nobg.jpg' },
  { title: 'ISA Titan™ Ball Valve',      sub: 'API 6D certified',         spec: 'DN15–DN600 · Full bore',      slug: 'ball-valve',       img: '/images/products/ball-valve-nobg.jpg' },
  { title: 'ISA Hydra™ Butterfly Valve', sub: 'WRAS approved',            spec: 'DN50–DN4000 · Triple offset', slug: 'butterfly-valve',  img: '/images/products/butterfly-valve-dn4000.png' },
  { title: 'ISA Core™ Gate Valve',       sub: 'SABS 664 certified',       spec: 'DN50–DN1000 · OS&Y',          slug: 'gate-valve',       img: '/images/products/gate-valve-clean.jpg' },
  { title: 'ISA Shield™ Pinch Valve',    sub: 'ISO 5208 Grade A',         spec: 'DN25–DN400 · 4 sleeve types', slug: 'pinch-valve',      img: '/images/products/pinch-valve.jpg' },
  { title: 'ISA ProSeal™ Knife Gate',    sub: 'Ceramic-lined option',     spec: 'DN50–DN600 · Wafer/Lug',      slug: 'knife-gate-valve', img: '/images/products/knife-gate-valve-isa.jpg' },
]

const INDUSTRY_TABS = [
  { name: 'Mining',             Icon: HardHat,      desc: 'Ceramic-lined and hard-wearing valves for slurry, tailings and concentrate transfer in abrasive mining circuits.',  to: '/industries/mining' },
  { name: 'Water Treatment',    Icon: Droplets,     desc: 'WRAS-approved butterfly and gate valves for municipal supply, desalination and water distribution infrastructure.', to: '/industries/water-treatment' },
  { name: 'Oil & Gas',          Icon: Flame,        desc: 'API 6D certified ball and gate valves for upstream, midstream and pipeline applications — fugitive emission rated.', to: '/industries/oil-gas' },
  { name: 'Chemical Processing',Icon: FlaskConical, desc: 'Corrosion-resistant alloys and full-bore lining options for aggressive chemical and petrochemical media.',           to: '/industries/chemical' },
  { name: 'Municipal',          Icon: Building2,    desc: 'SABS 664-certified gate and butterfly valves for potable water distribution networks and wastewater systems.',       to: '/industries' },
  { name: 'Pulp & Paper',       Icon: FileText,     desc: 'Pinch valves and knife gate valves engineered for fibrous, abrasive pulp slurry and paper-making applications.',    to: '/industries/pulp-paper' },
]

const PROJECTS = [
  { title: 'Konige Mine — Zambia',        sub: 'Coriolis Mass Flow & Slurry Sampling System', desc: 'Audit-grade IFC installation for copper concentrate measurement. Full fabrication, installation and commissioning.', tag: 'Mining · Zambia' },
  { title: 'Municipal Water Network',     sub: 'DN800 Butterfly Valves — WRAS Compliant',     desc: 'WRAS-compliant butterfly valve installation for potable water distribution network. Delivered within 3 weeks.',     tag: 'Water · South Africa' },
  { title: 'Intelligent Slurry Sampling', sub: 'LSD-E · LMD Distributor · Siemens WinCC',    desc: 'On-line mineral slurry sampling system for platinum group metals processing with full SCADA automation.',            tag: 'Mining · PGM' },
  { title: 'Control Valve Package',       sub: 'Hydraulic Control · Pressure Reducing Valves',desc: 'Complete hydraulic control valve package — pressure reducing, sustaining, foot check and swing check valves.',       tag: 'Industrial · RSA' },
]

const CAPABILITIES = [
  { Icon: Wrench, title: 'Engineering Support',  desc: 'In-house technical team for valve sizing, material selection, and application engineering across all product lines.' },
  { Icon: Award,  title: 'Quality Assurance',    desc: 'Every valve hydrostatic and pneumatically tested at 1.5× rated pressure. Full material traceability documentation.' },
  { Icon: Truck,  title: 'Africa-Wide Delivery', desc: 'Established logistics network covering South Africa, Zambia, Zimbabwe, Botswana, Namibia and Mozambique.' },
]

const RESOURCES = [
  { Icon: Download,    title: 'Technical Data Sheets',    sub: '7 PDF documents — immediate download',  to: '/resources#downloads' },
  { Icon: Calculator,  title: 'Engineering Calculators',  sub: 'Cv, flow rate, pressure drop',          to: '/calculators' },
  { Icon: BookOpen,    title: 'Chemical Compatibility',   sub: 'NBR · EPDM · Viton® · PTFE guide',     to: '/resources#compatibility' },
  { Icon: Download,    title: 'Product Catalog',          sub: '40+ valve models, all specifications',  to: '/catalog' },
  { Icon: FileText,    title: 'Valve Selection Guide',    sub: 'Match application to valve type',       to: '/resources#selection' },
  { Icon: Shield,      title: 'Standards Reference',      sub: 'ISO, API 6D, SABS, WRAS',              to: '/resources#standards' },
]

/* ── Industry selector ─────────────────────────────────────────── */
function IndustrySelector() {
  const [active, setActive] = useState(0)
  const tab = INDUSTRY_TABS[active]
  const { Icon } = tab

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex overflow-x-auto scrollbar-none">
          {INDUSTRY_TABS.map((t, i) => {
            const TIcon = t.Icon
            return (
              <button key={t.name} onClick={() => setActive(i)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all duration-150 flex-shrink-0 ${
                  active === i
                    ? 'border-isa-500 text-isa-600 bg-isa-50'
                    : 'border-transparent text-slate-500 hover:text-slate-900 hover:border-slate-300'
                }`}>
                <TIcon className="w-4 h-4" />
                {t.name}
              </button>
            )
          })}
        </div>
        <div className="py-5 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-isa-500/10 border border-isa-500/20 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-isa-500" />
            </div>
            <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">{tab.desc}</p>
          </div>
          <Link to={tab.to}
            className="flex items-center gap-1.5 text-sm font-bold text-isa-600 hover:text-isa-700 whitespace-nowrap transition-colors">
            Explore <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [modal, setModal] = useState<Product | null>(null)

  const revealProducts     = useReveal()
  const revealCapabilities = useReveal()
  const revealProjects     = useReveal()
  const revealResources    = useReveal()
  const revealCerts        = useReveal()

  return (
    <div className="bg-white">

      {/* ── 1. HERO ──────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden isa-copyright-mark">

        {/* Full-bleed background with strong overlay for large typography */}
        <div className="absolute inset-0">
          <img
            src="/images/hero/pipeline-field.jpg"
            alt="ISA Valve Solutions industrial pipeline installation"
            className="w-full h-full object-cover object-center"
            style={{ transform: 'scale(1.04)', animation: 'hero-zoom 10s ease-out forwards' }}
          />
          {/* Left-to-right gradient: white on left, transparent right — keeps full image visible right side */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/10" />
          {/* Bottom fade into white */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Animated orange glow blob — left side atmosphere */}
        <div className="absolute top-1/3 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none blob-1"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — hero text */}
            <div className="max-w-2xl">
              <div className="hero-badge-enter inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white mb-8 bg-isa-500 shadow-lg shadow-isa-500/30">
                <Shield className="w-3 h-3" /> ISO 9001:2015 Certified · South Africa
              </div>

              {/* Giant headline */}
              <h1 className="tracking-tight leading-[0.95] mb-6">
                <span className="hero-title-enter block text-6xl sm:text-7xl lg:text-8xl font-extrabold text-slate-900">
                  Precision
                </span>
                <span className="dark-hero-line2 block text-6xl sm:text-7xl lg:text-8xl font-extrabold">
                  <span className="text-isa-500 relative inline-block">
                    Valve
                    <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-isa-500 to-isa-400 rounded-full opacity-50" />
                  </span>
                  {' '}
                  <span className="text-slate-900">Solutions</span>
                </span>
              </h1>

              <p className="hero-sub-enter text-xl text-slate-600 max-w-lg mb-10 leading-relaxed font-medium">
                35 years supplying specification-grade industrial valves across Africa. Mining, water, oil &amp; gas and chemical industries trust ISA.
              </p>

              <div className="hero-cta-enter flex flex-wrap gap-3 mb-10">
                <Link to="/rfq"
                  className="btn-pulse inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-8 py-4 rounded-xl transition-colors duration-150 text-base shadow-lg shadow-isa-500/30">
                  Get a Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/products"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-base text-slate-700 border-2 border-slate-200 hover:border-isa-400 hover:text-isa-600 bg-white/90 hover:bg-white transition-all duration-200 shadow-sm">
                  View Products <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Cert pills */}
              <div className="hero-certs-enter flex flex-wrap items-center gap-2">
                {CERTS.map(c => (
                  <span key={c.code}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold text-slate-500 bg-slate-100 border border-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-isa-500 flex-shrink-0" />
                    {c.code}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — ISA Mark + product quick-links (desktop only) */}
            <div className="dark-hero-mark hidden lg:flex flex-col items-center gap-5">
              {/* Glow halo behind the mark */}
              <div className="relative flex items-center justify-center">
                <div className="absolute w-72 h-72 rounded-full blob-2"
                  style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.1) 0%, rgba(0,102,204,0.06) 50%, transparent 75%)' }} />
                <ISAMark size={200} animate />
              </div>
              <div className="flex flex-col gap-2 w-full max-w-xs">
                {PRODUCT_CATS.slice(0, 4).map((p, i) => (
                  <Link key={p.slug} to={`/products/${p.slug}`}
                    style={{ animationDelay: `${0.9 + i * 0.12}s` }}
                    className="hero-certs-enter flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm hover:shadow-md hover:border-isa-300 hover:-translate-y-0.5 transition-all group">
                    <span className="w-2 h-2 rounded-full bg-isa-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 group-hover:text-isa-600 transition-colors leading-none truncate">{p.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.spec}</p>
                    </div>
                    <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-isa-500 transition-colors flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── CERT TICKER ─────────────────────────────────────────────── */}
      <div className="bg-isa-500 overflow-hidden py-2.5">
        <div className="cert-ticker-inner">
          {[...Array(2)].map((_, outer) => (
            <div key={outer} className="flex items-center gap-0">
              {[
                'ISO 9001:2015 Certified', 'API 6D Pipeline Valves', 'WRAS Potable Water Approved',
                'SABS 664 Gate Valves', 'ISO 5208 Grade A Zero Leakage', '35+ Years Engineering Experience',
                'South Africa & Africa-Wide Supply', 'Mining · Water · Oil & Gas · Chemical',
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-6 px-6 text-white text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. INDUSTRY SELECTOR ────────────────────────────────────── */}
      <IndustrySelector />

      {/* ── 3. STATS ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── 4. PRODUCTS ─────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealProducts} className="reveal flex items-end justify-between mb-14">
            <div>
              <span className="section-label">Product Range</span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Flow Control Solutions
              </h2>
              <p className="text-slate-500 text-lg mt-2">Purpose-engineered for your application</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-isa-600 hover:text-isa-700 transition-colors">
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATS.map((cat, i) => (
              <Link key={cat.slug} to={`/products/${cat.slug}`}
                className={`card-shimmer reveal reveal-delay-${Math.min(i+1,5)} bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-200 hover:border-isa-300 group hover:-translate-y-2 flex flex-col`}>
                <div className="h-56 bg-gradient-to-b from-slate-50 to-white flex items-center justify-center overflow-hidden px-6 pt-6 pb-2">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain group-hover:scale-108 transition-transform duration-500 drop-shadow-sm"
                    style={{ '--tw-scale-x': '1', '--tw-scale-y': '1' } as React.CSSProperties}
                  />
                </div>
                {/* Orange accent bar — animated width on hover */}
                <div className="h-0.5 bg-gradient-to-r from-isa-500/30 via-isa-500 to-isa-500/30 mx-0 group-hover:mx-0 transition-all" />
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-isa-700 transition-colors">{cat.title}</h3>
                  <p className="text-isa-600 text-sm font-semibold mb-1">{cat.sub}</p>
                  <p className="text-slate-400 text-xs mb-5 flex-1">{cat.spec}</p>
                  <span className="flex items-center gap-1 text-sm font-semibold text-isa-600 group-hover:gap-2.5 transition-all duration-200">
                    View Specifications <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-bold text-isa-600">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 5. INSTALLATION SHOWCASE ────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[380px] sm:h-[460px]">
          <img
            src="/images/branding/isa-water-treatment.png"
            alt="ISA valves installed in water treatment facility"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/92 via-slate-900/70 to-slate-900/20" />
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-isa-400 block mb-4">Field Proven</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">
                  Reliable Flow.<br />Clean Results.
                </h2>
                <p className="text-slate-300 text-base mb-6 leading-relaxed">
                  ISA valves are installed across water treatment plants, mining circuits and industrial facilities throughout Africa — engineered to perform in the toughest conditions.
                </p>
                <Link to="/about"
                  className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm shadow-lg shadow-isa-500/30">
                  View Our Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. CAPABILITIES ─────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealCapabilities} className="reveal text-center mb-14">
            <span className="section-label">Engineering Excellence</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Why Engineers Specify ISA
            </h2>
            <p className="text-slate-500 text-lg mt-3 max-w-xl mx-auto">
              From specification to commissioning — full engineering support at every stage.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {CAPABILITIES.map((cap, i) => (
              <div key={cap.title}
                className={`reveal reveal-delay-${i+1} rounded-2xl p-7 bg-white border border-slate-200 hover:border-isa-200 hover:shadow-xl transition-all duration-300 border-l-4 border-l-isa-500 group hover:-translate-y-1`}>
                <div className="w-12 h-12 rounded-xl bg-isa-50 border border-isa-100 flex items-center justify-center mb-5 group-hover:bg-isa-100 transition-colors">
                  <cap.Icon className="w-6 h-6 text-isa-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2 group-hover:text-isa-700 transition-colors">{cap.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 pt-8 border-t border-slate-100 text-center">
            {['35+ Years', '500+ Projects', '8+ Countries', 'ISO 9001:2015'].map(m => (
              <span key={m} className="text-sm font-bold text-slate-500 uppercase tracking-widest">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealProjects} className="reveal text-center mb-14">
            <span className="section-label">Recent Installations</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Featured Projects
            </h2>
            <p className="text-slate-500 text-lg mt-3">Real installations across Africa</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map((p, i) => (
              <div key={p.title}
                className={`reveal reveal-delay-${i+1} bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 border border-slate-200 hover:border-isa-300 hover:-translate-y-0.5`}>
                <div className="flex items-start gap-4">
                  <div className="w-1 h-full min-h-[80px] rounded-full bg-isa-500 flex-shrink-0 self-stretch" />
                  <div>
                    <span className="inline-block text-xs font-bold text-isa-700 bg-isa-50 border border-isa-100 px-2.5 py-0.5 rounded-full mb-3">{p.tag}</span>
                    <h3 className="font-bold text-slate-900 text-base mb-1">{p.title}</h3>
                    <p className="text-sm font-semibold text-slate-600 mb-2">{p.sub}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CERTIFICATIONS ───────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealCerts} className="reveal text-center mb-12">
            <span className="section-label">Quality Assurance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              International Certifications
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTS.map((c, i) => (
              <div key={c.code}
                className={`reveal reveal-delay-${i+1} bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center hover:border-isa-400 hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300 group`}>
                <div className="w-10 h-10 rounded-xl bg-isa-500/10 border border-isa-500/20 flex items-center justify-center mx-auto mb-3 group-hover:bg-isa-100 transition-colors">
                  <Shield className="w-5 h-5 text-isa-500" />
                </div>
                <div className="font-bold text-slate-900 text-sm">{c.code}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. TECHNICAL RESOURCES ──────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealResources} className="reveal text-center mb-14">
            <span className="section-label">Technical Library</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Engineering Resources
            </h2>
            <p className="text-slate-500 text-lg mt-3">Data sheets, selection guides and calculators</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {RESOURCES.map((r, i) => (
              <Link key={r.title} to={r.to}
                className={`reveal reveal-delay-${Math.min(i+1,5)} bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:border-isa-300 hover:shadow-lg transition-all duration-200 group hover:-translate-y-0.5`}>
                <div className="w-10 h-10 rounded-xl bg-isa-50 border border-isa-100 flex items-center justify-center flex-shrink-0 group-hover:bg-isa-100 transition-colors">
                  <r.Icon className="w-5 h-5 text-isa-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm group-hover:text-isa-700 transition-colors">{r.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{r.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-isa-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-isa-500 relative overflow-hidden">
        {/* Animated blob overlays on orange */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none blob-1"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', top: '-20%', left: '-5%' }} />
        <div className="absolute pointer-events-none blob-2"
          style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, transparent 70%)', width: '500px', height: '500px', bottom: '-20%', right: '-5%', borderRadius: '50%' }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-orange-100 block mb-5">
            ISO 9001:2015 · API 6D · WRAS · SABS 664 · ISO 5208
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Ready to Specify<br />Your Next Project?
          </h2>
          <p className="text-orange-100 text-lg mb-12 max-w-xl mx-auto">
            Expert valve sizing, product selection and engineering support from ISA Valve Solutions. ISO certified. Africa proven.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link to="/rfq"
              className="inline-flex items-center gap-2 bg-white hover:bg-orange-50 text-isa-600 font-bold px-8 py-4 rounded-xl transition-colors duration-150 text-base shadow-xl">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border-2 border-white/30 hover:border-white/80 hover:bg-white/10 transition-all duration-150">
              View Products
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-base text-white border-2 border-white/30 hover:border-white/80 hover:bg-white/10 transition-all duration-150">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-orange-100">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +27 060 688 5648</span>
            <a href="mailto:isa-valve@outlook.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail className="w-3.5 h-3.5" /> isa-valve@outlook.com
            </a>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> South Africa</span>
          </div>
        </div>
      </section>

      <ProductModal product={modal} onClose={() => setModal(null)} />
    </div>
  )
}

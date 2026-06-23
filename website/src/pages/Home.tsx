import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Shield,
  HardHat, Droplets, Flame, FlaskConical, Building2, FileText,
  Wrench, Award, Truck, Phone, Mail, MapPin,
  Download, Calculator, BookOpen, Pickaxe, Waves, Factory,
} from 'lucide-react'
import { WhatsAppIcon, WA_QUOTE_URL } from '../components/WhatsAppButton'
import type { Product } from '../types'
import ProductModal from '../components/ProductModal'
import ValveCutaway from '../components/ValveCutaway'

/* ── Scroll reveal hook ───────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.classList.add('revealed')
        // Cascade to all .reveal descendants in the same section so cards animate in
        el.closest('section')?.querySelectorAll('.reveal').forEach(c => c.classList.add('revealed'))
        obs.disconnect()
      }
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
  { title: 'ISA DXST™ Slurry KGV',      sub: '466% longer service life', spec: 'DN50–DN600 · Mining grade',   slug: 'dxst-kgv',        img: '/images/products/dxst-kgv-slurry.png' },
  { title: 'ISA Titan™ Ball Valve',      sub: 'API 6D certified',         spec: 'DN15–DN600 · Full bore',      slug: 'ball-valve',       img: '/images/products/ball-valve-flanged-ss.jpg' },
  { title: 'ISA Hydra™ Butterfly Valve', sub: 'WRAS approved',            spec: 'DN50–DN4000 · Triple offset', slug: 'butterfly-valve',  img: '/images/products/butterfly-valve-clean.png' },
  { title: 'ISA Core™ Gate Valve',       sub: 'SABS 664 certified',       spec: 'DN50–DN1000 · OS&Y',          slug: 'gate-valve',       img: '/images/products/gate-valve-clean.jpg' },
  { title: 'ISA Shield™ Pinch Valve',    sub: 'ISO 5208 Grade A',         spec: 'DN25–DN400 · 4 sleeve types', slug: 'pinch-valve',      img: '/images/products/pinch-valve-orange.jpg' },
  { title: 'ISA ProSeal™ Knife Gate',    sub: 'Ceramic-lined option',     spec: 'DN50–DN600 · Wafer/Lug',      slug: 'knife-gate-valve', img: '/images/products/knife-gate-valve-mining-slurry.png' },
]

const INDUSTRY_TABS = [
  { name: 'Mining',             Icon: HardHat,      desc: 'Ceramic-lined and hard-wearing valves for slurry, tailings and concentrate transfer in abrasive mining circuits.',  to: '/industries/mining' },
  { name: 'Water Treatment',    Icon: Droplets,     desc: 'WRAS-approved butterfly and gate valves for municipal supply, desalination and water distribution infrastructure.', to: '/industries/water-treatment' },
  { name: 'Oil & Gas',          Icon: Flame,        desc: 'API 6D certified ball and gate valves for upstream, midstream and pipeline applications — fugitive emission rated.', to: '/industries/oil-gas' },
  { name: 'Chemical Processing',Icon: FlaskConical, desc: 'Corrosion-resistant alloys and full-bore lining options for aggressive chemical and petrochemical media.',           to: '/industries/chemical' },
  { name: 'Municipal',          Icon: Building2,    desc: 'SABS 664-certified gate and butterfly valves for potable water distribution networks and wastewater systems.',       to: '/industries' },
  { name: 'Pulp & Paper',       Icon: FileText,     desc: 'Pinch valves and knife gate valves engineered for fibrous, abrasive pulp slurry and paper-making applications.',    to: '/industries/pulp-paper' },
]

const TESTIMONIALS = [
  {
    quote: "ISA's DXST valve transformed our tailings circuit. We went from quarterly sleeve replacements to annual maintenance cycles — a measurable 466% improvement in service life.",
    name: 'Plant Manager',
    company: 'Platinum Mining Operation, Limpopo',
    industry: 'Mining',
    initials: 'PM',
  },
  {
    quote: "Our DN800 butterfly valve order arrived spec-certified and ready to install within 3 weeks. Other suppliers quoted 8 weeks. ISA delivered when it mattered.",
    name: 'Project Engineer',
    company: 'Municipal Water Authority, Gauteng',
    industry: 'Water',
    initials: 'PE',
  },
  {
    quote: "ISA sized our entire control valve package in 48 hours with full engineering documentation. On-site within schedule — exactly what critical infrastructure projects require.",
    name: 'Senior Site Engineer',
    company: 'Chemical Processing Plant, KZN',
    industry: 'Chemical',
    initials: 'SE',
  },
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

const SPOTLIGHT = [
  {
    title: 'Control Valves',
    subtitle: 'PRECISION CONTROL · PURE PERFORMANCE',
    tag: 'Municipal Waterworks',
    img: '/images/featured/control-valve-waterworks.png',
    glowRgb: '0, 102, 204',
    slug: 'ball-valve',
  },
  {
    title: 'ISA Pinch Valves',
    subtitle: 'SIMPLE · RELIABLE · BUILT TO PERFORM',
    tag: 'Mining · Chemical · Slurry',
    img: '/images/featured/pinch-valve-lineup.png',
    glowRgb: '249, 115, 22',
    slug: 'pinch-valve',
  },
  {
    title: 'Slurry Pinch Knife Gate',
    subtitle: 'BUILT TO CUT · BUILT TO LAST',
    tag: 'ISO 5208 Grade A · Zero Leakage',
    img: '/images/featured/slurry-knife-gate-valve.png',
    glowRgb: '239, 68, 68',
    slug: 'knife-gate-valve',
  },
]

const INDUSTRY_SHOWCASE = [
  {
    name: 'Mining & Minerals',
    Icon: Pickaxe,
    subtitle: 'Engineered for Abrasion',
    img: '/images/featured/industry-mining.png',
    products: ['DXST™ Slurry KGV', 'Pinch Valves', 'Slurry Samplers', 'Knife Gate Valves'],
    desc: 'Zero-leakage slurry isolation, tailings and concentrate transfer — built for abrasive mining circuits across Africa.',
    to: '/industries/mining',
    glowCss: 'rgba(217,119,6,0.25)',
    textCls: 'text-amber-400',
    tagCls: 'bg-amber-500/10 border-amber-500/30 text-amber-300',
    accentCls: 'bg-amber-500',
  },
  {
    name: 'Water & Waterworks',
    Icon: Waves,
    subtitle: 'WRAS Approved Flow Control',
    img: '/images/featured/industry-waterworks.png',
    products: ['Control Valves', 'Butterfly Valves', 'Gate Valves', 'Pressure Reducing'],
    desc: 'WRAS-compliant butterfly and gate valves for municipal supply, pressure management and distribution networks.',
    to: '/industries/water-treatment',
    glowCss: 'rgba(0,102,204,0.25)',
    textCls: 'text-blue-400',
    tagCls: 'bg-blue-500/10 border-blue-500/30 text-blue-300',
    accentCls: 'bg-blue-500',
  },
  {
    name: 'Oil, Gas & Chemical',
    Icon: Factory,
    subtitle: 'API 6D · ISO 5208 Grade A',
    img: '/images/featured/industry-refinery.png',
    products: ['Ball Valves', 'Actuated Packages', 'Needle Valves', 'Instrumentation'],
    desc: 'Fugitive-emission-rated ball and gate valves, full actuated packages and instrumentation for critical process control.',
    to: '/industries/oil-gas',
    glowCss: 'rgba(249,115,22,0.22)',
    textCls: 'text-isa-400',
    tagCls: 'bg-isa-500/10 border-isa-500/30 text-isa-300',
    accentCls: 'bg-isa-500',
  },
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

/* ── Spotlight Products (dark, lit product showcase) ───────────── */
function SpotlightProducts() {
  return (
    <section className="bg-slate-950 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-isa-400 uppercase tracking-widest block mb-3">ISA Signature Products</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Engineered for Africa's<br />
            <span className="text-isa-400">Toughest Conditions</span>
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
            Purpose-built product lines with decades of field-proven performance.
          </p>
        </div>

        {/* Top 3 spotlight cards */}
        <div className="grid lg:grid-cols-3 gap-5 mb-5">
          {SPOTLIGHT.map((item) => (
            <Link key={item.slug} to={`/products/${item.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-slate-800 hover:border-slate-600 transition-all duration-500 flex flex-col"
              style={{ background: 'linear-gradient(160deg, #1e293b 0%, #0f172a 100%)' }}>

              {/* Spotlight glow — top-center radial on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 50% 20%, rgba(${item.glowRgb},0.22) 0%, transparent 65%)` }} />

              {/* Bottom warm glow on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(to top, rgba(${item.glowRgb},0.14), transparent)` }} />

              {/* Product flyer image */}
              <div className="relative overflow-hidden" style={{ height: '240px' }}>
                <img src={item.img} alt={item.title}
                  className="w-full h-full object-cover object-top group-hover:scale-[1.04] transition-transform duration-700" />
                {/* Subtle dark vignette at bottom to blend into card */}
                <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #1e293b, transparent)' }} />
              </div>

              {/* Text content */}
              <div className="relative z-10 p-6 flex flex-col flex-1">
                <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-isa-400 border border-isa-800 bg-isa-950/60 px-2.5 py-1 rounded-full mb-3 w-fit">
                  {item.tag}
                </span>
                <h3 className="text-xl font-extrabold text-white mb-1 group-hover:text-isa-300 transition-colors duration-300">{item.title}</h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">{item.subtitle}</p>
                <span className="mt-auto flex items-center gap-2 text-sm font-bold text-isa-500 group-hover:text-isa-400 group-hover:gap-3 transition-all duration-200">
                  View Specifications <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              {/* Glowing border on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: `inset 0 0 0 1px rgba(${item.glowRgb},0.35), 0 8px 40px rgba(${item.glowRgb},0.12)` }} />
            </Link>
          ))}
        </div>

        {/* Bottom 2 horizontal cards */}
        <div className="grid lg:grid-cols-2 gap-5">
          {[
            { title: 'Slurry Sampler', sub: 'Precise · Reliable · Representative. Built for abrasive slurry sampling.', img: '/images/featured/slurry-sampler.png', slug: 'dxst-kgv', glowRgb: '239,68,68' },
            { title: 'Complete Slurry Sampling System', sub: 'Smart Sampling · Better Data · Better Decisions. For thickener tanks & process lines.', img: '/images/featured/slurry-sampling-system.png', slug: 'dxst-kgv', glowRgb: '249,115,22' },
          ].map(item => (
            <Link key={item.title} to={`/products/${item.slug}`}
              className="group flex overflow-hidden rounded-2xl border border-slate-800 hover:border-slate-600 transition-all duration-400"
              style={{ background: 'linear-gradient(to right, #1e293b, #0f172a)' }}>
              <div className="w-44 sm:w-56 flex-shrink-0 overflow-hidden relative">
                <img src={item.img} alt={item.title}
                  className="w-full h-full object-cover object-left group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none"
                  style={{ background: 'linear-gradient(to right, transparent, #1e293b)' }} />
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-center">
                <h3 className="font-extrabold text-white text-sm sm:text-base mb-1.5 group-hover:text-isa-300 transition-colors leading-snug">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-3">{item.sub}</p>
                <span className="flex items-center gap-1.5 text-xs font-bold text-isa-500 group-hover:gap-2.5 transition-all duration-200">
                  View Details <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ── Industries We Serve (hover reveal popup cards) ────────────── */
function IndustriesShowcase() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="bg-slate-900 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-bold text-isa-400 uppercase tracking-widest block mb-3">Markets</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Industries We Serve
          </h2>
          <p className="text-slate-400 text-lg mt-4 max-w-xl mx-auto">
            Hover each sector to discover the ISA solutions specified for that application.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {INDUSTRY_SHOWCASE.map((ind, idx) => {
            const Icon = ind.Icon
            const isHovered = hovered === idx
            return (
              <div key={ind.name}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className="relative rounded-2xl overflow-hidden border border-slate-800 transition-all duration-500 cursor-pointer"
                style={{
                  height: '420px',
                  boxShadow: isHovered ? `0 0 60px ${ind.glowCss}` : 'none',
                  borderColor: isHovered ? 'rgba(255,255,255,0.15)' : undefined,
                }}>

                {/* Background image */}
                <img src={ind.img} alt={ind.name}
                  className="absolute inset-0 w-full h-full object-cover object-right sm:object-center transition-transform duration-700"
                  style={{ transform: isHovered ? 'scale(1.06)' : 'scale(1)' }} />

                {/* Dark overlay */}
                <div className="absolute inset-0 bg-slate-900 transition-opacity duration-500"
                  style={{ opacity: isHovered ? 0.6 : 0.72 }} />

                {/* Left accent line */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${ind.accentCls} transition-opacity duration-300`}
                  style={{ opacity: isHovered ? 1 : 0 }} />

                {/* DEFAULT: Icon + title at bottom */}
                <div className="absolute inset-0 flex flex-col justify-end p-7 transition-all duration-400"
                  style={{ opacity: isHovered ? 0 : 1, transform: isHovered ? 'translateY(12px)' : 'translateY(0)' }}>
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-white leading-tight mb-1">{ind.name}</h3>
                  <p className={`text-sm font-semibold ${ind.textCls}`}>{ind.subtitle}</p>
                  <p className="text-slate-500 text-xs mt-3 flex items-center gap-1.5">
                    Hover to explore <ArrowRight className="w-3 h-3" />
                  </p>
                </div>

                {/* HOVER: slide-up popup panel */}
                <div className="absolute inset-x-0 bottom-0 transition-all duration-400"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(24px)',
                    pointerEvents: isHovered ? 'auto' : 'none',
                    background: 'rgba(15,23,42,0.96)',
                    backdropFilter: 'blur(12px)',
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    padding: '24px',
                  }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className={`w-4 h-4 ${ind.textCls}`} />
                    <h3 className={`text-base font-extrabold ${ind.textCls}`}>{ind.name}</h3>
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">{ind.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {ind.products.map(p => (
                      <span key={p} className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${ind.tagCls}`}>
                        {p}
                      </span>
                    ))}
                  </div>
                  <Link to={ind.to}
                    className={`inline-flex items-center gap-1.5 text-sm font-bold ${ind.textCls} hover:text-white transition-colors duration-200`}>
                    Explore Solutions <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [modal, setModal] = useState<Product | null>(null)

  const revealProducts     = useReveal()
  const revealCutaway      = useReveal()
  const revealCapabilities = useReveal()
  const revealProjects     = useReveal()
  const revealResources    = useReveal()
  const revealCerts        = useReveal()
  const revealSpotlight    = useReveal()
  const revealIndustries   = useReveal()

  return (
    <div className="bg-white">

      {/* ── 1. HERO — OEM catalogue style ─────────────────────────── */}
      <section className="relative overflow-hidden bg-white">
        {/* ISA orange top accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 z-10"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        {/* Subtle background gradient */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 55%, #eff6ff 100%)' }} />
        {/* Orange glow — bottom-left atmosphere */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.07) 0%, transparent 70%)' }} />
        {/* Blue glow — right atmosphere */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 100% 0%, rgba(0,102,204,0.06) 0%, transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Text content */}
            <div className="order-2 lg:order-1">
              <div className="hero-badge-enter inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold text-white mb-8 bg-isa-500 shadow-lg shadow-isa-500/30">
                <Shield className="w-3 h-3" /> ISO 9001:2015 Certified · South Africa
              </div>

              <h1 className="tracking-tight leading-[0.96] mb-5">
                <span className="hero-title-enter block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900">
                  Precision
                </span>
                <span className="hero-title-enter block text-5xl sm:text-6xl lg:text-7xl font-extrabold">
                  <span className="text-isa-500">Valve</span>{' '}
                  <span className="text-slate-900">Solutions</span>
                </span>
                <span className="hero-title-enter block text-5xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900">
                  for Africa
                </span>
              </h1>

              <p className="hero-sub-enter text-lg sm:text-xl text-slate-500 max-w-lg mb-3 leading-relaxed">
                35 years supplying specification-grade industrial valves. Mining, water, oil &amp; gas and chemical industries trust ISA.
              </p>
              <p className="hero-sub-enter text-sm text-slate-400 max-w-lg mb-8 font-medium tracking-wide">
                Pressure Reducing · Pressure Sustaining · Flow Control · Level Control · Surge Protection
              </p>

              {/* Animated spec chips */}
              <div className="hero-certs-enter flex flex-wrap gap-2 mb-10">
                {[
                  'DN15–DN4000', 'PN6–PN100', 'ISO 9001:2015',
                  'API 6D', 'WRAS Approved', 'SABS 664',
                  'ISO 5208 Grd A', '35+ Years',
                ].map((chip, i) => (
                  <span key={chip}
                    style={{ animationDelay: `${0.4 + i * 0.06}s` }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold text-slate-600 bg-white border border-slate-200 shadow-sm hover:border-isa-300 hover:text-isa-600 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-isa-500 flex-shrink-0" />
                    {chip}
                  </span>
                ))}
              </div>

              <div className="hero-cta-enter flex flex-wrap gap-3">
                <Link to="/rfq"
                  className="btn-pulse inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-8 py-4 rounded-xl transition-colors text-base shadow-lg shadow-isa-500/30">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/catalog"
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold text-base text-slate-700 border-2 border-slate-200 hover:border-isa-400 hover:text-isa-600 bg-white transition-all shadow-sm">
                  <Download className="w-4 h-4" /> Product Catalog
                </Link>
              </div>
            </div>

            {/* RIGHT — Large valve render + floating glass cards */}
            <div className="order-1 lg:order-2 relative flex items-center justify-center min-h-[340px] sm:min-h-[480px]">
              {/* Blue ambient glow behind valve */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-80 h-80 rounded-full opacity-20"
                  style={{ background: 'radial-gradient(circle, rgba(0,102,204,0.5) 0%, transparent 70%)' }} />
              </div>

              {/* Hero valve image — butterfly valve, large */}
              <img
                src="/images/products/butterfly-valve-clean.png"
                alt="ISA Hydra™ Triple Offset Butterfly Valve DN4000"
                className="hero-title-enter relative z-10 w-72 sm:w-96 lg:w-[420px] h-auto"
                style={{ filter: 'drop-shadow(0 24px 48px rgba(0,102,204,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.12))' }}
              />

              {/* Glass spec card — bottom-left, overlapping valve */}
              <div className="absolute bottom-0 left-0 sm:left-4 z-20 w-56 sm:w-64 rounded-2xl p-4 sm:p-5"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
                }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1 h-10 rounded-full bg-isa-500 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Featured</p>
                    <p className="text-sm font-bold text-slate-900 leading-tight">ISA Hydra™<br />Triple Offset Butterfly</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3">
                  {[
                    { label: 'Size', value: 'DN50–DN4000' },
                    { label: 'Pressure', value: 'PN10–PN25' },
                    { label: 'Body', value: 'Ductile Iron' },
                    { label: 'Approval', value: 'WRAS' },
                  ].map(s => (
                    <div key={s.label}>
                      <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">{s.label}</p>
                      <p className="text-xs font-bold text-slate-800">{s.value}</p>
                    </div>
                  ))}
                </div>
                <Link to="/products/butterfly-valve"
                  className="flex items-center gap-1 text-xs font-bold text-isa-600 hover:text-isa-700 transition-colors">
                  Full Specifications <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* ISO cert badge — top-right */}
              <div className="absolute top-2 right-0 z-20 px-3.5 py-2.5 rounded-2xl text-center"
                style={{
                  background: 'rgba(255,255,255,0.88)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                }}>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Certified</p>
                <p className="text-base font-black text-isa-500 leading-none mt-0.5">ISO 9001</p>
                <p className="text-[9px] font-semibold text-slate-400 mt-0.5">:2015</p>
              </div>

              {/* 35 years badge — right side */}
              <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20 w-16 h-16 rounded-full flex flex-col items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2040 100%)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.20)',
                }}>
                <p className="text-xl font-black text-isa-400 leading-none">35</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-wider text-center leading-tight">Years</p>
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

      {/* ── BANNER ──────────────────────────────────────────────────── */}
      <section className="w-full overflow-hidden bg-white border-b border-slate-100">
        <img
          src="/images/isa-banner.png"
          alt="ISA Valve Solutions — Engineered for Precision & Performance"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* ── 2. INDUSTRY SELECTOR ────────────────────────────────────── */}
      <IndustrySelector />

      {/* ── 3. STATS ────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-100">
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── 4. PRODUCTS — OEM catalogue cards ───────────────────────── */}
      <section className="bg-slate-50 py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealProducts} className="reveal flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-0.5 bg-isa-500" />
                <span className="text-xs font-bold text-isa-600 uppercase tracking-widest">Product Range</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Flow Control Solutions
              </h2>
              <p className="text-slate-500 text-lg mt-2 max-w-xl">
                Purpose-engineered for mining, water, oil &amp; gas and chemical applications
              </p>
            </div>
            <Link to="/products"
              className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm text-slate-700 border-2 border-slate-200 hover:border-isa-400 hover:text-isa-600 bg-white transition-all">
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATS.map((cat, i) => (
              <Link key={cat.slug} to={`/products/${cat.slug}`}
                className={`reveal reveal-delay-${Math.min(i+1,5)} group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-isa-300 hover:-translate-y-1.5 flex flex-col`}>

                {/* Navy top accent — animated to isa-orange on hover */}
                <div className="h-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 group-hover:from-isa-500 group-hover:via-isa-400 group-hover:to-isa-500 transition-all duration-500" />

                {/* Product image — clean, on light gradient bg */}
                <div className="relative h-60 flex items-center justify-center overflow-hidden px-8 py-6"
                  style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)' }}>
                  {/* Blue ambient glow on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,102,204,0.07) 0%, transparent 70%)' }} />
                  <img
                    src={cat.img}
                    alt={cat.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-lg relative z-10"
                  />
                  {/* Spec badge */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold text-isa-700 bg-isa-50 border border-isa-200 px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                    {cat.sub}
                  </span>
                  {/* Bestseller ribbon for DXST */}
                  {cat.slug === 'dxst-kgv' && (
                    <div className="absolute top-0 left-0 z-30 bg-isa-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-br-xl shadow-sm">
                      Mining #1
                    </div>
                  )}
                </div>

                {/* Text */}
                <div className="p-6 flex-1 flex flex-col border-t border-slate-100">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-1 h-full min-h-[40px] rounded-full bg-isa-500 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-base group-hover:text-isa-700 transition-colors">{cat.title}</h3>
                      <p className="text-slate-400 text-xs mt-0.5">{cat.spec}</p>
                    </div>
                  </div>
                  <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold text-isa-600 group-hover:gap-3 transition-all duration-200 pt-3 border-t border-slate-100">
                    View Specifications <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4b. SPOTLIGHT PRODUCTS ──────────────────────────────────── */}
      <div ref={revealSpotlight} className="reveal">
        <SpotlightProducts />
      </div>

      {/* ── 4c. INDUSTRIES WE SERVE ─────────────────────────────────── */}
      <div ref={revealIndustries} className="reveal">
        <IndustriesShowcase />
      </div>

      {/* ── 4d. LIVE VALVE CUTAWAY ──────────────────────────────────── */}
      <section className="bg-white py-24 border-t border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={revealCutaway} className="reveal grid lg:grid-cols-12 gap-12 items-center">
            {/* Copy */}
            <div className="lg:col-span-4">
              <span className="section-label inline-flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-isa-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-isa-500" />
                </span>
                Live · In Operation
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
                See It Work
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Watch an ISA DXST™ knife-gate valve in action — abrasive slurry streams through the open bore, the
                hardened gate strokes fully shut on its rising stem, then re-opens. Engineered for the most punishing
                mining circuits in Africa.
              </p>
              <ul className="space-y-2.5 mb-8">
                {[
                  'Hardened gate — 466% longer service life',
                  'Field-replaceable seat lining',
                  'Rising stem with visual position indicator',
                  'Full-bore, unobstructed slurry flow',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-isa-500 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link to="/products/dxst-kgv"
                className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-7 py-3.5 rounded-xl transition-colors text-sm shadow-lg shadow-isa-500/30">
                Explore the DXST™ KGV <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {/* Valve in action video */}
            <div className="lg:col-span-8">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-slate-900" style={{ aspectRatio: '16/9' }}>
                <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  ISA DXST™ In Action
                </div>
                <video
                  src="/videos/valve-in-action.mp4"
                  autoPlay muted loop playsInline preload="metadata"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. INDUSTRIAL PLANT SHOWCASE ─────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="relative h-[400px] sm:h-[500px]">
          {/* ISA hero reel — autoplay muted loop, falls back to poster image */}
          <video
            src="/videos/industrial-plant.mp4"
            poster="/images/branded/isa-bg-valves-row.jpg"
            autoPlay muted loop playsInline preload="metadata"
            className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
          />
          {/* Strong left overlay for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/75 to-slate-900/40" />
          {/* ISA badge */}
          <div className="absolute top-5 right-5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/85 text-white text-[10px] font-bold uppercase tracking-widest z-10">
            <span className="w-1.5 h-1.5 rounded-full bg-isa-500 animate-pulse" />
            ISA Installed
          </div>
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-lg">
                <span className="text-xs font-bold uppercase tracking-widest text-isa-400 block mb-4">In Service</span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-[1.05] mb-4">
                  Specified Into<br />Plants Across Africa
                </h2>
                <p className="text-slate-200 text-base mb-6 leading-relaxed">
                  From refineries and water treatment works to mining and power plants — ISA valves keep process flow moving in the toughest industrial environments on the continent.
                </p>
                <Link to="/projects"
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

      {/* ── 7b. TESTIMONIALS ────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Client Feedback</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Trusted by Engineers Across Africa
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col hover:border-isa-300 hover:shadow-lg transition-all duration-300">
                <div className="text-5xl font-serif leading-none text-isa-300 mb-2 select-none">&ldquo;</div>
                <p className="text-sm text-slate-600 leading-relaxed flex-1 italic mb-6">{t.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-9 h-9 rounded-full bg-isa-500 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-black text-white">{t.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 truncate">{t.name}</p>
                    <p className="text-xs text-slate-500 truncate">{t.company}</p>
                  </div>
                  <span className="flex-shrink-0 text-[10px] font-black text-isa-700 bg-isa-50 border border-isa-200 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {t.industry}
                  </span>
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
        {/* ISA branded refinery photo — subtle bg under orange */}
        <img
          src="/images/branded/isa-hero-refinery.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center opacity-[0.08] pointer-events-none"
        />
        {/* Animated blob overlays on orange */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full pointer-events-none blob-1"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)', top: '-20%', left: '-5%' }} />
        <div className="absolute pointer-events-none blob-2"
          style={{ background: 'radial-gradient(circle, rgba(0,0,0,0.07) 0%, transparent 70%)', width: '500px', height: '500px', bottom: '-20%', right: '-5%', borderRadius: '50%' }} />
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 mb-5">
            {['ISO 9001:2015', 'API 6D', 'WRAS', 'SABS 664', 'ISO 5208'].map(c => (
              <span key={c} className="text-xs font-bold uppercase tracking-widest text-orange-100">{c}</span>
            ))}
          </div>
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
            <a href={WA_QUOTE_URL} target="_blank" rel="noopener noreferrer"
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

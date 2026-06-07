import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, CheckCircle, Zap, MapPin, Download, Phone, Star } from 'lucide-react'
import { products } from '../data/products'
import ProductModal from '../components/ProductModal'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'
import type { Product } from '../types'

/* ── Animated counter ─────────────────────────────────────────────── */
function StatCard({ target, suffix, prefix = '', label, sub }: {
  target: number; suffix?: string; prefix?: string; label: string; sub: string
}) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStarted(true) }, { threshold: 0.5 })
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
    <div ref={ref} className="text-center px-6 py-8 group">
      <div className="font-display text-5xl font-bold text-white mb-1 tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-sm font-bold text-blue-300 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xs text-slate-500">{sub}</div>
    </div>
  )
}

/* ── Pre-computed particles (deterministic — no Math.random) ────── */
const PARTICLES = Array.from({ length: 28 }, (_, i) => ({
  x: (i * 37 + 11) % 100,
  y: (i * 53 + 7) % 100,
  size: ((i * 19) % 3) + 1,
  blue: i % 3 !== 0,
  dur: 8 + (i * 11) % 10,
  del: (i * 7) % 9,
  cls: i % 2 === 0 ? 'float-p' : 'float-s',
}))

/* ── Data ───────────────────────────────────────────────────────── */
const STATS = [
  { target: 15, suffix: '+', label: 'Years Experience', sub: 'Proven engineering expertise' },
  { target: 500, suffix: '+', label: 'Projects Delivered', sub: 'Across multiple industries' },
  { target: 8, suffix: '+', label: 'Countries Served', sub: 'Africa and beyond' },
  { target: 24, suffix: '/7', label: 'Engineering Support', sub: 'Always available' },
]

const CERTS = [
  { code: 'ISO 9001', name: 'Quality Management', color: '#006DFF' },
  { code: 'API 6D', name: 'Pipeline Valves', color: '#10b981' },
  { code: 'ISO 5208', name: 'Grade A Zero Leak', color: '#ef4444' },
  { code: 'WRAS', name: 'Potable Water', color: '#8b5cf6' },
  { code: 'SABS 664', name: 'SA Gate Valves', color: '#f59e0b' },
]

const PRODUCT_CATS = [
  { title: 'ISA DXST™ Slurry KGV', sub: '466% longer life · Mining service', slug: 'dxst-kgv', color: '#FF6A00', icon: '🟠' },
  { title: 'ISA Shield™ Pinch Valve', sub: 'ISO 5208 Grade A · 4 sleeve types', slug: 'pinch-valve', color: '#ef4444', icon: '🔴' },
  { title: 'ISA ProSeal™ Knife Gate', sub: 'Slurry · Ceramic-lined · Wafer/Lug', slug: 'knife-gate-valve', color: '#f59e0b', icon: '🔪' },
  { title: 'ISA Titan™ Ball Valve', sub: 'DN15–DN600 · API 6D certified', slug: 'ball-valve', color: '#006DFF', icon: '🔵' },
  { title: 'ISA Hydra™ Butterfly Valve', sub: 'DN50–DN1200 · WRAS approved', slug: 'butterfly-valve', color: '#10b981', icon: '🦋' },
  { title: 'ISA Core™ Gate Valve', sub: 'DN50–DN1000 · SABS 664', slug: 'gate-valve', color: '#8b5cf6', icon: '🔩' },
]

const INDUSTRIES = [
  { name: 'Mining', icon: '⛏', desc: 'Slurry, tailings & process control' },
  { name: 'Water Treatment', icon: '💧', desc: 'Municipal & desalination' },
  { name: 'Oil & Gas', icon: '🛢', desc: 'API 6D upstream & midstream' },
  { name: 'Chemical', icon: '⚗️', desc: 'Corrosive & high-pressure media' },
  { name: 'Municipal', icon: '🏗', desc: 'Water networks, SABS certified' },
  { name: 'Power', icon: '⚡', desc: 'Steam, cooling & utility systems' },
  { name: 'Food & Beverage', icon: '🌾', desc: 'Sanitary, FDA-grade materials' },
  { name: 'Pulp & Paper', icon: '📄', desc: 'Fibrous, abrasion-resistant media' },
]

const PROJECTS = [
  {
    title: 'Konige Mine — Zambia',
    sub: 'Coriolis Mass Flow · Slurry Sampling System',
    desc: 'Audit-grade IFC installation for copper concentrate measurement with full fabrication, installation and commissioning protocols.',
    tag: 'Mining · Zambia',
    icon: '⛏',
  },
  {
    title: 'Municipal Water Network',
    sub: 'DN800 Butterfly Valves · WRAS Compliant',
    desc: 'WRAS-compliant butterfly valve installation for potable water distribution network. Delivered within 3 weeks of order.',
    tag: 'Water · South Africa',
    icon: '💧',
  },
  {
    title: 'Intelligent Slurry Sampling',
    sub: 'LSD-E · LMD Distributor · Siemens WinCC',
    desc: 'On-line mineral slurry sampling system for platinum group metals processing with full SCADA automation.',
    tag: 'Mining · PGM',
    icon: '⚗️',
  },
  {
    title: 'Control Valve Commissioning',
    sub: 'Hydraulic Control · Pressure Reducing',
    desc: 'Complete hydraulic control valve package — pressure reducing, sustaining, foot check and swing check valves for industrial process.',
    tag: 'Industrial · RSA',
    icon: '⚙️',
  },
]

/* Country dots on Africa: percentage positions within the container */
const AFRICA_DOTS = [
  { name: 'South Africa', x: 44, y: 80, primary: true },
  { name: 'Namibia', x: 30, y: 66, primary: false },
  { name: 'Botswana', x: 45, y: 68, primary: false },
  { name: 'Zimbabwe', x: 53, y: 60, primary: false },
  { name: 'Mozambique', x: 60, y: 63, primary: false },
  { name: 'Zambia', x: 49, y: 50, primary: false },
]

const HERO_PRODUCTS = [
  'Pressure Pipeline Sampler', 'Slurry DXST™', 'Control Valves',
  'Multi-Way Distributor', 'Pinch Valve Series', 'Gravity Flow Sampler',
  'Pressure Transmitters', 'Intelligent Sampling System',
]

const featuredSlugs = ['pinch-valve', 'dxst-kgv', 'knife-gate-valve', 'ball-valve']
const featuredProducts = featuredSlugs.map(s => products.find(p => p.slug === s)).filter(Boolean) as Product[]

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [modal, setModal] = useState<Product | null>(null)

  return (
    <div style={{ background: '#071B2E' }}>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #040e22 0%, #071B2E 40%, #0a2448 70%, #071B2E 100%)' }}>

        {/* Blueprint grid */}
        <div className="absolute inset-0 bg-grid opacity-40" />

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 70% 60% at 60% 50%, rgba(0,109,255,0.10) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 40% 50% at 80% 30%, rgba(255,138,0,0.05) 0%, transparent 60%)' }} />

        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {PARTICLES.map((p, i) => (
            <div key={i}
              className={`absolute rounded-full ${p.cls}`}
              style={{
                left: `${p.x}%`, top: `${p.y}%`,
                width: `${p.size}px`, height: `${p.size}px`,
                background: p.blue ? '#006DFF' : '#FF8A00',
                opacity: 0.25,
                '--dur': `${p.dur}s`, '--del': `${p.del}s`,
              } as React.CSSProperties} />
          ))}
        </div>

        {/* Horizontal scan line */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-1/3 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,109,255,0.5), transparent)', animation: 'scan-line 8s linear infinite' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 grid lg:grid-cols-2 gap-16 items-center w-full">

          {/* Left — headline */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300 mb-8"
              style={{ background: 'rgba(0,109,255,0.12)', border: '1px solid rgba(0,109,255,0.3)' }}>
              <Shield className="w-3 h-3" /> ISO 9001:2015 Certified · South Africa
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-6">
              YOUR PARTNER IN
              <span className="block mt-1" style={{ color: '#FF8A00' }}>VALVE</span>
              <span className="block" style={{ background: 'linear-gradient(90deg, #006DFF, #00B4FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>SOLUTIONS</span>
            </h1>

            <p className="text-slate-400 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Industrial Flow Control · Sampling Systems · Municipal Water · Mining · Oil & Gas · Automation
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/products" className="btn-primary">
                View Products <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/rfq" className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                Request Quote
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-emerald-400 transition-all hover:text-emerald-300"
                style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Cert badges */}
            <div className="flex flex-wrap gap-2">
              {CERTS.map(c => (
                <div key={c.code} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
                  <span className="text-xs font-bold text-white">{c.code}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating product pills */}
          <div className="hidden lg:block relative h-96">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-48 h-48 rounded-full opacity-10 dot-glow"
                style={{ background: 'radial-gradient(circle, rgba(0,109,255,0.4) 0%, transparent 70%)', border: '1px solid rgba(0,109,255,0.3)' }} />
            </div>
            {HERO_PRODUCTS.map((name, i) => {
              const angle = (i / HERO_PRODUCTS.length) * 360
              const r = 140 + (i % 2) * 30
              const x = 50 + (r / 2.5) * Math.cos((angle * Math.PI) / 180)
              const y = 50 + (r / 3.5) * Math.sin((angle * Math.PI) / 180)
              return (
                <div key={name}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 float-p whitespace-nowrap"
                  style={{
                    left: `${x}%`, top: `${y}%`,
                    '--dur': `${10 + i * 2}s`, '--del': `${i * 1.2}s`,
                  } as React.CSSProperties}>
                  <div className="px-3 py-1.5 rounded-full text-xs font-semibold text-blue-300"
                    style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.25)', backdropFilter: 'blur(8px)' }}>
                    {name}
                  </div>
                </div>
              )
            })}
            {/* Central ISA mark */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <div className="font-display text-2xl font-bold text-white">ISA</div>
              <div className="text-xs text-blue-400 mt-0.5 tracking-widest">VALVE SOLUTIONS</div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
          <div className="w-px h-8" style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,109,255,0.8))' }} />
          <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Scroll</div>
        </div>
      </section>

      {/* ── INDUSTRY TICKER ─────────────────────────────────────────── */}
      <div className="border-y py-3 overflow-hidden"
        style={{ background: 'rgba(0,0,0,0.3)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-8 px-6 flex-wrap justify-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap">Trusted in</span>
          {['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical Processing', 'Municipal Infrastructure', 'Power Generation', 'Pulp & Paper'].map((ind, i, arr) => (
            <span key={ind} className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-400">{ind}</span>
              {i < arr.length - 1 && <span className="text-slate-700">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── ANIMATED STATS ──────────────────────────────────────────── */}
      <section style={{ background: 'rgba(0,0,0,0.25)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0"
          style={{ divideColor: 'rgba(255,255,255,0.06)' }}>
          {STATS.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── CERTIFICATIONS ──────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eng-label mb-2">Quality Assurance</p>
            <h2 className="font-display text-3xl font-bold text-white">International Certifications</h2>
            <p className="text-muted text-sm mt-2 max-w-xl mx-auto">Every ISA valve is tested and certified to the highest international standards</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTS.map(c => (
              <div key={c.code} className="glass p-5 text-center rounded-2xl group hover:-translate-y-1 transition-all duration-200"
                style={{ border: `1px solid ${c.color}22` }}>
                <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: `${c.color}18`, border: `1px solid ${c.color}44` }}>
                  <Shield className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <div className="font-display font-bold text-white text-sm mb-1">{c.code}</div>
                <div className="text-xs text-muted">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ──────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eng-label mb-2">Product Range</p>
              <h2 className="font-display text-3xl font-bold text-white">Engineering Solutions</h2>
              <p className="text-muted text-sm mt-1">Purpose-engineered for your application</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PRODUCT_CATS.map(cat => (
              <Link key={cat.slug} to={`/products/${cat.slug}`}
                className="glass p-6 rounded-2xl group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                style={{ border: `1px solid ${cat.color}22` }}>
                {/* Glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at 30% 50%, ${cat.color}10 0%, transparent 70%)` }} />
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{cat.icon}</span>
                    <div className="w-2 h-2 rounded-full mt-1"
                      style={{ background: cat.color, boxShadow: `0 0 8px ${cat.color}` }} />
                  </div>
                  <h3 className="font-display font-bold text-white group-hover:text-blue-200 transition-colors mb-1 leading-snug">{cat.title}</h3>
                  <p className="text-xs text-muted mb-4">{cat.sub}</p>
                  <div className="flex items-center gap-1.5 text-xs font-semibold transition-colors group-hover:translate-x-1 duration-200"
                    style={{ color: cat.color }}>
                    View Specifications <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI SELECTOR CTA ─────────────────────────────────────────── */}
      <section className="py-12 mx-4 sm:mx-8 lg:mx-auto max-w-7xl">
        <div className="rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-6 relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(0,109,255,0.15) 0%, rgba(0,50,120,0.3) 100%)', border: '1px solid rgba(0,109,255,0.25)' }}>
          <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
          <div className="relative flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-5 h-5 text-accent-400" />
              <span className="text-sm font-bold text-accent-400 uppercase tracking-widest">AI Valve Selector</span>
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-2">Not sure which valve? Answer 4 questions.</h2>
            <p className="text-slate-400 text-sm">Get an AI-powered valve recommendation with engineering reasoning — no sales call required.</p>
          </div>
          <div className="relative flex-shrink-0">
            <Link to="/configure" className="btn-primary whitespace-nowrap">
              <Zap className="w-4 h-4" /> Start AI Selector
            </Link>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ──────────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eng-label mb-2">Industries Served</p>
            <h2 className="font-display text-3xl font-bold text-white">Sector Solutions</h2>
            <p className="text-muted text-sm mt-2">ISA valves engineered for the most demanding applications</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <Link key={ind.name} to={`/industries/${ind.name.toLowerCase().replace(/[^a-z]/g, '-').replace(/-+/g, '-')}`}
                className="glass-light p-5 rounded-2xl group hover:-translate-y-1 transition-all duration-200 text-center">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{ind.icon}</div>
                <div className="font-semibold text-white text-sm mb-1 group-hover:text-blue-300 transition-colors">{ind.name}</div>
                <div className="text-xs text-muted leading-snug">{ind.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ───────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eng-label mb-2">Case Studies</p>
              <h2 className="font-display text-3xl font-bold text-white">Featured Projects</h2>
              <p className="text-muted text-sm mt-1">Real installations across Africa</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map(p => (
              <div key={p.title} className="glass rounded-2xl overflow-hidden group hover:-translate-y-1 transition-all duration-300"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="h-2" style={{ background: 'linear-gradient(90deg, #006DFF, #FF8A00)' }} />
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl"
                      style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.2)' }}>
                      {p.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-xs font-bold text-blue-400 px-2 py-0.5 rounded-full"
                          style={{ background: 'rgba(0,109,255,0.1)' }}>{p.tag}</span>
                      </div>
                      <h3 className="font-display font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">{p.title}</h3>
                      <p className="text-xs font-semibold text-accent-400 mt-0.5 mb-3">{p.sub}</p>
                      <p className="text-sm text-muted leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/resources" className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors">
              View Technical Resources <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── AFRICA PRESENCE ─────────────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eng-label mb-2">African Footprint</p>
            <h2 className="font-display text-3xl font-bold text-white">Regional Presence</h2>
            <p className="text-muted text-sm mt-2">Engineering solutions delivered across Southern and Central Africa</p>
          </div>
          <div className="glass rounded-3xl p-8 sm:p-12 relative overflow-hidden"
            style={{ border: '1px solid rgba(0,109,255,0.15)' }}>
            {/* Background glow */}
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(0,109,255,0.05) 0%, transparent 70%)' }} />

            <div className="relative grid lg:grid-cols-2 gap-12 items-center">
              {/* Map visual — simplified SVG Africa silhouette with dots */}
              <div className="relative mx-auto w-72 h-80">
                {/* Simplified Africa outline */}
                <svg viewBox="0 0 200 260" className="absolute inset-0 w-full h-full opacity-10" fill="none">
                  <path d="M80 10 L130 5 L170 30 L190 70 L185 120 L175 150 L155 185 L130 220 L110 250 L90 250 L65 220 L45 185 L25 150 L15 110 L20 70 L40 35 Z"
                    stroke="#006DFF" strokeWidth="1.5" fill="rgba(0,109,255,0.05)" />
                </svg>

                {/* Country dots */}
                {AFRICA_DOTS.map(c => (
                  <div key={c.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}>
                    {/* Pulse ring */}
                    <div className="absolute inset-0 rounded-full animate-ping"
                      style={{
                        background: c.primary ? 'rgba(255,138,0,0.3)' : 'rgba(0,109,255,0.3)',
                        width: c.primary ? 24 : 16, height: c.primary ? 24 : 16,
                        top: c.primary ? -8 : -4, left: c.primary ? -8 : -4,
                        animationDuration: c.primary ? '1.5s' : '2.5s',
                      }} />
                    {/* Dot */}
                    <div className={`rounded-full ${c.primary ? 'dot-glow-o' : 'dot-glow'}`}
                      style={{
                        width: c.primary ? 10 : 7, height: c.primary ? 10 : 7,
                        background: c.primary ? '#FF8A00' : '#006DFF',
                      }} />
                    {/* Label */}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-0.5 rounded text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: 'rgba(8,29,66,0.95)', border: '1px solid rgba(0,109,255,0.3)' }}>
                      {c.name}
                    </div>
                  </div>
                ))}
              </div>

              {/* Country list */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  {AFRICA_DOTS.map(c => (
                    <div key={c.name} className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: c.primary ? '#FF8A00' : '#006DFF', boxShadow: `0 0 6px ${c.primary ? '#FF8A00' : '#006DFF'}` }} />
                      <div>
                        <div className="text-sm font-semibold text-white">{c.name}</div>
                        {c.primary && <div className="text-xs text-accent-400">Headquarters</div>}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 rounded-2xl"
                  style={{ background: 'rgba(0,109,255,0.06)', border: '1px solid rgba(0,109,255,0.15)' }}>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    From mining operations in Zambia to municipal water infrastructure in South Africa, ISA delivers engineered valve solutions across the region.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ────────────────────────────────────────────── */}
      <section className="py-16" style={{ background: 'rgba(0,0,0,0.2)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eng-label mb-2">Client Results</p>
            <h2 className="font-display text-3xl font-bold text-white">Proven Performance</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { industry: 'Copper Mining — Northern Cape', result: '72% maintenance downtime reduction. R1.2M annual parts saving after switching to ceramic-lined ISA knife gate valves.', stars: 5 },
              { industry: 'Municipal Water Treatment', result: 'WRAS-compliant DN800 butterfly valves delivered and commissioned within 3 weeks of order confirmation.', stars: 5 },
              { industry: 'Oil & Gas — Upstream Pipeline', result: 'API 6D ball valves supplied with full material traceability documentation. Zero defects on 47-unit order.', stars: 5 },
            ].map(sp => (
              <div key={sp.industry} className="glass p-6 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: sp.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-accent-400 text-accent-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">"{sp.result}"</p>
                <p className="text-xs font-semibold text-muted">{sp.industry}</p>
              </div>
            ))}
          </div>
          {/* Key metrics */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { value: '3 → 14 mo', label: 'Valve service life extended', sub: 'Slurry mining applications' },
              { value: '1.5×', label: 'Rated pressure tested', sub: 'Every valve before dispatch' },
              { value: '100%', label: 'Material documentation', sub: 'Test certs & CoC on every order' },
            ].map(m => (
              <div key={m.value} className="glass-blue p-5 rounded-2xl text-center">
                <div className="font-display text-3xl font-bold text-white mb-1">{m.value}</div>
                <div className="text-sm font-semibold text-blue-300">{m.label}</div>
                <div className="text-xs text-muted mt-1">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERING RESOURCES ───────────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="eng-label mb-2">Technical Library</p>
            <h2 className="font-display text-3xl font-bold text-white">Engineering Resources</h2>
            <p className="text-muted text-sm mt-2">Data sheets, selection guides and calculators — sign in for free access</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Technical Data Sheets', sub: '7 PDF documents — immediate download', icon: '📄', to: '/resources#downloads', color: '#10b981' },
              { title: 'Engineering Calculators', sub: 'Cv, flow rate, pressure drop', icon: '⚡', to: '/calculators', color: '#006DFF' },
              { title: 'Chemical Compatibility', sub: 'NBR · EPDM · Viton® · PTFE guide', icon: '🧪', to: '/resources#compatibility', color: '#8b5cf6' },
              { title: 'Product Catalog', sub: '40+ valve models, all specifications', icon: '📋', to: '/catalog', color: '#f59e0b' },
              { title: 'Valve Selection Guide', sub: 'Match application to valve type', icon: '🎯', to: '/resources#selection', color: '#ef4444' },
              { title: 'Standards Reference', sub: 'ISO, API 6D, SABS, WRAS', icon: '📐', to: '/resources#standards', color: '#FF6A00' },
            ].map(r => (
              <Link key={r.title} to={r.to}
                className="glass p-5 rounded-2xl group hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-4"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: `${r.color}12`, border: `1px solid ${r.color}25` }}>
                  {r.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm group-hover:text-blue-300 transition-colors">{r.title}</div>
                  <div className="text-xs text-muted mt-0.5">{r.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted group-hover:text-blue-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FULL-WIDTH CTA ──────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #040e22 0%, #0a1f45 50%, #040e22 100%)' }}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 70% 80% at 50% 50%, rgba(0,109,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300 mb-6"
            style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.25)' }}>
            <Shield className="w-3 h-3" /> ISO 9001:2015 · API 6D · WRAS · SABS · ISO 5208
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Ready to Engineer<br />Your Next Project?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Get expert valve sizing, product selection and engineering support from ISA Valve Solutions. ISO certified. Africa proven.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/rfq" className="btn-primary !px-8 !py-3.5 !text-base">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/configure" className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-white transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
              <Zap className="w-4 h-4 text-accent-400" /> AI Valve Selector
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-sm text-emerald-400 transition-colors hover:text-emerald-300"
              style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)' }}>
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +27 060 688 5648</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> South Africa · Regional coverage</span>
            <a href="mailto:isa-valve@outlook.com" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors">
              <Download className="w-3.5 h-3.5" /> isa-valve@outlook.com
            </a>
          </div>
        </div>
      </section>

      {/* Product quick-view modal */}
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </div>
  )
}

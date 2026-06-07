import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, ChevronRight, Check, X, MapPin, Star } from 'lucide-react'
import { products } from '../data/products'
import ProductModal from '../components/ProductModal'
import type { Product } from '../types'

/* ── Animated counter hook ── */
function useCountUp(target: number, suffix = '', duration = 2000) {
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
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, suffix, duration])

  return { display, ref }
}

/* ── Scroll reveal hook ── */
function useReveal(threshold = 0.15) {
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

function StatCard({ value, suffix, label, sub }: { value: number; suffix?: string; label: string; sub: string }) {
  const { display, ref } = useCountUp(value, suffix)
  return (
    <div ref={ref} className="glass-light p-6 rounded-2xl text-center">
      <div className="font-display text-4xl sm:text-5xl font-bold text-accent-500 mb-1">{display}</div>
      <div className="font-display text-base font-semibold text-white mb-1">{label}</div>
      <div className="text-xs text-muted leading-relaxed">{sub}</div>
    </div>
  )
}

const stats = [
  { value: 72,  suffix: '%',   label: 'Less Downtime',  sub: 'Copper mining operator, Northern Cape' },
  { value: 14,  suffix: ' mo', label: 'Valve Life',     sub: 'vs 3 months with standard valves' },
  { value: 25,  suffix: ' yr', label: 'Experience',     sub: 'Precision-engineered valve solutions' },
  { value: 100, suffix: '%',   label: 'Documentation',  sub: 'Full traceability on every valve' },
]

const certs = [
  { name: 'ISO 9001:2015', desc: 'Quality Management', icon: '✦' },
  { name: 'API 6D',        desc: 'Pipeline Valves',    icon: '⬡' },
  { name: 'WRAS',          desc: 'Potable Water',      icon: '◈' },
  { name: 'SABS',          desc: 'South Africa',       icon: '◉' },
]

const industries = [
  { name: 'Mining & Resources',       icon: '⛏', desc: 'Slurry, tailings, thickener underflow — ceramic and rubber-lined solutions for extreme abrasion.', to: '/industries/mining' },
  { name: 'Water Treatment',          icon: '💧', desc: 'WRAS and SABS-approved valves for municipal supply, treatment plants and irrigation networks.', to: '/industries/water-treatment' },
  { name: 'Oil & Gas',                icon: '🛢', desc: 'API 6D certified ball valves with full traceability documentation for upstream and midstream.', to: '/industries/oil-gas' },
  { name: 'Chemical & Petrochemical', icon: '⚗', desc: 'PTFE and PEEK-seated valves rated for aggressive acids, solvents and chlorinated media.', to: '/industries/chemical' },
  { name: 'HVAC & Building',          icon: '🌡', desc: 'Compact quarter-turn and gate valves for commercial HVAC, fire protection and building services.', to: '/industries/hvac' },
  { name: 'Pulp & Paper',             icon: '📄', desc: 'Full-bore knife gate valves that shear fibrous stock, black liquor and process effluent cleanly.', to: '/industries/pulp-paper' },
]

const whyISA = [
  { feature: 'Average valve life (mining slurry)',  isa: '14 months avg',       typical: '3 months avg' },
  { feature: 'Same-day technical support',          isa: true,                  typical: false },
  { feature: 'On-site performance audit',           isa: 'Included',            typical: 'Extra cost' },
  { feature: 'ISO 9001:2015 full traceability',     isa: true,                  typical: 'Partial' },
  { feature: 'Ceramic-lined slurry options',        isa: true,                  typical: false },
  { feature: 'Application engineering',             isa: 'Included',            typical: false },
  { feature: 'Southern Africa local stock',         isa: true,                  typical: false },
  { feature: 'Custom sizing DN15–DN1200',           isa: true,                  typical: 'Limited' },
]

const testimonials = [
  {
    quote: "Switching to ISA's DXST KGV series was the best decision we made. Valves last 14 months now instead of 3 — that alone saves us R1.2M per year in parts and shutdown time.",
    name: 'Maintenance Manager',
    role: 'Copper Mining Operation, Northern Cape',
    rating: 5,
  },
  {
    quote: "ISA's team came on-site, understood our slurry chemistry and flow conditions, then specified exactly the right sleeve compound. Zero cavitation issues since installation.",
    name: 'Process Engineer',
    role: 'Water Treatment Plant, Gauteng',
    rating: 5,
  },
  {
    quote: "Full test certificates and material traceability on every valve — exactly what we need for our API 6D compliance audits. No other local supplier comes close.",
    name: 'Procurement Manager',
    role: 'Oil & Gas Midstream, Western Cape',
    rating: 5,
  },
]

const coverage = [
  { country: 'South Africa', flag: '🇿🇦', note: 'Headquarters & Stock', primary: true },
  { country: 'Zambia',       flag: '🇿🇲', note: 'Mining operations',    primary: false },
  { country: 'Botswana',     flag: '🇧🇼', note: 'Water & diamond mining', primary: false },
  { country: 'Namibia',      flag: '🇳🇦', note: 'Mining & energy',      primary: false },
  { country: 'Zimbabwe',     flag: '🇿🇼', note: 'Industrial & mining',   primary: false },
  { country: 'Mozambique',   flag: '🇲🇿', note: 'Oil, gas & ports',     primary: false },
]

const featuredSlugs = ['dxst-kgv', 'pinch-valve', 'knife-gate-valve', 'ball-valve', 'butterfly-valve', 'gate-valve']
const featuredProducts = featuredSlugs.map(s => products.find(p => p.slug === s)).filter(Boolean) as Product[]

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  const statsReveal      = useReveal()
  const productsReveal   = useReveal()
  const whyReveal        = useReveal()
  const industriesReveal = useReveal()
  const certsReveal      = useReveal()
  const testimReveal     = useReveal()
  const coverageReveal   = useReveal()
  const proofReveal      = useReveal()
  const ctaReveal        = useReveal()

  return (
    <div className="bg-dark-900">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, #08111F)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-accent-400 mb-8"
              style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              ISO 9001:2015 · API 6D · SABS · WRAS Certified
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Precision Flow Control<br />
              <span className="shimmer-text">For Critical Industries</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-4 max-w-2xl">
              ISA Valve Solutions delivers engineered valve systems for mining, water treatment, oil & gas and chemical industries — backed by 25 years of field-proven expertise.
            </p>

            <p className="text-sm text-accent-400 font-semibold mb-10">
              ↑ 72% less downtime · R1.2M annual saving · Copper mining, Northern Cape
            </p>

            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/rfq" className="btn-primary text-base px-8 py-4">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/configure" className="btn-secondary text-base px-8 py-4">
                <Zap className="w-4 h-4 text-accent-400" /> AI Valve Selector
              </Link>
            </div>

            <div className="flex flex-wrap gap-2">
              {['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical', 'HVAC', 'Pulp & Paper'].map(i => (
                <span key={i} className="text-xs font-semibold text-muted px-3 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {i}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────── */}
      <section className="py-20" ref={statsReveal.ref}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 reveal ${statsReveal.inView ? 'in-view' : ''}`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} sub={s.sub} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <section className="py-24" ref={productsReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-end justify-between mb-12 reveal ${productsReveal.inView ? 'in-view' : ''}`}>
            <div>
              <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Product Range</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Six Valve Technologies</h2>
              <p className="text-muted mt-3 max-w-xl">From DN15 ball valves to DN1200 butterfly valves — every product ISO-tested at 1.5× rated pressure.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-2 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProducts.map((product, i) => (
              <button
                key={product.slug}
                onClick={() => setModalProduct(product)}
                className={`group text-left glass p-6 hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1 reveal reveal-delay-${Math.min(i + 1, 4)} ${productsReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{product.icon}</span>
                  <span className="text-xs font-bold text-accent-500 uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.2)' }}>
                    {product.category}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">{product.name}</h3>
                <p className="text-sm text-muted leading-relaxed mb-4">{product.tagline}</p>
                <div className="flex gap-3 text-xs text-muted">
                  {product.specs.filter(s => ['Size range', 'Pressure rating'].includes(s.label)).map(s => (
                    <span key={s.label} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-accent-500 flex-shrink-0" />
                      {s.value}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Quick view <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </button>
            ))}
          </div>

          <div className="text-center mt-8 sm:hidden">
            <Link to="/products" className="btn-secondary">View all products <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── AI VALVE SELECTOR ─────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(255,106,0,0.06) 0%, transparent 70%)' }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="glass p-10 sm:p-14 pulse-glow">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
              style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.2), rgba(255,106,0,0.05))', border: '1px solid rgba(255,106,0,0.3)' }}>
              <Zap className="w-7 h-7 text-accent-500" />
            </div>
            <p className="text-accent-400 font-bold text-sm uppercase tracking-widest mb-4">AI Engineering Assistant</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
              Find your valve<br />in 60 seconds
            </h2>
            <p className="text-muted text-lg mb-8 leading-relaxed">
              Answer 4 questions about your industry, fluid, size and pressure. Our AI narrows 6 valve types to your exact application — instantly.
            </p>
            <Link to="/configure" className="btn-primary text-lg px-10 py-4 inline-flex">
              Start AI Selector <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY ISA ───────────────────────────────────────────── */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }} ref={whyReveal.ref}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 reveal ${whyReveal.inView ? 'in-view' : ''}`}>
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">The ISA Difference</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Why industry leaders choose ISA</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Not all valve suppliers are created equal. Here's how we compare to a typical distributor.</p>
          </div>
          <div className={`glass overflow-hidden reveal reveal-delay-2 ${whyReveal.inView ? 'in-view' : ''}`} style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
            {/* Table header */}
            <div className="grid grid-cols-3 text-xs font-bold uppercase tracking-widest px-6 py-4" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
              <span className="text-muted">Feature</span>
              <span className="text-accent-400 text-center">ISA Valve Solutions</span>
              <span className="text-muted text-center">Typical Supplier</span>
            </div>
            {whyISA.map((row, i) => (
              <div key={row.feature} className="grid grid-cols-3 px-6 py-4 items-center transition-colors hover:bg-white/[0.02]"
                style={{ borderBottom: i < whyISA.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                <span className="text-sm text-slate-300 pr-4">{row.feature}</span>
                <div className="flex justify-center">
                  {typeof row.isa === 'boolean' ? (
                    row.isa ? <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-emerald-400" /></span>
                            : <span className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center"><X className="w-3.5 h-3.5 text-red-400" /></span>
                  ) : (
                    <span className="text-sm font-bold text-emerald-400">{row.isa}</span>
                  )}
                </div>
                <div className="flex justify-center">
                  {typeof row.typical === 'boolean' ? (
                    row.typical ? <span className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center"><Check className="w-3.5 h-3.5 text-emerald-400" /></span>
                                : <span className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center"><X className="w-3.5 h-3.5 text-slate-500" /></span>
                  ) : (
                    <span className="text-sm text-muted">{row.typical}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className={`text-center mt-8 reveal reveal-delay-3 ${whyReveal.inView ? 'in-view' : ''}`}>
            <Link to="/rfq" className="btn-primary">Get a Quote Today <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ────────────────────────────────────────── */}
      <section className="py-24" ref={industriesReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`mb-12 reveal ${industriesReveal.inView ? 'in-view' : ''}`}>
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Industry Solutions</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Built for your sector</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map((ind, i) => (
              <Link key={ind.to} to={ind.to}
                className={`group glass p-6 hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1 block reveal reveal-delay-${Math.min(i + 1, 4)} ${industriesReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-3xl mb-4">{ind.icon}</div>
                <h3 className="font-display text-base font-bold text-white mb-2 group-hover:text-accent-400 transition-colors">{ind.name}</h3>
                <p className="text-sm text-muted leading-relaxed">{ind.desc}</p>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-accent-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────────────────────── */}
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }} ref={certsReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-10 reveal ${certsReveal.inView ? 'in-view' : ''}`}>
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Certifications</p>
            <h2 className="font-display text-3xl font-bold text-white">Standards you can audit</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map((c, i) => (
              <div key={c.name} className={`glass-light p-6 text-center rounded-2xl group hover:border-accent-500/30 transition-all duration-300 reveal reveal-delay-${i + 1} ${certsReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="text-3xl text-accent-500 mb-3">{c.icon}</div>
                <div className="font-display text-lg font-bold text-white mb-1">{c.name}</div>
                <div className="text-xs text-muted">{c.desc}</div>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400">
                  <Shield className="w-3 h-3" /> Certified
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" ref={testimReveal.ref}>
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className={`text-center mb-12 reveal ${testimReveal.inView ? 'in-view' : ''}`}>
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Customer Stories</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">What engineers say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`glass p-7 flex flex-col reveal reveal-delay-${i + 1} ${testimReveal.inView ? 'in-view' : ''}`}
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                {/* Quote */}
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1 mb-6">
                  "{t.quote}"
                </blockquote>
                {/* Author */}
                <div className="flex items-center gap-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-9 h-9 rounded-full bg-accent-500/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-accent-400">{t.name[0]}</span>
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

      {/* ── PROOF / CASE STUDY ─────────────────────────────────── */}
      <section className="py-24" ref={proofReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className={`reveal ${proofReveal.inView ? 'in-view' : ''}`}>
              <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-4">Case Study</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
                466% longer valve life<br />in copper mining
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-6">
                A copper mine in the Northern Cape replaced standard knife gate valves — failing every 3 months — with ISA DXST Series valves featuring injection-moulded natural rubber linings.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  ['3 months → 14 months', 'Valve service life extended'],
                  ['72% reduction', 'Maintenance downtime'],
                  ['R1.2M per year', 'Parts and shutdown cost savings'],
                ].map(([metric, desc]) => (
                  <div key={metric} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-500/20 border border-accent-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
                    </span>
                    <div>
                      <span className="font-bold text-white text-sm">{metric}</span>
                      <span className="text-muted text-sm"> — {desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <Link to="/products/dxst-kgv" className="btn-primary">
                View DXST KGV <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className={`glass p-8 rounded-2xl reveal reveal-delay-2 ${proofReveal.inView ? 'in-view' : ''}`} style={{ border: '1px solid rgba(255,106,0,0.15)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl">⛏</span>
                <div>
                  <div className="font-bold text-white">Copper Mining</div>
                  <div className="text-xs text-muted">Northern Cape, South Africa</div>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { label: 'Previous valve life', before: '3 months', after: '14 months', pct: 21 },
                  { label: 'Downtime reduction', before: 'High', after: '72% less', pct: 28 },
                  { label: 'Annual cost saving', before: 'Baseline', after: 'R1.2M saved', pct: 85 },
                ].map(row => (
                  <div key={row.label}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-muted">{row.label}</span>
                      <span className="font-bold text-accent-400">{row.after}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-dark-600 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent-500 to-accent-400" style={{ width: `${row.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GLOBAL COVERAGE ───────────────────────────────────── */}
      <section className="py-24" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} ref={coverageReveal.ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid lg:grid-cols-2 gap-12 items-center reveal ${coverageReveal.inView ? 'in-view' : ''}`}>
            <div>
              <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Regional Reach</p>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Serving Southern Africa</h2>
              <p className="text-muted text-lg leading-relaxed mb-8">
                Headquartered in South Africa with active supply relationships across six southern African nations — short lead times, local stock, and on-site support where you need it.
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

            {/* Abstract Africa map using SVG dots */}
            <div className="relative flex items-center justify-center">
              <div className="glass p-8 rounded-2xl w-full max-w-sm mx-auto" style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <svg viewBox="0 0 200 260" className="w-full" fill="none">
                  {/* Simplified Southern Africa outline */}
                  <path d="M60,10 L140,10 L155,40 L160,80 L150,120 L140,160 L120,200 L100,240 L80,200 L60,160 L50,120 L40,80 L45,40 Z"
                    fill="rgba(255,106,0,0.04)" stroke="rgba(255,106,0,0.15)" strokeWidth="1.5" />
                  {/* Country dots */}
                  <circle cx="100" cy="160" r="6" fill="#FF6A00" opacity="0.9" />  {/* SA */}
                  <circle cx="100" cy="160" r="12" fill="#FF6A00" opacity="0.15" />
                  <circle cx="100" cy="95"  r="4" fill="#3b82f6" opacity="0.7" />  {/* ZM */}
                  <circle cx="80" cy="140" r="3.5" fill="#60a5fa" opacity="0.6" />  {/* BW */}
                  <circle cx="62" cy="110" r="3.5" fill="#60a5fa" opacity="0.6" />  {/* NA */}
                  <circle cx="122" cy="125" r="3.5" fill="#60a5fa" opacity="0.6" /> {/* ZW */}
                  <circle cx="138" cy="110" r="3.5" fill="#60a5fa" opacity="0.6" /> {/* MZ */}
                  {/* Connecting lines from SA */}
                  {[[100,95],[80,140],[62,110],[122,125],[138,110]].map(([x,y], i) => (
                    <line key={i} x1="100" y1="160" x2={x} y2={y} stroke="rgba(255,106,0,0.2)" strokeWidth="1" strokeDasharray="3,3" />
                  ))}
                  {/* Labels */}
                  <text x="112" y="165" fill="#FF6A00" fontSize="7" fontWeight="600">S. Africa</text>
                  <text x="104" y="92"  fill="#A8B2C5" fontSize="6">Zambia</text>
                  <text x="84"  y="150" fill="#A8B2C5" fontSize="6">Botswana</text>
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

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden" ref={ctaReveal.ref}>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.08) 0%, rgba(8,17,31,0) 60%)' }} />
        <div className={`max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10 reveal ${ctaReveal.inView ? 'in-view' : ''}`}>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Ready to specify?</h2>
          <p className="text-muted text-lg mb-8">Our team responds within 24 hours with a full technical proposal.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/rfq" className="btn-primary text-lg px-10 py-4">
              Request a Quote <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/configure" className="btn-secondary text-lg px-10 py-4">
              <Zap className="w-5 h-5 text-accent-400" /> AI Valve Selector
            </Link>
          </div>
        </div>
      </section>

      {modalProduct && <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />}
    </div>
  )
}

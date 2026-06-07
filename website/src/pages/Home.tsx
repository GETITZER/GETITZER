import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, ChevronRight } from 'lucide-react'
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
  { value: 72,  suffix: '%', label: 'Less Downtime',   sub: 'Copper mining operator, Northern Cape' },
  { value: 14,  suffix: ' mo', label: 'Valve Life',    sub: 'vs 3 months with standard valves' },
  { value: 25,  suffix: ' yr', label: 'Experience',    sub: 'Precision-engineered valve solutions' },
  { value: 100, suffix: '%',  label: 'Documentation',  sub: 'Full traceability on every valve' },
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

const featuredSlugs = ['dxst-kgv', 'pinch-valve', 'knife-gate-valve', 'ball-valve', 'butterfly-valve', 'gate-valve']
const featuredProducts = featuredSlugs.map(s => products.find(p => p.slug === s)).filter(Boolean) as Product[]

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  return (
    <div className="bg-dark-900">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,106,0,0.08) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(59,130,246,0.06) 0%, transparent 50%)' }} />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(to bottom, transparent, #08111F)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24">
          <div className="max-w-4xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-accent-400 mb-8"
              style={{ background: 'rgba(255,106,0,0.1)', border: '1px solid rgba(255,106,0,0.25)' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse" />
              ISO 9001:2015 · API 6D · SABS · WRAS Certified
            </div>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.05] mb-6">
              Precision Flow Control<br />
              <span className="shimmer-text">For Critical Industries</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted leading-relaxed mb-4 max-w-2xl">
              ISA Valve Solutions delivers engineered valve systems for mining, water treatment, oil & gas and chemical industries — backed by 25 years of field-proven expertise.
            </p>

            {/* Proof line */}
            <p className="text-sm text-accent-400 font-semibold mb-10">
              ↑ 72% less downtime · R1.2M annual saving · Copper mining, Northern Cape
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-14">
              <Link to="/rfq" className="btn-primary text-base px-8 py-4">
                Get a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/configure" className="btn-secondary text-base px-8 py-4">
                <Zap className="w-4 h-4 text-accent-400" /> AI Valve Selector
              </Link>
            </div>

            {/* Industry tags */}
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map(s => (
              <StatCard key={s.label} value={s.value} suffix={s.suffix} label={s.label} sub={s.sub} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ─────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
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
            {featuredProducts.map(product => (
              <button
                key={product.slug}
                onClick={() => setModalProduct(product)}
                className="group text-left glass p-6 hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1"
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

      {/* ── INDUSTRIES ────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Industry Solutions</p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">Built for your sector</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {industries.map(ind => (
              <Link key={ind.to} to={ind.to}
                className="group glass p-6 hover:border-accent-500/30 transition-all duration-300 hover:-translate-y-1 block"
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
      <section className="py-20" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-3">Certifications</p>
            <h2 className="font-display text-3xl font-bold text-white">Standards you can audit</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {certs.map(c => (
              <div key={c.name} className="glass-light p-6 text-center rounded-2xl group hover:border-accent-500/30 transition-all duration-300"
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

      {/* ── PROOF / CASE STUDY ─────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-accent-500 font-bold text-sm uppercase tracking-widest mb-4">Proven Results</p>
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

            <div className="glass p-8 rounded-2xl" style={{ border: '1px solid rgba(255,106,0,0.15)' }}>
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

      {/* ── CTA STRIP ─────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,106,0,0.08) 0%, rgba(8,17,31,0) 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
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

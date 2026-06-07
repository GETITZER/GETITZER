import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Phone, Mail, CheckCircle } from 'lucide-react'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'
import type { Product } from '../types'
import ProductModal from '../components/ProductModal'

/* ── Animated counter ─────────────────────────────────────────────── */
function StatCard({ target, suffix, label, sub }: {
  target: number; suffix?: string; label: string; sub: string
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
    <div ref={ref} className="text-center px-6 py-10">
      <div className="text-5xl font-extrabold text-isa-500 mb-1 tabular-nums tracking-tight">
        {count}{suffix}
      </div>
      <div className="text-sm font-bold text-slate-700 uppercase tracking-widest mb-1">{label}</div>
      <div className="text-xs text-slate-400">{sub}</div>
    </div>
  )
}

/* ── Data ───────────────────────────────────────────────────────── */
const STATS = [
  { target: 35, suffix: '+', label: 'Years Experience', sub: 'Proven engineering expertise' },
  { target: 500, suffix: '+', label: 'Projects Completed', sub: 'Across multiple industries' },
  { target: 8, suffix: '+', label: 'Countries Served', sub: 'Southern & Central Africa' },
  { target: 24, suffix: '/7', label: 'Engineering Support', sub: 'Technical assistance' },
]

const CERTS = [
  { code: 'ISO 9001:2015', name: 'Quality Management System' },
  { code: 'API 6D', name: 'Pipeline & Piping Valves' },
  { code: 'ISO 5208', name: 'Grade A Zero Leakage' },
  { code: 'WRAS Approved', name: 'Potable Water Applications' },
  { code: 'SABS 664', name: 'South African Gate Valves' },
]

const PRODUCT_CATS = [
  { title: 'ISA DXST™ Slurry KGV', sub: '466% longer service life', spec: 'DN50–DN600 · Mining grade', slug: 'dxst-kgv', img: '/images/products/dxst-kgv.png' },
  { title: 'ISA Titan™ Ball Valve', sub: 'API 6D certified', spec: 'DN15–DN600 · Full bore', slug: 'ball-valve', img: '/images/products/ball-valve.png' },
  { title: 'ISA Hydra™ Butterfly Valve', sub: 'WRAS approved', spec: 'DN50–DN1200 · Triple offset', slug: 'butterfly-valve', img: '/images/products/butterfly-valve.png' },
  { title: 'ISA Core™ Gate Valve', sub: 'SABS 664 certified', spec: 'DN50–DN1000 · OS&Y', slug: 'gate-valve', img: '/images/products/gate-valve.png' },
  { title: 'ISA Shield™ Pinch Valve', sub: 'ISO 5208 Grade A', spec: 'DN25–DN400 · 4 sleeve types', slug: 'pinch-valve', img: '/images/hero/mining-slurry.png' },
  { title: 'ISA ProSeal™ Knife Gate', sub: 'Ceramic-lined option', spec: 'DN50–DN600 · Wafer/Lug', slug: 'knife-gate-valve', img: '/images/hero/industrial-banner.png' },
]

const INDUSTRIES = [
  { name: 'Mining & Minerals', desc: 'Slurry, tailings, concentrate transfer', to: '/industries/mining' },
  { name: 'Water Treatment', desc: 'Municipal supply & desalination', to: '/industries/water-treatment' },
  { name: 'Oil & Gas', desc: 'Upstream, midstream & pipeline', to: '/industries/oil-gas' },
  { name: 'Chemical Processing', desc: 'Corrosive & high-pressure media', to: '/industries/chemical' },
  { name: 'Municipal Infrastructure', desc: 'Distribution networks, SABS certified', to: '/industries' },
  { name: 'Power Generation', desc: 'Steam, cooling & utility systems', to: '/industries' },
  { name: 'Pulp & Paper', desc: 'Fibrous, abrasion-resistant service', to: '/industries/pulp-paper' },
  { name: 'Food & Beverage', desc: 'Sanitary, FDA-compliant materials', to: '/industries' },
]

const PROJECTS = [
  { title: 'Konige Mine — Zambia', sub: 'Coriolis Mass Flow & Slurry Sampling System', desc: 'Audit-grade IFC installation for copper concentrate measurement. Full fabrication, installation and commissioning protocols.', tag: 'Mining · Zambia' },
  { title: 'Municipal Water Network', sub: 'DN800 Butterfly Valves — WRAS Compliant', desc: 'WRAS-compliant butterfly valve installation for potable water distribution network. Delivered within 3 weeks of order.', tag: 'Water · South Africa' },
  { title: 'Intelligent Slurry Sampling', sub: 'LSD-E · LMD Distributor · Siemens WinCC', desc: 'On-line mineral slurry sampling system for platinum group metals processing with full SCADA automation.', tag: 'Mining · PGM' },
  { title: 'Control Valve Package', sub: 'Hydraulic Control · Pressure Reducing Valves', desc: 'Complete hydraulic control valve package — pressure reducing, sustaining, foot check and swing check valves.', tag: 'Industrial · RSA' },
]

const CAPABILITIES = [
  { title: 'Engineering Support', desc: 'In-house technical team for valve sizing, material selection, and application engineering across all product lines.' },
  { title: 'Quality Assurance', desc: 'Every valve hydrostatic and pneumatically tested at 1.5× rated pressure. Full material traceability documentation included.' },
  { title: 'Africa-Wide Delivery', desc: 'Established logistics network covering South Africa, Zambia, Zimbabwe, Botswana, Namibia and Mozambique.' },
]

/* ═══════════════════════════════════════════════════════════════════ */
export default function Home() {
  const [modal, setModal] = useState<Product | null>(null)

  return (
    <div>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: '#071A2D' }}>
        {/* Hero image — right half, subtle brightness reduction */}
        <div className="absolute inset-0 lg:left-1/2">
          <img
            src="/images/hero/industrial-banner.png"
            alt="Industrial valve installation"
            className="w-full h-full object-cover brightness-75"
          />
          {/* Edge fade so image blends into navy on the left */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2D] via-[#071A2D]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-xl">
            {/* Orange cert badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white mb-8"
              style={{ background: '#F97316', border: '1px solid rgba(249,115,22,0.5)' }}>
              <Shield className="w-3 h-3" /> ISO 9001:2015 Certified · South Africa
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.05] mb-6">
              Precision-Engineered<br />Valve Solutions
            </h1>

            <p className="text-lg text-slate-300 max-w-lg mb-8 leading-relaxed">
              35 years supplying ball, butterfly, gate, knife gate and slurry valves for mining, water treatment, oil & gas and chemical industries across Africa.
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap gap-3 mb-10">
              <Link to="/rfq" className="btn-primary !px-6 !py-3 !text-base">
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/products"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-base text-white border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all duration-150">
                View Products
              </Link>
            </div>

            {/* Cert dots row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-400">
              {CERTS.map((c, i) => (
                <span key={c.code} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-slate-600 mr-2">·</span>}
                  <span className="w-1.5 h-1.5 rounded-full bg-isa-500 inline-block" />
                  {c.code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. INDUSTRY TRUST BAR ───────────────────────────────────── */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Trusted across:</span>
          {['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical Processing', 'Municipal', 'Power Generation', 'Pulp & Paper'].map((ind, i, arr) => (
            <span key={ind} className="flex items-center gap-4">
              <span className="text-sm font-semibold text-slate-600">{ind}</span>
              {i < arr.length - 1 && <span className="text-slate-300">·</span>}
            </span>
          ))}
        </div>
      </div>

      {/* ── 3. STATS ────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-b border-slate-100">
        <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-slate-200">
          {STATS.map(s => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* ── 4. PRODUCTS ─────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
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
            {PRODUCT_CATS.map(cat => (
              <Link key={cat.slug} to={`/products/${cat.slug}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-slate-200 group">
                {/* Image area */}
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={cat.img}
                    alt={cat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content area */}
                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-base mb-1">{cat.title}</h3>
                  <p className="text-isa-600 text-sm font-medium mb-1">{cat.sub}</p>
                  <p className="text-slate-500 text-xs mb-4">{cat.spec}</p>
                  <span className="flex items-center gap-1 text-sm font-semibold text-isa-600 hover:text-isa-700 group-hover:gap-2 transition-all duration-150">
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

      {/* ── 5. CAPABILITIES ─────────────────────────────────────────── */}
      <section className="py-20 relative" style={{ background: '#071A2D' }}>
        {/* Orange accent bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-isa-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Engineering Excellence</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Why Engineers Specify ISA
            </h2>
            <p className="text-slate-400 text-lg mt-3 max-w-xl mx-auto">
              From specification to commissioning — engineering support at every stage.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {CAPABILITIES.map(cap => (
              <div key={cap.title} className="rounded-xl p-6" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }}>
                <div className="w-8 h-8 rounded-lg bg-isa-500/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-4 h-4 text-isa-400" />
                </div>
                <h3 className="font-bold text-white text-base mb-2">{cap.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* Metrics bar */}
          <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 pt-8 border-t border-white/10 text-center">
            {['35+ Years', '500+ Projects', '8+ Countries', 'ISO 9001:2015'].map(m => (
              <span key={m} className="text-sm font-bold text-slate-300 uppercase tracking-widest">{m}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. INDUSTRIES ───────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Markets We Serve</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Sector Solutions
            </h2>
            <p className="text-slate-500 text-lg mt-3">ISA valves engineered for the most demanding applications</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {INDUSTRIES.map(ind => (
              <Link key={ind.name} to={ind.to}
                className="bg-white border border-slate-200 rounded-xl p-5 hover:border-isa-300 hover:shadow-sm transition-all group">
                <h3 className="font-semibold text-slate-900 text-sm mb-1">{ind.name}</h3>
                <p className="text-slate-500 text-xs mb-3 leading-snug">{ind.desc}</p>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-isa-500 group-hover:translate-x-0.5 transition-all duration-150" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FEATURED PROJECTS ────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Recent Installations</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Featured Projects
            </h2>
            <p className="text-slate-500 text-lg mt-3">Real installations across Africa</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map(p => (
              <div key={p.title} className="border-l-4 border-isa-500 bg-white shadow-sm rounded-xl p-6 hover:shadow-md transition-shadow">
                <span className="inline-block text-xs font-bold text-isa-700 bg-isa-50 px-2 py-0.5 rounded mb-3">{p.tag}</span>
                <h3 className="font-bold text-slate-900 text-base mb-1">{p.title}</h3>
                <p className="text-sm font-semibold text-slate-600 mb-2">{p.sub}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. CERTIFICATIONS ───────────────────────────────────────── */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="section-label">Quality Assurance</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              International Certifications
            </h2>
            <p className="text-slate-500 text-base mt-2 max-w-xl mx-auto">
              Independently certified to international standards
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CERTS.map(c => (
              <div key={c.code} className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
                <Shield className="w-6 h-6 text-isa-500 mx-auto mb-3" />
                <div className="font-bold text-slate-900 text-sm">{c.code}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. ENGINEERING RESOURCES ────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="section-label">Technical Library</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Technical Resources
            </h2>
            <p className="text-slate-500 text-lg mt-3">Data sheets, selection guides and calculators</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Technical Data Sheets', sub: '7 PDF documents — immediate download', to: '/resources#downloads' },
              { title: 'Engineering Calculators', sub: 'Cv, flow rate, pressure drop', to: '/calculators' },
              { title: 'Chemical Compatibility', sub: 'NBR · EPDM · Viton® · PTFE guide', to: '/resources#compatibility' },
              { title: 'Product Catalog', sub: '40+ valve models, all specifications', to: '/catalog' },
              { title: 'Valve Selection Guide', sub: 'Match application to valve type', to: '/resources#selection' },
              { title: 'Standards Reference', sub: 'ISO, API 6D, SABS, WRAS', to: '/resources#standards' },
            ].map(r => (
              <Link key={r.title} to={r.to}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex items-center gap-4 hover:border-isa-300 hover:shadow-sm transition-all group">
                <div className="w-10 h-10 rounded-lg bg-isa-50 border border-isa-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-isa-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-900 text-sm group-hover:text-isa-700 transition-colors">{r.title}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{r.sub}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-isa-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. CTA ─────────────────────────────────────────────────── */}
      <section className="py-20" style={{ background: '#071A2D' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-isa-400 block mb-6">
            ISO 9001:2015 · API 6D · WRAS · SABS 664 · ISO 5208
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Ready to Engineer<br />Your Next Project?
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Get expert valve sizing, product selection and engineering support from ISA Valve Solutions. ISO certified. Africa proven.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <Link to="/rfq" className="btn-primary !px-8 !py-3.5 !text-base">
              Request Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/products"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-base text-white border border-white/25 hover:border-white/50 hover:bg-white/5 transition-all duration-150">
              View Products
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg font-bold text-base text-emerald-400 border border-emerald-500/25 hover:border-emerald-400/50 hover:bg-emerald-500/5 transition-all duration-150">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +27 060 688 5648</span>
            <a href="mailto:isa-valve@outlook.com" className="flex items-center gap-1.5 hover:text-isa-400 transition-colors">
              <Mail className="w-3.5 h-3.5" /> isa-valve@outlook.com
            </a>
          </div>
        </div>
      </section>

      {/* Product quick-view modal */}
      <ProductModal product={modal} onClose={() => setModal(null)} />
    </div>
  )
}

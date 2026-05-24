import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Shield, CheckCircle, TrendingDown, Clock, DollarSign, Zap, Star, ChevronRight, Eye } from 'lucide-react'
import { products, industries } from '../data/products'
import ProductModal from '../components/ProductModal'
import ValveIllustration from '../components/ValveIllustration'
import type { Product } from '../types'

// Principle #3: Certifications above the fold — shown as prominent trust badges
const certBadges = [
  { name: 'ISO 9001:2015', sub: 'Quality Management' },
  { name: 'API 6D', sub: 'Pipeline Valves' },
  { name: 'SABS', sub: 'SA Standards' },
  { name: 'WRAS', sub: 'Potable Water' },
]

// Principle #12: Social proof — industry sectors and peer outcomes
const socialProof = [
  { industry: 'Copper Mining, Northern Cape', outcome: '72% maintenance downtime reduction, R1.2M annual saving', stars: 5 },
  { industry: 'Municipal Water Treatment', outcome: 'WRAS-compliant DN800 butterfly valves delivered within 3 weeks', stars: 5 },
  { industry: 'Oil & Gas — Upstream', outcome: 'API 6D ball valves supplied with full documentation in 4 weeks', stars: 5 },
]

// Principle #11: Plain-language value propositions with measurable outcomes
const valueProps = [
  { metric: '72%', context: 'less maintenance downtime', proof: 'Achieved by a copper mining operator using our ceramic-lined knife gate valves' },
  { metric: 'R1.2M', context: 'annual parts saving', proof: 'After switching from standard to ISA ceramic-lined valves in slurry service' },
  { metric: '3 → 14 mo', context: 'valve service life', proof: 'Extended in active slurry processing through custom valve engineering' },
]


const qualitySteps = [
  { n: '1', title: 'Material Verification', desc: 'Spectroscopic analysis confirms exact alloy composition for every critical component.' },
  { n: '2', title: 'Pressure Testing', desc: 'Hydrostatic and pneumatic testing at 1.5× rated pressure before dispatch.' },
  { n: '3', title: 'Performance Validation', desc: 'Automated cycle testing simulates years of service to verify long-term reliability.' },
]

const featuredSlugs = ['pinch-valve', 'dxst-kgv', 'knife-gate-valve', 'ball-valve']
const featuredProducts = featuredSlugs.map(s => products.find(p => p.slug === s)).filter(Boolean) as Product[]

const tcoSteps = [
  { label: 'Digital Precision Sizing', icon: '⊙' },
  { label: 'ISO-Certified QA Testing', icon: '✓' },
  { label: 'DXST Application Materials', icon: '◈' },
  { label: '24/7 Global Support', icon: '⊕' },
]

export default function Home() {
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  return (
    <div>
      {/* ── HERO (Principles #1 #3 #11) ─────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-28" style={{ background: 'linear-gradient(135deg,#0f2744 0%,#1e3a8a 60%,#1d4ed8 100%)' }}>
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '28px 28px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">

            {/* Principle #11: Outcome-first headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">
              Precision Valves That{' '}
              <span className="text-isa-400">Keep Your Process Running</span>
            </h1>

            {/* Dual-layer: emotional + technical subtext (Principle #1) */}
            <p className="mt-5 text-lg sm:text-xl text-blue-200 leading-relaxed max-w-2xl">
              Our ceramic-lined knife gate valves helped a Northern Cape copper mining operation cut maintenance
              downtime by <strong className="text-white">72%</strong> and save{' '}
              <strong className="text-white">R1.2M annually</strong>. 25 years of precision engineering for
              mining, water treatment, oil & gas, and industrial applications.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Principle #9: Configurator as primary CTA */}
              <Link to="/configurator" className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-black px-6 py-3 rounded-xl transition-colors shadow-lg text-base">
                <Zap className="w-4 h-4" /> Find Your Valve <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/rfq" className="inline-flex items-center gap-2 border border-white/30 hover:border-white/70 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-base">
                Request a Quote
              </Link>
            </div>

            {/* Principle #3: Certification badges ABOVE THE FOLD */}
            <div className="mt-10 flex flex-wrap gap-3">
              {certBadges.map(cert => (
                <div key={cert.name} className="flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-3 py-2">
                  <CheckCircle className="w-4 h-4 text-isa-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-black text-white">{cert.name}</div>
                    <div className="text-[10px] text-blue-300">{cert.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF BAR (Principle #12) ─────────────────────── */}
      <section className="bg-navy border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-400">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Trusted by operators in:</span>
            {['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical', 'HVAC', 'Pulp & Paper'].map((ind, i, arr) => (
              <span key={ind} className="flex items-center gap-2">
                <span className="font-medium text-slate-300">{ind}</span>
                {i < arr.length - 1 && <span className="text-slate-600">·</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS (Principle #11) ────────────────────────────── */}
      <section className="bg-white py-12 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6">
            {valueProps.map(vp => (
              <div key={vp.metric} className="text-center sm:text-left p-4">
                <div className="text-3xl font-black text-brand-700 mb-0.5">{vp.metric}</div>
                <div className="text-base font-bold text-slate-900">{vp.context}</div>
                <div className="text-sm text-slate-500 mt-1 leading-relaxed">{vp.proof}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS SPOTLIGHT ────────────────────────────── */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-black bg-isa-600 text-white px-3 py-1 rounded-full">
                  <Shield className="w-3 h-3" /> NEW PRODUCTS
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Featured Product Innovations</h2>
              <p className="text-slate-500 mt-1 text-sm max-w-lg">Click any card to see full specifications, certifications, and sleeve options.</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-800 whitespace-nowrap">
              All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map(product => {
              const slugType = product.slug as 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve' | 'pinch-valve' | 'dxst-kgv'
              const badgeBg = product.badgeColor === 'red' ? 'bg-red-600' : product.badgeColor === 'green' ? 'bg-green-600' : product.badgeColor === 'isa' ? 'bg-isa-600' : 'bg-brand-600'
              return (
                <button
                  key={product.id}
                  onClick={() => setModalProduct(product)}
                  className="group text-left card p-0 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-brand-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
                >
                  {/* Visual panel */}
                  <div className="relative h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4">
                    <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
                    {product.badge && (
                      <div className={`absolute top-3 left-3 text-[10px] font-black px-2 py-0.5 rounded-full text-white ${badgeBg}`}>
                        {product.badge}
                      </div>
                    )}
                    <ValveIllustration type={slugType} className="w-full h-full max-h-32" />
                    <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-white/95 text-brand-700 font-bold text-xs px-4 py-2 rounded-full flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" /> View Specs
                      </div>
                    </div>
                  </div>

                  {/* Info panel */}
                  <div className="p-4">
                    <h3 className="font-black text-sm text-slate-900 group-hover:text-brand-700 transition-colors leading-tight">{product.name}</h3>
                    <p className="text-xs text-isa-600 font-semibold mt-0.5 mb-2 leading-tight line-clamp-1">{product.tagline}</p>
                    {product.highlights?.slice(0, 2).map(h => (
                      <p key={h} className="text-xs text-slate-500 leading-tight flex items-start gap-1.5 mb-1">
                        <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{h}</span>
                      </p>
                    ))}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── TCO EQUATION STRIP ─────────────────────────────────────── */}
      <section className="bg-navy border-b border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-blue-400 font-bold uppercase tracking-widest text-center mb-6">The ISA Total Cost of Ownership Equation</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tcoSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5">
                  <span className="text-isa-400 font-black text-base">{step.icon}</span>
                  <span className="text-white text-xs font-semibold">{step.label}</span>
                </div>
                {i < tcoSteps.length - 1 && <span className="text-slate-500 font-bold text-lg">+</span>}
              </div>
            ))}
            <span className="text-slate-500 font-bold text-xl">=</span>
            <div className="bg-isa-600 border border-isa-500 rounded-xl px-4 py-2.5 max-w-xs text-center">
              <p className="text-white font-black text-xs leading-tight">3x–5x lifecycle · Near-zero downtime · Compounded energy savings</p>
            </div>
          </div>
          <p className="text-center text-slate-400 text-xs italic mt-5 max-w-xl mx-auto">
            "You aren't just buying a valve — you are buying an engineered ecosystem that permanently reduces your baseline operating costs."
          </p>
        </div>
      </section>

      {/* ── CONFIGURATOR CTA (Principle #9) ───────────────────────── */}
      <section className="py-14 bg-isa-50 border-b border-isa-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-isa-600" />
              <span className="text-sm font-black text-isa-700 uppercase tracking-wider">AI Valve Selector</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900">Not sure which valve? Get a recommendation in 60 seconds.</h2>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Answer 4 questions about your industry, fluid type, size, and pressure — and our AI recommends the right
              valve with engineering reasoning. No sales call. No waiting.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link to="/configurator" className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-black px-7 py-3.5 rounded-xl transition-colors shadow-md text-base whitespace-nowrap">
              Start Valve Selector <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENGINEERING CREDENTIALS ───────────────────────────────── */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-black text-isa-500 uppercase tracking-widest text-center mb-10">Engineering Credentials &amp; Quality Assurance</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                cert: 'ISO 9001:2015',
                title: 'Quality Management',
                desc: 'Every valve manufactured under a certified quality management system with full material traceability and documented test records.',
                color: 'border-brand-500',
                badge: 'bg-brand-700',
              },
              {
                cert: 'API 6D',
                title: 'Pipeline Valves',
                desc: 'Ball valves and gate valves certified to API 6D for upstream and midstream pipeline service. Hydrocarbon and H₂S rated.',
                color: 'border-isa-500',
                badge: 'bg-isa-700',
              },
              {
                cert: 'SABS',
                title: 'SA Bureau of Standards',
                desc: 'Gate and butterfly valves compliant with SABS 664 for South African municipal water and industrial applications.',
                color: 'border-emerald-500',
                badge: 'bg-emerald-700',
              },
              {
                cert: 'ISO 5208 Grade A',
                title: 'Zero Leakage',
                desc: 'ISA Pinch Valve Series certified to ISO 5208 Grade A — the highest leakage classification. Audit-grade shut-off for slurry and mining.',
                color: 'border-violet-500',
                badge: 'bg-violet-700',
              },
            ].map(item => (
              <div key={item.cert} className={`bg-slate-800 rounded-2xl p-6 border-t-4 ${item.color} flex flex-col gap-3`}>
                <span className={`self-start text-xs font-black text-white px-2.5 py-1 rounded-full ${item.badge}`}>{item.cert}</span>
                <h3 className="font-black text-white text-base">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid sm:grid-cols-3 gap-4">
            {[
              { value: '1.5×', label: 'Rated pressure', sub: 'Every valve hydrostatic tested before dispatch' },
              { value: '100%', label: 'Documentation', sub: 'Material certs, test reports, CoC included with every order' },
              { value: '25 yr', label: 'Field experience', sub: 'Mining, water, oil & gas, chemical, HVAC' },
            ].map(stat => (
              <div key={stat.value} className="bg-slate-800/60 rounded-xl p-5 text-center border border-slate-700">
                <div className="text-2xl font-black text-isa-400 mb-1">{stat.value}</div>
                <div className="text-sm font-bold text-white mb-0.5">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATALOG (Principle #6) ────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Product Range</h2>
            <p className="text-slate-500 mt-1">Technical specifications for independent evaluation — no sales contact required</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-bold text-brand-700 hover:text-brand-800">
            View all specs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product) => {
            const sizeSpec = product.specs.find(s => s.label === 'Size Range')
            const pressureSpec = product.specs.find(s => s.label === 'Pressure Class' || s.label === 'Pressure Rating')
            const badgeBg = product.badgeColor === 'red' ? 'bg-red-600' : product.badgeColor === 'green' ? 'bg-green-600' : 'bg-isa-600'
            return (
              <button key={product.id}
                onClick={() => setModalProduct(product)}
                className="group card p-5 text-left flex flex-col gap-3 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-2xl">{product.icon}</span>
                  {product.badge && (
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white ${badgeBg}`}>NEW</span>
                  )}
                </div>
                <div>
                  <h3 className="font-black text-slate-900 group-hover:text-brand-700 transition-colors">{product.shortName}</h3>
                  <div className="mt-2 space-y-1">
                    {sizeSpec && (
                      <div className="flex gap-1.5 text-xs">
                        <span className="text-slate-400 w-14 flex-shrink-0">Size</span>
                        <span className="font-semibold text-slate-700 truncate">{sizeSpec.value.split(' (')[0]}</span>
                      </div>
                    )}
                    {pressureSpec && (
                      <div className="flex gap-1.5 text-xs">
                        <span className="text-slate-400 w-14 flex-shrink-0">Pressure</span>
                        <span className="font-semibold text-slate-700 truncate">{pressureSpec.value}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-brand-600 font-semibold flex items-center gap-1">
                    <Eye className="w-3 h-3" /> Quick View
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* ── INDUSTRY LANDING PAGES (Principle #5) ─────────────────── */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Industry Solutions</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">Sector-specific valve configurations for your application requirements</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map(ind => (
              <Link key={ind.slug} to={`/industries/${ind.slug}`}
                className="group card p-5 flex flex-col gap-3 hover:shadow-md hover:border-brand-200 transition-all">
                <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{ind.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed flex-1">{ind.description}</p>
                <div className="flex items-center gap-1.5 text-sm font-semibold text-brand-700 group-hover:gap-3 transition-all">
                  View solutions <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASE STUDY (Principle #7) ──────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs font-black text-isa-700 bg-isa-50 border border-isa-200 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Case Study · Mining
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              72% Maintenance Downtime Reduction — Copper Mining, Northern Cape
            </h2>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong>Problem:</strong> Valve failures in the slurry processing system were causing costly unplanned shutdowns every 3 months.
            </p>
            <p className="text-slate-600 leading-relaxed mb-3">
              <strong>Solution:</strong> Custom ceramic-lined knife gate valves with reinforced actuators calibrated specifically for the process parameters.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              <strong>Results after implementation:</strong>
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: TrendingDown, value: '72%', label: 'Less downtime', color: 'text-emerald-600 bg-emerald-50' },
                { icon: Clock, value: '3 → 14 mo', label: 'Valve service life', color: 'text-brand-700 bg-brand-50' },
                { icon: DollarSign, value: 'R1.2M', label: 'Annual parts saving', color: 'text-isa-700 bg-isa-50' },
                { icon: Zap, value: '+8%', label: 'Process efficiency', color: 'text-violet-700 bg-violet-50' },
              ].map(item => (
                <div key={item.label} className={`rounded-xl p-4 flex items-start gap-3 ${item.color.split(' ')[1]}`}>
                  <item.icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${item.color.split(' ')[0]}`} />
                  <div>
                    <div className={`text-xl font-black ${item.color.split(' ')[0]}`}>{item.value}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <Link to="/industries/mining" className="btn-primary">
              Read the full case study <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Principle #12: Social proof quotes */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-5">What our clients say</p>
            {socialProof.map((sp, i) => (
              <div key={i} className="card p-5">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: sp.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-isa-500 fill-isa-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 font-medium leading-relaxed mb-2">"{sp.outcome}"</p>
                <p className="text-xs text-slate-400">{sp.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUALITY (Principle #3 extended) ───────────────────────── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Quality Assurance</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              ISO 9001:2015 certified. Every valve tested to hydrostatic and pneumatic standards at 1.5× rated pressure
              before leaving our facility.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-10">
            {qualitySteps.map(step => (
              <div key={step.title} className="card p-6">
                <div className="w-8 h-8 rounded-full bg-brand-700 text-white flex items-center justify-center font-black text-sm mb-4">{step.n}</div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {certBadges.map(cert => (
              <div key={cert.name} className="flex items-center gap-2 bg-white border border-brand-200 rounded-xl px-4 py-2.5">
                <CheckCircle className="w-4 h-4 text-brand-700" />
                <span className="text-sm font-black text-slate-900">{cert.name}</span>
                <span className="text-xs text-slate-500">— {cert.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AFFILIATE ─────────────────────────────────────────────── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy to-brand-900 rounded-2xl p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-black text-isa-400 bg-white/10 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">Affiliate Programme</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Become a Certified Distributor</h2>
              <p className="text-blue-200 leading-relaxed">Factory-direct training, exclusive territory protection, co-marketing support, and competitive commission on project referrals.</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['Factory-direct training', 'Exclusive territory options', 'Co-marketing materials', 'Priority technical support'].map(b => (
                <div key={b} className="flex items-start gap-2 bg-white/10 rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-isa-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-100">{b}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8">
            <Link to="/rfq" className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-3 rounded-xl transition-colors">
              Enquire about partnership <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA (Principle #4 — minimal friction) ───────────── */}
      <section className="py-16 bg-isa-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to specify the right valve?</h2>
          <p className="text-isa-100 mt-3">Use our 4-question AI selector or submit a simple quote request — no lengthy forms.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link to="/configurator" className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-isa-700 font-black px-6 py-3 rounded-xl transition-colors shadow-sm">
              <Zap className="w-4 h-4" /> AI Valve Selector
            </Link>
            <Link to="/rfq" className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-semibold px-6 py-3 rounded-xl transition-colors">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  )
}

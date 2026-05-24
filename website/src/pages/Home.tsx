import { Link } from 'react-router-dom'
import { ArrowRight, Shield, CheckCircle, TrendingDown, Clock, DollarSign, Zap, Play, Star, ChevronRight } from 'lucide-react'
import { products, industries } from '../data/products'

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

// Principle #6: Scannable product specs for technical buyers
const productHighlights = [
  { slug: 'ball-valve', range: 'DN15–DN600', pressure: 'PN16 / PN40 / ANSI 600' },
  { slug: 'butterfly-valve', range: 'DN50–DN1200', pressure: 'PN10 / PN16' },
  { slug: 'gate-valve', range: 'DN50–DN1000', pressure: 'PN10 / PN16' },
  { slug: 'knife-gate-valve', range: 'DN50–DN600', pressure: 'PN10 / PN16' },
]

const qualitySteps = [
  { n: '1', title: 'Material Verification', desc: 'Spectroscopic analysis confirms exact alloy composition for every critical component.' },
  { n: '2', title: 'Pressure Testing', desc: 'Hydrostatic and pneumatic testing at 1.5× rated pressure before dispatch.' },
  { n: '3', title: 'Performance Validation', desc: 'Automated cycle testing simulates years of service to verify long-term reliability.' },
]

export default function Home() {
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

      {/* ── VIDEO PLACEHOLDER (Principle #2) ──────────────────────── */}
      <section className="py-16 bg-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black text-isa-500 uppercase tracking-widest mb-3">See Our Valves in the Field</p>
          <h2 className="text-2xl font-black text-white mb-4">Watch ceramic-lined knife gate valves in active mining slurry service</h2>
          {/* Replace this div with a real <video> or iframe when footage is available */}
          <div className="relative aspect-video bg-slate-800 rounded-2xl border border-slate-700 flex items-center justify-center cursor-pointer group hover:bg-slate-750 transition-colors overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-isa-500 group-hover:bg-isa-400 flex items-center justify-center transition-colors shadow-xl">
                <Play className="w-7 h-7 text-white ml-1" />
              </div>
              <p className="text-sm text-slate-400">Operations footage coming soon</p>
            </div>
            {/* Placeholder background suggestion */}
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-brand-400 to-isa-600" />
          </div>
          <p className="text-xs text-slate-500 mt-3">Procurement teams and engineers need to see your capabilities. Replace with real facility footage.</p>
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => {
            const highlight = productHighlights[i]
            return (
              <Link key={product.id} to={`/products/${product.slug}`}
                className="group card p-5 flex flex-col gap-3 hover:shadow-lg hover:border-brand-200 hover:-translate-y-0.5 transition-all duration-200">
                <span className="text-2xl">{product.icon}</span>
                <div>
                  <h3 className="font-black text-slate-900 group-hover:text-brand-700 transition-colors">{product.name}</h3>
                  {/* Principle #6: Scannable specs inline on cards */}
                  <div className="mt-2 space-y-1">
                    <div className="flex gap-1.5 text-xs">
                      <span className="text-slate-400 w-16 flex-shrink-0">Size</span>
                      <span className="font-semibold text-slate-700">{highlight?.range}</span>
                    </div>
                    <div className="flex gap-1.5 text-xs">
                      <span className="text-slate-400 w-16 flex-shrink-0">Pressure</span>
                      <span className="font-semibold text-slate-700">{highlight?.pressure}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">View full specs</span>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
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
    </div>
  )
}

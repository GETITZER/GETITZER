import { useParams, Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, AlertTriangle, Shield } from 'lucide-react'
import { industryDetails, products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/Breadcrumb'

export default function IndustryDetail() {
  const { slug } = useParams<{ slug: string }>()
  const industry = slug ? industryDetails[slug] : undefined

  if (!industry) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Industry not found.</p>
        <Link to="/industries" className="text-brand-600 hover:underline text-sm mt-4 inline-block">← All industries</Link>
      </div>
    )
  }

  usePageMeta({
    title: `${industry.name} Valve Solutions — ISA Valve Solutions South Africa`,
    description: industry.description.slice(0, 155),
    canonical: `https://www.isavalvesolutions.com/industries/${industry.slug}`,
  })

  const recommendedProducts = industry.recommendedValves
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as typeof products

  const INDUSTRY_BG: Record<string, string> = {
    'mining':           '/images/branded/isa-brand-mining.jpg',
    'water-treatment':  '/images/branded/isa-brand-waterworks.jpg',
    'oil-gas':          '/images/branded/isa-hero-refinery.jpg',
    'chemical':         '/images/branded/isa-bg-critical-systems.jpg',
    'municipal':        '/images/branded/isa-control-valves-water.jpg',
    'power-generation': '/images/branded/isa-bg-critical-systems.jpg',
    'agriculture':      '/images/branded/isa-bg-flow-control.jpg',
    'food-beverage':    '/images/branded/isa-bg-tech.jpg',
    'pulp-paper':       '/images/branded/isa-bg-mining-aerial.jpg',
  }
  const heroBg = INDUSTRY_BG[slug ?? ''] ?? '/images/branded/isa-bg-valves-row.jpg'

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background image */}
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
        />
        {/* Gradient overlay — left-heavy for text legibility */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.92) 0%, rgba(7,26,45,0.75) 55%, rgba(7,26,45,0.40) 100%)' }} />
        {/* ISA orange top accent */}
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <Breadcrumb
            crumbs={[
              { label: 'Home', to: '/' },
              { label: 'Industries', to: '/industries' },
              { label: industry.name },
            ]}
            className="mb-6 [&_a]:text-slate-400 [&_a:hover]:text-slate-200 [&_span]:text-slate-300"
          />
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{industry.icon}</span>
            <div>
              <p className="text-xs font-black text-isa-400 uppercase tracking-widest mb-1">{industry.name}</p>
              <h1 className="text-3xl sm:text-4xl font-black leading-tight">
                {industry.heroTagline}
              </h1>
            </div>
          </div>
          <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mt-4">
            {industry.description}
          </p>

          {/* Stats row */}
          {industry.stats && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
              {industry.stats.map(stat => (
                <div key={stat.label} className="bg-white/10 rounded-xl p-4">
                  <p className="text-2xl font-black text-isa-400">{stat.value}</p>
                  <p className="text-xs text-slate-300 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">

            {/* Challenges */}
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-isa-600" />
                Common Challenges
              </h2>
              <ul className="space-y-3">
                {industry.challenges.map((challenge, i) => (
                  <li key={i} className="flex items-start gap-3 p-4 bg-isa-50 border border-isa-100 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-isa-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-slate-700 leading-relaxed">{challenge}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Recommended valves */}
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-brand-600" />
                Recommended Valves for {industry.name}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {recommendedProducts.map((product, index) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className="card p-5 group hover:border-brand-300 hover:shadow-md"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{product.icon}</span>
                      <div>
                        {index === 0 && (
                          <span className="text-xs font-black text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full">Top Pick</span>
                        )}
                        <h3 className="font-black text-slate-900 group-hover:text-brand-700 transition-colors">
                          {product.name}
                        </h3>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 mb-3 leading-relaxed">{product.useCase}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {product.specs.slice(4, 6).map(spec => (
                        <div key={spec.label} className="text-xs">
                          <span className="text-slate-400">{spec.label}: </span>
                          <span className="text-slate-700 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-brand-700 mt-3 group-hover:gap-2 transition-all">
                      View specs <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>

            {/* Mining case study — shown only for mining */}
            {slug === 'mining' && (
              <section className="bg-slate-900 rounded-2xl p-8 text-white">
                <p className="text-xs font-black text-isa-400 uppercase tracking-widest mb-3">Case Study — Active Mining Operation</p>
                <h3 className="text-xl font-black mb-3">
                  Ceramic-Lined Knife Gate Valves: 3 Months → 14 Months Service Life
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  A large platinum mine was replacing standard knife gate valves on slurry transfer lines every 3 months — a recurring cost of R300,000+ per replacement cycle including production loss. ISA supplied ceramic-lined knife gate valves rated for abrasive, high-solids slurry. Valve service life extended to 14 months per unit.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: '3 → 14 mo', label: 'Service life extended' },
                    { value: '72%', label: 'Less downtime' },
                    { value: 'R1.2M', label: 'Annual savings' },
                    { value: '+8%', label: 'Process efficiency' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/10 rounded-xl p-3 text-center">
                      <p className="text-lg font-black text-isa-400">{stat.value}</p>
                      <p className="text-xs text-slate-300 mt-0.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* CTA */}
            <div className="card p-6 border-isa-200 bg-isa-50/50">
              <h3 className="font-black text-slate-900 mb-2">Get a quote for {industry.name}</h3>
              <p className="text-sm text-slate-500 mb-4">Describe your application. Our AI qualifies the requirements and our team responds within 24 hours.</p>
              <Link
                to="/rfq"
                className="flex items-center justify-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-black px-5 py-3 rounded-xl transition-colors text-sm w-full"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Certifications */}
            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-brand-600" />
                <h3 className="font-black text-slate-900">Key Certifications</h3>
              </div>
              <ul className="space-y-2">
                {industry.keyCertifications.map(cert => (
                  <li key={cert} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>

            {/* ISO badge */}
            <div className="border border-brand-200 bg-brand-50 rounded-xl p-5">
              <p className="text-xs font-black text-brand-900 mb-1">ISO 9001:2015 Certified</p>
              <p className="text-xs text-brand-800 leading-relaxed">
                All products tested at 1.5× rated pressure. Full documentation and material traceability included.
              </p>
            </div>

            {/* AI selector nudge */}
            <div className="card p-5">
              <p className="text-sm font-bold text-slate-900 mb-2">Not sure which valve to specify?</p>
              <p className="text-sm text-slate-500 mb-4">Answer 4 questions and get an AI recommendation tailored to your application.</p>
              <Link
                to="/configurator"
                className="flex items-center gap-2 text-sm font-bold text-isa-700 hover:text-isa-800"
              >
                Try AI Valve Selector <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

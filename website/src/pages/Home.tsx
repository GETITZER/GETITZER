import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Globe, Wrench, CheckCircle, TrendingDown, Clock, DollarSign, Zap } from 'lucide-react'
import { products, industries } from '../data/products'

const stats = [
  { value: '25+', label: 'Years of expertise' },
  { value: 'DN15–DN1200', label: 'Size range covered' },
  { value: 'ISO 9001:2015', label: 'Quality certified' },
  { value: '6 Industries', label: 'Sectors served' },
]

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality Management' },
  { name: 'API 6D', desc: 'Pipeline Valves' },
  { name: 'SABS', desc: 'South African Standards' },
  { name: 'WRAS', desc: 'Water Regulations' },
]

const qualitySteps = [
  { title: 'Material Verification', desc: 'Spectroscopic analysis confirms exact material composition for critical components.' },
  { title: 'Pressure Testing', desc: 'Hydrostatic and pneumatic testing at 1.5× rated pressure ensures structural integrity.' },
  { title: 'Performance Validation', desc: 'Automated cycle testing simulates years of operation to verify long-term reliability.' },
]

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden py-20 sm:py-28"
        style={{ background: 'linear-gradient(135deg, #0f2744 0%, #1e3a8a 60%, #1d4ed8 100%)' }}
      >
        {/* Geometric accent overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-bold text-white/80 border border-white/20 bg-white/10 px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              <Shield className="w-3 h-3 text-isa-400" /> ISO 9001:2015 Certified · 25 Years Experience
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
              Precision-Engineered{' '}
              <span className="text-isa-400">Valve Solutions</span>{' '}
              for Every Application
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-blue-200 leading-relaxed max-w-2xl">
              From DN15 ball valves to DN1200 butterfly valves — ISA Valve Solutions delivers precision manufacturing,
              rigorous quality testing, and global support for mining, water treatment, oil & gas, and industrial
              applications.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/rfq"
                className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-3 rounded-xl transition-colors shadow-lg text-base"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-medium px-6 py-3 rounded-xl transition-colors text-base"
              >
                View Products
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {certifications.map(cert => (
                <div key={cert.name} className="flex items-center gap-2 bg-white/10 rounded-lg px-3 py-2 border border-white/10">
                  <CheckCircle className="w-4 h-4 text-isa-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-white">{cert.name}</div>
                    <div className="text-[10px] text-blue-300">{cert.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.value} className="text-center">
                <div className="text-2xl sm:text-3xl font-black text-navy">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Product Range</h2>
            <p className="text-slate-500 mt-1">Four valve types engineered for precision and long-term durability</p>
          </div>
          <Link to="/products" className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
            All products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(product => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className="group card p-5 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 hover:border-brand-200"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{product.icon}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{product.name}</h3>
                <p className="text-sm text-isa-600 font-medium mt-0.5">{product.specs.find(s => s.label === 'Size Range')?.value}</p>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed line-clamp-2">{product.tagline}</p>
              <div className="mt-auto pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                {product.industries.slice(0, 2).map(ind => (
                  <span key={ind} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{ind}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Industries */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Globe className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Industry Solutions</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">Specialised valve configurations for the specific demands of each industry</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map(ind => (
              <div key={ind.name} className="card p-5">
                <h3 className="font-bold text-slate-900 mb-2">{ind.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{ind.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {ind.recommendedValves.map(slug => {
                    const p = products.find(pr => pr.id === slug)
                    return p ? (
                      <Link
                        key={slug}
                        to={`/products/${slug}`}
                        className="text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 px-2.5 py-1 rounded-full transition-colors"
                      >
                        {p.shortName}
                      </Link>
                    ) : null
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold text-isa-700 bg-isa-50 border border-isa-200 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
              Case Study
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4">
              72% Reduction in Maintenance Downtime — Mining Operation
            </h2>
            <p className="text-slate-500 leading-relaxed mb-6">
              A large copper mining operation in Northern Cape was experiencing frequent valve failures in their slurry
              processing system, resulting in costly production interruptions. Our engineering team implemented
              custom ceramic-lined knife gate valves with reinforced actuators calibrated for their specific process
              parameters.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: TrendingDown, value: '72%', label: 'Reduction in downtime', color: 'text-emerald-600 bg-emerald-50' },
                { icon: Clock, value: '3 → 14 mo', label: 'Valve service life', color: 'text-blue-600 bg-blue-50' },
                { icon: DollarSign, value: 'R1.2M', label: 'Annual parts saving', color: 'text-isa-600 bg-isa-50' },
                { icon: Zap, value: '+8%', label: 'Process efficiency', color: 'text-violet-600 bg-violet-50' },
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

            <Link to="/rfq" className="btn-primary">
              Discuss your application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-navy to-brand-900 rounded-2xl p-8 text-white">
            <Wrench className="w-8 h-8 text-isa-400 mb-4" />
            <h3 className="text-xl font-bold mb-2">Custom Valve Engineering</h3>
            <p className="text-blue-200 text-sm leading-relaxed mb-6">
              Standard sizes don't always fit challenging applications. Our engineering team provides custom valve design,
              ceramic lining, and specialised actuator calibration for extreme process conditions.
            </p>
            <ul className="space-y-3">
              {['Ceramic-lined knife gate for abrasive slurry', 'Custom size ranges beyond catalogue specifications', 'Specialised actuator configurations', 'Full documentation and traceability package'].map(item => (
                <li key={item} className="flex items-start gap-2 text-sm text-blue-100">
                  <CheckCircle className="w-4 h-4 text-isa-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Shield className="w-8 h-8 text-brand-600 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Quality Assurance</h2>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
              Every valve undergoes rigorous testing before leaving our facilities. Our quality management system is
              certified to ISO 9001:2015 with additional certifications for high-risk applications.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {qualitySteps.map((step, i) => (
              <div key={step.title} className="card p-6">
                <div className="w-8 h-8 rounded-full bg-brand-600 text-white flex items-center justify-center font-black text-sm mb-4">
                  {i + 1}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {certifications.map(cert => (
              <div key={cert.name} className="flex items-center gap-2 bg-white border border-brand-200 rounded-xl px-4 py-2.5">
                <CheckCircle className="w-4 h-4 text-brand-600" />
                <span className="text-sm font-bold text-slate-900">{cert.name}</span>
                <span className="text-xs text-slate-500">— {cert.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-navy to-brand-900 rounded-2xl p-8 sm:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-block text-xs font-bold text-isa-400 bg-white/10 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                Affiliate Programme
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-4">Become a Certified Distributor</h2>
              <p className="text-blue-200 leading-relaxed">
                Join our global partner network as a certified distributor or service partner. Our affiliate programme
                provides technical training, marketing support, and preferential pricing.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Factory-direct training for sales & technical staff',
                'Exclusive territory protection options',
                'Co-marketing opportunities & materials',
                'Priority technical support & application engineering',
              ].map(benefit => (
                <div key={benefit} className="flex items-start gap-2 bg-white/10 rounded-xl p-3">
                  <CheckCircle className="w-4 h-4 text-isa-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-blue-100">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-3 rounded-xl transition-colors"
            >
              Enquire about partnership <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-isa-600">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-black text-white">Ready to specify the right valve?</h2>
          <p className="text-isa-100 mt-3 text-lg">
            Use our AI valve selector or submit an RFQ for a qualified engineering response.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-isa-700 font-bold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-white/40 hover:border-white text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

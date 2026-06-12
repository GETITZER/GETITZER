import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { industryList } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Industries() {
  usePageMeta({
    title: 'Industrial Valve Solutions by Industry — ISA Valve Solutions South Africa',
    description: 'ISA Valve Solutions provides certified valves for mining, water treatment, oil & gas, chemical processing, HVAC, and pulp & paper industries in South Africa.',
    canonical: 'https://www.isavalvesolutions.com/industries',
  })
  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <img
          src="/images/branded/isa-bg-critical-systems.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.35 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.92) 0%, rgba(7,26,45,0.70) 60%, rgba(7,26,45,0.35) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <p className="text-xs font-bold text-isa-400 uppercase tracking-widest mb-3">Industry Solutions</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Valves engineered<br className="hidden sm:block" /> for your industry
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Every industry has unique media, pressure, and compliance requirements. Browse industry-specific valve guidance, recommended products, and technical certifications.
          </p>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Industry grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {industryList.map(industry => (
          <Link
            key={industry.slug}
            to={`/industries/${industry.slug}`}
            className="card p-6 group block hover:border-brand-300 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{industry.icon}</span>
              <div>
                <h2 className="font-black text-slate-900 text-lg group-hover:text-brand-700 transition-colors">
                  {industry.name}
                </h2>
              </div>
            </div>

            <p className="text-sm text-isa-700 font-semibold mb-3 leading-snug">
              "{industry.heroTagline}"
            </p>

            <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">
              {industry.description}
            </p>

            {industry.stats && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                {industry.stats.slice(0, 2).map(stat => (
                  <div key={stat.label} className="bg-slate-50 rounded-lg p-2.5">
                    <p className="text-base font-black text-brand-700">{stat.value}</p>
                    <p className="text-xs text-slate-500 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center gap-1.5 text-sm font-bold text-brand-700 group-hover:gap-2.5 transition-all">
              View solutions <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>

      {/* CTA strip */}
      <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-black text-white mb-1">Not sure which valve your application needs?</h3>
          <p className="text-slate-400 text-sm">Answer 4 questions. Get an AI recommendation in seconds.</p>
        </div>
        <Link
          to="/configurator"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-black px-6 py-3 rounded-xl transition-colors"
        >
          Try AI Valve Selector <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
    </div>
  )
}

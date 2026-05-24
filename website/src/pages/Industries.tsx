import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { industryList } from '../data/products'

export default function Industries() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Industry Solutions</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
          Valves engineered for your industry
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Every industry has unique media, pressure, and compliance requirements. Browse industry-specific valve guidance, recommended products, and technical certifications.
        </p>
      </div>

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
  )
}

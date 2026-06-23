import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import type { Instrument } from '../data/instrumentation'

// Shared product card for the Controls & Instrumentation pages (level, flow, …).
export default function InstrumentCard({ instrument }: { instrument: Instrument }) {
  return (
    <div className="group card overflow-hidden flex flex-col hover:border-isa-300 hover:shadow-lg transition-all duration-200">
      {/* Image */}
      <div className="relative bg-white border-b border-slate-100 h-52 flex items-center justify-center p-6">
        <img
          src={instrument.image}
          alt={instrument.imageAlt}
          loading="lazy"
          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {instrument.featured && (
          <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-isa-500 text-white">
            Featured
          </span>
        )}
        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-900/80 text-white backdrop-blur">
          {instrument.principle}
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-black text-lg text-slate-900 group-hover:text-isa-600 transition-colors">{instrument.name}</h3>
        <p className="text-sm font-semibold text-isa-600 mt-0.5 mb-2">{instrument.tagline}</p>
        <p className="text-sm text-slate-500 leading-relaxed mb-4">{instrument.description}</p>

        {/* Specs */}
        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4 mt-auto">
          {instrument.specs.slice(0, 4).map(spec => (
            <div key={spec.label}>
              <dt className="text-[11px] uppercase tracking-wide text-slate-400 font-semibold">{spec.label}</dt>
              <dd className="text-xs font-semibold text-slate-700">{spec.value}</dd>
            </div>
          ))}
        </dl>

        {/* Applications */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {instrument.applications.slice(0, 3).map(app => (
            <span key={app} className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
              {app}
            </span>
          ))}
        </div>

        <Link
          to={`/rfq?product=${encodeURIComponent(instrument.name)}`}
          className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-isa-600 hover:gap-2.5 transition-all"
        >
          Request a Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

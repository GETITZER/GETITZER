import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Waves, Activity, Thermometer, CheckCircle2 } from 'lucide-react'
import { instrumentCategories } from '../data/instrumentation'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/Breadcrumb'
import type { Instrument } from '../data/instrumentation'

const categoryIcon: Record<string, typeof Gauge> = {
  level: Waves,
  flow: Activity,
  temperature: Thermometer,
}

function InstrumentCard({ instrument }: { instrument: Instrument }) {
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

export default function ControlsInstrumentation() {
  usePageMeta(
    'Level Measurement & Control Instrumentation',
    'Level transmitters, point-level switches, float valves and process controllers from ISA Valve Solutions. Reliable level, flow and temperature instrumentation for water, chemical and process plants.',
    'https://www.isavalvesolutions.com/controls-instrumentation/level',
  )

  return (
    <div>
      {/* ── Hero ── */}
      <section className="relative bg-dark-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-700" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <Breadcrumb
            crumbs={[
              { label: 'Home', to: '/' },
              { label: 'Controls & Instrumentation', to: '/controls-instrumentation/level' },
              { label: 'Level' },
            ]}
            className="!text-slate-400 mb-6"
          />
          <span className="section-label !text-isa-400">Controls &amp; Instrumentation</span>
          <h1 className="text-4xl sm:text-5xl font-black leading-tight max-w-3xl">
            Level Measurement &amp; Control
          </h1>
          <p className="text-lg text-slate-300 mt-5 max-w-2xl leading-relaxed">
            Continuous level transmitters, point-level switches, mechanical float control and process
            controllers — engineered for reliable level detection across water, chemical, slurry and
            process applications. Backed by ISA's engineering support and Africa-wide supply.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-8">
            {[
              'Continuous & point-level',
              'Contact & non-contact',
              'Process control loops',
            ].map(item => (
              <span key={item} className="flex items-center gap-2 text-sm font-medium text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-isa-500" /> {item}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-9">
            <Link to="/rfq" className="btn-primary">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-white/20 hover:border-white/40 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              <Gauge className="w-4 h-4" /> View Valve Range
            </Link>
          </div>
        </div>
      </section>

      {/* ── Category sections ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 space-y-16">
        {instrumentCategories.map(category => {
          const Icon = categoryIcon[category.id] ?? Gauge
          return (
            <section key={category.id} id={category.id} className="scroll-mt-32">
              <div className="flex items-start gap-4 mb-8 max-w-3xl">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-isa-50 border border-isa-100 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-isa-600" />
                </div>
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900">{category.name}</h2>
                  <p className="text-slate-500 mt-2 leading-relaxed">{category.description}</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.instruments.map(instrument => (
                  <InstrumentCard key={instrument.id} instrument={instrument} />
                ))}
              </div>
            </section>
          )
        })}
      </div>

      {/* ── CTA ── */}
      <section className="bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="bg-gradient-to-br from-navy to-dark-700 rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
              Need help specifying the right instrument?
            </h2>
            <p className="text-slate-300 max-w-2xl mx-auto mb-7 leading-relaxed">
              Tell us your medium, vessel and control requirements. Our engineering team will match the
              correct level, flow or temperature instrumentation and supply it anywhere in Africa.
            </p>
            <Link to="/rfq" className="btn-primary !px-6">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

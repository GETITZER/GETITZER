import { Link } from 'react-router-dom'
import { ArrowRight, Gauge, Waves, Activity, Thermometer, CheckCircle2 } from 'lucide-react'
import { instrumentCategories } from '../data/instrumentation'
import { usePageMeta } from '../hooks/usePageMeta'
import Breadcrumb from '../components/Breadcrumb'
import InstrumentCard from '../components/InstrumentCard'
import InstrumentationTabs from '../components/InstrumentationTabs'

const categoryIcon: Record<string, typeof Gauge> = {
  level: Waves,
  flow: Activity,
  temperature: Thermometer,
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

          <InstrumentationTabs />
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

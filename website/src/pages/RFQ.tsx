// Principle #4: Minimal fields — 5 fields max for maximum conversion
import { useState } from 'react'
import { Send, Loader2, CheckCircle, Sparkles, ArrowRight, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'
import { usePageMeta } from '../hooks/usePageMeta'

interface SimpleRFQ {
  name: string
  email: string
  company: string
  application: string
  valveType: string
}

const initialForm: SimpleRFQ = { name: '', email: '', company: '', application: '', valveType: '' }

const valveOptions = [
  'Ball Valve',
  'Butterfly Valve',
  'Gate Valve',
  'Knife Gate Valve',
  'ISA Pinch Valve Series',
  'DXST Slurry KGV',
  'Not sure — recommend one for me',
]

function renderAnalysis(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h3 key={i} className="text-sm font-black text-slate-900 mt-5 mb-1.5 first:mt-0">{line.replace('## ', '')}</h3>
    if (line.startsWith('- ')) return <li key={i} className="text-sm text-slate-600 ml-4 mb-1 list-disc">{line.replace('- ', '')}</li>
    if (line.trim()) return <p key={i} className="text-sm text-slate-600 mb-2 leading-relaxed">{line}</p>
    return null
  })
}

export default function RFQ() {
  usePageMeta({
    title: 'Request a Valve Quote — ISA Valve Solutions South Africa',
    description: 'Get a fast quote for industrial valves in South Africa. Ball valves, butterfly valves, gate valves, knife gate valves, and pinch valves. ISO 9001:2015 certified supplier.',
    canonical: 'https://www.isavalvesolutions.com/rfq',
  })
  const [form, setForm] = useState<SimpleRFQ>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const update = (f: keyof SimpleRFQ, v: string) => setForm(p => ({ ...p, [f]: v }))
  const isValid = form.name && form.email && form.company && form.application

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setAnalysis(null)
    setError(null)
    try {
      const res = await fetch('/api/rfq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData: form }),
      })
      const data = (await res.json()) as { analysis?: string; error?: string }
      if (data.error) throw new Error(data.error)
      setAnalysis(data.analysis ?? '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <img
          src="/images/branded/isa-bg-critical-systems.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.95) 0%, rgba(7,26,45,0.75) 60%, rgba(7,26,45,0.40) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="text-xs font-bold text-isa-400 uppercase tracking-widest mb-3">AI-Assisted Quotation</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Request a Quote
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl mb-6">
            5 fields. AI extracts your technical requirements and qualifies your application — no lengthy spec sheets to fill out.
          </p>
          <div className="flex flex-wrap gap-5 text-sm font-bold text-slate-300">
            {['ISO 9001:2015 Certified', '24-hour response', 'Full material documentation', 'Tested at 1.5× rated pressure'].map(t => (
              <span key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-isa-500 flex-shrink-0" /> {t}
              </span>
            ))}
          </div>
        </div>
      </div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-xl mb-12">
        <span className="inline-flex items-center gap-2 text-xs font-black text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> AI-Qualified in Seconds
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Request a Quote</h1>
        {/* Principle #4: Explain the minimal form approach */}
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Just 5 fields. Our AI reads your application description and extracts the technical requirements —
          so you don't have to fill in 12 form fields.
        </p>
      </div>

      {/* Not sure which valve? Nudge to configurator */}
      <div className="mb-8 p-4 bg-isa-50 border border-isa-200 rounded-xl flex items-center gap-4">
        <Zap className="w-5 h-5 text-isa-600 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-slate-900">Not sure which valve type you need?</p>
          <p className="text-sm text-slate-500">Answer 4 quick questions and get an AI recommendation first.</p>
        </div>
        <Link to="/configurator" className="flex-shrink-0 inline-flex items-center gap-1.5 bg-isa-600 hover:bg-isa-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
          Try Selector <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid lg:grid-cols-[1fr_300px] gap-10">
        {/* Form — 5 fields only */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700">Full name <span className="text-red-400">*</span></label>
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Smith" required className="field-input" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-bold text-slate-700">Work email <span className="text-red-400">*</span></label>
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@company.com" required className="field-input" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">Company / Organisation <span className="text-red-400">*</span></label>
            <input type="text" value={form.company} onChange={e => update('company', e.target.value)} placeholder="Acme Mining Ltd" required className="field-input" />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">Application description <span className="text-red-400">*</span></label>
            <textarea
              value={form.application}
              onChange={e => update('application', e.target.value)}
              placeholder="Describe what you need: fluid type (water, slurry, chemical…), line size (DN), operating pressure, industry, quantity, and timeline. The more detail you include, the faster we can quote."
              required
              rows={5}
              className="field-input resize-none"
            />
            <p className="text-xs text-slate-400">Include: fluid type · size range (DN) · operating pressure · quantity · timeline</p>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-bold text-slate-700">Preferred valve type <span className="text-slate-400 font-normal">(optional)</span></label>
            <div className="flex flex-wrap gap-2">
              {valveOptions.map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => update('valveType', form.valveType === opt ? '' : opt)}
                  className={`text-sm px-3.5 py-2 rounded-lg border font-medium transition-colors ${
                    form.valveType === opt
                      ? 'bg-brand-600 text-white border-brand-600'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300 bg-white'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black px-8 py-3.5 rounded-xl transition-colors text-base"
          >
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Analysing…</>
              : <><Send className="w-4 h-4" /> Get AI Qualification</>
            }
          </button>

          {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}
        </form>

        {/* Sidebar */}
        <div className="space-y-5">
          {analysis ? (
            <div className="card p-6 border-emerald-200 bg-emerald-50/30">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h2 className="font-black text-slate-900">AI Qualification Report</h2>
              </div>
              <div>{renderAnalysis(analysis)}</div>
              <button onClick={() => { setForm(initialForm); setAnalysis(null) }} className="mt-5 text-sm text-brand-700 hover:text-brand-800 font-semibold">
                Submit another request →
              </button>
            </div>
          ) : (
            <div className="card p-6">
              <Sparkles className="w-6 h-6 text-brand-600 mb-3" />
              <h3 className="font-black text-slate-900 mb-3">AI analyses your submission for:</h3>
              <ul className="space-y-2">
                {['Valve type recommendation', 'Qualification score (1–10)', 'Key technical requirements', 'Missing specification details', 'Recommended next steps'].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* WhatsApp alternative */}
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
              <WhatsAppIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Prefer WhatsApp?</p>
              <p className="text-xs text-slate-500 leading-snug">Send your requirements directly — we respond within the hour during business hours.</p>
            </div>
            <ArrowRight className="w-4 h-4 text-green-600 ml-auto flex-shrink-0 group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="border border-brand-200 bg-brand-50 rounded-xl p-5">
            <p className="text-xs font-black text-brand-900 mb-1">ISO 9001:2015 Certified</p>
            <p className="text-xs text-brand-800 leading-relaxed">All products tested at 1.5× rated pressure. Full documentation and material traceability included with every order.</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

import { useState } from 'react'
import { Send, Loader2, CheckCircle, Sparkles, ChevronDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { RFQFormData } from '../types'

const initialForm: RFQFormData = {
  name: '',
  email: '',
  company: '',
  industry: '',
  valveType: '',
  application: '',
  fluidType: '',
  sizeRange: '',
  pressureClass: '',
  quantity: '',
  timeline: '',
  additionalInfo: '',
}

const industries = ['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical & Petrochemical', 'HVAC', 'Pulp & Paper', 'Other']
const valveTypes = ['Ball Valve', 'Butterfly Valve', 'Gate Valve', 'Knife Gate Valve', 'Not sure — need recommendation']
const timelines = ['Urgent (< 2 weeks)', '1 month', '1–3 months', '3–6 months', '6+ months']
const quantities = ['1–5', '6–20', '21–100', '100+']

function renderAnalysis(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return <h3 key={i} className="text-sm font-bold text-slate-900 mt-5 mb-1.5 first:mt-0">{line.replace('## ', '')}</h3>
    }
    if (line.startsWith('- ')) {
      return <li key={i} className="text-sm text-slate-600 ml-4 mb-1 list-disc">{line.replace('- ', '')}</li>
    }
    if (line.trim()) {
      return <p key={i} className="text-sm text-slate-600 mb-2 leading-relaxed">{line}</p>
    }
    return null
  })
}

export default function RFQ() {
  const [form, setForm] = useState<RFQFormData>(initialForm)
  const [submitting, setSubmitting] = useState(false)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const update = (field: keyof RFQFormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

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

  const isValid = form.name && form.email && form.company && form.application

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-xl mb-12">
        <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
          <Sparkles className="w-3 h-3" /> AI-Powered Qualification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Request a Quote</h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Describe your valve application and get an instant AI qualification assessment. Our team will follow up with a
          detailed engineering proposal.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name *">
              <input type="text" value={form.name} onChange={e => update('name', e.target.value)}
                placeholder="Jane Smith" required className="field-input" />
            </Field>
            <Field label="Work email *">
              <input type="email" value={form.email} onChange={e => update('email', e.target.value)}
                placeholder="jane@company.com" required className="field-input" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company *">
              <input type="text" value={form.company} onChange={e => update('company', e.target.value)}
                placeholder="Acme Mining Ltd" required className="field-input" />
            </Field>
            <Field label="Industry">
              <SelectField value={form.industry} onChange={v => update('industry', v)} options={industries} placeholder="Select industry…" />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Valve type">
              <SelectField value={form.valveType} onChange={v => update('valveType', v)} options={valveTypes} placeholder="Select valve type…" />
            </Field>
            <Field label="Fluid / medium">
              <input type="text" value={form.fluidType} onChange={e => update('fluidType', e.target.value)}
                placeholder="e.g. water, slurry, crude oil…" className="field-input" />
            </Field>
          </div>

          <Field label="Application description *">
            <textarea value={form.application} onChange={e => update('application', e.target.value)}
              placeholder="Describe the system, operating conditions, temperature, and specific requirements…"
              required rows={4} className="field-input resize-none" />
          </Field>

          <div className="grid sm:grid-cols-3 gap-5">
            <Field label="Size range (DN)">
              <input type="text" value={form.sizeRange} onChange={e => update('sizeRange', e.target.value)}
                placeholder="e.g. DN100, DN50–200" className="field-input" />
            </Field>
            <Field label="Pressure class">
              <input type="text" value={form.pressureClass} onChange={e => update('pressureClass', e.target.value)}
                placeholder="e.g. PN16, ANSI 150" className="field-input" />
            </Field>
            <Field label="Quantity">
              <SelectField value={form.quantity} onChange={v => update('quantity', v)} options={quantities} placeholder="Qty range…" />
            </Field>
          </div>

          <Field label="Required timeline">
            <SelectField value={form.timeline} onChange={v => update('timeline', v)} options={timelines} placeholder="Select timeline…" />
          </Field>

          <Field label="Additional requirements">
            <textarea value={form.additionalInfo} onChange={e => update('additionalInfo', e.target.value)}
              placeholder="Certifications needed, special coatings, existing systems, etc."
              rows={2} className="field-input resize-none" />
          </Field>

          <button type="submit" disabled={!isValid || submitting}
            className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-xl transition-colors text-base"
          >
            {submitting
              ? <><Loader2 className="w-4 h-4 animate-spin" /> Analysing…</>
              : <><Send className="w-4 h-4" /> Submit & Get AI Analysis</>
            }
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>
          )}
        </form>

        {/* Sidebar */}
        <div className="space-y-5">
          {analysis ? (
            <div className="card p-6 border-brand-200">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h2 className="font-bold text-slate-900">AI Qualification Report</h2>
              </div>
              <div>{renderAnalysis(analysis)}</div>
              <button
                onClick={() => { setForm(initialForm); setAnalysis(null) }}
                className="mt-5 text-sm text-brand-600 hover:text-brand-700 font-medium"
              >
                Submit another request →
              </button>
            </div>
          ) : (
            <div className="card p-6">
              <Sparkles className="w-6 h-6 text-brand-600 mb-3" />
              <h3 className="font-bold text-slate-900 mb-2">AI analyses your RFQ for:</h3>
              <ul className="space-y-2">
                {[
                  'Valve type recommendation / confirmation',
                  'Lead qualification score (1–10)',
                  'Key technical requirements',
                  'Missing specification details',
                  'Project complexity estimate',
                  'Recommended next steps',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card p-5 bg-slate-50">
            <p className="text-sm font-bold text-slate-900 mb-1.5">Not sure which valve?</p>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Use the AI chat button (bottom-right) to describe your application and get an instant recommendation.
            </p>
            <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-800">
              Browse product range <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="border border-brand-200 bg-brand-50 rounded-xl p-5">
            <p className="text-xs font-bold text-brand-900 mb-1">ISO 9001:2015 Certified</p>
            <p className="text-xs text-brand-700 leading-relaxed">
              All products tested to hydrostatic & pneumatic standards at 1.5× rated pressure. Complete documentation and traceability included.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      {children}
    </div>
  )
}

function SelectField({ value, onChange, options, placeholder }: {
  value: string; onChange: (v: string) => void; options: string[]; placeholder: string
}) {
  return (
    <div className="relative">
      <select value={value} onChange={e => onChange(e.target.value)} className="field-input appearance-none pr-8">
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  )
}

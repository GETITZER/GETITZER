import { useState } from 'react'
import { Send, Loader2, CheckCircle, Sparkles, ChevronDown } from 'lucide-react'
import type { RFQFormData } from '../types'

const initialForm: RFQFormData = {
  name: '',
  email: '',
  company: '',
  industry: '',
  projectDescription: '',
  timeline: '',
  budget: '',
  additionalInfo: '',
}

const industries = [
  'Industrial / Manufacturing',
  'SaaS / Software',
  'B2B Services',
  'E-commerce',
  'Healthcare',
  'Finance',
  'Other',
]

const timelines = ['Less than 1 month', '1–3 months', '3–6 months', '6–12 months', '12+ months']
const budgets = ['Under $5,000', '$5,000–$15,000', '$15,000–$45,000', '$45,000–$100,000', '$100,000+']

function renderAnalysis(text: string) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="text-base font-bold text-slate-900 mt-5 mb-2 first:mt-0">
          {line.replace('## ', '')}
        </h3>
      )
    }
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="text-sm text-slate-600 ml-4 mb-1 list-disc">
          {line.replace('- ', '')}
        </li>
      )
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

  const isValid = form.name && form.email && form.company && form.projectDescription

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-xl mb-12">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full mb-4">
          <Sparkles className="w-3 h-3" /> AI-Powered Qualification
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Request a Quote</h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Describe your project and get an instant AI qualification score with actionable next steps — no wait, no
          back-and-forth.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full name *" required>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="Jane Smith"
                required
                className="field-input"
              />
            </Field>
            <Field label="Work email *" required>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="jane@company.com"
                required
                className="field-input"
              />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Company *" required>
              <input
                type="text"
                value={form.company}
                onChange={e => update('company', e.target.value)}
                placeholder="Acme Corp"
                required
                className="field-input"
              />
            </Field>
            <Field label="Industry">
              <div className="relative">
                <select
                  value={form.industry}
                  onChange={e => update('industry', e.target.value)}
                  className="field-input appearance-none pr-8"
                >
                  <option value="">Select industry…</option>
                  {industries.map(i => <option key={i} value={i}>{i}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </Field>
          </div>

          <Field label="Project description *" required>
            <textarea
              value={form.projectDescription}
              onChange={e => update('projectDescription', e.target.value)}
              placeholder="Describe what you want to build, your target audience, and the main goals…"
              required
              rows={5}
              className="field-input resize-none"
            />
          </Field>

          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Timeline">
              <div className="relative">
                <select
                  value={form.timeline}
                  onChange={e => update('timeline', e.target.value)}
                  className="field-input appearance-none pr-8"
                >
                  <option value="">Select timeline…</option>
                  {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </Field>
            <Field label="Budget range">
              <div className="relative">
                <select
                  value={form.budget}
                  onChange={e => update('budget', e.target.value)}
                  className="field-input appearance-none pr-8"
                >
                  <option value="">Select budget…</option>
                  {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </Field>
          </div>

          <Field label="Anything else?">
            <textarea
              value={form.additionalInfo}
              onChange={e => update('additionalInfo', e.target.value)}
              placeholder="Existing systems to integrate, specific technical requirements, etc."
              rows={3}
              className="field-input resize-none"
            />
          </Field>

          <button
            type="submit"
            disabled={!isValid || submitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 text-base"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Analyzing…
              </>
            ) : (
              <>
                <Send className="w-4 h-4" /> Submit & Get AI Analysis
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}
        </form>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI analysis result */}
          {analysis ? (
            <div className="card p-6 border-brand-200 bg-brand-50/30">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h2 className="font-bold text-slate-900">AI Analysis</h2>
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
              <Sparkles className="w-6 h-6 text-brand-500 mb-3" />
              <h3 className="font-semibold text-slate-900 mb-2">What AI analyzes</h3>
              <ul className="space-y-2">
                {[
                  'Lead qualification score (1–10)',
                  'Key requirements identified',
                  'Recommended next steps',
                  'Missing information',
                  'Project complexity estimate',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="card p-6 bg-slate-50">
            <h3 className="font-semibold text-slate-900 mb-2 text-sm">Not ready for a quote?</h3>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Browse our guides on industrial website design, B2B lead generation, and more.
            </p>
            <a href="/guides" className="text-sm font-medium text-brand-600 hover:text-brand-700">
              Explore guides →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-slate-700">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  )
}

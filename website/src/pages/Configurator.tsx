import { useState } from 'react'
import { Zap, ChevronRight, ChevronLeft, Loader2, ArrowRight, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'

interface Step {
  id: string
  question: string
  hint: string
  options: { label: string; value: string; icon?: string }[]
}

const steps: Step[] = [
  {
    id: 'industry',
    question: 'Which industry are you in?',
    hint: 'This helps us understand your compliance and media requirements.',
    options: [
      { label: 'Mining & Resources', value: 'mining', icon: '⛏️' },
      { label: 'Water Treatment', value: 'water-treatment', icon: '💧' },
      { label: 'Oil & Gas', value: 'oil-gas', icon: '🛢️' },
      { label: 'Chemical & Petrochemical', value: 'chemical', icon: '🧪' },
      { label: 'HVAC & Building Services', value: 'hvac', icon: '🌡️' },
      { label: 'Pulp & Paper', value: 'pulp-paper', icon: '📄' },
    ],
  },
  {
    id: 'fluid',
    question: 'What is the process fluid or media?',
    hint: 'The media type drives material selection and sealing requirements.',
    options: [
      { label: 'Clean water / water supply', value: 'clean-water' },
      { label: 'Slurry or abrasive media', value: 'slurry' },
      { label: 'Chemical / corrosive fluid', value: 'chemical' },
      { label: 'Hydrocarbons (oil, gas, fuel)', value: 'hydrocarbon' },
      { label: 'Fibrous / viscous media', value: 'fibrous' },
      { label: 'Steam or high-temperature gas', value: 'steam' },
    ],
  },
  {
    id: 'size',
    question: 'What line size are you working with?',
    hint: 'Nominal bore (DN) determines which valve types are practical.',
    options: [
      { label: 'Small bore DN15–DN50', value: 'small' },
      { label: 'Medium bore DN50–DN200', value: 'medium' },
      { label: 'Large bore DN200–DN600', value: 'large' },
      { label: 'Extra large DN600+', value: 'xlarge' },
    ],
  },
  {
    id: 'pressure',
    question: 'What is the operating pressure class?',
    hint: 'Pressure class eliminates valve types that cannot meet the rating.',
    options: [
      { label: 'Low pressure PN10 / PN16', value: 'low' },
      { label: 'Medium pressure PN40 / ANSI 150', value: 'medium' },
      { label: 'High pressure ANSI 300–600', value: 'high' },
      { label: 'Not sure', value: 'unknown' },
    ],
  },
]

interface Answers {
  industry?: string
  fluid?: string
  size?: string
  pressure?: string
}

function buildPrompt(answers: Answers): string {
  return `You are an expert valve selection engineer at ISA Valve Solutions & Industrial Supplies.

A customer has answered 4 questions in the valve selector:
- Industry: ${answers.industry ?? 'not specified'}
- Process fluid/media: ${answers.fluid ?? 'not specified'}
- Line size: ${answers.size ?? 'not specified'}
- Pressure class: ${answers.pressure ?? 'not specified'}

Our product range:
1. Ball Valve — DN15–DN600, PN16–ANSI 600. Quarter-turn, full-bore, excellent for clean fluids, chemicals, and hydrocarbons. API 6D certified.
2. Butterfly Valve — DN50–DN1200, PN10/PN16. Compact, fast quarter-turn, ideal for large-bore water, HVAC, and fire protection systems.
3. Gate Valve — DN50–DN1000, PN10/PN16. Full-bore isolation, minimal pressure drop, clean water and HVAC service.
4. Knife Gate Valve — DN50–DN600, PN10/PN16. Slide-gate for slurry, viscous, abrasive, and fibrous media. Ceramic-lined options for extended life.
5. ISA Pinch Valve Series — PN16, ISO 5208 Grade A zero leakage. Full-bore elastomeric sleeve valve for coarse ore, raw gravel, thickener underflow, tailings lines, CIL/CIP circuits. 4 sleeve grades: ISA-Flex (abrasion), ISA-Extrem (high-temp), ISA-Shield (UV/ozone), ISA-Chem (chemical).
6. DXST Slurry KGV — DN25–DN300, PN6–PN20. Natural rubber lined knife gate valve with 466% longer life. Proven 3→14 month life extension in copper mining thickener underflow. For extreme abrasion and dense slurry.

Based on the answers, provide a structured recommendation using exactly this format:

## Recommended Valve
[Valve name and one sentence on why it matches their specific application]

## Why This Valve
- [Key reason 1 — reference the specific fluid/industry/size]
- [Key reason 2 — material or sealing advantage]
- [Key reason 3 — relevant certification or standard]

## Alternative Option
[Alternative valve name if applicable, or "None" if the match is definitive]
[One sentence on when they might choose the alternative]

## Next Steps
- [Action 1 — what spec detail to confirm]
- [Action 2 — actuation or material option to consider]

Keep the entire response under 200 words. Be direct and specific — reference their actual answers.`
}

export default function Configurator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState<string | null>(null)
  const [recommendedSlug, setRecommendedSlug] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const step = steps[currentStep]
  const totalSteps = steps.length
  const progress = ((currentStep) / totalSteps) * 100

  const selectOption = (value: string) => {
    setAnswers(prev => ({ ...prev, [step.id]: value }))
  }

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(s => s + 1)
    } else {
      submit()
    }
  }

  const goBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1)
  }

  const reset = () => {
    setCurrentStep(0)
    setAnswers({})
    setRecommendation(null)
    setRecommendedSlug(null)
    setError(null)
  }

  const extractSlug = (text: string): string | null => {
    if (/pinch\s*valve|ISA-Flex|ISA-Extrem|ISA-Shield|ISA-Chem/i.test(text)) return 'pinch-valve'
    if (/DXST|slurry\s*KGV|rubber.lined/i.test(text)) return 'dxst-kgv'
    if (/knife\s*gate/i.test(text)) return 'knife-gate-valve'
    if (/butterfly/i.test(text)) return 'butterfly-valve'
    if (/\bgate\b/i.test(text)) return 'gate-valve'
    if (/ball/i.test(text)) return 'ball-valve'
    return null
  }

  const submit = async () => {
    setLoading(true)
    setError(null)
    setRecommendation(null)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: 'Please recommend a valve for my application.' }],
          systemPrompt: buildPrompt(answers),
        }),
      })
      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let full = ''
      if (!reader) throw new Error('No stream')
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        for (const line of chunk.split('\n')) {
          if (!line.startsWith('data: ')) continue
          try {
            const parsed = JSON.parse(line.slice(6))
            if (parsed.text) {
              full += parsed.text
              setRecommendation(full)
            }
          } catch { /* skip */ }
        }
      }
      setRecommendedSlug(extractSlug(full))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  function renderRecommendation(text: string) {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('## ')) return <h3 key={i} className="text-sm font-black text-slate-900 mt-5 mb-1.5 first:mt-0">{line.replace('## ', '')}</h3>
      if (line.startsWith('- ')) return <li key={i} className="text-sm text-slate-600 ml-4 mb-1 list-disc">{line.replace('- ', '')}</li>
      if (line.trim()) return <p key={i} className="text-sm text-slate-600 mb-2 leading-relaxed">{line}</p>
      return null
    })
  }

  const recommendedProduct = recommendedSlug ? products.find(p => p.slug === recommendedSlug) : null
  const currentAnswer = answers[step?.id as keyof Answers]

  if (recommendation !== null || loading) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 text-xs font-black text-isa-700 bg-isa-50 border border-isa-200 px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider">
            <Zap className="w-3 h-3" /> AI Valve Recommendation
          </span>
          <h1 className="text-3xl font-black text-slate-900">Your Valve Match</h1>
        </div>

        {loading && !recommendation && (
          <div className="flex items-center gap-3 text-slate-500 py-12">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Analysing your requirements…</span>
          </div>
        )}

        {recommendation && (
          <div className="space-y-6">
            {recommendedProduct && (
              <div className="card p-6 border-brand-200 bg-brand-50/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{recommendedProduct.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-brand-700 uppercase tracking-wider">Top Match</p>
                    <h2 className="text-xl font-black text-slate-900">{recommendedProduct.name}</h2>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-4">{recommendedProduct.tagline}</p>
                <div className="flex gap-3">
                  <Link to={`/products/${recommendedProduct.slug}`} className="btn-secondary text-sm">
                    View Specs
                  </Link>
                  <Link
                    to={`/rfq?valve=${recommendedProduct.slug}`}
                    className="inline-flex items-center gap-1.5 bg-isa-600 hover:bg-isa-700 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
                  >
                    Get a Quote <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            <div className="card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900">AI Analysis</h3>
              </div>
              <div>{renderRecommendation(recommendation)}</div>
            </div>

            {error && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3">{error}</div>}

            <button onClick={reset} className="text-sm text-brand-700 hover:text-brand-800 font-semibold">
              ← Start over
            </button>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <img
          src="/images/branded/isa-bg-flow-control.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-right sm:object-center"
          style={{ opacity: 0.28 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.95) 0%, rgba(7,26,45,0.70) 60%, rgba(7,26,45,0.35) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="text-xs font-bold text-isa-400 uppercase tracking-widest mb-3">AI Valve Selector</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Find the right valve<br className="hidden sm:block" /> in 4 questions
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
            Answer quickly — our AI analyses your industry, media, size and pressure to recommend the correct valve family and spec.
          </p>
        </div>
      </div>

    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
          <span>Step {currentStep + 1} of {totalSteps}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-isa-600 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h2 className="text-xl font-black text-slate-900 mb-1">{step.question}</h2>
        <p className="text-sm text-slate-500">{step.hint}</p>
      </div>

      {/* Options */}
      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {step.options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => selectOption(opt.value)}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${
              currentAnswer === opt.value
                ? 'border-brand-600 bg-brand-50 text-brand-900'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {opt.icon && <span className="text-xl flex-shrink-0">{opt.icon}</span>}
            <span className="text-sm font-semibold">{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Nav */}
      <div className="flex items-center gap-4">
        {currentStep > 0 && (
          <button onClick={goBack} className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 font-medium">
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
        )}
        <button
          onClick={goNext}
          disabled={!currentAnswer}
          className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-black px-6 py-3 rounded-xl transition-colors"
        >
          {currentStep < totalSteps - 1 ? (
            <>Next <ChevronRight className="w-4 h-4" /></>
          ) : (
            <>Get Recommendation <Zap className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
    </div>
  )
}

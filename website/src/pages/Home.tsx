import { Link } from 'react-router-dom'
import { ArrowRight, Search, MessageCircle, Sparkles, FileText, TrendingUp, Users, Zap } from 'lucide-react'
import GuideCard from '../components/GuideCard'
import { guides } from '../data/guides'

const stats = [
  { value: '2.2%', label: 'Avg industrial conversion rate' },
  { value: '70%', label: 'Buyer journey before first contact' },
  { value: '17%', label: 'Higher conversion with CPQ tools' },
  { value: '40%', label: 'More deals with interactive demos' },
]

const aiFeatures = [
  {
    icon: MessageCircle,
    title: 'AI Chat Assistant',
    description:
      'Ask any question about a guide or your project. Get instant, context-aware answers powered by Claude.',
    color: 'bg-violet-100 text-violet-600',
  },
  {
    icon: Search,
    title: 'AI-Powered Search',
    description:
      'Natural language search across all guides. Press ⌘K and describe what you need — AI finds the most relevant content.',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Sparkles,
    title: 'Content Generator',
    description:
      'Generate expert-quality guide sections on any business topic with a single click, streamed in real time.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: FileText,
    title: 'RFQ AI Helper',
    description:
      'Submit your project requirements and receive an instant AI lead qualification score with actionable next steps.',
    color: 'bg-amber-100 text-amber-600',
  },
]

export default function Home() {
  const featuredGuides = guides.slice(0, 3)

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-20 sm:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-brand-100/40 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full mb-6">
              <Zap className="w-3 h-3" /> Powered by Claude AI
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-tight tracking-tight">
              Expert guides with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-violet-600">
                AI built in
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl">
              Discover conversion-focused guides for industrial, SaaS, and B2B websites. Chat with AI, search with
              natural language, and generate custom content — all in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/guides" className="btn-primary text-base px-6 py-3 shadow-sm">
                Explore guides
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/rfq" className="btn-secondary text-base px-6 py-3">
                Get a quote
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              {['Free to use', 'Claude AI integrated', '4 AI features'].map(item => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(stat => (
              <div key={stat.value} className="text-center">
                <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured guides */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Guides</h2>
            <p className="text-slate-500 mt-1">Conversion-focused insights for digital professionals</p>
          </div>
          <Link to="/guides" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredGuides.map(guide => (
            <GuideCard key={guide.id} guide={guide} featured />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link to="/guides" className="btn-secondary">
            View all guides <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* AI Features */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3 h-3" /> AI Features
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Everything powered by Claude</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto">
              Four integrated AI capabilities that make researching, writing, and qualifying projects faster than ever.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiFeatures.map(feature => (
              <div key={feature.title} className="card p-6 flex flex-col gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${feature.color}`}>
                  <feature.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{feature.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: TrendingUp, stat: '2–5%', label: 'Conversion rate potential', sub: 'vs 2.2% industry baseline' },
            { icon: Users, stat: '67%', label: 'B2B buyers rely on content', sub: 'before talking to sales' },
            { icon: Zap, stat: '17%', label: 'Higher lead conversion', sub: 'with CPQ / configurator tools' },
          ].map(item => (
            <div key={item.stat} className="flex items-start gap-4 p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-2xl font-black text-slate-900">{item.stat}</div>
                <div className="text-sm font-medium text-slate-700 mt-0.5">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white">Ready to build something great?</h2>
          <p className="text-brand-200 mt-4 text-lg">
            Submit your project requirements and get an AI-powered qualification in seconds.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-700 font-semibold px-6 py-3 rounded-xl transition-colors shadow-sm"
            >
              Request a quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/guides"
              className="inline-flex items-center gap-2 border border-brand-400 hover:border-white text-white font-medium px-6 py-3 rounded-xl transition-colors"
            >
              Browse guides
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

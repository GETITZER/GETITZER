import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Clock, ArrowLeft, Sparkles, Loader2, ChevronRight } from 'lucide-react'
import TableOfContents from '../components/TableOfContents'
import GuideCard from '../components/GuideCard'
import { getGuide, getRelatedGuides } from '../data/guides'
import { streamGenerate } from '../hooks/useChat'

export default function GuideDetail() {
  const { slug } = useParams<{ slug: string }>()
  const guide = getGuide(slug ?? '')
  const [generatedContent, setGeneratedContent] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  if (!guide) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Guide not found</h1>
        <Link to="/guides" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to guides
        </Link>
      </div>
    )
  }

  const related = getRelatedGuides(guide)

  const handleGenerate = async () => {
    setGenerating(true)
    setGeneratedContent('')
    setGenError(null)
    try {
      await streamGenerate(
        {
          topic: guide.title,
          sectionTitle: 'Advanced Insights & Emerging Trends',
          context: guide.sections[0]?.content,
        },
        chunk => setGeneratedContent(prev => prev + chunk),
      )
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/guides" className="hover:text-slate-600 transition-colors">Guides</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-600 font-medium truncate max-w-xs">{guide.title}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[240px_1fr_280px] lg:gap-10 xl:gap-14">
        {/* Left: TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <TableOfContents sections={guide.sections} />
          </div>
        </aside>

        {/* Center: Article */}
        <article className="min-w-0">
          {/* Header */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-xs font-semibold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">
                {guide.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-slate-400">
                <Clock className="w-3 h-3" /> {guide.readTime}
              </span>
              <span className="text-xs text-slate-400">{guide.publishedAt}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">{guide.title}</h1>
            <p className="mt-4 text-lg text-slate-500 leading-relaxed">{guide.excerpt}</p>

            <div className="flex flex-wrap gap-1.5 mt-5">
              {guide.tags.map(tag => (
                <span key={tag} className="text-xs text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {/* Sections */}
          <div className="prose-guide">
            {guide.sections.map(section => (
              <section key={section.id} id={section.id} className="scroll-mt-24 mb-10">
                <h2>{section.title}</h2>
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              </section>
            ))}
          </div>

          {/* AI Content Generator */}
          <div className="mt-12 border border-dashed border-brand-300 bg-brand-50/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">AI Content Generator</h3>
                <p className="text-xs text-slate-500">Generate a new expert section for this guide</p>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={generating}
              className="btn-primary text-sm disabled:opacity-60"
            >
              {generating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generate: Advanced Insights
                </>
              )}
            </button>

            {genError && (
              <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{genError}</p>
            )}

            {generatedContent && (
              <div className="mt-4 pt-4 border-t border-brand-200">
                <h4 className="font-semibold text-slate-900 mb-3 text-sm">Advanced Insights & Emerging Trends</h4>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {generatedContent}
                  {generating && <span className="cursor-blink" />}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Right: Guide info sidebar */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-6">
            {/* Article meta */}
            <div className="card p-5 space-y-3">
              <h3 className="font-semibold text-slate-900 text-sm">About this guide</h3>
              <div className="text-sm text-slate-600 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-400">Author</span>
                  <span className="font-medium">{guide.author}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Published</span>
                  <span>{guide.publishedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Read time</span>
                  <span>{guide.readTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sections</span>
                  <span>{guide.sections.length}</span>
                </div>
              </div>
            </div>

            {/* AI tip */}
            <div className="bg-gradient-to-br from-brand-600 to-brand-700 rounded-xl p-5 text-white">
              <Sparkles className="w-5 h-5 mb-2 text-brand-200" />
              <p className="text-sm font-semibold mb-1">Ask the AI assistant</p>
              <p className="text-xs text-brand-200 leading-relaxed">
                Have questions about this guide? Click the chat button in the bottom-right corner.
              </p>
            </div>

            {/* CTA */}
            <div className="card p-5">
              <p className="text-sm font-semibold text-slate-900 mb-2">Ready to build?</p>
              <p className="text-xs text-slate-500 mb-4">Submit your project requirements and get an AI-powered analysis.</p>
              <Link to="/rfq" className="btn-primary text-sm w-full justify-center">
                Get a quote
              </Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Related guides */}
      {related.length > 0 && (
        <section className="mt-20 pt-10 border-t border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Related Guides</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map(g => (
              <GuideCard key={g.id} guide={g} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

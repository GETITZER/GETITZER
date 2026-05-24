import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Clock, Loader2, Sparkles, Copy, CheckCheck, ArrowRight } from 'lucide-react'
import { blogSeeds } from './Blog'
import { blogContent } from '../data/blogContent'
import { usePageMeta } from '../hooks/usePageMeta'
import SchemaMarkup from '../components/SchemaMarkup'

const CACHE_KEY = (slug: string) => `isa-blog-${slug}`

async function streamBlogPost(topic: string, keywords: string, onChunk: (t: string) => void): Promise<void> {
  const res = await fetch('/api/seo/blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, keywords }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const parts = buf.split('\n\n')
    buf = parts.pop() ?? ''
    for (const part of parts) {
      if (!part.startsWith('data: ')) continue
      try {
        const d = JSON.parse(part.slice(6)) as { text?: string; done?: boolean }
        if (d.done) return
        if (d.text) onChunk(d.text)
      } catch { /* skip */ }
    }
  }
}

function ArticleRenderer({ text, streaming }: { text: string; streaming: boolean }) {
  return (
    <article className="prose-article">
      {text.split('\n').map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-4" />
        if (line.startsWith('META_TITLE: ') || line.startsWith('META_DESC: ')) return null
        if (line.startsWith('# ')) return <h1 key={i} className="text-3xl sm:text-4xl font-black text-slate-900 mb-6 leading-tight">{line.slice(2)}</h1>
        if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-slate-900 mt-10 mb-3 first:mt-0">{line.slice(3)}</h2>
        if (line.startsWith('**Q:') || (line.startsWith('**Q') && line.includes('**'))) {
          return <p key={i} className="font-bold text-slate-900 mt-6 mb-2 text-base">{line.replace(/\*\*/g, '')}</p>
        }
        if (line.startsWith('A: ')) return <p key={i} className="text-slate-600 ml-4 mb-4 leading-relaxed border-l-2 border-brand-200 pl-4 py-1">{line.slice(3)}</p>
        if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-slate-700 ml-6 mb-2 list-disc leading-relaxed">{line.slice(2)}</li>
        return <p key={i} className="text-slate-700 leading-relaxed mb-4 text-[15px]">{line}</p>
      })}
      {streaming && <span className="inline-block w-2 h-5 bg-brand-500 animate-pulse rounded-sm ml-1" />}
    </article>
  )
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const seed = blogSeeds.find(s => s.slug === slug)
  const [content, setContent] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [copied, setCopied] = useState(false)
  const startedRef = useRef(false)

  usePageMeta(
    seed?.title ?? 'Blog',
    seed?.excerpt,
  )

  useEffect(() => {
    if (!seed || startedRef.current) return
    startedRef.current = true

    const cached = localStorage.getItem(CACHE_KEY(seed.slug))
    if (cached) {
      setContent(cached)
      setGenerated(true)
      return
    }

    setStreaming(true)
    let full = ''
    streamBlogPost(seed.title, seed.keywords, chunk => {
      full += chunk
      setContent(prev => prev + chunk)
    }).then(() => {
      if (full.trim()) {
        setGenerated(true)
        localStorage.setItem(CACHE_KEY(seed.slug), full)
      } else {
        const fallback = blogContent[seed.slug]
        if (fallback) {
          setContent(fallback)
          setGenerated(true)
        }
      }
    }).catch(() => {
      const fallback = blogContent[seed.slug]
      if (fallback) {
        setContent(fallback)
        setGenerated(true)
      } else {
        setContent('Article content is not available. Please check that ANTHROPIC_API_KEY is configured on the server.')
      }
    }).finally(() => {
      setStreaming(false)
    })
  }, [seed])

  const copy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const regenerate = () => {
    if (!seed) return
    localStorage.removeItem(CACHE_KEY(seed.slug))
    setContent('')
    setGenerated(false)
    startedRef.current = false
    setStreaming(true)
    let full = ''
    streamBlogPost(seed.title, seed.keywords, chunk => {
      full += chunk
      setContent(prev => prev + chunk)
    }).then(() => {
      if (full.trim()) {
        setGenerated(true)
        localStorage.setItem(CACHE_KEY(seed.slug), full)
      } else {
        const fallback = blogContent[seed.slug]
        if (fallback) {
          setContent(fallback)
          setGenerated(true)
        }
      }
    }).catch(() => {
      const fallback = blogContent[seed.slug]
      if (fallback) {
        setContent(fallback)
        setGenerated(true)
      } else {
        setContent('Article content is not available. Please check that ANTHROPIC_API_KEY is configured on the server.')
      }
    }).finally(() => {
      setStreaming(false)
    })
  }

  if (!seed) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-500">Article not found.</p>
        <Link to="/blog" className="text-brand-600 hover:underline text-sm mt-4 inline-block">← Back to Blog</Link>
      </div>
    )
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seed.title,
    description: seed.excerpt,
    keywords: seed.keywords,
    author: { '@type': 'Organization', name: 'ISA Valve Solutions & Industrial Supplies' },
    publisher: { '@type': 'Organization', name: 'ISA Valve Solutions & Industrial Supplies' },
    articleSection: seed.category,
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <SchemaMarkup schema={articleSchema} />

      <div className="grid lg:grid-cols-[1fr_280px] gap-10">
        {/* Article */}
        <div>
          <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          {/* Meta bar */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold text-brand-700 bg-brand-50 border border-brand-200 px-2.5 py-1 rounded-full">{seed.category}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{seed.readTime}</span>
            {streaming && (
              <span className="flex items-center gap-1 text-xs text-isa-600 font-semibold">
                <Loader2 className="w-3.5 h-3.5 animate-spin" /> AI writing…
              </span>
            )}
            {generated && !streaming && (
              <span className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> AI generated
              </span>
            )}
          </div>

          {/* Content */}
          {!content && streaming && (
            <div className="py-20 flex flex-col items-center gap-3 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-brand-500" />
              <p className="text-sm">Claude is writing this article…</p>
            </div>
          )}

          {content && <ArticleRenderer text={content} streaming={streaming} />}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          {/* Tools */}
          {generated && (
            <div className="card p-5">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Article Actions</p>
              <div className="space-y-2">
                <button
                  onClick={copy}
                  className="w-full flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 bg-slate-50 hover:bg-white px-3.5 py-2.5 rounded-xl transition-colors"
                >
                  {copied ? <CheckCheck className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Article'}
                </button>
                <button
                  onClick={regenerate}
                  disabled={streaming}
                  className="w-full flex items-center gap-2 text-sm font-semibold text-brand-700 hover:text-brand-800 border border-brand-200 bg-brand-50 hover:bg-brand-100 px-3.5 py-2.5 rounded-xl transition-colors disabled:opacity-40"
                >
                  <Sparkles className="w-4 h-4" /> Regenerate with AI
                </button>
              </div>
            </div>
          )}

          {/* RFQ CTA */}
          <div className="card p-5 border-isa-200 bg-isa-50/40">
            <h3 className="font-black text-slate-900 mb-2 text-sm">Need a valve for your application?</h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">Our AI qualifies your requirements and our team responds within 24 hours.</p>
            <Link to="/rfq" className="flex items-center justify-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl transition-colors">
              Request a Quote <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Related articles */}
          <div className="card p-5">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">More Articles</p>
            <div className="space-y-3">
              {blogSeeds.filter(s => s.slug !== slug).slice(0, 3).map(post => (
                <Link key={post.slug} to={`/blog/${post.slug}`} className="block text-sm font-semibold text-slate-700 hover:text-brand-700 transition-colors leading-snug">
                  {post.title}
                </Link>
              ))}
            </div>
          </div>

          {/* SEO Tools CTA */}
          <div className="border border-brand-200 bg-brand-50 rounded-xl p-5">
            <p className="text-xs font-bold text-brand-900 mb-1">SEO AI Studio</p>
            <p className="text-xs text-brand-700 mb-3 leading-relaxed">Generate product descriptions, schema markup, keyword research, and more.</p>
            <Link to="/seo" className="flex items-center gap-1.5 text-xs font-bold text-brand-700 hover:text-brand-800">
              Open SEO Tools <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </aside>
      </div>
    </div>
  )
}

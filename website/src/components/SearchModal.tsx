import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { guides } from '../data/guides'
import type { Guide } from '../types'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Guide[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) {
      setQuery('')
      setResults([])
      setSearched(false)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSearched(false)
      return
    }

    if (timerRef.current) clearTimeout(timerRef.current)

    timerRef.current = setTimeout(async () => {
      setLoading(true)
      setSearched(false)
      try {
        const res = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query,
            guides: guides.map(g => ({
              id: g.id,
              title: g.title,
              excerpt: g.excerpt,
              category: g.category,
            })),
          }),
        })
        const data = (await res.json()) as { ids?: string[]; error?: string }
        if (data.ids) {
          const matched = data.ids
            .map(id => guides.find(g => g.id === id))
            .filter((g): g is Guide => Boolean(g))
          setResults(matched)
        }
      } catch {
        // fall back to basic text filter
        const q = query.toLowerCase()
        setResults(guides.filter(g => g.title.toLowerCase().includes(q) || g.excerpt.toLowerCase().includes(q)))
      } finally {
        setLoading(false)
        setSearched(true)
      }
    }, 400)
  }, [query])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden fade-in">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          {loading ? (
            <Loader2 className="w-5 h-5 text-brand-500 animate-spin flex-shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search guides with AI…"
            className="flex-1 text-sm text-slate-900 outline-none placeholder-slate-400 bg-transparent"
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto">
          {!query && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">All guides</p>
              {guides.map(g => (
                <ResultItem key={g.id} guide={g} onClose={onClose} />
              ))}
            </div>
          )}

          {query && searched && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-slate-500">No guides found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try a different search term</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map(g => (
                <ResultItem key={g.id} guide={g} onClose={onClose} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">Powered by Claude AI</p>
          <kbd className="text-xs text-slate-400 border border-slate-200 bg-white px-1.5 py-0.5 rounded font-mono">Esc</kbd>
        </div>
      </div>
    </div>
  )
}

function ResultItem({ guide, onClose }: { guide: Guide; onClose: () => void }) {
  return (
    <Link
      to={`/guides/${guide.slug}`}
      onClick={onClose}
      className="group flex items-start gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 group-hover:text-brand-700 truncate">{guide.title}</p>
        <p className="text-xs text-slate-400 mt-0.5 truncate">{guide.category} · {guide.readTime}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 flex-shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}

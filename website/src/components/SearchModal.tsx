import { useState, useEffect, useRef } from 'react'
import { Search, X, Loader2, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import type { Product } from '../types'

interface SearchModalProps {
  open: boolean
  onClose: () => void
}

export default function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Product[]>([])
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
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [open, onClose])

  useEffect(() => {
    if (!query.trim()) { setResults([]); setSearched(false); return }

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
            guides: products.map(p => ({
              id: p.id,
              title: p.name,
              excerpt: p.description,
              category: p.industries.join(', '),
            })),
          }),
        })
        const data = (await res.json()) as { ids?: string[]; error?: string }
        if (data.ids) {
          const matched = data.ids
            .map(id => products.find(p => p.id === id))
            .filter((p): p is Product => Boolean(p))
          setResults(matched)
        }
      } catch {
        const q = query.toLowerCase()
        setResults(
          products.filter(
            p =>
              p.name.toLowerCase().includes(q) ||
              p.description.toLowerCase().includes(q) ||
              p.industries.some(i => i.toLowerCase().includes(q)),
          ),
        )
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
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden fade-in">
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-100">
          {loading ? (
            <Loader2 className="w-5 h-5 text-brand-600 animate-spin flex-shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
          )}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search valves by type, application, or industry…"
            className="flex-1 text-sm text-slate-900 outline-none placeholder-slate-400 bg-transparent"
          />
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto">
          {!query && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">All Products</p>
              {products.map(p => <ResultItem key={p.id} product={p} onClose={onClose} />)}
            </div>
          )}
          {query && searched && results.length === 0 && (
            <div className="px-4 py-8 text-center">
              <p className="text-sm text-slate-500">No products found for "{query}"</p>
              <p className="text-xs text-slate-400 mt-1">Try "ball valve", "slurry", or "water treatment"</p>
            </div>
          )}
          {results.length > 0 && (
            <div className="px-4 py-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                {results.length} result{results.length !== 1 ? 's' : ''}
              </p>
              {results.map(p => <ResultItem key={p.id} product={p} onClose={onClose} />)}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2.5 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">AI-powered by Claude · ISA Valve Solutions</p>
          <kbd className="text-xs text-slate-400 border border-slate-200 bg-white px-1.5 py-0.5 rounded font-mono">Esc</kbd>
        </div>
      </div>
    </div>
  )
}

function ResultItem({ product, onClose }: { product: Product; onClose: () => void }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      onClick={onClose}
      className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-brand-50 transition-colors"
    >
      <span className="text-lg leading-none">{product.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-900 group-hover:text-brand-700">{product.name}</p>
        <p className="text-xs text-slate-400 truncate">{product.industries.slice(0, 3).join(' · ')}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 flex-shrink-0 group-hover:translate-x-0.5 transition-transform" />
    </Link>
  )
}

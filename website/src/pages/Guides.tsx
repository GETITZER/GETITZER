import { useState } from 'react'
import { Search } from 'lucide-react'
import GuideCard from '../components/GuideCard'
import { guides } from '../data/guides'

const categories = ['All', ...Array.from(new Set(guides.map(g => g.category)))]

export default function Guides() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [localFilter, setLocalFilter] = useState('')

  const filtered = guides.filter(g => {
    const matchCat = activeCategory === 'All' || g.category === activeCategory
    const matchText =
      !localFilter ||
      g.title.toLowerCase().includes(localFilter.toLowerCase()) ||
      g.excerpt.toLowerCase().includes(localFilter.toLowerCase()) ||
      g.tags.some(t => t.toLowerCase().includes(localFilter.toLowerCase()))
    return matchCat && matchText
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Guides</h1>
        <p className="text-slate-500 mt-3 text-lg">
          Conversion-focused guides for digital professionals. Use{' '}
          <kbd className="text-xs bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>{' '}
          for AI-powered search.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={localFilter}
            onChange={e => setLocalFilter(e.target.value)}
            placeholder="Quick filter by keyword…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                activeCategory === cat
                  ? 'bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-6">
        {filtered.length} guide{filtered.length !== 1 ? 's' : ''}
        {activeCategory !== 'All' ? ` in ${activeCategory}` : ''}
        {localFilter ? ` matching "${localFilter}"` : ''}
      </p>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(guide => (
            <GuideCard key={guide.id} guide={guide} featured />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-slate-500 font-medium">No guides match your filter.</p>
          <button
            onClick={() => { setActiveCategory('All'); setLocalFilter('') }}
            className="mt-3 text-sm text-brand-600 hover:text-brand-700"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  )
}

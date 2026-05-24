import { Link } from 'react-router-dom'
import { ArrowRight, Search } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'

export default function Products() {
  const [filter, setFilter] = useState('')

  const filtered = products.filter(p => {
    const q = filter.toLowerCase()
    return (
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.industries.some(i => i.toLowerCase().includes(q)) ||
      p.specs.some(s => s.value.toLowerCase().includes(q))
    )
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Product Range</h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Four precision-engineered valve types covering DN15 to DN1200. Use{' '}
          <kbd className="text-xs bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>{' '}
          for AI-powered product search.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-10">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Filter by name, industry, or specification…"
          className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
        />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map(product => (
          <Link
            key={product.id}
            to={`/products/${product.slug}`}
            className="group card p-6 flex gap-5 hover:shadow-lg hover:border-brand-200 transition-all duration-200"
          >
            <span className="text-3xl mt-1">{product.icon}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-black text-xl text-slate-900 group-hover:text-brand-700 transition-colors">{product.name}</h2>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
              </div>
              <p className="text-sm font-medium text-isa-600 mt-0.5 mb-3">{product.tagline}</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">{product.description.slice(0, 160)}…</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
                {product.specs.slice(0, 4).map(spec => (
                  <div key={spec.label}>
                    <span className="text-xs text-slate-400">{spec.label}</span>
                    <p className="text-xs font-semibold text-slate-700 truncate">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {product.industries.map(ind => (
                  <span key={ind} className="text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full font-medium">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 font-medium">No products match "{filter}"</p>
          <button onClick={() => setFilter('')} className="mt-3 text-sm text-brand-600 hover:text-brand-700">
            Clear filter
          </button>
        </div>
      )}

      {/* CTA */}
      <div className="mt-16 bg-gradient-to-br from-navy to-brand-900 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Need a custom specification?</h2>
        <p className="text-blue-200 text-sm mb-5">Our engineering team handles custom sizes, materials, and actuation configurations beyond catalogue specifications.</p>
        <Link
          to="/rfq"
          className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Request a Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}

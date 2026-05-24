import { Link } from 'react-router-dom'
import { ArrowRight, Search, X, SlidersHorizontal, Eye } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import ValveIllustration from '../components/ValveIllustration'
import ProductModal from '../components/ProductModal'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Product } from '../types'

const INDUSTRIES = ['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical Processing', 'HVAC', 'Pulp & Paper', 'Marine', 'Fire Protection', 'Municipal Supply', 'Irrigation', 'Wastewater']
const ACTUATION = ['Manual', 'Pneumatic', 'Electric', 'Hydraulic', 'Gearbox']
const PRESSURE = ['PN10', 'PN16', 'PN40', 'ANSI 150', 'ANSI 300', 'ANSI 600']

function getSpec(product: (typeof products)[0], label: string) {
  return product.specs.find(s => s.label === label)?.value ?? ''
}

function matchesActuation(product: (typeof products)[0], selected: string[]) {
  if (!selected.length) return true
  const val = getSpec(product, 'Actuation').toLowerCase()
  return selected.some(a => val.includes(a.toLowerCase()))
}

function matchesPressure(product: (typeof products)[0], selected: string[]) {
  if (!selected.length) return true
  const val = getSpec(product, 'Pressure Class').toLowerCase()
  return selected.some(p => val.toLowerCase().includes(p.toLowerCase()))
}

type SlugType = 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve' | 'pinch-valve' | 'dxst-kgv'

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-1 rounded-full border font-medium transition-colors ${
        active
          ? 'bg-brand-600 border-brand-600 text-white'
          : 'bg-white border-slate-200 text-slate-600 hover:border-brand-400 hover:text-brand-700'
      }`}
    >
      {label}
    </button>
  )
}

export default function Products() {
  usePageMeta('Industrial Valves — Full Product Range', 'Browse ISA Valve Solutions ball valves, butterfly valves, gate valves, and knife gate valves. Filter by industry, actuation type, and pressure class.')

  const [text, setText] = useState('')
  const [industries, setIndustries] = useState<string[]>([])
  const [actuation, setActuation] = useState<string[]>([])
  const [pressure, setPressure] = useState<string[]>([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  const activeCount = industries.length + actuation.length + pressure.length

  const filtered = products.filter(p => {
    const q = text.toLowerCase()
    const textMatch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.industries.some(i => i.toLowerCase().includes(q)) ||
      p.specs.some(s => s.value.toLowerCase().includes(q))

    const industryMatch = !industries.length || industries.some(ind => p.industries.some(pi => pi.toLowerCase().includes(ind.toLowerCase())))
    const actuationMatch = matchesActuation(p, actuation)
    const pressureMatch = matchesPressure(p, pressure)

    return textMatch && industryMatch && actuationMatch && pressureMatch
  })

  const clearAll = () => {
    setText('')
    setIndustries([])
    setActuation([])
    setPressure([])
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-8">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Product Range</h1>
        <p className="text-slate-500 mt-3 text-lg leading-relaxed">
          Six precision-engineered valve types covering DN15 to DN1200. Filter by industry, actuation, or pressure class.
        </p>
      </div>

      {/* Search + filter toggle */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Search by name, industry, or spec…"
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
          />
          {text && (
            <button onClick={() => setText('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        <button
          onClick={() => setFiltersOpen(!filtersOpen)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-colors ${filtersOpen || activeCount > 0 ? 'bg-brand-600 border-brand-600 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters{activeCount > 0 ? ` (${activeCount})` : ''}
        </button>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-sm text-slate-500 hover:text-slate-700 flex items-center gap-1">
            <X className="w-3.5 h-3.5" /> Clear all
          </button>
        )}
      </div>

      {/* Filter panel */}
      {filtersOpen && (
        <div className="mb-8 p-5 bg-slate-50 border border-slate-200 rounded-2xl">
          <div className="grid sm:grid-cols-3 gap-6">
            {/* Industry */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Industry</p>
              <div className="flex flex-wrap gap-1.5">
                {INDUSTRIES.map(ind => (
                  <FilterChip
                    key={ind}
                    label={ind}
                    active={industries.includes(ind)}
                    onClick={() => setIndustries(toggle(industries, ind))}
                  />
                ))}
              </div>
            </div>
            {/* Actuation */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Actuation Type</p>
              <div className="flex flex-wrap gap-1.5">
                {ACTUATION.map(a => (
                  <FilterChip
                    key={a}
                    label={a}
                    active={actuation.includes(a)}
                    onClick={() => setActuation(toggle(actuation, a))}
                  />
                ))}
              </div>
            </div>
            {/* Pressure */}
            <div>
              <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Pressure Class</p>
              <div className="flex flex-wrap gap-1.5">
                {PRESSURE.map(p => (
                  <FilterChip
                    key={p}
                    label={p}
                    active={pressure.includes(p)}
                    onClick={() => setPressure(toggle(pressure, p))}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Active filter pills */}
      {activeCount > 0 && !filtersOpen && (
        <div className="flex flex-wrap gap-2 mb-6">
          {[...industries, ...actuation, ...pressure].map(tag => (
            <span key={tag} className="flex items-center gap-1.5 text-xs font-medium bg-brand-50 text-brand-700 border border-brand-200 px-2.5 py-1 rounded-full">
              {tag}
              <button onClick={() => {
                setIndustries(industries.filter(x => x !== tag))
                setActuation(actuation.filter(x => x !== tag))
                setPressure(pressure.filter(x => x !== tag))
              }}>
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Results count */}
      <p className="text-sm text-slate-500 mb-6">
        {filtered.length === products.length
          ? `All ${products.length} products`
          : `${filtered.length} of ${products.length} products`}
        {(text || activeCount > 0) && ' match your criteria'}
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 gap-6">
        {filtered.map(product => (
          <div
            key={product.id}
            className="group card p-6 flex gap-5 hover:shadow-lg hover:border-brand-200 transition-all duration-200 cursor-pointer"
            onClick={() => setModalProduct(product)}
          >
            {/* SVG thumbnail */}
            <div className="relative flex-shrink-0 w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden">
              <ValveIllustration
                type={product.slug as SlugType}
                className="w-16 h-16"
              />
              <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/10 transition-colors rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Eye className="w-5 h-5 text-brand-700" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-black text-xl text-slate-900 group-hover:text-brand-700 transition-colors">{product.name}</h2>
                {product.badge && (
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full text-white flex-shrink-0 ${product.badgeColor === 'red' ? 'bg-red-600' : product.badgeColor === 'green' ? 'bg-green-600' : 'bg-isa-600'}`}>
                    NEW
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-isa-600 mt-0.5 mb-2">{product.tagline}</p>
              <p className="text-sm text-slate-500 leading-relaxed mb-3 line-clamp-2">{product.description}</p>

              <div className="grid grid-cols-2 gap-x-4 gap-y-1 mb-3">
                {product.specs.slice(0, 2).map(spec => (
                  <div key={spec.label}>
                    <span className="text-xs text-slate-400">{spec.label}</span>
                    <p className="text-xs font-semibold text-slate-700 truncate">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {product.industries.slice(0, 2).map(ind => (
                    <span key={ind} className="text-xs text-brand-700 bg-brand-50 px-2 py-0.5 rounded-full font-medium">
                      {ind}
                    </span>
                  ))}
                  {product.industries.length > 2 && (
                    <span className="text-xs text-slate-400 px-2 py-0.5 rounded-full font-medium">
                      +{product.industries.length - 2} more
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  <span className="text-xs font-semibold text-brand-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                    <Eye className="w-3.5 h-3.5" /> Quick View
                  </span>
                  {['ball-valve','butterfly-valve','gate-valve','knife-gate-valve'].includes(product.slug) && (
                    <Link
                      to={`/products/${product.slug}`}
                      onClick={e => e.stopPropagation()}
                      className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-0.5"
                    >
                      Full page <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-slate-500 font-medium">No products match your filters</p>
          <button onClick={clearAll} className="mt-3 text-sm text-brand-600 hover:text-brand-700">
            Clear all filters
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

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
  )
}

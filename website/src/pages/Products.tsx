import { Link } from 'react-router-dom'
import { ArrowRight, Search, X, SlidersHorizontal } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import ProductModal from '../components/ProductModal'
import { usePageMeta } from '../hooks/usePageMeta'
import type { Product } from '../types'

/* Real product photo mapping (slug → image path) */
const PRODUCT_PHOTOS: Record<string, string> = {
  'ball-valve':        '/images/products/ball-valve-nobg.jpg',
  'butterfly-valve':   '/images/products/butterfly-valve-clean.png',
  'gate-valve':        '/images/products/gate-valve-clean.jpg',
  'pinch-valve':       '/images/products/pinch-valve-orange.jpg',
  'dxst-kgv':          '/images/products/dxst-kgv.png',
  'knife-gate-valve':  '/images/products/knife-gate-valve-isa.jpg',
}

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
    <div>
      {/* Hero banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <img
          src="/images/branded/isa-bg-valves-row.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.38 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.92) 0%, rgba(7,26,45,0.70) 55%, rgba(7,26,45,0.35) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="text-xs font-bold text-isa-400 uppercase tracking-widest mb-3">ISO 9001:2015 · API 6D · WRAS · SABS</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Precision-Engineered<br className="hidden sm:block" /> Valve Range
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            Six valve families covering DN15–DN4000. Every valve tested at 1.5× rated pressure with full material traceability documentation.
          </p>
        </div>
      </div>

    <div className="bg-slate-50 min-h-screen">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

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

      {/* OEM product card grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(product => {
          const photo = PRODUCT_PHOTOS[product.slug]
          return (
          <Link
            key={product.id}
            to={`/products/${product.slug}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-isa-300 hover:-translate-y-1.5 flex flex-col"
          >
            {/* Top accent bar */}
            <div className="h-1 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 group-hover:from-isa-500 group-hover:via-isa-400 group-hover:to-isa-500 transition-all duration-500" />

            {/* Product image */}
            <div className="relative h-52 flex items-center justify-center overflow-hidden px-8 py-5"
              style={{ background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)' }}>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,102,204,0.07) 0%, transparent 70%)' }} />
              {photo ? (
                <img
                  src={photo}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-lg relative z-10"
                />
              ) : (
                <div className="text-6xl">{product.icon}</div>
              )}
              {/* Cert badge */}
              <span className="absolute top-3 right-3 text-[10px] font-bold text-isa-700 bg-isa-50 border border-isa-200 px-2.5 py-1 rounded-full uppercase tracking-wider z-20">
                {product.tagline.split('—')[0].trim().split(' ').slice(0, 3).join(' ')}
              </span>
              {product.badge && (
                <span className="absolute top-3 left-3 text-[10px] font-black px-2 py-1 rounded-full text-white bg-isa-500 z-20">NEW</span>
              )}
            </div>

            {/* Card text */}
            <div className="p-5 flex-1 flex flex-col border-t border-slate-100">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-1 min-h-[36px] rounded-full bg-isa-500 flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity" />
                <div className="min-w-0">
                  <h2 className="font-bold text-slate-900 text-sm group-hover:text-isa-700 transition-colors leading-snug">{product.name}</h2>
                  <p className="text-slate-400 text-xs mt-0.5 truncate">{product.specs[0]?.value}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2 ml-4">{product.description}</p>
              <div className="flex flex-wrap gap-1 mb-3 ml-4">
                {product.industries.slice(0, 3).map(ind => (
                  <span key={ind} className="text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">{ind}</span>
                ))}
              </div>
              <span className="mt-auto ml-4 flex items-center gap-1.5 text-xs font-semibold text-isa-600 group-hover:gap-3 transition-all duration-200">
                View Specifications <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
          )
        })}
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
      <div className="mt-16 bg-slate-900 rounded-2xl p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">Need a custom specification?</h2>
        <p className="text-slate-400 text-sm mb-5">Our engineering team handles custom sizes, materials, and actuation configurations beyond catalogue specifications.</p>
        <Link
          to="/rfq"
          className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-2.5 rounded-xl transition-colors"
        >
          Request a Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <ProductModal product={modalProduct} onClose={() => setModalProduct(null)} />
    </div>
    </div>
    </div>
  )
}

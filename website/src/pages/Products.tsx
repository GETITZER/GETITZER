import { Link } from 'react-router-dom'
import { ArrowRight, Search, X, ChevronRight, ShoppingCart, Phone } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

const PRODUCT_PHOTOS: Record<string, string> = {
  'ball-valve':            '/images/products/ball-valve-nobg.jpg',
  'butterfly-valve':       '/images/products/butterfly-valve-clean.png',
  'gate-valve':            '/images/products/gate-valve-clean.jpg',
  'pinch-valve':           '/images/products/pinch-valve-orange.jpg',
  'dxst-kgv':              '/images/products/dxst-kgv.png',
  'knife-gate-valve':      '/images/products/knife-gate-valve-isa.jpg',
}

const CATEGORIES = [
  { label: 'All Products',              slug: 'all' },
  { label: 'Ball Valves',               slug: 'ball-valve' },
  { label: 'Butterfly Valves',          slug: 'butterfly-valve' },
  { label: 'Gate Valves',               slug: 'gate-valve' },
  { label: 'Check Valves',              slug: 'check-valve' },
  { label: 'Globe Valves',              slug: 'globe-valve' },
  { label: 'Knife Gate Valves',         slug: 'knife-gate-valve' },
  { label: 'Pinch Valves',              slug: 'pinch-valve' },
  { label: 'DXST Slurry KGV',          slug: 'dxst-kgv' },
  { label: 'Diaphragm Valves',          slug: 'diaphragm-valve' },
  { label: 'Control Valves',            slug: 'control-valve' },
  { label: 'Pressure Reducing Valves',  slug: 'pressure-reducing-valve' },
  { label: 'Safety & Relief Valves',    slug: 'safety-relief-valve' },
  { label: 'Steam Traps',               slug: 'steam-trap' },
  { label: 'Y-Strainers',               slug: 'y-strainer' },
  { label: 'Sight Glass',               slug: 'sight-glass' },
  { label: 'Block & Bleed Valves',      slug: 'block-bleed-valve' },
]

const MATERIALS = ['Cast Iron', 'Ductile Iron', 'Carbon Steel', 'Stainless Steel', 'Brass', 'Bronze', 'PVDF / Plastic']
const CONNECTIONS = ['Flanged', 'Screwed / Threaded', 'Wafer', 'Butt-Weld', 'Socket']
const PRESSURE = ['PN10', 'PN16', 'PN25', 'PN40', 'ANSI 150', 'ANSI 300', 'ANSI 600']

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={onChange}>
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
        checked ? 'bg-isa-600 border-isa-600' : 'bg-white border-slate-300 group-hover:border-isa-400'
      }`}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span className={`text-sm ${checked ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>{label}</span>
    </label>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-slate-100 pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3 group">
        <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">{title}</span>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

export default function Products() {
  usePageMeta({
    title: 'Industrial Valves — Full Product Range | ISA Valve Solutions South Africa',
    description: 'Browse ISA Valve Solutions full range: ball valves, butterfly valves, gate valves, check valves, globe valves, knife gate valves, pinch valves, strainers, control valves. Filter by type, material, size and pressure class.',
    canonical: 'https://www.isavalvesolutions.com/products',
  })

  const [text, setText] = useState('')
  const [category, setCategory] = useState('all')
  const [materials, setMaterials] = useState<string[]>([])
  const [connections, setConnections] = useState<string[]>([])
  const [pressure, setPressure] = useState<string[]>([])
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const activeFilterCount = materials.length + connections.length + pressure.length

  const filtered = products.filter(p => {
    const q = text.toLowerCase()
    const textMatch = !q || p.name.toLowerCase().includes(q) || p.shortName?.toLowerCase().includes(q) || p.industries.some(i => i.toLowerCase().includes(q))
    const catMatch = category === 'all' || p.slug === category
    const specText = p.specs.map(s => s.value.toLowerCase()).join(' ')
    const matMatch = !materials.length || materials.some(m => specText.includes(m.split(' / ')[0].toLowerCase()) || specText.includes(m.toLowerCase()))
    const connMatch = !connections.length || connections.some(c => specText.includes(c.toLowerCase().split(' / ')[0]))
    const pressMatch = !pressure.length || pressure.some(pr => specText.includes(pr.toLowerCase()))
    return textMatch && catMatch && matMatch && connMatch && pressMatch
  })

  const clearAll = () => {
    setText(''); setCategory('all'); setMaterials([]); setConnections([]); setPressure([])
  }

  const Sidebar = (
    <aside className="space-y-0">
      {/* Category nav */}
      <div className="mb-5">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Browse By Type</p>
        <ul className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <li key={cat.slug}>
              <button
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between group ${
                  category === cat.slug
                    ? 'bg-isa-600 text-white font-semibold'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
                {category === cat.slug && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Refine Results</p>

        <SidebarSection title="Body Material">
          {MATERIALS.map(m => (
            <Checkbox key={m} checked={materials.includes(m)} onChange={() => setMaterials(toggle(materials, m))} label={m} />
          ))}
        </SidebarSection>

        <SidebarSection title="End Connection">
          {CONNECTIONS.map(c => (
            <Checkbox key={c} checked={connections.includes(c)} onChange={() => setConnections(toggle(connections, c))} label={c} />
          ))}
        </SidebarSection>

        <SidebarSection title="Pressure Class">
          {PRESSURE.map(p => (
            <Checkbox key={p} checked={pressure.includes(p)} onChange={() => setPressure(toggle(pressure, p))} label={p} />
          ))}
        </SidebarSection>

        {activeFilterCount > 0 && (
          <button onClick={() => { setMaterials([]); setConnections([]); setPressure([]) }} className="text-xs text-isa-600 hover:text-isa-700 font-semibold flex items-center gap-1">
            <X className="w-3 h-3" /> Clear filters ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Contact box */}
      <div className="mt-6 bg-slate-900 rounded-xl p-4">
        <p className="text-xs font-bold text-isa-400 uppercase tracking-wider mb-1">Need Help?</p>
        <p className="text-sm text-white font-semibold mb-2">Talk to an engineer</p>
        <a href="tel:+270606885648" className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors mb-1">
          <Phone className="w-3 h-3 text-isa-500" /> +27 060 688 5648
        </a>
        <Link to="/configure" className="mt-3 flex items-center gap-1.5 text-xs font-bold text-isa-400 hover:text-isa-300 transition-colors">
          AI Valve Selector <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  )

  return (
    <div className="bg-white min-h-screen">

      {/* Shop header — clean, white, not dark hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link to="/" className="hover:text-slate-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">Products</span>
            {category !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-isa-600 font-medium">{CATEGORIES.find(c => c.slug === category)?.label}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {category === 'all' ? 'All Valves & Flow Control Products' : CATEGORIES.find(c => c.slug === category)?.label}
              </h1>
              <p className="text-sm text-slate-500 mt-1">ISO 9001:2015 Certified · Tested at 1.5× Rated Pressure · Africa-Wide Delivery</p>
            </div>
            {/* Trust badges */}
            <div className="flex items-center gap-4 text-xs flex-shrink-0">
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">12</div>
                <div className="text-slate-400 leading-tight">Product<br/>Families</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">DN15</div>
                <div className="text-slate-400 leading-tight">to<br/>DN4000</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">ISO</div>
                <div className="text-slate-400 leading-tight">9001<br/>:2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-60 flex-shrink-0 sticky top-20 self-start">
            {Sidebar}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Search + toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Search products, specs, or applications…"
                  className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-isa-500 focus:border-transparent transition"
                />
                {text && (
                  <button onClick={() => setText('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 bg-white"
              >
                Filters {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full bg-isa-600 text-white text-xs flex items-center justify-center">{activeFilterCount}</span>}
              </button>

              <div className="ml-auto text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
                {(text || category !== 'all' || activeFilterCount > 0) && ' found'}
              </div>
            </div>

            {/* Active filter pills */}
            {(category !== 'all' || activeFilterCount > 0) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {category !== 'all' && (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-isa-50 text-isa-700 border border-isa-200 px-2.5 py-1 rounded-full">
                    {CATEGORIES.find(c => c.slug === category)?.label}
                    <button onClick={() => setCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {[...materials, ...connections, ...pressure].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs font-medium bg-isa-50 text-isa-700 border border-isa-200 px-2.5 py-1 rounded-full">
                    {tag}
                    <button onClick={() => { setMaterials(m => m.filter(x => x !== tag)); setConnections(c => c.filter(x => x !== tag)); setPressure(p => p.filter(x => x !== tag)) }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-xs text-slate-400 hover:text-slate-600 underline">Clear all</button>
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => {
                  const photo = PRODUCT_PHOTOS[product.slug]
                  const sizeSpec = product.specs.find(s => s.label === 'Size Range' || s.label === 'Types')
                  const materialSpec = product.specs.find(s => s.label === 'Body Materials')
                  const connSpec = product.specs.find(s => s.label === 'End Connection')
                  const pressSpec = product.specs.find(s => s.label === 'Pressure Class' || s.label === 'Pressure Rating' || s.label === 'Pressure Setting')
                  const topCert = product.compliance?.[0]

                  return (
                    <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-isa-300 hover:shadow-lg transition-all duration-200 flex flex-col group">

                      {/* Image area */}
                      <Link to={`/products/${product.slug}`} className="block relative">
                        <div className="relative h-52 flex items-center justify-center overflow-hidden bg-slate-50 border-b border-slate-100">
                          {photo ? (
                            <img
                              src={photo}
                              alt={product.name}
                              loading="lazy"
                              className="h-40 w-full object-contain group-hover:scale-105 transition-transform duration-500 p-4 drop-shadow-md"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-6xl">{product.icon}</span>
                            </div>
                          )}

                          {/* Cert badge top-left */}
                          {topCert && (
                            <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-isa-700 bg-isa-50 border border-isa-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                              {topCert}
                            </span>
                          )}

                          {/* Bestseller / badge top-right */}
                          {product.slug === 'dxst-kgv' && (
                            <span className="absolute top-0 right-0 bg-isa-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                              Mining #1
                            </span>
                          )}
                          {product.badge && product.slug !== 'dxst-kgv' && (
                            <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                              {product.badge.split('·')[0].trim()}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Card body */}
                      <div className="p-4 flex-1 flex flex-col">
                        {/* Category label */}
                        <p className="text-[10px] font-bold text-isa-600 uppercase tracking-widest mb-1">
                          {product.shortName ?? product.name.split(' ').slice(-2).join(' ')}
                        </p>

                        {/* Product name */}
                        <Link to={`/products/${product.slug}`}>
                          <h2 className="font-bold text-slate-900 text-sm leading-snug mb-2 hover:text-isa-700 transition-colors">
                            {product.name}
                          </h2>
                        </Link>

                        {/* Key specs grid */}
                        <div className="space-y-1 mb-3 flex-1">
                          {sizeSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Size:</span>
                              <span className="text-slate-700 font-semibold truncate">{sizeSpec.value}</span>
                            </div>
                          )}
                          {materialSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Material:</span>
                              <span className="text-slate-700 font-semibold truncate">{materialSpec.value.split('/')[0].trim()}{materialSpec.value.includes('/') ? ' / +more' : ''}</span>
                            </div>
                          )}
                          {connSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Connection:</span>
                              <span className="text-slate-700 font-semibold truncate">{connSpec.value}</span>
                            </div>
                          )}
                          {pressSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Pressure:</span>
                              <span className="text-slate-700 font-semibold truncate">{pressSpec.value.split('(')[0].trim()}</span>
                            </div>
                          )}
                        </div>

                        {/* Industry tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.industries.slice(0, 3).map(ind => (
                            <span key={ind} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                              {ind}
                            </span>
                          ))}
                          {product.industries.length > 3 && (
                            <span className="text-[10px] text-slate-400 px-1 py-0.5">+{product.industries.length - 3}</span>
                          )}
                        </div>

                        {/* Availability + CTA */}
                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            Available to Order
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/products/${product.slug}`}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-isa-400 hover:text-isa-700 font-medium transition-colors"
                            >
                              Specs
                            </Link>
                            <Link
                              to={`/rfq?valve=${product.slug}`}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-isa-600 hover:bg-isa-700 text-white font-bold transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" /> Quote
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-slate-500 font-medium text-lg mb-2">No products match your filters</p>
                <p className="text-slate-400 text-sm mb-5">Try broadening your search or clearing some filters</p>
                <button onClick={clearAll} className="text-sm text-isa-600 hover:text-isa-700 font-semibold underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-1">Don't see exactly what you need?</h3>
                <p className="text-slate-500 text-sm">Our engineering team handles custom sizes, special materials, and non-catalogue specifications.</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link to="/configure" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-700 hover:border-isa-500 hover:text-isa-700 bg-white transition-all">
                  AI Selector
                </Link>
                <Link to="/rfq" className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">Filter Products</h3>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            {Sidebar}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="w-full mt-4 bg-isa-600 text-white font-bold py-3 rounded-xl"
            >
              Show {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

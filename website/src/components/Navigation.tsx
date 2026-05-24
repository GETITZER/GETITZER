import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown, Phone, Zap, Newspaper, Sparkles } from 'lucide-react'
import SearchModal from './SearchModal'

// ISA triangular logo mark
function ISALogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,30 16,2 22,30" fill="#2563eb" />
      <polygon points="16,2 22,30 20,30 14,4" fill="#ea580c" opacity="0.85" />
      <polygon points="22,30 30,30 24,10" fill="#374151" />
      <polygon points="24,10 30,30 28,30 22,12" fill="#6b7280" opacity="0.6" />
    </svg>
  )
}

const productLinks = [
  { label: 'Ball Valve', to: '/products/ball-valve', desc: 'DN15–DN600 · PN16–ANSI 600' },
  { label: 'Butterfly Valve', to: '/products/butterfly-valve', desc: 'DN50–DN1200 · PN10/PN16' },
  { label: 'Gate Valve', to: '/products/gate-valve', desc: 'DN50–DN1000 · PN10/PN16' },
  { label: 'Knife Gate Valve', to: '/products/knife-gate-valve', desc: 'DN50–DN600 · Slurry service' },
]

const industryLinks = [
  { label: 'Mining', to: '/industries/mining' },
  { label: 'Water Treatment', to: '/industries/water-treatment' },
  { label: 'Oil & Gas', to: '/industries/oil-gas' },
  { label: 'Chemical', to: '/industries/chemical' },
  { label: 'HVAC', to: '/industries/hvac' },
  { label: 'Pulp & Paper', to: '/industries/pulp-paper' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productDropdown, setProductDropdown] = useState(false)
  const [industryDropdown, setIndustryDropdown] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setMobileOpen(false); setProductDropdown(false); setIndustryDropdown(false) }, [location.pathname])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [])

  const isActive = (prefix: string) => location.pathname.startsWith(prefix)

  return (
    <>
      <header className={`sticky top-0 z-40 transition-all duration-200 ${scrolled ? 'bg-white/97 backdrop-blur shadow-md border-b border-slate-200' : 'bg-white border-b border-slate-200'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <ISALogo />
            <div className="leading-none">
              <div className="font-black text-[13px] tracking-tight text-slate-900">ISA VALVE SOLUTIONS.</div>
              <div className="text-[9px] font-bold text-isa-600 tracking-widest uppercase">& Industrial Supplies</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-0.5 flex-1">
            {/* Products */}
            <div className="relative" onMouseLeave={() => setProductDropdown(false)}>
              <button
                onMouseEnter={() => setProductDropdown(true)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/products') ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Products <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {productDropdown && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <Link to="/products" className="block px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                    All Products →
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  {productLinks.map(link => (
                    <Link key={link.to} to={link.to} className="flex items-start gap-3 px-4 py-2.5 hover:bg-brand-50">
                      <div>
                        <p className="text-sm font-medium text-slate-800">{link.label}</p>
                        <p className="text-xs text-slate-400">{link.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Industries */}
            <div className="relative" onMouseLeave={() => setIndustryDropdown(false)}>
              <button
                onMouseEnter={() => setIndustryDropdown(true)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/industries') ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
              >
                Industries <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {industryDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  {industryLinks.map(link => (
                    <Link key={link.to} to={link.to} className="block px-4 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700">
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Configurator — high-visibility */}
            <Link
              to="/configurator"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${isActive('/configurator') ? 'text-isa-700 bg-isa-50' : 'text-isa-700 hover:text-isa-800 hover:bg-isa-50'}`}
            >
              <Zap className="w-3.5 h-3.5" /> Valve Selector
            </Link>

            <Link
              to="/about"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/about') ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              About
            </Link>

            <Link
              to="/blog"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/blog') ? 'text-brand-700 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}
            >
              <Newspaper className="w-3.5 h-3.5" /> Blog
            </Link>

            <Link
              to="/seo"
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors ${isActive('/seo') ? 'text-brand-700 bg-brand-50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
              title="SEO AI Studio"
            >
              <Sparkles className="w-3.5 h-3.5" /> SEO Tools
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <a href="tel:+27000000000" className="hidden xl:flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700">
              <Phone className="w-3.5 h-3.5" /> +27 (0) 00 000 0000
            </a>

            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700 bg-slate-50 transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            <Link to="/rfq" className="hidden md:inline-flex items-center bg-isa-600 hover:bg-isa-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors">
              Get a Quote
            </Link>

            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
            <a href="tel:+27000000000" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-isa-700 bg-isa-50">
              <Phone className="w-4 h-4" /> +27 (0) 00 000 0000
            </a>
            <button onClick={() => { setSearchOpen(true); setMobileOpen(false) }} className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Search className="w-4 h-4" /> Search products
            </button>
            <Link to="/configurator" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-isa-700">
              <Zap className="w-4 h-4" /> AI Valve Selector
            </Link>
            <Link to="/products" className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">Products</Link>
            {productLinks.map(l => (
              <Link key={l.to} to={l.to} className="block px-6 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50">{l.label}</Link>
            ))}
            <Link to="/industries" className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">Industries</Link>
            <Link to="/about" className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">About</Link>
            <Link to="/blog" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50">
              <Newspaper className="w-4 h-4" /> Blog
            </Link>
            <Link to="/seo" className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50">
              <Sparkles className="w-4 h-4" /> SEO Tools
            </Link>
            <Link to="/rfq" className="block mt-2 text-center bg-isa-600 hover:bg-isa-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors">
              Request a Quote
            </Link>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

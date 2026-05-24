import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Search, Menu, X, ChevronDown } from 'lucide-react'
import SearchModal from './SearchModal'

// SVG ISA logo mark — triangle in brand blue + orange accent
function ISALogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Blue left triangle */}
      <polygon points="2,30 16,2 22,30" fill="#2563eb" />
      {/* Orange accent stripe */}
      <polygon points="16,2 22,30 20,30 14,4" fill="#ea580c" opacity="0.85" />
      {/* Dark right lines */}
      <polygon points="22,30 30,30 24,10" fill="#374151" />
      <polygon points="24,10 30,30 28,30 22,12" fill="#6b7280" opacity="0.6" />
    </svg>
  )
}

const productLinks = [
  { label: 'Ball Valve', to: '/products/ball-valve' },
  { label: 'Butterfly Valve', to: '/products/butterfly-valve' },
  { label: 'Gate Valve', to: '/products/gate-valve' },
  { label: 'Knife Gate Valve', to: '/products/knife-gate-valve' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productDropdown, setProductDropdown] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductDropdown(false)
  }, [location.pathname])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          scrolled
            ? 'bg-white/95 backdrop-blur shadow-md border-b border-slate-200'
            : 'bg-white border-b border-slate-200'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <ISALogo />
            <div className="leading-none">
              <div className="font-black text-sm tracking-tight text-slate-900">ISA VALVE SOLUTIONS.</div>
              <div className="text-[10px] font-semibold text-isa-600 tracking-wider uppercase">& Industrial Supplies</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-1 flex-1">
            {/* Products dropdown */}
            <div className="relative" onMouseLeave={() => setProductDropdown(false)}>
              <button
                onMouseEnter={() => setProductDropdown(true)}
                className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname.startsWith('/products')
                    ? 'text-brand-700 bg-brand-50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Products <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {productDropdown && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50">
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    All Products →
                  </Link>
                  <div className="border-t border-slate-100 my-1" />
                  {productLinks.map(link => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-700"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/rfq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === '/rfq'
                  ? 'text-brand-700 bg-brand-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Request a Quote
            </Link>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 text-sm text-slate-500 hover:border-slate-300 hover:text-slate-700 transition-colors bg-slate-50"
              aria-label="Search products"
            >
              <Search className="w-4 h-4" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden md:inline text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            </button>

            <Link
              to="/rfq"
              className="hidden md:inline-flex items-center gap-1.5 bg-isa-600 hover:bg-isa-700 text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
            >
              Get a Quote
            </Link>

            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
            <button
              onClick={() => { setSearchOpen(true); setMobileOpen(false) }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
            >
              <Search className="w-4 h-4" /> Search products
            </button>
            <Link to="/products" className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50">
              All Products
            </Link>
            {productLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="block px-6 py-2 rounded-lg text-sm text-slate-600 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/rfq"
              className="block mt-2 text-center bg-isa-600 hover:bg-isa-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition-colors"
            >
              Request a Quote
            </Link>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

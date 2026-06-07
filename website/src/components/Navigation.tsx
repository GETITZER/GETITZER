import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap, ArrowRight } from 'lucide-react'
import { WhatsAppIcon, WA_URL } from './WhatsAppButton'

const productLinks = [
  { label: 'Ball Valve', sub: 'DN15–DN600 · API 6D', to: '/products/ball-valve' },
  { label: 'Butterfly Valve', sub: 'DN50–DN1200 · WRAS', to: '/products/butterfly-valve' },
  { label: 'Gate Valve', sub: 'DN50–DN1000 · SABS', to: '/products/gate-valve' },
  { label: 'Knife Gate Valve', sub: 'Slurry · Ceramic-lined', to: '/products/knife-gate-valve' },
  { label: 'ISA Pinch Valve', sub: 'ISO 5208 Grade A · 4 sleeves', to: '/products/pinch-valve' },
  { label: 'DXST Slurry KGV', sub: '466% longer life · Mining', to: '/products/dxst-kgv' },
]

const navLinks = [
  { label: 'Industries', to: '/industries' },
  { label: 'Catalog', to: '/catalog' },
  { label: 'Blog', to: '/blog' },
  { label: 'About', to: '/about' },
]

function ISALogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,30 16,2 22,30" fill="#3b82f6" />
      <polygon points="16,2 22,30 20,30 14,4" fill="#FF6A00" opacity="0.95" />
      <polygon points="22,30 30,30 24,10" fill="#A8B2C5" opacity="0.6" />
    </svg>
  )
}

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductOpen(false)
  }, [location])

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,17,31,0.95)' : 'rgba(8,17,31,0.3)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-3 group">
              <ISALogo />
              <div className="leading-none">
                <div className="font-display font-bold text-sm tracking-tight text-white group-hover:text-accent-400 transition-colors">ISA VALVE SOLUTIONS</div>
                <div className="text-[9px] font-semibold text-muted tracking-widest uppercase">& Industrial Supplies</div>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              <div className="relative" onMouseLeave={() => setProductOpen(false)}>
                <button
                  onMouseEnter={() => setProductOpen(true)}
                  onClick={() => setProductOpen(!productOpen)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  Products <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productOpen ? 'rotate-180' : ''}`} />
                </button>
                {productOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="p-2 shadow-2xl rounded-2xl" style={{ background: 'rgba(13,27,46,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {productLinks.map(p => (
                        <Link key={p.to} to={p.to} className="flex flex-col px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                          <span className="text-sm font-semibold text-white group-hover:text-accent-400 transition-colors">{p.label}</span>
                          <span className="text-xs text-muted mt-0.5">{p.sub}</span>
                        </Link>
                      ))}
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <Link to="/products" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-accent-400 hover:bg-white/5 transition-colors">
                          All Products <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? 'text-white bg-white/10'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <Link to="/configure" className="flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors">
                <Zap className="w-3.5 h-3.5" /> AI Selector
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
              </a>
              <Link to="/rfq" className="btn-primary !px-4 !py-2 !text-sm">Get Quote</Link>
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-16 overflow-y-auto" style={{ background: 'rgba(8,17,31,0.98)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 py-6 space-y-1">
            <p className="text-xs font-bold text-muted uppercase tracking-widest px-3 mb-3">Products</p>
            {productLinks.map(p => (
              <Link key={p.to} to={p.to} className="flex flex-col px-3 py-3 rounded-xl hover:bg-white/5 transition-colors">
                <span className="font-semibold text-white">{p.label}</span>
                <span className="text-xs text-muted mt-0.5">{p.sub}</span>
              </Link>
            ))}
            <div className="border-t border-white/10 my-3" />
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="block px-3 py-3 rounded-xl font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
                {link.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-3" />
            <Link to="/configure" className="flex items-center gap-2 px-3 py-3 rounded-xl font-bold text-accent-400">
              <Zap className="w-4 h-4" /> AI Valve Selector
            </Link>
            <Link to="/rfq" className="block mt-2">
              <div className="btn-primary justify-center text-center w-full">Get a Quote</div>
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center mt-3 text-sm font-semibold text-emerald-400">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Business
            </a>
          </div>
        </div>
      )}
    </>
  )
}

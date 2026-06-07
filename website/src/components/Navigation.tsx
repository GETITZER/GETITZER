import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap, ArrowRight, Calculator, BookOpen, Download, FileText, LayoutDashboard } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, SignedIn, SignedOut } from '@clerk/clerk-react'

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { WhatsAppIcon, WA_URL } from './WhatsAppButton'
import { ISALogoNav } from './ISALogo'

const productLinks = [
  { label: 'ISA Titan™ Ball Valve',      sub: 'DN15–DN600 · API 6D',          to: '/products/ball-valve',       color: '#006DFF' },
  { label: 'ISA Hydra™ Butterfly Valve', sub: 'DN50–DN1200 · WRAS',           to: '/products/butterfly-valve',  color: '#10b981' },
  { label: 'ISA Core™ Gate Valve',       sub: 'DN50–DN1000 · SABS 664',       to: '/products/gate-valve',       color: '#8b5cf6' },
  { label: 'ISA ProSeal™ Knife Gate',    sub: 'Slurry · Ceramic-lined',        to: '/products/knife-gate-valve', color: '#f59e0b' },
  { label: 'ISA Shield™ Pinch Valve',    sub: 'ISO 5208 Grade A · 4 sleeves', to: '/products/pinch-valve',      color: '#ef4444' },
  { label: 'ISA DXST™ Slurry KGV',      sub: '466% longer life · Mining',    to: '/products/dxst-kgv',         color: '#FF6A00' },
]

const resourceLinks = [
  { label: 'Engineering Calculators',   sub: 'Cv, flow, pressure drop',       to: '/calculators', icon: Calculator },
  { label: 'Resource Centre',           sub: 'Data sheets, selection guides',  to: '/resources',   icon: BookOpen },
  { label: 'Product Catalog',           sub: '40+ valve models, all specs',    to: '/catalog',     icon: Download },
  { label: 'Technical Blog',            sub: 'Application guides & articles',  to: '/blog',        icon: FileText },
]

const navLinks = [
  { label: 'Industries', to: '/industries' },
  { label: 'About',      to: '/about' },
]


export default function Navigation() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [productOpen,  setProductOpen]  = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false); setProductOpen(false); setResourceOpen(false)
  }, [location])

  const navBg = scrolled ? 'rgba(8,29,66,0.97)' : 'rgba(8,29,66,0.25)'
  const border = scrolled ? '1px solid rgba(255,255,255,0.07)' : '1px solid transparent'

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ background: navBg, backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', borderBottom: border }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link to="/" className="group">
              <ISALogoNav />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">

              {/* Products dropdown */}
              <div className="relative" onMouseLeave={() => setProductOpen(false)}>
                <button onMouseEnter={() => setProductOpen(true)} onClick={() => setProductOpen(!productOpen)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  Products <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
                </button>
                {productOpen && (
                  <div className="absolute top-full left-0 pt-2 w-80">
                    <div className="p-2 shadow-2xl rounded-2xl" style={{ background: 'rgba(8,29,66,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {productLinks.map(p => (
                        <Link key={p.to} to={p.to} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                          <div>
                            <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors block">{p.label}</span>
                            <span className="text-xs text-muted">{p.sub}</span>
                          </div>
                        </Link>
                      ))}
                      <div className="border-t border-white/5 mt-1 pt-1">
                        <Link to="/products" className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-blue-400 hover:bg-white/5 transition-colors">
                          All Products <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources dropdown */}
              <div className="relative" onMouseLeave={() => setResourceOpen(false)}>
                <button onMouseEnter={() => setResourceOpen(true)} onClick={() => setResourceOpen(!resourceOpen)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all">
                  Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourceOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourceOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="p-2 shadow-2xl rounded-2xl" style={{ background: 'rgba(8,29,66,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {resourceLinks.map(r => {
                        const Icon = r.icon
                        return (
                          <Link key={r.to} to={r.to} className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl hover:bg-white/5 transition-colors group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                              style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.2)' }}>
                              <Icon className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-white group-hover:text-blue-300 transition-colors block">{r.label}</span>
                              <span className="text-xs text-muted">{r.sub}</span>
                            </div>
                          </Link>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>

              {navLinks.map(link => (
                <Link key={link.to} to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === link.to ? 'text-white bg-white/10' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/configure" className="flex items-center gap-1.5 text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors">
                <Zap className="w-3.5 h-3.5" /> AI Selector
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
              </a>
              {CLERK_ENABLED && (
                <>
                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="text-sm font-semibold text-slate-300 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/5">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="text-sm font-semibold text-white px-3 py-1.5 rounded-lg transition-colors"
                        style={{ background: 'rgba(0,109,255,0.15)', border: '1px solid rgba(0,109,255,0.3)' }}>
                        Register
                      </button>
                    </SignUpButton>
                  </SignedOut>
                  <SignedIn>
                    <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-semibold text-blue-300 hover:text-blue-200 transition-colors">
                      <LayoutDashboard className="w-3.5 h-3.5" /> My Account
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </SignedIn>
                </>
              )}
              <Link to="/rfq" className="btn-primary !px-4 !py-2 !text-sm">Get Quote</Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-16 overflow-y-auto" style={{ background: 'rgba(8,29,66,0.99)', backdropFilter: 'blur(20px)' }}>
          <div className="px-4 py-6 space-y-1">
            <p className="text-xs font-bold text-muted uppercase tracking-widest px-3 mb-3">Products</p>
            {productLinks.map(p => (
              <Link key={p.to} to={p.to} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                <div>
                  <span className="font-semibold text-white block">{p.label}</span>
                  <span className="text-xs text-muted">{p.sub}</span>
                </div>
              </Link>
            ))}
            <Link to="/products" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-blue-400">
              All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="border-t border-white/10 my-4" />
            <p className="text-xs font-bold text-muted uppercase tracking-widest px-3 mb-3">Resources</p>
            {resourceLinks.map(r => {
              const Icon = r.icon
              return (
                <Link key={r.to} to={r.to} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-colors">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span className="font-semibold text-slate-200">{r.label}</span>
                </Link>
              )
            })}

            <div className="border-t border-white/10 my-4" />
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="block px-3 py-3 rounded-xl font-semibold text-slate-200 hover:text-white hover:bg-white/5 transition-colors">
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/10 my-4" />
            <Link to="/configure" className="flex items-center gap-2 px-3 py-3 rounded-xl font-bold text-accent-400">
              <Zap className="w-4 h-4" /> AI Valve Selector
            </Link>
            <Link to="/rfq" className="block mt-2">
              <div className="btn-primary justify-center text-center w-full">Get a Quote</div>
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center mt-3 text-sm font-semibold text-emerald-400">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Business
            </a>

            {CLERK_ENABLED && (
              <>
                <div className="border-t border-white/10 my-4" />
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="w-full text-sm font-semibold text-slate-200 px-3 py-3 rounded-xl hover:bg-white/5 text-left transition-colors">
                      Sign In to My Account
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full mt-1 text-sm font-bold text-white px-3 py-3 rounded-xl text-center transition-colors"
                      style={{ background: 'rgba(0,109,255,0.15)', border: '1px solid rgba(0,109,255,0.3)' }}>
                      Create Free Account
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-3 rounded-xl font-semibold text-blue-300 hover:bg-white/5 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> My Account / Dashboard
                  </Link>
                  <div className="px-3 py-2">
                    <UserButton afterSignOutUrl="/" showName />
                  </div>
                </SignedIn>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

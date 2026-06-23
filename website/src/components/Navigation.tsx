import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown, Zap, ArrowRight, Calculator, BookOpen, Download, FileText, LayoutDashboard } from 'lucide-react'
import { SignInButton, SignUpButton, UserButton, Show } from '@clerk/react'

const CLERK_ENABLED = !!import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
import { WhatsAppIcon, WA_URL } from './WhatsAppButton'
import { ISALogoNav } from './ISALogo'

const productLinks = [
  { label: 'Ball Valves',               sub: 'DN15–DN600 · API 6D · Manual & Actuated',   to: '/products/ball-valve' },
  { label: 'Butterfly Valves',          sub: 'DN50–DN1200 · WRAS · Triple Offset',          to: '/products/butterfly-valve' },
  { label: 'Gate Valves',               sub: 'DN50–DN1000 · SABS 664 · Full Bore',          to: '/products/gate-valve' },
  { label: 'Check Valves',              sub: 'Swing · Dual Plate · Piston · DN15–DN1200',   to: '/products/check-valve' },
  { label: 'Globe Valves',              sub: 'Y-Pattern & Angle · Flow Regulation',          to: '/products/globe-valve' },
  { label: 'Knife Gate Valves',         sub: 'Slurry · Mining Grade · Ceramic-lined',        to: '/products/knife-gate-valve' },
  { label: 'Pinch Valves',              sub: 'ISO 5208 Grade A · 4 Sleeve Grades',           to: '/products/pinch-valve' },
  { label: 'DXST Slurry KGV',          sub: '466% longer life · Mining #1',                 to: '/products/dxst-kgv' },
  { label: 'Diaphragm Valves',          sub: 'Chemical & Slurry · Weir & Full Bore',         to: '/products/diaphragm-valve' },
  { label: 'Control Valves',            sub: 'PRV · Flow Control · Level Control',           to: '/products/control-valve' },
  { label: 'Actuated Valves',           sub: 'Electric & Pneumatic · Full Assemblies',       to: '/products/actuated-valve' },
  { label: 'Solenoid Valves',           sub: '2/2 · 3/2 · On/Off · 24V DC / 220V AC',      to: '/products/solenoid-valve' },
  { label: 'Pneumatic Valves',          sub: '3/2 · 4/2 · 5/2 Way · Manifold Mount',        to: '/products/pneumatic-valve' },
  { label: 'Steam Valves',              sub: 'Gate · Globe · Check · Up to 550°C',           to: '/products/steam-valve' },
  { label: 'Steam Traps',               sub: 'Thermodynamic · Thermostatic · F&T',           to: '/products/steam-trap' },
  { label: 'Safety & Relief Valves',    sub: 'Spring-Loaded · Pilot-Operated · API 520',     to: '/products/safety-relief-valve' },
  { label: 'Pressure Reducing Valves',  sub: 'Direct-Acting & Pilot-Operated · DN15–DN300',  to: '/products/pressure-reducing-valve' },
  { label: 'Y-Strainers',               sub: 'Y-Type · Basket · Pipeline Protection',        to: '/products/y-strainer' },
  { label: 'Sight Glass',               sub: 'Single · Double Window · Wye · Borosilicate',  to: '/products/sight-glass' },
  { label: 'Block & Bleed Valves',      sub: 'DBB Globe · Needle · Gate · ANSI 300–600',     to: '/products/block-bleed-valve' },
  { label: 'Instrumentation',           sub: 'Gauges · Transmitters · Flow Meters',          to: '/products/instrumentation' },
  { label: 'Pipe Fittings',             sub: 'Flanges · Elbows · Tees · Reducers',           to: '/products/fittings' },
]

const resourceLinks = [
  { label: 'Engineering Calculators',   sub: 'Cv, flow, pressure drop',       to: '/calculators', icon: Calculator },
  { label: 'Resource Centre',           sub: 'Data sheets, selection guides',  to: '/resources',   icon: BookOpen },
  { label: 'Product Catalog',           sub: '40+ valve models, all specs',    to: '/catalog',     icon: Download },
  { label: 'Technical Blog',            sub: 'Application guides & articles',  to: '/blog',        icon: FileText },
]

const navLinks = [
  { label: 'Industries', to: '/industries' },
  { label: 'Projects',   to: '/projects' },
  { label: 'About',      to: '/about' },
]


export default function Navigation() {
  const [mobileOpen,   setMobileOpen]   = useState(false)
  const [productOpen,  setProductOpen]  = useState(false)
  const [resourceOpen, setResourceOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileOpen(false); setProductOpen(false); setResourceOpen(false)
  }, [location])

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 shadow-sm">
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
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                  Products <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
                </button>
                {productOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[860px]">
                    <div className="p-3 shadow-xl rounded-xl bg-white border border-slate-200">
                      <div className="grid grid-cols-3 gap-0.5 mb-1">
                        {productLinks.map(p => (
                          <Link key={p.to} to={p.to} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-isa-500 mt-1.5" />
                            <div>
                              <span className="text-sm font-semibold text-slate-900 group-hover:text-isa-600 transition-colors block leading-snug">{p.label}</span>
                              <span className="text-xs text-slate-400 leading-tight">{p.sub}</span>
                            </div>
                          </Link>
                        ))}
                      </div>
                      <div className="border-t border-slate-100 pt-2 px-2">
                        <Link to="/products" className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-sm font-bold text-isa-600 hover:bg-isa-50 transition-colors">
                          Browse All Products <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Resources dropdown */}
              <div className="relative" onMouseLeave={() => setResourceOpen(false)}>
                <button onMouseEnter={() => setResourceOpen(true)} onClick={() => setResourceOpen(!resourceOpen)}
                  className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all">
                  Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourceOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourceOpen && (
                  <div className="absolute top-full left-0 pt-2 w-72">
                    <div className="p-2 shadow-xl rounded-xl bg-white border border-slate-200">
                      {resourceLinks.map(r => {
                        const Icon = r.icon
                        return (
                          <Link key={r.to} to={r.to} className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-slate-50 transition-colors group">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-isa-50 border border-isa-100">
                              <Icon className="w-4 h-4 text-isa-500" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-slate-900 group-hover:text-isa-600 transition-colors block">{r.label}</span>
                              <span className="text-xs text-slate-500">{r.sub}</span>
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${location.pathname === link.to ? 'text-isa-600 bg-isa-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop CTAs */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/configure" className="flex items-center gap-1.5 text-sm font-semibold text-isa-600 hover:text-isa-700 transition-colors">
                <Zap className="w-3.5 h-3.5" /> AI Selector
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp
              </a>
              {CLERK_ENABLED && (
                <>
                  <Show when="signed-out">
                    <SignInButton mode="modal">
                      <button className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-50">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="text-sm font-semibold text-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-300 hover:bg-slate-50">
                        Register
                      </button>
                    </SignUpButton>
                  </Show>
                  <Show when="signed-in">
                    <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">
                      <LayoutDashboard className="w-3.5 h-3.5" /> My Account
                    </Link>
                    <UserButton />
                  </Show>
                </>
              )}
              <Link to="/rfq" className="btn-primary !px-4 !py-2 !text-sm">Get Quote</Link>
            </div>

            {/* Mobile toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors">
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden pt-16 overflow-y-auto bg-white">
          <div className="px-4 py-6 space-y-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Products</p>
            {productLinks.map(p => (
              <Link key={p.to} to={p.to} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-2 h-2 rounded-full flex-shrink-0 bg-isa-500" />
                <div>
                  <span className="font-semibold text-slate-900 block">{p.label}</span>
                  <span className="text-xs text-slate-500">{p.sub}</span>
                </div>
              </Link>
            ))}
            <Link to="/products" className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-isa-600">
              All Products <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <div className="border-t border-slate-100 my-4" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-3 mb-3">Resources</p>
            {resourceLinks.map(r => {
              const Icon = r.icon
              return (
                <Link key={r.to} to={r.to} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-slate-50 transition-colors">
                  <Icon className="w-4 h-4 text-isa-500" />
                  <span className="font-semibold text-slate-900">{r.label}</span>
                </Link>
              )
            })}

            <div className="border-t border-slate-100 my-4" />
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="block px-3 py-3 rounded-xl font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors">
                {link.label}
              </Link>
            ))}

            <div className="border-t border-slate-100 my-4" />
            <Link to="/configure" className="flex items-center gap-2 px-3 py-3 rounded-xl font-bold text-isa-600">
              <Zap className="w-4 h-4" /> AI Selector
            </Link>
            <Link to="/rfq" className="block mt-2">
              <div className="btn-primary justify-center text-center w-full">Get Quote</div>
            </Link>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center mt-3 text-sm font-semibold text-emerald-600">
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Business
            </a>

            {CLERK_ENABLED && (
              <>
                <div className="border-t border-slate-100 my-4" />
                <Show when="signed-out">
                  <SignInButton mode="modal">
                    <button className="w-full text-sm font-semibold text-slate-700 px-3 py-3 rounded-xl hover:bg-slate-50 text-left transition-colors">
                      Sign In to My Account
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="w-full mt-1 text-sm font-bold text-white px-3 py-3 rounded-xl text-center transition-colors bg-isa-500 hover:bg-isa-600">
                      Create Free Account
                    </button>
                  </SignUpButton>
                </Show>
                <Show when="signed-in">
                  <Link to="/dashboard" className="flex items-center gap-2 px-3 py-3 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
                    <LayoutDashboard className="w-4 h-4" /> My Account / Dashboard
                  </Link>
                  <div className="px-3 py-2">
                    <UserButton showName />
                  </div>
                </Show>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

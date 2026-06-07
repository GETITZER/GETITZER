import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'
import { WhatsAppIcon, WA_URL } from './WhatsAppButton'

function ISALogo() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,30 16,2 22,30" fill="#3b82f6" />
      <polygon points="16,2 22,30 20,30 14,4" fill="#FF6A00" opacity="0.95" />
      <polygon points="22,30 30,30 24,10" fill="#A8B2C5" opacity="0.6" />
    </svg>
  )
}

const productLinks = [
  { label: 'Ball Valve',            to: '/products/ball-valve' },
  { label: 'Butterfly Valve',       to: '/products/butterfly-valve' },
  { label: 'Gate Valve',            to: '/products/gate-valve' },
  { label: 'Knife Gate Valve',      to: '/products/knife-gate-valve' },
  { label: 'ISA Pinch Valve',       to: '/products/pinch-valve' },
  { label: 'DXST Slurry KGV',       to: '/products/dxst-kgv' },
]

const industryLinks = [
  { label: 'Mining',                to: '/industries/mining' },
  { label: 'Water Treatment',       to: '/industries/water-treatment' },
  { label: 'Oil & Gas',             to: '/industries/oil-gas' },
  { label: 'Chemical',              to: '/industries/chemical' },
  { label: 'HVAC',                  to: '/industries/hvac' },
  { label: 'Pulp & Paper',          to: '/industries/pulp-paper' },
]

const companyLinks = [
  { label: 'About Us',              to: '/about' },
  { label: 'Technical Blog',        to: '/blog' },
  { label: 'Product Catalog',       to: '/catalog' },
  { label: 'Request a Quote',       to: '/rfq' },
  { label: 'AI Valve Selector',     to: '/configure' },
  { label: 'Delivery & FAQ',        to: '/delivery-faq' },
]

export default function Footer() {
  return (
    <footer style={{ background: '#0D1B2E', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <ISALogo />
              <div className="leading-none">
                <div className="font-display font-bold text-sm tracking-tight text-white">ISA VALVE SOLUTIONS</div>
                <div className="text-[9px] font-semibold text-muted tracking-widest uppercase">& Industrial Supplies</div>
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6">
              25 years of precision-engineered valve solutions for mining, water treatment, oil & gas, chemical, and industrial applications across Southern Africa.
            </p>
            <div className="space-y-2.5 text-sm">
              <a href="tel:+270606885648" className="flex items-center gap-2 text-muted hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-accent-500" /> +27 060 688 5648
              </a>
              <a href="mailto:isa-valve@outlook.com" className="flex items-center gap-2 text-muted hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-accent-500" /> isa-valve@outlook.com
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors">
                <WhatsAppIcon className="w-3.5 h-3.5 flex-shrink-0" /> WhatsApp Business
              </a>
              <span className="flex items-start gap-2 text-muted">
                <MapPin className="w-3.5 h-3.5 text-accent-500 mt-0.5 flex-shrink-0" /> South Africa — Southern African supply network
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/products" className="text-sm font-semibold text-accent-400 hover:text-accent-300 transition-colors flex items-center gap-1">
                  All Products <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Industries</h3>
            <ul className="space-y-2.5">
              {industryLinks.map(ind => (
                <li key={ind.to}>
                  <Link to={ind.to} className="text-sm text-muted hover:text-white transition-colors">{ind.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Company</h3>
            <ul className="space-y-2.5">
              {companyLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>

            {/* Cert badge */}
            <div className="mt-6 px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
              <p className="text-xs font-bold text-white mb-1">ISO 9001:2015 Certified</p>
              <p className="text-xs text-muted leading-relaxed">All valves hydrostatic &amp; pneumatic tested at 1.5× rated pressure.</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} ISA Valve Solutions & Industrial Supplies. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-600">
            <span>ISO 9001:2015</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>API 6D</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>WRAS</span>
            <span className="w-1 h-1 rounded-full bg-slate-600" />
            <span>SABS</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

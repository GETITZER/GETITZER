import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ArrowRight, Calculator, BookOpen, Download } from 'lucide-react'
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
  { label: 'ISA Titan™ Ball Valve',       to: '/products/ball-valve' },
  { label: 'ISA Hydra™ Butterfly Valve',  to: '/products/butterfly-valve' },
  { label: 'ISA Core™ Gate Valve',        to: '/products/gate-valve' },
  { label: 'ISA ProSeal™ Knife Gate',     to: '/products/knife-gate-valve' },
  { label: 'ISA Shield™ Pinch Valve',     to: '/products/pinch-valve' },
  { label: 'ISA DXST™ Slurry KGV',       to: '/products/dxst-kgv' },
]

const industryLinks = [
  { label: 'Mining & Resources',          to: '/industries/mining' },
  { label: 'Water Treatment',             to: '/industries/water-treatment' },
  { label: 'Oil & Gas',                   to: '/industries/oil-gas' },
  { label: 'Chemical & Petrochemical',    to: '/industries/chemical' },
  { label: 'HVAC & Building Services',    to: '/industries/hvac' },
  { label: 'Pulp & Paper',                to: '/industries/pulp-paper' },
]

const resourceLinks = [
  { label: 'Engineering Calculators', to: '/calculators', icon: Calculator },
  { label: 'Resource Centre',         to: '/resources',   icon: BookOpen },
  { label: 'Technical Blog',          to: '/blog',        icon: BookOpen },
  { label: 'Product Catalog',         to: '/catalog',     icon: Download },
  { label: 'AI Valve Selector',       to: '/configure',   icon: null },
  { label: 'Request a Quote',         to: '/rfq',         icon: null },
  { label: 'About Us',                to: '/about',       icon: null },
  { label: 'Delivery & FAQ',          to: '/delivery-faq', icon: null },
]

export default function Footer() {
  return (
    <footer style={{ background: '#040e22', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Brand — 2 columns */}
          <div className="sm:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <ISALogo />
              <div className="leading-none">
                <div className="font-display font-bold text-sm tracking-tight text-white">ISA VALVE SOLUTIONS</div>
                <div className="text-[9px] font-semibold text-muted tracking-widest uppercase">& Industrial Supplies</div>
              </div>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-6 max-w-xs">
              Precision-engineered valve solutions for Mining, Water Treatment, Oil & Gas, Chemical and Industrial applications — ISO 9001:2015 certified, Southern Africa's engineering partner.
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
                <MapPin className="w-3.5 h-3.5 text-accent-500 mt-0.5 flex-shrink-0" /> South Africa · 6-country supply network
              </span>
            </div>

            {/* ISO cert badge */}
            <div className="mt-6 px-4 py-3 rounded-xl inline-flex items-center gap-3"
              style={{ background: 'rgba(0,109,255,0.07)', border: '1px solid rgba(0,109,255,0.15)' }}>
              <div className="text-xl">✦</div>
              <div>
                <p className="text-xs font-bold text-white">ISO 9001:2015 Certified</p>
                <p className="text-[10px] text-muted">API 6D · SABS · WRAS · ISO 5208</p>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Product Families</h3>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
              <li className="pt-1">
                <Link to="/products" className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
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

          {/* Resources */}
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-widest mb-5">Resources & Company</h3>
            <ul className="space-y-2.5">
              {resourceLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-muted hover:text-white transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p className="text-xs text-slate-600">© {new Date().getFullYear()} ISA Valve Solutions & Industrial Supplies. All rights reserved. South Africa.</p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
            {['ISO 9001:2015', 'API 6D', 'ISO 5208 Grd A', 'WRAS', 'SABS'].map((cert, i, arr) => (
              <span key={cert} className="flex items-center gap-3">
                <span>{cert}</span>
                {i < arr.length - 1 && <span className="w-1 h-1 rounded-full bg-slate-700" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

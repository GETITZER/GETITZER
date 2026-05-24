import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'

function ISALogoWhite() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="2,30 16,2 22,30" fill="#60a5fa" />
      <polygon points="16,2 22,30 20,30 14,4" fill="#ea580c" opacity="0.9" />
      <polygon points="22,30 30,30 24,10" fill="#9ca3af" />
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

const industryLinks = ['Mining', 'Water Treatment', 'Oil & Gas', 'Chemical & Petrochemical', 'HVAC', 'Pulp & Paper']

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <ISALogoWhite />
              <div className="leading-none">
                <div className="font-black text-sm tracking-tight text-white">ISA VALVE SOLUTIONS.</div>
                <div className="text-[10px] font-semibold text-isa-500 tracking-wider uppercase">& Industrial Supplies</div>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-5">
              25 years of precision-engineered valve solutions for mining, water treatment, oil & gas, chemical, and industrial applications.
            </p>
            <div className="space-y-2 text-sm">
              <a href="tel:+27000000000" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5 text-isa-500" /> +27 (0) 00 000 0000
              </a>
              <a href="mailto:info@isavalve.co.za" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5 text-isa-500" /> info@isavalve.co.za
              </a>
              <span className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-isa-500 mt-0.5 flex-shrink-0" /> South Africa — Global Partner Network
              </span>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Products</h3>
            <ul className="space-y-2.5">
              {productLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/products" className="text-sm text-isa-500 hover:text-isa-400 font-medium transition-colors">
                  All Products →
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Industries</h3>
            <ul className="space-y-2.5">
              {industryLinks.map(ind => (
                <li key={ind}>
                  <span className="text-sm">{ind}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Company</h3>
            <ul className="space-y-2.5">
              <li><Link to="/rfq" className="text-sm hover:text-white transition-colors">Request a Quote</Link></li>
              <li><span className="text-sm">Quality Assurance (ISO 9001:2015)</span></li>
              <li><span className="text-sm">Affiliate Programme</span></li>
              <li><span className="text-sm">Case Studies</span></li>
            </ul>

            <div className="mt-6 p-3 bg-white/5 rounded-lg border border-white/10">
              <p className="text-xs text-white font-semibold mb-1">ISO 9001:2015 Certified</p>
              <p className="text-xs leading-relaxed">All valves tested to hydrostatic &amp; pneumatic standards at 1.5× rated pressure.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} ISA Valve Solutions &amp; Industrial Supplies. All rights reserved.</p>
          <p className="text-xs text-slate-500">Engineering the Future, Sustainably</p>
        </div>
      </div>
    </footer>
  )
}

import { Link } from 'react-router-dom'
import { ArrowRight, Home, Search, Package } from 'lucide-react'

const suggestions = [
  { label: 'Browse all products', to: '/products', icon: Package },
  { label: 'Request a quote', to: '/rfq', icon: ArrowRight },
  { label: 'Search products', to: '/products', icon: Search },
  { label: 'Go home', to: '/', icon: Home },
]

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-20">
      <div className="max-w-lg text-center">
        <div className="relative inline-flex mb-8">
          <span className="text-[8rem] font-black text-slate-100 leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-2xl bg-isa-600 flex items-center justify-center shadow-xl">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <polygon points="2,30 16,2 22,30" fill="white" />
                <polygon points="16,2 22,30 20,30 14,4" fill="#fed7aa" opacity="0.9" />
                <polygon points="22,30 30,30 24,10" fill="white" opacity="0.5" />
              </svg>
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3">Page not found</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          The page you're looking for doesn't exist. It may have moved, or the URL may be incorrect.
          Our valve range and technical resources are all accessible from the links below.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {suggestions.map(({ label, to, icon: Icon }) => (
            <Link
              key={to + label}
              to={to}
              className="flex items-center gap-2.5 p-3.5 bg-white border border-slate-200 rounded-xl hover:border-brand-300 hover:shadow-sm transition-all text-sm font-semibold text-slate-700 hover:text-brand-700"
            >
              <Icon className="w-4 h-4 text-slate-400" />
              {label}
            </Link>
          ))}
        </div>

        <div className="text-sm text-slate-400">
          Need help?{' '}
          <a href="mailto:isa-valve@outlook.com" className="text-brand-600 hover:text-brand-700 font-semibold">
            isa-valve@outlook.com
          </a>
          {' '}or{' '}
          <a href="tel:+270606885648" className="text-brand-600 hover:text-brand-700 font-semibold">
            +27 060 688 5648
          </a>
        </div>
      </div>
    </div>
  )
}

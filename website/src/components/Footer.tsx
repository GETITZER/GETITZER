import { Link } from 'react-router-dom'
import { Zap } from 'lucide-react'

const columns = [
  {
    heading: 'Product',
    links: [
      { label: 'Guides', to: '/guides' },
      { label: 'Get a Quote', to: '/rfq' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Website Inspiration', to: '/guides' },
      { label: 'B2B Lead Generation', to: '/guides/b2b-lead-generation' },
      { label: 'SaaS Best Practices', to: '/guides/saas-website-best-practices' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', to: '/' },
      { label: 'GitHub', to: 'https://github.com/GETITZER', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">GetItzer</span>
            </Link>
            <p className="text-sm leading-relaxed">
              AI-powered guides for building better digital experiences.
            </p>
            <p className="text-xs mt-6 text-slate-500">© {new Date().getFullYear()} GetItzer. All rights reserved.</p>
          </div>

          {columns.map(col => (
            <div key={col.heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{col.heading}</h3>
              <ul className="space-y-3">
                {col.links.map(link =>
                  link.external ? (
                    <li key={link.label}>
                      <a
                        href={link.to}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ) : (
                    <li key={link.label}>
                      <Link to={link.to} className="text-sm hover:text-white transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

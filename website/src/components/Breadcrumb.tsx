import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import SchemaMarkup from './SchemaMarkup'

interface Crumb {
  label: string
  to?: string
}

interface BreadcrumbProps {
  crumbs: Crumb[]
  className?: string
}

export default function Breadcrumb({ crumbs, className = '' }: BreadcrumbProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.to ? { item: `https://www.isavalvesolutions.com${crumb.to}` } : {}),
    })),
  }

  return (
    <>
      <SchemaMarkup schema={schema} />
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-xs text-slate-400 ${className}`}>
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="w-3 h-3 text-slate-300 flex-shrink-0" />}
            {crumb.to && i < crumbs.length - 1 ? (
              <Link to={crumb.to} className="hover:text-isa-600 transition-colors">{crumb.label}</Link>
            ) : (
              <span className={i === crumbs.length - 1 ? 'text-slate-600 font-medium' : ''}>{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  )
}

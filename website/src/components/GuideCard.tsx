import { Link } from 'react-router-dom'
import { Clock, ArrowRight } from 'lucide-react'
import type { Guide } from '../types'

interface GuideCardProps {
  guide: Guide
  featured?: boolean
}

export default function GuideCard({ guide, featured }: GuideCardProps) {
  const categoryColors: Record<string, string> = {
    'Website Inspiration': 'bg-violet-100 text-violet-700',
    Resources: 'bg-blue-100 text-blue-700',
    Community: 'bg-emerald-100 text-emerald-700',
  }

  const colorClass = categoryColors[guide.category] ?? 'bg-slate-100 text-slate-600'

  if (featured) {
    return (
      <Link
        to={`/guides/${guide.slug}`}
        className="group card p-6 flex flex-col gap-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
            {guide.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock className="w-3 h-3" />
            {guide.readTime}
          </span>
        </div>

        <div>
          <h3 className="font-bold text-slate-900 text-lg leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
            {guide.title}
          </h3>
          <p className="text-slate-500 text-sm mt-2 leading-relaxed line-clamp-3">{guide.excerpt}</p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
          <div className="flex gap-1.5 flex-wrap">
            {guide.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-xs text-slate-400 bg-slate-50 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          <ArrowRight className="w-4 h-4 text-brand-500 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/guides/${guide.slug}`}
      className="group card p-5 flex flex-col gap-3 hover:shadow-md transition-all duration-200"
    >
      <span className={`self-start text-xs font-semibold px-2.5 py-1 rounded-full ${colorClass}`}>
        {guide.category}
      </span>

      <h3 className="font-semibold text-slate-900 leading-snug group-hover:text-brand-600 transition-colors line-clamp-2">
        {guide.title}
      </h3>

      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">{guide.excerpt}</p>

      <div className="flex items-center gap-3 mt-auto pt-2 border-t border-slate-100 text-xs text-slate-400">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {guide.readTime}
        </span>
        <span>{guide.publishedAt}</span>
      </div>
    </Link>
  )
}

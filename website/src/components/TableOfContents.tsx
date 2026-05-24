import { useState, useEffect } from 'react'
import type { GuideSection } from '../types'

interface TableOfContentsProps {
  sections: GuideSection[]
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    )

    for (const section of sections) {
      const el = document.getElementById(section.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [sections])

  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">On this page</p>
      {sections.map(section => (
        <a
          key={section.id}
          href={`#${section.id}`}
          onClick={e => {
            e.preventDefault()
            document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }}
          className={`block text-sm py-1 px-3 rounded-md transition-colors border-l-2 ${
            activeId === section.id
              ? 'text-brand-600 border-brand-500 bg-brand-50 font-medium'
              : 'text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300'
          }`}
        >
          {section.title}
        </a>
      ))}
    </nav>
  )
}

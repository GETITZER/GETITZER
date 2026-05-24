import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import SchemaMarkup from './SchemaMarkup'

export interface FAQ {
  q: string
  a: string
}

interface Props {
  faqs: FAQ[]
  schemaId: string
}

export default function FAQSection({ faqs, schemaId }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  return (
    <section>
      <SchemaMarkup schema={{ ...schema, _id: schemaId }} />
      <h2 className="text-xl font-black text-slate-900 mb-5">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
            >
              <span className="font-semibold text-slate-900 text-sm pr-4">{faq.q}</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
              />
            </button>
            {open === i && (
              <div className="px-5 pb-5 border-t border-slate-100">
                <p className="text-sm text-slate-600 leading-relaxed pt-4">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

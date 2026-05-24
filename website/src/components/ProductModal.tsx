import { useState, useEffect, useCallback } from 'react'
import { X, ArrowRight, CheckCircle, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { WhatsAppIcon, WA_URL } from './WhatsAppButton'
import ValveIllustration from './ValveIllustration'
import type { Product } from '../types'

interface Props {
  product: Product | null
  onClose: () => void
}

const badgeBg: Record<string, string> = {
  isa: 'bg-isa-600 text-white',
  brand: 'bg-brand-600 text-white',
  green: 'bg-green-600 text-white',
  red: 'bg-red-600 text-white',
}

export default function ProductModal({ product, onClose }: Props) {
  const [activeVariant, setActiveVariant] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden'
      requestAnimationFrame(() => setVisible(true))
      setActiveVariant(0)
    } else {
      setVisible(false)
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [product])

  const close = useCallback(() => {
    setVisible(false)
    setTimeout(onClose, 200)
  }, [onClose])

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }, [close])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  if (!product) return null

  const hasVariants = product.variants && product.variants.length > 0
  const currentVariant = hasVariants ? product.variants![activeVariant] : null
  const slugType = product.slug as 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve' | 'pinch-valve' | 'dxst-kgv'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 transition-all duration-200 ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={e => { if (e.target === e.currentTarget) close() }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={close} />

      {/* Modal */}
      <div className={`relative w-full sm:max-w-4xl max-h-[96vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white shadow-2xl transition-all duration-300 ${visible ? 'translate-y-0' : 'translate-y-8'}`}>

        {/* Engineering grid pattern header */}
        <div className="relative rounded-t-3xl sm:rounded-t-3xl overflow-hidden" style={{ background: 'linear-gradient(135deg,#0f2744 0%,#1e3a8a 70%,#1d4ed8 100%)' }}>
          <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#fff 0,#fff 1px,transparent 0,transparent 50%)', backgroundSize: '24px 24px' }} />

          <div className="relative p-6 sm:p-8">
            <button onClick={close} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              {/* Illustration */}
              <div className="flex-shrink-0 w-full sm:w-56 h-44 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 p-4">
                <ValveIllustration type={slugType} className="w-full h-full" />
              </div>

              {/* Title block */}
              <div className="flex-1">
                {product.badge && (
                  <div className={`inline-flex items-center gap-1.5 text-xs font-black px-3 py-1 rounded-full mb-3 ${badgeBg[product.badgeColor ?? 'isa']}`}>
                    <Shield className="w-3 h-3" /> {product.badge}
                  </div>
                )}
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{product.name}</h2>
                <p className="text-isa-300 font-semibold mt-1 text-sm sm:text-base">{product.tagline}</p>
                <p className="text-blue-200 text-sm mt-3 leading-relaxed max-w-lg">{product.description}</p>

                {/* Compliance chips */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.compliance.map(c => (
                    <span key={c} className="text-xs font-semibold bg-white/10 text-blue-100 border border-white/20 px-2.5 py-1 rounded-lg">{c}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-8">

            {/* Left: Specs + highlights */}
            <div>
              {product.highlights && product.highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Key Advantages</h3>
                  <ul className="space-y-2.5">
                    {product.highlights.map(h => (
                      <li key={h} className="flex items-start gap-2.5">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 leading-snug">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specs table */}
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Specifications</h3>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  {product.specs.slice(0, 6).map((spec, i) => (
                    <div key={spec.label} className={`flex text-sm ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0`}>
                      <div className="w-36 flex-shrink-0 px-3 py-2.5 font-semibold text-slate-500 text-xs">{spec.label}</div>
                      <div className="px-3 py-2.5 text-slate-800 text-xs">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Variants (if any) + industries */}
            <div>
              {hasVariants && (
                <div className="mb-6">
                  <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Sleeve / Grade Selector</h3>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.variants!.map((v, i) => (
                      <button
                        key={v.name}
                        onClick={() => setActiveVariant(i)}
                        className={`text-left p-3 rounded-xl border-2 transition-all ${activeVariant === i ? 'border-current shadow-md' : 'border-slate-200 hover:border-slate-300'}`}
                        style={activeVariant === i ? { borderColor: v.color, backgroundColor: v.color + '15' } : {}}
                      >
                        <p className="text-xs font-black" style={{ color: v.color }}>{v.name}</p>
                        <p className="text-xs text-slate-500 leading-tight mt-0.5">{v.subtitle}</p>
                      </button>
                    ))}
                  </div>
                  {currentVariant && (
                    <div className="p-4 rounded-xl border-2 transition-all" style={{ borderColor: currentVariant.color, backgroundColor: currentVariant.color + '10' }}>
                      <p className="text-sm font-bold mb-2" style={{ color: currentVariant.color }}>{currentVariant.name} — {currentVariant.subtitle}</p>
                      <p className="text-xs text-slate-600 mb-2">{currentVariant.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {currentVariant.applications.map(a => (
                          <span key={a} className="text-xs px-2 py-0.5 rounded-full text-white font-medium" style={{ backgroundColor: currentVariant.color }}>{a}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Industries */}
              <div className="mb-6">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-3">Industries Served</h3>
                <div className="flex flex-wrap gap-2">
                  {product.industries.map(ind => (
                    <span key={ind} className="flex items-center gap-1 text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> {ind}
                    </span>
                  ))}
                </div>
              </div>

              {/* When to specify */}
              <div className="p-4 bg-brand-50 border border-brand-200 rounded-xl">
                <p className="text-xs font-bold text-brand-900 mb-1 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" /> When to Specify
                </p>
                <p className="text-xs text-brand-800 leading-relaxed">{product.useCase}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 border-t border-slate-100 mt-2 flex flex-wrap gap-3 items-center justify-between">
          <div className="flex flex-wrap gap-3">
            <Link
              to="/rfq"
              onClick={close}
              className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
              style={{ background: '#25D366', color: '#fff' }}
            >
              <WhatsAppIcon className="w-4 h-4" /> WhatsApp Query
            </a>
          </div>
          {['ball-valve','butterfly-valve','gate-valve','knife-gate-valve','pinch-valve','dxst-kgv'].includes(product.slug) && (
            <Link
              to={`/products/${product.slug}`}
              onClick={close}
              className="text-sm text-brand-600 hover:text-brand-800 font-semibold flex items-center gap-1"
            >
              Full product page <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

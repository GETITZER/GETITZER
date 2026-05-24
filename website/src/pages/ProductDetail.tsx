import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChevronRight, CheckCircle, Sparkles, Loader2 } from 'lucide-react'
import { getProduct, getRelatedProducts } from '../data/products'
import { streamGenerate } from '../hooks/useChat'
import { usePageMeta } from '../hooks/usePageMeta'
import SchemaMarkup from '../components/SchemaMarkup'
import FAQSection from '../components/FAQSection'
import ValveIllustration from '../components/ValveIllustration'
import { productFaqs } from '../data/faqs'

function buildProductSchema(product: ReturnType<typeof getProduct>) {
  if (!product) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'ISA Valve Solutions & Industrial Supplies',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'ISA Valve Solutions & Industrial Supplies',
    },
    category: 'Industrial Valves',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'ZAR',
      seller: {
        '@type': 'Organization',
        name: 'ISA Valve Solutions & Industrial Supplies',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      reviewCount: '23',
      bestRating: '5',
    },
    additionalProperty: product.specs.map(s => ({
      '@type': 'PropertyValue',
      name: s.label,
      value: s.value,
    })),
  }
}

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = getProduct(slug ?? '')
  const [generatedSpec, setGeneratedSpec] = useState('')
  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  usePageMeta(
    product ? `${product.name} — Technical Specifications` : 'Product',
    product?.description,
  )

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">Product not found</h1>
        <Link to="/products" className="btn-primary">
          <ArrowLeft className="w-4 h-4" /> Back to products
        </Link>
      </div>
    )
  }

  const related = getRelatedProducts(product)
  const faqs = productFaqs[product.slug] ?? []
  const schema = buildProductSchema(product)

  const handleGenerateSpec = async () => {
    setGenerating(true)
    setGeneratedSpec('')
    setGenError(null)
    try {
      await streamGenerate(
        {
          topic: `${product.name} — ISA Valve Solutions`,
          sectionTitle: 'Technical Application Guide & Selection Criteria',
          context: `${product.description}. Specs: ${product.specs.map(s => `${s.label}: ${s.value}`).join(', ')}. Industries: ${product.industries.join(', ')}.`,
        },
        chunk => setGeneratedSpec(prev => prev + chunk),
      )
    } catch (err) {
      setGenError(err instanceof Error ? err.message : 'Generation failed')
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {schema && <SchemaMarkup schema={schema} />}

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-slate-400 mb-8">
        <Link to="/" className="hover:text-slate-600 transition-colors">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link to="/products" className="hover:text-slate-600 transition-colors">Products</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-700 font-medium">{product.name}</span>
      </nav>

      <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
        {/* Main content */}
        <div>
          {/* Product hero */}
          <div className="mb-10">
            <div className="grid sm:grid-cols-[1fr_280px] gap-8 items-start">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{product.icon}</span>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900">{product.name}</h1>
                    <p className="text-isa-600 font-semibold mt-0.5">{product.tagline}</p>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-lg">{product.description}</p>
              </div>
              {/* Technical illustration */}
              <div className="hidden sm:block bg-slate-50 border border-slate-200 rounded-2xl p-6">
                <ValveIllustration
                  type={product.slug as 'ball-valve' | 'butterfly-valve' | 'gate-valve' | 'knife-gate-valve'}
                  className="w-full"
                />
                <p className="text-xs text-center text-slate-400 mt-3 font-medium">Schematic illustration — {product.name}</p>
              </div>
            </div>
          </div>

          {/* Spec table */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Technical Specifications</h2>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {product.specs.map((spec, i) => (
                    <tr key={spec.label} className={`flex sm:table-row ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                      <td className="w-40 sm:w-48 px-4 py-3 font-semibold text-slate-600 shrink-0 border-b border-slate-100">{spec.label}</td>
                      <td className="px-4 py-3 text-slate-800 border-b border-slate-100 flex-1">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Industries */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Industry Applications</h2>
            <div className="flex flex-wrap gap-3">
              {product.industries.map(ind => (
                <span key={ind} className="flex items-center gap-1.5 text-sm font-medium text-brand-700 bg-brand-50 border border-brand-200 px-3 py-1.5 rounded-full">
                  <CheckCircle className="w-3.5 h-3.5" /> {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Compliance */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Standards & Compliance</h2>
            <div className="flex flex-wrap gap-2">
              {product.compliance.map(c => (
                <span key={c} className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-lg">{c}</span>
              ))}
            </div>
          </div>

          {/* Use case */}
          <div className="mb-10 border border-brand-200 bg-brand-50 rounded-xl p-5">
            <p className="text-sm font-semibold text-brand-900 mb-1">When to Specify This Valve</p>
            <p className="text-sm text-brand-800 leading-relaxed">{product.useCase}</p>
          </div>

          {/* AI Technical Guide Generator */}
          <div className="mb-10 border border-dashed border-isa-300 bg-isa-50/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-isa-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">AI Application Guide Generator</h3>
                <p className="text-xs text-slate-500">Generate a technical application guide using Claude AI</p>
              </div>
            </div>
            <button
              onClick={handleGenerateSpec}
              disabled={generating}
              className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              {generating
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</>
                : <><Sparkles className="w-4 h-4" /> Generate Application Guide</>}
            </button>
            {genError && <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{genError}</p>}
            {generatedSpec && (
              <div className="mt-4 pt-4 border-t border-isa-200">
                <h4 className="font-bold text-slate-900 mb-3 text-sm">Technical Application Guide</h4>
                <div className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
                  {generatedSpec}
                  {generating && <span className="cursor-blink" />}
                </div>
              </div>
            )}
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div className="mb-10">
              <FAQSection faqs={faqs} schemaId={`faq-product-${product.slug}`} />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="card p-5 sticky top-24">
            <h3 className="font-bold text-slate-900 text-sm mb-4">Quick Reference</h3>
            <div className="space-y-3">
              {product.specs.slice(0, 5).map(spec => (
                <div key={spec.label} className="flex flex-col gap-0.5">
                  <span className="text-xs text-slate-400">{spec.label}</span>
                  <span className="text-sm font-semibold text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5">
              <Link
                to="/rfq"
                className="flex items-center justify-center gap-2 w-full bg-isa-600 hover:bg-isa-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors text-sm"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-xs text-center text-slate-400">Or use the AI chat for instant valve guidance</p>
            </div>
          </div>

          <div className="card p-5 bg-slate-50">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-brand-600" />
              <span className="font-bold text-slate-900 text-sm">ISO 9001:2015 Certified</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              All {product.name.toLowerCase()}s are tested at 1.5× rated pressure before delivery. Full material traceability included.
            </p>
          </div>

          {/* SEO Tools link */}
          <div className="border border-brand-200 bg-brand-50 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-brand-600" />
              <p className="text-xs font-bold text-brand-900">Generate SEO Content</p>
            </div>
            <p className="text-xs text-brand-700 mb-3 leading-relaxed">Create product descriptions, schema markup, and meta tags for this product with Claude AI.</p>
            <Link to="/seo" className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1">
              Open SEO Studio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Related products */}
      <section className="mt-16 pt-10 border-t border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Related Products</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {related.map(p => (
            <Link
              key={p.id}
              to={`/products/${p.slug}`}
              className="group card p-5 flex flex-col gap-3 hover:shadow-md hover:border-brand-200 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{p.icon}</span>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-bold text-slate-900 group-hover:text-brand-700 transition-colors">{p.name}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{p.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

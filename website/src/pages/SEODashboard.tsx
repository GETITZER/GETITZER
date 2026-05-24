import { useState } from 'react'
import {
  FileText, Code2, Newspaper, Search, Wrench, LayoutList, HelpCircle, Tag,
  Loader2, Copy, CheckCheck, ChevronRight, Sparkles, ExternalLink,
} from 'lucide-react'
import { products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

// ─── SSE streaming helper ─────────────────────────────────────────────────────
async function streamSEO(
  endpoint: string,
  body: object,
  onChunk: (t: string) => void,
): Promise<void> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const e = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(e.error ?? `HTTP ${res.status}`)
  }
  const reader = res.body!.getReader()
  const dec = new TextDecoder()
  let buf = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buf += dec.decode(value, { stream: true })
    const parts = buf.split('\n\n')
    buf = parts.pop() ?? ''
    for (const part of parts) {
      if (!part.startsWith('data: ')) continue
      try {
        const d = JSON.parse(part.slice(6)) as { text?: string; done?: boolean; error?: string }
        if (d.error) throw new Error(d.error)
        if (d.done) return
        if (d.text) onChunk(d.text)
      } catch { /* skip */ }
    }
  }
}

async function callSEO<T>(endpoint: string, body: object): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json() as Promise<T>
}

// ─── Tool definitions ─────────────────────────────────────────────────────────
const tools = [
  { id: 'describe',  label: 'Product Description', icon: FileText,   streaming: true },
  { id: 'schema',    label: 'Schema Markup',        icon: Code2,      streaming: false },
  { id: 'blog',      label: 'Blog Post',            icon: Newspaper,  streaming: true },
  { id: 'keywords',  label: 'Keyword Research',     icon: Search,     streaming: false },
  { id: 'audit',     label: 'Technical SEO Audit',  icon: Wrench,     streaming: true },
  { id: 'category',  label: 'Category Page',        icon: LayoutList, streaming: true },
  { id: 'faq',       label: 'FAQ Generator',         icon: HelpCircle, streaming: false },
  { id: 'meta',      label: 'Meta Tags',            icon: Tag,        streaming: false },
] as const
type ToolId = typeof tools[number]['id']

const ISA_PRODUCTS = products.map(p => p.name)

// ─── Copy button ──────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-700 border border-slate-200 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
    >
      {copied ? <><CheckCheck className="w-3.5 h-3.5 text-emerald-500" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
    </button>
  )
}

// ─── Streaming output renderer ────────────────────────────────────────────────
function StreamOutput({ text, streaming }: { text: string; streaming: boolean }) {
  if (!text) return null
  return (
    <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output</span>
        <CopyButton text={text} />
      </div>
      <div className="p-5 max-h-[600px] overflow-y-auto">
        {text.split('\n').map((line, i) => {
          if (line.startsWith('# '))  return <h2 key={i} className="text-lg font-black text-slate-900 mt-4 mb-2 first:mt-0">{line.slice(2)}</h2>
          if (line.startsWith('## ')) return <h3 key={i} className="text-sm font-black text-slate-900 mt-4 mb-1.5 first:mt-0 uppercase tracking-wider text-brand-700">{line.slice(3)}</h3>
          if (line.startsWith('### ')) return <h4 key={i} className="text-sm font-bold text-slate-800 mt-3 mb-1">{line.slice(4)}</h4>
          if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-sm font-bold text-slate-900 mt-3 mb-1">{line.slice(2, -2)}</p>
          if (line.startsWith('**Q') || line.startsWith('**Q:')) return <p key={i} className="text-sm font-bold text-slate-900 mt-4 mb-1">{line.replace(/\*\*/g, '')}</p>
          if (line.startsWith('A: ')) return <p key={i} className="text-sm text-slate-600 ml-3 mb-3 leading-relaxed border-l-2 border-brand-200 pl-3">{line.slice(3)}</p>
          if (line.startsWith('META: ')) return (
            <div key={i} className="my-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs font-bold text-emerald-700 mb-0.5">Meta Description ({line.slice(6).length} chars)</p>
              <p className="text-sm text-emerald-900">{line.slice(6)}</p>
            </div>
          )
          if (line.startsWith('META_TITLE: ')) return (
            <div key={i} className="my-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs font-bold text-blue-700 mb-0.5">Meta Title ({line.slice(12).length}/60 chars)</p>
              <p className={`text-sm font-semibold ${line.slice(12).length > 60 ? 'text-red-700' : 'text-blue-900'}`}>{line.slice(12)}</p>
            </div>
          )
          if (line.startsWith('META_DESC: ')) return (
            <div key={i} className="my-2 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-xs font-bold text-emerald-700 mb-0.5">Meta Description ({line.slice(11).length}/155 chars)</p>
              <p className={`text-sm ${line.slice(11).length > 155 ? 'text-red-700' : 'text-emerald-900'}`}>{line.slice(11)}</p>
            </div>
          )
          if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="text-sm text-slate-600 ml-5 mb-1 list-disc leading-relaxed">{line.slice(2)}</li>
          if (line.startsWith('|') && line.includes('|')) {
            const cells = line.split('|').filter(c => c.trim())
            const isHeader = text.split('\n')[i + 1]?.includes('---')
            const isDivider = line.includes('---')
            if (isDivider) return null
            return (
              <tr key={i} className={isHeader ? 'bg-slate-100 font-semibold' : 'border-t border-slate-100'}>
                {cells.map((cell, j) => (
                  <td key={j} className="px-3 py-2 text-xs text-slate-700">{cell.trim()}</td>
                ))}
              </tr>
            )
          }
          if (line.trim()) return <p key={i} className="text-sm text-slate-700 mb-2 leading-relaxed">{line}</p>
          return <div key={i} className="h-2" />
        })}
        {streaming && <span className="cursor-blink text-brand-600" />}
      </div>
    </div>
  )
}

// ─── JSON output renderer ─────────────────────────────────────────────────────
function JsonOutput({ data }: { data: object }) {
  const text = JSON.stringify(data, null, 2)
  return (
    <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-700">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">JSON-LD</span>
        <div className="flex items-center gap-2">
          <a
            href="https://search.google.com/test/rich-results"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200"
          >
            Test in Google <ExternalLink className="w-3 h-3" />
          </a>
          <CopyButton text={text} />
        </div>
      </div>
      <pre className="p-5 bg-slate-900 text-emerald-400 text-xs leading-relaxed overflow-x-auto max-h-[500px] overflow-y-auto font-mono">
        {text}
      </pre>
    </div>
  )
}

// ─── Individual tool panels ───────────────────────────────────────────────────
function ProductDescribeTool() {
  const [product, setProduct] = useState('')
  const [keywords, setKeywords] = useState('')
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const selectedProduct = products.find(p => p.name === product)

  const run = async () => {
    setStreaming(true); setOutput(''); setError(null)
    try {
      await streamSEO('/api/seo/describe',
        { productName: product, keywords, specs: selectedProduct?.specs.map(s => `${s.label}: ${s.value}`).join(', ') },
        chunk => setOutput(prev => prev + chunk))
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setStreaming(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate SEO-optimized product descriptions with keyword-rich H2 headings, meta description, and a clear call-to-action.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Product</label>
          <select value={product} onChange={e => setProduct(e.target.value)} className="field-input">
            <option value="">Select a product…</option>
            {ISA_PRODUCTS.map(p => <option key={p}>{p}</option>)}
            <option value="Custom">Custom product name…</option>
          </select>
          {product === 'Custom' && (
            <input type="text" placeholder="Enter product name" className="field-input mt-2"
              onChange={e => setProduct(e.target.value)} />
          )}
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Target Keywords <span className="font-normal text-slate-400">(comma-separated)</span></label>
          <input type="text" value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. ball valve South Africa, industrial ball valve, API 6D valve" className="field-input" />
        </div>
        <button onClick={run} disabled={!product || !keywords || streaming} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {streaming ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Sparkles className="w-4 h-4" /> Generate Description</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <StreamOutput text={output} streaming={streaming} />
      </div>
    </div>
  )
}

function SchemaMarkupTool() {
  const [product, setProduct] = useState('')
  const [sku, setSku] = useState('')
  const [price, setPrice] = useState('')
  const [schema, setSchema] = useState<object | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const selectedProduct = products.find(p => p.name === product)

  const run = async () => {
    setLoading(true); setSchema(null); setError(null)
    try {
      const res = await callSEO<{ schema: object }>('/api/seo/schema', {
        productName: product, sku, price,
        description: selectedProduct?.description,
      })
      setSchema(res.schema)
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate valid JSON-LD Product schema markup. Paste the output into your page's <code className="bg-slate-100 px-1 rounded text-xs">&lt;head&gt;</code> to enable Google Rich Results.</p>
      <div className="space-y-4">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-3">
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Product</label>
            <select value={product} onChange={e => setProduct(e.target.value)} className="field-input">
              <option value="">Select a product…</option>
              {ISA_PRODUCTS.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">SKU</label>
            <input value={sku} onChange={e => setSku(e.target.value)} placeholder="e.g. ISA-BV-100-PN16" className="field-input" />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1.5">Price (ZAR)</label>
            <input value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 2 850.00" className="field-input" />
          </div>
        </div>
        <button onClick={run} disabled={!product || !sku || !price || loading} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Code2 className="w-4 h-4" /> Generate Schema</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {schema && <JsonOutput data={schema} />}
      </div>
    </div>
  )
}

function BlogTool() {
  const TOPICS = [
    'How to Select the Right Valve for Mining Slurry Applications',
    'Ball Valve vs Butterfly Valve: Which Should You Specify?',
    'Understanding SABS and ISO Valve Certifications in South Africa',
    'Extending Knife Gate Valve Life with Ceramic Lining',
    'HVAC Valve Selection: Butterfly vs Gate for Building Services',
    'Why Valves Fail in Slurry Service and How to Prevent It',
  ]
  const [topic, setTopic] = useState('')
  const [customTopic, setCustomTopic] = useState('')
  const [keywords, setKeywords] = useState('')
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const activeTopic = topic === 'custom' ? customTopic : topic

  const run = async () => {
    setStreaming(true); setOutput(''); setError(null)
    try {
      await streamSEO('/api/seo/blog', { topic: activeTopic, keywords }, chunk => setOutput(prev => prev + chunk))
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setStreaming(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate a 1,000-word SEO blog post with 5 keyword-rich subheadings, FAQ section, and meta tags.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Topic</label>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="field-input">
            <option value="">Select a topic…</option>
            {TOPICS.map(t => <option key={t}>{t}</option>)}
            <option value="custom">Custom topic…</option>
          </select>
          {topic === 'custom' && (
            <input value={customTopic} onChange={e => setCustomTopic(e.target.value)} placeholder="Enter your blog topic" className="field-input mt-2" />
          )}
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Target Keywords</label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. knife gate valve, slurry valve, mining valve South Africa" className="field-input" />
        </div>
        <button onClick={run} disabled={!activeTopic || !keywords || streaming} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {streaming ? <><Loader2 className="w-4 h-4 animate-spin" /> Writing post…</> : <><Newspaper className="w-4 h-4" /> Generate Blog Post</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <StreamOutput text={output} streaming={streaming} />
      </div>
    </div>
  )
}

function KeywordTool() {
  const [productOrCategory, setProductOrCategory] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true); setOutput(''); setError(null)
    try {
      const res = await callSEO<{ keywords: string }>('/api/seo/keywords', { productOrCategory })
      setOutput(res.keywords)
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Get keywords organized by funnel stage — Awareness, Consideration, and Purchase — with long-tail variations and search intent notes.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Product or Category</label>
          <input value={productOrCategory} onChange={e => setProductOrCategory(e.target.value)} placeholder="e.g. Ball Valve, Industrial Valves South Africa, Mining Valves" className="field-input" />
        </div>
        <button onClick={run} disabled={!productOrCategory || loading} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Researching…</> : <><Search className="w-4 h-4" /> Research Keywords</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {output && (
          <div className="mt-5 border border-slate-200 rounded-xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Keyword Research</span>
              <CopyButton text={output} />
            </div>
            <div className="p-5 overflow-x-auto">
              {output.split('\n').map((line, i) => {
                if (line.startsWith('## ')) return <h3 key={i} className="text-sm font-black text-brand-700 uppercase tracking-wider mt-5 mb-3 first:mt-0">{line.slice(3)}</h3>
                if (line.startsWith('|') && !line.includes('---')) {
                  const cells = line.split('|').filter(c => c.trim())
                  const isFirst = i === 0 || !output.split('\n')[i - 1]?.startsWith('|')
                  return (
                    <table key={i} className="w-full">
                      <tr className={isFirst ? 'bg-slate-100' : 'border-t border-slate-100'}>
                        {cells.map((c, j) => (
                          <td key={j} className={`px-3 py-2 text-xs ${isFirst ? 'font-bold text-slate-700' : 'text-slate-600'}`}>{c.trim()}</td>
                        ))}
                      </tr>
                    </table>
                  )
                }
                if (line.includes('---')) return null
                if (line.trim()) return <p key={i} className="text-sm text-slate-600 mb-2 leading-relaxed">{line}</p>
                return <div key={i} className="h-1" />
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AuditTool() {
  const [urlOrData, setUrlOrData] = useState('')
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setStreaming(true); setOutput(''); setError(null)
    try {
      await streamSEO('/api/seo/audit', { urlOrData }, chunk => setOutput(prev => prev + chunk))
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setStreaming(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Identify the top 5 SEO issues with fixes prioritized by impact. Paste a URL, crawl data, or leave blank for general recommendations.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">URL or Crawl Data <span className="font-normal text-slate-400">(optional)</span></label>
          <textarea value={urlOrData} onChange={e => setUrlOrData(e.target.value)} placeholder="Paste a URL (e.g. https://isa-valve.co.za) or Screaming Frog crawl data…" rows={4} className="field-input resize-none" />
        </div>
        <button onClick={run} disabled={streaming} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {streaming ? <><Loader2 className="w-4 h-4 animate-spin" /> Auditing…</> : <><Wrench className="w-4 h-4" /> Run SEO Audit</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <StreamOutput text={output} streaming={streaming} />
      </div>
    </div>
  )
}

function CategoryTool() {
  const CATEGORIES = ['Industrial Valves', 'Ball Valves', 'Butterfly Valves', 'Gate Valves', 'Knife Gate Valves', 'Mining Valves', 'Water Treatment Valves', 'Oil and Gas Valves']
  const [category, setCategory] = useState('')
  const [keywords, setKeywords] = useState('')
  const [output, setOutput] = useState('')
  const [streaming, setStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setStreaming(true); setOutput(''); setError(null)
    try {
      await streamSEO('/api/seo/category', { category, keywords }, chunk => setOutput(prev => prev + chunk))
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setStreaming(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate keyword-optimized copy for a category page including intro paragraph, 3 subheadings, and meta tags.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="field-input">
            <option value="">Select a category…</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Target Keywords</label>
          <input value={keywords} onChange={e => setKeywords(e.target.value)} placeholder="e.g. industrial valves South Africa, valve supplier Johannesburg" className="field-input" />
        </div>
        <button onClick={run} disabled={!category || !keywords || streaming} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {streaming ? <><Loader2 className="w-4 h-4 animate-spin" /> Optimizing…</> : <><LayoutList className="w-4 h-4" /> Optimize Category Page</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        <StreamOutput text={output} streaming={streaming} />
      </div>
    </div>
  )
}

function FAQTool() {
  const [topic, setTopic] = useState('')
  const [output, setOutput] = useState('')
  const [schema, setSchema] = useState<object | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true); setOutput(''); setSchema(null); setError(null)
    try {
      const res = await callSEO<{ faq: string }>('/api/seo/faq', { topic })
      const text = res.faq
      const schemaIdx = text.indexOf('SCHEMA:')
      if (schemaIdx !== -1) {
        setOutput(text.slice(0, schemaIdx).trim())
        const raw = text.slice(schemaIdx + 7).trim()
        try {
          setSchema(JSON.parse(raw.replace(/^```json?\n?/, '').replace(/\n?```$/, '')))
        } catch { /* skip */ }
      } else {
        setOutput(text)
      }
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate 5 SEO-friendly FAQs with concise answers and FAQPage JSON-LD schema for Google rich results.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Product or Topic</label>
          <select value={topic} onChange={e => setTopic(e.target.value)} className="field-input">
            <option value="">Select…</option>
            {ISA_PRODUCTS.map(p => <option key={p}>{p}</option>)}
            <option value="Industrial Valves General">Industrial Valves (General)</option>
            <option value="Mining Valves and Slurry Service">Mining Valves and Slurry Service</option>
            <option value="Water Treatment Valves and SABS Compliance">Water Treatment Valves</option>
            <option value="Valve Actuators and Automation">Valve Actuators and Automation</option>
          </select>
        </div>
        <button onClick={run} disabled={!topic || loading} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><HelpCircle className="w-4 h-4" /> Generate FAQs</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {output && <StreamOutput text={output} streaming={false} />}
        {schema && (
          <div>
            <h4 className="text-sm font-bold text-slate-700 mt-4 mb-2">FAQPage Schema Markup</h4>
            <JsonOutput data={schema} />
          </div>
        )}
      </div>
    </div>
  )
}

function MetaTool() {
  const [pageTitle, setPageTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keyword, setKeyword] = useState('')
  const [result, setResult] = useState<{ title: string; description: string } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const run = async () => {
    setLoading(true); setResult(null); setError(null)
    try {
      const res = await callSEO<{ title: string; description: string }>('/api/seo/meta', { pageTitle, description, keyword })
      setResult(res)
    } catch (e) { setError(e instanceof Error ? e.message : 'Error') }
    finally { setLoading(false) }
  }

  return (
    <div>
      <p className="text-sm text-slate-500 mb-5">Generate optimized meta title (60 chars) and meta description (155 chars) with automatic keyword placement.</p>
      <div className="space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Page Title / Subject</label>
          <input value={pageTitle} onChange={e => setPageTitle(e.target.value)} placeholder="e.g. Ball Valve Product Page, Mining Industry page, RFQ page" className="field-input" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Page Description <span className="font-normal text-slate-400">(2-3 sentences about the page)</span></label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} placeholder="What is on this page? Who is it for? What can they do here?" className="field-input resize-none" />
        </div>
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">Primary Keyword</label>
          <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="e.g. ball valve South Africa" className="field-input" />
        </div>
        <button onClick={run} disabled={!pageTitle || !keyword || loading} className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-colors">
          {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Generating…</> : <><Tag className="w-4 h-4" /> Generate Meta Tags</>}
        </button>
        {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
        {result && (
          <div className="mt-5 space-y-3">
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50 border-b border-blue-200">
                <div>
                  <span className="text-xs font-bold text-blue-700">Meta Title</span>
                  <span className={`ml-2 text-xs font-mono ${result.title.length > 60 ? 'text-red-600' : 'text-slate-400'}`}>{result.title.length}/60</span>
                </div>
                <CopyButton text={result.title} />
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-900 text-sm">{result.title}</p>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 bg-emerald-50 border-b border-emerald-200">
                <div>
                  <span className="text-xs font-bold text-emerald-700">Meta Description</span>
                  <span className={`ml-2 text-xs font-mono ${result.description.length > 155 ? 'text-red-600' : 'text-slate-400'}`}>{result.description.length}/155</span>
                </div>
                <CopyButton text={result.description} />
              </div>
              <div className="p-4">
                <p className="text-sm text-slate-700">{result.description}</p>
              </div>
            </div>
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Google SERP Preview</p>
              <p className="text-blue-700 text-sm font-medium hover:underline cursor-default">{result.title}</p>
              <p className="text-emerald-700 text-xs mt-0.5">isa-valve.co.za › {pageTitle.toLowerCase().replace(/\s+/g, '-')}</p>
              <p className="text-slate-600 text-xs mt-1 leading-relaxed">{result.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Tool map ─────────────────────────────────────────────────────────────────
const TOOL_COMPONENTS: Record<ToolId, () => JSX.Element> = {
  describe: ProductDescribeTool,
  schema: SchemaMarkupTool,
  blog: BlogTool,
  keywords: KeywordTool,
  audit: AuditTool,
  category: CategoryTool,
  faq: FAQTool,
  meta: MetaTool,
}

// ─── Main dashboard ───────────────────────────────────────────────────────────
export default function SEODashboard() {
  usePageMeta('SEO AI Studio', 'AI-powered SEO toolkit for ISA Valve Solutions — generate product descriptions, schema markup, blog posts, keyword research, and meta tags.')
  const [active, setActive] = useState<ToolId>('describe')
  const ActiveTool = TOOL_COMPONENTS[active]
  const activeDef = tools.find(t => t.id === active)!

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-9 h-9 rounded-xl bg-brand-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900">SEO AI Studio</h1>
            <p className="text-xs text-slate-500">8-tool SEO content suite powered by Claude AI</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            { label: 'Powered by Claude', color: 'bg-brand-50 text-brand-700 border-brand-200' },
            { label: 'ISA Valve Solutions context pre-loaded', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
            { label: 'JSON-LD schema validated', color: 'bg-orange-50 text-orange-700 border-orange-200' },
          ].map(b => (
            <span key={b.label} className={`text-xs font-semibold border px-2.5 py-1 rounded-full ${b.color}`}>{b.label}</span>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6">
        {/* Sidebar nav */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {tools.map(tool => {
            const Icon = tool.icon
            const isActive = active === tool.id
            return (
              <button
                key={tool.id}
                onClick={() => setActive(tool.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{tool.label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto flex-shrink-0 hidden lg:block" />}
              </button>
            )
          })}
        </nav>

        {/* Main panel */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 lg:p-8 min-h-[500px]">
          <div className="flex items-center gap-3 mb-6 pb-5 border-b border-slate-100">
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
              <activeDef.icon className="w-4 h-4 text-slate-600" />
            </div>
            <div>
              <h2 className="font-black text-slate-900">{activeDef.label}</h2>
              {activeDef.streaming && (
                <span className="text-xs text-brand-600 font-medium">⚡ Streaming response</span>
              )}
            </div>
          </div>
          <ActiveTool />
        </div>
      </div>
    </div>
  )
}

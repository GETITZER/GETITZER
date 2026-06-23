import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Trash2, Bot } from 'lucide-react'
import { useLocation, useParams } from 'react-router-dom'
import { useChat } from '../hooks/useChat'
import { getProduct } from '../data/products'

function getSystemPrompt(pathname: string): string {
  const slug = pathname.match(/\/products\/([^/]+)/)?.[1]
  const product = slug ? getProduct(slug) : undefined

  if (product) {
    return `You are an expert valve selection engineer for ISA Valve Solutions & Industrial Supplies. The user is currently viewing the ${product.name} page.

${product.name} key specs: ${product.specs.map(s => `${s.label}: ${s.value}`).join(' | ')}
Industries: ${product.industries.join(', ')}
Compliance: ${product.compliance.join(', ')}

Help the user determine if this valve is right for their application. Ask about their fluid type, pressure class, size requirements, and operating conditions. Compare with our other products (Butterfly Valve, Gate Valve, Knife Gate Valve) if needed. Always recommend requesting a quote via our RFQ page for final specification. Be concise and technical.`
  }

  if (pathname === '/rfq') {
    return `You are an ISA Valve Solutions application engineer helping the user complete an RFQ form. Ask clarifying questions to help them articulate: valve type needed, fluid medium, size (DN), pressure class (PN or ANSI), actuation preference, quantity, timeline, and any special requirements (temperature, abrasion, certifications). Be helpful and guide them toward a complete specification.`
  }

  return `You are an expert valve selection engineer for ISA Valve Solutions & Industrial Supplies. Our products are:
- Ball Valve: DN15–DN600, PN16/PN40/ANSI 150-600, for oil & gas, chemical, water, HVAC, marine
- Butterfly Valve: DN50–DN1200, PN10/PN16, for water treatment, HVAC, fire protection, irrigation
- Gate Valve: DN50–DN1000, PN10/PN16, for clean water, HVAC, municipal supply
- Knife Gate Valve: DN50–DN600, PN10/PN16, for mining slurry, wastewater, pulp & paper
- ISA Pinch Valve Series: PN16, ISO 5208 Grade A zero leakage, 4 sleeve grades (ISA-Flex abrasion, ISA-Extrem high-temp, ISA-Shield UV/ozone, ISA-Chem chemical), for thickener underflow, tailings, CIL/CIP circuits
- DXST Slurry KGV: DN25–DN300, natural rubber lined, proven 3→14 month life extension (466% longer), for extreme abrasion mining, thickener underflow, dense slurry

We are ISO 9001:2015 certified with 25 years of experience. Help users identify the right valve for their application. Ask about fluid type, pressure, size, and industry. Suggest they use our RFQ form to get a quote. Be concise and practical.`
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const location = useLocation()
  useParams()
  const systemPrompt = getSystemPrompt(location.pathname)
  const { messages, isStreaming, error, sendMessage, clearMessages } = useChat(systemPrompt)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      inputRef.current?.focus()
    }
  }, [messages, open])

  const handleSend = () => {
    const trimmed = input.trim()
    if (!trimmed || isStreaming) return
    setInput('')
    sendMessage(trimmed)
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  const placeholder =
    location.pathname.startsWith('/products/')
      ? 'Ask about this valve type…'
      : location.pathname === '/rfq'
      ? 'Get help with your specification…'
      : 'Ask about valve selection…'

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 slide-up overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-navy to-brand-800 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-white" />
              <span className="text-sm font-bold text-white">Valve Selection AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button onClick={clearMessages} className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors" aria-label="Clear">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button onClick={() => setOpen(false)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors" aria-label="Close">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-600 font-semibold">Valve Selection Assistant</p>
                <p className="text-xs text-slate-400 mt-1">Describe your application and I'll recommend the right valve.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-brand-700 text-white rounded-br-sm'
                    : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                } ${msg.streaming && !msg.content ? 'cursor-blink' : ''}`}>
                  {msg.content || (msg.streaming ? '' : '…')}
                </div>
              </div>
            ))}
            {error && <p className="text-xs text-red-500 text-center bg-red-50 rounded-lg px-3 py-2">{error}</p>}
            <div ref={bottomRef} />
          </div>

          <div className="px-3 py-3 border-t border-slate-100 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder={placeholder}
              disabled={isStreaming}
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50 transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="p-2.5 bg-isa-600 hover:bg-isa-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 lg:bottom-4 right-4 sm:right-6 p-3.5 bg-navy hover:bg-brand-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
        aria-label={open ? 'Close valve assistant' : 'Open valve assistant'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-isa-500 rounded-full flex items-center justify-center">
            <span className="text-[8px] font-black text-white">AI</span>
          </span>
        )}
      </button>
    </>
  )
}

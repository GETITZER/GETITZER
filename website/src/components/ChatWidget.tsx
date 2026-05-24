import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Trash2, Bot } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useChat } from '../hooks/useChat'

function getSystemPrompt(pathname: string): string {
  if (pathname.startsWith('/rfq')) {
    return 'You are an AI assistant helping users fill out RFQ (Request for Quote) forms. Ask clarifying questions about their project, help them articulate their requirements clearly, estimate realistic timelines, and suggest appropriate budget ranges for web design and development projects. Be friendly and concise.'
  }
  if (pathname.startsWith('/guides/')) {
    return 'You are an expert AI guide assistant on GetItzer, a professional guides platform. Help users understand the guide content, apply concepts to their specific situation, find related guides, and get actionable next steps. Be concise and practical.'
  }
  return 'You are a helpful AI assistant for GetItzer, an AI-powered guides platform covering website design, B2B marketing, SaaS growth, and digital experiences. Help users find guides, understand concepts, and apply best practices. Keep responses concise and practical.'
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const location = useLocation()
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 right-4 sm:right-6 w-[calc(100vw-2rem)] sm:w-96 max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 slide-up overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-brand-600 to-brand-700 rounded-t-2xl">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">AI Assistant</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={clearMessages}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                  aria-label="Clear chat"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.length === 0 && (
              <div className="text-center py-8">
                <Bot className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm text-slate-500 font-medium">How can I help you?</p>
                <p className="text-xs text-slate-400 mt-1">Ask about guides, best practices, or your project.</p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-sm'
                      : 'bg-slate-100 text-slate-800 rounded-bl-sm'
                  } ${msg.streaming && !msg.content ? 'cursor-blink' : ''}`}
                >
                  {msg.content || (msg.streaming ? '' : '…')}
                </div>
              </div>
            ))}
            {error && (
              <p className="text-xs text-red-500 text-center bg-red-50 rounded-lg px-3 py-2">{error}</p>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-slate-100 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Ask anything…"
              disabled={isStreaming}
              className="flex-1 text-sm bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-50 transition"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="p-2.5 bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white rounded-xl transition-colors flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-4 right-4 sm:right-6 w-13 h-13 p-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center justify-center"
        aria-label={open ? 'Close AI chat' : 'Open AI chat'}
      >
        {open ? <X className="w-5 h-5" /> : <MessageCircle className="w-5 h-5" />}
        {!open && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
            <span className="text-[9px] font-bold text-white">AI</span>
          </span>
        )}
      </button>
    </>
  )
}

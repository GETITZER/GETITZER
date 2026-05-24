import { useState, useCallback } from 'react'
import type { ChatMessage } from '../types'

export function useChat(systemPrompt?: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(
    async (content: string) => {
      if (isStreaming || !content.trim()) return

      const userMsg: ChatMessage = { role: 'user', content }
      const assistantMsg: ChatMessage = { role: 'assistant', content: '', streaming: true }

      setMessages(prev => [...prev, userMsg, assistantMsg])
      setIsStreaming(true)
      setError(null)

      try {
        const apiMessages = [...messages, userMsg].map(m => ({
          role: m.role,
          content: m.content,
        }))

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: apiMessages, systemPrompt }),
        })

        if (!res.ok) {
          const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
          throw new Error(err.error || `HTTP ${res.status}`)
        }

        const reader = res.body!.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n\n')
          buffer = lines.pop() ?? ''

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue
            const raw = line.slice(6).trim()
            if (!raw) continue
            try {
              const data = JSON.parse(raw) as { text?: string; done?: boolean; error?: string }
              if (data.error) throw new Error(data.error)
              if (data.done) break
              if (data.text) {
                setMessages(prev => {
                  const next = [...prev]
                  const last = next[next.length - 1]
                  if (last.role === 'assistant') {
                    next[next.length - 1] = { ...last, content: last.content + data.text }
                  }
                  return next
                })
              }
            } catch {
              // skip malformed SSE
            }
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Failed to send message'
        setError(msg)
        setMessages(prev => prev.slice(0, -1)) // remove empty assistant message
      } finally {
        setIsStreaming(false)
        setMessages(prev => {
          const next = [...prev]
          const last = next[next.length - 1]
          if (last?.role === 'assistant' && last.streaming) {
            next[next.length - 1] = { ...last, streaming: false }
          }
          return next
        })
      }
    },
    [messages, isStreaming, systemPrompt],
  )

  const clearMessages = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  return { messages, isStreaming, error, sendMessage, clearMessages }
}

export async function streamGenerate(
  payload: { topic: string; sectionTitle?: string; context?: string },
  onChunk: (text: string) => void,
): Promise<void> {
  const res = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: `HTTP ${res.status}` }))
    throw new Error(err.error || `HTTP ${res.status}`)
  }

  const reader = res.body!.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    buffer += decoder.decode(value, { stream: true })
    const lines = buffer.split('\n\n')
    buffer = lines.pop() ?? ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const raw = line.slice(6).trim()
      if (!raw) continue
      try {
        const data = JSON.parse(raw) as { text?: string; done?: boolean; error?: string }
        if (data.error) throw new Error(data.error)
        if (data.done) return
        if (data.text) onChunk(data.text)
      } catch {
        // skip
      }
    }
  }
}

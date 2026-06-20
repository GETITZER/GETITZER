interface Env {
  AI: Ai
}

interface ChatRequest {
  messages: { role: 'user' | 'assistant'; content: string }[]
  systemPrompt?: string
}

const DEFAULT_SYSTEM = `You are a senior application engineer at ISA Valve Solutions & Industrial Supplies — an ISO 9001:2015 certified industrial valve supplier in South Africa.

Product range:
- Hydraulic Control Valves: Pressure reducing, pressure sustaining, flow control, level control, solenoid, electric, modulating, surge anticipation
- Ball Valve: DN15–DN600 · PN16/PN40/ANSI 150-600 · Manual / pneumatic / electric
- Butterfly Valve: DN50–DN1200 · PN10/PN16 · Wafer / lug / flanged
- Gate Valve: DN50–DN1000 · PN10/PN16 · Rising/non-rising stem
- Knife Gate Valve: DN50–DN600 · PN10/PN16 · Ceramic-lined option
- ISA Pinch Valves: PN16 · ISO 5208 Grade A zero leakage · 4 sleeve grades for abrasion / high-temp / UV / chemical
- DXST Slurry KGV: DN25–DN300 · Natural rubber lined · Proven 466% longer service life in mining slurry

Industries: Mining, Water & Waterworks, Oil & Gas, Chemical processing.
For pricing and orders, direct customers to our RFQ page. Be concise and technical.`

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: ChatRequest
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { messages, systemPrompt } = body
  if (!messages?.length) {
    return Response.json({ error: 'messages is required' }, { status: 400 })
  }

  const aiMessages: RoleScopedChatInput[] = [
    { role: 'system', content: systemPrompt ?? DEFAULT_SYSTEM },
    ...messages.map(m => ({ role: m.role, content: m.content })),
  ]

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder()

      function send(data: object) {
        controller.enqueue(enc.encode(`data: ${JSON.stringify(data)}\n\n`))
      }

      try {
        const aiStream = await env.AI.run('@cf/meta/llama-3.1-8b-instruct', {
          messages: aiMessages,
          stream: true,
        }) as ReadableStream

        const reader = aiStream.getReader()
        const decoder = new TextDecoder()

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          for (const line of chunk.split('\n')) {
            if (!line.startsWith('data: ')) continue
            const raw = line.slice(6).trim()
            if (!raw || raw === '[DONE]') continue
            try {
              const parsed = JSON.parse(raw) as { response?: string }
              if (parsed.response) send({ text: parsed.response })
            } catch { /* skip malformed */ }
          }
        }

        send({ done: true })
      } catch (err) {
        send({ error: err instanceof Error ? err.message : 'AI request failed' })
      }

      controller.close()
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

export const onRequestOptions: PagesFunction = async () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })

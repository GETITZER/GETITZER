import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'

const app = express()
const PORT = 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json({ limit: '1mb' }))

function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
  return new Anthropic({ apiKey })
}

function sseHeaders(res: express.Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
}

function sseWrite(res: express.Response, data: object) {
  res.write(`data: ${JSON.stringify(data)}\n\n`)
}

// --- Chat (streaming) ---
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
      systemPrompt?: string
    }

    sseHeaders(res)
    const client = getClient()

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system:
        systemPrompt ||
        'You are a helpful AI assistant for GetItzer, an AI-powered guides platform. Help users understand guides, find relevant information, and apply best practices to their projects. Be concise and practical.',
      messages,
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        sseWrite(res, { text: chunk.delta.text })
      }
    }

    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else {
      sseWrite(res, { error: msg })
      res.end()
    }
  }
})

// --- AI Search ---
app.post('/api/search', async (req, res) => {
  try {
    const { query, guides } = req.body as {
      query: string
      guides: Array<{ id: string; title: string; excerpt: string; category: string }>
    }

    const client = getClient()
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 256,
      messages: [
        {
          role: 'user',
          content: `Return the IDs of the most relevant guides for this query as a JSON array of strings (max 5, ordered by relevance). Return [] if none match.

Query: "${query}"

Guides:
${guides.map(g => `- id:"${g.id}" title:"${g.title}" category:"${g.category}" excerpt:"${g.excerpt.slice(0, 120)}"`).join('\n')}

Respond with ONLY the JSON array, e.g. ["id1","id2"]`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : '[]'
    try {
      res.json({ ids: JSON.parse(text) })
    } catch {
      res.json({ ids: [] })
    }
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// --- Content Generation (streaming) ---
app.post('/api/generate', async (req, res) => {
  try {
    const { topic, sectionTitle, context } = req.body as {
      topic: string
      sectionTitle?: string
      context?: string
    }

    sseHeaders(res)
    const client = getClient()

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `Write a detailed, expert-quality section for a professional business guide.

Topic: ${topic}
Section: ${sectionTitle || 'Key Insights'}
${context ? `\nGuide context:\n${context.slice(0, 800)}` : ''}

Write in a professional, authoritative tone. Include specific metrics, concrete examples, and actionable advice. Use clear paragraphs (no markdown headers or bullet points). Aim for 200-350 words.`,
        },
      ],
    })

    for await (const chunk of stream) {
      if (
        chunk.type === 'content_block_delta' &&
        chunk.delta.type === 'text_delta'
      ) {
        sseWrite(res, { text: chunk.delta.text })
      }
    }

    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else {
      sseWrite(res, { error: msg })
      res.end()
    }
  }
})

// --- RFQ Analysis ---
app.post('/api/rfq', async (req, res) => {
  try {
    const { formData } = req.body as { formData: Record<string, string> }

    const client = getClient()
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `Analyze this RFQ submission and provide a structured sales assessment.

Submission:
${Object.entries(formData)
  .map(([k, v]) => `${k}: ${v}`)
  .join('\n')}

Respond with these exact sections:

## Qualification Score
Rate 1-10 with one-sentence rationale.

## Key Requirements
3-5 bullet points of the core requirements identified.

## Recommended Next Steps
2-3 concrete actions for the sales team.

## Missing Information
Any critical details needed before quoting.

## Project Complexity
Low / Medium / High with one-sentence explanation.`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    res.json({ analysis: text })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

app.listen(PORT, () => {
  console.log(`\n  API server → http://localhost:${PORT}`)
  if (!process.env.ANTHROPIC_API_KEY) {
    console.warn('  ⚠  ANTHROPIC_API_KEY not set — AI features will return errors\n')
  } else {
    console.log('  ✓  Anthropic API key detected\n')
  }
})

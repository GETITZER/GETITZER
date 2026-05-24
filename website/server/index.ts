import express from 'express'
import cors from 'cors'
import Anthropic from '@anthropic-ai/sdk'
import nodemailer from 'nodemailer'

const app = express()
const PORT = 3001

app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'] }))
app.use(express.json({ limit: '1mb' }))

// ── Anthropic client with prompt-caching beta ─────────────────────────────────
function getClient() {
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) throw new Error('ANTHROPIC_API_KEY is not set')
  return new Anthropic({
    apiKey,
    defaultHeaders: { 'anthropic-beta': 'prompt-caching-2024-07-31' },
  })
}

// ── Email transport (optional — falls back to console log) ────────────────────
function getMailer() {
  const host = process.env.SMTP_HOST
  if (!host) return null
  return nodemailer.createTransport({
    host,
    port: parseInt(process.env.SMTP_PORT ?? '587'),
    secure: process.env.SMTP_PORT === '465',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

async function sendMail(subject: string, html: string) {
  const to   = process.env.EMAIL_TO   ?? 'isa-valve@outlook.com'
  const from = process.env.EMAIL_FROM ?? 'isa-valve@outlook.com'
  const mailer = getMailer()
  if (!mailer) {
    console.log(`\n📧 [EMAIL — no SMTP configured]\nTo: ${to}\nSubject: ${subject}\n${html.replace(/<[^>]+>/g, ' ')}\n`)
    return
  }
  await mailer.sendMail({ from, to, subject, html })
}

// ── ISA context block (cached across all requests) ────────────────────────────
const ISA_CONTEXT = `You are a senior application engineer at ISA Valve Solutions & Industrial Supplies — an ISO 9001:2015 certified industrial valve supplier in South Africa.

Product range:
- Ball Valve: DN15–DN600 · PN16/PN40/ANSI 150-600 · API 6D · Carbon steel / SS / duplex · Manual / pneumatic / electric
- Butterfly Valve: DN50–DN1200 · PN10/PN16 · SABS / WRAS · Cast iron / ductile iron / SS · Wafer / lug / flanged
- Gate Valve: DN50–DN1000 · PN10/PN16 · SABS 664 · Rising/non-rising stem · Manual / electric / gearbox
- Knife Gate Valve: DN50–DN600 · PN10/PN16 · Ceramic-lined option · Slurry / fibrous / abrasive media

Key facts: All valves tested at 1.5× rated pressure. Full material traceability on every order. Case study: ceramic-lined knife gate valves extended service life from 3 months to 14 months in platinum mining slurry service, saving R1.2M/year.`

function sseHeaders(res: express.Response) {
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()
}

function sseWrite(res: express.Response, data: object) {
  res.write(`data: ${JSON.stringify(data)}\n\n`)
}

// --- Chat (streaming, with prompt caching) ---
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body as {
      messages: Array<{ role: 'user' | 'assistant'; content: string }>
      systemPrompt?: string
    }

    sseHeaders(res)
    const client = getClient()

    const sysText = systemPrompt ?? `${ISA_CONTEXT}\n\nHelp the user select the right valve, understand specifications, and navigate ISA's product range. Be concise and technically accurate.`

    const stream = client.messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      // Cache the system prompt — saves ~90% on tokens for repeated conversations
      system: [{ type: 'text', text: sysText, cache_control: { type: 'ephemeral' } }] as Parameters<typeof client.messages.stream>[0]['system'],
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

// --- RFQ Analysis + Email Notification ---
app.post('/api/rfq', async (req, res) => {
  try {
    const { formData } = req.body as { formData: Record<string, string> }

    const client = getClient()
    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: [{ type: 'text', text: ISA_CONTEXT, cache_control: { type: 'ephemeral' } }] as Parameters<typeof client.messages.create>[0]['system'],
      messages: [
        {
          role: 'user',
          content: `Analyze this valve RFQ and provide a structured engineering assessment.

RFQ Submission:
${Object.entries(formData).map(([k, v]) => `${k}: ${v}`).join('\n')}

Respond with these exact sections:

## Valve Recommendation
Which ISA valve type best suits this application and why.

## Qualification Score
Rate 1-10 with one-sentence rationale (10 = fully specified, ready to quote).

## Key Requirements
3-5 bullet points of the core technical requirements identified.

## Missing Information
Critical details still needed before a firm quote can be issued.

## Next Steps
2-3 concrete actions for the sales/engineering team.`,
        },
      ],
    })

    const analysis = message.content[0].type === 'text' ? message.content[0].text : ''

    // Send email notification (non-blocking — don't fail the request if email fails)
    sendMail(
      `New RFQ: ${formData.company ?? formData.name ?? 'Unknown'} — ${formData.valveType ?? 'Valve enquiry'}`,
      `<h2>New RFQ Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        ${Object.entries(formData).map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">${k}</td><td style="padding:6px 12px;border:1px solid #e2e8f0">${v}</td></tr>`).join('')}
      </table>
      <h3 style="margin-top:24px">AI Qualification Report</h3>
      <pre style="background:#f8fafc;padding:16px;border-radius:8px;font-size:13px;white-space:pre-wrap">${analysis}</pre>`,
    ).catch(err => console.error('Email send failed:', err))

    res.json({ analysis })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// --- Contact Form ---
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body as {
      name: string; email: string; phone?: string; company?: string; message: string
    }
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email and message are required' })

    await sendMail(
      `Website Enquiry: ${name}${company ? ` — ${company}` : ''}`,
      `<h2 style="font-family:sans-serif">New Contact Form Submission</h2>
      <table style="border-collapse:collapse;width:100%;font-family:sans-serif;font-size:14px">
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Name</td><td style="padding:6px 12px;border:1px solid #e2e8f0">${name}</td></tr>
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Email</td><td style="padding:6px 12px;border:1px solid #e2e8f0"><a href="mailto:${email}">${email}</a></td></tr>
        ${phone ? `<tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Phone</td><td style="padding:6px 12px;border:1px solid #e2e8f0">${phone}</td></tr>` : ''}
        ${company ? `<tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Company</td><td style="padding:6px 12px;border:1px solid #e2e8f0">${company}</td></tr>` : ''}
        <tr><td style="padding:6px 12px;font-weight:bold;background:#f8fafc;border:1px solid #e2e8f0">Message</td><td style="padding:6px 12px;border:1px solid #e2e8f0;white-space:pre-wrap">${message}</td></tr>
      </table>`,
    )

    res.json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// ═══════════════════════════════════════════════════════════════
// SEO AI TOOLKIT — 8 endpoints
// ═══════════════════════════════════════════════════════════════

// 1. Product Description (streaming)
app.post('/api/seo/describe', async (req, res) => {
  try {
    const { productName, keywords, specs } = req.body as {
      productName: string; keywords: string; specs?: string
    }
    sseHeaders(res)
    const stream = getClient().messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1600,
      messages: [{
        role: 'user',
        content: `You are an ecommerce SEO expert for ISA Valve Solutions & Industrial Supplies — a South African industrial valve supplier certified to ISO 9001:2015.

Product: ${productName}
Target keywords: ${keywords}
${specs ? `Specs: ${specs}` : ''}

Write a complete SEO product description using this exact format:

META: [compelling meta description, 150-155 characters, include primary keyword naturally]

## [Keyword-rich H2 — primary application and value proposition]
[2 persuasive paragraphs, 150 words total, technical language for engineers]

## [Keyword-rich H2 — technical specifications and certifications]
[2 paragraphs covering specs, standards (SABS, ISO, API), and compliance, 150 words]

## [Keyword-rich H2 — industry applications and why choose ISA]
[2 paragraphs on industry fit and ISA's competitive advantages, 150 words]

[CTA — 2 sentences inviting the reader to request a quote or use the AI valve selector. Include primary keyword.]`,
      }],
    })
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta')
        sseWrite(res, { text: chunk.delta.text })
    }
    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else { sseWrite(res, { error: msg }); res.end() }
  }
})

// 2. JSON-LD Schema Markup
app.post('/api/seo/schema', async (req, res) => {
  try {
    const { productName, sku, price, description } = req.body as {
      productName: string; sku: string; price: string; description?: string
    }
    const message = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{
        role: 'user',
        content: `Generate valid JSON-LD schema for a product page. Return ONLY the raw JSON object — no markdown fences, no explanation.

Product name: ${productName}
SKU: ${sku}
Price: ${price}
Currency: ZAR
Availability: InStock
Brand: ISA Valve Solutions & Industrial Supplies
${description ? `Description: ${description}` : ''}
Rating: 4.7 (23 reviews)
Seller name: ISA Valve Solutions & Industrial Supplies

Include schema types: Product, Offer, AggregateRating, Brand.
Ensure it validates in Google's Rich Results Test.`,
      }],
    })
    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : '{}'
    try {
      const clean = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim()
      res.json({ schema: JSON.parse(clean) })
    } catch {
      res.json({ schema: {}, raw: text })
    }
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// 3. Blog Post (streaming)
app.post('/api/seo/blog', async (req, res) => {
  try {
    const { topic, keywords } = req.body as { topic: string; keywords: string }
    sseHeaders(res)
    const stream = getClient().messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 2200,
      messages: [{
        role: 'user',
        content: `You are a technical content writer for ISA Valve Solutions & Industrial Supplies (South Africa). Write an SEO-optimized 1,000-word blog post.

Topic: ${topic}
Keywords: ${keywords}

Use this exact format:

META_TITLE: [blog title, max 60 characters, include primary keyword]
META_DESC: [meta description, max 155 characters, include keyword + CTA]

# [Full headline]

[Introduction, 120 words, include primary keyword naturally]

## [Keyword-rich subheading 1]
[180 words of technical, authoritative content]

## [Keyword-rich subheading 2]
[180 words]

## [Keyword-rich subheading 3]
[180 words]

## [Keyword-rich subheading 4]
[180 words]

## [Keyword-rich subheading 5]
[180 words]

## Frequently Asked Questions

**Q: [Real engineer/buyer question]**
A: [60-word answer with natural keyword use]

**Q: [Another question]**
A: [60-word answer]

**Q: [Third question]**
A: [60-word answer]

[Conclusion with CTA to contact ISA Valve Solutions, 80 words]`,
      }],
    })
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta')
        sseWrite(res, { text: chunk.delta.text })
    }
    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else { sseWrite(res, { error: msg }); res.end() }
  }
})

// 4. Keyword Research
app.post('/api/seo/keywords', async (req, res) => {
  try {
    const { productOrCategory } = req.body as { productOrCategory: string }
    const message = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `You are an SEO strategist for ISA Valve Solutions (South Africa). Analyze ecommerce keywords.

Product/Category: ${productOrCategory}

Organize by funnel stage using this exact format:

## AWARENESS
| Keyword | Search Intent | Long-Tail Variation |
|---------|--------------|---------------------|
[5 rows — informational/educational queries]

## CONSIDERATION
| Keyword | Search Intent | Long-Tail Variation |
|---------|--------------|---------------------|
[5 rows — comparison/evaluation queries]

## PURCHASE
| Keyword | Search Intent | Long-Tail Variation |
|---------|--------------|---------------------|
[5 rows — transactional/supplier queries]

## SEARCH INTENT NOTES
[3 sentences: B2B buyer behavior, South African market nuances, procurement timeline]`,
      }],
    })
    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    res.json({ keywords: text })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// 5. Technical SEO Audit (streaming)
app.post('/api/seo/audit', async (req, res) => {
  try {
    const { urlOrData } = req.body as { urlOrData: string }
    sseHeaders(res)
    const stream = getClient().messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1600,
      messages: [{
        role: 'user',
        content: `You are a technical SEO expert. Audit this website for SEO issues.

Context: ISA Valve Solutions & Industrial Supplies
- React SPA (Vite, client-side rendering — no SSR)
- B2B industrial valve supplier, South Africa
- Products: Ball Valve, Butterfly Valve, Gate Valve, Knife Gate Valve
- Routes: /, /products, /products/:slug, /industries, /industries/:slug, /configurator, /rfq, /blog, /seo
- Has JSON-LD schema on product pages, FAQPage schema, Organization schema on homepage
- Has react-helmet for dynamic page titles

Input: ${urlOrData || 'Provide general technical SEO recommendations for this specific website'}

Identify the top 5 most impactful issues and prioritize by business impact:

## Issue 1: [Name]
**Severity**: High
**Problem**: [Specific description]
**Fix**: [Exact implementation steps]
**SEO Impact**: [Expected outcome]

[Repeat for issues 2–5, varying severity]

## Quick Wins (implement in under 1 hour)
- [Win 1]
- [Win 2]
- [Win 3]`,
      }],
    })
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta')
        sseWrite(res, { text: chunk.delta.text })
    }
    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else { sseWrite(res, { error: msg }); res.end() }
  }
})

// 6. Category Page Optimization (streaming)
app.post('/api/seo/category', async (req, res) => {
  try {
    const { category, keywords } = req.body as { category: string; keywords: string }
    sseHeaders(res)
    const stream = getClient().messages.stream({
      model: 'claude-sonnet-4-6',
      max_tokens: 1200,
      messages: [{
        role: 'user',
        content: `You are an SEO content writer for ISA Valve Solutions & Industrial Supplies (South Africa).

Write optimized copy for a category page.
Category: ${category}
Target keywords: ${keywords}

Format:

META_TITLE: [60 chars max, primary keyword near start]
META_DESC: [155 chars max, keyword + CTA]

## [Keyword-rich intro heading]
[150-word introduction, include all target keywords naturally]

## [Subheading 2 — product range or applications]
[100-word supporting paragraph]

## [Subheading 3 — certifications and standards]
[100-word supporting paragraph]

## [Subheading 4 — industries served]
[100-word supporting paragraph]`,
      }],
    })
    for await (const chunk of stream) {
      if (chunk.type === 'content_block_delta' && chunk.delta.type === 'text_delta')
        sseWrite(res, { text: chunk.delta.text })
    }
    sseWrite(res, { done: true })
    res.end()
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error'
    if (!res.headersSent) res.status(500).json({ error: msg })
    else { sseWrite(res, { error: msg }); res.end() }
  }
})

// 7. FAQ Generator
app.post('/api/seo/faq', async (req, res) => {
  try {
    const { topic } = req.body as { topic: string }
    const message = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1400,
      messages: [{
        role: 'user',
        content: `Generate 5 SEO-optimized FAQs for: ${topic}

Context: ISA Valve Solutions & Industrial Supplies — South African industrial valve supplier.
Products: Ball Valve (DN15–DN600), Butterfly Valve (DN50–DN1200), Gate Valve (DN50–DN1000), Knife Gate Valve (DN50–DN600). ISO 9001:2015.

Write questions real engineers and procurement managers would search on Google. Answers: 60-80 words, technically accurate, include natural keywords.

Format:

**Q1: [Question]**
A: [Answer]

**Q2: [Question]**
A: [Answer]

**Q3: [Question]**
A: [Answer]

**Q4: [Question]**
A: [Answer]

**Q5: [Question]**
A: [Answer]

SCHEMA:
[Valid JSON-LD FAQPage schema — raw JSON only, no code fences]`,
      }],
    })
    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    res.json({ faq: text })
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : 'Error' })
  }
})

// 8. Meta Tags Generator
app.post('/api/seo/meta', async (req, res) => {
  try {
    const { pageTitle, description, keyword } = req.body as {
      pageTitle: string; description: string; keyword: string
    }
    const message = await getClient().messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 200,
      messages: [{
        role: 'user',
        content: `Generate optimized meta tags. Return ONLY the two lines below — nothing else.

Page: ${pageTitle}
Context: ${description}
Primary keyword: ${keyword}
Brand: ISA Valve Solutions (South Africa)

TITLE: [max 60 characters, keyword near start]
DESC: [max 155 characters, keyword + strong CTA]`,
      }],
    })
    const text = message.content[0].type === 'text' ? message.content[0].text.trim() : ''
    const titleMatch = text.match(/^TITLE:\s*(.+)$/m)
    const descMatch = text.match(/^DESC:\s*(.+)$/m)
    res.json({
      title: titleMatch?.[1]?.trim() ?? '',
      description: descMatch?.[1]?.trim() ?? '',
    })
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

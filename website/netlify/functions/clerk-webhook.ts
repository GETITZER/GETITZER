import { Webhook } from 'svix'
import nodemailer from 'nodemailer'

type NetlifyEvent = {
  httpMethod: string
  body: string | null
  headers: Record<string, string | undefined>
}
type NetlifyResponse = { statusCode: number; body: string }

const ADMIN_EMAIL = 'isa-valve@outlook.com'

function buildMailer() {
  const pass = process.env.SMTP_PASS
  if (!pass) return null
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER || ADMIN_EMAIL,
      pass,
    },
    tls: { ciphers: 'SSLv3' },
  })
}

async function notify(subject: string, html: string) {
  const mailer = buildMailer()
  if (!mailer) {
    console.log(`[CLERK-WEBHOOK] No SMTP — would have sent:\nSubject: ${subject}`)
    return
  }
  await mailer.sendMail({
    from: process.env.SMTP_USER || ADMIN_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
  })
}

async function clerkUserById(userId: string) {
  const key = process.env.CLERK_SECRET_KEY
  if (!key) return null
  try {
    const res = await fetch(`https://api.clerk.com/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    if (!res.ok) return null
    return res.json() as Promise<Record<string, unknown>>
  } catch {
    return null
  }
}

export const handler = async (event: NetlifyEvent): Promise<NetlifyResponse> => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const secret = process.env.CLERK_WEBHOOK_SECRET
  if (!secret) {
    console.error('[CLERK-WEBHOOK] CLERK_WEBHOOK_SECRET not set')
    return { statusCode: 500, body: 'Webhook secret not configured' }
  }

  const wh = new Webhook(secret)
  let payload: Record<string, unknown>
  try {
    payload = wh.verify(event.body ?? '', {
      'svix-id':        event.headers['svix-id'] ?? '',
      'svix-timestamp': event.headers['svix-timestamp'] ?? '',
      'svix-signature': event.headers['svix-signature'] ?? '',
    }) as Record<string, unknown>
  } catch {
    return { statusCode: 400, body: 'Invalid webhook signature' }
  }

  const type = payload.type as string
  const data = payload.data as Record<string, unknown>
  const now = new Date().toLocaleString('en-ZA', {
    timeZone: 'Africa/Johannesburg',
    dateStyle: 'medium',
    timeStyle: 'short',
  })

  try {
    if (type === 'user.created') {
      const emails = data.email_addresses as Array<{ email_address: string }> | undefined
      const email = emails?.[0]?.email_address ?? 'unknown'
      const name = [data.first_name, data.last_name].filter(Boolean).join(' ') || email

      await notify(
        `🆕 New Registration — ${name} — ISA Valve Solutions`,
        `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#0052CC">New customer registration</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;width:100px">Name</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#555">Time</td><td style="padding:8px 0">${now}</td></tr>
          </table>
          <p style="margin-top:24px">
            <a href="https://dashboard.clerk.com" style="background:#0052CC;color:#fff;padding:10px 20px;text-decoration:none;border-radius:6px">View in Clerk Dashboard</a>
          </p>
        </div>`,
      )
    } else if (type === 'session.created') {
      const userId = data.user_id as string
      const user = await clerkUserById(userId)
      const emails = user?.email_addresses as Array<{ email_address: string }> | undefined
      const email = emails?.[0]?.email_address ?? userId
      const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || email

      await notify(
        `🔐 Sign-in — ${name} — ISA Valve Solutions`,
        `<div style="font-family:Arial,sans-serif;max-width:520px;margin:0 auto">
          <h2 style="color:#0052CC">Customer sign-in</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#555;width:100px">User</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#555">Email</td><td style="padding:8px 0"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#555">Time</td><td style="padding:8px 0">${now}</td></tr>
          </table>
        </div>`,
      )
    }
  } catch (err) {
    console.error('[CLERK-WEBHOOK] Email error:', err)
  }

  return { statusCode: 200, body: JSON.stringify({ received: true }) }
}

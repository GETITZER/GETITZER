import { useState } from 'react'
import { X, Download, Loader2, Shield, Lock } from 'lucide-react'

interface Props {
  fileName: string
  fileHref: string
  children: React.ReactNode
  className?: string
}

interface LeadForm {
  name: string
  email: string
  company: string
}

const empty: LeadForm = { name: '', email: '', company: '' }

export default function DownloadGate({ fileName, fileHref, children, className }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<LeadForm>(empty)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function field(key: keyof LeadForm) {
    return (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm(prev => ({ ...prev, [key]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.company.trim()) {
      setError('All fields are required.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError(null)
    setSubmitting(true)

    // Capture download lead via Netlify Forms (non-blocking — best effort).
    // Posts to the static skeleton path (public/__forms.html) so Netlify's
    // form handler processes it; never block the download on a network error.
    try {
      const body = new URLSearchParams({
        'form-name': 'datasheet-download',
        'bot-field': '',
        name: form.name,
        email: form.email,
        company: form.company,
        document: fileName,
      })
      await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      }).catch(() => {}) // don't block download on network error
    } catch { /* ignore */ }

    setDone(true)
    setSubmitting(false)

    // Trigger download after 400ms so user sees the confirmation
    setTimeout(() => {
      const a = document.createElement('a')
      a.href = fileHref
      a.download = ''
      a.target = '_blank'
      a.rel = 'noopener noreferrer'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(() => { setOpen(false); setDone(false); setForm(empty) }, 1500)
    }, 400)
  }

  return (
    <>
      <span onClick={() => setOpen(true)} className={className ?? 'cursor-pointer'}>
        {children}
      </span>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
            {/* Orange accent top */}
            <div className="h-1.5 bg-gradient-to-r from-isa-500 to-isa-400" />

            {/* Header */}
            <div className="px-7 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-isa-500" />
                  <p className="text-xs font-bold uppercase tracking-widest text-isa-600">Protected Download</p>
                </div>
                <h2 className="text-base font-black text-slate-900 leading-snug">{fileName}</h2>
              </div>
              <button onClick={() => { setOpen(false); setForm(empty); setDone(false) }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors flex-shrink-0">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-7 py-6">
              {done ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-7 h-7 text-emerald-500" />
                  </div>
                  <p className="font-black text-slate-900 mb-1">Your download is starting…</p>
                  <p className="text-sm text-slate-500">© ISA Valve Solutions — for authorised use only.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <p className="text-sm text-slate-500 mb-5">
                    This document is copyrighted by ISA Valve Solutions. Please provide your details to access it.
                  </p>

                  {[
                    { key: 'name' as const,    label: 'Full Name',      placeholder: 'Your name' },
                    { key: 'email' as const,   label: 'Work Email',     placeholder: 'you@company.com' },
                    { key: 'company' as const, label: 'Company / Organisation', placeholder: 'Company name' },
                  ].map(({ key, label, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-1.5">{label}</label>
                      <input
                        type={key === 'email' ? 'email' : 'text'}
                        value={form[key]}
                        onChange={field(key)}
                        placeholder={placeholder}
                        className="field-input"
                        required
                      />
                    </div>
                  ))}

                  {error && <p className="text-xs text-red-600 font-medium">{error}</p>}

                  <button type="submit" disabled={submitting}
                    className="btn-primary w-full justify-center mt-2">
                    {submitting
                      ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                      : <><Download className="w-4 h-4" /> Download Document</>
                    }
                  </button>

                  <div className="flex items-center gap-2 justify-center pt-1">
                    <Shield className="w-3.5 h-3.5 text-slate-300" />
                    <p className="text-[10px] text-slate-400">
                      Your details are used to authorise document access only. © ISA Valve Solutions — all rights reserved.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

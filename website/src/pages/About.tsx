import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle, ArrowRight,
  Phone, Mail, MapPin, Loader2, Send, Star,
} from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import SchemaMarkup from '../components/SchemaMarkup'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'

const stats = [
  { value: '25+', label: 'Years in operation' },
  { value: '4', label: 'Valve product lines' },
  { value: '6', label: 'Industries served' },
  { value: 'ISO 9001', label: '2015 Certified' },
]

const certifications = [
  { name: 'ISO 9001:2015', desc: 'Quality management system certified', icon: '🏆' },
  { name: 'API 6D', desc: 'Pipeline & process valve certification', icon: '🛢️' },
  { name: 'SABS', desc: 'South African Bureau of Standards', icon: '🇿🇦' },
  { name: 'WRAS', desc: 'Water Regulations Advisory Scheme', icon: '💧' },
]

const values = [
  { title: 'Engineering Precision', desc: 'Every valve is manufactured and tested to exacting standards. Our ISO 9001:2015 certified quality management system ensures consistent performance across every order.' },
  { title: 'Application Expertise', desc: 'We do not just supply valves — we help engineers specify the right valve for the right application. Our team has deep field experience across mining, water treatment, oil & gas, and chemical industries.' },
  { title: 'Responsive Partnership', desc: 'From initial enquiry to after-sales support, we respond quickly and take ownership of your requirements. We measure our success by whether your process keeps running.' },
  { title: 'Full Traceability', desc: 'Every valve we supply comes with complete documentation: material test reports, hydrostatic test certificates, and certificates of conformance. No exceptions.' },
]

const localSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'About ISA Valve Solutions & Industrial Supplies',
  description: 'ISO 9001:2015 certified industrial valve supplier serving mining, water treatment, oil & gas, chemical, HVAC, and pulp & paper industries in South Africa.',
  url: 'https://www.isa-valve.co.za/about',
}

interface ContactForm {
  name: string
  email: string
  phone: string
  company: string
  message: string
}
const emptyForm: ContactForm = { name: '', email: '', phone: '', company: '', message: '' }

export default function About() {
  usePageMeta(
    'About ISA Valve Solutions',
    'ISO 9001:2015 certified industrial valve supplier. Ball valves, butterfly valves, gate valves, and knife gate valves for mining, water treatment, oil & gas, and chemical industries in South Africa.',
  )

  const [form, setForm] = useState<ContactForm>(emptyForm)
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const update = (f: keyof ContactForm, v: string) => setForm(p => ({ ...p, [f]: v }))
  const isValid = form.name && form.email && form.message

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json() as { ok?: boolean; error?: string }
      if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`)
      setSent(true)
      setForm(emptyForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed — please try again')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      <SchemaMarkup schema={localSchema} />

      {/* Hero */}
      <section className="bg-slate-900 text-white py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-black text-isa-400 uppercase tracking-widest mb-4">About ISA Valve Solutions</p>
            <h1 className="text-4xl sm:text-5xl font-black leading-tight mb-6">
              Built on engineering integrity.<br />
              <span className="text-isa-400">Proven in the field.</span>
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl">
              ISA Valve Solutions & Industrial Supplies specialises in precision-engineered ball valves, butterfly valves, gate valves, and knife gate valves for South African industry. Every valve we supply is ISO 9001:2015 certified, fully documented, and tested at 1.5× rated pressure before delivery.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 mt-12">
            {stats.map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl font-black text-isa-400">{s.value}</p>
                <p className="text-sm text-slate-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Company story */}
        <section className="grid lg:grid-cols-2 gap-12 mb-20">
          <div>
            <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Our Story</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-5">
              Closing the gap between valve supply and engineering support
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                ISA Valve Solutions was founded to solve a real problem in South African industry: too many valve failures were caused not by product quality, but by incorrect specification. Generic suppliers provide a product. We provide the product and the engineering support to ensure it performs.
              </p>
              <p>
                Our knife gate valves have extended service life from 3 months to 14 months in active mining operations. Our WRAS-certified butterfly valves supply potable water to municipal networks across South Africa. Our API 6D ball valves are in service in upstream oil and gas across the continent.
              </p>
              <p>
                Every order — from a single DN50 ball valve to a 200-unit mine contract — receives the same engineering attention, the same quality documentation, and the same after-sales support.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Our Process</p>
            {[
              { n: '01', title: 'Understand your application', desc: 'Fluid type, pressure, temperature, line size, industry — we gather what we need to specify correctly the first time.' },
              { n: '02', title: 'Specify the right valve', desc: 'We recommend from our range (or flag if your application needs something outside our offering — no wasted orders).' },
              { n: '03', title: 'Manufacture and test', desc: 'Every valve is manufactured to ISO 9001:2015, tested at 1.5× rated pressure, and fully documented before dispatch.' },
              { n: '04', title: 'Support after delivery', desc: 'Commissioning support, replacement parts, and application advice throughout the valve\'s service life.' },
            ].map(step => (
              <div key={step.n} className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                <span className="text-2xl font-black text-slate-200 flex-shrink-0 w-8">{step.n}</span>
                <div>
                  <p className="font-black text-slate-900 text-sm mb-1">{step.title}</p>
                  <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">What We Stand For</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Our core commitments</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map(v => (
              <div key={v.title} className="card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5 text-brand-600 flex-shrink-0" />
                  <h3 className="font-black text-slate-900">{v.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-20 bg-slate-900 rounded-2xl p-8 sm:p-12">
          <div className="text-center mb-10">
            <p className="text-xs font-black text-isa-400 uppercase tracking-widest mb-3">Certifications & Standards</p>
            <h2 className="text-2xl font-black text-white">Compliance you can document</h2>
            <p className="text-slate-400 mt-2 max-w-xl mx-auto text-sm leading-relaxed">All certifications are current and can be provided with your order. We operate under a fully audited ISO 9001:2015 quality management system.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {certifications.map(cert => (
              <div key={cert.name} className="bg-white/10 rounded-xl p-5 text-center">
                <p className="text-3xl mb-3">{cert.icon}</p>
                <p className="font-black text-white mb-1">{cert.name}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 bg-white/5 border border-white/10 rounded-xl text-center">
            <p className="text-sm text-slate-300 leading-relaxed">
              <span className="font-bold text-white">Testing standard:</span> All valves are pressure-tested at <strong className="text-isa-400">1.5× rated working pressure</strong> (hydrostatic and pneumatic) before dispatch. Full test certificates included with every order.
            </p>
          </div>
        </section>

        {/* Social proof */}
        <section className="mb-20">
          <div className="text-center mb-10">
            <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Client Outcomes</p>
            <h2 className="text-2xl font-black text-slate-900">Results that speak for themselves</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { quote: 'ISA supplied ceramic-lined knife gate valves that lasted 14 months in our slurry lines — we\'d been replacing valves every 3 months before that.', who: 'Maintenance Manager, Copper Mining, Northern Cape', stars: 5 },
              { quote: 'They helped us specify the correct butterfly valve for our water treatment plant. WRAS-compliant, SABS-approved, delivered inside 3 weeks.', who: 'Procurement Engineer, Municipal Water Treatment', stars: 5 },
              { quote: 'Full API 6D documentation with every valve, on time. That\'s exactly what our upstream project specification required.', who: 'Project Engineer, Oil & Gas Upstream', stars: 5 },
            ].map((t, i) => (
              <div key={i} className="card p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-slate-700 italic leading-relaxed mb-4">"{t.quote}"</p>
                <p className="text-xs font-semibold text-slate-500">{t.who}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact section */}
        <section id="contact" className="grid lg:grid-cols-2 gap-12">
          {/* Contact info */}
          <div>
            <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Get in Touch</p>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-5">
              Talk to an application engineer
            </h2>
            <p className="text-slate-500 leading-relaxed mb-8">
              Tell us about your application and we'll recommend the right valve, confirm the specification, and issue a quote — usually within 24 hours.
            </p>

            <div className="space-y-5 mb-8">
              <a href="tel:+27000000000" className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Phone</p>
                  <p className="font-bold text-slate-900 group-hover:text-brand-700">+27 (0) 00 000 0000</p>
                </div>
              </a>

              <a href="mailto:info@isavalve.co.za" className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Email</p>
                  <p className="font-bold text-slate-900 group-hover:text-brand-700">info@isavalve.co.za</p>
                </div>
              </a>

              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-green-50 transition-colors group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#dcfce7' }}>
                  <WhatsAppIcon className="w-5 h-5" style={{ color: '#16a34a' }} />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">WhatsApp Business</p>
                  <p className="font-bold text-slate-900 group-hover:text-green-700">Chat with us instantly</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-brand-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Location</p>
                  <p className="font-bold text-slate-900">South Africa — Global Partner Network</p>
                </div>
              </div>
            </div>

            <Link to="/rfq" className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-black px-6 py-3 rounded-xl transition-colors">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Contact form */}
          <div className="card p-6 sm:p-8">
            <h3 className="font-black text-slate-900 mb-5">Send us a message</h3>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600" />
                </div>
                <h4 className="font-black text-slate-900 mb-2">Message received</h4>
                <p className="text-sm text-slate-500">We'll be in touch within one business day.</p>
                <button onClick={() => setSent(false)} className="mt-4 text-sm text-brand-600 hover:underline font-semibold">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Name <span className="text-red-400">*</span></label>
                    <input value={form.name} onChange={e => update('name', e.target.value)} placeholder="Jane Smith" required className="field-input" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Email <span className="text-red-400">*</span></label>
                    <input type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="jane@company.com" required className="field-input" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Phone</label>
                    <input value={form.phone} onChange={e => update('phone', e.target.value)} placeholder="+27 (0) 00 000 0000" className="field-input" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">Company</label>
                    <input value={form.company} onChange={e => update('company', e.target.value)} placeholder="Your organisation" className="field-input" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">Message <span className="text-red-400">*</span></label>
                  <textarea value={form.message} onChange={e => update('message', e.target.value)} placeholder="Tell us about your application, the valve type you need, or any questions you have…" required rows={5} className="field-input resize-none" />
                </div>
                <button type="submit" disabled={!isValid || sending} className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 disabled:opacity-50 text-white font-black px-6 py-3 rounded-xl transition-colors text-sm w-full justify-center">
                  {sending ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <><Send className="w-4 h-4" /> Send Message</>}
                </button>
                {error && <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>}
              </form>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

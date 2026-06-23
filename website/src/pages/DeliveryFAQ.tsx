import { useState } from 'react'
import { ChevronDown, Truck, Clock, CreditCard, Shield, RotateCcw, Phone, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../hooks/usePageMeta'
import { WhatsAppIcon, WA_URL } from '../components/WhatsAppButton'

const leadTimes = [
  { type: 'Standard stock items', time: '24–48 hours', note: 'Dispatch same day if ordered before 12:00' },
  { type: 'Standard catalogue (non-stock)', time: '2–4 weeks', note: 'Ball, butterfly, gate valves in common sizes' },
  { type: 'Made-to-order (special spec)', time: '4–8 weeks', note: 'Custom materials, sizes, or pressure classes' },
  { type: 'Ceramic-lined / abrasion spec', time: '6–12 weeks', note: 'Knife gate valves with ceramic lining' },
  { type: 'Actuated assemblies', time: '4–10 weeks', note: 'Depends on actuator type and SIL rating' },
]

const deliveryZones = [
  { zone: 'Gauteng (Jhb/Pta)', time: '1–2 business days' },
  { zone: 'Major SA cities (Cape Town, Durban, PE)', time: '2–3 business days' },
  { zone: 'Regional South Africa', time: '3–5 business days' },
  { zone: 'Remote / outlying areas', time: '5–7 business days' },
  { zone: 'Sub-Saharan Africa (export)', time: '7–14 business days' },
  { zone: 'International', time: 'Quote on request' },
]

interface FAQ { q: string; a: string }

const faqs: FAQ[] = [
  {
    q: 'Is there a minimum order quantity?',
    a: 'No minimum order quantity for standard catalogue items. A single valve can be ordered. Minimum quantities may apply for certain custom or made-to-order specifications — contact us to confirm.',
  },
  {
    q: 'Can you supply documentation for oil & gas or mine projects?',
    a: 'Yes. We supply full documentation packages including material test reports (MTRs), hydrostatic test certificates, EN 10204 3.1 certificates, certificates of conformance, and API 6D certification for ball valves. Documentation requirements should be specified at the time of order.',
  },
  {
    q: 'Do you export outside South Africa?',
    a: 'Yes. We export throughout sub-Saharan Africa regularly. For other international destinations, contact us for logistics options and lead times. All export documentation (packing lists, commercial invoice, country of origin certificate) is included.',
  },
  {
    q: 'How quickly will you respond to a quote request?',
    a: 'Standard RFQ responses are issued within 24 hours on business days. For urgent requirements, contact us by phone or WhatsApp for same-day turnaround. Use our AI RFQ tool to get an instant preliminary assessment while we prepare a formal quote.',
  },
  {
    q: 'What is the difference between SABS and ISO certification for valves?',
    a: 'ISO 9001:2015 is ISA\'s quality management system certification — it governs how we design, manufacture, test, and deliver products. SABS marks (e.g., SABS 664 for gate valves) are product-level certifications confirming that a specific valve type meets South African national standards. We hold both, and they are independent of each other.',
  },
  {
    q: 'Can I get a sample valve before placing a large order?',
    a: 'Yes. Sample valves are supplied at the standard catalogue price. If a subsequent order of 10 or more units is placed within 90 days of the sample purchase, the sample cost is credited against the order.',
  },
  {
    q: 'Do you supply spare parts (seats, seals, stem packing)?',
    a: 'Yes. We stock common wearing parts for most of our standard range. Contact us with the valve model, size, and pressure class (and serial number if available) to confirm availability. Recommended spare parts lists can be supplied with new valve orders.',
  },
  {
    q: 'What technical support do you provide during installation?',
    a: 'Our engineering team provides remote technical support for installation and commissioning at no charge. For large projects or complex actuated systems, on-site commissioning support can be arranged — contact us to discuss.',
  },
  {
    q: 'What happens if a valve fails in service under warranty?',
    a: 'Contact us immediately with the order number and a description of the failure. We assess whether the failure is covered under warranty (defects in materials or workmanship) and arrange replacement or credit. For critical process failures, use our phone or WhatsApp for priority response.',
  },
  {
    q: 'Do you supply to private individuals or only to businesses?',
    a: 'ISA Valve Solutions primarily serves industrial customers, engineering firms, contractors, and municipalities. Private individual orders can be accommodated for quantities of 5 or more standard units. Contact us to discuss your requirements.',
  },
]

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900 text-sm pr-4">
          <span className="text-brand-600 font-black mr-2">{String(index + 1).padStart(2, '0')}.</span>
          {faq.q}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-slate-100">
          <p className="text-sm text-slate-600 leading-relaxed pt-4">{faq.a}</p>
        </div>
      )}
    </div>
  )
}

export default function DeliveryFAQ() {
  usePageMeta('Delivery, Lead Times & FAQ', 'Delivery zones, lead times, payment terms, warranty policy, and frequently asked questions for ISA Valve Solutions orders.')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Delivery & FAQ</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Orders, delivery & support</h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Everything you need to know about ordering, lead times, delivery, payment, and after-sales support.
        </p>
      </div>

      {/* Quick contact strip */}
      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        <a href="tel:+270606885648" className="flex items-center gap-4 p-5 bg-brand-50 border border-brand-200 rounded-xl hover:bg-brand-100 transition-colors group">
          <div className="w-11 h-11 rounded-lg bg-brand-600 flex items-center justify-center flex-shrink-0">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs text-brand-600 font-bold uppercase tracking-wider">Technical Support</p>
            <p className="font-black text-slate-900 text-lg">+27 060 688 5648</p>
          </div>
        </a>
        <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-5 rounded-xl border-2 border-green-200 bg-green-50 hover:bg-green-100 transition-colors group">
          <div className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#25D366' }}>
            <WhatsAppIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider" style={{ color: '#16a34a' }}>WhatsApp Business</p>
            <p className="font-black text-slate-900">Chat for urgent orders</p>
          </div>
        </a>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-12">

          {/* Lead times */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-brand-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-brand-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Lead times</h2>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Order type</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Lead time</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700 hidden sm:table-cell">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {leadTimes.map((row, i) => (
                    <tr key={row.type} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-800 border-b border-slate-100">{row.type}</td>
                      <td className="px-4 py-3 text-brand-700 font-bold border-b border-slate-100 whitespace-nowrap">{row.time}</td>
                      <td className="px-4 py-3 text-slate-500 border-b border-slate-100 hidden sm:table-cell">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-400 mt-3">Lead times are indicative and depend on current stock levels. Contact us to confirm before placing a time-critical order.</p>
          </section>

          {/* Delivery zones */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-isa-100 flex items-center justify-center">
                <Truck className="w-5 h-5 text-isa-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Delivery</h2>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Delivery zone</th>
                    <th className="text-left px-4 py-3 font-bold text-slate-700">Transit time</th>
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((row, i) => (
                    <tr key={row.zone} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-4 py-3 font-medium text-slate-800 border-b border-slate-100">{row.zone}</td>
                      <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{row.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-isa-50 border border-isa-100 rounded-xl text-sm text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Same-day dispatch:</strong> In-stock orders placed and confirmed by 12:00 PM (SAST) on a business day are dispatched the same day. Delivery charges are calculated at checkout based on order weight, dimensions, and delivery zone.
            </div>
          </section>

          {/* Payment */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-emerald-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Payment</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'New customers', items: ['Pro-forma invoice — payment before dispatch', 'EFT bank transfer or credit card', 'Order confirmed once payment is cleared'] },
                { title: 'Approved accounts', items: ['30 days net from invoice date', 'Credit application required', 'Contact us to apply for a credit account'] },
              ].map(block => (
                <div key={block.title} className="card p-5">
                  <h3 className="font-black text-slate-900 mb-3">{block.title}</h3>
                  <ul className="space-y-2">
                    {block.items.map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Warranty & Returns */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center">
                <Shield className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Warranty & returns</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <h3 className="font-black text-slate-900">Warranty</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />12 months from date of installation</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />Maximum 18 months from date of shipment</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />Covers defects in materials and workmanship</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />All valves tested at 1.5× rated pressure before dispatch</li>
                </ul>
              </div>
              <div className="card p-5">
                <div className="flex items-center gap-2 mb-3">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <h3 className="font-black text-slate-900">Returns</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />Standard items: 30 days, unused, original packaging</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />15% restocking fee on standard returns</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />Made-to-order items: non-returnable</li>
                  <li className="flex items-start gap-2"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />Defective items replaced or credited at no charge</li>
                </ul>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-black text-slate-900 mb-6">Frequently asked questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, i) => <FAQItem key={i} faq={faq} index={i} />)}
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="card p-6 border-brand-200 bg-brand-50/40 sticky top-24">
            <h3 className="font-black text-slate-900 mb-4">Need help with an order?</h3>
            <div className="space-y-3 text-sm">
              <p className="text-slate-600 leading-relaxed">Our team responds within 24 hours on business days. For urgent requirements, WhatsApp or phone is fastest.</p>
              <a href="tel:+270606885648" className="flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800">
                <Phone className="w-4 h-4" /> +27 060 688 5648
              </a>
              <a href="mailto:isa-valve@outlook.com" className="flex items-center gap-2 font-semibold text-brand-700 hover:text-brand-800 break-all">
                <MessageCircle className="w-4 h-4 flex-shrink-0" /> isa-valve@outlook.com
              </a>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold" style={{ color: '#16a34a' }}>
                <WhatsAppIcon className="w-4 h-4" /> WhatsApp Business
              </a>
            </div>
            <div className="mt-5 pt-4 border-t border-brand-200">
              <Link to="/rfq" className="block text-center bg-isa-600 hover:bg-isa-700 text-white font-black px-4 py-3 rounded-xl transition-colors text-sm">
                Request a Quote
              </Link>
            </div>
          </div>

          <div className="border border-slate-200 bg-slate-50 rounded-xl p-5">
            <p className="text-xs font-black text-slate-700 mb-2 uppercase tracking-wider">ISO 9001:2015 Certified</p>
            <p className="text-xs text-slate-500 leading-relaxed">Every valve is pressure-tested at 1.5× rated pressure. Full material traceability documentation included with every order — no exceptions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

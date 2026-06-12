import { useState } from 'react'
import type React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, ChevronDown, ChevronUp, Send, Loader2, CheckCircle, Globe, Users, Clock, Package } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import { WA_URL } from '../components/WhatsAppButton'

const globalStats = [
  { icon: Globe, value: '47', label: 'Countries Served' },
  { icon: Users, value: '250+', label: 'Service Partners' },
  { icon: Clock, value: '24/7', label: 'Technical Support' },
  { icon: Package, value: '98.7%', label: 'Parts Availability' },
]

interface ValveModel {
  model: string
  name: string
  nominalDiameter: string
  standard: string
  workingPressure: string
  bodyMaterial: string
  seating?: string
}

interface ProductFamily {
  id: string
  title: string
  icon: string
  description: string
  color: string
  models: ValveModel[]
  requestSlug: string
}

const families: ProductFamily[] = [
  {
    id: 'gate',
    title: 'Gate Valve Series',
    icon: '⊙',
    description: 'Full-bore isolation with minimal pressure drop. Available in resilient seat (NRS/OS&Y) and metal seat configurations. Standards include BS, DIN, SABS, GOST, MSS, ASME, and JIS.',
    color: 'brand',
    requestSlug: 'gate-valve',
    models: [
      { model: 'GV-R1', name: 'BS5163/AWWA C509/C515/JIS B2002/AS 2638.2 Resilient Seat', nominalDiameter: 'DN40–DN1200', standard: 'BS5163 / AS 2638.2 / AWWA C509', workingPressure: 'PN16 / PN25', bodyMaterial: 'Ductile Iron (DI)', seating: 'EPDM / NBR / Viton' },
      { model: 'GV-DIN', name: 'DIN3202 F4/F5 NRS/OS&Y Resilient Seat', nominalDiameter: 'DN40–DN1200', standard: 'DIN3202 F4 / F5', workingPressure: 'PN10 / PN16 / PN25', bodyMaterial: 'Ductile Iron (DI)', seating: 'EPDM / NBR / Viton' },
      { model: 'GV-RS', name: 'SABS664 Double Flanged/Socketted NRS/OS&Y Resilient Seat', nominalDiameter: 'DN60–DN300', standard: 'SABS664', workingPressure: 'PN16 / PN25', bodyMaterial: 'Ductile Iron (DI)', seating: 'EPDM / NBR / Viton' },
      { model: 'GV-RG', name: 'GOST NRS/OS&Y Resilient Seat', nominalDiameter: 'DN40–DN300', standard: 'GOST', workingPressure: 'PN16 / PN25', bodyMaterial: 'Ductile Iron (DI)', seating: 'EPDM / NBR / Viton' },
      { model: 'GVM-A', name: 'MSS SP-70 Metal Seat', nominalDiameter: 'DN40–DN600', standard: 'ASME B16.10 / MSS SP-70', workingPressure: 'CLASS 125 / CLASS 150', bodyMaterial: 'CI / DI', seating: 'Brass / Bronze / SS seat' },
      { model: 'GVM-BS', name: 'BS5150 Metal Seat', nominalDiameter: 'DN40–DN600', standard: 'BS5150 / EN1092 PN10/PN16', workingPressure: 'PN16', bodyMaterial: 'CI / SS', seating: 'Brass / Bronze / SS seat' },
      { model: 'GVM-DIN', name: 'DIN3202 F4/F5 Metal Seat', nominalDiameter: 'DN40–DN600', standard: 'DIN3202 F4/F5 / EN1092 PN10/PN16', workingPressure: 'PN16', bodyMaterial: 'CI / SS', seating: 'DI-Brass / Bronze / SS' },
      { model: 'F7363/F7364', name: 'JIS F7363/F7364 Metal Seat (Marine)', nominalDiameter: 'DN40–DN300', standard: 'JIS B2002-102/104', workingPressure: '5K / 10K', bodyMaterial: 'CI / Bronze', seating: 'Brass / Bronze' },
    ],
  },
  {
    id: 'butterfly',
    title: 'Butterfly Valve Series',
    icon: '◎',
    description: 'Quarter-turn disc for fast shut-off and throttling. Configurations include wafer, lug, mono-flange, semi-lug, double-flange, double eccentric, and grooved end. DN25 to DN2400.',
    color: 'isa',
    requestSlug: 'butterfly-valve',
    models: [
      { model: 'BWA-1', name: 'Aluminium Alloy Wafer Butterfly Valve', nominalDiameter: 'DN25–DN500', standard: 'API 609 / JIS B2100/PN10/PN16/150LB', workingPressure: 'PN16', bodyMaterial: 'ADCI2 Aluminium Alloy', seating: 'EPDM / NBR / PTFE' },
      { model: 'BWA-2', name: 'Anti-condensation Aluminium Alloy Butterfly Valve', nominalDiameter: 'DN25–DN300', standard: 'API 609 / JIS5B/PN10/PN16/150LB', workingPressure: 'PN16', bodyMaterial: 'ADCI2', seating: 'EPDM / NBR / PTFE' },
      { model: 'BW2-1', name: 'Two Holes Wafer Butterfly Valve', nominalDiameter: 'DN40–DN300', standard: 'API 609 / PN5A/10K/PN10/PN16A/150LB', workingPressure: 'PN16', bodyMaterial: 'CI / DI SS304', seating: 'EPDM / NBR / PTFE' },
      { model: 'BW-0', name: 'No Hole Wafer Butterfly Valve', nominalDiameter: 'DN40–DN300', standard: 'API 609 / JS14/5B/PN10/PN16/PN16/150LB', workingPressure: 'PN16', bodyMaterial: 'CI / DI / SS', seating: 'EPDM / NBR / PTFE' },
      { model: 'BW41', name: 'Hard Back Seat Wafer Butterfly Valve', nominalDiameter: 'DN25–DN1200', standard: 'API 609 / JS10/5B/166/PN10/PN16/PN21/150LB', workingPressure: 'PN10 / PN16 / PN25', bodyMaterial: 'CI / DI / WCB SS / Duplex SS', seating: 'EPDM / NBR / PTFE' },
      { model: 'BW42', name: 'Soft Seat Wafer Butterfly Valve', nominalDiameter: 'DN25–DN700', standard: 'API 609 / JS16/5B/PN10/PN16/PN16/150LB', workingPressure: 'PN15 / PN16 / PN21', bodyMaterial: 'CI / DI / WCB SS / Duplex SS', seating: 'EPDM / NBR / PTFE' },
      { model: 'BWP2', name: 'Two Pieces Bodies Wafer Butterfly Valve', nominalDiameter: 'DN50–DN850', standard: 'API 609 / JS08/5B/PN10/PN16/PN16/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'DI / WCB / SS', seating: 'PTFE Etc.' },
      { model: 'BMF', name: 'Mono-flange Butterfly Valve (Marine)', nominalDiameter: 'DN40–DN1200', standard: 'API 609 / JS10/5BK/PN10/PN16/PN24/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BWL', name: 'Semi Lug Butterfly Valve (Marine)', nominalDiameter: 'DN40–DN1200', standard: 'API 609 / JS10/5B/PN10/PN16/PN16/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BL-1', name: 'Hard Back Seat Lug Butterfly Valve', nominalDiameter: 'DN40–DN1200', standard: 'API 609 / JS10/5B/5B/PN10/PN16/PN15/150LB', workingPressure: 'PN8 / PN16', bodyMaterial: 'CI / DI / WCB SS / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BL-2', name: 'Soft Seat Lug Butterfly Valve', nominalDiameter: 'DN65–DN1200', standard: 'API 609 / JS10/5B/5B/PN10/PN16/PN16/PN21/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / SS / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BFL2', name: 'Two Pieces Bodies Lug Butterfly Valve', nominalDiameter: 'DN40–DN600', standard: 'API 609 / JS08/5B/PN10/PN16/PN16/PN18/150LB', workingPressure: 'PN15 / PN16', bodyMaterial: 'DI / WCB / SS', seating: 'PTFE / PFA Etc.' },
      { model: 'BFU', name: 'U Section Butterfly Valve', nominalDiameter: 'DN40–DN2000', standard: 'API 609 / JS18/5B/PN10/PN16/PN16/PN16/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BDF-J (JIS)', name: 'JIS F7480 Double Flange Butterfly Valve', nominalDiameter: 'DN40–DN1200', standard: 'JIS F7480 / JS10/5B/PN10/PN16/PN16/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'BDF-J (ISO)', name: 'ISO5752 Series 13 Double Flange Butterfly Valve', nominalDiameter: 'DN40–DN1200', standard: 'ISO5752 Series 13 / JS10/5B/PN10/PN16/PN16A/PN25/150LB', workingPressure: 'PN10 / PN16', bodyMaterial: 'CI / DI / WCB / SS / Duplex SS', seating: 'EPDM / NBR / PTFE' },
      { model: 'BFDE', name: 'Double Eccentric Flanged Butterfly Valve', nominalDiameter: 'DN100–DN2400', standard: 'ISO5752 Series 13/14 / JS08/5B/PN10/PN16/PN21/PN21B', workingPressure: 'PN13 / PN16 / PN25', bodyMaterial: 'SS / SS304 / SS316 / Bronze', seating: 'EPDM / NBR / PTFE' },
      { model: 'MSS SP-67', name: 'Grooved End Butterfly Valve (Fire Fighting)', nominalDiameter: 'DN40–DN300', standard: 'MSS SP-67 / AWWA C606', workingPressure: '50PSI / 300PSI / 175PSI / 175PSI', bodyMaterial: 'DI', seating: 'EPDM / NBR / Viton' },
    ],
  },
  {
    id: 'check',
    title: 'Check Valve Series',
    icon: '↩',
    description: 'Dual plate wafer and swing check valves for backflow prevention. Configurations in wafer, double flange, bonded seat, swing pattern (DIN, BS, MSS, JIS) and ball types (flanged and threaded).',
    color: 'brand',
    requestSlug: 'check-valve',
    models: [
      { model: 'CVDW1', name: 'DIN3202 K3 Wafer Dual Plate Check Valve', nominalDiameter: 'DN40–DN1200', standard: 'DIN3202 K3 / JS10K/16/PN10/PN16/PN18/150LB', workingPressure: 'PN10 / PN16 / PN25', bodyMaterial: 'CI / DI / WCB / Bronze / Duplex', seating: 'EPDM / NBR / Viton' },
      { model: 'CVDW125', name: 'API 594 CLASS 125 Wafer Dual Plate Check Valve', nominalDiameter: 'DN40–DN1200', standard: 'API 594 CLASS 125', workingPressure: '125LB / 150LB', bodyMaterial: 'CI / DI / WCB / SS / Bronze', seating: 'EPDM / NBR / Viton' },
      { model: 'CVDW150', name: 'API 594 CLASS 150 Wafer Dual Plate Check Valve', nominalDiameter: 'DN40–DN1200', standard: 'API 594 CLASS 150', workingPressure: '150LB / PN16 / PN25', bodyMaterial: 'CI / DI / WCB / SS / Bronze', seating: 'EPDM / NBR / Viton' },
      { model: 'CVDWB', name: 'Bonded Seat Wafer Dual Plate Check Valve', nominalDiameter: 'DN40–DN1200', standard: 'DIN3202 K3 / API 594 CLASS 150', workingPressure: 'PN10 / PN16 / PN25', bodyMaterial: 'CI / Bronze', seating: 'EPDM / NBR / Viton' },
      { model: 'CVDF', name: 'Double Flange Wafer Check Valve', nominalDiameter: 'DN40–DN1200', standard: 'DIN3202 K3 / API 594 CLASS 150', workingPressure: '150LB / PN16 / PN25', bodyMaterial: 'CI / WCB SS / Bronze', seating: 'EPDM / NBR / Viton' },
      { model: 'SCVF6', name: 'DIN3202 F6 Swing Check Valve', nominalDiameter: 'DN40–DN300', standard: 'ASME B16.10 / PN10/PN16/PN25', workingPressure: 'PN16 / PN25', bodyMaterial: 'CI / SS', seating: 'Brass / Bronze / EPDM / NBR' },
      { model: 'SCV-BS5153', name: 'BS5153 Swing Check Valve', nominalDiameter: 'DN40–DN300', standard: 'BS5153 / PN10/PN16/PN25', workingPressure: 'PN10 / PN25', bodyMaterial: 'CI / DI', seating: 'Brass / Bronze / EPDM / NBR' },
      { model: 'CVSP-71', name: 'MSS SP-71 Swing Check Valve', nominalDiameter: 'DN40–DN300', standard: 'ASME B16.10 / 150LB', workingPressure: '150LB', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / EPDM / NBR' },
      { model: 'SCV-JIS', name: 'JIS F7372/F7373 Swing Check Valve (Marine)', nominalDiameter: 'DN40–DN300', standard: 'JIS B2002-119/120/121 / JIS 5K/10K', workingPressure: '5K / 10K', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / EPDM / NBR' },
      { model: 'DIN-BC16', name: 'Double Flanged Ball Check Valve', nominalDiameter: 'DN40–DN300', standard: 'DIN3202 F6 / PN10/PN16', workingPressure: 'PN10 / PN16', bodyMaterial: 'DI', seating: 'WCB-EPDM / NBR' },
      { model: 'BCT-16', name: 'Threaded Ball Check Valve', nominalDiameter: 'DN15–DN80', standard: 'ISO228 S / PN16', workingPressure: 'PN16', bodyMaterial: 'DI', seating: 'WCB-EPDM / NBR' },
    ],
  },
  {
    id: 'globe',
    title: 'Globe Valve Series',
    icon: '⊘',
    description: 'Metal seat globe valves for precise flow throttling and shut-off. Standards include DIN, BS, ASME, and JIS. Suitable for marine, general industrial, and high-pressure service. DN15–DN300.',
    color: 'isa',
    requestSlug: 'globe-valve',
    models: [
      { model: 'GVM-DF1', name: 'DIN3356 Metal Seat Globe Valve', nominalDiameter: 'DN15–DN300', standard: 'DIN3202 F1 / EN1092 PN10/PN16', workingPressure: 'PN16', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / SS' },
      { model: 'GVM-BS', name: 'BS5152 Metal Seat Globe Valve', nominalDiameter: 'DN15–DN300', standard: 'BS5152 / EN1092 PN10/PN16', workingPressure: 'PN16', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / SS' },
      { model: 'GV-MSS', name: 'MSS SP-85 Metal Seat Globe Valve', nominalDiameter: 'DN15–DN300', standard: 'ASME B16.10 / 150LB', workingPressure: 'CLASS 125 / CLASS 150', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / SS' },
      { model: 'F7305/F7307', name: 'JIS F7305/F7307 Metal Seat Globe Valve (Marine)', nominalDiameter: 'DN15–DN300', standard: 'JIS B2002-107/108 / JIS 5K/10K', workingPressure: '5K / 10K', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / SS' },
      { model: 'F7306/F7308', name: 'JIS F7306/F7308 Metal Seat Angle Globe Valve (Marine)', nominalDiameter: 'DN15–DN300', standard: 'JIS B2002-113/114 / JIS 5K/10K', workingPressure: '5K / 10K', bodyMaterial: 'CI / DI', seating: 'DI-Brass / Bronze / SS' },
    ],
  },
  {
    id: 'strainer',
    title: 'Y Strainer Series',
    icon: '⊕',
    description: 'Flanged Y strainers for pipeline debris filtration. DIN3202 F1 standard. Available in PN6/PN10/PN16/PN25. Magnetic filter option for metal impurity removal. Horizontal and vertical installation.',
    color: 'brand',
    requestSlug: 'y-strainer',
    models: [
      { model: 'Y-DIN (PN6)', name: 'DIN3202 F1 Flanged Y Strainer PN6', nominalDiameter: 'DN15–DN500', standard: 'DIN3202 F1 / JIS 5K/10K/PN10/PN16', workingPressure: 'PN6', bodyMaterial: 'CI / DI', seating: 'SS304 / SS316 screen' },
      { model: 'Y-DIN (PN10)', name: 'DIN3202 F1 Flanged Y Strainer PN10', nominalDiameter: 'DN15–DN500', standard: 'DIN3202 F1 / JIS 5K/10K/PN10/PN16', workingPressure: 'PN10', bodyMaterial: 'CI / DI', seating: 'SS304 / SS316 screen' },
      { model: 'Y-DIN (PN16)', name: 'DIN3202 F1 Flanged Y Strainer PN16', nominalDiameter: 'DN15–DN500', standard: 'DIN3202 F1 / JIS 5K/10K/PN10/PN16', workingPressure: 'PN16', bodyMaterial: 'CI / DI', seating: 'SS304 / SS316 screen' },
      { model: 'Y-DIN (PN25)', name: 'DIN3202 F1 Flanged Y Strainer PN25', nominalDiameter: 'DN15–DN500', standard: 'DIN3202 F1 / JIS 5K/10K/PN10/PN16', workingPressure: 'PN25', bodyMaterial: 'CI / DI', seating: 'SS304 / SS316 screen' },
    ],
  },
]

const catalogSpecs = [
  { label: 'Size Range', value: 'DN 15 – DN 3000' },
  { label: 'Pressure Ratings', value: 'PN 2.5–64 / ANSI 150–1500' },
  { label: 'Materials', value: 'SS 304/316 · WCB Carbon Steel · Alloy 20 · Monel · Titanium' },
  { label: 'Compliance', value: 'ISO · API · SABS · Hydrostatic & NDE Testing · Full 3D CAD' },
  { label: 'Valve Types', value: 'Gate · Globe · Ball · Butterfly · Check · Plug · Diaphragm · Control · Safety Relief · Steam Trap · Solenoid · Y Strainer' },
]

function FamilySection({ family }: { family: ProductFamily }) {
  const [open, setOpen] = useState(family.id === 'gate')
  const colorClass = family.color === 'isa' ? 'text-isa-600' : 'text-brand-700'
  const bgClass = family.color === 'isa' ? 'bg-isa-50 border-isa-200' : 'bg-brand-50 border-brand-200'
  const btnClass = family.color === 'isa'
    ? 'bg-isa-600 hover:bg-isa-700 text-white'
    : 'bg-brand-600 hover:bg-brand-700 text-white'

  return (
    <div className="border border-slate-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-6 py-5 text-left hover:bg-slate-50 transition-colors ${open ? 'border-b border-slate-200' : ''}`}
      >
        <div className="flex items-center gap-4">
          <span className={`text-2xl font-black ${colorClass}`}>{family.icon}</span>
          <div>
            <h2 className="font-black text-lg text-slate-900">{family.title}</h2>
            <p className="text-sm text-slate-500">{family.models.length} models — {family.models[0]?.nominalDiameter} to {family.models[family.models.length - 1]?.nominalDiameter}</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-5 h-5 text-slate-400 flex-shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />}
      </button>

      {open && (
        <div className="p-6">
          <p className="text-sm text-slate-600 leading-relaxed mb-6 max-w-3xl">{family.description}</p>

          {/* Model table */}
          <div className="overflow-x-auto rounded-xl border border-slate-200 mb-5">
            <table className="w-full text-sm min-w-[760px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider w-28">Model</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider">Name / Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider w-36">Size Range</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider w-32">Pressure</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-600 text-xs uppercase tracking-wider w-32">Body Material</th>
                </tr>
              </thead>
              <tbody>
                {family.models.map((m, i) => (
                  <tr key={m.model} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                    <td className="px-4 py-3 font-mono text-xs font-bold text-slate-700 border-b border-slate-100">{m.model}</td>
                    <td className="px-4 py-3 text-slate-700 border-b border-slate-100">{m.name}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{m.nominalDiameter}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{m.workingPressure}</td>
                    <td className="px-4 py-3 text-slate-600 border-b border-slate-100">{m.bodyMaterial}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to={`/products/${family.requestSlug}`}
              className={`inline-flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-colors ${btnClass}`}
            >
              View Product Page <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/rfq"
              className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Request Quote
            </Link>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-sm font-medium px-3 py-2 rounded-lg ${bgClass} ${colorClass} border transition-colors`}
            >
              WhatsApp Query
            </a>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Catalog() {
  usePageMeta(
    'Full Product Catalog — DN15 to DN3000',
    'ISA Valve Solutions full catalog: gate valves, butterfly valves, check valves, globe valves, and Y strainers. DN15–DN3000, PN2.5–64, ISO/API/SABS certified.',
  )

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setErr(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          company,
          message: `Full product catalog PDF request.\nCompany: ${company || 'Not provided'}`,
          phone: '',
        }),
      })
      if (!res.ok) throw new Error()
      setSent(true)
    } catch {
      setErr('Failed to send. Please email us directly at isa-valve@outlook.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <div>
      {/* Hero banner */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <img
          src="/images/branded/isa-bg-valves-row.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.3 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.95) 0%, rgba(7,26,45,0.70) 60%, rgba(7,26,45,0.35) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18">
          <p className="text-xs font-bold text-isa-400 uppercase tracking-widest mb-3">Technical Catalog 2025</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            Full Product Catalog
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
            5 product families · 40+ certified valve models · DN15–DN3000 · PN 2.5–64 / ANSI 150–1500. ISO 9001:2015 certified with full material traceability.
          </p>
        </div>
      </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

      {/* Global network stats */}

      {/* Global network stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {globalStats.map(s => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <s.icon className="w-5 h-5 text-brand-600 mx-auto mb-2" />
            <p className="text-2xl font-black text-slate-900">{s.value}</p>
            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Full spec summary */}
      <div className="bg-navy rounded-2xl p-6 mb-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {catalogSpecs.map(s => (
          <div key={s.label}>
            <p className="text-xs text-blue-300 font-bold uppercase tracking-wider mb-1">{s.label}</p>
            <p className="text-sm text-white leading-relaxed">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_300px] lg:gap-10">
        {/* Product families */}
        <div className="space-y-4">
          {families.map(f => <FamilySection key={f.id} family={f} />)}
        </div>

        {/* Sidebar */}
        <aside className="mt-8 lg:mt-0 space-y-5">
          {/* Request catalog PDF */}
          <div className="card p-5 sticky top-24">
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-brand-600" />
              <h3 className="font-bold text-slate-900 text-sm">Request Catalog PDF</h3>
            </div>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Get the full 54-page technical catalog with dimensional drawings, material tables, and model specifications.
            </p>

            {sent ? (
              <div className="text-center py-4">
                <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-800">Catalog request sent!</p>
                <p className="text-xs text-slate-500 mt-1">We'll email you the PDF within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleRequest} className="space-y-2.5">
                <input
                  required
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <input
                  required
                  type="email"
                  placeholder="Work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Company (optional)"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full text-sm border border-slate-200 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
                {err && <p className="text-xs text-red-600 bg-red-50 rounded px-2 py-1">{err}</p>}
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center justify-center gap-2 w-full bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-semibold px-4 py-2.5 rounded-xl transition-colors text-sm"
                >
                  {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  {sending ? 'Sending…' : 'Request Catalog PDF'}
                </button>
              </form>
            )}
          </div>

          {/* Quick links */}
          <div className="card p-5">
            <h3 className="font-bold text-slate-900 text-sm mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/rfq" className="flex items-center justify-between text-sm text-slate-600 hover:text-brand-700 py-1.5 border-b border-slate-100">
                Request a Quote <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/configurator" className="flex items-center justify-between text-sm text-slate-600 hover:text-isa-700 py-1.5 border-b border-slate-100">
                AI Valve Selector <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/delivery-faq" className="flex items-center justify-between text-sm text-slate-600 hover:text-brand-700 py-1.5 border-b border-slate-100">
                Delivery & Lead Times <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm text-green-700 hover:text-green-800 py-1.5">
                WhatsApp Technical Query <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* ISO cert */}
          <div className="bg-navy rounded-xl p-5">
            <p className="text-xs font-bold text-white mb-1">ISO 9001:2015 Certified</p>
            <p className="text-xs text-blue-200 leading-relaxed">
              All valves hydrostatic & pneumatic tested at 1.5× rated pressure. Full material traceability and 3D CAD documentation included.
            </p>
          </div>
        </aside>
      </div>

      {/* Case study strip */}
      <div className="mt-14 bg-gradient-to-r from-navy via-brand-900 to-brand-800 rounded-2xl p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
        <div>
          <p className="text-xs text-isa-400 font-bold uppercase tracking-wider mb-2">Case Study — Copper Mining, Northern Cape</p>
          <h2 className="text-xl font-black text-white mb-2">72% Reduction in Maintenance Downtime</h2>
          <p className="text-blue-200 text-sm leading-relaxed max-w-xl">
            Custom ceramic-lined knife gate valves extended service life from 3 months to 14 months, reducing annual parts costs by R1.2 million and improving process efficiency by 8%.
          </p>
        </div>
        <Link
          to="/rfq"
          className="flex-shrink-0 inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm"
        >
          Get a Quote <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
    </div>
  )
}

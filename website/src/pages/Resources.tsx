import { Link } from 'react-router-dom'
import { Download, BookOpen, ArrowRight, Calculator, ExternalLink, Shield, Zap } from 'lucide-react'

const downloads = [
  { name: 'Valve Selection Guide',         type: 'PDF', size: '2.1 MB', desc: 'Complete guide to selecting the right valve type for your application', icon: '📋' },
  { name: 'ISA Titan™ Ball Valve Data Sheet', type: 'PDF', size: '850 KB', desc: 'Technical data, dimensions and performance curves for DN15–DN600', icon: '⚙️' },
  { name: 'ISA Hydra™ Butterfly Valve Data Sheet', type: 'PDF', size: '920 KB', desc: 'Technical data, dimensions and torque curves for DN50–DN1200', icon: '🦋' },
  { name: 'ISA Core™ Gate Valve Data Sheet', type: 'PDF', size: '780 KB', desc: 'Technical data, dimensions and pressure ratings for DN50–DN1000', icon: '🔧' },
  { name: 'ISA ProSeal™ Knife Gate Valve Data Sheet', type: 'PDF', size: '1.1 MB', desc: 'Technical data for slurry and abrasive service applications', icon: '🔪' },
  { name: 'ISA Shield™ Pinch Valve Data Sheet', type: 'PDF', size: '1.4 MB', desc: 'ISO 5208 Grade A pinch valve with 4 sleeve grades — full technical data', icon: '🔴' },
  { name: 'ISA DXST™ Slurry KGV Data Sheet', type: 'PDF', size: '1.8 MB', desc: '466% longer life knife gate valve — full technical and case study data', icon: '🟢' },
  { name: 'Chemical Compatibility Chart',    type: 'PDF', size: '3.2 MB', desc: 'Elastomer and body material compatibility for 120+ chemicals', icon: '⚗' },
  { name: 'Hydrostatic Test Certificates',   type: 'PDF', size: 'On request', desc: 'Individual hydro test certificates available for every valve supplied', icon: '💧' },
]

const standards = [
  { code: 'ISO 9001:2015', name: 'Quality Management Systems',         scope: 'Full production and documentation system' },
  { code: 'API 6D',         name: 'Pipeline & Piping Valves',           scope: 'Ball and gate valves for upstream/midstream' },
  { code: 'ISO 5208',       name: 'Industrial Valve Testing',           scope: 'Pressure testing — Grade A zero leakage' },
  { code: 'SABS 664',       name: 'South African Gate Valves',          scope: 'Gate valves for water and municipal service' },
  { code: 'WRAS',           name: 'Water Regulations Advisory Scheme',  scope: 'Potable water contact approval (UK/ZA)' },
  { code: 'IEC 60534',      name: 'Control Valve Sizing',               scope: 'Kv/Cv sizing formulas for liquid and gas' },
  { code: 'ASME B16.34',    name: 'Valves — Flanged, Threaded & Weld',  scope: 'Pressure-temperature ratings and dimensions' },
  { code: 'EN 12516',       name: 'Industrial Valve Shell Strength',    scope: 'Pressure containing parts design' },
]

interface CompatRow {
  chemical: string; nbr: string; epdm: string; viton: string; ptfe: string; note?: string
}
const compatibilityData: CompatRow[] = [
  { chemical: 'Water (clean)',      nbr: '✓', epdm: '✓', viton: '✓', ptfe: '✓' },
  { chemical: 'Sea water',          nbr: '✓', epdm: '✓', viton: '✓', ptfe: '✓' },
  { chemical: 'Sulphuric acid <50%',nbr: '✗', epdm: '✓', viton: '✓', ptfe: '✓' },
  { chemical: 'Hydrochloric acid',  nbr: '✗', epdm: '✓', viton: '✓', ptfe: '✓' },
  { chemical: 'Caustic soda (NaOH)',nbr: '✓', epdm: '✓', viton: '✗', ptfe: '✓' },
  { chemical: 'Diesel / fuel oil',  nbr: '✓', epdm: '✗', viton: '✓', ptfe: '✓' },
  { chemical: 'Hydraulic oil',      nbr: '✓', epdm: '✗', viton: '✓', ptfe: '✓' },
  { chemical: 'Chlorine / bleach',  nbr: '✗', epdm: '✓', viton: '✓', ptfe: '✓' },
  { chemical: 'Acetone / MEK',      nbr: '✗', epdm: '✗', viton: '✗', ptfe: '✓', note: 'Use metallic seat' },
  { chemical: 'Steam >120°C',       nbr: '✗', epdm: '✓', viton: '✓', ptfe: '✓', note: 'Check temp rating' },
  { chemical: 'Ammonia',            nbr: '✗', epdm: '✓', viton: '✗', ptfe: '✓' },
  { chemical: 'Crude oil / slurry', nbr: '✓', epdm: '✗', viton: '✓', ptfe: '✗', note: 'Use ceramic-lined KGV' },
]

const valveGuide = [
  {
    type: 'Ball Valve (ISA Titan™)',
    best: 'Clean or mildly contaminated liquids and gases requiring fast quarter-turn shut-off',
    notFor: 'Slurry, fibrous media, or continuous throttling',
    certs: 'API 6D · ISO',
    slug: 'ball-valve',
  },
  {
    type: 'Butterfly Valve (ISA Hydra™)',
    best: 'Large-bore, low-pressure systems with water, air or non-corrosive media',
    notFor: 'High-solids slurry or abrasive media',
    certs: 'WRAS · SABS',
    slug: 'butterfly-valve',
  },
  {
    type: 'Gate Valve (ISA Core™)',
    best: 'Full-bore isolation of clean water or HVAC systems with infrequent operation',
    notFor: 'Throttling service or abrasive media',
    certs: 'SABS 664 · ISO',
    slug: 'gate-valve',
  },
  {
    type: 'Knife Gate Valve (ISA ProSeal™)',
    best: 'Slurry, viscous fluids, and solids-laden media — mining, wastewater, pulp & paper',
    notFor: 'High-pressure clean service (use ball valve)',
    certs: 'SABS · ISO',
    slug: 'knife-gate-valve',
  },
  {
    type: 'Pinch Valve (ISA Shield™)',
    best: 'Highly abrasive slurry, tailings, thickener underflow and CIL/CIP circuits',
    notFor: 'High temperature >80°C without special sleeves',
    certs: 'ISO 5208 Grd A',
    slug: 'pinch-valve',
  },
  {
    type: 'DXST Slurry KGV (ISA DXST™)',
    best: 'Extreme wear mining service where standard valves fail in under 6 months',
    notFor: 'Clean or chemical service (oversized for that purpose)',
    certs: 'ISO 9001 · SABS',
    slug: 'dxst-kgv',
  },
]

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return <section id={id} className="py-16 section-sep">{children}</section>
}

export default function Resources() {
  return (
    <div style={{ background: '#081D42' }} className="min-h-screen pt-20 pb-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60"/>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(0,109,255,0.07) 0%, transparent 65%)' }}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300 mb-6"
            style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.25)' }}>
            <BookOpen className="w-3 h-3" /> Engineering Resource Centre
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Engineering Resources</h1>
          <p className="text-muted text-lg max-w-2xl mb-8">
            Technical data sheets, selection guides, chemical compatibility tables, engineering standards reference, and engineering calculators — everything your team needs to specify the right valve.
          </p>
          {/* Quick nav */}
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Downloads', href: '#downloads' },
              { label: 'Valve Selection Guide', href: '#selection' },
              { label: 'Chemical Compatibility', href: '#compatibility' as string | undefined, to: undefined as string | undefined },
              { label: 'Standards Reference', href: '#standards' as string | undefined, to: undefined as string | undefined },
              { label: 'Calculators', to: '/calculators' as string | undefined, href: undefined as string | undefined },
            ].map(link => (
              link.to
                ? <Link key={link.label} to={link.to} className="px-4 py-2 rounded-xl text-sm font-semibold text-blue-300 transition-colors hover:bg-white/5"
                    style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.2)' }}>
                    <Calculator className="w-3.5 h-3.5 inline mr-1.5" />{link.label} <ExternalLink className="w-3 h-3 inline ml-1"/>
                  </Link>
                : <a key={link.label} href={link.href} className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-white transition-colors"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    {link.label}
                  </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── DOWNLOADS ── */}
        <Section id="downloads">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="eng-label mb-2">Technical Documents</p>
              <h2 className="font-display text-3xl font-bold text-white">Downloads</h2>
            </div>
            <p className="text-sm text-muted hidden sm:block">Contact us to receive any document by email</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map(doc => (
              <div key={doc.name} className="glass p-5 group hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
                onClick={() => window.location.href = '/rfq?type=document&doc=' + encodeURIComponent(doc.name)}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{doc.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">{doc.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold text-blue-400 px-1.5 py-0.5 rounded"
                        style={{ background: 'rgba(0,109,255,0.1)' }}>{doc.type}</span>
                      <span className="text-[10px] text-muted">{doc.size}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted leading-relaxed">{doc.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="w-3.5 h-3.5" /> Request document
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted text-center mt-6">All documents provided on request — contact us with your email address or request via our RFQ form.</p>
        </Section>

        {/* ── VALVE SELECTION GUIDE ── */}
        <Section id="selection">
          <div className="mb-8">
            <p className="eng-label mb-2">Valve Selection Guide</p>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Which valve do I need?</h2>
            <p className="text-muted">Quick reference guide — match your application to the right ISA valve family.</p>
          </div>
          <div className="space-y-4">
            {valveGuide.map(v => (
              <div key={v.type} className="glass p-5 sm:p-6 group hover:border-blue-500/20 transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="grid sm:grid-cols-4 gap-4 items-start">
                  <div>
                    <h3 className="font-display text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-snug mb-1">{v.type}</h3>
                    <span className="text-[10px] font-bold text-blue-400 px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,109,255,0.1)' }}>{v.certs}</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-wide mb-1">Best for</p>
                    <p className="text-xs text-slate-300 leading-relaxed">{v.best}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-red-400 uppercase tracking-wide mb-1">Not for</p>
                    <p className="text-xs text-muted leading-relaxed">{v.notFor}</p>
                  </div>
                  <div className="flex sm:justify-end gap-2 flex-wrap">
                    <Link to={`/products/${v.slug}`}
                      className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                      View specs <ArrowRight className="w-3 h-3"/>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 p-5 rounded-xl text-center" style={{ background: 'rgba(0,109,255,0.06)', border: '1px solid rgba(0,109,255,0.15)' }}>
            <p className="text-sm text-slate-300 mb-3">Not sure which valve is right for your application?</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/configure" className="btn-blue text-sm px-6 py-2.5">
                <Zap className="w-3.5 h-3.5" /> Try AI Valve Selector
              </Link>
              <Link to="/rfq" className="btn-primary text-sm px-6 py-2.5">
                Ask an Engineer <ArrowRight className="w-3.5 h-3.5"/>
              </Link>
            </div>
          </div>
        </Section>

        {/* ── CHEMICAL COMPATIBILITY ── */}
        <Section id="compatibility">
          <div className="mb-8">
            <p className="eng-label mb-2">Material Selection</p>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Chemical Compatibility</h2>
            <p className="text-muted max-w-2xl">Elastomer compatibility for common process chemicals. ✓ = Compatible · ✗ = Not compatible. Always confirm with ISA engineering for critical service.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'rgba(0,109,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">Chemical</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">NBR</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">EPDM</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">Viton®</th>
                  <th className="text-center px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">PTFE</th>
                  <th className="text-left px-4 py-3 text-xs font-bold text-muted uppercase tracking-widest">Notes</th>
                </tr>
              </thead>
              <tbody>
                {compatibilityData.map((row, i) => (
                  <tr key={row.chemical} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium text-sm">{row.chemical}</td>
                    {[row.nbr, row.epdm, row.viton, row.ptfe].map((v, j) => (
                      <td key={j} className="px-4 py-3 text-center">
                        <span className={`text-base ${v === '✓' ? 'text-emerald-400' : 'text-red-400/70'}`}>{v}</span>
                      </td>
                    ))}
                    <td className="px-4 py-3 text-xs text-muted">{row.note || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted mt-4">This table is a general guide only. Suitability depends on concentration, temperature and pressure. Contact ISA engineering for critical applications.</p>
        </Section>

        {/* ── STANDARDS REFERENCE ── */}
        <Section id="standards">
          <div className="mb-8">
            <p className="eng-label mb-2">Standards Reference</p>
            <h2 className="font-display text-3xl font-bold text-white mb-3">Applicable Standards</h2>
            <p className="text-muted max-w-2xl">ISA Valve Solutions designs and tests to these international and South African standards.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {standards.map(s => (
              <div key={s.code} className="flex items-start gap-4 p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4 text-blue-400"/>
                </div>
                <div>
                  <div className="font-bold text-blue-300 text-sm">{s.code}</div>
                  <div className="text-white text-sm font-medium">{s.name}</div>
                  <div className="text-xs text-muted mt-0.5">{s.scope}</div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ── */}
        <div className="py-12 text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4">Need engineering support?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">Our engineering team can provide detailed valve sizing, material selection, and application-specific recommendations.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/rfq" className="btn-primary">Request Engineering Support <ArrowRight className="w-4 h-4"/></Link>
            <Link to="/configure" className="btn-secondary"><Zap className="w-4 h-4 text-accent-400"/> AI Valve Selector</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

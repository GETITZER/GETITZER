import { useState } from 'react'
import { Calculator, ArrowRight, Info } from 'lucide-react'
import { Link } from 'react-router-dom'

type CalcTab = 'cv' | 'flow' | 'pressure' | 'velocity' | 'convert'

function InputField({ label, value, onChange, unit, hint }: {
  label: string; value: string; onChange: (v: string) => void; unit?: string; hint?: string
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">{label}</label>
      <div className="flex">
        <input
          type="number"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="flex-1 bg-dark-700 border border-white/10 rounded-l-xl px-3.5 py-2.5 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition placeholder-muted"
          placeholder="0"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        />
        {unit && (
          <span className="px-3 py-2.5 text-sm font-semibold text-muted border border-l-0 border-white/10 rounded-r-xl whitespace-nowrap"
            style={{ background: 'rgba(0,109,255,0.06)' }}>
            {unit}
          </span>
        )}
      </div>
      {hint && <p className="text-[11px] text-muted mt-1">{hint}</p>}
    </div>
  )
}

function Result({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(0,109,255,0.08)', border: '1px solid rgba(0,109,255,0.2)' }}>
      <div className="text-2xl font-bold text-white font-display mb-1">{value} <span className="text-base text-blue-300">{unit}</span></div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  )
}

/* ── Cv Calculator ── */
function CvCalc() {
  const [flow, setFlow]       = useState('')
  const [sg, setSg]           = useState('1.0')
  const [dp, setDp]           = useState('')
  const [unit, setUnit]       = useState<'metric' | 'imperial'>('metric')

  const q  = parseFloat(flow)
  const s  = parseFloat(sg)
  const dp_ = parseFloat(dp)
  const valid = q > 0 && s > 0 && dp_ > 0

  // Metric: Kv = Q × √(SG / ΔP) → Q in m³/h, ΔP in bar
  // Imperial: Cv = Q × √(SG / ΔP) → Q in GPM, ΔP in PSI
  const Kv = valid ? (q * Math.sqrt(s / dp_)).toFixed(2) : '—'
  const Cv = valid ? (q * Math.sqrt(s / dp_) / 0.865).toFixed(2) : '—'

  return (
    <div className="space-y-4">
      <div className="flex gap-3 mb-2">
        {(['metric', 'imperial'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${unit === u ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-white/5 text-muted border border-white/10 hover:border-white/20'}`}>
            {u === 'metric' ? 'Metric (Kv)' : 'Imperial (Cv)'}
          </button>
        ))}
      </div>
      <InputField label="Flow Rate" value={flow} onChange={setFlow} unit={unit === 'metric' ? 'm³/h' : 'GPM'} hint="Volumetric flow rate at operating conditions"/>
      <InputField label="Specific Gravity" value={sg} onChange={setSg} unit="SG" hint="Relative to water at 15°C (water = 1.0)"/>
      <InputField label="Pressure Drop (ΔP)" value={dp} onChange={setDp} unit={unit === 'metric' ? 'bar' : 'PSI'} hint="Pressure difference across the valve"/>
      <div className="pt-2">
        {unit === 'metric'
          ? <Result label="Kv (metric flow coefficient)" value={Kv} unit="m³/h·bar^½"/>
          : <Result label="Cv (imperial flow coefficient)" value={Cv} unit="GPM·PSI^½"/>
        }
        {valid && <p className="text-[11px] text-muted text-center mt-2">Equivalent: Kv = {Kv} · Cv = {Cv} (Cv = Kv ÷ 0.865)</p>}
      </div>
    </div>
  )
}

/* ── Flow Rate Calculator ── */
function FlowCalc() {
  const [kv, setKv]    = useState('')
  const [sg, setSg]    = useState('1.0')
  const [dp, setDp]    = useState('')

  const k = parseFloat(kv)
  const s = parseFloat(sg)
  const d = parseFloat(dp)
  const valid = k > 0 && s > 0 && d > 0

  const Q = valid ? (k * Math.sqrt(d / s)).toFixed(3) : '—'

  return (
    <div className="space-y-4">
      <InputField label="Kv (Flow Coefficient)" value={kv} onChange={setKv} unit="Kv" hint="From valve data sheet (or enter Cv × 0.865 for imperial)"/>
      <InputField label="Specific Gravity" value={sg} onChange={setSg} unit="SG" hint="Relative to water (water = 1.0)"/>
      <InputField label="Available Pressure Drop" value={dp} onChange={setDp} unit="bar" hint="Pressure drop available across valve"/>
      <div className="pt-2">
        <Result label="Volumetric Flow Rate" value={Q} unit="m³/h"/>
        {valid && <p className="text-[11px] text-muted text-center mt-2">Formula: Q = Kv × √(ΔP ÷ SG)</p>}
      </div>
    </div>
  )
}

/* ── Pressure Drop Calculator ── */
function PressureCalc() {
  const [kv, setKv]   = useState('')
  const [sg, setSg]   = useState('1.0')
  const [flow, setFlow] = useState('')

  const k = parseFloat(kv)
  const s = parseFloat(sg)
  const q = parseFloat(flow)
  const valid = k > 0 && s > 0 && q > 0

  const dp = valid ? (s * Math.pow(q / k, 2)).toFixed(4) : '—'
  const dpKpa = valid ? (parseFloat(dp) * 100).toFixed(1) : '—'

  return (
    <div className="space-y-4">
      <InputField label="Kv (Flow Coefficient)" value={kv} onChange={setKv} unit="Kv" hint="From valve data sheet"/>
      <InputField label="Flow Rate" value={flow} onChange={setFlow} unit="m³/h" hint="Actual operating flow rate"/>
      <InputField label="Specific Gravity" value={sg} onChange={setSg} unit="SG" hint="Relative to water (water = 1.0)"/>
      <div className="pt-2 space-y-3">
        <Result label="Pressure Drop across valve" value={dp} unit="bar"/>
        <Result label="Pressure Drop (kPa)" value={dpKpa} unit="kPa"/>
        {valid && <p className="text-[11px] text-muted text-center">Formula: ΔP = SG × (Q ÷ Kv)²</p>}
      </div>
    </div>
  )
}

/* ── Pipe Velocity Calculator ── */
function VelocityCalc() {
  const [flow, setFlow] = useState('')
  const [dn, setDn]     = useState('')

  const q = parseFloat(flow)    // m³/h → m³/s = /3600
  const d = parseFloat(dn) / 1000  // mm → m

  const valid = q > 0 && d > 0
  const A = Math.PI * Math.pow(d / 2, 2)
  const v = valid ? ((q / 3600) / A).toFixed(3) : '—'
  const vNum = valid ? parseFloat(v) : 0

  const warning = vNum > 4 ? '⚠️ High velocity — may cause cavitation or erosion in most valve types' :
                  vNum > 2 ? '✓ Acceptable velocity for most applications' :
                  vNum > 0 ? '✓ Good velocity — suitable for all valve types' : ''

  return (
    <div className="space-y-4">
      <InputField label="Flow Rate" value={flow} onChange={setFlow} unit="m³/h" hint="Volumetric flow at operating conditions"/>
      <InputField label="Pipe Bore (DN)" value={dn} onChange={setDn} unit="mm" hint="Internal pipe diameter (e.g. DN50 = 50mm bore)"/>
      <div className="pt-2">
        <Result label="Flow Velocity" value={v} unit="m/s"/>
        {valid && warning && (
          <p className={`text-[11px] text-center mt-2 ${vNum > 4 ? 'text-amber-400' : 'text-emerald-400'}`}>{warning}</p>
        )}
        {valid && <p className="text-[11px] text-muted text-center mt-1">Pipe cross-section: {(A * 1e6).toFixed(1)} mm²</p>}
      </div>
    </div>
  )
}

/* ── Unit Converter ── */
function UnitConverter() {
  const [val, setVal]   = useState('')
  const [type, setType] = useState<'pressure' | 'flow' | 'temp'>('pressure')

  const v = parseFloat(val)

  const conversions: Record<typeof type, Array<{ label: string; convert: (x: number) => string }>> = {
    pressure: [
      { label: 'bar',  convert: x => x.toFixed(4) },
      { label: 'kPa',  convert: x => (x * 100).toFixed(2) },
      { label: 'MPa',  convert: x => (x / 10).toFixed(5) },
      { label: 'PSI',  convert: x => (x * 14.5038).toFixed(3) },
      { label: 'kgf/cm²', convert: x => (x * 1.01972).toFixed(4) },
    ],
    flow: [
      { label: 'm³/h',  convert: x => x.toFixed(4) },
      { label: 'L/min', convert: x => (x * 1000 / 60).toFixed(3) },
      { label: 'L/s',   convert: x => (x * 1000 / 3600).toFixed(4) },
      { label: 'GPM',   convert: x => (x * 4.40287).toFixed(3) },
      { label: 'm³/s',  convert: x => (x / 3600).toFixed(6) },
    ],
    temp: [
      { label: '°C',   convert: x => x.toFixed(2) },
      { label: '°F',   convert: x => (x * 9/5 + 32).toFixed(2) },
      { label: 'K',    convert: x => (x + 273.15).toFixed(2) },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        {(['pressure', 'flow', 'temp'] as const).map(t => (
          <button key={t} onClick={() => setType(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all capitalize ${type === t ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' : 'bg-white/5 text-muted border border-white/10'}`}>
            {t === 'temp' ? 'Temperature' : t}
          </button>
        ))}
      </div>
      <InputField
        label={type === 'pressure' ? 'Pressure in bar' : type === 'flow' ? 'Flow rate in m³/h' : 'Temperature in °C'}
        value={val} onChange={setVal}
        unit={type === 'pressure' ? 'bar' : type === 'flow' ? 'm³/h' : '°C'}
      />
      {!isNaN(v) && v !== 0 && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {conversions[type].map(c => (
            <div key={c.label} className="p-3 rounded-xl text-center"
              style={{ background: 'rgba(0,109,255,0.06)', border: '1px solid rgba(0,109,255,0.15)' }}>
              <div className="text-lg font-bold text-white">{c.convert(v)}</div>
              <div className="text-xs text-blue-300">{c.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const tabs: { id: CalcTab; label: string; desc: string }[] = [
  { id: 'cv',       label: 'Cv / Kv Calculator',    desc: 'Calculate flow coefficient from flow, SG and pressure drop' },
  { id: 'flow',     label: 'Flow Rate',              desc: 'Calculate flow rate from Kv and pressure drop' },
  { id: 'pressure', label: 'Pressure Drop',          desc: 'Calculate ΔP across valve from Kv and flow rate' },
  { id: 'velocity', label: 'Pipe Velocity',           desc: 'Calculate flow velocity in pipe from flow rate and bore' },
  { id: 'convert',  label: 'Unit Converter',          desc: 'Convert pressure, flow and temperature units' },
]

export default function Calculators() {
  const [activeTab, setActiveTab] = useState<CalcTab>('cv')
  const active = tabs.find(t => t.id === activeTab)!

  return (
    <div style={{ background: '#081D42' }} className="min-h-screen pt-20 pb-24">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-60"/>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 80% at 30% 50%, rgba(0,109,255,0.07) 0%, transparent 65%)' }}/>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-blue-300 mb-6"
            style={{ background: 'rgba(0,109,255,0.1)', border: '1px solid rgba(0,109,255,0.25)' }}>
            <Calculator className="w-3 h-3" /> Engineering Calculators
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Engineering Calculators</h1>
          <p className="text-muted text-lg max-w-2xl">
            Valve sizing, Cv/Kv, pressure drop, flow rate, pipe velocity, and unit conversion tools for industrial engineers.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Note */}
        <div className="flex items-start gap-3 p-4 rounded-xl mb-8 text-sm"
          style={{ background: 'rgba(0,109,255,0.06)', border: '1px solid rgba(0,109,255,0.15)' }}>
          <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5"/>
          <p className="text-slate-300">
            These calculators use standard ISA/IEC 60534 formulas for incompressible liquid service. For gas, steam, or two-phase flow, <Link to="/rfq" className="text-blue-400 hover:underline">contact our engineering team</Link> for a detailed sizing review.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tab list */}
          <div className="space-y-2">
            {tabs.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left p-4 rounded-xl transition-all ${activeTab === tab.id ? 'bg-blue-500/15 border border-blue-500/30' : 'bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'}`}>
                <div className={`text-sm font-bold mb-0.5 ${activeTab === tab.id ? 'text-blue-300' : 'text-white'}`}>{tab.label}</div>
                <div className="text-xs text-muted leading-snug">{tab.desc}</div>
              </button>
            ))}

            {/* CTA */}
            <div className="p-4 rounded-xl mt-4" style={{ background: 'rgba(255,106,0,0.07)', border: '1px solid rgba(255,106,0,0.2)' }}>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">Need a detailed valve sizing study for your application?</p>
              <Link to="/rfq" className="btn-primary w-full justify-center text-sm px-4 py-2.5 inline-flex">
                Get Engineering Support <ArrowRight className="w-3.5 h-3.5"/>
              </Link>
            </div>
          </div>

          {/* Calculator panel */}
          <div className="lg:col-span-2">
            <div className="glass p-7 rounded-2xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
              <h2 className="font-display text-xl font-bold text-white mb-1">{active.label}</h2>
              <p className="text-sm text-muted mb-6">{active.desc}</p>
              {activeTab === 'cv'       && <CvCalc/>}
              {activeTab === 'flow'     && <FlowCalc/>}
              {activeTab === 'pressure' && <PressureCalc/>}
              {activeTab === 'velocity' && <VelocityCalc/>}
              {activeTab === 'convert'  && <UnitConverter/>}
            </div>

            {/* Formula reference */}
            <div className="mt-4 p-4 rounded-xl text-xs text-muted" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <p className="font-bold text-slate-400 mb-2">Reference Formulas (Liquid Service, IEC 60534)</p>
              <div className="font-mono space-y-1 text-[11px] text-slate-500">
                <p>Kv = Q × √(SG / ΔP)  →  Q in m³/h, ΔP in bar</p>
                <p>Cv = Kv / 0.865  →  Q in GPM, ΔP in PSI</p>
                <p>Q = Kv × √(ΔP / SG)</p>
                <p>ΔP = SG × (Q / Kv)²</p>
                <p>v = Q / (π × r²)  →  pipe velocity in m/s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

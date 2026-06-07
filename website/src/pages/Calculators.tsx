import { useState } from 'react'
import { Calculator, ArrowRight } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'

function CvCalculator() {
  const [flow, setFlow] = useState('')
  const [dp, setDp] = useState('')
  const [sg, setSg] = useState('1.0')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const Q = parseFloat(flow)
    const deltaP = parseFloat(dp)
    const G = parseFloat(sg)
    if (!Q || !deltaP || !G || deltaP <= 0) return
    setResult(Q * Math.sqrt(G / deltaP))
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-isa-500" /> Cv / Flow Coefficient
      </h3>
      <p className="text-slate-500 text-sm mb-5">Liquid service — Cv = Q × √(SG / ΔP)</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Flow rate Q (m³/h)</span>
          <input type="number" min="0" value={flow} onChange={e => setFlow(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Pressure drop ΔP (bar)</span>
          <input type="number" min="0.01" step="0.01" value={dp} onChange={e => setDp(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Specific gravity SG</span>
          <input type="number" min="0.1" step="0.01" value={sg} onChange={e => setSg(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
      </div>
      <button onClick={calculate} className="btn-primary !text-sm !px-5 !py-2">
        Calculate Cv <ArrowRight className="w-3.5 h-3.5" />
      </button>
      {result !== null && (
        <div className="mt-4 p-4 rounded-lg bg-isa-50 border border-isa-100">
          <span className="text-xs font-bold text-isa-700 uppercase tracking-widest block mb-1">Result</span>
          <span className="text-3xl font-extrabold text-isa-600">{result.toFixed(2)}</span>
          <span className="text-sm text-isa-700 ml-2">Cv</span>
        </div>
      )}
    </div>
  )
}

function PressureDropCalculator() {
  const [cv, setCv] = useState('')
  const [flow, setFlow] = useState('')
  const [sg, setSg] = useState('1.0')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const C = parseFloat(cv)
    const Q = parseFloat(flow)
    const G = parseFloat(sg)
    if (!C || !Q || !G || C <= 0) return
    setResult(G * Math.pow(Q / C, 2))
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-bold text-slate-900 text-lg mb-1 flex items-center gap-2">
        <Calculator className="w-5 h-5 text-isa-500" /> Pressure Drop
      </h3>
      <p className="text-slate-500 text-sm mb-5">ΔP = SG × (Q / Cv)²</p>
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Cv (known)</span>
          <input type="number" min="0.01" step="0.01" value={cv} onChange={e => setCv(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Flow rate Q (m³/h)</span>
          <input type="number" min="0" value={flow} onChange={e => setFlow(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold text-slate-600 block mb-1">Specific gravity SG</span>
          <input type="number" min="0.1" step="0.01" value={sg} onChange={e => setSg(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-isa-400" />
        </label>
      </div>
      <button onClick={calculate} className="btn-primary !text-sm !px-5 !py-2">
        Calculate ΔP <ArrowRight className="w-3.5 h-3.5" />
      </button>
      {result !== null && (
        <div className="mt-4 p-4 rounded-lg bg-isa-50 border border-isa-100">
          <span className="text-xs font-bold text-isa-700 uppercase tracking-widest block mb-1">Result</span>
          <span className="text-3xl font-extrabold text-isa-600">{result.toFixed(3)}</span>
          <span className="text-sm text-isa-700 ml-2">bar</span>
        </div>
      )}
    </div>
  )
}

export default function Calculators() {
  usePageMeta(
    'Engineering Calculators',
    'Free valve engineering calculators — Cv, flow coefficient and pressure drop for liquid service.',
  )

  return (
    <div className="pt-16 min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <span className="section-label">Technical Tools</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Engineering Calculators
          </h1>
          <p className="text-slate-500 text-lg mt-3 max-w-xl mx-auto">
            Cv, pressure drop and flow rate calculators for liquid service valve sizing.
          </p>
        </div>
        <div className="space-y-6">
          <CvCalculator />
          <PressureDropCalculator />
        </div>
        <p className="text-xs text-slate-400 text-center mt-8">
          Calculations are indicative. Always verify with an ISA engineer for final valve selection.
        </p>
      </div>
    </div>
  )
}

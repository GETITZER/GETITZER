import { Link } from 'react-router-dom'
import { ArrowRight, Search, X, ChevronRight, ShoppingCart, Phone } from 'lucide-react'
import { useState } from 'react'
import { products } from '../data/products'
import { usePageMeta } from '../hooks/usePageMeta'

const PRODUCT_PHOTOS: Record<string, string> = {
  // Main categories
  'ball-valve':                    '/images/products/ball-valve-nobg.jpg',
  'butterfly-valve':               '/images/products/butterfly-valve-wras.jpg',
  'gate-valve':                    '/images/products/gate-valve-clean.jpg',
  'pinch-valve':                   '/images/products/pinch-valve-orange.jpg',
  'dxst-kgv':                      '/images/products/dxst-kgv.png',
  'knife-gate-valve':              '/images/products/knife-gate-valve-isa.jpg',
  'check-valve':                   '/images/products/check-valve-product.jpg',
  'globe-valve':                   '/images/products/globe-valve-product.jpg',
  'y-strainer':                    '/images/products/y-strainer-product.jpg',
  'control-valve':                          '/images/products/control-valve-product.jpg',
  'control-valve-pressure-reducing':        '/images/products/control-valve-prv.jpg',
  'control-valve-pressure-sustaining':      '/images/products/control-valve-psv.png',
  'control-valve-flow-control':             '/images/products/control-valve-flow.jpg',
  'control-valve-level':                    '/images/products/control-valve-level.png',
  'control-valve-solenoid':                 '/images/products/control-valve-solenoid.jpg',
  'control-valve-electric':                 '/images/products/control-valve-electric.png',
  'control-valve-modulating':               '/images/products/control-valve-modulating.png',
  'control-valve-surge':                    '/images/products/control-valve-surge.jpg',
  'diaphragm-valve':               '/images/products/diaphragm-valve-product.jpg',
  'safety-relief-valve':           '/images/products/safety-relief-valve-product.jpg',
  'pressure-reducing-valve':       '/images/products/pressure-reducing-valve-product.jpg',
  'steam-trap':                    '/images/products/steam-trap-product.jpg',
  'sight-glass':                   '/images/products/sight-glass-product.jpg',
  'block-bleed-valve':             '/images/products/block-bleed-valve-product.jpg',
  'steam-valve':                   '/images/products/steam-valve-product.jpg',
  'solenoid-valve':                '/images/products/solenoid-valve-product.jpg',
  'actuated-valve':                '/images/products/actuated-valve-product.jpg',
  'pneumatic-valve':               '/images/products/pneumatic-valve-product.jpg',
  'instrumentation':               '/images/products/instrumentation-product.jpg',
  'fittings':                      '/images/products/fittings-product.jpg',
  // Check valve subcategories
  'check-valve-swing':             '/images/products/check-valve-swing.webp',
  'check-valve-dual-plate':        '/images/products/check-valve-dual-plate.webp',
  'check-valve-lift':              '/images/products/check-valve-lift.webp',
  'check-valve-y-pattern':         '/images/products/check-valve-y-pattern.webp',
  'check-valve-foot':              '/images/products/check-valve-foot.webp',
  'check-valve-spring':            '/images/products/check-valve-spring.webp',
  'check-valve-class800':          '/images/products/check-valve-class800.webp',
  'check-valve-flanged':           '/images/products/check-valve-flanged.webp',
  'check-valve-screwed':           '/images/products/check-valve-screwed.webp',
  'check-valve-stainless':         '/images/products/check-valve-stainless.webp',
  'check-valve-brass':             '/images/products/check-valve-brass.webp',
  'check-valve-pvc':               '/images/products/check-valve-pvc.webp',
  // Ball valve subcategories
  'ball-valve-2piece':             '/images/products/ball-valve-2piece.jpg',
  'ball-valve-3piece':             '/images/products/ball-valve-3piece.jpg',
  'ball-valve-3way':               '/images/products/ball-valve-3way.jpg',
  'ball-valve-brass':              '/images/products/ball-valve-brass.jpg',
  'ball-valve-carbon-steel':       '/images/products/ball-valve-carbon-steel.jpg',
  'ball-valve-flanged':            '/images/products/ball-valve-flanged.jpg',
  'ball-valve-gas':                '/images/products/ball-valve-gas.jpg',
  'ball-valve-high-pressure':      '/images/products/ball-valve-high-pressure.jpg',
  'ball-valve-limit-switch':       '/images/products/ball-valve-limit-switch.jpg',
  'ball-valve-mini':               '/images/products/ball-valve-mini.jpg',
  'ball-valve-plastic':            '/images/products/ball-valve-plastic.jpg',
  'ball-valve-sanitary':           '/images/products/ball-valve-sanitary.jpg',
  'ball-valve-stainless':          '/images/products/ball-valve-stainless.jpg',
  'ball-valve-wafer':              '/images/products/ball-valve-wafer.jpg',
  'ball-valve-wras':               '/images/products/ball-valve-wras.jpg',
  // Butterfly valve subcategories
  'butterfly-valve-double-offset': '/images/products/butterfly-valve-double-offset.jpg',
  'butterfly-valve-high-performance': '/images/products/butterfly-valve-hp.jpg',
  'butterfly-valve-hygienic':      '/images/products/butterfly-valve-hygienic.jpg',
  'butterfly-valve-lugged':        '/images/products/butterfly-valve-lugged.jpg',
  'butterfly-valve-marine':        '/images/products/butterfly-valve-marine.png',
  'butterfly-valve-plastic':       '/images/products/butterfly-valve-plastic.jpg',
  'butterfly-valve-process':       '/images/products/butterfly-valve-process.jpg',
  'butterfly-valve-ptfe':          '/images/products/butterfly-valve-ptfe.png',
  'butterfly-valve-resilient':     '/images/products/butterfly-valve-resilient.jpg',
  'butterfly-valve-stainless':     '/images/products/butterfly-valve-stainless.png',
  'butterfly-valve-wafer':         '/images/products/butterfly-valve-wafer.jpg',
  'butterfly-valve-wras':          '/images/products/butterfly-valve-wras.jpg',
  // Knife gate valve subcategories
  'knife-gate-valve-pneumatic':    '/images/products/knife-gate-valve-pneumatic-da.webp',
  'knife-gate-valve-electric':     '/images/products/knife-gate-valve-electric.webp',
  'knife-gate-valve-stainless':    '/images/products/knife-gate-valve-stainless-actuated.webp',
  'knife-gate-valve-wafer':        '/images/products/knife-gate-valve-wafer-actuated.webp',
  'knife-gate-valve-slurry':       '/images/products/knife-gate-valve-actuated.webp',
  'knife-gate-valve-single-acting':'/images/products/knife-gate-valve-pneumatic-sa.webp',
  // Angle seat valve subcategories
  'actuated-valve-angle-seat':               '/images/products/angle-seat-valve-brass.webp',
  'actuated-valve-angle-seat-brass':         '/images/products/angle-seat-valve-brass.webp',
  'actuated-valve-angle-seat-stainless':     '/images/products/angle-seat-valve-stainless.webp',
  'actuated-valve-angle-seat-high-performance': '/images/products/angle-seat-valve-high-performance.webp',
  'actuated-valve-angle-seat-sanitary':      '/images/products/angle-seat-valve-sanitary.webp',
  // Actuated ball valve subcategories
  'actuated-valve-ball-pneumatic':           '/images/products/actuated-ball-valve-pneumatic.webp',
  'actuated-valve-ball-electric':            '/images/products/actuated-ball-valve-electric.webp',
  'actuated-valve-ball-flanged':             '/images/products/actuated-ball-valve-flanged.webp',
  'actuated-valve-ball-3way':                '/images/products/actuated-ball-valve-3way.webp',
  'actuated-valve-ball-sanitary':            '/images/products/actuated-ball-valve-sanitary.webp',
  // Actuated butterfly valve subcategories
  'actuated-valve-butterfly-pneumatic':      '/images/products/actuated-butterfly-valve-pneumatic.webp',
  'actuated-valve-butterfly-electric':       '/images/products/actuated-butterfly-valve-electric.jpg',
  'actuated-valve-butterfly-plastic':        '/images/products/actuated-butterfly-valve-plastic.webp',
  // Sight glass subcategories
  'sight-glass-flanged':                     '/images/products/sight-glass-flanged.webp',
  'sight-glass-screwed':                     '/images/products/sight-glass-screwed.webp',
  'sight-glass-full-view':                   '/images/products/sight-glass-full-view.webp',
  'sight-glass-brass':                       '/images/products/sight-glass-brass.png',
  'sight-glass-double-window':               '/images/products/sight-glass-double-window.webp',
  // Instrumentation / gauge subcategories
  'instrumentation-pressure-gauge':          '/images/products/gauge-pressure-ss.webp',
  'instrumentation-digital-pressure-gauge':  '/images/products/gauge-pressure-digital.webp',
  'instrumentation-glycerine-gauge':         '/images/products/gauge-glycerine.webp',
  'instrumentation-high-pressure-gauge':     '/images/products/gauge-high-pressure.webp',
  'instrumentation-diaphragm-gauge':         '/images/products/gauge-diaphragm-hygienic.webp',
  'instrumentation-thermometer-bimetallic':  '/images/products/thermometer-bimetallic.webp',
  'instrumentation-thermometer-digital':     '/images/products/thermometer-digital.webp',
  'instrumentation-gauge-accessories':       '/images/products/gauge-cock.webp',
  // Flow measurement
  'instrumentation-flow-indicator':          '/images/products/flow-indicator-rotary.webp',
  'instrumentation-water-meter':             '/images/products/water-meter.webp',
  'instrumentation-flow-transmitter':        '/images/products/flow-transmitter.webp',
  'instrumentation-needle-valve':            '/images/products/needle-valve-ss.webp',
  // Level measurement
  'instrumentation-level-switch-float':      '/images/products/level-switch-float.webp',
  'instrumentation-level-switch-vibrating':  '/images/products/level-switch-vibrating.webp',
  'instrumentation-level-sensor-ultrasonic': '/images/products/level-sensor-ultrasonic.webp',
  'instrumentation-level-controller':        '/images/products/level-controller.webp',
}

const CATEGORIES = [
  { label: 'All Products',                    slug: 'all',                          indent: 0 },
  // Ball Valves
  { label: 'Ball Valves',                     slug: 'ball-valve',                   indent: 0 },
  { label: '  2 Piece',                       slug: 'ball-valve-2piece',            indent: 1 },
  { label: '  3 Piece',                       slug: 'ball-valve-3piece',            indent: 1 },
  { label: '  3 Way',                         slug: 'ball-valve-3way',              indent: 1 },
  { label: '  Brass',                         slug: 'ball-valve-brass',             indent: 1 },
  { label: '  Carbon Steel',                  slug: 'ball-valve-carbon-steel',      indent: 1 },
  { label: '  Flanged',                       slug: 'ball-valve-flanged',           indent: 1 },
  { label: '  GAS Approved',                  slug: 'ball-valve-gas',               indent: 1 },
  { label: '  High Pressure',                 slug: 'ball-valve-high-pressure',     indent: 1 },
  { label: '  With Limit Switch',             slug: 'ball-valve-limit-switch',      indent: 1 },
  { label: '  Mini',                          slug: 'ball-valve-mini',              indent: 1 },
  { label: '  Plastic / PVC',                 slug: 'ball-valve-plastic',           indent: 1 },
  { label: '  Sanitary',                      slug: 'ball-valve-sanitary',          indent: 1 },
  { label: '  Stainless Steel',               slug: 'ball-valve-stainless',         indent: 1 },
  { label: '  Wafer Pattern',                 slug: 'ball-valve-wafer',             indent: 1 },
  { label: '  WRAS Approved',                 slug: 'ball-valve-wras',              indent: 1 },
  // Butterfly Valves
  { label: 'Butterfly Valves',                slug: 'butterfly-valve',              indent: 0 },
  { label: '  Double Offset',                 slug: 'butterfly-valve-double-offset',indent: 1 },
  { label: '  High Performance',              slug: 'butterfly-valve-high-performance', indent: 1 },
  { label: '  Hygienic',                      slug: 'butterfly-valve-hygienic',     indent: 1 },
  { label: '  Lugged',                        slug: 'butterfly-valve-lugged',       indent: 1 },
  { label: '  Marine',                        slug: 'butterfly-valve-marine',       indent: 1 },
  { label: '  Plastic / PVDF',                slug: 'butterfly-valve-plastic',      indent: 1 },
  { label: '  Process',                       slug: 'butterfly-valve-process',      indent: 1 },
  { label: '  PTFE Lined',                    slug: 'butterfly-valve-ptfe',         indent: 1 },
  { label: '  Resilient Seat',                slug: 'butterfly-valve-resilient',    indent: 1 },
  { label: '  Stainless Steel',               slug: 'butterfly-valve-stainless',    indent: 1 },
  { label: '  Wafer',                         slug: 'butterfly-valve-wafer',        indent: 1 },
  { label: '  WRAS Approved',                 slug: 'butterfly-valve-wras',         indent: 1 },
  // Check Valves
  { label: 'Check Valves',                    slug: 'check-valve',                  indent: 0 },
  { label: '  Swing Check',                   slug: 'check-valve-swing',            indent: 1 },
  { label: '  Dual Plate / Wafer',            slug: 'check-valve-dual-plate',       indent: 1 },
  { label: '  Lift Check',                    slug: 'check-valve-lift',             indent: 1 },
  { label: '  Y-Pattern',                     slug: 'check-valve-y-pattern',        indent: 1 },
  { label: '  Foot Valves',                   slug: 'check-valve-foot',             indent: 1 },
  { label: '  Spring Check',                  slug: 'check-valve-spring',           indent: 1 },
  { label: '  Flanged',                       slug: 'check-valve-flanged',          indent: 1 },
  { label: '  Screwed',                       slug: 'check-valve-screwed',          indent: 1 },
  { label: '  Stainless Steel',               slug: 'check-valve-stainless',        indent: 1 },
  { label: '  Brass',                         slug: 'check-valve-brass',            indent: 1 },
  { label: '  PVC / Plastic',                 slug: 'check-valve-pvc',              indent: 1 },
  { label: '  Class 800 Forged',              slug: 'check-valve-class800',         indent: 1 },
  // Other valve types
  { label: 'Gate Valves',                     slug: 'gate-valve',                   indent: 0 },
  { label: 'Globe Valves',                    slug: 'globe-valve',                  indent: 0 },
  { label: 'Knife Gate Valves',               slug: 'knife-gate-valve',             indent: 0 },
  { label: '  Pneumatic Actuated',            slug: 'knife-gate-valve-pneumatic',   indent: 1 },
  { label: '  Electric Actuated',             slug: 'knife-gate-valve-electric',    indent: 1 },
  { label: '  Stainless Steel',               slug: 'knife-gate-valve-stainless',   indent: 1 },
  { label: '  Wafer Pattern',                 slug: 'knife-gate-valve-wafer',       indent: 1 },
  { label: '  Slurry Grade',                  slug: 'knife-gate-valve-slurry',      indent: 1 },
  { label: '  Single-Acting (Spring-Return)', slug: 'knife-gate-valve-single-acting', indent: 1 },
  { label: 'Pinch Valves',                    slug: 'pinch-valve',                  indent: 0 },
  { label: 'DXST Slurry KGV',                slug: 'dxst-kgv',                     indent: 0 },
  { label: 'Diaphragm Valves',                slug: 'diaphragm-valve',              indent: 0 },
  { label: 'Control Valves',                  slug: 'control-valve',                indent: 0 },
  { label: '  Pressure Reducing',            slug: 'control-valve-pressure-reducing', indent: 1 },
  { label: '  Pressure Sustaining',          slug: 'control-valve-pressure-sustaining', indent: 1 },
  { label: '  Flow Control',                 slug: 'control-valve-flow-control',     indent: 1 },
  { label: '  Level / Altitude',             slug: 'control-valve-level',            indent: 1 },
  { label: '  Solenoid Pilot',               slug: 'control-valve-solenoid',         indent: 1 },
  { label: '  Electric Actuated',            slug: 'control-valve-electric',         indent: 1 },
  { label: '  Multi-Function',               slug: 'control-valve-modulating',       indent: 1 },
  { label: '  Surge Anticipating',           slug: 'control-valve-surge',            indent: 1 },
  { label: 'Pressure Reducing Valves',        slug: 'pressure-reducing-valve',      indent: 0 },
  { label: 'Safety & Relief Valves',          slug: 'safety-relief-valve',          indent: 0 },
  { label: 'Steam Valves',                    slug: 'steam-valve',                  indent: 0 },
  { label: 'Steam Traps',                     slug: 'steam-trap',                   indent: 0 },
  { label: 'Y-Strainers',                     slug: 'y-strainer',                   indent: 0 },
  { label: 'Sight Glass',                     slug: 'sight-glass',                  indent: 0 },
  { label: '  Flanged SS',                    slug: 'sight-glass-flanged',          indent: 1 },
  { label: '  Screwed Inline',               slug: 'sight-glass-screwed',          indent: 1 },
  { label: '  Full-View',                    slug: 'sight-glass-full-view',        indent: 1 },
  { label: '  Brass / Steam',               slug: 'sight-glass-brass',            indent: 1 },
  { label: 'Block & Bleed Valves',            slug: 'block-bleed-valve',            indent: 0 },
  { label: 'Solenoid Valves',                 slug: 'solenoid-valve',               indent: 0 },
  { label: 'Actuated Valves',                 slug: 'actuated-valve',               indent: 0 },
  { label: '  Angle Seat Valves',             slug: 'actuated-valve-angle-seat',    indent: 1 },
  { label: '  › Brass',                       slug: 'actuated-valve-angle-seat-brass', indent: 1 },
  { label: '  › Stainless Steel',             slug: 'actuated-valve-angle-seat-stainless', indent: 1 },
  { label: '  › High Performance',            slug: 'actuated-valve-angle-seat-high-performance', indent: 1 },
  { label: '  › Hygienic / Sanitary',         slug: 'actuated-valve-angle-seat-sanitary', indent: 1 },
  { label: '  Ball Valve — Pneumatic',        slug: 'actuated-valve-ball-pneumatic',  indent: 1 },
  { label: '  Ball Valve — Electric',         slug: 'actuated-valve-ball-electric',   indent: 1 },
  { label: '  Ball Valve — Flanged',          slug: 'actuated-valve-ball-flanged',    indent: 1 },
  { label: '  Ball Valve — 3-Way',            slug: 'actuated-valve-ball-3way',       indent: 1 },
  { label: '  Ball Valve — Hygienic',         slug: 'actuated-valve-ball-sanitary',   indent: 1 },
  { label: '  Butterfly — Pneumatic',         slug: 'actuated-valve-butterfly-pneumatic', indent: 1 },
  { label: '  Butterfly — Electric',          slug: 'actuated-valve-butterfly-electric', indent: 1 },
  { label: '  Butterfly — PVDF/Plastic',      slug: 'actuated-valve-butterfly-plastic', indent: 1 },
  { label: 'Pneumatic Valves',                slug: 'pneumatic-valve',              indent: 0 },
  { label: 'Instrumentation',                 slug: 'instrumentation',              indent: 0 },
  { label: '  SS Pressure Gauges',            slug: 'instrumentation-pressure-gauge',         indent: 1 },
  { label: '  Digital Pressure Gauges',       slug: 'instrumentation-digital-pressure-gauge', indent: 1 },
  { label: '  Glycerine-Filled Gauges',       slug: 'instrumentation-glycerine-gauge',        indent: 1 },
  { label: '  High Pressure Gauges',          slug: 'instrumentation-high-pressure-gauge',    indent: 1 },
  { label: '  Diaphragm Gauges',              slug: 'instrumentation-diaphragm-gauge',        indent: 1 },
  { label: '  Bimetallic Thermometers',       slug: 'instrumentation-thermometer-bimetallic', indent: 1 },
  { label: '  Digital Thermometers',          slug: 'instrumentation-thermometer-digital',    indent: 1 },
  { label: '  Gauge Cocks & Siphons',         slug: 'instrumentation-gauge-accessories',      indent: 1 },
  { label: '  Flow Indicators',              slug: 'instrumentation-flow-indicator',         indent: 1 },
  { label: '  Water Meters',                 slug: 'instrumentation-water-meter',            indent: 1 },
  { label: '  Flow Transmitters',            slug: 'instrumentation-flow-transmitter',       indent: 1 },
  { label: '  Needle Valves',               slug: 'instrumentation-needle-valve',           indent: 1 },
  { label: '  Float Level Switches',         slug: 'instrumentation-level-switch-float',     indent: 1 },
  { label: '  Vibrating Fork Switches',      slug: 'instrumentation-level-switch-vibrating', indent: 1 },
  { label: '  Ultrasonic Level Sensors',     slug: 'instrumentation-level-sensor-ultrasonic',indent: 1 },
  { label: '  Level Controllers',            slug: 'instrumentation-level-controller',       indent: 1 },
  { label: 'Pipe Fittings',                   slug: 'fittings',                     indent: 0 },
]

const MATERIALS = ['Cast Iron', 'Ductile Iron', 'Carbon Steel', 'Stainless Steel', 'Brass', 'Bronze', 'PVDF / Plastic']
const CONNECTIONS = ['Flanged', 'Screwed / Threaded', 'Wafer', 'Butt-Weld', 'Socket']
const PRESSURE = ['PN10', 'PN16', 'PN25', 'PN40', 'ANSI 150', 'ANSI 300', 'ANSI 600']

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val]
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: () => void; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer group py-1" onClick={onChange}>
      <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${
        checked ? 'bg-isa-600 border-isa-600' : 'bg-white border-slate-300 group-hover:border-isa-400'
      }`}>
        {checked && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8"><path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
      </span>
      <span className={`text-sm ${checked ? 'text-slate-900 font-medium' : 'text-slate-600 group-hover:text-slate-900'}`}>{label}</span>
    </label>
  )
}

function SidebarSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border-b border-slate-100 pb-4 mb-4">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3 group">
        <span className="text-sm font-bold text-slate-900 uppercase tracking-wide">{title}</span>
        <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && <div>{children}</div>}
    </div>
  )
}

export default function Products() {
  usePageMeta({
    title: 'Industrial Valves — Full Product Range | ISA Valve Solutions South Africa',
    description: 'Browse ISA Valve Solutions full range: ball valves, butterfly valves, gate valves, check valves, globe valves, knife gate valves, pinch valves, strainers, control valves. Filter by type, material, size and pressure class.',
    canonical: 'https://www.isavalvesolutions.com/products',
  })

  const [text, setText] = useState('')
  const [category, setCategory] = useState('all')
  const [materials, setMaterials] = useState<string[]>([])
  const [connections, setConnections] = useState<string[]>([])
  const [pressure, setPressure] = useState<string[]>([])
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  const activeFilterCount = materials.length + connections.length + pressure.length

  const filtered = products.filter(p => {
    const q = text.toLowerCase()
    const textMatch = !q || p.name.toLowerCase().includes(q) || p.shortName?.toLowerCase().includes(q) || p.industries.some(i => i.toLowerCase().includes(q))
    const catMatch = category === 'all' || p.slug === category || p.slug.startsWith(category + '-')
    const specText = p.specs.map(s => s.value.toLowerCase()).join(' ')
    const matMatch = !materials.length || materials.some(m => specText.includes(m.split(' / ')[0].toLowerCase()) || specText.includes(m.toLowerCase()))
    const connMatch = !connections.length || connections.some(c => specText.includes(c.toLowerCase().split(' / ')[0]))
    const pressMatch = !pressure.length || pressure.some(pr => specText.includes(pr.toLowerCase()))
    return textMatch && catMatch && matMatch && connMatch && pressMatch
  })

  const clearAll = () => {
    setText(''); setCategory('all'); setMaterials([]); setConnections([]); setPressure([])
  }

  const Sidebar = (
    <aside className="space-y-0">
      {/* Category nav */}
      <div className="mb-5">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Browse By Type</p>
        <ul className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <li key={cat.slug}>
              <button
                onClick={() => setCategory(cat.slug)}
                className={`w-full text-left rounded-lg text-sm transition-colors flex items-center justify-between group ${
                  cat.indent ? 'pl-6 pr-3 py-1.5' : 'px-3 py-2'
                } ${
                  category === cat.slug
                    ? cat.indent ? 'text-isa-600 font-semibold bg-isa-50' : 'bg-isa-600 text-white font-semibold'
                    : cat.indent ? 'text-slate-500 hover:text-slate-800 hover:bg-slate-50' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                {cat.label}
                {category === cat.slug && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-slate-100 pt-5">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Refine Results</p>

        <SidebarSection title="Body Material">
          {MATERIALS.map(m => (
            <Checkbox key={m} checked={materials.includes(m)} onChange={() => setMaterials(toggle(materials, m))} label={m} />
          ))}
        </SidebarSection>

        <SidebarSection title="End Connection">
          {CONNECTIONS.map(c => (
            <Checkbox key={c} checked={connections.includes(c)} onChange={() => setConnections(toggle(connections, c))} label={c} />
          ))}
        </SidebarSection>

        <SidebarSection title="Pressure Class">
          {PRESSURE.map(p => (
            <Checkbox key={p} checked={pressure.includes(p)} onChange={() => setPressure(toggle(pressure, p))} label={p} />
          ))}
        </SidebarSection>

        {activeFilterCount > 0 && (
          <button onClick={() => { setMaterials([]); setConnections([]); setPressure([]) }} className="text-xs text-isa-600 hover:text-isa-700 font-semibold flex items-center gap-1">
            <X className="w-3 h-3" /> Clear filters ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Contact box */}
      <div className="mt-6 bg-slate-900 rounded-xl p-4">
        <p className="text-xs font-bold text-isa-400 uppercase tracking-wider mb-1">Need Help?</p>
        <p className="text-sm text-white font-semibold mb-2">Talk to an engineer</p>
        <a href="tel:+270606885648" className="flex items-center gap-2 text-xs text-slate-300 hover:text-white transition-colors mb-1">
          <Phone className="w-3 h-3 text-isa-500" /> +27 060 688 5648
        </a>
        <Link to="/configure" className="mt-3 flex items-center gap-1.5 text-xs font-bold text-isa-400 hover:text-isa-300 transition-colors">
          AI Valve Selector <ChevronRight className="w-3 h-3" />
        </Link>
      </div>
    </aside>
  )

  return (
    <div className="bg-white min-h-screen">

      {/* Shop header — clean, white, not dark hero */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
            <Link to="/" className="hover:text-slate-600">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-900 font-medium">Products</span>
            {category !== 'all' && (
              <>
                <ChevronRight className="w-3 h-3" />
                <span className="text-isa-600 font-medium">{CATEGORIES.find(c => c.slug === category)?.label}</span>
              </>
            )}
          </nav>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
                {category === 'all' ? 'All Valves & Flow Control Products' : CATEGORIES.find(c => c.slug === category)?.label}
              </h1>
              <p className="text-sm text-slate-500 mt-1">ISO 9001:2015 Certified · Tested at 1.5× Rated Pressure · Africa-Wide Delivery</p>
            </div>
            {/* Trust badges */}
            <div className="flex items-center gap-4 text-xs flex-shrink-0">
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">12</div>
                <div className="text-slate-400 leading-tight">Product<br/>Families</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">DN15</div>
                <div className="text-slate-400 leading-tight">to<br/>DN4000</div>
              </div>
              <div className="w-px h-10 bg-slate-200" />
              <div className="text-center">
                <div className="font-black text-isa-600 text-lg leading-none">ISO</div>
                <div className="text-slate-400 leading-tight">9001<br/>:2015</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">

          {/* Sidebar — desktop */}
          <div className="hidden lg:block w-60 flex-shrink-0 sticky top-20 self-start">
            {Sidebar}
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">

            {/* Search + toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={text}
                  onChange={e => setText(e.target.value)}
                  placeholder="Search products, specs, or applications…"
                  className="w-full pl-9 pr-9 py-2.5 text-sm border border-slate-200 rounded-xl bg-white outline-none focus:ring-2 focus:ring-isa-500 focus:border-transparent transition"
                />
                {text && (
                  <button onClick={() => setText('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 bg-white"
              >
                Filters {activeFilterCount > 0 && <span className="w-5 h-5 rounded-full bg-isa-600 text-white text-xs flex items-center justify-center">{activeFilterCount}</span>}
              </button>

              <div className="ml-auto text-sm text-slate-500">
                <span className="font-semibold text-slate-900">{filtered.length}</span> product{filtered.length !== 1 ? 's' : ''}
                {(text || category !== 'all' || activeFilterCount > 0) && ' found'}
              </div>
            </div>

            {/* Active filter pills */}
            {(category !== 'all' || activeFilterCount > 0) && (
              <div className="flex flex-wrap gap-2 mb-5">
                {category !== 'all' && (
                  <span className="flex items-center gap-1.5 text-xs font-medium bg-isa-50 text-isa-700 border border-isa-200 px-2.5 py-1 rounded-full">
                    {CATEGORIES.find(c => c.slug === category)?.label}
                    <button onClick={() => setCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {[...materials, ...connections, ...pressure].map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 text-xs font-medium bg-isa-50 text-isa-700 border border-isa-200 px-2.5 py-1 rounded-full">
                    {tag}
                    <button onClick={() => { setMaterials(m => m.filter(x => x !== tag)); setConnections(c => c.filter(x => x !== tag)); setPressure(p => p.filter(x => x !== tag)) }}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
                <button onClick={clearAll} className="text-xs text-slate-400 hover:text-slate-600 underline">Clear all</button>
              </div>
            )}

            {/* Product grid */}
            {filtered.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map(product => {
                  const photo = PRODUCT_PHOTOS[product.slug]
                  const sizeSpec = product.specs.find(s => s.label === 'Size Range' || s.label === 'Types')
                  const materialSpec = product.specs.find(s => s.label === 'Body Materials')
                  const connSpec = product.specs.find(s => s.label === 'End Connection')
                  const pressSpec = product.specs.find(s => s.label === 'Pressure Class' || s.label === 'Pressure Rating' || s.label === 'Pressure Setting')
                  const topCert = product.compliance?.[0]

                  return (
                    <div key={product.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-isa-300 hover:shadow-lg transition-all duration-200 flex flex-col group">

                      {/* Image area */}
                      <Link to={`/products/${product.slug}`} className="block relative">
                        <div className="relative h-52 flex items-center justify-center overflow-hidden bg-slate-50 border-b border-slate-100">
                          {photo ? (
                            <img
                              src={photo}
                              alt={product.name}
                              loading="lazy"
                              className="h-40 w-full object-contain group-hover:scale-105 transition-transform duration-500 p-4 drop-shadow-md"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2">
                              <span className="text-6xl">{product.icon}</span>
                            </div>
                          )}

                          {/* Cert badge top-left */}
                          {topCert && (
                            <span className="absolute top-2.5 left-2.5 text-[10px] font-bold text-isa-700 bg-isa-50 border border-isa-200 px-2 py-0.5 rounded-full uppercase tracking-wide">
                              {topCert}
                            </span>
                          )}

                          {/* Bestseller / badge top-right */}
                          {product.slug === 'dxst-kgv' && (
                            <span className="absolute top-0 right-0 bg-isa-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                              Mining #1
                            </span>
                          )}
                          {product.badge && product.slug !== 'dxst-kgv' && (
                            <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-bl-xl">
                              {product.badge.split('·')[0].trim()}
                            </span>
                          )}
                        </div>
                      </Link>

                      {/* Card body */}
                      <div className="p-4 flex-1 flex flex-col">
                        {/* Category label */}
                        <p className="text-[10px] font-bold text-isa-600 uppercase tracking-widest mb-1">
                          {product.shortName ?? product.name.split(' ').slice(-2).join(' ')}
                        </p>

                        {/* Product name */}
                        <Link to={`/products/${product.slug}`}>
                          <h2 className="font-bold text-slate-900 text-sm leading-snug mb-2 hover:text-isa-700 transition-colors">
                            {product.name}
                          </h2>
                        </Link>

                        {/* Key specs grid */}
                        <div className="space-y-1 mb-3 flex-1">
                          {sizeSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Size:</span>
                              <span className="text-slate-700 font-semibold truncate">{sizeSpec.value}</span>
                            </div>
                          )}
                          {materialSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Material:</span>
                              <span className="text-slate-700 font-semibold truncate">{materialSpec.value.split('/')[0].trim()}{materialSpec.value.includes('/') ? ' / +more' : ''}</span>
                            </div>
                          )}
                          {connSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Connection:</span>
                              <span className="text-slate-700 font-semibold truncate">{connSpec.value}</span>
                            </div>
                          )}
                          {pressSpec && (
                            <div className="flex items-baseline gap-1.5 text-xs">
                              <span className="text-slate-400 font-medium w-20 flex-shrink-0">Pressure:</span>
                              <span className="text-slate-700 font-semibold truncate">{pressSpec.value.split('(')[0].trim()}</span>
                            </div>
                          )}
                        </div>

                        {/* Industry tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product.industries.slice(0, 3).map(ind => (
                            <span key={ind} className="text-[10px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full font-medium">
                              {ind}
                            </span>
                          ))}
                          {product.industries.length > 3 && (
                            <span className="text-[10px] text-slate-400 px-1 py-0.5">+{product.industries.length - 3}</span>
                          )}
                        </div>

                        {/* Availability + CTA */}
                        <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                          <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                            Available to Order
                          </span>
                          <div className="flex items-center gap-1.5">
                            <Link
                              to={`/products/${product.slug}`}
                              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:border-isa-400 hover:text-isa-700 font-medium transition-colors"
                            >
                              Specs
                            </Link>
                            <Link
                              to={`/rfq?valve=${product.slug}`}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-isa-600 hover:bg-isa-700 text-white font-bold transition-colors"
                            >
                              <ShoppingCart className="w-3 h-3" /> Quote
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-24 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-slate-500 font-medium text-lg mb-2">No products match your filters</p>
                <p className="text-slate-400 text-sm mb-5">Try broadening your search or clearing some filters</p>
                <button onClick={clearAll} className="text-sm text-isa-600 hover:text-isa-700 font-semibold underline">
                  Clear all filters
                </button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-12 border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 bg-slate-50">
              <div>
                <h3 className="font-black text-slate-900 text-lg mb-1">Don't see exactly what you need?</h3>
                <p className="text-slate-500 text-sm">Our engineering team handles custom sizes, special materials, and non-catalogue specifications.</p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <Link to="/configure" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-300 text-sm font-bold text-slate-700 hover:border-isa-500 hover:text-isa-700 bg-white transition-all">
                  AI Selector
                </Link>
                <Link to="/rfq" className="inline-flex items-center gap-2 bg-isa-600 hover:bg-isa-700 text-white font-bold px-5 py-2.5 rounded-xl transition-colors text-sm">
                  Request Quote <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileSidebarOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-white overflow-y-auto p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-slate-900">Filter Products</h3>
              <button onClick={() => setMobileSidebarOpen(false)}>
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            {Sidebar}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="w-full mt-4 bg-isa-600 text-white font-bold py-3 rounded-xl"
            >
              Show {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

import type { Product } from '../types'

export interface ProductSpec {
  label: string
  value: string
}

export interface IndustryDetail {
  name: string
  slug: string
  icon: string
  heroTagline: string
  description: string
  challenges: string[]
  recommendedValves: string[]
  keyCertifications: string[]
  stats?: Array<{ value: string; label: string }>
}

export const products: Product[] = [
  {
    id: 'ball-valve',
    slug: 'ball-valve',
    name: 'Ball Valve',
    shortName: 'Ball Valve',
    tagline: 'Reliable Quarter-Turn Shut-Off for Demanding Applications',
    description:
      'Our precision-engineered ball valves deliver leak-proof sealing and fast shut-off across chemical, petrochemical, oil & gas, and general industrial systems. Available in a wide range of body materials and actuation options to suit any process environment.',
    useCase:
      'Specify this valve for systems requiring fast shut-off, leak-proof sealing, and minimal maintenance in high-pressure or corrosive service.',
    icon: '⚙️',
    specs: [
      { label: 'Application', value: 'Chemical, petrochemical, oil & gas, general industrial' },
      { label: 'Function', value: 'Quarter-turn rotary shut-off with full bore flow' },
      { label: 'Body Materials', value: 'Carbon steel / stainless steel / brass / duplex' },
      { label: 'Ball', value: 'Solid or hollow, chrome-plated / stainless steel' },
      { label: 'Actuation', value: 'Manual lever / pneumatic / electric / hydraulic' },
      { label: 'Size Range', value: 'DN15–DN600 (custom on request)' },
      { label: 'Pressure Class', value: 'PN16 / PN40 / ANSI 150–600' },
      { label: 'End Connection', value: 'Threaded / flanged / welded / socket' },
      { label: 'Sealing', value: 'PTFE / PEEK / metal seat for high-temp or abrasive media' },
    ],
    industries: ['Oil & Gas', 'Chemical Processing', 'Water Treatment', 'HVAC', 'Marine'],
    compliance: ['API 6D', 'ISO', 'SABS', 'Client-specific standards'],
  },
  {
    id: 'butterfly-valve',
    slug: 'butterfly-valve',
    name: 'Butterfly Valve',
    shortName: 'Butterfly Valve',
    tagline: 'Compact, Fast-Acting Flow Control for Large-Volume Systems',
    description:
      'Engineered for large-volume flow applications, our butterfly valves combine compact design with rapid shut-off and throttling capability. Available in wafer, lug, and double-flanged configurations with a full range of disc and body materials.',
    useCase:
      'Specify this valve for systems requiring compact design, fast quarter-turn operation, and cost-effective flow control in water, air, or non-corrosive media.',
    icon: '🦋',
    specs: [
      { label: 'Application', value: 'Large volume flow systems, water, air, non-corrosive media' },
      { label: 'Function', value: 'Quarter-turn disc for rapid shut-off and throttling' },
      { label: 'Body Materials', value: 'Cast iron / ductile iron / stainless steel' },
      { label: 'Disc', value: 'Aluminium bronze / stainless steel / coated options' },
      { label: 'Actuation', value: 'Manual lever / gearbox / pneumatic / electric' },
      { label: 'Size Range', value: 'DN50–DN1200 (custom on request)' },
      { label: 'Pressure Class', value: 'PN10 / PN16 / ANSI 150' },
      { label: 'End Connection', value: 'Wafer / lug / double flanged' },
      { label: 'Sealing', value: 'EPDM / NBR / Viton / PTFE' },
    ],
    industries: ['Water Treatment', 'HVAC', 'Fire Protection', 'Irrigation', 'Municipal Supply'],
    compliance: ['SABS', 'ISO', 'WRAS', 'Client-specific standards'],
  },
  {
    id: 'gate-valve',
    slug: 'gate-valve',
    name: 'Gate Valve',
    shortName: 'Gate Valve',
    tagline: 'Full-Bore Isolation for Clean, Low-Turbulence Service',
    description:
      'Our gate valves provide full-bore isolation with minimal pressure drop, making them the preferred choice for clean water, HVAC, and municipal supply systems where unrestricted flow and reliable shut-off are critical.',
    useCase:
      'Specify this valve for systems requiring minimal flow restriction and full-bore isolation in clean water, HVAC, or municipal service where infrequent operation is expected.',
    icon: '🔧',
    specs: [
      { label: 'Application', value: 'Clean water, HVAC, low-turbulence flow systems' },
      { label: 'Function', value: 'Rising or non-rising stem for linear shut-off' },
      { label: 'Body Materials', value: 'Cast iron / ductile iron / stainless steel' },
      { label: 'Actuation', value: 'Manual / electric / gearbox' },
      { label: 'Size Range', value: 'DN50–DN1000 (custom on request)' },
      { label: 'Pressure Class', value: 'PN10 / PN16 / ANSI 150' },
      { label: 'End Connection', value: 'Flanged / socket / spigot' },
      { label: 'Sealing', value: 'Metal or resilient seat for full bore isolation' },
    ],
    industries: ['Water Treatment', 'HVAC', 'Fire Protection', 'Municipal Supply'],
    compliance: ['SABS 664', 'ISO', 'Client-specific standards'],
  },
  {
    id: 'knife-gate-valve',
    slug: 'knife-gate-valve',
    name: 'Knife Gate Valve',
    shortName: 'Knife Gate Valve',
    tagline: 'Engineered for Slurry, Viscous Fluids & Solids-Laden Media',
    description:
      'Designed for the toughest flow conditions, our knife gate valves handle slurry, viscous fluids, and solids-laden media with reliable full-bore isolation. Custom ceramic-lined versions are available for extreme abrasion service — proven to extend service life from 3 months to 14 months in active mining operations.',
    useCase:
      'Specify this valve for systems requiring low-pressure drop and reliable shut-off when conveying slurry, abrasive fluids, or solids. Ideal for mining, wastewater, and pulp & paper applications.',
    icon: '🔪',
    specs: [
      { label: 'Application', value: 'Slurry, viscous fluids, solids-laden media' },
      { label: 'Function', value: 'Slide gate mechanism for full-bore isolation' },
      { label: 'Body Materials', value: 'Cast iron / stainless steel (options available)' },
      { label: 'Actuation', value: 'Manual / pneumatic / electric' },
      { label: 'Size Range', value: 'DN50–DN600 (custom on request)' },
      { label: 'Pressure Class', value: 'PN10 / PN16' },
      { label: 'End Connection', value: 'Wafer / lug / flanged' },
      { label: 'Sealing', value: 'Metal or resilient seat for abrasive flow' },
    ],
    industries: ['Mining', 'Wastewater', 'Pulp & Paper', 'Chemical'],
    compliance: ['SABS', 'ISO', 'Client-specific standards'],
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getRelatedProducts(product: Product): Product[] {
  return products.filter(p => p.id !== product.id)
}

export const industryDetails: Record<string, IndustryDetail> = {
  mining: {
    name: 'Mining & Resources',
    slug: 'mining',
    icon: '⛏️',
    heroTagline: 'Stop slurry from destroying your valves every 3 months',
    description:
      'Mining operations face the harshest valve service conditions: abrasive slurry, extreme pressure cycling, and corrosive process fluids. Valve failures cause unplanned shutdowns that cost thousands per hour. Our ceramic-lined knife gate valves have extended service life from 3 months to 14 months for active mining operations.',
    challenges: [
      'Abrasive slurry destroying standard valve seats in under 3 months',
      'Unplanned shutdowns from valve failures costing thousands per hour',
      'Large-bore slurry lines (DN200+) requiring specialist valve selection',
      'Compliance with SABS and mine-specific procurement standards',
    ],
    recommendedValves: ['knife-gate-valve', 'ball-valve'],
    keyCertifications: ['SABS', 'ISO 9001:2015', 'Client-specific mine standards'],
    stats: [
      { value: '72%', label: 'Less maintenance downtime' },
      { value: '3→14 mo', label: 'Valve service life extended' },
      { value: 'R1.2M', label: 'Annual parts saving' },
      { value: '+8%', label: 'Process efficiency gained' },
    ],
  },
  'water-treatment': {
    name: 'Water Treatment',
    slug: 'water-treatment',
    icon: '💧',
    heroTagline: 'WRAS and SABS-compliant valves for clean, reliable water infrastructure',
    description:
      'Municipalities and industrial water operators need corrosion-resistant valves that comply with potable water standards, last decades in buried service, and require minimal maintenance. Our butterfly and gate valves are WRAS-approved and SABS 664-compliant for water treatment and municipal supply.',
    challenges: [
      'Corrosion and scaling in long-term buried or submerged service',
      'WRAS, SABS, and DWS compliance requirements for potable water',
      'Large-bore requirements for water mains (DN200–DN1200)',
      'Low-pressure systems requiring precise flow control and full isolation',
    ],
    recommendedValves: ['butterfly-valve', 'gate-valve'],
    keyCertifications: ['WRAS', 'SABS 664', 'ISO 9001:2015', 'DWS approval'],
    stats: [
      { value: 'DN50–DN1200', label: 'Size range covered' },
      { value: 'WRAS', label: 'Potable water approved' },
      { value: '25 years', label: 'Typical design life' },
    ],
  },
  'oil-gas': {
    name: 'Oil & Gas',
    slug: 'oil-gas',
    icon: '🛢️',
    heroTagline: 'API 6D certified ball valves for safe, reliable hydrocarbon service',
    description:
      'Upstream, midstream, and downstream oil & gas operations demand valves that meet API 6D and international pressure standards, resist hydrocarbon media, and support both manual and automated actuation. Our carbon steel and stainless steel ball valves are API 6D certified for pipeline and process service.',
    challenges: [
      'API 6D certification requirements for pipeline and process valves',
      'Hydrocarbon and H2S media requiring specialised sealing materials',
      'High-pressure service up to ANSI 600 and beyond',
      'Hazardous area actuation requirements (pneumatic / electric SIL-rated)',
    ],
    recommendedValves: ['ball-valve', 'gate-valve'],
    keyCertifications: ['API 6D', 'ISO 9001:2015', 'SABS', 'ATEX (actuators)'],
    stats: [
      { value: 'ANSI 150–600', label: 'Pressure class range' },
      { value: 'API 6D', label: 'Pipeline certification' },
      { value: 'DN15–DN600', label: 'Ball valve size range' },
    ],
  },
  chemical: {
    name: 'Chemical & Petrochemical',
    slug: 'chemical',
    icon: '🧪',
    heroTagline: 'Corrosion-resistant valves for aggressive chemical media',
    description:
      'Chemical and petrochemical processes demand body materials and sealing elements that resist the full spectrum of aggressive media — from strong acids to solvents to chlorinated compounds. Our stainless steel, duplex, and PTFE/PEEK sealed ball and knife gate valves handle corrosive service without compromising containment integrity.',
    challenges: [
      'Corrosive media attacking standard carbon steel body materials',
      'Aggressive media attacking elastomeric seals — requiring PTFE or PEEK',
      'High temperatures combined with chemical service',
      'Batch process systems requiring frequent cycling and reliable shut-off',
    ],
    recommendedValves: ['ball-valve', 'knife-gate-valve'],
    keyCertifications: ['ISO 9001:2015', 'SABS', 'API 6D (ball valves)', 'Client-specific ATEX'],
    stats: [
      { value: 'PTFE / PEEK', label: 'Aggressive media sealing' },
      { value: 'Duplex SS', label: 'Highest corrosion resistance' },
    ],
  },
  hvac: {
    name: 'HVAC & Building Services',
    slug: 'hvac',
    icon: '🌡️',
    heroTagline: 'Compact butterfly and gate valves for building services',
    description:
      'HVAC systems, chilled water loops, condenser systems, and fire protection networks require reliable, compact valves that install easily and perform quietly over decades of service. Our butterfly and gate valves in cast iron and ductile iron are sized from DN50 to DN1200 with wafer, lug, and flanged ends.',
    challenges: [
      'Space-constrained plant rooms requiring compact valve bodies',
      'Long-term corrosion resistance in closed-loop chilled or heating water',
      'Fire protection system compliance (FM, UL, SABS)',
      'Low total cost of ownership over 20+ year building lifecycle',
    ],
    recommendedValves: ['butterfly-valve', 'gate-valve'],
    keyCertifications: ['SABS', 'ISO 9001:2015', 'FM approval (fire protection)', 'WRAS'],
    stats: [
      { value: 'DN50–DN1200', label: 'Butterfly valve range' },
      { value: 'Wafer / Lug', label: 'Compact end connections' },
    ],
  },
  'pulp-paper': {
    name: 'Pulp & Paper',
    slug: 'pulp-paper',
    icon: '📄',
    heroTagline: 'Knife gate valves that handle fibrous slurry without plugging',
    description:
      'Pulp and paper mills process fibrous media that blocks conventional valves, leading to costly maintenance shutdowns. Knife gate valves with their full-bore opening and shearing gate action prevent plugging and reliably isolate pulp, black liquor, and process effluent lines.',
    challenges: [
      'Fibrous and viscous pulp media plugging conventional valve bodies',
      'Black liquor and process effluent requiring corrosion-resistant materials',
      'Frequent cycling in batch and continuous processing systems',
      'Large-bore process lines requiring cost-effective isolation solutions',
    ],
    recommendedValves: ['knife-gate-valve'],
    keyCertifications: ['ISO 9001:2015', 'SABS', 'Client-specific standards'],
    stats: [
      { value: 'DN50–DN600', label: 'Knife gate range' },
      { value: 'Full-bore', label: 'No flow restriction' },
    ],
  },
}

export const industryList = Object.values(industryDetails)

export const industries = [
  {
    name: 'Mining',
    description: 'Specialised valves for slurry applications with abrasion-resistant materials and reinforced actuators.',
    recommendedValves: ['knife-gate-valve', 'ball-valve'],
    slug: 'mining',
  },
  {
    name: 'Water Treatment',
    description: 'Corrosion-resistant valves optimised for municipal and industrial water systems with WRAS and SABS compliance.',
    recommendedValves: ['butterfly-valve', 'gate-valve'],
    slug: 'water-treatment',
  },
  {
    name: 'Oil & Gas',
    description: 'API 6D-compliant ball valves and gate valves engineered for high-pressure hydrocarbon service.',
    recommendedValves: ['ball-valve', 'gate-valve'],
    slug: 'oil-gas',
  },
  {
    name: 'Chemical & Petrochemical',
    description: 'Corrosion-resistant body materials with PTFE / PEEK sealing for aggressive media.',
    recommendedValves: ['ball-valve', 'knife-gate-valve'],
    slug: 'chemical',
  },
  {
    name: 'HVAC',
    description: 'Compact butterfly and gate valves for building services, climate control, and fire protection.',
    recommendedValves: ['butterfly-valve', 'gate-valve'],
    slug: 'hvac',
  },
  {
    name: 'Pulp & Paper',
    description: 'Knife gate valves engineered for fibrous and viscous media in pulp processing environments.',
    recommendedValves: ['knife-gate-valve'],
    slug: 'pulp-paper',
  },
]

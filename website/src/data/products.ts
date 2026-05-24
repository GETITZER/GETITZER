import type { Product } from '../types'

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
      'Designed for the toughest flow conditions, our knife gate valves handle slurry, viscous fluids, and solids-laden media with reliable full-bore isolation. Custom ceramic-lined versions are available for extreme abrasion service as proven in our mining case study.',
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

export const industries = [
  {
    name: 'Mining',
    description: 'Specialised valves designed for slurry applications with abrasion-resistant materials and reinforced actuators.',
    recommendedValves: ['knife-gate-valve', 'ball-valve'],
  },
  {
    name: 'Water Treatment',
    description: 'Corrosion-resistant valves optimised for municipal and industrial water systems with WRAS and SABS compliance.',
    recommendedValves: ['butterfly-valve', 'gate-valve'],
  },
  {
    name: 'Oil & Gas',
    description: 'API 6D-compliant ball valves and gate valves engineered for high-pressure hydrocarbon service.',
    recommendedValves: ['ball-valve', 'gate-valve'],
  },
  {
    name: 'Chemical & Petrochemical',
    description: 'Corrosion-resistant body materials (stainless steel, duplex) with PTFE / PEEK sealing for aggressive media.',
    recommendedValves: ['ball-valve', 'knife-gate-valve'],
  },
  {
    name: 'HVAC',
    description: 'Compact butterfly and gate valves for building services, climate control, and fire protection systems.',
    recommendedValves: ['butterfly-valve', 'gate-valve'],
  },
  {
    name: 'Pulp & Paper',
    description: 'Knife gate valves engineered for fibrous and viscous media in pulp processing environments.',
    recommendedValves: ['knife-gate-valve'],
  },
]

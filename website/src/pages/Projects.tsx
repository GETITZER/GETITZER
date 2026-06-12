import { Link } from 'react-router-dom'
import { ArrowRight, MapPin, Calendar, Building2 } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import SchemaMarkup from '../components/SchemaMarkup'

interface Project {
  id: string
  title: string
  client: string
  location: string
  industry: string
  industrySlug: string
  year: string
  scope: string
  valves: string[]
  outcome: string
  tags: string[]
}

const projects: Project[] = [
  {
    id: 'p1',
    title: 'Slurry Pipeline Valve Replacement — Deep-Level Gold Mine',
    client: 'Major Gold Mining Operation',
    location: 'West Rand, Gauteng',
    industry: 'Mining',
    industrySlug: 'mining',
    year: '2023',
    scope: 'Supply and installation of 47 × DN200–DN300 ceramic-lined knife gate valves on primary slurry pipeline and tailings transfer lines. Full actuator package — pneumatic and electric.',
    valves: ['ISA DXST™ Knife Gate Valve', 'ISA ProSeal™ Knife Gate'],
    outcome: 'Valve service life extended from 3 months to 14 months. Annual maintenance cost saving of R1.2M. Zero unplanned shutdowns in 12 months post-installation.',
    tags: ['Slurry', 'Knife Gate', 'Pneumatic Actuation', 'DN200–DN300'],
  },
  {
    id: 'p2',
    title: 'Bulk Water Main Valve Upgrade — Municipal Water Works',
    client: 'South African Municipality',
    location: 'Ekurhuleni, Gauteng',
    industry: 'Municipal Water',
    industrySlug: 'municipal',
    year: '2023',
    scope: 'Supply of 28 × DN400–DN600 SABS 664-compliant gate valves and 16 × DN300–DN1200 WRAS butterfly valves for bulk water distribution upgrade. Buried-service compliant coating and flanging.',
    valves: ['ISA Core™ Gate Valve', 'ISA Hydra™ Butterfly Valve'],
    outcome: 'Full SABS 664 and DWS compliance achieved. 25-year design life. Zero leakage across all installed valves at commissioning pressure test.',
    tags: ['Municipal', 'Gate Valve', 'Butterfly Valve', 'SABS 664', 'DN400–DN1200'],
  },
  {
    id: 'p3',
    title: 'Water Treatment Plant Automation — Industrial Complex',
    client: 'Industrial Water Treatment Facility',
    location: 'Sasolburg, Free State',
    industry: 'Water Treatment',
    industrySlug: 'water-treatment',
    year: '2022',
    scope: 'Supply of 34 × DN50–DN300 butterfly valves with electric actuators for automated dosing, filtration, and sludge handling circuits. Full SCADA integration via 4–20mA positioners.',
    valves: ['ISA Hydra™ Butterfly Valve', 'ISA ProSeal™ Knife Gate'],
    outcome: 'Fully automated valve control integrated to plant SCADA. Reduced operator intervention by 68%. All valves WRAS-certified for potable water contact.',
    tags: ['Water Treatment', 'Electric Actuation', 'SCADA', 'WRAS', 'Butterfly Valve'],
  },
  {
    id: 'p4',
    title: 'Copper Concentrate Pipeline — Base Metals Concentrator',
    client: 'Base Metals Concentrator',
    location: 'Northern Cape',
    industry: 'Mining',
    industrySlug: 'mining',
    year: '2022',
    scope: 'Supply of 62 × DN100–DN250 slurry knife gate valves for copper concentrate, tailings, and reagent lines. Ceramic-lined gate plates for abrasive copper-bearing media.',
    valves: ['ISA DXST™ Knife Gate Valve', 'ISA ProSeal™ Knife Gate'],
    outcome: '466% improvement in gate wear life vs. previous standard valves. Reduced spare-parts holding by 40%. Full installation and commissioning support provided.',
    tags: ['Copper Concentrate', 'Slurry', 'Ceramic Lined', 'DN100–DN250'],
  },
  {
    id: 'p5',
    title: 'Chemical Plant Isolation Valve Replacement',
    client: 'Petrochemical Processing Facility',
    location: 'Secunda, Mpumalanga',
    industry: 'Chemical & Petrochemical',
    industrySlug: 'chemical',
    year: '2023',
    scope: 'Supply of 18 × DN15–DN150 API 6D ball valves in 316SS with PTFE seats for aggressive chemical and solvent service. Full traceability documentation and MTRs provided.',
    valves: ['ISA Titan™ Ball Valve'],
    outcome: 'API 6D certification satisfied client procurement requirements. Full material traceability provided. Zero valve failures in 12 months of service.',
    tags: ['Chemical', 'Ball Valve', 'API 6D', 'PTFE Seats', '316SS'],
  },
  {
    id: 'p6',
    title: 'Pinch Valve Installation — Coal Preparation Plant',
    client: 'Coal Washing & Preparation Facility',
    location: 'eMalahleni, Mpumalanga',
    industry: 'Mining',
    industrySlug: 'mining',
    year: '2022',
    scope: 'Supply of 22 × DN50–DN200 ISA Shield™ pinch valves for dense-medium separation circuit, magnetite recovery, and plant effluent discharge. ISA-Extrem™ and ISA-Flex™ sleeves.',
    valves: ['ISA Shield™ Pinch Valve'],
    outcome: 'Pinch valve design eliminated media contact with valve body — zero corrosion maintenance. Full-bore flow preserved coal recovery efficiency.',
    tags: ['Coal Preparation', 'Pinch Valve', 'Dense Medium', 'DN50–DN200'],
  },
]

const projectSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'ISA Valve Solutions — Engineering Projects & Case Studies',
  description: 'Industrial valve installation projects across mining, water treatment, municipal, chemical, and power generation sectors in South Africa.',
  url: 'https://www.isavalvesolutions.com/projects',
  publisher: {
    '@type': 'Organization',
    name: 'ISA Valve Solutions',
    url: 'https://www.isavalvesolutions.com',
  },
}

export default function Projects() {
  usePageMeta({
    title: 'Engineering Projects & Case Studies — ISA Valve Solutions South Africa',
    description: 'ISA Valve Solutions project portfolio: mining, water treatment, municipal, chemical, and power generation valve installations across South Africa.',
    canonical: 'https://www.isavalvesolutions.com/projects',
  })

  return (
    <div className="min-h-screen bg-white pt-20">
      <SchemaMarkup schema={projectSchema} />

      {/* Hero */}
      <section className="bg-slate-900 pt-16 pb-20 relative overflow-hidden">
        <img
          src="/images/branded/isa-bg-warehouse.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: 0.30 }}
        />
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(7,26,45,0.90) 0%, rgba(7,26,45,0.65) 60%, rgba(7,26,45,0.30) 100%)' }} />
        <div className="absolute top-0 left-0 right-0 h-1"
          style={{ background: 'linear-gradient(to right, #f97316, #fb923c, #f97316)' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-widest text-isa-400 mb-3">Project Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              Valves proven in the field
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl">
              35+ years of delivering precision-engineered valve solutions across mining, water treatment, municipal infrastructure, chemical processing, and power generation throughout Southern Africa.
            </p>
            <div className="flex flex-wrap gap-3">
              {['Mining', 'Water Treatment', 'Municipal', 'Chemical', 'Power Generation'].map(tag => (
                <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-600 text-slate-300">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-slate-100">
            {[
              { value: '500+', label: 'Projects completed' },
              { value: '8', label: 'Countries served' },
              { value: '35+', label: 'Years experience' },
              { value: 'ISO 9001', label: '2015 certified' },
            ].map(stat => (
              <div key={stat.label} className="px-6 py-8 text-center">
                <p className="text-3xl font-black text-isa-500 mb-1">{stat.value}</p>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-black text-slate-900 mb-10">Recent projects</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map(project => (
            <article key={project.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Header bar */}
              <div className="h-1.5 bg-gradient-to-r from-isa-500 to-isa-400" />
              <div className="p-7">
                {/* Industry + Year */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-isa-600 px-2.5 py-1 bg-isa-50 rounded-full">
                    {project.industry}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <Calendar className="w-3 h-3" /> {project.year}
                  </span>
                </div>

                <h3 className="text-lg font-black text-slate-900 mb-2 leading-snug">{project.title}</h3>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {project.client}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {project.location}</span>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">{project.scope}</p>

                {/* Outcome */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
                  <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Outcome</p>
                  <p className="text-sm text-emerald-800 leading-relaxed">{project.outcome}</p>
                </div>

                {/* Valves used */}
                <div className="mb-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Valves supplied</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.valves.map(v => (
                      <span key={v} className="text-xs px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full font-medium">{v}</span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-slate-100">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-0.5 border border-slate-200 text-slate-500 rounded-full">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 border-t border-slate-100 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-slate-900 mb-4">Ready to start your project?</h2>
          <p className="text-slate-500 mb-8">Our engineering team will specify the right valve solution for your application, certifications, and budget.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/rfq" className="btn-primary">
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/industries" className="btn-secondary">
              Browse by Industry
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

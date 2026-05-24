import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { usePageMeta } from '../hooks/usePageMeta'
import SchemaMarkup from '../components/SchemaMarkup'

export interface BlogSeed {
  slug: string
  title: string
  excerpt: string
  keywords: string
  category: string
  readTime: string
}

export const blogSeeds: BlogSeed[] = [
  {
    slug: 'valve-selection-guide-mining',
    title: 'How to Select the Right Industrial Valve for Mining Applications',
    excerpt: 'Abrasive slurry, extreme pressure cycling, and corrosive media make mining one of the harshest environments for industrial valves. Learn how to specify the right valve type, material, and certification for your mining application.',
    keywords: 'mining valve selection, slurry valve, knife gate valve mining, abrasion resistant valve South Africa',
    category: 'Mining',
    readTime: '6 min read',
  },
  {
    slug: 'ball-valve-vs-butterfly-valve',
    title: 'Ball Valve vs Butterfly Valve: Which Should You Specify?',
    excerpt: 'Two of the most common valve types in industrial service — but choosing the wrong one costs money and causes downtime. This guide compares pressure rating, size range, flow characteristics, and total cost of ownership.',
    keywords: 'ball valve vs butterfly valve, valve comparison, industrial valve selection, valve specification guide',
    category: 'Valve Selection',
    readTime: '7 min read',
  },
  {
    slug: 'sabs-iso-valve-certifications',
    title: 'SABS vs ISO: Understanding Industrial Valve Certifications in South Africa',
    excerpt: 'When procuring industrial valves in South Africa, understanding SABS, ISO 9001, API 6D, and WRAS certification requirements is critical for compliance and avoiding costly shutdowns. Here is what engineers and procurement managers need to know.',
    keywords: 'SABS valve certification, ISO valve standards, valve compliance South Africa, API 6D certification',
    category: 'Compliance',
    readTime: '5 min read',
  },
  {
    slug: 'ceramic-lined-knife-gate-slurry',
    title: 'Ceramic-Lined Knife Gate Valves: Extending Service Life from 3 to 14 Months',
    excerpt: 'A case study from an active platinum mining operation shows how ceramic-lined knife gate valves extended valve service life by 4x, saving R1.2 million per year in parts and downtime costs. Here is how they did it.',
    keywords: 'ceramic lined knife gate valve, slurry valve life extension, mining valve maintenance, abrasion resistant valve',
    category: 'Case Study',
    readTime: '8 min read',
  },
  {
    slug: 'hvac-valve-selection',
    title: 'HVAC Valve Selection: Butterfly vs Gate Valves for Building Services',
    excerpt: 'Choosing between butterfly and gate valves for HVAC, chilled water loops, and fire protection systems depends on space, cycle frequency, pressure drop, and cost. This guide covers everything specifying engineers need to know.',
    keywords: 'HVAC valve selection, butterfly valve HVAC, gate valve building services, valve specification HVAC South Africa',
    category: 'HVAC',
    readTime: '6 min read',
  },
  {
    slug: 'knife-gate-valve-failure-prevention',
    title: 'Why Knife Gate Valves Fail in Slurry Service and How to Prevent It',
    excerpt: 'Premature knife gate valve failure in slurry service costs mines and industrial plants millions in unplanned downtime. The most common failure modes — seat erosion, gate wear, seal failure — are all preventable with the right valve specification.',
    keywords: 'knife gate valve failure, slurry valve maintenance, valve troubleshooting, mining valve failure prevention',
    category: 'Maintenance',
    readTime: '7 min read',
  },
]

const categoryColors: Record<string, string> = {
  Mining: 'bg-amber-50 text-amber-700 border-amber-200',
  'Valve Selection': 'bg-brand-50 text-brand-700 border-brand-200',
  Compliance: 'bg-slate-100 text-slate-700 border-slate-200',
  'Case Study': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  HVAC: 'bg-sky-50 text-sky-700 border-sky-200',
  Maintenance: 'bg-isa-50 text-isa-700 border-isa-200',
}

const blogListSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'ISA Valve Solutions Technical Blog',
  description: 'Technical guides and industry insights for industrial valve selection, specification, and maintenance.',
  publisher: {
    '@type': 'Organization',
    name: 'ISA Valve Solutions & Industrial Supplies',
  },
}

export default function Blog() {
  usePageMeta('Technical Blog', 'Technical guides, case studies, and valve selection advice from ISA Valve Solutions engineering team.')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      <SchemaMarkup schema={blogListSchema} />

      {/* Header */}
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-black text-brand-700 uppercase tracking-widest mb-3">Technical Blog</p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">
          Engineering insights from ISA Valve Solutions
        </h1>
        <p className="text-slate-500 text-lg leading-relaxed">
          Valve selection guides, industry case studies, compliance deep-dives, and maintenance best practices — written for engineers and procurement professionals.
        </p>
      </div>

      {/* Featured article */}
      <Link
        to={`/blog/${blogSeeds[3].slug}`}
        className="block card p-0 overflow-hidden mb-10 hover:shadow-lg hover:border-brand-200 transition-all group"
      >
        <div className="grid sm:grid-cols-[1fr_280px]">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${categoryColors['Case Study']}`}>
                {blogSeeds[3].category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{blogSeeds[3].readTime}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-brand-700 transition-colors leading-tight">
              {blogSeeds[3].title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-5">{blogSeeds[3].excerpt}</p>
            <div className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-700 group-hover:gap-3 transition-all">
              Read Article <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-center bg-slate-900 p-8">
            <div className="text-center">
              <p className="text-5xl font-black text-isa-400 mb-2">4×</p>
              <p className="text-slate-400 text-sm">Valve service life extended</p>
              <p className="text-slate-500 text-xs mt-2">R1.2M annual savings</p>
            </div>
          </div>
        </div>
      </Link>

      {/* Article grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogSeeds.filter((_, i) => i !== 3).map(post => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="card p-6 group hover:border-brand-200 hover:shadow-md transition-all flex flex-col"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold border px-2.5 py-1 rounded-full ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                {post.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
            </div>
            <h2 className="font-black text-slate-900 text-base mb-2 group-hover:text-brand-700 transition-colors leading-snug flex-1">
              {post.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-1 text-sm font-bold text-brand-700 group-hover:gap-2 transition-all mt-auto">
              Read Article <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </Link>
        ))}
      </div>

      {/* Keywords strip */}
      <div className="mt-14 border-t border-slate-100 pt-8">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2"><Tag className="w-3.5 h-3.5" /> Topics covered</p>
        <div className="flex flex-wrap gap-2">
          {['Ball Valve', 'Butterfly Valve', 'Gate Valve', 'Knife Gate Valve', 'Mining Valves', 'Slurry Service', 'SABS Compliance', 'API 6D', 'HVAC Valves', 'Water Treatment', 'Valve Maintenance', 'South Africa'].map(tag => (
            <span key={tag} className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-slate-200 transition-colors cursor-default">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

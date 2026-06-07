import { useUser, UserButton, Show, SignInButton } from '@clerk/react'
import { Link } from 'react-router-dom'

import { Download, ArrowRight, Zap, FileText, ClipboardList, LogIn } from 'lucide-react'

const docs = [
  { name: 'ISA Pinch Valve Series', size: '152 KB', href: '/downloads/ISA-Pinch-Valve-Series-Mining.pdf', icon: '🔴' },
  { name: 'ISA Slurry KGV', size: '199 KB', href: '/downloads/ISA-High-Performance-Slurry-KGV.pdf', icon: '🔪' },
  { name: 'ISA Slurry DXST', size: '552 KB', href: '/downloads/ISA-Slurry-DXST-Datasheet.pdf', icon: '🟠' },
  { name: 'Slurry Sampling System', size: '8.3 MB', href: '/downloads/ISA-Intelligent-Slurry-Sampling-System.pdf', icon: '⚗' },
  { name: 'Control Valve Catalog', size: '7.4 MB', href: '/downloads/ISA-Control-Valve-Catalog.pdf', icon: '⚙️' },
  { name: 'Coriolis Package', size: '16 MB', href: '/downloads/ISA-Coriolis-Installation-Package.pdf', icon: '📐' },
  { name: 'Precision Flow Portfolio', size: '12 MB', href: '/downloads/ISA-Precision-Flow-Solutions.pdf', icon: '📋' },
]

function DashboardContent() {
  const { user } = useUser()
  const firstName = user?.firstName || 'there'

  return (
    <div style={{ background: '#081D42' }} className="min-h-screen pt-20 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-sm text-muted mb-1">Welcome back,</p>
            <h1 className="font-display text-3xl font-bold text-white">
              {firstName} 👋
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs text-slate-400">{user?.primaryEmailAddress?.emailAddress}</span>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          <Link to="/rfq" className="glass p-5 rounded-2xl hover:-translate-y-0.5 transition-all group"
            style={{ border: '1px solid rgba(255,165,0,0.2)' }}>
            <ClipboardList className="w-6 h-6 text-accent-400 mb-3" />
            <h3 className="font-bold text-white group-hover:text-accent-300 transition-colors">Request a Quote</h3>
            <p className="text-xs text-muted mt-1">Submit a new RFQ with AI qualification</p>
            <ArrowRight className="w-4 h-4 text-accent-400 mt-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/configure" className="glass p-5 rounded-2xl hover:-translate-y-0.5 transition-all group"
            style={{ border: '1px solid rgba(0,109,255,0.2)' }}>
            <Zap className="w-6 h-6 text-blue-400 mb-3" />
            <h3 className="font-bold text-white group-hover:text-blue-300 transition-colors">AI Valve Selector</h3>
            <p className="text-xs text-muted mt-1">Answer 4 questions, get a recommendation</p>
            <ArrowRight className="w-4 h-4 text-blue-400 mt-3 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/resources" className="glass p-5 rounded-2xl hover:-translate-y-0.5 transition-all group"
            style={{ border: '1px solid rgba(16,185,129,0.2)' }}>
            <FileText className="w-6 h-6 text-emerald-400 mb-3" />
            <h3 className="font-bold text-white group-hover:text-emerald-300 transition-colors">Resource Centre</h3>
            <p className="text-xs text-muted mt-1">Technical data sheets and guides</p>
            <ArrowRight className="w-4 h-4 text-emerald-400 mt-3 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Documents */}
        <div className="mb-4">
          <p className="eng-label mb-2">Your Documents</p>
          <h2 className="font-display text-2xl font-bold text-white mb-6">Technical Downloads</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {docs.map(doc => (
            <a key={doc.href} href={doc.href} download
              className="glass p-4 rounded-2xl flex items-center gap-3 hover:-translate-y-0.5 transition-all group cursor-pointer"
              style={{ border: '1px solid rgba(16,185,129,0.15)' }}>
              <span className="text-2xl flex-shrink-0">{doc.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors leading-snug truncate">{doc.name}</p>
                <p className="text-xs text-muted mt-0.5">{doc.size}</p>
              </div>
              <Download className="w-4 h-4 text-emerald-400 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>

        {/* Account note */}
        <div className="mt-10 p-5 rounded-2xl text-center"
          style={{ background: 'rgba(0,109,255,0.05)', border: '1px solid rgba(0,109,255,0.1)' }}>
          <p className="text-sm text-slate-400">
            Need additional data sheets or test certificates?{' '}
            <a href="mailto:isa-valve@outlook.com" className="text-blue-400 hover:underline">isa-valve@outlook.com</a>
            {' '}or use the{' '}
            <Link to="/rfq" className="text-blue-400 hover:underline">RFQ form</Link>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <>
      <Show when="signed-in">
        <DashboardContent />
      </Show>
      <Show when="signed-out">
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: '#081D42' }}>
          <div className="max-w-sm w-full text-center">
            <div className="glass p-10 rounded-3xl">
              <h1 className="font-display text-2xl font-bold text-white mb-3">My Account</h1>
              <p className="text-slate-400 text-sm mb-6">Sign in to access your documents and account.</p>
              <SignInButton mode="modal">
                <button className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-white text-sm"
                  style={{ background: 'linear-gradient(135deg, #006DFF 0%, #0052CC 100%)' }}>
                  <LogIn className="w-4 h-4" /> Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </Show>
    </>
  )
}

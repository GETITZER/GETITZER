import { NavLink } from 'react-router-dom'

// Sub-navigation across the Controls & Instrumentation sections.
const tabs = [
  { label: 'Level', to: '/controls-instrumentation/level' },
  { label: 'Flow', to: '/controls-instrumentation/flow' },
]

export default function InstrumentationTabs() {
  return (
    <div className="flex flex-wrap gap-2 mt-8">
      {tabs.map(tab => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `text-sm font-bold px-4 py-2 rounded-lg border transition-colors ${
              isActive
                ? 'bg-isa-500 border-isa-500 text-white'
                : 'border-white/20 text-slate-200 hover:border-white/40 hover:text-white'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

/* Full-screen opening splash shown once per browser session.
   Auto-dismisses when the video ends, or user clicks "Enter". */
export default function WelkomSplash() {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('isa-splash-shown')) return
    sessionStorage.setItem('isa-splash-shown', '1')
    setVisible(true)
  }, [])

  function dismiss() {
    setLeaving(true)
    setTimeout(() => setVisible(false), 500)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: '#040e22',
        opacity: leaving ? 0 : 1,
        transition: 'opacity 0.5s ease',
      }}
    >
      {/* Background video */}
      <video
        ref={videoRef}
        src="/videos/welkom.mp4"
        autoPlay muted playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.55 }}
        onEnded={dismiss}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900/80" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-6">
        {/* Real ISA branded logo — black bg blends with dark splash via lighten mode */}
        <img
          src="/images/isa-logo-stacked-dark.jpg"
          alt="ISA Valve Solutions & Industrial Supplies"
          className="w-52 sm:w-64 h-auto rounded-xl"
          style={{ mixBlendMode: 'lighten', opacity: 0.95 }}
        />
        <div>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white tracking-tight leading-none mb-2"
            style={{ textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}>
            Welkom
          </h1>
          <p className="text-lg sm:text-xl text-isa-300 font-semibold tracking-widest uppercase">
            ISA Valve Solutions
          </p>
        </div>

        <p className="text-slate-200 text-sm sm:text-base max-w-xs text-center leading-relaxed">
          35 years of precision flow control across Africa
        </p>

        <button
          onClick={dismiss}
          className="mt-2 inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-lg shadow-isa-500/40 text-base"
        >
          Enter Site
        </button>

        <button
          onClick={dismiss}
          className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline underline-offset-2"
        >
          Skip
        </button>
      </div>
    </div>
  )
}

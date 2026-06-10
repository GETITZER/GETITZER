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
        style={{ opacity: 0.75 }}
        onEnded={dismiss}
      />

      {/* Top and bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/65 via-transparent to-slate-900/65" />

      {/* Content — just Welkom */}
      <div className="relative z-10 text-center px-6 flex flex-col items-center gap-8">
        <h1
          className="text-7xl sm:text-9xl font-extrabold text-white tracking-tight leading-none"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.7)' }}
        >
          Welkom
        </h1>

        <button
          onClick={dismiss}
          className="inline-flex items-center gap-2 bg-isa-500 hover:bg-isa-600 text-white font-bold px-10 py-4 rounded-xl transition-colors shadow-xl shadow-isa-500/40 text-lg"
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

import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

/* Shows the welcome promotional video once per browser session.
   Dismissed by clicking ×, the overlay, or pressing Escape. */
export default function WelcomePopup() {
  const [visible, setVisible] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('isa-welcome-shown')) return
    const t = setTimeout(() => {
      setVisible(true)
      sessionStorage.setItem('isa-welcome-shown', '1')
    }, 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!visible) return
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', handle)
    return () => document.removeEventListener('keydown', handle)
  }, [visible])

  function close() {
    videoRef.current?.pause()
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog" aria-modal="true" aria-label="Welcome to ISA Valve Solutions"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8"
      style={{ background: 'rgba(4,14,34,0.88)', backdropFilter: 'blur(6px)' }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Orange top accent */}
        <div className="h-1 bg-gradient-to-r from-isa-400 via-isa-500 to-isa-400" />

        {/* Close button */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-slate-900/80 text-white flex items-center justify-center hover:bg-isa-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <video
          ref={videoRef}
          src="/videos/welcome-popup.mp4"
          autoPlay muted={false} controls playsInline
          className="w-full block"
          style={{ maxHeight: '75vh', objectFit: 'contain', background: '#0d1f3c' }}
        />

        <div className="bg-slate-900 px-5 py-3 flex items-center justify-between gap-4">
          <p className="text-sm text-slate-300">
            <span className="text-isa-400 font-bold">ISA Valve Solutions</span> — Precision Flow Control
          </p>
          <button onClick={close}
            className="text-xs font-bold text-white bg-isa-500 hover:bg-isa-600 px-4 py-1.5 rounded-lg transition-colors flex-shrink-0">
            Enter Site
          </button>
        </div>
      </div>
    </div>
  )
}

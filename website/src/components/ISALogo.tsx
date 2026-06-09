import { useState, useEffect } from 'react'

/* ─── Animated ISA geometric mark ─── */
export function ISAMark({ size = 32, animate = false }: { size?: number; animate?: boolean }) {
  const h = Math.round(size * 1.1)
  return (
    <svg
      width={size} height={h}
      viewBox="0 0 32 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={animate ? 'isa-mark' : ''}
      style={{ overflow: 'visible' }}
    >
      {/* Glow behind mark — only when animated */}
      {animate && (
        <ellipse cx="16" cy="34" rx="14" ry="4"
          fill="#f97316" opacity="0.18"
          className="isa-mark-glow" />
      )}
      <polygon
        points="2,34 16,2 22,34"
        fill="#0066CC"
        className={animate ? 'isa-tri isa-tri-1' : ''}
      />
      <polygon
        points="16,2 22,34 20,34 14,5"
        fill="#f97316"
        opacity="0.95"
        className={animate ? 'isa-tri isa-tri-2' : ''}
      />
      <polygon
        points="22,34 30,34 25,11"
        fill="#C0C8D8"
        opacity="0.65"
        className={animate ? 'isa-tri isa-tri-3' : ''}
      />
    </svg>
  )
}

/* ─── Watermark mark (very large, subtle) ─── */
export function ISAWatermark({ size = 400, opacity = 0.04 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 32 35" fill="none" style={{ opacity }}>
      <polygon points="2,34 16,2 22,34" fill="#0066CC"/>
      <polygon points="16,2 22,34 20,34 14,5" fill="#f97316" opacity="0.94"/>
      <polygon points="22,34 30,34 25,11" fill="#ffffff" opacity="0.4"/>
    </svg>
  )
}

/* ─── Navigation logo ─── */
export function ISALogoNav() {
  const [imgFailed, setImgFailed] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex items-center gap-2.5 select-none">
      {imgFailed ? (
        <ISAMark size={30} animate />
      ) : (
        <img
          src="/images/logo.png"
          alt="ISA"
          className="h-8 w-auto"
          onError={() => setImgFailed(true)}
        />
      )}
      <div className={`leading-none transition-all duration-500 ${ready ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}>
        <div className="font-bold text-sm tracking-tight text-slate-900">ISA VALVE SOLUTIONS</div>
        <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#6b7280' }}>
          &amp; Industrial Supplies
        </div>
      </div>
    </div>
  )
}

/* ─── Hero logo: large, animated ─── */
export function ISALogoHero({ className = '' }: { className?: string }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 100)
    const t2 = setTimeout(() => setStep(2), 500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className={`transition-all duration-700 ${step >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <ISAMark size={56} animate />
      </div>
      <div className={`transition-all duration-500 delay-300 ${step >= 2 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
        <div className="font-bold text-2xl sm:text-3xl text-white tracking-tight leading-none">
          ISA VALVE SOLUTIONS
        </div>
        <div className="text-xs text-blue-300 tracking-[0.2em] font-semibold mt-1.5 uppercase">
          Your Partner in Flow Control
        </div>
      </div>
    </div>
  )
}

/* ─── Footer logo — animated on scroll into view ─── */
export function ISALogoFooter() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="flex items-center gap-3">
      <div className={`transition-all duration-700 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
        <ISAMark size={36} animate />
      </div>
      <div className={`leading-none transition-all duration-500 delay-200 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}>
        <div className="font-bold text-base tracking-tight text-white">ISA VALVE SOLUTIONS</div>
        <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5a7a9a' }}>
          &amp; Industrial Supplies
        </div>
      </div>
    </div>
  )
}

/* ─── Product image fallback chain ─── */
interface ProductImgProps {
  slug: string
  alt: string
  className?: string
  children: React.ReactNode
}
export function ProductImg({ slug, alt, className = '', children }: ProductImgProps) {
  const [attempt, setAttempt] = useState<'png' | 'jpg' | 'svg'>('png')

  if (attempt === 'svg') return <div className={className}>{children}</div>

  return (
    <img
      src={`/images/products/${slug}.${attempt}`}
      alt={alt}
      className={className}
      onError={() => setAttempt(attempt === 'png' ? 'jpg' : 'svg')}
    />
  )
}

/* ─── About section background image ─── */
export function AboutBgImage() {
  const [useSVG, setUseSVG] = useState(false)

  if (useSVG) return null

  return (
    <img
      src="/images/about.jpg"
      alt=""
      className="absolute inset-0 w-full h-full object-cover opacity-10"
      onError={() => setUseSVG(true)}
      aria-hidden="true"
    />
  )
}

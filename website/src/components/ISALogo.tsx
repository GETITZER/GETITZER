import { useState } from 'react'

/* ─── ISA Geometric Mark (triangle peak) ─── */
export function ISAMark({ size = 32 }: { size?: number }) {
  const h = Math.round(size * 1.1)
  return (
    <svg width={size} height={h} viewBox="0 0 32 35" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <polygon points="2,34 16,2 22,34" fill="#0066CC"/>
      <polygon points="16,2 22,34 20,34 14,5" fill="#FF8A00" opacity="0.94"/>
      <polygon points="22,34 30,34 25,11" fill="#C0C8D8" opacity="0.62"/>
    </svg>
  )
}

/* ─── Watermark mark (very large, subtle) ─── */
export function ISAWatermark({ size = 400, opacity = 0.04 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.1)} viewBox="0 0 32 35" fill="none" style={{ opacity }}>
      <polygon points="2,34 16,2 22,34" fill="#0066CC"/>
      <polygon points="16,2 22,34 20,34 14,5" fill="#FF8A00" opacity="0.94"/>
      <polygon points="22,34 30,34 25,11" fill="#ffffff" opacity="0.4"/>
    </svg>
  )
}

/* ─── Navigation logo — uses real logo.png with SVG mark fallback ─── */
export function ISALogoNav() {
  const [imgFailed, setImgFailed] = useState(false)
  return (
    <div className="flex items-center gap-2.5 select-none">
      {imgFailed ? (
        <ISAMark size={30} />
      ) : (
        <img
          src="/images/logo.png"
          alt="ISA"
          className="h-8 w-auto"
          onError={() => setImgFailed(true)}
        />
      )}
      <div className="leading-none">
        <div className="font-bold text-sm tracking-tight text-white">ISA VALVE SOLUTIONS</div>
        <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5a7a9a' }}>
          & Industrial Supplies
        </div>
      </div>
    </div>
  )
}

/* ─── Hero logo: large, prominent ─── */
export function ISALogoHero({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <ISAMark size={56} />
      <div>
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

/* ─── Footer logo ─── */
export function ISALogoFooter() {
  return (
    <div className="flex items-center gap-3">
      <ISAMark size={36} />
      <div className="leading-none">
        <div className="font-bold text-base tracking-tight text-white">ISA VALVE SOLUTIONS</div>
        <div style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#5a7a9a' }}>
          & Industrial Supplies
        </div>
      </div>
    </div>
  )
}

/* ─── Product image: PNG → JPG → SVG illustration fallback ─── */
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

import { useState } from 'react'

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
  return (
    <img
      src="/images/isa-logo-light-trim.png"
      alt="ISA Valve Solutions & Industrial Supplies"
      className="h-12 sm:h-14 w-auto"
    />
  )
}

/* ─── Hero logo: large, for dark backgrounds ─── */
export function ISALogoHero({ className = '' }: { className?: string }) {
  return (
    <img
      src="/images/isa-logo-white-trim.png"
      alt="ISA Valve Solutions & Industrial Supplies"
      className={`h-20 w-auto ${className}`}
      style={{ opacity: 0.95 }}
    />
  )
}

/* ─── Footer logo — white silhouette for dark footer ─── */
export function ISALogoFooter() {
  return (
    <img
      src="/images/isa-logo-white-trim.png"
      alt="ISA Valve Solutions & Industrial Supplies"
      className="h-14 w-auto"
      style={{ opacity: 0.95 }}
    />
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

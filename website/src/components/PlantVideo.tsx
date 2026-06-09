import { useEffect, useState } from 'react'
import PlantScene from './PlantScene'

/* ─── Industrial plant background ──────────────────────────────────────
   Shows the animated PlantScene by default. If a real video file is placed
   at /public/videos/industrial-plant.mp4 it auto-detects it and plays it
   over the scene (muted, looping). This keeps the section "alive" today and
   lets the owner drop in their own owned footage later with zero code change.

   Note: the SPA's _redirects rule (`/* /index.html 200`) means a missing
   asset still returns 200, so we confirm the response is actually a video
   by checking the content-type before mounting <video>. */
export default function PlantVideo({ className = '' }: { className?: string }) {
  const [hasVideo, setHasVideo] = useState(false)

  useEffect(() => {
    let alive = true
    fetch('/videos/industrial-plant.mp4', { method: 'HEAD' })
      .then(res => {
        const ct = res.headers.get('content-type') || ''
        if (alive && res.ok && ct.startsWith('video')) setHasVideo(true)
      })
      .catch(() => { /* no video — animated scene stays */ })
    return () => { alive = false }
  }, [])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <PlantScene className="absolute inset-0 w-full h-full" />
      {hasVideo && (
        <video
          src="/videos/industrial-plant.mp4"
          autoPlay muted loop playsInline preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  )
}

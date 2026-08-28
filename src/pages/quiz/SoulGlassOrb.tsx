import { useEffect, useRef } from 'react'
import glassOrbVideo from './assets/onboarding/glass-orb.mp4'
import glassOrbPoster from './assets/onboarding/glass-orb.png'
import './soul-glass-orb.css'

const PAGE_TAUPE = '#746c5e'
const BG_IMG_SEL =
  'img.soul-rf__bg-img, img.soul-wt__bg-img, .soul-people__bg-tile--1 img'
const HOST_SEL = '.soul-rf, .soul-wt, .soul-people'
/** Crop the video’s outer glow so only the glass sphere remains. */
const VIDEO_ZOOM = 1.5

interface SoulGlassOrbProps {
  className?: string
  width: number
  height: number
}

function objectPositionFractions(pos: string): [number, number] {
  const parts = pos.trim().split(/\s+/)
  const one = (token: string | undefined, fallback: number) => {
    if (!token || token === 'center') return 0.5
    if (token === 'left' || token === 'top') return 0
    if (token === 'right' || token === 'bottom') return 1
    if (token.endsWith('%')) return Number.parseFloat(token) / 100
    return fallback
  }
  if (parts.length === 1) return [one(parts[0], 0.5), 0.5]
  return [one(parts[0], 0.5), one(parts[1], 0.5)]
}

function drawScrim(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  canvasRect: DOMRect,
  host: Element,
): void {
  const scrim = host.querySelector('.soul-rf__scrim, .soul-wt__scrim, .soul-people__scrim')
  if (!(scrim instanceof HTMLElement)) return

  const sr = scrim.getBoundingClientRect()
  if (sr.width < 1 || sr.height < 1) return

  const opacity = Number.parseFloat(getComputedStyle(scrim).opacity) || 1
  const people = scrim.classList.contains('soul-people__scrim')
  const posY = people ? 0.38 : 0
  const sizeX = people ? 1 : 1.44
  const sizeY = people ? 0.7 : 0.67
  const dpr = canvas.width / canvasRect.width
  const cx = (sr.left + sr.width * 0.5 - canvasRect.left) * dpr
  const cy = (sr.top + sr.height * posY - canvasRect.top) * dpr
  const rx = sr.width * sizeX * 0.5 * dpr
  const ry = sr.height * sizeY * 0.5 * dpr
  if (rx < 1 || ry < 1) return

  ctx.save()
  ctx.translate(cx, cy)
  ctx.scale(rx, ry)
  const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 1)
  gradient.addColorStop(0, `rgba(0,0,0,${0.3 * opacity})`)
  gradient.addColorStop(people ? 0.58 : 0.59, `rgba(0,0,0,${0.25 * opacity})`)
  gradient.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = gradient
  ctx.fillRect(-cx / rx, -cy / ry, canvas.width / rx, canvas.height / ry)
  ctx.restore()
}

function drawPageBed(
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
): void {
  ctx.globalCompositeOperation = 'copy'
  ctx.fillStyle = PAGE_TAUPE
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  const host = canvas.closest(HOST_SEL)
  if (!host) return

  const canvasRect = canvas.getBoundingClientRect()
  const bgImg = host.querySelector(BG_IMG_SEL)
  if (bgImg instanceof HTMLImageElement && bgImg.naturalWidth && canvasRect.width >= 1) {
    const ir = bgImg.getBoundingClientRect()
    if (ir.width >= 1 && ir.height >= 1) {
      const iw = bgImg.naturalWidth
      const ih = bgImg.naturalHeight
      const scale = Math.max(ir.width / iw, ir.height / ih)
      const dw = iw * scale
      const dh = ih * scale
      const [px, py] = objectPositionFractions(getComputedStyle(bgImg).objectPosition)
      const ox = ir.left + (ir.width - dw) * px
      const oy = ir.top + (ir.height - dh) * py
      ctx.globalCompositeOperation = 'source-over'
      ctx.drawImage(
        bgImg,
        (canvasRect.left - ox) / scale,
        (canvasRect.top - oy) / scale,
        canvasRect.width / scale,
        canvasRect.height / scale,
        0,
        0,
        canvas.width,
        canvas.height,
      )
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
  }

  ctx.globalCompositeOperation = 'source-over'
  drawScrim(ctx, canvas, canvasRect, host)
}

/**
 * Orb.mp4 is glass on black. Figma uses mix-blend SCREEN so black disappears
 * without cutting the glass. Canvas copies that: page photo as the bed, then
 * Screen the video on top.
 */
export function SoulGlassOrb({ className, width, height }: SoulGlassOrbProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext('2d', { alpha: false })
    if (!ctx) return

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let alive = true

    video.muted = true
    video.defaultMuted = true
    video.playsInline = true

    const fit = () => {
      const dpr = Math.min(Math.max(window.devicePixelRatio || 1, 2), 3)
      const w = canvas.clientWidth || width
      const h = canvas.clientHeight || height
      const pw = Math.max(1, Math.round(w * dpr))
      const ph = Math.max(1, Math.round(h * dpr))
      if (canvas.width !== pw || canvas.height !== ph) {
        canvas.width = pw
        canvas.height = ph
      }
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
    }

    const paint = () => {
      fit()
      drawPageBed(ctx, canvas)
      if (video.readyState < 2) return
      const dw = canvas.width * VIDEO_ZOOM
      const dh = canvas.height * VIDEO_ZOOM
      ctx.globalCompositeOperation = 'screen'
      ctx.drawImage(
        video,
        (canvas.width - dw) / 2,
        (canvas.height - dh) / 2,
        dw,
        dh,
      )
      ctx.globalCompositeOperation = 'source-over'
    }

    const tick = () => {
      if (!alive) return
      paint()
      raf = requestAnimationFrame(tick)
    }

    const kickPlay = () => {
      void video.play().catch(() => {})
    }

    const apply = () => {
      cancelAnimationFrame(raf)
      if (motion.matches) {
        video.pause()
        video.currentTime = 0
        paint()
        return
      }
      kickPlay()
      tick()
    }

    video.addEventListener('loadeddata', paint)
    video.addEventListener('canplay', kickPlay)
    video.addEventListener('playing', apply)
    motion.addEventListener('change', apply)
    apply()

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      video.removeEventListener('loadeddata', paint)
      video.removeEventListener('canplay', kickPlay)
      video.removeEventListener('playing', apply)
      motion.removeEventListener('change', apply)
    }
  }, [height, width])

  return (
    <span className={['soul-glass-orb', className].filter(Boolean).join(' ')}>
      <video
        ref={videoRef}
        className="soul-glass-orb__source"
        src={glassOrbVideo}
        poster={glassOrbPoster}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-hidden="true"
      />
      <canvas className="soul-glass-orb__media" ref={canvasRef} aria-hidden="true" />
    </span>
  )
}

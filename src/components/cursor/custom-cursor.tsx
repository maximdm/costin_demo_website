import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { cn } from '@/lib/utils'

/** Elements that should make the cursor enlarge (and act as hover targets). */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-magnetic]'
const HOVER_SCALE = 2.6
const LERP = 0.18

/**
 * Cuberto-style custom cursor: a blend-mode dot that trails the mouse,
 * stretches with velocity, and scales up over interactive elements.
 *
 * Only active on devices with a fine pointer (mouse) and when the user
 * has not requested reduced motion.
 *
 * Performance: instead of `gsap.ticker` (which runs every frame forever and
 * forces the `mix-blend-difference` to re-composite against the backdrop
 * continuously — the cause of the ~32fps idle lag), we drive a self-stopping
 * rAF loop that runs only while the cursor is moving or settling, then snaps
 * to rest. When the mouse is idle, zero frames are spent re-blending.
 */
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const el = ref.current
    if (!el) return

    setEnabled(true)
    document.body.classList.add('cursor-active')

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const target = { x: pos.x, y: pos.y }
    let scale = 1
    let targetScale = 1
    let hovered = false
    const last = { x: pos.x, y: pos.y }

    gsap.set(el, { xPercent: -50, yPercent: -50, x: pos.x, y: pos.y })

    let rafId: number | null = null
    let running = false

    const render = () => {
      pos.x += (target.x - pos.x) * LERP
      pos.y += (target.y - pos.y) * LERP
      scale += (targetScale - scale) * LERP

      const dx = pos.x - last.x
      const dy = pos.y - last.y
      const dist = Math.hypot(dx, dy)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      const stretch = Math.min(dist * 0.05, 1)

      last.x = pos.x
      last.y = pos.y

      if (!hovered) {
        gsap.set(el, {
          x: pos.x,
          y: pos.y,
          rotate: angle,
          scaleX: scale + stretch,
          scaleY: scale - Math.min(stretch, 0.35),
        })
      } else {
        gsap.set(el, {
          x: pos.x,
          y: pos.y,
          rotate: 0,
          scaleX: scale,
          scaleY: scale,
        })
      }

      // Stop the loop once everything has settled — no point re-blending every
      // frame while the cursor is at rest.
      const settled =
        Math.abs(target.x - pos.x) < 0.5 &&
        Math.abs(target.y - pos.y) < 0.5 &&
        Math.abs(targetScale - scale) < 0.01
      if (settled) {
        gsap.set(el, {
          x: target.x,
          y: target.y,
          rotate: 0,
          scaleX: targetScale,
          scaleY: targetScale,
        })
        running = false
        rafId = null
        return
      }
      rafId = requestAnimationFrame(render)
    }

    const ensureRunning = () => {
      if (running) return
      running = true
      rafId = requestAnimationFrame(render)
    }

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX
      target.y = e.clientY
      ensureRunning()
    }

    const onOver = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE)
      if (t) {
        hovered = true
        targetScale = HOVER_SCALE
        ensureRunning()
      }
    }

    const onOut = (e: PointerEvent) => {
      const t = (e.target as HTMLElement | null)?.closest?.(INTERACTIVE)
      const related = e.relatedTarget as HTMLElement | null
      if (t && (!related || !related.closest?.(INTERACTIVE))) {
        hovered = false
        targetScale = 1
        ensureRunning()
      }
    }

    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      if (rafId !== null) cancelAnimationFrame(rafId)
      document.body.classList.remove('cursor-active')
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn(
        'pointer-events-none fixed left-0 top-0 z-[100] h-5 w-5 rounded-full bg-white mix-blend-difference transition-opacity duration-300 will-change-transform',
        enabled ? 'opacity-100' : 'opacity-0',
      )}
    />
  )
}

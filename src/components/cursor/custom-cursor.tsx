import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

import { cn } from '@/lib/utils'

/** Elements that should make the cursor enlarge (and act as hover targets). */
const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, [data-magnetic]'
const RING_LERP = 0.35
const SCALE_LERP = 0.25
// The ring's native (unscaled) size IS the hover size, so hovering renders at
// scale 1.0 — crisp. The default trailing state is downscaled from that, which
// stays sharp (averaging) instead of smearing like an upscale would.
const DEFAULT_SCALE = 0.5
const HOVER_SCALE = 1.0

/**
 * Premium "transparency hover" cursor:
 *  - a precise dot locked exactly under the pointer (you are the mouse),
 *  - a larger ring that trails the dot with velocity-based stretch,
 *  - on interactive elements the ring expands into a transparent-centered
 *    focus circle (mix-blend-difference inverts whatever it crosses) while the
 *    dot fades out, so you see *through* the hover instead of a solid blob.
 *
 * Only active on devices with a fine pointer (mouse) and when the user has not
 * requested reduced motion.
 *
 * Performance: we drive a self-stopping rAF loop that runs only while the
 * cursor is moving or settling, then snaps to rest — so when the mouse is idle,
 * zero frames are spent re-compositing the mix-blend-difference layer (the
 * cause of the earlier ~32fps idle cost).
 */
export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    setEnabled(true)
    document.body.classList.add('cursor-active')

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: target.x, y: target.y }
    let ringScale = DEFAULT_SCALE
    let targetScale = DEFAULT_SCALE
    let dotOpacity = 1
    let targetOpacity = 1
    let hovered = false
    const ringLast = { x: ringPos.x, y: ringPos.y }

    gsap.set(ring, {
      xPercent: -50,
      yPercent: -50,
      x: ringPos.x,
      y: ringPos.y,
      scaleX: DEFAULT_SCALE,
      scaleY: DEFAULT_SCALE,
    })
    gsap.set(dot, { xPercent: -50, yPercent: -50, x: target.x, y: target.y })

    let rafId: number | null = null
    let running = false

    const render = () => {
      ringPos.x += (target.x - ringPos.x) * RING_LERP
      ringPos.y += (target.y - ringPos.y) * RING_LERP
      ringScale += (targetScale - ringScale) * SCALE_LERP
      dotOpacity += (targetOpacity - dotOpacity) * SCALE_LERP

      const dx = ringPos.x - ringLast.x
      const dy = ringPos.y - ringLast.y
      const dist = Math.hypot(dx, dy)
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI
      const stretch = Math.min(dist * 0.04, 0.6)

      ringLast.x = ringPos.x
      ringLast.y = ringPos.y

      // The dot is pinned to the exact pointer position — pinpoint precise.
      gsap.set(dot, { x: target.x, y: target.y, opacity: dotOpacity })

      // The ring trails and stretches with velocity, then eases back to a
      // centered circle (no stretch) while hovered.
      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y,
        rotate: hovered ? 0 : angle,
        scaleX: ringScale + (hovered ? 0 : stretch),
        scaleY: ringScale - (hovered ? 0 : Math.min(stretch, 0.35)),
      })

      // Stop the loop once everything has settled — no point re-blending every
      // frame while the cursor is at rest.
      const settled =
        Math.abs(target.x - ringPos.x) < 0.5 &&
        Math.abs(target.y - ringPos.y) < 0.5 &&
        Math.abs(targetScale - ringScale) < 0.01 &&
        Math.abs(targetOpacity - dotOpacity) < 0.01
      if (settled) {
        gsap.set(ring, {
          x: target.x,
          y: target.y,
          rotate: 0,
          scaleX: targetScale,
          scaleY: targetScale,
        })
        gsap.set(dot, { x: target.x, y: target.y, opacity: targetOpacity })
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
      // Derive hover state directly from the element under the pointer so the
      // ring always reverts correctly (no enter/leave pairing that can desync
      // and leave it stuck enlarged).
      const hov = !!(e.target as HTMLElement | null)?.closest?.(INTERACTIVE)
      if (hov !== hovered) {
        hovered = hov
        targetScale = hov ? HOVER_SCALE : DEFAULT_SCALE
        targetOpacity = hov ? 0 : 1
      }
      ensureRunning()
    }

    // Reset if the pointer leaves the window while hovering (e.g. the cursor
    // exits the viewport), so the ring never gets stuck enlarged.
    const onLeaveWindow = () => {
      if (hovered) {
        hovered = false
        targetScale = DEFAULT_SCALE
        targetOpacity = 1
        ensureRunning()
      }
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeaveWindow)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeaveWindow)
      if (rafId !== null) cancelAnimationFrame(rafId)
      document.body.classList.remove('cursor-active')
    }
  }, [])

  return (
    <>
      {/* Trailing ring — transparent center, inverts what it crosses. Its
          native size is the hover size, so hovering renders at scale 1 (crisp). */}
      <div
        ref={ringRef}
        aria-hidden
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[100] size-10 rounded-full border-[3px] border-white mix-blend-difference transition-opacity duration-300 will-change-transform transform-gpu',
          enabled ? 'opacity-100' : 'opacity-0',
        )}
      />
      {/* Precise dot — locked to the pointer. */}
      <div
        ref={dotRef}
        aria-hidden
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[100] size-1 rounded-full bg-white mix-blend-difference will-change-transform transform-gpu',
          enabled ? 'opacity-100' : 'opacity-0',
        )}
      />
    </>
  )
}

import { useEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'

import { cn } from '@/lib/utils'

interface MagneticProps {
  children: ReactNode
  className?: string
  /** How strongly the element is pulled toward the cursor (0–1). */
  strength?: number
}

/**
 * Wraps content so it is gently pulled toward the cursor (elastic) on hover.
 * Also tags itself with `data-magnetic` so the custom cursor enlarges over it.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null)
  // Reusable quickTo tweens — created once, just re-targeted on each move.
  // (Spawning a fresh gsap.to on every pointermove was the cause of the
  // mouse-movement lag: dozens of heavy elastic tweens per second stacked
  // up and saturated the main thread.)
  const xToRef = useRef<gsap.QuickToFunc | null>(null)
  const yToRef = useRef<gsap.QuickToFunc | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    xToRef.current = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.3)' })
    yToRef.current = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.3)' })

    return () => {
      xToRef.current?.(0)
      yToRef.current?.(0)
      xToRef.current = null
      yToRef.current = null
    }
  }, [])

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    const xTo = xToRef.current
    const yTo = yToRef.current
    if (!el || !xTo || !yTo) return
    const { height, width, left, top } = el.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    xTo(x * strength)
    yTo(y * strength)
  }

  const handleLeave = () => {
    xToRef.current?.(0)
    yToRef.current?.(0)
  }

  return (
    <span
      ref={ref}
      data-magnetic
      className={cn('inline-block', className)}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </span>
  )
}

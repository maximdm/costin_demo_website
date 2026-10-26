import { useRef, type ReactNode } from 'react'
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

  const handleMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current
    if (!el) return
    const { height, width, left, top } = el.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' })
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

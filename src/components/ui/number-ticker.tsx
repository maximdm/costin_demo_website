import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useMotionValue, useReducedMotion } from 'motion/react'

interface NumberTickerProps {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  /** BCP-47 locale used for grouping separators (e.g. ro -> 10.000). */
  locale?: string
  className?: string
}

/**
 * Counts up from zero to `value` when it scrolls into view.
 * Respects prefers-reduced-motion (renders the final value immediately).
 */
export function NumberTicker({
  value,
  prefix = '',
  suffix = '',
  decimals = 0,
  locale,
  className,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const reduce = useReducedMotion()
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(motionValue, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(latest),
    })
    return () => controls.stop()
  }, [inView, reduce, value, motionValue])

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(display)

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

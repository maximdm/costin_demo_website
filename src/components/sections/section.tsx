import type { ReactNode } from 'react'

import { cn } from '@/lib/utils'

interface SectionProps {
  children: ReactNode
  className?: string
  id?: string
}

/** Consistent vertical rhythm + centered container for page sections. */
export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('container py-20 sm:py-28', className)}>
      {children}
    </section>
  )
}

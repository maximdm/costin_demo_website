import { useEffect, useState } from 'react'

import { LogoLoader } from '@/components/ui/logo-loader'
import { cn } from '@/lib/utils'

/**
 * First-paint loading splash: shows the brand loader, then fades out.
 * Reuses the spinning <LogoLoader /> so the loader widget is actually used.
 */
export function BootOverlay() {
  const [phase, setPhase] = useState<'in' | 'out' | 'done'>('in')

  useEffect(() => {
    const toOut = window.setTimeout(() => setPhase('out'), 550)
    const toDone = window.setTimeout(() => setPhase('done'), 1050)
    return () => {
      window.clearTimeout(toOut)
      window.clearTimeout(toDone)
    }
  }, [])

  if (phase === 'done') return null

  return (
    <div
      className={cn(
        'fixed inset-0 z-[200] flex items-center justify-center bg-background transition-opacity duration-500',
        phase === 'out' ? 'opacity-0' : 'opacity-100',
      )}
    >
      <LogoLoader />
    </div>
  )
}

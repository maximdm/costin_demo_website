import { cn } from '@/lib/utils'

interface LogoLoaderProps {
  className?: string
  /** Visible label under the spinner. Falls back to an sr-only "Loading". */
  label?: string
  /** Pixel size of the spinning symbol. */
  size?: number
}

/**
 * Loading widget built from the brand symbol: the mark spins like a spinner.
 * Use it as a boot splash, Suspense fallback, or inline loader.
 */
export function LogoLoader({ className, label, size = 56 }: LogoLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex flex-col items-center gap-4', className)}
    >
      <img
        src="/symbol_logo.svg"
        alt=""
        aria-hidden
        className="logo-spin"
        style={{ width: size, height: size }}
      />
      {label ? (
        <span className="text-sm text-muted-foreground">{label}</span>
      ) : null}
      <span className="sr-only">{label ?? 'Loading'}</span>
    </div>
  )
}

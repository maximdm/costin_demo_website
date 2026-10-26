import type { ReactNode } from 'react'

import { Reveal } from '@/components/sections/reveal'

interface PageHeaderProps {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  /** Path to an image inside /public (e.g. "/images/image_1.png"). */
  image?: string
  /** Extra classes for the image (e.g. object positioning). */
  imageClassName?: string
  children?: ReactNode
}

/**
 * Two-column page hero used by the inner pages: copy on the left,
 * a decorative PNG on the right (stacks on mobile).
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  image,
  imageClassName,
  children,
}: PageHeaderProps) {
  return (
    <section className="container pt-28 pb-12 sm:pt-32">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="flex flex-col gap-4">
            {eyebrow ? (
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
                {eyebrow}
              </span>
            ) : null}
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              {title}
            </h1>
            {description ? (
              <p className="max-w-xl text-lg text-muted-foreground">
                {description}
              </p>
            ) : null}
            {children ? <div className="mt-2 flex flex-wrap gap-3">{children}</div> : null}
          </div>
        </Reveal>

        {image ? (
          <Reveal delay={0.1}>
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(107,31,161,0.25),transparent_70%)] blur-2xl"
              />
              <img
                src={image}
                alt=""
                loading="lazy"
                decoding="async"
                className={
                  'w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.22)] ' +
                  (imageClassName ?? '')
                }
              />
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  )
}

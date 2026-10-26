import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/cursor/magnetic'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
      {/* Brand symbol watermark — large, low opacity, slow sway + breathe */}
      <img
        src="/symbol_logo.svg"
        alt=""
        aria-hidden
        className="logo-watermark pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] max-h-[640px] max-w-[640px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] -z-10"
      />

      <div className="mx-auto max-w-3xl space-y-8">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary">
          {t('home.hero.badge')}
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {t('home.hero.title')}{' '}
          <span className="text-gradient">{t('home.hero.highlight')}</span>
        </h1>

        <p className="mx-auto max-w-xl text-balance text-lg text-muted-foreground">
          {t('home.hero.description')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Magnetic>
            <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
              <Link to="/contact">
                {t('home.hero.primaryCta')}
                <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
          <Magnetic>
            <Button asChild size="lg" variant="outline">
              <Link to="/services">{t('home.hero.secondaryCta')}</Link>
            </Button>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}

import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import { Magnetic } from '@/components/cursor/magnetic'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Reveal } from '@/components/sections/reveal'

export function CtaSection() {
  const { t } = useTranslation()

  return (
    <section className="container py-20 sm:py-28">
      <Reveal>
        <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_120%_at_50%_0%,rgba(107,31,161,0.18),transparent_70%),radial-gradient(60%_120%_at_50%_100%,rgba(40,121,181,0.18),transparent_70%)]"
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {t('home.cta.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            {t('home.cta.description')}
          </p>
          <div className="mt-8 flex justify-center">
            <Magnetic>
              <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
                <Link to="/contact">
                  {t('home.cta.button')}
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

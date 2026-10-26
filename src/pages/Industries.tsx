import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/sections/section'
import { Reveal } from '@/components/sections/reveal'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Magnetic } from '@/components/cursor/magnetic'

const items = [
  'automotive',
  'energy',
  'pharma',
  'food',
  'machinery',
  'oilgas',
  'logistics',
  'water',
] as const

export default function Industries() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        eyebrow={t('industries.hero.eyebrow')}
        title={t('industries.hero.title')}
        description={t('industries.hero.description')}
        image="/images/image_2.png"
      />

      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((key, i) => (
            <Reveal key={key} delay={(i % 4) * 0.06}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 transition-colors duration-300 hover:border-primary/40">
                <h3 className="text-lg font-medium font-display">
                  {t(`industries.items.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`industries.items.${key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal delay={0.1} className="order-2 lg:order-1">
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(107,31,161,0.22),transparent_70%)] blur-2xl"
            />
            <img
              src="/images/image_7.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
            />
          </div>
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <h2 className="max-w-xl text-3xl font-bold tracking-tight sm:text-4xl">
            {t('industries.cta.title')}
          </h2>
          <p className="mt-4 max-w-xl text-lg text-muted-foreground">
            {t('industries.cta.description')}
          </p>
          <div className="mt-6">
            <Magnetic>
              <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
                <Link to="/contact">
                  {t('industries.cta.button')}
                  <ArrowRight />
                </Link>
              </Button>
            </Magnetic>
          </div>
        </Reveal>
      </Section>
    </>
  )
}

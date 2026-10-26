import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/sections/reveal'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Magnetic } from '@/components/cursor/magnetic'

const categories = [
  'automation',
  'sensors',
  'pneumatics',
  'electronics',
  'drives',
  'connectivity',
] as const

export default function Brands() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        eyebrow={t('brands.hero.eyebrow')}
        title={t('brands.hero.title')}
        description={t('brands.hero.description')}
        image="/images/image_3.png"
      />

      <Section className="pt-4">
        <SectionHeading
          align="left"
          title={t('brands.hero.title')}
          description={t('brands.hero.description')}
          className="mb-10"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((key, i) => (
            <Reveal key={key} delay={(i % 3) * 0.08}>
              <div className="group h-full rounded-2xl border border-border/60 bg-card/40 p-6 transition-colors duration-300 hover:border-primary/40">
                <div className="mb-3 inline-flex size-9 items-center justify-center rounded-lg bg-accent text-primary">
                  <span className="size-2 rounded-full bg-brand-gradient" />
                </div>
                <h3 className="text-lg font-medium font-display">
                  {t(`brands.categories.${key}.name`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`brands.categories.${key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-xs text-muted-foreground/70">
          {t('brands.disclaimer')}
        </p>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {t('brands.cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t('brands.cta.description')}
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
                  <Link to="/contact">
                    {t('brands.cta.button')}
                    <ArrowRight />
                  </Link>
                </Button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  )
}

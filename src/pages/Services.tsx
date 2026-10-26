import { useTranslation } from 'react-i18next'
import { ArrowRight, CalendarClock, Check, PackageSearch, SlidersHorizontal } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/sections/reveal'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { Magnetic } from '@/components/cursor/magnetic'

const items = ['procurement', 'customization', 'planning'] as const
const icons = {
  procurement: PackageSearch,
  customization: SlidersHorizontal,
  planning: CalendarClock,
} as const

export default function Services() {
  const { t } = useTranslation()

  const steps = t('services.process.steps', { returnObjects: true }) as Array<{
    title: string
    description: string
  }>

  return (
    <>
      <PageHeader
        eyebrow={t('services.hero.eyebrow')}
        title={t('services.hero.title')}
        description={t('services.hero.description')}
        image="/images/image_1.png"
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((key, i) => {
            const Icon = icons[key]
            const benefits = t(`services.items.${key}.benefits`, {
              returnObjects: true,
            }) as string[]
            return (
              <Reveal key={key} delay={i * 0.1}>
                <Card className="h-full">
                  <CardHeader>
                    <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white glow-brand">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle>{t(`services.items.${key}.title`)}</CardTitle>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {t(`services.items.${key}.longDescription`)}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-2">
                          <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                            <Check className="size-3" />
                          </span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </Section>

      {/* Process + supporting image */}
      <Section className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow={t('services.process.eyebrow')}
            title={t('services.process.title')}
            description={t('services.process.description')}
            className="mb-8"
          />
          <ol className="space-y-5">
            {steps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border/60 bg-card text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-medium font-display">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-6 -z-10 rounded-full bg-[radial-gradient(circle,rgba(40,121,181,0.22),transparent_70%)] blur-2xl"
            />
            <img
              src="/images/image_6.png"
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full object-contain drop-shadow-[0_18px_40px_rgba(0,0,0,0.22)]"
            />
          </div>
        </Reveal>
      </Section>

      <Section className="pt-0">
        <Reveal>
          <div className="glass-panel relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
              {t('services.cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              {t('services.cta.description')}
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
                  <Link to="/contact">
                    {t('services.cta.button')}
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

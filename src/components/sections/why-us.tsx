import { useTranslation } from 'react-i18next'
import { Cpu, Gauge, Globe, ShieldCheck } from 'lucide-react'

import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/sections/reveal'

const items = ['expertise', 'speed', 'reliability', 'coverage'] as const

const icons = {
  expertise: Cpu,
  speed: Gauge,
  reliability: ShieldCheck,
  coverage: Globe,
} as const

export function WhyUs() {
  const { t } = useTranslation()

  return (
    <Section id="why">
      <SectionHeading
        eyebrow={t('home.why.eyebrow')}
        title={t('home.why.title')}
        description={t('home.why.description')}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((key, i) => {
          const Icon = icons[key]
          return (
            <Reveal key={key} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-border/60 bg-card/40 p-6">
                <div className="mb-4 inline-flex size-10 items-center justify-center rounded-xl bg-accent text-primary">
                  <Icon className="size-5" />
                </div>
                <h3 className="text-lg font-medium font-display">
                  {t(`home.why.items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {t(`home.why.items.${key}.description`)}
                </p>
              </div>
            </Reveal>
          )
        })}
      </div>
    </Section>
  )
}

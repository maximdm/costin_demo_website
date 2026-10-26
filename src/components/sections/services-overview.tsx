import { useTranslation } from 'react-i18next'
import { CalendarClock, Check, PackageSearch, SlidersHorizontal } from 'lucide-react'

import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/sections/reveal'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const items = ['procurement', 'customization', 'planning'] as const

const icons = {
  procurement: PackageSearch,
  customization: SlidersHorizontal,
  planning: CalendarClock,
} as const

export function ServicesOverview() {
  const { t } = useTranslation()

  return (
    <Section id="services">
      <SectionHeading
        eyebrow={t('home.services.eyebrow')}
        title={t('home.services.title')}
        description={t('home.services.description')}
      />

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((key, i) => {
          const Icon = icons[key]
          const features = t(`home.services.items.${key}.features`, {
            returnObjects: true,
          }) as string[]
          return (
            <Reveal key={key} delay={i * 0.1}>
              <Card className="h-full transition-transform duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-2 inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient text-white glow-brand">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{t(`home.services.items.${key}.title`)}</CardTitle>
                  <CardDescription>
                    {t(`home.services.items.${key}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-accent text-primary">
                          <Check className="size-3" />
                        </span>
                        {feature}
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
  )
}

import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'
import { Reveal } from '@/components/sections/reveal'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const preview = ['automotive', 'energy', 'pharma', 'machinery', 'oilgas', 'logistics'] as const

export function IndustriesPreview() {
  const { t } = useTranslation()

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow={t('home.industries.eyebrow')}
        title={t('home.industries.title')}
        description={t('home.industries.description')}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {preview.map((key, i) => (
          <Reveal key={key} delay={i * 0.06}>
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

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/industries">
            {t('home.industries.cta')}
            <ArrowRight />
          </Link>
        </Button>
      </div>
    </Section>
  )
}

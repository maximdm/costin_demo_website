import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { Section } from '@/components/sections/section'
import { SectionHeading } from '@/components/sections/section-heading'

const categories = [
  'automation',
  'sensors',
  'pneumatics',
  'electronics',
  'drives',
  'connectivity',
] as const

export function BrandsMarquee() {
  const { t } = useTranslation()
  const items = categories.map((key) => t(`brands.categories.${key}.name`))
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...items, ...items]

  return (
    <Section id="brands" className="overflow-hidden">
      <SectionHeading
        eyebrow={t('home.brands.eyebrow')}
        title={t('home.brands.title')}
        description={t('home.brands.description')}
      />

      <div className="relative flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div className="flex shrink-0 items-center gap-3 pr-3 marquee-track">
          {loop.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/40 px-5 py-2.5 text-sm font-medium text-muted-foreground whitespace-nowrap"
            >
              <span className="size-2 rounded-full bg-brand-gradient" />
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link to="/brands">{t('home.brands.cta')}</Link>
        </Button>
      </div>
    </Section>
  )
}

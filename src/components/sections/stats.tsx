import { useTranslation } from 'react-i18next'

import { NumberTicker } from '@/components/ui/number-ticker'
import { Reveal } from '@/components/sections/reveal'
import { Section } from '@/components/sections/section'

const stats = ['years', 'brands', 'components', 'response'] as const

export function Stats() {
  const { t, i18n } = useTranslation()
  const locale = i18n.language

  const numeric: Record<(typeof stats)[number], number> = {
    years: 15,
    brands: 30,
    components: 100,
    response: 24,
  }
  const suffix: Record<(typeof stats)[number], string> = {
    years: '+',
    brands: '+',
    components: '+',
    response: 'h',
  }

  return (
    <Section id="stats" className="py-16">
      <div className="grid grid-cols-2 gap-y-10 md:grid-cols-4">
        {stats.map((key, i) => (
          <Reveal key={key} delay={i * 0.1}>
            <div className="flex flex-col items-center text-center">
              <span className="text-4xl font-bold tracking-tight font-display text-gradient sm:text-5xl">
                <NumberTicker
                  value={numeric[key]}
                  suffix={suffix[key]}
                  locale={locale}
                />
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {t(`home.stats.${key}.label`)}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

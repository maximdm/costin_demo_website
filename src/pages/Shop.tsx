import { useTranslation } from 'react-i18next'
import { ArrowRight, PackageOpen } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/sections/section'
import { Reveal } from '@/components/sections/reveal'
import { Badge } from '@/components/ui/badge'
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

export default function Shop() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        eyebrow={t('shop.hero.eyebrow')}
        title={t('shop.hero.title')}
        description={t('shop.hero.description')}
        image="/images/image_4.png"
      >
        <Badge className="bg-brand-gradient text-white">{t('shop.hero.badge')}</Badge>
      </PageHeader>

      <Section className="pt-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((key, i) => (
            <Reveal key={key} delay={(i % 3) * 0.08}>
              <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-[radial-gradient(circle,rgba(107,31,161,0.18),transparent_70%)] blur-xl"
                />
                <div className="relative">
                  <h3 className="text-lg font-medium font-display">
                    {t(`shop.categories.${key}`)}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`brands.categories.${key}.description`)}
                  </p>
                </div>
                <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <PackageOpen className="size-4" />
                  {t('shop.product.comingSoon')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted-foreground">
          {t('shop.hero.description')}
        </p>

        <div className="mt-8 flex justify-center">
          <Magnetic>
            <Button asChild size="lg" className="bg-brand-gradient text-white hover:opacity-90">
              <Link to="/contact">
                {t('common.cta.requestQuote')}
                <ArrowRight />
              </Link>
            </Button>
          </Magnetic>
        </div>
      </Section>
    </>
  )
}

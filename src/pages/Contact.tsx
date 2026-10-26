import { useTranslation } from 'react-i18next'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { PageHeader } from '@/components/layout/page-header'
import { Section } from '@/components/sections/section'
import { Reveal } from '@/components/sections/reveal'
import { CustomRequestForm } from '@/components/contact/custom-request-form'
import { company } from '@/data/company'

export default function Contact() {
  const { t } = useTranslation()

  const info = [
    { icon: MapPin, label: t('contact.info.address.label'), value: t('contact.info.address.value'), href: undefined },
    { icon: Mail, label: t('contact.info.email.label'), value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: t('contact.info.phone.label'), value: company.phone, href: `tel:${company.phone}` },
    { icon: Clock, label: t('contact.info.hours.label'), value: t('contact.info.hours.value'), href: undefined },
  ] as const

  return (
    <>
      <PageHeader
        eyebrow={t('contact.hero.eyebrow')}
        title={t('contact.hero.title')}
        description={t('contact.hero.description')}
        image="/images/image_5.png"
      />

      <Section className="pt-4">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <CustomRequestForm />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex flex-col gap-4">
              {info.map((item) => {
                const Icon = item.icon
                const inner = (
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-border/60 bg-card/40 p-5">
                    <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm font-medium">{item.value}</p>
                    </div>
                  </div>
                )
                return (
                  <div key={item.label} className="h-full">
                    {item.href ? (
                      <a href={item.href} className="block h-full">
                        {inner}
                      </a>
                    ) : (
                      inner
                    )}
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}

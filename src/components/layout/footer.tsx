import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { company } from '@/data/company'

const navLinks = [
  { to: '/', key: 'home' },
  { to: '/services', key: 'services' },
  { to: '/industries', key: 'industries' },
  { to: '/brands', key: 'brands' },
  { to: '/shop', key: 'shop' },
  { to: '/contact', key: 'contact' },
] as const

const CURRENT_YEAR = new Date().getFullYear()

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="px-4 pb-4">
      <div className="glass-panel pattern2 relative mx-auto max-w-6xl rounded-3xl">
        <div className="grid gap-10 p-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5" aria-label={t('common.company')}>
              <img
                src="/symbol_logo.svg"
                alt=""
                className="size-10 drop-shadow-[0_0_12px_rgba(107,31,161,0.45)]"
              />
              <span className="text-lg font-bold tracking-tight font-display">
                Easy <span className="text-gradient">Tech</span>
              </span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">{t('footer.description')}</p>
            <p className="text-xs text-muted-foreground/70">{t('footer.location')}</p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t('nav.menu')}</h3>
            <ul className="space-y-2 text-sm">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="rounded-md px-1 -mx-1 text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold">{t('contact.info.title')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{t('contact.info.address.value')}</li>
              <li>
                {t('contact.info.email.label')}:{' '}
                <a href={`mailto:${company.email}`} className="hover:text-foreground">
                  {company.email}
                </a>
              </li>
              <li>
                {t('contact.info.phone.label')}:{' '}
                <a href={`tel:${company.phone}`} className="hover:text-foreground">
                  {company.phone}
                </a>
              </li>
              <li>{t('contact.info.hours.value')}</li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <LanguageSwitcher />
            <p className="text-xs text-muted-foreground/70">{t('common.tagline')}</p>
          </div>
        </div>

        <div className="border-t border-border/60">
          <div className="flex flex-col items-center justify-between gap-3 px-8 py-6 text-xs text-muted-foreground md:flex-row">
            <p>{t('footer.copyright', { year: CURRENT_YEAR })}</p>
            <div className="flex gap-5">
              <a href="#" className="transition-colors hover:text-foreground">
                {t('footer.links.privacy')}
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                {t('footer.links.terms')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

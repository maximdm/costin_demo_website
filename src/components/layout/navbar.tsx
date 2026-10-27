import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/layout/theme-toggle'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { Magnetic } from '@/components/cursor/magnetic'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/layout/nav-items'

// TODO: replace with the company's real contact details.
const CONTACT_PHONE = '+40 21 000 0000'
const CONTACT_EMAIL = 'contact@easytech.ro'
const PHONE_HREF = `tel:${CONTACT_PHONE.replace(/\s+/g, '')}`
const EMAIL_HREF = `mailto:${CONTACT_EMAIL}`

function BrandLink() {
  const { t } = useTranslation()
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label={t('common.company')}>
      <img
        src="/symbol_logo.svg"
        alt=""
        className="size-9 drop-shadow-[0_0_12px_rgba(107,31,161,0.45)]"
      />
      <span className="text-lg font-bold tracking-tight font-display">
        Easy <span className="text-gradient">Tech</span>
      </span>
    </Link>
  )
}

function navLinkClass({ isActive }: { isActive: boolean }) {
  return cn(
    'rounded-full px-4 py-2 text-sm font-medium transition-all duration-300',
    isActive
      ? 'bg-muted text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]'
      : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
  )
}

export function Navbar() {
  const { t } = useTranslation()

  return (
    <header className="sticky top-0 z-50 w-full px-4 pt-3">
      <div className="glass-panel pattern2 relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 rounded-2xl px-3">
        <BrandLink />

        {/* Desktop nav — absolutely centered regardless of side widths */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={navLinkClass}>
              {t(`nav.${item.key}`)}
            </NavLink>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeToggle />

          <Magnetic className="hidden lg:inline-flex">
            <Button asChild className="bg-brand-gradient text-white hover:opacity-90">
              <Link to="/contact">
                {t('common.cta.requestQuote')}
                <ArrowRight />
              </Link>
            </Button>
          </Magnetic>

          <MobileMenu phoneHref={PHONE_HREF} emailHref={EMAIL_HREF} />
        </div>
      </div>
    </header>
  )
}

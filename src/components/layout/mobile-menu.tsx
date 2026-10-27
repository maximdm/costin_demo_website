import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'
import { ArrowRight, Mail, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/layout/nav-items'

interface MobileMenuProps {
  phoneHref?: string
  emailHref?: string
}

/**
 * Redesigned mobile/tablet navigation: a glass slide-in panel with a branded
 * header, large tappable links (with hover affordance), and a pinned CTA +
 * quick call/email actions at the bottom.
 */
export function MobileMenu({ phoneHref, emailHref }: MobileMenuProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            'hamburger h-8 w-7 p-0 hover:bg-transparent lg:hidden',
            open && 'is-active',
          )}
          aria-label={t('nav.openMenu')}
        >
          <span />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="gap-0 border-border/60 backdrop-blur-xl"
      >
        <SheetTitle className="sr-only">{t('nav.menu')}</SheetTitle>

        {/* Branded header */}
        <div className="flex items-center gap-2.5 border-b border-border/60 px-5 py-4">
          <img
            src="/symbol_logo.svg"
            alt=""
            className="size-8 drop-shadow-[0_0_12px_rgba(107,31,161,0.45)]"
          />
          <span className="text-base font-bold font-display tracking-tight">
            Easy <span className="text-gradient">Tech</span>
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'group flex items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground',
                )
              }
            >
              <span>{t(`nav.${item.key}`)}</span>
              <ArrowRight className="size-4 -translate-x-1 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100" />
            </NavLink>
          ))}
        </nav>

        {/* Pinned actions */}
        <div className="space-y-3 border-t border-border/60 p-5">
          {(phoneHref || emailHref) && (
            <div className="grid grid-cols-2 gap-2">
              {phoneHref && (
                <Button asChild variant="outline">
                  <a href={phoneHref} aria-label={t('common.cta.call')}>
                    <Phone className="size-4" />
                    {t('common.cta.call')}
                  </a>
                </Button>
              )}
              {emailHref && (
                <Button asChild variant="outline">
                  <a href={emailHref} aria-label={t('common.cta.email')}>
                    <Mail className="size-4" />
                    {t('common.cta.email')}
                  </a>
                </Button>
              )}
            </div>
          )}
          <Button
            asChild
            size="lg"
            className="w-full bg-brand-gradient text-white hover:opacity-90"
          >
            <Link to="/contact" onClick={() => setOpen(false)}>
              {t('common.cta.requestQuote')}
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

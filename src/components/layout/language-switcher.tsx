import { useTranslation } from 'react-i18next'
import { Check, Globe } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { languages, type Language } from '@/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  const current = ((i18n.resolvedLanguage ?? i18n.language) || 'ro').slice(0, 2) as Language

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" aria-label={t('common.language.label')}>
          <Globe />
          <span className="text-xs font-semibold uppercase tracking-wider">{current}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {languages.map((lng) => (
          <DropdownMenuItem
            key={lng}
            onSelect={() => void i18n.changeLanguage(lng)}
            className="justify-between gap-6"
          >
            {t(`common.language.${lng}`)}
            <Check
              className={cn('size-4', current === lng ? 'opacity-100' : 'opacity-0')}
              aria-hidden
            />
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

export default function NotFound() {
  const { t } = useTranslation()
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center gap-4 text-center">
      <p className="text-7xl font-bold text-gradient">404</p>
      <h1 className="text-2xl font-semibold">{t('notFound.title')}</h1>
      <p className="max-w-md text-muted-foreground">{t('notFound.description')}</p>
      <Button asChild className="bg-brand-gradient text-white hover:opacity-90">
        <Link to="/">
          <ArrowLeft />
          {t('notFound.button')}
        </Link>
      </Button>
    </div>
  )
}

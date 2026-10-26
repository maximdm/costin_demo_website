import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { MotionConfig } from 'motion/react'
import { useTranslation } from 'react-i18next'

import { BootOverlay } from '@/components/layout/boot-overlay'
import { CustomCursor } from '@/components/cursor/custom-cursor'
import { Footer } from '@/components/layout/footer'
import { Navbar } from '@/components/layout/navbar'
import { LogoLoader } from '@/components/ui/logo-loader'

export function Layout() {
  const { t } = useTranslation()
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-svh flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:shadow-lg focus:ring-2 focus:ring-ring"
        >
          {t('common.skipToContent')}
        </a>

        {/* Full-page ambient brand glow — fixed so it never clips at a section edge */}
        <div
          aria-hidden
          className="brand-glow pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(42%_42%_at_28%_26%,rgba(107,31,161,0.22),transparent_70%),radial-gradient(38%_38%_at_72%_62%,rgba(40,121,181,0.20),transparent_70%)]"
        />
        <Navbar />
        <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
          <Suspense
            fallback={
              <div className="flex min-h-[60vh] items-center justify-center">
                <LogoLoader />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <CustomCursor />
        <BootOverlay />

        {/* Floating "Demo" indicator — fixed bottom-right, site-wide */}
        <span
          aria-hidden
          className="pointer-events-none fixed bottom-4 right-4 z-[200] rounded-full bg-destructive px-3 py-1.5 text-xs font-semibold text-white shadow-lg shadow-destructive/30"
        >
          {t('footer.demo')}
        </span>
      </div>
    </MotionConfig>
  )
}

'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import { getMessages, t, type Locale } from '@/lib/i18n'

export function useLocale(): Locale {
  const pathname = usePathname()
  const segment = pathname?.split('/')[1]
  return segment === 'en' ? 'en' : 'fr'
}

export function useTranslations(): (key: string) => string {
  const locale = useLocale()
  const m = useMemo(() => getMessages(locale), [locale])
  return (key: string) => t(m, key)
}

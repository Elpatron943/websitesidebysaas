import fr from '@/messages/fr'
import en from '@/messages/en'

export type Locale = 'fr' | 'en'

export const locales: Locale[] = ['fr', 'en']
export const defaultLocale: Locale = 'fr'

export function isValidLocale(s: string): s is Locale {
  return s === 'fr' || s === 'en'
}

export type Messages = typeof fr

const messagesMap: Record<Locale, Messages> = { fr, en }

export function getMessages(locale: Locale): Messages {
  return messagesMap[locale] ?? fr
}

/** Helper to get nested key: t(messages, 'home.problem.title') */
export function t(m: Messages, key: string): string {
  const parts = key.split('.')
  let current: unknown = m
  for (const part of parts) {
    if (current != null && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part]
    } else {
      return key
    }
  }
  return typeof current === 'string' ? current : key
}

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const LOCALE_COOKIE = 'NEXT_LOCALE'
const locales = ['fr', 'en'] as const

function getLocaleFromPath(pathname: string): string | null {
  const segment = pathname.split('/')[1]
  return locales.includes(segment as (typeof locales)[number]) ? segment : null
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const localeInPath = getLocaleFromPath(pathname)

  // Already has locale prefix: set cookie, pass locale to layout, continue
  if (localeInPath) {
    const res = NextResponse.next()
    res.cookies.set(LOCALE_COOKIE, localeInPath, { path: '/' })
    res.headers.set('x-next-locale', localeInPath)
    return res
  }

  // No locale: redirect to /fr/...
  const defaultLocale = 'fr'
  const newPath = pathname === '/' ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`
  const url = request.nextUrl.clone()
  url.pathname = newPath
  const res = NextResponse.redirect(url)
  res.cookies.set(LOCALE_COOKIE, defaultLocale, { path: '/' })
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logo).*)'],
}

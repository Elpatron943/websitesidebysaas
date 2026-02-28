'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavLogo } from '@/app/components/NavLogo'
import { AcheteurNavMenu } from '@/app/components/AcheteurNavMenu'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'

const BLOG_CATEGORY_KEYS: { slug: string; key: string }[] = [
  { slug: 'comparaison-benchmarks', key: 'header.categoryComparison' },
  { slug: 'prix-negociation', key: 'header.categoryPricing' },
  { slug: 'etudes-tendances', key: 'header.categoryStudies' },
]

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

const navItemClass =
  'flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-all duration-150'
const navItemOpenClass = 'text-blue-700 bg-blue-50'
const dropdownPanelClass =
  'absolute top-full left-0 mt-1.5 min-w-[12rem] bg-white rounded-xl shadow-lg border border-slate-200/80 py-1.5 z-50'

const iconWrapClass = 'flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-blue-100 group-hover:text-blue-600 group-data-[open]:bg-blue-100 group-data-[open]:text-blue-600'

function IconAcheteur({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}
function IconEditeur({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  )
}
function IconBlog({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
    </svg>
  )
}
function IconForum({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
function IconConnexion({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
  )
}
function IconCommencer({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}
function ChevronDown({ open }: { open: boolean }) {
  return (
    <svg className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
function IconMenu({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}
function IconX({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

export function SiteHeader() {
  const platformUrl = PLATFORM_URL
  const t = useTranslations()
  const locale = useLocale()
  const pathname = usePathname()
  const prefix = `/${locale}`
  const otherLocale = locale === 'en' ? 'fr' : 'en'
  const switchPath = pathname ? `/${otherLocale}${pathname.replace(/^\/[a-z]{2}/, '') || ''}` : `/${otherLocale}`
  const [openMenu, setOpenMenu] = useState<'acheteur' | 'editeur' | 'blog' | null>(null)
  const [authOpen, setAuthOpen] = useState<'connexion' | 'commencer' | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileAccordion, setMobileAccordion] = useState<'acheteur' | 'editeur' | 'blog' | 'connexion' | 'commencer' | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
    setMobileAccordion(null)
  }

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null)
        setAuthOpen(null)
      }
    }
    if (openMenu || authOpen) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [openMenu, authOpen])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
      setOpenMenu(null)
      setAuthOpen(null)
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <div className="bg-primary-600 text-white text-center py-2 px-4 text-sm font-medium" role="status">
        {t('home.freeUntilApril')}
      </div>
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between gap-6">
          <Link
            href={prefix}
            className="flex items-center shrink-0 transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-lg"
            aria-label="Side by SaaS"
          >
            <NavLogo height={48} />
          </Link>

          {/* Sélecteur de langue */}
          <div className="flex items-center gap-1 shrink-0">
            <Link href={switchPath} className="px-2 py-1.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900" aria-label={locale === 'fr' ? 'Switch to English' : 'Passer en français'}>
              {locale === 'fr' ? 'EN' : 'FR'}
            </Link>
          </div>

          {/* Bouton menu mobile + espaceur */}
          <div className="flex items-center flex-1 md:flex-none md:flex-0">
            <button
              type="button"
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:bg-slate-200 transition-colors touch-manipulation"
              onClick={(e) => { e.stopPropagation(); setMobileMenuOpen(true) }}
              aria-label={t('header.openMenu')}
              aria-expanded={mobileMenuOpen}
            >
              <IconMenu />
            </button>
          </div>

          <nav ref={navRef} className="hidden md:flex md:items-center md:gap-1 md:flex-1 md:justify-center">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'acheteur' ? null : 'acheteur') }}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${openMenu === 'acheteur' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                aria-expanded={openMenu === 'acheteur'}
                aria-haspopup="true"
                data-open={openMenu === 'acheteur' ? true : undefined}
              >
                <span className={iconWrapClass}>
                  <IconAcheteur />
                </span>
                <span className="whitespace-nowrap">{t('header.useSaaS')}</span>
                <ChevronDown open={openMenu === 'acheteur'} />
              </button>
              {openMenu === 'acheteur' && (
                <AcheteurNavMenu linkStyle="link" onNavigate={() => setOpenMenu(null)} isOpen={true} localePrefix={prefix} />
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'editeur' ? null : 'editeur') }}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${openMenu === 'editeur' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                aria-expanded={openMenu === 'editeur'}
                aria-haspopup="true"
                data-open={openMenu === 'editeur' ? true : undefined}
              >
                <span className={iconWrapClass}>
                  <IconEditeur />
                </span>
                <span className="whitespace-nowrap">{t('header.iAmEditor')}</span>
                <ChevronDown open={openMenu === 'editeur'} />
              </button>
              {openMenu === 'editeur' && (
                <div className={dropdownPanelClass}>
                  <Link href={`${prefix}/editeur/product`} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">Product</Link>
                  <Link href={`${prefix}/editeur/sales`} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">Sales</Link>
                  <Link href={`${prefix}/editeur/marketing`} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">Marketing</Link>
                  <div className="my-1 border-t border-slate-100" />
                  <a href={`${platformUrl}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-blue-600 hover:bg-blue-50 font-semibold transition-colors">{t('header.createEditorSpace')}</a>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'blog' ? null : 'blog') }}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${openMenu === 'blog' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                aria-expanded={openMenu === 'blog'}
                aria-haspopup="true"
                data-open={openMenu === 'blog' ? true : undefined}
              >
                <span className={iconWrapClass}>
                  <IconBlog />
                </span>
                <span>{t('header.blog')}</span>
                <ChevronDown open={openMenu === 'blog'} />
              </button>
              {openMenu === 'blog' && (
                <div className={dropdownPanelClass}>
                  <Link href={`${prefix}/blog`} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t('header.allCategories')}</Link>
                  {BLOG_CATEGORY_KEYS.map((cat) => (
                    <Link key={cat.slug} href={`${prefix}/blog?category=${encodeURIComponent(cat.slug)}`} className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t(cat.key)}</Link>
                  ))}
                </div>
              )}
            </div>
            <a
              href="https://app.sidebysaas.com/forum"
              target="_blank"
              rel="noopener noreferrer"
              className={`${navItemClass} group`}
            >
              <span className={iconWrapClass}>
                <IconForum />
              </span>
              <span>{t('header.forum')}</span>
            </a>
          </nav>

          <div className="flex shrink-0 items-center gap-2 pl-2 md:border-l md:border-slate-200 md:pl-4">
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setAuthOpen(authOpen === 'connexion' ? null : 'connexion') }}
                className={`group flex items-center gap-2.5 rounded-xl px-3 py-2 text-sm font-semibold transition-all duration-150 ${authOpen === 'connexion' ? 'bg-blue-50 text-blue-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'}`}
                aria-expanded={authOpen === 'connexion'}
                aria-haspopup="true"
                data-open={authOpen === 'connexion' ? true : undefined}
              >
                <span className={iconWrapClass}>
                  <IconConnexion />
                </span>
                <span>{t('header.login')}</span>
                <ChevronDown open={authOpen === 'connexion'} />
              </button>
              {authOpen === 'connexion' && (
                <div className="absolute right-0 top-full mt-1.5 min-w-[11rem] bg-white rounded-xl shadow-lg border border-slate-200/80 py-1.5 z-50">
                  <a href={`${platformUrl}/auth/login?redirectTo=/buyer`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t('header.buyerPortal')}</a>
                  <a href={`${platformUrl}/auth/login?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t('header.editorPortal')}</a>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setAuthOpen(authOpen === 'commencer' ? null : 'commencer') }}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-expanded={authOpen === 'commencer'}
                aria-haspopup="true"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                  <IconCommencer />
                </span>
                <span>{t('header.getStarted')}</span>
                <ChevronDown open={authOpen === 'commencer'} />
              </button>
              {authOpen === 'commencer' && (
                <div className="absolute right-0 top-full mt-1.5 min-w-[12rem] bg-white rounded-xl shadow-lg border border-slate-200/80 py-1.5 z-50">
                  <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t('header.createBuyerAccount')}</a>
                  <a href={`${platformUrl}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium transition-colors">{t('header.createEditorAccount')}</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu mobile (drawer) - rendu via portal pour éviter les problèmes de z-index/overflow */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <>
          <div
            className="fixed inset-0 z-[100] bg-slate-900/20 md:hidden"
            aria-hidden
            onClick={closeMobileMenu}
          />
          <div
            className="fixed top-14 left-0 right-0 bottom-0 z-[101] bg-white shadow-xl overflow-y-auto md:hidden"
            role="dialog"
            aria-label="Menu de navigation"
          >
            <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 shrink-0">
              <span className="text-sm font-semibold text-slate-700">{t('header.menu')}</span>
              <button
                type="button"
                className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                onClick={closeMobileMenu}
                aria-label={t('header.closeMenu')}
              >
                <IconX />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              <div className="border-b border-slate-100">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-left text-slate-700 font-medium hover:text-slate-900"
                  onClick={() => setMobileAccordion(mobileAccordion === 'acheteur' ? null : 'acheteur')}
                  aria-expanded={mobileAccordion === 'acheteur'}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={iconWrapClass}><IconAcheteur className="h-4 w-4" /></span>
                    {t('header.useSaaS')}
                  </span>
                  <ChevronDown open={mobileAccordion === 'acheteur'} />
                </button>
                {mobileAccordion === 'acheteur' && (
                  <div className="pb-2 pl-1">
                    <AcheteurNavMenu linkStyle="link" onNavigate={closeMobileMenu} isOpen variant="inline" localePrefix={prefix} />
                  </div>
                )}
              </div>

              <div className="border-b border-slate-100">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-left text-slate-700 font-medium hover:text-slate-900"
                  onClick={() => setMobileAccordion(mobileAccordion === 'editeur' ? null : 'editeur')}
                  aria-expanded={mobileAccordion === 'editeur'}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={iconWrapClass}><IconEditeur className="h-4 w-4" /></span>
                    {t('header.iAmEditor')}
                  </span>
                  <ChevronDown open={mobileAccordion === 'editeur'} />
                </button>
                {mobileAccordion === 'editeur' && (
                  <div className="pb-2 pl-1 space-y-0.5">
                    <Link href={`${prefix}/editeur/product`} className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>Product</Link>
                    <Link href={`${prefix}/editeur/sales`} className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>Sales</Link>
                    <Link href={`${prefix}/editeur/marketing`} className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>Marketing</Link>
                    <div className="my-2 border-t border-slate-100" />
                    <a href={`${platformUrl}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block py-2.5 px-4 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-lg" onClick={closeMobileMenu}>{t('header.createEditorSpace')}</a>
                  </div>
                )}
              </div>

              <div className="border-b border-slate-100">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-left text-slate-700 font-medium hover:text-slate-900"
                  onClick={() => setMobileAccordion(mobileAccordion === 'blog' ? null : 'blog')}
                  aria-expanded={mobileAccordion === 'blog'}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={iconWrapClass}><IconBlog className="h-4 w-4" /></span>
                    {t('header.blog')}
                  </span>
                  <ChevronDown open={mobileAccordion === 'blog'} />
                </button>
                {mobileAccordion === 'blog' && (
                  <div className="pb-2 pl-1 space-y-0.5">
                    <Link href={`${prefix}/blog`} className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t('header.allCategories')}</Link>
                    {BLOG_CATEGORY_KEYS.map((cat) => (
                      <Link key={cat.slug} href={`${prefix}/blog?category=${encodeURIComponent(cat.slug)}`} className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t(cat.key)}</Link>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-b border-slate-100">
                <a
                  href="https://app.sidebysaas.com/forum"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 py-3 text-slate-700 font-medium hover:text-slate-900"
                  onClick={closeMobileMenu}
                >
                  <span className={iconWrapClass}><IconForum className="h-4 w-4" /></span>
                  {t('header.forum')}
                </a>
              </div>

              <div className="border-b border-slate-100">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-left text-slate-700 font-medium hover:text-slate-900"
                  onClick={() => setMobileAccordion(mobileAccordion === 'connexion' ? null : 'connexion')}
                  aria-expanded={mobileAccordion === 'connexion'}
                >
                  <span className="flex items-center gap-2.5">
                    <span className={iconWrapClass}><IconConnexion className="h-4 w-4" /></span>
                    {t('header.login')}
                  </span>
                  <ChevronDown open={mobileAccordion === 'connexion'} />
                </button>
                {mobileAccordion === 'connexion' && (
                  <div className="pb-2 pl-1 space-y-0.5">
                    <a href={`${platformUrl}/auth/login?redirectTo=/buyer`} target="_blank" rel="noopener noreferrer" className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t('header.buyerPortal')}</a>
                    <a href={`${platformUrl}/auth/login?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t('header.editorPortal')}</a>
                  </div>
                )}
              </div>

              <div className="border-b border-slate-100">
                <button
                  type="button"
                  className="flex items-center justify-between w-full py-3 text-left text-slate-700 font-medium hover:text-slate-900"
                  onClick={() => setMobileAccordion(mobileAccordion === 'commencer' ? null : 'commencer')}
                  aria-expanded={mobileAccordion === 'commencer'}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600"><IconCommencer className="h-4 w-4" /></span>
                    {t('header.getStarted')}
                  </span>
                  <ChevronDown open={mobileAccordion === 'commencer'} />
                </button>
                {mobileAccordion === 'commencer' && (
                  <div className="pb-2 pl-1 space-y-0.5">
                    <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} target="_blank" rel="noopener noreferrer" className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t('header.createBuyerAccount')}</a>
                    <a href={`${platformUrl}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="block py-2.5 px-4 text-sm text-slate-700 hover:bg-slate-50 rounded-lg" onClick={closeMobileMenu}>{t('header.createEditorAccount')}</a>
                  </div>
                )}
              </div>
            </nav>
          </div>
        </>,
        document.body
      )}
    </header>
    </>
  )
}

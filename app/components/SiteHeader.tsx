'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { NavLogo } from '@/app/components/NavLogo'
import { AcheteurNavMenu } from '@/app/components/AcheteurNavMenu'

const BLOG_CATEGORIES = [
  { slug: 'pour-les-acheteurs', name: 'Pour les acheteurs' },
  { slug: 'pour-les-editeurs', name: 'Pour les éditeurs' },
  { slug: 'comparaison-benchmarks', name: 'Comparaison & benchmarks' },
  { slug: 'prix-negociation', name: 'Prix & négociation' },
  { slug: 'etudes-tendances', name: 'Études & tendances' },
  { slug: 'actualites-sidebysaas', name: 'Actualités Side by SaaS' },
]

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export function SiteHeader() {
  const platformUrl = PLATFORM_URL
  const [openMenu, setOpenMenu] = useState<'acheteur' | 'editeur' | 'blog' | null>(null)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    if (openMenu) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [openMenu])

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <NavLogo height={90} />
          </Link>
          <nav ref={navRef} className="hidden md:flex items-center gap-1 relative">
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'acheteur' ? null : 'acheteur') }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors"
              >
                J&apos;utilise des SaaS
                <svg className={`w-4 h-4 transition-transform ${openMenu === 'acheteur' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenu === 'acheteur' && (
                <AcheteurNavMenu linkStyle="link" onNavigate={() => setOpenMenu(null)} isOpen={openMenu === 'acheteur'} />
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'editeur' ? null : 'editeur') }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors"
              >
                Je suis éditeur de SaaS
                <svg className={`w-4 h-4 transition-transform ${openMenu === 'editeur' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenu === 'editeur' && (
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <Link href="/editeur/product" className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Product</Link>
                  <Link href="/editeur/sales" className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Sales</Link>
                  <Link href="/editeur/marketing" className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Marketing</Link>
                  <div className="mt-1">
                    <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="block w-full text-left px-4 py-2.5 text-blue-600 hover:bg-blue-50 font-semibold">Créer mon espace éditeur →</a>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === 'blog' ? null : 'blog') }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors"
              >
                Blog
                <svg className={`w-4 h-4 transition-transform ${openMenu === 'blog' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openMenu === 'blog' && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <Link href="/blog" className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Toutes les catégories</Link>
                  {BLOG_CATEGORIES.map((cat) => (
                    <Link key={cat.slug} href={`/blog?category=${encodeURIComponent(cat.slug)}`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">{cat.name}</Link>
                  ))}
                </div>
              )}
            </div>
            <a href="https://app.sidebysaas.com/forum" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium transition-colors">
              Forum Inside by SaaS
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href={`${platformUrl}/auth/login?redirectTo=/buyer`} className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm">
              Connexion
            </a>
            <a href={`${platformUrl}/auth/login?redirectTo=/editor`} className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm">
              Portail éditeur
            </a>
            <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} className="text-slate-600 hover:text-slate-900 font-medium transition-colors text-sm">
              Créer compte acheteur
            </a>
            <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Créer mon espace éditeur
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

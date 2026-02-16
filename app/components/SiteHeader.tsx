'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

const BLOG_CATEGORIES = [
  { slug: 'pour-les-acheteurs', name: 'Pour les acheteurs' },
  { slug: 'pour-les-editeurs', name: 'Pour les éditeurs' },
  { slug: 'comparaison-benchmarks', name: 'Comparaison & benchmarks' },
  { slug: 'prix-negociation', name: 'Prix & négociation' },
  { slug: 'etudes-tendances', name: 'Études & tendances' },
  { slug: 'actualites-sidebysaas', name: 'Actualités Side by SaaS' },
]

function Logo() {
  return <span className="font-bold text-xl text-slate-900">Side by SaaS</span>
}

export function SiteHeader() {
  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'
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
            <Logo />
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
                <div className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                  <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Par directions</p>
                  <Link href="/acheteur/directions/achats" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Achats</Link>
                  <Link href="/acheteur/directions/finance" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Finance</Link>
                  <Link href="/acheteur/directions/marketing" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Marketing</Link>
                  <Link href="/acheteur/directions/direction" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Direction</Link>
                  <Link href="/acheteur/directions/rh" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">RH</Link>
                  <Link href="/acheteur/directions/it" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">IT / DSI</Link>
                  <Link href="/acheteur/directions/juridique" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Juridique</Link>
                  <Link href="/acheteur/directions/operations" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Opérations</Link>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <a href={`${platformUrl}/acheteur#calculateur-economies`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Par taille d&apos;entreprise</a>
                  </div>
                </div>
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
                  <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Direction</p>
                  <Link href="/editeur/direction" className="block w-full text-left pl-5 pr-4 py-2 text-slate-600 hover:bg-blue-50 font-medium">Vue d&apos;ensemble</Link>
                  <Link href="/editeur/direction/achats" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Achats</Link>
                  <Link href="/editeur/direction/finance" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Finance</Link>
                  <Link href="/editeur/direction/marketing" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Marketing</Link>
                  <Link href="/editeur/direction/rh" className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">RH</Link>
                  <div className="border-t border-slate-100 mt-2 pt-2">
                    <a href={`${platformUrl}/auth/editor`} className="block w-full text-left px-4 py-2.5 text-blue-600 hover:bg-blue-50 font-semibold">Créer mon espace éditeur →</a>
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
          </nav>
          <div className="flex items-center space-x-4">
            <a href={`${platformUrl}/auth/editor`} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
              Créer mon espace éditeur
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

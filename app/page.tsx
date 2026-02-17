'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { NavLogo } from '@/app/components/NavLogo'

const BLOG_CATEGORIES = [
  { slug: 'pour-les-acheteurs', name: 'Pour les acheteurs' },
  { slug: 'pour-les-editeurs', name: 'Pour les éditeurs' },
  { slug: 'comparaison-benchmarks', name: 'Comparaison & benchmarks' },
  { slug: 'prix-negociation', name: 'Prix & négociation' },
  { slug: 'etudes-tendances', name: 'Études & tendances' },
  { slug: 'actualites-sidebysaas', name: 'Actualités Side by SaaS' },
]

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export default function Home() {
  const platformUrl = PLATFORM_URL
  const [openMenu, setOpenMenu] = useState<'acheteur' | 'editeur' | 'blog' | null>(null)
  const [authDropdown, setAuthDropdown] = useState<'connexion' | 'commencer' | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const authDropRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node
      if (navRef.current && !navRef.current.contains(target)) setOpenMenu(null)
      if (authDropRef.current && !authDropRef.current.contains(target)) setAuthDropdown(null)
    }
    if (openMenu || authDropdown) {
      document.addEventListener('click', handleClick)
      return () => document.removeEventListener('click', handleClick)
    }
  }, [openMenu, authDropdown])

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center cursor-pointer">
              <NavLogo height={36} />
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
                    <Link href="/acheteur#tarifs" className="block w-full text-left px-4 py-2.5 text-blue-600 hover:bg-blue-50 font-semibold border-b border-slate-100">Tarifs</Link>
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
                      <Link href="/acheteur#calculateur-economies" className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Par taille d&apos;entreprise</Link>
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
            </nav>
            <div className="flex items-center space-x-4" ref={authDropRef}>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setAuthDropdown(authDropdown === 'connexion' ? null : 'connexion') }}
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors flex items-center gap-1"
                >
                  Connexion
                  <svg className={`w-4 h-4 transition-transform ${authDropdown === 'connexion' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {authDropdown === 'connexion' && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <a href={`${platformUrl}/auth/login?redirectTo=/buyer`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Portail acheteur</a>
                    <a href={`${platformUrl}/auth/login?redirectTo=/editor`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Portail éditeur</a>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); setAuthDropdown(authDropdown === 'commencer' ? null : 'commencer') }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-1"
                >
                  Commencer
                  <svg className={`w-4 h-4 transition-transform ${authDropdown === 'commencer' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {authDropdown === 'commencer' && (
                  <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                    <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Créer un compte acheteur</a>
                    <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-blue-50 hover:text-blue-700 font-medium">Créer mon espace éditeur</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 1. À quel problème la plateforme répond */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            À quel problème Side by SaaS répond
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
            Les acheteurs de logiciels SaaS <strong className="text-slate-800">manquent de visibilité sur les prix réels</strong> et sur ce que paient les autres entreprises. Ils négocient sans référence et risquent de surpayer.
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            Les éditeurs, eux, sont <strong className="text-slate-800">comparés partout sans maîtriser leur présence</strong>. Ils ne savent pas comment ils sont perçus ni qui sont leurs vrais concurrents côté acheteur.
          </p>
          <p className="text-lg md:text-xl text-blue-700 font-medium mt-8">
            Side by SaaS rapproche les deux : données de prix et comparaisons pour les acheteurs, visibilité et insights pour les éditeurs.
          </p>
        </div>
      </section>

      {/* 2. À qui elle s'adresse — CTAs vers plateforme */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">À qui s&apos;adresse la plateforme ?</h2>
          <p className="text-slate-600 mb-10">Choisissez votre profil pour découvrir une page qui vous est dédiée.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/acheteur"
              className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>🛒</span>
              Je suis acheteur
            </Link>
            <a
              href={`${platformUrl}/editeur`}
              className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-blue-600 flex items-center justify-center gap-2"
            >
              <span>📦</span>
              Je suis éditeur / intégrateur
            </a>
          </div>
        </div>
      </section>

      {/* 3. CTA inscription */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">Prêt à commencer ?</h2>
          <p className="text-slate-600 mb-8">Créez un compte pour accéder au portail acheteur ou éditeur.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              Créer un compte acheteur
            </a>
            <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-blue-600">
              Créer mon espace éditeur
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-6">Gratuit pour démarrer • Sans engagement</p>
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <NavLogo height={32} className="[filter:brightness(0)_invert(1)]" />
              <span className="text-slate-400">© {new Date().getFullYear()}</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <Link href="/docs" className="hover:text-white transition-colors">Documentation</Link>
              <Link href="/about" className="hover:text-white transition-colors">À propos</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

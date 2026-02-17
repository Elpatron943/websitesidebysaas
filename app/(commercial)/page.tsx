'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { NavLogo } from '@/app/components/NavLogo'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'
import { getLoginUrl, getSignupUrl } from '@/lib/commercial-auth-links'

export default function Home() {
  const router = useRouter()
  const [openMenu, setOpenMenu] = useState<'acheteur' | 'editeur' | 'blog' | null>(null)
  const [authDropdown, setAuthDropdown] = useState<'connexion' | 'commencer' | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const authDropRef = useRef<HTMLDivElement>(null)

  // Fermer les menus en cliquant à l'extérieur
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

  const handleBuyerClick = () => router.push('/acheteur')
  const handleEditorClick = () => router.push('/editeur')

  const handleLogin = (profile: 'buyer' | 'editor') => {
    setAuthDropdown(null)
    const url = getLoginUrl(profile === 'buyer' ? '/buyer' : '/editor')
    if (url) window.location.href = url
  }

  const handleStart = (profile: 'buyer' | 'editor') => {
    setAuthDropdown(null)
    const url = getSignupUrl(profile === 'buyer' ? '/buyer' : '/editor')
    if (url) window.location.href = url
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => router.push('/')}
                className="flex items-center cursor-pointer"
              >
                <NavLogo height={112} />
              </button>
            </div>
            <nav ref={navRef} className="hidden md:flex items-center gap-1 relative">
              {/* 1. J'utilise des SaaS */}
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
                    <button type="button" onClick={() => { router.push('/acheteur#tarifs'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-primary-600 hover:bg-primary-50 font-semibold border-b border-slate-100">
                      Tarifs
                    </button>
                    <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Par directions</p>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/achats'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Achats</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/finance'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Finance</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/marketing'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Marketing</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/direction'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Direction</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/rh'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">RH</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/it'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">IT / DSI</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/juridique'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Juridique</button>
                    <button type="button" onClick={() => { router.push('/acheteur/directions/operations'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Opérations</button>
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button type="button" onClick={() => { router.push('/acheteur#calculateur-economies'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Par taille d&apos;entreprise</button>
                    </div>
                  </div>
                )}
              </div>
              {/* 2. Je suis éditeur de SaaS */}
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
                    <button type="button" onClick={() => { router.push('/editeur/product'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Product</button>
                    <button type="button" onClick={() => { router.push('/editeur/sales'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Sales</button>
                    <button type="button" onClick={() => { router.push('/editeur/marketing'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Marketing</button>
                    <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Direction</p>
                    <button type="button" onClick={() => { router.push('/editeur/direction'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-600 hover:bg-primary-50 font-medium">Vue d&apos;ensemble</button>
                    <button type="button" onClick={() => { router.push('/editeur/direction/achats'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Achats</button>
                    <button type="button" onClick={() => { router.push('/editeur/direction/finance'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Finance</button>
                    <button type="button" onClick={() => { router.push('/editeur/direction/marketing'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Marketing</button>
                    <button type="button" onClick={() => { router.push('/editeur/direction/rh'); setOpenMenu(null) }} className="block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">RH</button>
                    <div className="border-t border-slate-100 mt-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { const u = getSignupUrl('/editor'); if (u) window.location.href = u; setOpenMenu(null) }}
                        className="block w-full text-left px-4 py-2.5 text-primary-600 hover:bg-primary-50 font-semibold"
                      >
                        Créer mon espace éditeur →
                      </button>
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
                    <button type="button" onClick={() => { router.push('/blog'); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">
                      Toutes les catégories
                    </button>
                    {BLOG_CATEGORIES.map((cat) => (
                      <button key={cat.slug} type="button" onClick={() => { router.push(`/blog?category=${encodeURIComponent(cat.slug)}`); setOpenMenu(null) }} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
            <div className="flex items-center space-x-4" ref={authDropRef}>
              <>
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
                        <button type="button" onClick={() => handleLogin('buyer')} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Portail acheteur</button>
                        <button type="button" onClick={() => handleLogin('editor')} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Portail éditeur</button>
                      </div>
                    )}
                  </div>
                  <div className="relative">
                    <button 
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setAuthDropdown(authDropdown === 'commencer' ? null : 'commencer') }}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center gap-1"
                    >
                      Commencer
                      <svg className={`w-4 h-4 transition-transform ${authDropdown === 'commencer' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {authDropdown === 'commencer' && (
                      <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
                        <button type="button" onClick={() => handleStart('buyer')} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Créer un compte acheteur</button>
                        <button type="button" onClick={() => handleStart('editor')} className="block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium">Créer mon espace éditeur</button>
                      </div>
                    )}
                  </div>
              </>
            </div>
          </div>
        </div>
      </header>

      {/* Entrée plateforme — pas de contenu commercial (site commercial = projet séparé) */}
      <section className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Plateforme Battle Cardz</h1>
          <p className="text-slate-600 mb-10">Accédez à votre espace acheteur ou éditeur.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleBuyerClick}
              className="w-full sm:w-auto bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Espace acheteur
            </button>
            <button
              type="button"
              onClick={handleEditorClick}
              className="w-full sm:w-auto bg-white text-primary-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-50 transition-colors border-2 border-primary-600"
            >
              Espace éditeur
            </button>
          </div>
          <p className="text-sm text-slate-500 mt-8">
            Déjà un compte ? Utilisez le menu Connexion ci-dessus.
          </p>
          {process.env.NEXT_PUBLIC_MARKETING_URL && (
            <a
              href={process.env.NEXT_PUBLIC_MARKETING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Découvrir Battle Cardz (site commercial) →
            </a>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <NavLogo height={88} />
              <span className="text-slate-400">© {new Date().getFullYear()} · Plateforme</span>
            </div>
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <button onClick={() => router.push('/docs')} className="hover:text-white transition-colors">Documentation</button>
              <button onClick={() => router.push('/about')} className="hover:text-white transition-colors">À propos</button>
              <button onClick={() => router.push('/contact')} className="hover:text-white transition-colors">Contact</button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

'use client'

import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'
import { NavLogo } from '@/app/components/NavLogo'

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export default function Home() {
  const platformUrl = PLATFORM_URL

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

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
              <NavLogo height={80} className="[filter:brightness(0)_invert(1)]" />
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

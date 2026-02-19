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

      {/* 2. À qui elle s'adresse — Colonnes détaillées */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">À qui s&apos;adresse la plateforme ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Découvrez pourquoi Side by SaaS est conçu pour vous et ce que vous trouverez sur la plateforme.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {/* Colonne Acheteurs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-8 lg:p-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 text-2xl">
                    🛒
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Acheteurs</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Pourquoi la plateforme s&apos;adresse à vous</h4>
                    <p className="text-slate-700 leading-relaxed">
                      Vous manquez de <strong>visibilité sur les prix réels</strong> et sur ce que paient les autres entreprises. Vous négociez sans référence et risquez de surpayer vos logiciels SaaS.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Ce que vous pouvez trouver</h4>
                    <ul className="space-y-2.5 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span><strong>Prix réellement payés</strong> — Négociez en connaissance de cause avec les données des autres entreprises</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span><strong>Battle Cards</strong> — Comparez les fonctionnalités de plusieurs solutions côte à côte</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span><strong>Sourcing</strong> — Découvrez des alternatives performantes selon vos critères</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">✓</span>
                        <span><strong>Calculateur ROI</strong> — Estimez vos économies potentielles et votre rentabilité</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                <Link
                  href="/acheteur"
                  className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg"
                >
                  Découvrir ma page acheteur
                </Link>
              </div>
            </div>

            {/* Colonne Éditeurs / Intégrateurs */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-8 lg:p-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-2xl">
                    📦
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">Éditeurs / Intégrateurs</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Pourquoi la plateforme s&apos;adresse à vous</h4>
                    <p className="text-slate-700 leading-relaxed">
                      Vous êtes <strong>comparés partout sans maîtriser votre présence</strong>. Vous ne savez pas comment vous êtes perçus ni qui sont vos vrais concurrents côté acheteur.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Ce que vous pouvez trouver</h4>
                    <ul className="space-y-2.5 text-slate-700">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5">✓</span>
                        <span><strong>Certification entreprise</strong> — Rendez votre profil visible et certifié quand un utilisateur valide</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5">✓</span>
                        <span><strong>Participation au Forum</strong> — Échangez entre acheteurs et éditeurs</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-0.5">✓</span>
                        <span><strong>Maîtrise de votre présence</strong> — Soyez visible là où les acheteurs vous comparent déjà</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                <a
                  href={`${platformUrl}/editeur`}
                  className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                >
                  Découvrir ma page éditeur
                </a>
              </div>
            </div>
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

'use client'

import Link from 'next/link'
import { NavLogo } from '@/app/components/NavLogo'
import { getSignupUrl } from '@/lib/commercial-auth-links'

export default function EditeurPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <NavLogo height={112} />
            </Link>
            <Link href="/" className="text-slate-600 hover:text-slate-900 font-medium text-sm">
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </header>

      {/* Intro : à quoi ça sert pour les éditeurs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Pour les éditeurs & intégrateurs</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Soyez visibles là où on vous compare
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Les acheteurs comparent déjà vos solutions. Rejoignez la plateforme pour maîtriser votre présence, certifier votre entreprise et accéder aux insights du marché.
          </p>
        </div>

        {/* Bénéfices */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Certifiez votre entreprise</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Votre entreprise est visible dans les comparatifs. Elle devient certifiée lorsqu&apos;un utilisateur de l&apos;entreprise valide son profil sur la plateforme.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">🃏</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Battle cards</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Consultez les Battle Cards où vous apparaissez. Gratuit : 3 vues / mois. Pro : illimité.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-primary-200 transition-colors">
            <div className="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Insight utilisateurs du marché</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Offre gratuite : voyez qui sont vos concurrents. Passez en Pro pour les prix et le tableau comparatif détaillé.
            </p>
          </div>
        </div>

        {/* CTA inscription */}
        <div className="text-center bg-slate-50 rounded-2xl p-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Prêt à rejoindre la plateforme ?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Créez votre espace éditeur gratuitement. Pro sur devis pour un accès illimité aux Battle Cards et aux données de marché.
          </p>
          {getSignupUrl('/editor') ? (
            <a
              href={getSignupUrl('/editor')!}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-lg"
            >
              <span>📦</span>
              Créer mon espace éditeur
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold bg-primary-600 text-white cursor-default shadow-lg">
              <span>📦</span>
              Créer mon espace éditeur
            </span>
          )}
          <p className="text-sm text-slate-500 mt-4">Gratuit pour commencer • Pro sur devis</p>
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white">
              <NavLogo height={64} />
              <span>© 2024</span>
            </Link>
            <Link href="/" className="text-slate-400 hover:text-white text-sm">Retour à l&apos;accueil</Link>
          </div>
        </div>
      </footer>
    </main>
  )
}

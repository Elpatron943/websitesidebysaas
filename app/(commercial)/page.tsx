'use client'

import { useRouter } from 'next/navigation'
import { NavLogo } from '@/app/components/NavLogo'
import { SiteHeader } from '@/app/components/SiteHeader'

export default function Home() {
  const router = useRouter()

  const handleBuyerClick = () => router.push('/acheteur')
  const handleEditorClick = () => router.push('/editeur')

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

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

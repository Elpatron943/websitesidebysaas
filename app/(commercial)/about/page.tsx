import Link from 'next/link'

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">À propos</h1>
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-slate-600">
            Side By SaaS est une plateforme de benchmark SaaS basée exclusivement sur des données d'achats réels, 
            partagées anonymement par des acheteurs professionnels.
          </p>
          <p className="text-slate-600">
            Notre mission : permettre aux acheteurs de comparer des logiciels SaaS de manière factuelle, 
            sans marketing éditeur, en exposant les prix réellement payés.
          </p>
          <Link 
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium inline-block"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

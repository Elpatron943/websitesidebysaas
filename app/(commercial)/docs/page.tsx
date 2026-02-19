import Link from 'next/link'

export default function Docs() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Documentation</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-slate-600 mb-4">
            La documentation complète de Side By SaaS sera disponible prochainement.
          </p>
          <Link 
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  )
}

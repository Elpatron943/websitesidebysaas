import Link from 'next/link'

const features = [
  {
    icon: '📊',
    title: 'Données d\'achats réels',
    description:
      'Chaque prix affiché provient d\'un acheteur professionnel ayant réellement souscrit au logiciel. Aucune donnée d\'éditeur, aucun tarif catalogue — uniquement ce que les entreprises paient vraiment.',
  },
  {
    icon: '🏢',
    title: 'Benchmark par taille d\'entreprise',
    description:
      'Comparez vos dépenses SaaS avec des entreprises de même effectif. Identifiez si vous payez trop cher par rapport à vos pairs, à effectif comparable.',
  },
  {
    icon: '⚔️',
    title: 'Battle cards & comparatifs',
    description:
      'Accédez à des fiches détaillées par logiciel : prix médian, fourchette, tendances. Comparez deux solutions côte à côte pour arbitrer en connaissance de cause.',
  },
  {
    icon: '💼',
    title: 'Portefeuille SaaS',
    description:
      'Centralisez tous vos abonnements SaaS en un seul endroit. Suivez vos dépenses, détectez les doublons et mesurez l\'évolution de votre stack au fil du temps.',
  },
  {
    icon: '📈',
    title: 'Calculateur ROI',
    description:
      'Estimez le retour sur investissement de chaque logiciel : gains métier, coût annuel, payback en mois. Des chiffres pour défendre vos décisions d\'achat en interne.',
  },
  {
    icon: '🔍',
    title: 'Découverte d\'alternatives',
    description:
      'Identifiez automatiquement les solutions concurrentes dans les mêmes catégories que vos logiciels actuels — avec leurs prix réels pour comparer objectivement.',
  },
  {
    icon: '🛡️',
    title: 'Données anonymisées & sécurisées',
    description:
      'Toutes les contributions sont anonymisées. Votre entreprise et vos prix ne sont jamais exposés individuellement — seules des médianes agrégées sont affichées.',
  },
  {
    icon: '🎯',
    title: 'Profils éditeurs enrichis',
    description:
      'Chaque fiche éditeur centralise les informations clés : domaine, intégrateurs, catégories, prix pratiqués sur le marché. Une vue 360° avant de signer.',
  },
]

export default function Features() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Fonctionnalités
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Ce que Side by SaaS vous permet de faire
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une plateforme construite pour les acheteurs IT qui veulent des faits, pas du marketing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fr/acheteur"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Accéder à la plateforme
            </Link>
            <Link
              href="/pricing"
              className="text-primary-600 font-semibold hover:underline"
            >
              Voir les tarifs →
            </Link>
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f) => (
            <div key={f.title} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à voir ce que vous payez vraiment ?
          </h2>
          <p className="text-primary-100 mb-8 text-lg">
            Rejoignez les acheteurs professionnels qui font leurs décisions SaaS sur des données réelles.
          </p>
          <Link
            href="/fr/acheteur"
            className="inline-block bg-white text-primary-700 font-bold px-8 py-4 rounded-xl hover:bg-primary-50 transition-colors"
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>
    </div>
  )
}

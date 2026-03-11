import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Fonctionnalités | Side by SaaS',
  description: 'Découvrez les fonctionnalités de Side by SaaS : données d\'achats réels, benchmark par taille d\'entreprise, battle cards, portefeuille SaaS et calculateur ROI.',
  openGraph: {
    title: 'Fonctionnalités | Side by SaaS',
    description: 'Données d\'achats réels, benchmark, battle cards et plus. La plateforme de comparaison SaaS pour acheteurs IT.',
    url: 'https://sidebysaas.com/fr/features',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

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
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Hero */}
      <section className="border-b" style={{ backgroundColor: '#F5F0E8', borderColor: '#EDE5D8' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#16A34A' }}>
            Fonctionnalités
          </p>
          <h1 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#1C1917' }}>
            Ce que Side by SaaS vous permet de faire
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#44403C' }}>
            Une plateforme construite pour les acheteurs IT qui veulent des faits, pas du marketing.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fr/acheteur"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-white transition-all shadow-lg hover:shadow-xl"
              style={{ backgroundColor: '#16A34A' }}
            >
              Accéder à la plateforme
            </Link>
            <Link
              href="/fr/pricing"
              className="font-semibold hover:underline"
              style={{ color: '#16A34A' }}
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
            <div
              key={f.title}
              className="rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE5D8' }}
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1C1917' }}>{f.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ backgroundColor: '#16A34A' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">
            Prêt à voir ce que vous payez vraiment ?
          </h2>
          <p className="mb-8 text-lg" style={{ color: '#dcfce7' }}>
            Rejoignez les acheteurs professionnels qui font leurs décisions SaaS sur des données réelles.
          </p>
          <Link
            href="/fr/acheteur"
            className="inline-block font-bold px-8 py-4 rounded-xl transition-colors"
            style={{ backgroundColor: '#FFFBF5', color: '#16A34A' }}
          >
            Commencer gratuitement
          </Link>
        </div>
      </section>
    </div>
  )
}

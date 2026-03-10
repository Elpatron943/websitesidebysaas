import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos | Side by SaaS',
  description: 'Side by SaaS est la seule plateforme de benchmark SaaS construite sur des données d\'achats réels. Découvrez notre mission et nos valeurs.',
  openGraph: {
    title: 'À propos | Side by SaaS',
    description: 'Notre mission : que chaque décideur IT sache combien ses pairs paient pour le même logiciel.',
    url: 'https://sidebysaas.com/fr/about',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

const values = [
  {
    icon: '🔍',
    title: 'Transparence radicale',
    description:
      'Nous exposons les prix réellement payés par les entreprises. Pas de tarifs catalogue, pas d\'estimations, pas de contenu sponsorisé. Juste des faits.',
  },
  {
    icon: '🤝',
    title: 'Intelligence collective',
    description:
      'La plateforme fonctionne sur un principe de réciprocité : en partageant vos données d\'achat, vous accédez aux données des autres. Tout le monde gagne.',
  },
  {
    icon: '🛡️',
    title: 'Anonymat garanti',
    description:
      'Votre entreprise n\'est jamais exposée. Seules des médianes agrégées sont affichées. Vos prix individuels ne sont visibles par personne.',
  },
  {
    icon: '⚖️',
    title: 'Neutralité absolue',
    description:
      'Side by SaaS ne perçoit aucune commission des éditeurs SaaS sur les ventes. Nos recommandations ne sont pas achetables.',
  },
]

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            À propos
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-6">
            Real buyer data.<br className="hidden sm:block" /> Real SaaS battles.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            Side by SaaS est la seule plateforme de benchmark SaaS construite exclusivement 
            sur des données d'achats réels, partagées anonymement par des acheteurs professionnels.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Notre mission</h2>
          <p className="text-slate-600 leading-relaxed">
            Les acheteurs IT passent des heures à comparer des logiciels sur des sites de review 
            bourrés de contenus sponsorisés, avec des grilles tarifaires volontairement opaques. 
            Les éditeurs contrôlent l'information. Les acheteurs négocient à l'aveugle.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Side by SaaS renverse ce déséquilibre. En agrégeant les prix réellement payés par 
            des centaines d'entreprises, nous donnons aux acheteurs le contexte dont ils ont besoin 
            pour négocier, comparer et décider.
          </p>
          <p className="text-slate-700 font-semibold">
            Notre objectif : que chaque décideur IT sache exactement combien ses pairs paient 
            pour le même logiciel — avant de signer.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Nos principes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Rejoignez la communauté</h2>
          <p className="text-slate-600 mb-8">
            Des questions, des suggestions, ou vous voulez simplement en savoir plus ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fr/acheteur"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Accéder à la plateforme
            </Link>
            <Link
              href="/fr/contact"
              className="text-primary-600 font-semibold hover:underline"
            >
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

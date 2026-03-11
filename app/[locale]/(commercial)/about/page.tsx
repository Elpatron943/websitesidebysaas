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
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Hero */}
      <section className="border-b" style={{ backgroundColor: '#F5F0E8', borderColor: '#EDE5D8' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#16A34A' }}>
            À propos
          </p>
          <h1 className="text-4xl font-extrabold leading-tight mb-6" style={{ color: '#1C1917' }}>
            Real buyer data.<br className="hidden sm:block" /> Real SaaS battles.
          </h1>
          <p className="text-xl max-w-2xl leading-relaxed" style={{ color: '#44403C' }}>
            Side by SaaS est la seule plateforme de benchmark SaaS construite exclusivement 
            sur des données d&apos;achats réels, partagées anonymement par des acheteurs professionnels.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div
          className="rounded-xl shadow-sm p-8 space-y-6"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE5D8' }}
        >
          <h2 className="text-2xl font-bold" style={{ color: '#1C1917' }}>Notre mission</h2>
          <p className="leading-relaxed" style={{ color: '#44403C' }}>
            Les acheteurs IT passent des heures à comparer des logiciels sur des sites de review 
            bourrés de contenus sponsorisés, avec des grilles tarifaires volontairement opaques. 
            Les éditeurs contrôlent l&apos;information. Les acheteurs négocient à l&apos;aveugle.
          </p>
          <p className="leading-relaxed" style={{ color: '#44403C' }}>
            Side by SaaS renverse ce déséquilibre. En agrégeant les prix réellement payés par 
            des centaines d&apos;entreprises, nous donnons aux acheteurs le contexte dont ils ont besoin 
            pour négocier, comparer et décider.
          </p>
          <p className="font-semibold" style={{ color: '#1C1917' }}>
            Notre objectif : que chaque décideur IT sache exactement combien ses pairs paient 
            pour le même logiciel — avant de signer.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-8" style={{ color: '#1C1917' }}>Nos principes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl shadow-sm p-6"
              style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE5D8' }}
            >
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1C1917' }}>{v.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t py-12" style={{ borderColor: '#EDE5D8', backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1C1917' }}>Rejoignez la communauté</h2>
          <p className="mb-8" style={{ color: '#57534E' }}>
            Des questions, des suggestions, ou vous voulez simplement en savoir plus ?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/fr/acheteur"
              className="font-bold px-6 py-3 rounded-xl text-white transition-colors"
              style={{ backgroundColor: '#16A34A' }}
            >
              Accéder à la plateforme
            </Link>
            <Link
              href="/fr/contact"
              className="font-semibold hover:underline"
              style={{ color: '#16A34A' }}
            >
              Nous contacter →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

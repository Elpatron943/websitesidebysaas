import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tarifs | Side by SaaS',
  description: 'Tarifs Side by SaaS pour acheteurs de logiciels SaaS et éditeurs. Gratuit pour démarrer, plans PME et Enterprise sur devis.',
  openGraph: {
    title: 'Tarifs | Side by SaaS',
    description: 'Des tarifs clairs et transparents pour les acheteurs de logiciels SaaS et les éditeurs.',
    url: 'https://sidebysaas.com/fr/pricing',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

const buyerPlans = [
  {
    name: 'Gratuit',
    badge: null,
    price: '0 €',
    period: '/ mois',
    description: 'Pour explorer la plateforme et contribuer vos premiers prix.',
    features: [
      'Accès aux fiches produits (selon contributions)',
      'Calculateur ROI',
      'Portefeuille SaaS',
      'Contribution de données anonymisées',
    ],
    cta: 'Commencer gratuitement',
    ctaHref: '/fr/acheteur',
    highlight: false,
  },
  {
    name: 'PME',
    badge: 'Populaire',
    price: 'Sur devis',
    period: '',
    description: 'Pour les entreprises de 1 à 250 salariés avec un parc SaaS actif.',
    features: [
      "Jusqu'à 150 consultations de fiches / an",
      'Benchmark entreprises similaires',
      'Battle cards comparatives',
      'Accès aux médianes de marché',
      'Support email prioritaire',
    ],
    cta: 'Nous contacter',
    ctaHref: '/fr/contact',
    highlight: true,
  },
  {
    name: 'Enterprise',
    badge: null,
    price: 'Sur devis',
    period: '',
    description: 'Pour les grandes entreprises avec un volume de consultations élevé.',
    features: [
      'Consultations illimitées',
      'Benchmark multi-équipes',
      'Exports et reporting avancés',
      'Intégration sur mesure',
      'Account manager dédié',
    ],
    cta: 'Nous contacter',
    ctaHref: '/fr/contact',
    highlight: false,
  },
]

const editorPlan = {
  name: 'Éditeur Pro',
  price: 'Sur devis',
  description: 'Pour les éditeurs SaaS qui veulent comprendre leur positionnement marché.',
  features: [
    'Fiche produit vérifiée et mise en avant',
    'Accès aux données de positionnement marché',
    'Statistiques de consultations de votre fiche',
    'Badge "Éditeur vérifié"',
    'Accompagnement onboarding',
  ],
  cta: 'En savoir plus',
  ctaHref: '/fr/editeur',
}

export default function Pricing() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFBF5' }}>
      {/* Hero */}
      <section className="border-b" style={{ backgroundColor: '#F5F0E8', borderColor: '#EDE5D8' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#16A34A' }}>
            Tarifs
          </p>
          <h1 className="text-4xl font-extrabold leading-tight mb-4" style={{ color: '#1C1917' }}>
            Transparent sur les prix. Par principe.
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: '#44403C' }}>
            Une plateforme de benchmark SaaS qui pratique ce qu&apos;elle prêche : des tarifs clairs, sans surprise.
          </p>
        </div>
      </section>

      {/* Acheteurs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1917' }}>Pour les acheteurs</h2>
        <p className="mb-8" style={{ color: '#57534E' }}>Accédez aux données réelles du marché SaaS selon la taille de votre entreprise.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyerPlans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl p-6 flex flex-col shadow-sm"
              style={
                plan.highlight
                  ? { backgroundColor: '#16A34A', border: '1px solid #16A34A' }
                  : { backgroundColor: '#FFFFFF', border: '1px solid #EDE5D8' }
              }
            >
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-lg font-bold" style={{ color: plan.highlight ? '#FFFFFF' : '#1C1917' }}>
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: '#FFFBF5', color: '#16A34A' }}
                  >
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="mb-1">
                <span className="text-3xl font-extrabold" style={{ color: plan.highlight ? '#FFFFFF' : '#1C1917' }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm ml-1" style={{ color: plan.highlight ? '#dcfce7' : '#57534E' }}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className="text-sm mb-6" style={{ color: plan.highlight ? '#dcfce7' : '#57534E' }}>
                {plan.description}
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span style={{ color: plan.highlight ? '#bbf7d0' : '#16A34A' }}>✓</span>
                    <span style={{ color: plan.highlight ? '#FFFFFF' : '#44403C' }}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className="block text-center font-semibold py-3 rounded-xl transition-colors"
                style={
                  plan.highlight
                    ? { backgroundColor: '#FFFBF5', color: '#16A34A' }
                    : { backgroundColor: '#16A34A', color: '#FFFFFF' }
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Éditeurs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold mb-2" style={{ color: '#1C1917' }}>Pour les éditeurs SaaS</h2>
        <p className="mb-8" style={{ color: '#57534E' }}>Comprenez votre positionnement prix sur le marché réel.</p>
        <div
          className="rounded-xl shadow-sm p-8 max-w-2xl"
          style={{ backgroundColor: '#FFFFFF', border: '1px solid #EDE5D8' }}
        >
          <h3 className="text-xl font-bold mb-1" style={{ color: '#1C1917' }}>{editorPlan.name}</h3>
          <p className="text-3xl font-extrabold mb-1" style={{ color: '#1C1917' }}>{editorPlan.price}</p>
          <p className="text-sm mb-6" style={{ color: '#57534E' }}>{editorPlan.description}</p>
          <ul className="space-y-2 mb-8">
            {editorPlan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span style={{ color: '#16A34A' }}>✓</span>
                <span style={{ color: '#44403C' }}>{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={editorPlan.ctaHref}
            className="inline-block font-semibold px-6 py-3 rounded-xl transition-colors text-white"
            style={{ backgroundColor: '#16A34A' }}
          >
            {editorPlan.cta}
          </Link>
        </div>
      </section>

      {/* FAQ bottom note */}
      <section className="border-t py-12" style={{ borderColor: '#EDE5D8', backgroundColor: '#F5F0E8' }}>
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p style={{ color: '#57534E' }}>
            Des questions sur les tarifs ?{' '}
            <Link href="/fr/contact" className="font-semibold hover:underline" style={{ color: '#16A34A' }}>
              Contactez-nous
            </Link>{' '}
            — nous répondons sous 24h.
          </p>
        </div>
      </section>
    </div>
  )
}

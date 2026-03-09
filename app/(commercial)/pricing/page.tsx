import Link from 'next/link'

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
      'Jusqu'à 150 consultations de fiches / an',
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
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Tarifs
          </span>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Transparent sur les prix. Par principe.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Une plateforme de benchmark SaaS qui pratique ce qu'elle prêche : des tarifs clairs, sans surprise.
          </p>
        </div>
      </section>

      {/* Acheteurs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pour les acheteurs</h2>
        <p className="text-slate-600 mb-8">Accédez aux données réelles du marché SaaS selon la taille de votre entreprise.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {buyerPlans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-xl border p-6 flex flex-col ${
                plan.highlight
                  ? 'bg-primary-600 border-primary-600 shadow-xl text-white'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-lg font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                {plan.badge && (
                  <span className="bg-white text-primary-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
              </div>
              <div className="mb-1">
                <span className={`text-3xl font-extrabold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-primary-100' : 'text-slate-500'}`}>
                    {plan.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-6 ${plan.highlight ? 'text-primary-100' : 'text-slate-500'}`}>
                {plan.description}
              </p>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? 'text-primary-200' : 'text-primary-500'}>✓</span>
                    <span className={plan.highlight ? 'text-white' : 'text-slate-700'}>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={plan.ctaHref}
                className={`block text-center font-semibold py-3 rounded-xl transition-colors ${
                  plan.highlight
                    ? 'bg-white text-primary-700 hover:bg-primary-50'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Éditeurs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Pour les éditeurs SaaS</h2>
        <p className="text-slate-600 mb-8">Comprenez votre positionnement prix sur le marché réel.</p>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 max-w-2xl">
          <h3 className="text-xl font-bold text-slate-900 mb-1">{editorPlan.name}</h3>
          <p className="text-3xl font-extrabold text-slate-900 mb-1">{editorPlan.price}</p>
          <p className="text-slate-500 text-sm mb-6">{editorPlan.description}</p>
          <ul className="space-y-2 mb-8">
            {editorPlan.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <span className="text-primary-500">✓</span>
                <span className="text-slate-700">{f}</span>
              </li>
            ))}
          </ul>
          <Link
            href={editorPlan.ctaHref}
            className="inline-block bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary-700 transition-colors"
          >
            {editorPlan.cta}
          </Link>
        </div>
      </section>

      {/* FAQ bottom note */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-slate-600">
            Des questions sur les tarifs ?{' '}
            <Link href="/fr/contact" className="text-primary-600 font-semibold hover:underline">
              Contactez-nous
            </Link>{' '}
            — nous répondons sous 24h.
          </p>
        </div>
      </section>
    </div>
  )
}

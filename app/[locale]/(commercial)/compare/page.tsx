import { getComparisons, getProductBySlug, PRODUCTS } from '@/lib/saas-products'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparatifs SaaS : prix réels par catégorie | Side by SaaS',
  description:
    "Comparez les prix réels de 105 combinaisons de logiciels SaaS basés sur des données d'achats anonymisées d'entreprises françaises.",
  openGraph: {
    title: 'Comparatifs SaaS : prix réels par catégorie | Side by SaaS',
    description:
      "105 comparatifs basés sur des données d'achats réels anonymisées. Benchmark par taille d'entreprise et secteur.",
    url: 'https://sidebysaas.com/fr/compare',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const prefix = `/${locale}`

  const comparisons = getComparisons()

  // Group by category
  const byCategory: Record<string, typeof comparisons> = {}
  for (const comp of comparisons) {
    const cat = comp.category
    if (!byCategory[cat]) byCategory[cat] = []
    byCategory[cat].push(comp)
  }

  // Count unique categories per product
  const categories = Object.keys(byCategory).sort()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href={`${prefix}`} className="hover:text-slate-700 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <span className="text-slate-700">Comparatifs</span>
          </nav>
          <span className="inline-block bg-primary-50 text-primary-700 text-sm font-semibold px-3 py-1 rounded-full mb-4">
            Comparatifs SaaS
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Comparez les prix réels des SaaS
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl">
            {comparisons.length} comparatifs basés sur des données d&apos;achats anonymisées d&apos;entreprises
            françaises. Trouvez ce que vos pairs paient vraiment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
              📊 {PRODUCTS.length} produits analysés
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
              🔒 Données anonymisées
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
              🏢 {categories.length} catégories
            </div>
          </div>
        </div>
      </section>

      {/* By category */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {categories.map((category) => {
          const items = byCategory[category]
          return (
            <section key={category}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-slate-900">
                  {category}
                  <span className="ml-3 text-sm font-normal text-slate-500">
                    {items.length} comparatif{items.length > 1 ? 's' : ''}
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((comp) => {
                  const pA = getProductBySlug(comp.productA)
                  const pB = getProductBySlug(comp.productB)
                  if (!pA || !pB) return null
                  return (
                    <Link
                      key={comp.slug}
                      href={`${prefix}/compare/${comp.slug}`}
                      className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:border-primary-200 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-xl">
                          {pA.logoEmoji}
                        </div>
                        <span className="text-slate-400 font-bold text-sm">vs</span>
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-xl">
                          {pB.logoEmoji}
                        </div>
                      </div>
                      <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                        {pA.name} vs {pB.name}
                      </h3>
                      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                        <span>
                          {pA.stats.avgPriceMonthly.toLocaleString('fr-FR')} €
                          <span className="mx-1 text-slate-300">·</span>
                          {pB.stats.avgPriceMonthly.toLocaleString('fr-FR')} €
                          <span className="text-slate-400">/mois</span>
                        </span>
                        <span className="text-primary-600 font-medium group-hover:underline">
                          Comparer →
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Votre stack SaaS coûte-t-il trop cher ?
          </h2>
          <p className="text-slate-600 mb-8">
            Accédez aux benchmarks personnalisés pour votre taille d&apos;entreprise et votre secteur.
          </p>
          <a
            href="https://app.sidebysaas.com/auth/register"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-block bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
          >
            Accéder à la plateforme →
          </a>
        </div>
      </section>
    </div>
  )
}

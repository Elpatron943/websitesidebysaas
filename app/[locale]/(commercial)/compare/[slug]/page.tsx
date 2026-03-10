import { getComparisonBySlug, getProductBySlug, getComparisons, PRODUCTS } from '@/lib/saas-products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) =>
    getComparisons().map((c) => ({ locale, slug: c.slug }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const comp = getComparisonBySlug(slug)
  if (!comp) return {}
  return {
    title: `${comp.title} | Side by SaaS`,
    description: comp.metaDescription,
    openGraph: {
      title: `${comp.title} | Side by SaaS`,
      description: comp.metaDescription,
      url: `https://sidebysaas.com/fr/compare/${slug}`,
      siteName: 'Side by SaaS',
      type: 'article',
    },
    alternates: {
      canonical: `https://sidebysaas.com/fr/compare/${slug}`,
      languages: {
        'fr': `https://sidebysaas.com/fr/compare/${slug}`,
        'en': `https://sidebysaas.com/en/compare/${slug}`,
        'x-default': `https://sidebysaas.com/fr/compare/${slug}`,
      },
    },
  }
}

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const comp = getComparisonBySlug(slug)
  if (!comp) notFound()

  const productA = getProductBySlug(comp.productA)
  const productB = getProductBySlug(comp.productB)
  if (!productA || !productB) notFound()

  const totalCompanies = productA.stats.companiesCount + productB.stats.companiesCount

  // Determine cheaper product for highlighting
  const aCheaper = productA.stats.avgPriceMonthly <= productB.stats.avgPriceMonthly

  // Other comparisons in same category (excluding current)
  const otherComparisons = getComparisons()
    .filter(
      (c) =>
        c.slug !== comp.slug &&
        (c.productA === comp.productA ||
          c.productB === comp.productA ||
          c.productA === comp.productB ||
          c.productB === comp.productB),
    )
    .slice(0, 3)

  const prefix = `/${locale}`

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href={`${prefix}`} className="hover:text-slate-700 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href={`${prefix}/compare`} className="hover:text-slate-700 transition-colors">
              Comparatifs
            </Link>
            <span>/</span>
            <span className="text-slate-700 truncate max-w-xs">{comp.title}</span>
          </nav>

          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {comp.title}
          </h1>
          <p className="text-lg text-slate-600 mb-5">
            Basé sur {totalCompanies} contributions d&apos;entreprises françaises — données d&apos;achats réels, anonymisées
          </p>
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
            <span>🔒 Données anonymisées</span>
            <span>·</span>
            <span>📊 {totalCompanies} entreprises</span>
            <span>·</span>
            <span>Mis à jour mars 2025</span>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Comparaison côte à côte</h2>
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Header row */}
          <div className="grid grid-cols-3 border-b border-slate-100">
            <div className="px-6 py-4 bg-slate-50 text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Critère
            </div>
            <div
              className={`px-6 py-4 text-center font-bold text-lg border-l border-slate-100 ${aCheaper ? 'bg-emerald-50 text-emerald-700' : 'text-slate-900'}`}
            >
              <span className="text-2xl mr-2">{productA.logoEmoji}</span>
              {productA.name}
              {aCheaper && (
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  Moins cher
                </span>
              )}
            </div>
            <div
              className={`px-6 py-4 text-center font-bold text-lg border-l border-slate-100 ${!aCheaper ? 'bg-emerald-50 text-emerald-700' : 'text-slate-900'}`}
            >
              <span className="text-2xl mr-2">{productB.logoEmoji}</span>
              {productB.name}
              {!aCheaper && (
                <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                  Moins cher
                </span>
              )}
            </div>
          </div>

          {/* Rows */}
          {[
            {
              label: 'Prix moyen mensuel',
              a: `${productA.stats.avgPriceMonthly.toLocaleString('fr-FR')} €/mois`,
              b: `${productB.stats.avgPriceMonthly.toLocaleString('fr-FR')} €/mois`,
              highlight: true,
            },
            {
              label: 'Prix minimum',
              a: `${productA.priceRange.min} €/${productA.priceRange.unit}`,
              b: `${productB.priceRange.min} €/${productB.priceRange.unit}`,
              highlight: false,
            },
            {
              label: 'Prix maximum',
              a: `${productA.priceRange.max} €/${productA.priceRange.unit}`,
              b: `${productB.priceRange.max} €/${productB.priceRange.unit}`,
              highlight: false,
            },
            {
              label: 'Catégorie',
              a: productA.category,
              b: productB.category,
              highlight: false,
            },
            {
              label: 'Entreprises (données)',
              a: `${productA.stats.companiesCount} entreprises`,
              b: `${productB.stats.companiesCount} entreprises`,
              highlight: false,
            },
          ].map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-3 border-b border-slate-100 last:border-0 ${i % 2 === 0 ? '' : 'bg-slate-50/50'}`}
            >
              <div className="px-6 py-4 text-sm font-medium text-slate-600 flex items-center">
                {row.label}
              </div>
              <div
                className={`px-6 py-4 text-center border-l border-slate-100 ${row.highlight ? 'font-bold text-slate-900 text-lg' : 'text-slate-700'} ${row.highlight && aCheaper ? 'text-emerald-700' : ''}`}
              >
                {row.a}
              </div>
              <div
                className={`px-6 py-4 text-center border-l border-slate-100 ${row.highlight ? 'font-bold text-slate-900 text-lg' : 'text-slate-700'} ${row.highlight && !aCheaper ? 'text-emerald-700' : ''}`}
              >
                {row.b}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benchmark par taille */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Benchmark par taille d&apos;entreprise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {productA.stats.sizeBreakdown.map((tierA, idx) => {
            const tierB = productB.stats.sizeBreakdown[idx]
            if (!tierB) return null
            const aWins = tierA.avg <= tierB.avg
            return (
              <div
                key={tierA.label}
                className="bg-white rounded-xl border border-slate-100 shadow-sm p-5"
              >
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
                  {tierA.label}
                </h3>
                <div className="space-y-3">
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${aWins ? 'bg-emerald-50' : 'bg-slate-50'}`}
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {productA.logoEmoji} {productA.name}
                    </span>
                    <span className={`font-bold ${aWins ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {tierA.avg.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                  <div
                    className={`flex items-center justify-between p-3 rounded-lg ${!aWins ? 'bg-emerald-50' : 'bg-slate-50'}`}
                  >
                    <span className="text-sm font-medium text-slate-700">
                      {productB.logoEmoji} {productB.name}
                    </span>
                    <span className={`font-bold ${!aWins ? 'text-emerald-700' : 'text-slate-900'}`}>
                      {tierB.avg.toLocaleString('fr-FR')} €
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  {aWins ? productA.name : productB.name} est{' '}
                  {Math.round(
                    (Math.abs(tierA.avg - tierB.avg) / Math.max(tierA.avg, tierB.avg)) * 100,
                  )}
                  % moins cher pour cette taille
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Secteurs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Secteurs les plus représentés</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[productA, productB].map((product) => (
            <div key={product.slug} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4">
                {product.logoEmoji} {product.name}
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.stats.topSectors.map((sector) => (
                  <span
                    key={sector}
                    className="bg-primary-50 text-primary-700 text-sm font-medium px-3 py-1 rounded-full border border-primary-100"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white border-y border-slate-200 py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Comparez avec vos données réelles
          </h2>
          <p className="text-slate-600 mb-8">
            Accédez à votre benchmark personnalisé basé sur votre taille d&apos;entreprise et votre secteur.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://app.sidebysaas.com/auth/register"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
            >
              Voir mes données personnalisées →
            </a>
            <a
              href="https://app.sidebysaas.com/auth/register"
              rel="nofollow noopener noreferrer"
              target="_blank"
              className="text-primary-600 font-semibold hover:underline"
            >
              Contribuer mes données
            </a>
          </div>
        </div>
      </section>

      {/* Autres comparatifs */}
      {otherComparisons.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Autres comparatifs</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherComparisons.map((other) => {
              const pA = getProductBySlug(other.productA)
              const pB = getProductBySlug(other.productB)
              if (!pA || !pB) return null
              return (
                <Link
                  key={other.slug}
                  href={`${prefix}/compare/${other.slug}`}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:border-primary-200 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{pA.logoEmoji}</span>
                    <span className="text-slate-400 font-bold">vs</span>
                    <span className="text-xl">{pB.logoEmoji}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-slate-900 group-hover:text-primary-700 transition-colors leading-snug">
                    {pA.name} vs {pB.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">{other.category}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

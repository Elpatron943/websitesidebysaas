import { SEGMENTS, getSegmentBySlug } from '@/lib/segments'
import { PRODUCTS, getComparisons } from '@/lib/saas-products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return ['fr', 'en'].flatMap((locale) =>
    SEGMENTS.filter((s) => s.persona === 'acheteur').map((s) => ({
      locale,
      segment: s.slug,
    }))
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>
}): Promise<Metadata> {
  const { segment } = await params
  const seg = getSegmentBySlug(segment)
  if (!seg) return {}
  return {
    title: seg.metaTitle,
    description: seg.metaDescription,
    openGraph: {
      title: seg.metaTitle,
      description: seg.metaDescription,
      url: `https://sidebysaas.com/fr/acheteur/${segment}`,
      siteName: 'Side by SaaS',
      type: 'website',
    },
    alternates: {
      canonical: `https://sidebysaas.com/fr/acheteur/${segment}`,
      languages: {
        'fr': `https://sidebysaas.com/fr/acheteur/${segment}`,
        'en': `https://sidebysaas.com/en/acheteur/${segment}`,
        'x-default': `https://sidebysaas.com/fr/acheteur/${segment}`,
      },
    },
  }
}

export default async function AcheteurSegmentPage({
  params,
}: {
  params: Promise<{ segment: string; locale: string }>
}) {
  const { segment, locale } = await params
  const seg = getSegmentBySlug(segment)
  if (!seg || seg.persona !== 'acheteur') notFound()

  const prefix = `/${locale}`

  // Produits filtrés par catégorie (ou tous si catégorie vide)
  const products = seg.category
    ? PRODUCTS.filter((p) => p.category === seg.category)
    : PRODUCTS

  // Comparatifs de la catégorie (max 6)
  const allComparisons = getComparisons()
  const comparisons = seg.category
    ? allComparisons.filter((c) => c.category === seg.category).slice(0, 6)
    : allComparisons.slice(0, 6)

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between gap-4">
            <Link href={prefix} className="text-lg font-bold text-slate-900">
              Side by SaaS
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href={`${prefix}/acheteur`}
                className="text-slate-600 hover:text-slate-900 font-medium text-sm"
              >
                ← Acheteurs
              </Link>
              <a
                href="https://app.sidebysaas.com/auth/register?redirectTo=/buyer"
                rel="nofollow noopener noreferrer"
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors"
              >
                {seg.cta}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm text-slate-500">
          <li>
            <Link href={prefix} className="hover:text-slate-900 transition-colors">
              Accueil
            </Link>
          </li>
          <li className="text-slate-400">/</li>
          <li>
            <Link href={`${prefix}/acheteur`} className="hover:text-slate-900 transition-colors">
              Acheteurs
            </Link>
          </li>
          <li className="text-slate-400">/</li>
          <li className="text-slate-900 font-medium">{seg.title}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 text-center">
          <span className="inline-block text-sm font-semibold text-primary-600 uppercase tracking-wide mb-4">
            Benchmark acheteur · {seg.category || 'SaaS'}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {seg.title}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
            {seg.subtitle}
          </p>

          {/* Hero stat */}
          <div className="inline-flex items-center gap-6 bg-white rounded-2xl border border-slate-200 shadow-sm px-8 py-6 mb-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-primary-600">{seg.heroStat.value}</div>
              <div className="text-sm text-slate-600 mt-1">{seg.heroStat.label}</div>
            </div>
            <div className="h-12 w-px bg-slate-200" />
            <span className="inline-flex items-center gap-2 text-sm font-medium text-slate-700 bg-slate-100 px-4 py-2 rounded-full">
              🔒 Données anonymisées
            </span>
          </div>

          {/* Keywords pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {seg.keywords.map((kw) => (
              <span
                key={kw}
                className="inline-block px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-medium rounded-full border border-slate-200"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {/* Section produits */}
        {products.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {seg.category ? `Produits ${seg.category}` : 'Tous les produits SaaS'}
              </h2>
              <p className="text-slate-600">
                Prix moyens constatés sur la base de données d&apos;achats anonymisées.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div
                  key={product.slug}
                  className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{product.logoEmoji}</span>
                    <div>
                      <h3 className="font-bold text-slate-900">{product.name}</h3>
                      <span className="inline-block text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full mt-1">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 flex-1">{product.description}</p>

                  {/* Prix moyen */}
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">
                      Prix moyen mensuel
                    </p>
                    <div className="text-3xl font-bold text-primary-600">
                      {product.stats.avgPriceMonthly.toLocaleString('fr-FR')} €
                      <span className="text-base font-normal text-slate-500">/mois</span>
                    </div>
                  </div>

                  {/* Fourchette */}
                  <div className="flex items-center gap-2 text-sm mb-6">
                    <span className="px-2 py-1 bg-green-50 text-green-700 rounded font-medium">
                      min {product.priceRange.min} €
                    </span>
                    <span className="text-slate-400">—</span>
                    <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded font-medium">
                      max {product.priceRange.max} €
                    </span>
                    <span className="text-xs text-slate-400">/ {product.priceRange.unit}</span>
                  </div>

                  <Link
                    href={`${prefix}/prix/${product.slug}`}
                    className="block w-full text-center py-2.5 px-4 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors text-sm"
                  >
                    Voir le détail →
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section comparatifs */}
        {comparisons.length > 0 && (
          <section>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Comparatifs disponibles</h2>
              <p className="text-slate-600">
                Comparaisons détaillées des solutions{seg.category ? ` ${seg.category}` : ''}, basées
                sur des données réelles.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {comparisons.map((comparison) => {
                const productA = PRODUCTS.find((p) => p.slug === comparison.productA)
                const productB = PRODUCTS.find((p) => p.slug === comparison.productB)
                return (
                  <Link
                    key={comparison.slug}
                    href={`${prefix}/compare/${comparison.slug}`}
                    className="bg-white rounded-xl border border-slate-200 p-5 hover:border-primary-300 hover:shadow-md transition-all group flex items-center gap-4"
                  >
                    <div className="flex items-center gap-2 text-2xl shrink-0">
                      <span>{productA?.logoEmoji ?? '📦'}</span>
                      <span className="text-slate-400 text-lg">vs</span>
                      <span>{productB?.logoEmoji ?? '📦'}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 group-hover:text-primary-600 transition-colors truncate">
                        {productA?.name ?? comparison.productA} vs {productB?.name ?? comparison.productB}
                      </p>
                      <p className="text-xs text-slate-500 mt-0.5">{comparison.category}</p>
                    </div>
                    <svg
                      className="w-4 h-4 text-slate-400 group-hover:text-primary-600 shrink-0 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                )
              })}
            </div>
          </section>
        )}

        {/* CTA final */}
        <section className="bg-gradient-to-br from-primary-600 to-primary-700 rounded-2xl p-10 md:p-16 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Accédez à vos données personnalisées
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto text-lg">
            Comparez les prix selon la taille de votre entreprise, votre secteur et vos critères.
            Données réelles, anonymisées, actualisées.
          </p>
          <a
            href="https://app.sidebysaas.com/auth/register?redirectTo=/buyer"
            rel="nofollow noopener noreferrer"
            target="_blank"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl text-lg font-semibold bg-white text-primary-700 hover:bg-primary-50 transition-colors shadow-lg"
          >
            {seg.cta}
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <p className="text-primary-200 text-sm mt-4">🔒 Données anonymisées · Aucun engagement</p>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link href={prefix} className="text-slate-400 hover:text-white font-semibold">
              Side by SaaS © {new Date().getFullYear()}
            </Link>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-400">
              <Link href={prefix} className="hover:text-white">
                Accueil
              </Link>
              <Link href={`${prefix}/acheteur`} className="hover:text-white">
                Acheteurs
              </Link>
              <Link href={`${prefix}/mentions`} className="hover:text-white">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

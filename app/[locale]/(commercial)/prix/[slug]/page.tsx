import { getProductBySlug, getComparisons, PRODUCTS } from '@/lib/saas-products'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return {}
  return {
    title: `Prix de ${product.name} en France : données réelles 2025 | Side by SaaS`,
    description: `Découvrez ce que les entreprises françaises paient vraiment pour ${product.name}. Benchmark par taille d'entreprise basé sur ${product.stats.companiesCount} contributions anonymisées.`,
    openGraph: {
      title: `Prix réel de ${product.name} — données anonymisées`,
      description: `Prix moyen : ${product.stats.avgPriceMonthly}€/mois. Données de ${product.stats.companiesCount} entreprises.`,
      url: `https://sidebysaas.com/fr/prix/${slug}`,
      siteName: 'Side by SaaS',
      type: 'article',
    },
  }
}

export default async function PrixPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug, locale } = await params
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const prefix = `/${locale}`

  // Alternatives: same category, exclude current
  const alternatives = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  ).slice(0, 3)

  // If fewer than 3 same-category, fill with others
  const otherAlts = PRODUCTS.filter(
    (p) => p.slug !== product.slug && p.category !== product.category,
  ).slice(0, 3 - alternatives.length)
  const allAlternatives = [...alternatives, ...otherAlts].slice(0, 3)

  // Price range bar: percentage position of avg
  const range = product.priceRange.max - product.priceRange.min
  const avgPct =
    range > 0
      ? Math.round(((product.stats.avgPriceMonthly - product.priceRange.min) / range) * 100)
      : 50
  const clampedPct = Math.max(5, Math.min(95, avgPct))

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-slate-500 mb-6" aria-label="Breadcrumb">
            <Link href={`${prefix}`} className="hover:text-slate-700 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href={`${prefix}/compare`} className="hover:text-slate-700 transition-colors">
              Prix
            </Link>
            <span>/</span>
            <span className="text-slate-700">{product.name}</span>
          </nav>

          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
              {product.logoEmoji}
            </div>
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                Prix de {product.name} en France : ce que les entreprises paient vraiment
              </h1>
              <p className="text-slate-500 text-sm">{product.description}</p>
            </div>
          </div>

          {/* Big stat */}
          <div className="mt-8 bg-primary-50 border border-primary-100 rounded-2xl p-8 text-center">
            <div className="text-5xl font-bold text-primary-700 mb-2">
              {product.stats.avgPriceMonthly.toLocaleString('fr-FR')} €
              <span className="text-2xl font-semibold text-primary-500">/mois</span>
            </div>
            <p className="text-primary-600 font-medium">en moyenne</p>
            <p className="text-slate-500 text-sm mt-1">
              Médiane basée sur {product.stats.companiesCount} entreprises
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm text-slate-600">
            <span>🔒 Données anonymisées</span>
            <span>·</span>
            <span>📊 {product.stats.companiesCount} entreprises</span>
            <span>·</span>
            <span>Mis à jour mars 2025</span>
          </div>
        </div>
      </section>

      {/* Fourchette de prix */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Fourchette de prix</h2>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-8">
          {/* Bar */}
          <div className="relative mb-6">
            <div className="h-3 bg-slate-100 rounded-full overflow-visible relative">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-primary-500 rounded-full"
                style={{ width: `${clampedPct}%` }}
              />
              {/* Avg indicator */}
              <div
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2"
                style={{ left: `${clampedPct}%` }}
              >
                <div className="w-5 h-5 bg-primary-600 border-2 border-white rounded-full shadow-md" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 text-center gap-4">
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                Prix minimum
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {product.priceRange.min} €
              </div>
              <div className="text-xs text-slate-400 mt-1">{product.priceRange.unit}</div>
            </div>
            <div className="bg-primary-50 border border-primary-100 rounded-xl p-4">
              <div className="text-xs text-primary-600 font-medium uppercase tracking-wide mb-1">
                Prix médian
              </div>
              <div className="text-2xl font-bold text-primary-700">
                {product.stats.avgPriceMonthly.toLocaleString('fr-FR')} €
              </div>
              <div className="text-xs text-primary-400 mt-1">par mois</div>
            </div>
            <div className="bg-slate-50 rounded-xl p-4">
              <div className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">
                Prix maximum
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {product.priceRange.max} €
              </div>
              <div className="text-xs text-slate-400 mt-1">{product.priceRange.unit}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Par taille d'entreprise */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Par taille d&apos;entreprise</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {product.stats.sizeBreakdown.map((tier, idx) => {
            const colors = [
              'from-blue-50 to-blue-100 border-blue-100',
              'from-violet-50 to-violet-100 border-violet-100',
              'from-orange-50 to-orange-100 border-orange-100',
            ]
            const textColors = ['text-blue-700', 'text-violet-700', 'text-orange-700']
            return (
              <div
                key={tier.label}
                className={`bg-gradient-to-b ${colors[idx] ?? colors[0]} rounded-xl border p-6 text-center`}
              >
                <div className={`text-3xl font-bold ${textColors[idx] ?? textColors[0]} mb-1`}>
                  {tier.avg.toLocaleString('fr-FR')} €
                </div>
                <div className="text-sm font-medium text-slate-600 mb-1">par mois en moyenne</div>
                <div className="text-xs text-slate-500">{tier.label}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Secteurs */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Secteurs qui utilisent {product.name}
        </h2>
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
          <div className="flex flex-wrap gap-3">
            {product.stats.topSectors.map((sector) => (
              <span
                key={sector}
                className="bg-primary-50 text-primary-700 text-sm font-medium px-4 py-2 rounded-full border border-primary-100"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Alternatives */}
      {allAlternatives.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">
            Alternatives à {product.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {allAlternatives.map((alt) => {
              // Build comparison slug (always smaller slug-vs-larger slug based on PRODUCTS order)
              const compSlug =
                PRODUCTS.indexOf(product) < PRODUCTS.indexOf(alt)
                  ? `${product.slug}-vs-${alt.slug}`
                  : `${alt.slug}-vs-${product.slug}`
              return (
                <div
                  key={alt.slug}
                  className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{alt.logoEmoji}</span>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{alt.name}</div>
                      <div className="text-xs text-slate-500">{alt.category}</div>
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    Moy.{' '}
                    <span className="font-semibold text-slate-900">
                      {alt.stats.avgPriceMonthly.toLocaleString('fr-FR')} €/mois
                    </span>
                  </div>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Link
                      href={`${prefix}/compare/${compSlug}`}
                      className="text-xs text-center bg-slate-50 border border-slate-200 text-slate-700 px-3 py-2 rounded-lg hover:border-primary-200 hover:text-primary-700 transition-colors font-medium"
                    >
                      Comparer {product.name} vs {alt.name}
                    </Link>
                    <Link
                      href={`${prefix}/prix/${alt.slug}`}
                      className="text-xs text-center text-primary-600 hover:underline font-medium"
                    >
                      Prix de {alt.name} →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Comparez {product.name} avec votre situation réelle
          </h2>
          <p className="text-slate-600 mb-8">
            Accédez aux benchmarks filtrés par votre taille d&apos;entreprise et votre secteur.
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
    </div>
  )
}

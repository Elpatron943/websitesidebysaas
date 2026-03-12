import type { Metadata } from 'next'

const baseUrl = 'https://sidebysaas.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params

  return {
    title: 'Side by SaaS | Benchmark SaaS sur données réelles',
    description: 'Comparez les logiciels SaaS avec de vraies données d\'achats anonymisées. La seule plateforme B2B qui vous dit ce que les entreprises paient vraiment.',
    openGraph: {
      title: 'Side by SaaS | Benchmark SaaS sur données réelles',
      description: 'Real buyer data. Real SaaS battles. Benchmark et comparaison SaaS pour acheteurs IT et éditeurs.',
      url: `${baseUrl}/${locale}`,
      siteName: 'Side by SaaS',
      type: 'website',
    },
    alternates: {
      canonical: `${baseUrl}/fr`,
      languages: {
        'fr': `${baseUrl}/fr`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },
  }
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

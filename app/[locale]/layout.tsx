import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Side by SaaS | Benchmark SaaS sur données réelles',
  description: 'Comparez les logiciels SaaS avec de vraies données d\'achats anonymisées. La seule plateforme B2B qui vous dit ce que les entreprises paient vraiment.',
  openGraph: {
    title: 'Side by SaaS | Benchmark SaaS sur données réelles',
    description: 'Real buyer data. Real SaaS battles. Benchmark et comparaison SaaS pour acheteurs IT et éditeurs.',
    url: 'https://sidebysaas.com',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

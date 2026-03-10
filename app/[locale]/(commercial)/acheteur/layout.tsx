import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Acheteur | Side by SaaS',
  description: 'Accédez aux données d\'achats réels de milliers d\'entreprises. Comparez, benchmarkez et négociez vos logiciels SaaS en connaissance de cause.',
  openGraph: {
    title: 'Espace Acheteur | Side by SaaS',
    description: 'Benchmark SaaS basé sur de vraies données d\'achats anonymisées.',
    url: 'https://sidebysaas.com/fr/acheteur',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

export default function AcheteurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

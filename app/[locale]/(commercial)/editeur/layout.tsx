import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Espace Éditeur | Side by SaaS',
  description: 'Comprenez votre positionnement prix sur le marché réel. Accédez aux données de marché anonymisées pour les éditeurs SaaS.',
  openGraph: {
    title: 'Espace Éditeur | Side by SaaS',
    description: 'Données de marché réelles pour les éditeurs SaaS : positionnement, prix pratiqués, benchmark concurrents.',
    url: 'https://sidebysaas.com/fr/editeur',
    siteName: 'Side by SaaS',
    type: 'website',
  },
}

export default function EditeurLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

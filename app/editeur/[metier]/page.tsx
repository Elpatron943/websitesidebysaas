import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'

const METIERS: Record<string, { title: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  product: {
    title: 'Product',
    subtitle: 'Pilotez votre roadmap et votre positionnement avec des signaux marché concrets.',
    arguments: [
      { titre: 'Positionnement face à la concurrence', description: 'Voyez comment vos produits sont comparés aux autres. Identifiez les forces et faiblesses perçues pour prioriser votre backlog et vos messages produit.' },
      { titre: 'Prix et positionnement réel du marché', description: 'Les acheteurs partagent les prix qu\'ils paient. Utilisez ces données agrégées pour calibrer votre pricing et vos packages sans dépendre du seul discours commercial.' },
      { titre: 'Battle Cards pour prioriser', description: 'Consultez les Battle Cards où vous apparaissez. Comprenez dans quels contextes (taille d\'entreprise, secteur) vous êtes choisis ou évincés pour affiner votre stratégie produit.' },
      { titre: 'Signaux pour la roadmap', description: 'Les comparaisons et retours acheteurs donnent des signaux directs sur les fonctionnalités attendues et les écarts perçus avec la concurrence.' },
    ],
  },
  sales: {
    title: 'Sales',
    subtitle: 'Armez vos équipes commerciales avec des arguments factuels et des données de marché.',
    arguments: [
      { titre: 'Arguments de vente factuels', description: 'Basez vos démonstrations sur des comparaisons réelles (prix, fonctionnalités) plutôt que sur du marketing. Les Battle Cards donnent un langage commun avec l\'acheteur.' },
      { titre: 'Prix de référence et fourchettes marché', description: 'Connaissez les prix réellement payés dans chaque contexte. Négociez en connaissance de cause et évitez les déconvenues en fin de cycle.' },
      { titre: 'Différenciation claire', description: 'Identifiez où vous gagnez face à la concurrence (fonctionnalités, prix, cas d\'usage) et où vous êtes en retrait. Adaptez votre discours commercial en conséquence.' },
      { titre: 'Battle Cards en démo', description: 'Montrez aux prospects comment vous vous situez dans les comparatifs. Crédibilité et transparence renforcent la confiance en phase de closing.' },
    ],
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Construisez des messages différenciants et pilotez votre visibilité là où on vous compare.',
    arguments: [
      { titre: 'Visibilité là où on vous compare', description: 'Les acheteurs comparent déjà vos solutions. Rejoignez la plateforme pour maîtriser votre présence : certifiez votre entreprise et contrôlez le message.' },
      { titre: 'Messages alignés sur le marché', description: 'Utilisez les comparaisons (fonctionnalités, prix, retours) pour aligner vos campagnes sur ce que le marché perçoit vraiment. Évitez le décalage entre promesse et réalité.' },
      { titre: 'Insights concurrence pour le positionnement', description: 'Voyez qui sont vos concurrents directs et comment vous vous situez. Idéal pour les études de positionnement, les battle cards internes et les briefs agences.' },
      { titre: 'Contenu et preuves', description: 'Les Battle Cards et les données agrégées fournissent des preuves utilisables en contenu (landing pages, études, comparatifs) sans dépendre uniquement des témoignages.' },
    ],
  },
  direction: {
    title: 'Direction',
    subtitle: 'Vision marché, stratégie et pilotage de l\'offre avec des données acheteurs.',
    arguments: [
      { titre: 'Vision marché factuelle', description: 'Prix pratiqués, positionnement perçu et concurrence directe : une vue agrégée pour les décisions stratégiques, sans dépendre du seul retour commercial.' },
      { titre: 'Pilotage de l\'offre et du pricing', description: 'Les données de comparaison et les Battle Cards éclairent les choix d\'offre, de packaging et de positionnement tarifaire face à la concurrence.' },
      { titre: 'Signaux acheteurs', description: 'Les retours et comparaisons reflètent ce que le marché attend. Utilisez-les pour prioriser les investissements produit, marketing et vente.' },
      { titre: 'Certification et crédibilité', description: 'Une entreprise certifiée sur la plateforme renforce la crédibilité auprès des acheteurs. Pilotez la présence de votre marque là où les décisions se prennent.' },
    ],
  },
}

const CARD_ICONS = [
  <svg key="0" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="1" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="3" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
]

export function generateStaticParams() {
  return Object.keys(METIERS).map((metier) => ({ metier }))
}

export default function EditeurMetierPage({ params }: { params: { metier: string } }) {
  const metier = params.metier?.toLowerCase()
  const data = metier ? METIERS[metier] : null
  if (!data) notFound()

  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="relative w-full aspect-[21/9] min-h-[200px] bg-gradient-to-br from-slate-600 to-slate-800" aria-hidden />
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-slate-50/80" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-10 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour à l&apos;accueil
            </Link>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Éditeur de SaaS</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Pour les équipes {data.title}</h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">{data.subtitle}</p>
          </div>
        </section>
        <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-4">
            {data.arguments.map((arg, index) => (
              <article key={index} className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-200/80 transition-all duration-200 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                <div className="flex gap-5 p-6 sm:p-7">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                    {CARD_ICONS[index % CARD_ICONS.length]}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-base font-semibold text-slate-900 mb-2 leading-snug">{arg.titre}</h2>
                    <p className="text-slate-600 text-[15px] leading-relaxed">{arg.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-14 text-center">
            <div className="inline-flex flex-col items-center gap-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm px-8 py-8 sm:px-10 sm:py-9 max-w-md">
              <p className="text-slate-700 font-medium text-lg leading-snug">Prêt à maîtriser votre positionnement sur Side by SaaS ?</p>
              <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all">
                Créer mon espace éditeur
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
              <p className="text-xs text-slate-500">Gratuit pour commencer</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

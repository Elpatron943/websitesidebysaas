import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getSignupUrl } from '@/lib/commercial-auth-links'
import directionBanner from '../../direction/direction.png'

const SOUS_DIRECTIONS: Record<string, { title: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  achats: {
    title: 'Achats',
    subtitle: 'Donnez à la direction Achats des références marché et des comparatifs pour piloter les dépenses SaaS.',
    arguments: [
      { titre: 'Prix de référence pour les achats', description: 'Les données agrégées de la plateforme fournissent des fourchettes de prix par contexte. Les équipes achats peuvent négocier et valider les devis en s’appuyant sur des références réelles.' },
      { titre: 'Comparatifs pour les appels d’offres', description: 'Vos Battle Cards et comparatifs aident les acheteurs à vous évaluer objectivement. Une présence certifiée renforce la crédibilité dans les process d’achat.' },
      { titre: 'Alignement vente et achats', description: 'Réduisez les décalages entre ce que la vente présente et ce que les achats comparent. Un message et des preuves alignés accélèrent les cycles.' },
      { titre: 'TCO et coûts cachés', description: 'Mettez en avant votre TCO et les coûts maîtrisés là où les acheteurs comparent. Les retours d’autres acheteurs sur la plateforme renforcent la confiance.' },
    ],
  },
  finance: {
    title: 'Finance',
    subtitle: 'Armez la direction Finance avec des indicateurs et références pour le pilotage des coûts et des budgets SaaS.',
    arguments: [
      { titre: 'Données pour les modèles de coûts', description: 'Les prix et fourchettes partagés sur la plateforme aident la finance à calibrer les budgets et modèles de coûts par segment ou par direction.' },
      { titre: 'Crédibilité auprès de la finance', description: 'Une entreprise certifiée et bien positionnée dans les comparatifs facilite les validations budgétaires et les présentations internes.' },
      { titre: 'Prévisibilité et renouvellements', description: 'Les tendances et références marché aident la finance à anticiper les renouvellements et à challenger les évolutions tarifaires.' },
      { titre: 'Gouvernance et conformité', description: 'Les comparatifs et preuves factuelles soutiennent les processus de validation et d’audit demandés par la direction Finance.' },
    ],
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Alignez le marketing avec les signaux marché et la présence de votre marque là où les acheteurs vous comparent.',
    arguments: [
      { titre: 'Visibilité là où on vous compare', description: 'Les acheteurs comparent déjà vos solutions. Maîtrisez votre présence : certifiez votre fiche, contrôlez le message et les preuves (prix, fonctionnalités).' },
      { titre: 'Messages alignés sur le marché', description: 'Utilisez les comparaisons et retours pour aligner les campagnes sur ce que le marché perçoit. Évitez le décalage entre promesse et réalité perçue.' },
      { titre: 'Contenu et preuves', description: 'Battle Cards et données agrégées fournissent des preuves utilisables en contenu (landing pages, études, comparatifs) sans dépendre uniquement des témoignages.' },
      { titre: 'Positionnement et concurrence', description: 'Voyez qui sont vos concurrents directs et comment vous vous situez. Idéal pour les études de positionnement et les briefs agences.' },
    ],
  },
  rh: {
    title: 'Ressources humaines',
    subtitle: 'Soutenez la direction RH dans le choix et le pilotage des outils RH et formation avec des références marché.',
    arguments: [
      { titre: 'Comparatifs outils RH et formation', description: 'Les données de la plateforme aident les RH à comparer les solutions (recrutement, formation, RHT) sur les prix et fonctionnalités réels.' },
      { titre: 'Crédibilité auprès des décideurs RH', description: 'Une présence certifiée et des comparatifs objectifs renforcent la confiance des directions RH et des acheteurs internes.' },
      { titre: 'Alignement avec les process achats', description: 'Donnez aux RH le même langage que les achats (Battle Cards, prix de référence) pour des process d’achat plus fluides.' },
      { titre: 'Signaux pour la stratégie RH', description: 'Les retours et comparaisons sur les outils RH reflètent les attentes du marché. Utilisez-les pour prioriser les investissements et la roadmap.' },
    ],
  },
}

const CARD_ICONS = [
  <svg key="0" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="1" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="3" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
]

export function generateStaticParams() {
  return Object.keys(SOUS_DIRECTIONS).map((sous) => ({ sous }))
}

export default function EditeurDirectionSousPage({ params }: { params: { sous: string } }) {
  const sous = params.sous?.toLowerCase()
  const data = sous ? SOUS_DIRECTIONS[sous] : null
  if (!data) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="relative w-full aspect-[21/9] min-h-[200px] bg-slate-200">
          <Image src={directionBanner} alt="Direction" fill className="object-cover" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" aria-hidden />
        </section>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-slate-50/80" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-10 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour à l&apos;accueil
            </Link>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-[0.2em] mb-4">Éditeur de SaaS · Direction</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Pour la direction {data.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>
        </section>
        <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-4">
            {data.arguments.map((arg, index) => (
              <article key={index} className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-200/80 transition-all duration-200 overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden />
                <div className="flex gap-5 p-6 sm:p-7">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600">
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
              <p className="text-slate-700 font-medium text-lg leading-snug">Prêt à maîtriser votre positionnement sur Side By SaaS ?</p>
              {getSignupUrl('/editor') ? (
                <a href={getSignupUrl('/editor')!} className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all">
                  Créer mon espace éditeur
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl shadow-sm cursor-default">
                  Créer mon espace éditeur
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              )}
              <p className="text-xs text-slate-500">Gratuit pour commencer</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

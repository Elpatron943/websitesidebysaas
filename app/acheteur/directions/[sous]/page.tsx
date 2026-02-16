import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'

const DIRECTIONS: Record<string, { title: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  achats: {
    title: 'Achats',
    subtitle: 'Comparez les offres, négociez sur des prix réels et rationalisez votre portefeuille SaaS avec des données vérifiées.',
    arguments: [
      { titre: 'Prix réels et fourchettes marché', description: 'Accédez aux prix réellement payés par des entreprises similaires. Négociez en connaissance de cause et évitez les surcoûts cachés.' },
      { titre: 'Comparatifs multi-critères', description: 'Évaluez les solutions sur les fonctionnalités, le support, les SLA et les coûts totaux. Construisez des tableaux de bord pour vos appels d\'offres.' },
      { titre: 'Rationalisation du portefeuille', description: 'Identifiez les doublons et les outils sous-utilisés. Justifiez vos recommandations avec des données partagées par d\'autres acheteurs.' },
      { titre: 'Benchmark fournisseurs', description: 'Suivez comment vos fournisseurs actuels sont perçus et comparés. Renégociez ou consolidez avec des arguments factuels.' },
    ],
  },
  finance: {
    title: 'Finance',
    subtitle: 'Pilotez les coûts SaaS avec des références marché et des données de consommation pour les budgets et les prévisions.',
    arguments: [
      { titre: 'Coûts de référence par segment', description: 'Calibrez vos budgets et modèles de coûts avec les prix médians et fourchettes par taille d\'entreprise et secteur.' },
      { titre: 'Visibilité sur le TCO', description: 'Intégrez les coûts cachés (implémentation, formation, montée en charge) via les retours d\'autres acheteurs pour un TCO réaliste.' },
      { titre: 'Prévisions et planification', description: 'Anticipez les renouvellements et les évolutions tarifaires en vous appuyant sur les tendances et comparaisons du marché.' },
      { titre: 'Contrôle et conformité', description: 'Documentez les choix d\'achat avec des comparatifs et des prix de référence pour les audits et la gouvernance.' },
    ],
  },
  marketing: {
    title: 'Marketing',
    subtitle: 'Choisissez les bons outils marketing (CRM, automation, analytics) en vous basant sur des comparaisons et des retours réels.',
    arguments: [
      { titre: 'Comparatifs outils marketing', description: 'Évaluez les solutions (CRM, automation, analytics, content) sur les fonctionnalités et les prix pratiqués par des pairs.' },
      { titre: 'Retours terrain et cas d\'usage', description: 'Découvrez comment d\'autres équipes marketing utilisent et notent les outils. Évitez les mauvaises surprises en déploiement.' },
      { titre: 'Pricing et packages', description: 'Comprenez les modèles tarifaires réels (par siège, par volume, modules) pour aligner outil et budget.' },
      { titre: 'Intégration et stack', description: 'Voyez quels outils sont souvent utilisés ensemble et quelles intégrations sont critiques pour votre stack.' },
    ],
  },
  direction: {
    title: 'Direction',
    subtitle: 'Vision consolidée sur les dépenses et les choix SaaS de l\'entreprise, avec des références pour la stratégie et le pilotage.',
    arguments: [
      { titre: 'Vue consolidée des dépenses SaaS', description: 'Rassemblez les comparaisons et prix de référence par direction pour une vision globale du portefeuille SaaS.' },
      { titre: 'Décisions basées sur des données', description: 'Appuyez les arbitrages (build vs buy, consolidation) sur des benchmarks et retours acheteurs plutôt que sur le seul discours fournisseur.' },
      { titre: 'Alignement achats et métiers', description: 'Donnez aux directions un langage commun (Battle Cards, prix de référence) pour des processus d\'achat plus fluides.' },
      { titre: 'Gouvernance et bonnes pratiques', description: 'Référencez les bonnes pratiques d\'achat SaaS et les critères de sélection utilisés par d\'autres organisations.' },
    ],
  },
  rh: {
    title: 'RH',
    subtitle: 'Comparez les solutions SIRH, recrutement et formation avec des prix réels et des retours d\'autres DRH.',
    arguments: [
      { titre: 'SIRH et paie', description: 'Évaluez les offres SIRH et paie sur les fonctionnalités et les coûts réels pratiqués par des entreprises de votre taille.' },
      { titre: 'Recrutement et ATS', description: 'Comparez les outils de recrutement et ATS pour optimiser vos coûts et votre processus de sourcing.' },
      { titre: 'Formation et développement', description: 'Identifiez les plateformes LMS et de formation les plus adaptées grâce aux retours et comparatifs marché.' },
      { titre: 'Bien-être et engagement', description: 'Découvrez comment d\'autres entreprises choisissent et budgétisent leurs outils bien-être et engagement.' },
    ],
  },
  it: {
    title: 'IT / DSI',
    subtitle: 'Pilotez les achats logiciels et infrastructures avec des références marché et des comparatifs techniques.',
    arguments: [
      { titre: 'Infrastructure et cloud', description: 'Comparez les offres cloud, hébergement et outils DevOps avec des prix et retours d\'autres DSI.' },
      { titre: 'Sécurité et conformité', description: 'Évaluez les solutions de sécurité (IAM, SSO, SOC) et de conformité avec des données de coûts réels.' },
      { titre: 'Productivité et collaboration', description: 'Rationalisez votre stack (messagerie, visio, docs) en vous appuyant sur des comparatifs et usages réels.' },
      { titre: 'Support et gestion des actifs', description: 'Choisissez vos outils de support, ticketing et gestion d\'actifs IT avec des références marché.' },
    ],
  },
  juridique: {
    title: 'Juridique',
    subtitle: 'Choisissez vos outils juridiques (contrats, conformité, property) en vous basant sur des comparaisons et des prix de référence.',
    arguments: [
      { titre: 'Gestion des contrats', description: 'Comparez les CLM et outils de gestion contractuelle sur les fonctionnalités et les coûts pratiqués.' },
      { titre: 'Conformité et RGPD', description: 'Évaluez les solutions de conformité et protection des données avec des retours d\'autres équipes juridiques.' },
      { titre: 'Property et IP', description: 'Découvrez les outils de gestion de la propriété intellectuelle et des actifs immatériels avec des références prix.' },
      { titre: 'Collaboration juridique', description: 'Identifiez les plateformes de travail juridique les plus adaptées à votre organisation.' },
    ],
  },
  operations: {
    title: 'Opérations',
    subtitle: 'Optimisez vos outils opérationnels (logistique, qualité, projet) avec des données de prix et des comparatifs terrain.',
    arguments: [
      { titre: 'Logistique et supply chain', description: 'Comparez les solutions de gestion logistique et supply chain avec des prix et retours d\'autres acheteurs.' },
      { titre: 'Qualité et processus', description: 'Évaluez les outils qualité, QHSE et gestion des processus sur les coûts et fonctionnalités.' },
      { titre: 'Gestion de projet', description: 'Choisissez vos outils de gestion de projet et de portefeuille avec des références marché.' },
      { titre: 'Support et service client', description: 'Rationalisez vos outils support et relation client avec des comparatifs et données de coûts réels.' },
    ],
  },
}

const CARD_ICONS = [
  <svg key="0" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="1" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="3" className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
]

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((sous) => ({ sous }))
}

export default function AcheteurDirectionPage({ params }: { params: { sous: string } }) {
  const sous = params.sous?.toLowerCase()
  const data = sous ? DIRECTIONS[sous] : null
  if (!data) notFound()

  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || 'http://localhost:3000'

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="relative w-full aspect-[21/9] min-h-[200px] bg-gradient-to-br from-blue-600 to-blue-800" aria-hidden />
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/60 via-white to-slate-50/80" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <Link href="/" className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-10 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour à l&apos;accueil
            </Link>
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">Acheteur SaaS</p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">Pour la direction {data.title}</h1>
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
              <p className="text-slate-700 font-medium text-lg leading-snug">Prêt à comparer et négocier avec des données réelles ?</p>
              <a href={`${platformUrl}/auth/buyer`} className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all">
                Accéder au marché
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

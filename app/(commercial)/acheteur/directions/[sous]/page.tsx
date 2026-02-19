import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getLoginUrl } from '@/lib/commercial-auth-links'
import { getAcheteurBannerUrl } from '@/lib/acheteur-banner'

const DIRECTIONS: Record<string, { title: string; intro: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  achats: {
    title: 'Achats',
    intro: 'En vous inscrivant sur Side by SaaS, vous accédez aux prix réellement payés par d\'autres entreprises pour leurs outils SaaS. En tant qu\'acheteur ou direction achats, vous négociez en connaissance de cause, évitez les surcoûts cachés et rationalisez votre portefeuille avec des données vérifiées par vos pairs.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Prix réels et fourchettes marché', description: 'Accédez aux prix réellement payés par des entreprises similaires. Négociez en connaissance de cause et évitez les surcoûts cachés sur vos appels d\'offres et renouvellements.' },
      { titre: 'Comparatifs multi-critères', description: 'Évaluez les solutions sur les fonctionnalités, le support, les SLA et les coûts totaux. Construisez des tableaux de bord et des Battle Cards pour vos consultations.' },
      { titre: 'Rationalisation du portefeuille', description: 'Identifiez les doublons et les outils sous-utilisés. Justifiez vos recommandations de consolidation avec des données partagées par d\'autres acheteurs.' },
      { titre: 'Benchmark fournisseurs', description: 'Suivez comment vos fournisseurs actuels sont perçus et comparés. Renégociez ou consolidez avec des arguments factuels pour la direction.' },
    ],
  },
  finance: {
    title: 'Finance',
    intro: 'En vous inscrivant, vous pilotez les coûts SaaS avec des références marché et des données de consommation réelles. En tant que direction finance, vous calibrez les budgets, prévisions et modèles de coûts en vous appuyant sur ce que paient réellement des entreprises de taille et de secteur comparables.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Coûts de référence par segment', description: 'Calibrez vos budgets et modèles de coûts avec les prix médians et fourchettes par taille d\'entreprise et secteur. Des données pour valider ou challenger les demandes métier.' },
      { titre: 'Visibilité sur le TCO', description: 'Intégrez les coûts cachés (implémentation, formation, montée en charge) via les retours d\'autres acheteurs pour un TCO réaliste dans vos business cases.' },
      { titre: 'Prévisions et planification', description: 'Anticipez les renouvellements et les évolutions tarifaires en vous appuyant sur les tendances et comparaisons du marché SaaS.' },
      { titre: 'Contrôle et conformité', description: 'Documentez les choix d\'achat avec des comparatifs et des prix de référence pour les audits et la gouvernance financière.' },
    ],
  },
  marketing: {
    title: 'Marketing',
    intro: 'En vous inscrivant, vous choisissez les bons outils marketing (CRM, automation, analytics, content) en vous basant sur des comparaisons et des retours réels d\'autres équipes. En tant que direction marketing, vous évitez la surenchère fournisseur et alignez outil et budget avec les usages du marché.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Comparatifs outils marketing', description: 'Évaluez les solutions (CRM, automation, analytics, content) sur les fonctionnalités et les prix pratiqués par des pairs. Découvrez les fourchettes par segment.' },
      { titre: 'Retours terrain et cas d\'usage', description: 'Découvrez comment d\'autres équipes marketing utilisent et notent les outils. Évitez les mauvaises surprises en déploiement et en adoption.' },
      { titre: 'Pricing et packages', description: 'Comprenez les modèles tarifaires réels (par siège, par volume, modules) pour aligner outil et budget et négocier les bons packages.' },
      { titre: 'Intégration et stack', description: 'Voyez quels outils sont souvent utilisés ensemble et quelles intégrations sont critiques pour votre stack marketing.' },
    ],
  },
  direction: {
    title: 'Direction',
    intro: 'En vous inscrivant, vous disposez d\'une vision consolidée sur les dépenses et les choix SaaS de l\'entreprise. En tant que direction générale ou opérationnelle, vous pilotez la stratégie et les arbitrages (build vs buy, consolidation) en vous appuyant sur des références marché et des retours acheteurs, plutôt que sur le seul discours fournisseur.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Vue consolidée des dépenses SaaS', description: 'Rassemblez les comparaisons et prix de référence par direction pour une vision globale du portefeuille SaaS et des opportunités d\'économies.' },
      { titre: 'Décisions basées sur des données', description: 'Appuyez les arbitrages (build vs buy, consolidation, renouvellement) sur des benchmarks et retours acheteurs. Justifiez vos choix auprès du comité.' },
      { titre: 'Alignement achats et métiers', description: 'Donnez aux directions un langage commun (Battle Cards, prix de référence) pour des processus d\'achat plus fluides et des budgets réalistes.' },
      { titre: 'Gouvernance et bonnes pratiques', description: 'Référencez les bonnes pratiques d\'achat SaaS et les critères de sélection utilisés par d\'autres organisations de votre taille.' },
    ],
  },
  rh: {
    title: 'RH',
    intro: 'En vous inscrivant, vous comparez les solutions SIRH, recrutement, formation et bien-être avec des prix réels et des retours d\'autres DRH. En tant que direction RH, vous optimisez vos investissements outils en vous basant sur ce que paient et utilisent des entreprises comparables.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'SIRH et paie', description: 'Évaluez les offres SIRH et paie sur les fonctionnalités et les coûts réels pratiqués par des entreprises de votre taille. Calibrez vos appels d\'offres.' },
      { titre: 'Recrutement et ATS', description: 'Comparez les outils de recrutement et ATS pour optimiser vos coûts et votre processus de sourcing avec des références marché.' },
      { titre: 'Formation et développement', description: 'Identifiez les plateformes LMS et de formation les plus adaptées grâce aux retours et comparatifs partagés par d\'autres directions RH.' },
      { titre: 'Bien-être et engagement', description: 'Découvrez comment d\'autres entreprises choisissent et budgétisent leurs outils bien-être et engagement. Évitez la surenchère.' },
    ],
  },
  it: {
    title: 'IT / DSI',
    intro: 'En vous inscrivant, vous pilotez les achats logiciels et infrastructures avec des références marché et des comparatifs techniques. En tant que DSI ou direction IT, vous rationalisez votre stack (cloud, sécurité, productivité) en vous appuyant sur les prix et retours partagés par d\'autres responsables techniques.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Infrastructure et cloud', description: 'Comparez les offres cloud, hébergement et outils DevOps avec des prix et retours d\'autres DSI. Anticipez les coûts à la montée en charge.' },
      { titre: 'Sécurité et conformité', description: 'Évaluez les solutions de sécurité (IAM, SSO, SOC) et de conformité avec des données de coûts réels et des retours terrain.' },
      { titre: 'Productivité et collaboration', description: 'Rationalisez votre stack (messagerie, visio, docs) en vous appuyant sur des comparatifs et usages réels partagés par vos pairs.' },
      { titre: 'Support et gestion des actifs', description: 'Choisissez vos outils de support, ticketing et gestion d\'actifs IT avec des références marché et des fourchettes de prix.' },
    ],
  },
  juridique: {
    title: 'Juridique',
    intro: 'En vous inscrivant, vous choisissez vos outils juridiques (contrats, conformité, propriété intellectuelle) en vous basant sur des comparaisons et des prix de référence. En tant que direction juridique, vous évitez les dérives budgétaires sur les CLM, outils RGPD et plateformes de travail juridique en vous appuyant sur ce que paient d\'autres équipes.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Gestion des contrats', description: 'Comparez les CLM et outils de gestion contractuelle sur les fonctionnalités et les coûts pratiqués par des structures comparables.' },
      { titre: 'Conformité et RGPD', description: 'Évaluez les solutions de conformité et protection des données avec des retours d\'autres équipes juridiques et des fourchettes de prix.' },
      { titre: 'Property et IP', description: 'Découvrez les outils de gestion de la propriété intellectuelle et des actifs immatériels avec des références prix du marché.' },
      { titre: 'Collaboration juridique', description: 'Identifiez les plateformes de travail juridique les plus adaptées à votre organisation grâce aux comparatifs et retours acheteurs.' },
    ],
  },
  operations: {
    title: 'Opérations',
    intro: 'En vous inscrivant, vous optimisez vos outils opérationnels (logistique, qualité, projet, support) avec des données de prix et des comparatifs terrain. En tant que direction opérations, vous rationalisez les coûts et les choix fournisseurs en vous appuyant sur ce que paient et utilisent d\'autres acheteurs dans des contextes similaires.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Logistique et supply chain', description: 'Comparez les solutions de gestion logistique et supply chain avec des prix et retours d\'autres acheteurs. Calibrez vos budgets WMS, TMS, planification.' },
      { titre: 'Qualité et processus', description: 'Évaluez les outils qualité, QHSE et gestion des processus sur les coûts et fonctionnalités avec des références marché.' },
      { titre: 'Gestion de projet', description: 'Choisissez vos outils de gestion de projet et de portefeuille avec des références prix et des retours d\'autres directions opérations.' },
      { titre: 'Support et service client', description: 'Rationalisez vos outils support et relation client avec des comparatifs et données de coûts réels partagés par vos pairs.' },
    ],
  },
}

const CARD_ICONS = [
  <svg key="0" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="1" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  <svg key="2" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
  <svg key="3" className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
]

export function generateStaticParams() {
  return Object.keys(DIRECTIONS).map((sous) => ({ sous }))
}

export default async function AcheteurDirectionPage({ params }: { params: Promise<{ sous: string }> }) {
  const { sous: s } = await params
  const sous = s?.toLowerCase()
  const data = sous ? DIRECTIONS[sous] : null
  if (!data) notFound()

  const loginUrl = getLoginUrl('/acheteur')
  const bannerUrl = getAcheteurBannerUrl('directions', sous)

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="relative w-full aspect-[21/9] min-h-[200px] bg-gradient-to-br from-primary-600 to-primary-800 overflow-hidden" aria-hidden>
          {bannerUrl ? (
            <Image src={bannerUrl} alt="" fill className="object-cover" sizes="100vw" priority />
          ) : null}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" aria-hidden />
        </section>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-50/60 via-white to-slate-50/80" aria-hidden />
          <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14 text-center">
            <Link
              href="/acheteur"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour à l&apos;espace acheteur
            </Link>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-[0.2em] mb-4">
              Par directions
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Pour la direction {data.title}
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto mb-6">
              {data.intro}
            </p>
            <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
              {data.subtitle}
            </p>
          </div>
        </section>
        <section className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-4">
            {data.arguments.map((arg, index) => (
              <article
                key={index}
                className="group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary-200/80 transition-all duration-200 overflow-hidden"
              >
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
            <div className="inline-flex flex-col items-center gap-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm px-8 py-8 sm:px-10 sm:py-9 max-w-md">
              <p className="text-slate-700 font-medium text-lg leading-snug">
                Prêt à comparer et négocier avec des données réelles ?
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto sm:justify-center">
                <Link
                  href="/acheteur"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all w-full sm:w-auto"
                >
                  Découvrir l&apos;espace acheteur
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
                {loginUrl && (
                  <a
                    href={loginUrl}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Déjà un compte ? Se connecter
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

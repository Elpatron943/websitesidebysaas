import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getLoginUrl } from '@/lib/commercial-auth-links'
import { getAcheteurBannerUrl } from '@/lib/acheteur-banner'

const SECTEURS: Record<string, { title: string; intro: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  education: {
    title: 'Éducation',
    intro: 'En vous inscrivant sur Side by SaaS, vous accédez à une base de données unique : les prix réellement payés par des établissements d\'enseignement (écoles, universités, organismes de formation) pour leurs outils EdTech. Plus de négociation à l\'aveugle — vous savez exactement ce que paient vos pairs.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels par type d\'établissement', description: 'LMS, gestion scolaire, outils pédagogiques : découvrez les fourchettes de prix pratiquées par des structures comparables à la vôtre (primaire, secondaire, supérieur, formation pro). Idéal pour calibrer vos appels d\'offres.' },
      { titre: 'Des Battle Cards comparatives EdTech', description: 'Comparez les fonctionnalités, les coûts et les retours d\'autres acheteurs sur les solutions que vous évaluez. Évitez les mauvaises surprises en déploiement.' },
      { titre: 'Des retours terrain d\'acheteurs du secteur', description: 'Bénéficiez des retours d\'expérience partagés par des responsables achats et DSI du monde de l\'éducation : coûts cachés, intégrations, satisfaction.' },
      { titre: 'Un portefeuille SaaS optimisé', description: 'Identifiez les doublons, les outils sous-utilisés et les opportunités de regroupement. Justifiez vos recommandations avec des données vérifiées.' },
    ],
  },
  technologie: {
    title: 'Technologie',
    intro: 'En vous inscrivant, vous rejoignez des acheteurs tech qui partagent les prix réellement payés pour leurs outils SaaS (dev, product, sales, infrastructure). Les éditeurs pratiquent des modèles tarifaires variés — Side by SaaS vous donne la visibilité pour négocier en connaissance de cause.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des fourchettes de prix par segment tech', description: 'Par siège, par usage, par module : comparez ce que paient des startups, scale-ups et entreprises tech de votre taille. Anticipez les coûts à la croissance.' },
      { titre: 'Des comparatifs stack (dev, product, sales)', description: 'Découvrez les outils les plus utilisés dans votre écosystème, leurs coûts réels et les retours d\'autres acheteurs. Optimisez votre stack sans surenchère.' },
      { titre: 'Des arguments de négociation factuels', description: 'Négociez avec des données réelles plutôt qu\'avec le seul discours commercial. Réduisez les dérives budgétaires sur vos contrats SaaS.' },
      { titre: 'Des benchmarks par taille d\'entreprise', description: 'Comparez vos dépenses avec celles d\'entreprises tech similaires. Identifiez les opportunités d\'économies et de rationalisation.' },
    ],
  },
  industrie: {
    title: 'Industrie',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des industriels (sites de production, groupes, multi-sites). GMAO, MES, qualité, maintenance : comparez les coûts réels avec des acteurs de votre taille et de votre secteur.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des références par taille de site et d\'effectif', description: 'Comparez les coûts SaaS avec des industriels ayant des sites, effectifs et contraintes similaires aux vôtres. Budgets réalistes pour vos projets.' },
      { titre: 'Des comparatifs outils métier (GMAO, MES, qualité)', description: 'Évaluez les solutions de pilotage, maintenance, qualité et gestion de production avec des prix réels et des retours d\'autres acheteurs industriels.' },
      { titre: 'Des opportunités de regroupement et mutualisation', description: 'Identifiez les doublons et outils sous-utilisés. Réduisez les coûts récurrents en vous appuyant sur des données partagées par vos pairs.' },
      { titre: 'Des standards secteur et conformité', description: 'Choisissez des solutions alignées sur les usages et budgets du secteur industriel, avec des références vérifiées par d\'autres acheteurs.' },
    ],
  },
  'commerce-retail': {
    title: 'Commerce & Retail',
    intro: 'En vous inscrivant, vous découvrez ce que paient réellement des enseignes et pure players pour leurs outils e-commerce, PIM, CRM, logistique et analytics. BtoC, BtoB, marketplaces : des références par canal pour négocier et rationaliser.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels par canal (e-commerce, retail, marketplace)', description: 'Accédez aux coûts pratiqués par des acteurs comparables. Calibrez vos budgets et évitez les dérives sur les outils critiques (réservation, PIM, CRM).' },
      { titre: 'Des comparatifs par modèle (BtoC, BtoB, retail physique)', description: 'Découvrez les stacks et budgets d\'entreprises similaires. Mieux négocier en connaissant les fourchettes du marché.' },
      { titre: 'Des retours sur la saisonnalité et les pics', description: 'Black Friday, soldes : anticipez les coûts et les pièges grâce aux retours d\'autres acteurs du commerce.' },
      { titre: 'Des benchmarks multi-marques et multi-sites', description: 'Optimisez vos achats si vous gérez plusieurs marques ou points de vente. Références et bonnes pratiques partagées.' },
    ],
  },
  'secteur-public': {
    title: 'Secteur public',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acheteurs publics (collectivités, établissements publics, administrations). Calibrez vos consultations et marchés avec des références réelles, dans le respect des règles d\'achat public.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des références pour vos marchés et consultations', description: 'Prix réellement payés par des structures publiques similaires. Calibrez vos devis, lots et critères d\'attribution avec des données vérifiées.' },
      { titre: 'Des solutions conformes aux contraintes réglementaires', description: 'Identifiez les outils déjà déployés dans le secteur public, leurs coûts et leurs retours. Sécurisez vos choix (hébergement, données, conformité).' },
      { titre: 'Des comparatifs par type d\'entité', description: 'Collectivités, EPIC, services de l\'État : comparez les stacks et budgets avec des structures de même nature.' },
      { titre: 'Des bonnes pratiques et mutualisation', description: 'Découvrez les retours d\'autres acheteurs publics pour mutualiser les connaissances et optimiser les dépenses.' },
    ],
  },
  'services-professionnels': {
    title: 'Services professionnels',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des cabinets et professionnels (juridique, audit, conseil, ingénierie). Gestion de projet, facturation, CRM, collaboration : comparez avec ce que paient vos pairs.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels par métier et taille de structure', description: 'Accédez aux coûts des outils de gestion de projet, time tracking, facturation et CRM utilisés par des cabinets et conseils similaires.' },
      { titre: 'Des comparatifs par modèle (juridique, audit, conseil)', description: 'Comparez les stacks et budgets en fonction de la taille et du modèle de votre structure. Calibrez vos investissements.' },
      { titre: 'Des retours sur productivité et facturation', description: 'Évaluez les outils de pilotage et facturation avec des références du secteur des services professionnels.' },
      { titre: 'Une rationalisation du portefeuille SaaS', description: 'Évitez la dispersion des outils. Identifiez les doublons et optimisez vos coûts avec des données partagées par d\'autres professionnels.' },
    ],
  },
  immobilier: {
    title: 'Immobilier',
    intro: 'En vous inscrivant, vous découvrez ce que paient réellement des agences, promoteurs et gestionnaires pour leurs outils proptech (gestion locative, CRM, portails, transaction). Des références par activité pour négocier et rationaliser.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions proptech et gestion', description: 'Accédez aux coûts pratiqués par des acteurs immobilier pour vos outils métier. Transaction, gestion locative, promotion : fourchettes vérifiées.' },
      { titre: 'Des comparatifs par activité (transaction, gestion, promotion)', description: 'Découvrez les stacks et budgets d\'entreprises comparables. Mieux négocier en connaissant les prix du marché.' },
      { titre: 'Des Battle Cards CRM et pipeline immobilier', description: 'Évaluez les solutions CRM et de suivi commercial avec des références prix et des retours terrain d\'autres acheteurs.' },
      { titre: 'Des références conformité et reporting secteur', description: 'Choisissez des outils alignés sur les exigences du secteur avec des données de coûts réelles partagées par vos pairs.' },
    ],
  },
  'btp-construction': {
    title: 'BTP & Construction',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs du BTP et de la construction. Chantier, devis, suivi de travaux, BIM, gestion documentaire : comparez avec des artisans, PME et grands groupes.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des outils chantier et gestion', description: 'Comparez les coûts des solutions de chantier, devis, suivi de travaux et gestion documentaire avec des entreprises du BTP.' },
      { titre: 'Des comparatifs BIM, planification et facturation', description: 'Évaluez les outils métier avec des retours d\'autres acheteurs du secteur. Intégrations et coûts cachés.' },
      { titre: 'Des références par taille (artisans, PME, grands groupes)', description: 'Découvrez les stacks et budgets d\'acteurs comparables pour calibrer vos investissements.' },
      { titre: 'Des opportunités de réduction des coûts', description: 'Identifiez les doublons et opportunités de regroupement avec des données partagées par des acteurs du BTP.' },
    ],
  },
  finance: {
    title: 'Finance',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs du secteur financier (banques, assurance, gestion d\'actifs). Outils métier, conformité, data : des références dans un secteur régulé pour négocier et piloter vos investissements tech.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels dans un secteur régulé', description: 'Accédez aux coûts pratiqués par des acteurs financiers pour les outils métier, conformité et data, dans le respect des usages du secteur.' },
      { titre: 'Des comparatifs par type d\'acteur', description: 'Banque, assurance, asset management : découvrez les stacks et budgets d\'entités comparables pour mieux négocier.' },
      { titre: 'Des références conformité et reporting', description: 'Évaluez les solutions de conformité, reporting et gouvernance avec des références du secteur financier.' },
      { titre: 'Des benchmarks innovation et coûts maîtrisés', description: 'Pilotez vos investissements tech avec des données réelles partagées par d\'autres acteurs du secteur.' },
    ],
  },
  sante: {
    title: 'Santé',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs du secteur santé (hôpitaux, cliniques, labos, pharma). Gestion, R&D, données, relation patient : des références conformes (HDS, RGPD) pour vos achats logiciels.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions secteur santé', description: 'Accédez aux coûts des solutions (gestion, R&D, données, relation patient) utilisées par des acteurs du secteur santé.' },
      { titre: 'Des références conformité (HDS, RGPD)', description: 'Identifiez les outils conformes aux exigences santé avec des références prix et des retours terrain d\'autres acheteurs.' },
      { titre: 'Des comparatifs par type de structure', description: 'Hôpitaux, cliniques, labos, pharma : comparez les stacks et budgets avec des structures de même nature.' },
      { titre: 'Une rationalisation des dépenses IT', description: 'Optimisez votre portefeuille SaaS en vous appuyant sur les usages et coûts partagés par d\'autres acteurs de la santé.' },
    ],
  },
  telecoms: {
    title: 'Telecoms',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des opérateurs et acteurs des télécoms. BSS/OSS, CRM, analytics, support : des références par périmètre (B2B, B2C, B2B2B) pour négocier et piloter vos achats.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions telecoms', description: 'Comparez les coûts des outils BSS/OSS, CRM, analytics et support avec des références du secteur telecoms.' },
      { titre: 'Des comparatifs par périmètre (B2B, B2C, B2B2B)', description: 'Découvrez les solutions et budgets d\'opérateurs comparables pour calibrer vos investissements.' },
      { titre: 'Des retours sur transformation et cloud', description: 'Évaluez les coûts de migration et d\'exploitation des solutions cloud avec des retours d\'autres acteurs telecoms.' },
      { titre: 'Des benchmarks fournisseurs', description: 'Négociez en vous appuyant sur les prix et retours partagés par vos pairs du secteur.' },
    ],
  },
  'tourisme-hotellerie': {
    title: 'Tourisme & Hôtellerie',
    intro: 'En vous inscrivant, vous découvrez ce que paient réellement des hôtels, chaînes, OTAs et voyagistes pour leurs outils (réservation, distribution, revenue management, relation client). Des références par type d\'acteur et par saisonnalité.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions tourisme et hôtellerie', description: 'Accédez aux coûts des solutions de réservation, distribution, revenue management et relation client.' },
      { titre: 'Des comparatifs par type d\'acteur', description: 'Hôtels, chaînes, OTAs, voyagistes : découvrez les stacks et budgets d\'entreprises comparables.' },
      { titre: 'Des retours sur saisonnalité et pics d\'activité', description: 'Anticipez les coûts liés à la saisonnalité grâce aux retours d\'autres acteurs du tourisme et de l\'hôtellerie.' },
      { titre: 'Des benchmarks multi-sites et multi-marques', description: 'Optimisez vos achats en vous appuyant sur des benchmarks d\'acteurs à plusieurs établissements ou marques.' },
    ],
  },
  'logistique-supply-chain': {
    title: 'Logistique & Supply Chain',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs de la logistique et de la supply chain. WMS, TMS, planification, visibilité : des références par modèle (3PL, e-commerce, industriel) pour négocier et rationaliser.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions logistique et SCM', description: 'Comparez les coûts des outils WMS, TMS, planification et visibilité avec des références du secteur.' },
      { titre: 'Des comparatifs par modèle (3PL, e-commerce, industriel)', description: 'Découvrez les stacks et budgets d\'acteurs comparables pour mieux négocier et rationaliser.' },
      { titre: 'Des retours sur implémentation et coûts cachés', description: 'Intégrez les coûts d\'implémentation et d\'évolution grâce aux retours d\'autres acheteurs logistique.' },
      { titre: 'Des benchmarks fournisseurs', description: 'Négociez avec des données réelles partagées par des acheteurs logistique et supply chain.' },
    ],
  },
  'medias-communication': {
    title: 'Médias & Communication',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des médias, agences et annonceurs. Diffusion, analytics, création, gestion de campagnes : comparez avec ce que paient vos pairs pour éviter la surenchère fournisseur.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions médias et communication', description: 'Accédez aux coûts des solutions de diffusion, analytics, création et gestion de campagnes.' },
      { titre: 'Des comparatifs par type d\'acteur', description: 'Médias, agences, annonceurs : découvrez les stacks et budgets d\'entreprises comparables pour calibrer vos achats.' },
      { titre: 'Des références outils créatifs et collaboration', description: 'Évaluez les solutions de workflow, stock et collaboration avec des références du secteur.' },
      { titre: 'Des arguments de négociation factuels', description: 'Négociez en vous appuyant sur des prix réels plutôt que sur le seul discours commercial.' },
    ],
  },
  'industrie-agroalimentaire': {
    title: 'Industrie agroalimentaire',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs de l\'agroalimentaire (IAA, distribution, restauration). Traçabilité, qualité, R&D, supply chain : des références conformes aux exigences du secteur.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions agroalimentaire', description: 'Accédez aux coûts des solutions de traçabilité, qualité, R&D et gestion de la supply chain alimentaire.' },
      { titre: 'Des références conformité et réglementation', description: 'Identifiez les outils conformes aux exigences du secteur (traçabilité, sécurité alimentaire) avec des références prix.' },
      { titre: 'Des comparatifs par segment (IAA, distribution, restauration)', description: 'Comparez les stacks et budgets d\'acteurs comparables pour rationaliser vos dépenses.' },
      { titre: 'Des benchmarks multi-sites et multi-marques', description: 'Optimisez votre portefeuille SaaS avec des benchmarks d\'acteurs agroalimentaires de taille similaire.' },
    ],
  },
  'energie-utilities': {
    title: 'Énergie & Utilities',
    intro: 'En vous inscrivant, vous accédez aux prix et retours partagés par des acteurs de l\'énergie et des utilities (électricité, gaz, eau). Gestion des réseaux, clients, données, trading : des références pour négocier et piloter la transformation digitale.',
    subtitle: 'Ce que vous trouverez en vous inscrivant',
    arguments: [
      { titre: 'Des prix réels des solutions secteur énergie', description: 'Comparez les coûts des outils de gestion des réseaux, clients, données et trading avec des références du secteur.' },
      { titre: 'Des comparatifs par périmètre (électricité, gaz, eau)', description: 'Découvrez les stacks et budgets d\'acteurs comparables pour mieux négocier et planifier.' },
      { titre: 'Des retours sur transformation digitale et régulation', description: 'Évaluez les solutions smart grid, data et conformité avec des retours d\'autres acteurs énergie et utilities.' },
      { titre: 'Des benchmarks fournisseurs', description: 'Négociez en vous appuyant sur les prix et usages partagés par vos pairs du secteur.' },
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
  return Object.keys(SECTEURS).map((secteur) => ({ secteur }))
}

export default async function AcheteurSecteurPage({ params }: { params: Promise<{ secteur: string }> }) {
  const { secteur: s } = await params
  const secteur = s?.toLowerCase()
  const data = secteur ? SECTEURS[secteur] : null
  if (!data) notFound()

  const bannerUrl = getAcheteurBannerUrl('secteurs', secteur)

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
              href="/"
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-800 text-sm font-medium mb-10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Retour à l&apos;accueil
            </Link>
            <p className="text-xs font-semibold text-primary-600 uppercase tracking-[0.2em] mb-4">
              Par secteur d&apos;activité
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Pour le secteur {data.title}
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
            <div className="inline-flex flex-col items-center gap-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm px-8 py-8 sm:px-10 sm:py-9 max-w-md">
              <p className="text-slate-700 font-medium text-lg leading-snug">
                Prêt à comparer et négocier avec des données réelles ?
              </p>
              {getLoginUrl('/buyer') ? (
                <a
                  href={getLoginUrl('/buyer')!}
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                >
                  Accéder au marché
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </a>
              ) : (
                <span className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white font-semibold px-6 py-3 rounded-xl shadow-sm cursor-default">
                  Accéder au marché
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </span>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getLoginUrl } from '@/lib/commercial-auth-links'

const SECTEURS: Record<string, { title: string; subtitle: string; arguments: { titre: string; description: string }[] }> = {
  education: {
    title: 'Éducation',
    subtitle: 'Comparez les outils EdTech et solutions SaaS utilisés par des établissements similaires. Négociez avec des prix réels et des retours terrain.',
    arguments: [
      { titre: 'Prix pratiqués par les établissements', description: 'Accédez aux prix réellement payés par des écoles, universités et organismes de formation. Calibrez vos appels d\'offres et évitez les dérives budgétaires.' },
      { titre: 'Comparatifs LMS et outils pédagogiques', description: 'Évaluez les plateformes d\'apprentissage, outils de gestion scolaire et solutions EdTech sur les fonctionnalités et les coûts réels.' },
      { titre: 'Benchmarks par type d\'établissement', description: 'Découvrez ce que paient des structures de votre taille (primaire, secondaire, supérieur, formation pro) pour rationaliser votre portefeuille.' },
      { titre: 'Retours d\'autres acheteurs du secteur', description: 'Bénéficiez des retours d\'expérience et des comparatifs partagés par des acheteurs du monde de l\'éducation.' },
    ],
  },
  technologie: {
    title: 'Technologie',
    subtitle: 'Pilotez vos achats SaaS avec des références marché du secteur tech : prix réels, comparatifs outils et bonnes pratiques d\'entreprises similaires.',
    arguments: [
      { titre: 'Pricing et fourchettes du marché tech', description: 'Les éditeurs tech pratiquent des modèles variés (par siège, usage, module). Comparez avec ce que paient d\'autres acteurs du secteur.' },
      { titre: 'Stack et intégrations critiques', description: 'Identifiez les outils les plus utilisés dans votre écosystème (dev, product, sales) et les coûts associés pour optimiser votre stack.' },
      { titre: 'Éviter la surenchère fournisseur', description: 'Négociez en vous appuyant sur des données réelles plutôt que sur le seul discours commercial des éditeurs.' },
      { titre: 'Scalabilité et coûts à la croissance', description: 'Anticipez l\'évolution des coûts (scale-up, renouvellements) grâce aux retours d\'entreprises tech de tailles différentes.' },
    ],
  },
  industrie: {
    title: 'Industrie',
    subtitle: 'Rationalisez vos achats logiciels avec des références du secteur industriel : prix réels, comparatifs et retours d\'autres sites ou groupes.',
    arguments: [
      { titre: 'Références par taille de site et d\'effectif', description: 'Comparez les coûts SaaS avec des industriels de votre taille (sites, effectifs, multi-sites) pour des budgets réalistes.' },
      { titre: 'Outils de pilotage et maintenance', description: 'Évaluez les solutions de GMAO, MES, qualité et maintenance avec des prix et retours d\'autres acheteurs industriels.' },
      { titre: 'Réduction des coûts récurrents', description: 'Identifiez les doublons, les outils sous-utilisés et les opportunités de regroupement avec des données partagées par vos pairs.' },
      { titre: 'Conformité et standards secteur', description: 'Choisissez des solutions alignées sur les usages et budgets du secteur industriel, avec des références vérifiées.' },
    ],
  },
  'commerce-retail': {
    title: 'Commerce & Retail',
    subtitle: 'Comparez les solutions e-commerce, CRM, logistique et retail avec des prix réels et des retours d\'autres acteurs du commerce.',
    arguments: [
      { titre: 'Prix réels des solutions retail et e-commerce', description: 'Accédez aux coûts pratiqués par des enseignes et pure players pour vos outils e-commerce, PIM, CRM et analytics.' },
      { titre: 'Comparatifs par canal et modèle', description: 'BtoC, BtoB, marketplaces, retail physique : découvrez les stacks et budgets d\'entreprises comparables pour mieux négocier.' },
      { titre: 'Saisonnalité et pics d\'activité', description: 'Anticipez les coûts liés aux pics (Black Friday, soldes) grâce aux retours d\'autres acteurs du commerce.' },
      { titre: 'Rationalisation multi-marques ou multi-sites', description: 'Optimisez vos achats SaaS en vous appuyant sur des benchmarks d\'enseignes à plusieurs marques ou points de vente.' },
    ],
  },
  'secteur-public': {
    title: 'Secteur public',
    subtitle: 'Pilotez vos achats logiciels avec des références marché du public : prix réels, comparatifs et retours d\'autres acheteurs publics.',
    arguments: [
      { titre: 'Références marchés publics et achats décentralisés', description: 'Calibrez vos consultations et marchés avec les prix réellement payés par des collectivités et administrations similaires.' },
      { titre: 'Conformité et contraintes réglementaires', description: 'Identifiez les solutions déjà déployées dans le secteur public et leurs coûts pour sécuriser vos choix.' },
      { titre: 'Comparatifs par type d\'entité', description: 'Collectivités, établissements publics, État : comparez les stacks et budgets avec des structures de même nature.' },
      { titre: 'Mutualisation et bonnes pratiques', description: 'Découvrez les retours d\'autres acheteurs publics pour mutualiser les connaissances et optimiser les dépenses.' },
    ],
  },
  'services-professionnels': {
    title: 'Services professionnels',
    subtitle: 'Cabinet, conseil, expertise : comparez les outils SaaS de votre secteur avec des prix réels et des retours d\'autres professionnels.',
    arguments: [
      { titre: 'Prix pratiqués par les cabinets et conseils', description: 'Accédez aux coûts réels des outils de gestion de projet, facturation, CRM et collaboration utilisés par vos pairs.' },
      { titre: 'Stack par métier et taille de structure', description: 'Comparez les solutions (juridique, audit, ingénierie, conseil) en fonction de la taille et du modèle de votre structure.' },
      { titre: 'Productivité et facturation', description: 'Évaluez les outils de time tracking, facturation et pilotage avec des références du secteur des services professionnels.' },
      { titre: 'Éviter la dispersion des outils', description: 'Rationalisez votre portefeuille SaaS en vous appuyant sur les usages et coûts partagés par d\'autres professionnels.' },
    ],
  },
  immobilier: {
    title: 'Immobilier',
    subtitle: 'Comparez les solutions SaaS du secteur immobilier (gestion locative, CRM, portails) avec des prix réels et des retours d\'autres acteurs.',
    arguments: [
      { titre: 'Prix réels des solutions proptech et gestion', description: 'Accédez aux coûts pratiqués par des agences, promoteurs et gestionnaires pour vos outils métier.' },
      { titre: 'Comparatifs par activité (transaction, gestion, promotion)', description: 'Transaction, gestion locative, promotion : découvrez les stacks et budgets d\'entreprises comparables.' },
      { titre: 'CRM et pipeline immobilier', description: 'Évaluez les solutions CRM et de suivi commercial immobilier avec des références prix et des retours terrain.' },
      { titre: 'Conformité et reporting secteur', description: 'Choisissez des outils alignés sur les exigences du secteur avec des données de coûts réelles partagées par vos pairs.' },
    ],
  },
  'btp-construction': {
    title: 'BTP & Construction',
    subtitle: 'Pilotez vos achats logiciels (chantier, devis, gestion) avec des références du BTP et de la construction.',
    arguments: [
      { titre: 'Prix pratiqués par les acteurs du BTP', description: 'Comparez les coûts des outils de chantier, devis, suivi de travaux et gestion documentaire avec des entreprises du BTP.' },
      { titre: 'Outils métier et intégration', description: 'Évaluez les solutions de suivi de chantier, BIM, planification et facturation avec des retours d\'autres acheteurs du secteur.' },
      { titre: 'Taille d\'entreprise et multi-chantiers', description: 'Découvrez les stacks et budgets d\'artisans, PME et grands groupes pour calibrer vos propres investissements.' },
      { titre: 'Réduction des coûts récurrents', description: 'Identifiez les doublons et opportunités de regroupement avec des données partagées par des acteurs du BTP.' },
    ],
  },
  finance: {
    title: 'Finance',
    subtitle: 'Banques, assurance, gestion d\'actifs : comparez les solutions SaaS du secteur financier avec des prix réels et des références marché.',
    arguments: [
      { titre: 'Prix réels dans un secteur régulé', description: 'Accédez aux coûts pratiqués par des acteurs financiers pour les outils métier, conformité et data, dans le respect des usages.' },
      { titre: 'Comparatifs par type d\'acteur', description: 'Banque, assurance, asset management : découvrez les stacks et budgets d\'entités comparables pour mieux négocier.' },
      { titre: 'Conformité et reporting', description: 'Évaluez les solutions de conformité, reporting et gouvernance avec des références du secteur financier.' },
      { titre: 'Innovation et coûts maîtrisés', description: 'Pilotez vos investissements tech avec des données réelles partagées par d\'autres acteurs du secteur.' },
    ],
  },
  sante: {
    title: 'Santé',
    subtitle: 'Établissements de santé, pharma, biotech : comparez les outils SaaS du secteur avec des prix réels et des retours d\'autres acheteurs.',
    arguments: [
      { titre: 'Prix pratiqués dans le secteur santé', description: 'Accédez aux coûts réels des solutions (gestion, R&D, données, relation patient) utilisées par des acteurs du secteur santé.' },
      { titre: 'Conformité et hébergement des données', description: 'Identifiez les solutions conformes aux exigences santé (HDS, RGPD) avec des références prix et des retours terrain.' },
      { titre: 'Comparatifs par type de structure', description: 'Hôpitaux, cliniques, labos, pharma : comparez les stacks et budgets avec des structures de même nature.' },
      { titre: 'Rationalisation des dépenses IT', description: 'Optimisez votre portefeuille SaaS en vous appuyant sur les usages et coûts partagés par d\'autres acteurs de la santé.' },
    ],
  },
  telecoms: {
    title: 'Telecoms',
    subtitle: 'Opérateurs et acteurs des télécoms : pilotez vos achats SaaS avec des références du secteur et des prix réels.',
    arguments: [
      { titre: 'Prix réels des solutions utilisées par les opérateurs', description: 'Comparez les coûts des outils BSS/OSS, CRM, analytics et support avec des références du secteur telecoms.' },
      { titre: 'Stack par périmètre (B2B, B2C, B2B2B)', description: 'Découvrez les solutions et budgets d\'opérateurs comparables pour calibrer vos investissements.' },
      { titre: 'Transformation et cloud', description: 'Évaluez les coûts de migration et d\'exploitation des solutions cloud avec des retours d\'autres acteurs telecoms.' },
      { titre: 'Benchmark fournisseurs', description: 'Négociez en vous appuyant sur les prix et retours partagés par vos pairs du secteur.' },
    ],
  },
  'tourisme-hotellerie': {
    title: 'Tourisme & Hôtellerie',
    subtitle: 'Comparez les solutions SaaS du tourisme et de l\'hôtellerie avec des prix réels et des retours d\'autres acteurs du secteur.',
    arguments: [
      { titre: 'Prix pratiqués dans le tourisme et l\'hôtellerie', description: 'Accédez aux coûts réels des solutions de réservation, distribution, revenue management et relation client.' },
      { titre: 'Comparatifs par type d\'acteur', description: 'Hôtels, chaînes, OTAs, voyagistes : découvrez les stacks et budgets d\'entreprises comparables.' },
      { titre: 'Saisonnalité et pics d\'activité', description: 'Anticipez les coûts liés à la saisonnalité grâce aux retours d\'autres acteurs du tourisme et de l\'hôtellerie.' },
      { titre: 'Rationalisation multi-sites ou multi-marques', description: 'Optimisez vos achats en vous appuyant sur des benchmarks d\'acteurs à plusieurs établissements ou marques.' },
    ],
  },
  'logistique-supply-chain': {
    title: 'Logistique & Supply Chain',
    subtitle: 'Pilotez vos achats logiciels logistique et supply chain avec des prix réels et des retours d\'autres acheteurs du secteur.',
    arguments: [
      { titre: 'Prix réels des solutions logistique et SCM', description: 'Comparez les coûts des outils WMS, TMS, planification et visibilité avec des références du secteur.' },
      { titre: 'Comparatifs par modèle (3PL, e-commerce, industriel)', description: 'Découvrez les stacks et budgets d\'acteurs comparables pour mieux négocier et rationaliser.' },
      { titre: 'Résilience et coûts cachés', description: 'Intégrez les coûts d\'implémentation et d\'évolution grâce aux retours d\'autres acheteurs logistique.' },
      { titre: 'Benchmark fournisseurs', description: 'Négociez avec des données réelles partagées par des acheteurs logistique et supply chain.' },
    ],
  },
  'medias-communication': {
    title: 'Médias & Communication',
    subtitle: 'Éditeurs, agences, médias : comparez les outils SaaS du secteur avec des prix réels et des retours d\'autres acteurs.',
    arguments: [
      { titre: 'Prix pratiqués dans les médias et la communication', description: 'Accédez aux coûts réels des solutions de diffusion, analytics, création et gestion de campagnes.' },
      { titre: 'Comparatifs par type d\'acteur', description: 'Médias, agences, annonceurs : découvrez les stacks et budgets d\'entreprises comparables pour calibrer vos achats.' },
      { titre: 'Outils créatifs et collaboration', description: 'Évaluez les solutions de workflow, stock et collaboration avec des références du secteur médias et communication.' },
      { titre: 'Éviter la surenchère fournisseur', description: 'Négociez en vous appuyant sur des prix réels plutôt que sur le seul discours commercial.' },
    ],
  },
  'industrie-agroalimentaire': {
    title: 'Industrie agroalimentaire',
    subtitle: 'Comparez les solutions SaaS de l\'agroalimentaire (qualité, traçabilité, supply) avec des prix réels et des retours d\'autres acteurs.',
    arguments: [
      { titre: 'Prix pratiqués dans l\'agroalimentaire', description: 'Accédez aux coûts réels des solutions de traçabilité, qualité, R&D et gestion de la supply chain alimentaire.' },
      { titre: 'Conformité et réglementation', description: 'Identifiez les outils conformes aux exigences du secteur (traçabilité, sécurité alimentaire) avec des références prix.' },
      { titre: 'Comparatifs par segment (IAA, distribution, restauration)', description: 'Comparez les stacks et budgets d\'acteurs comparables pour rationaliser vos dépenses.' },
      { titre: 'Rationalisation multi-sites et multi-marques', description: 'Optimisez votre portefeuille SaaS avec des benchmarks d\'acteurs agroalimentaires de taille similaire.' },
    ],
  },
  'energie-utilities': {
    title: 'Énergie & Utilities',
    subtitle: 'Pilotez vos achats SaaS du secteur énergie et utilities avec des prix réels et des retours d\'autres acheteurs.',
    arguments: [
      { titre: 'Prix réels des solutions du secteur énergie', description: 'Comparez les coûts des outils de gestion des réseaux, clients, données et trading avec des références du secteur.' },
      { titre: 'Comparatifs par périmètre (électricité, gaz, eau, etc.)', description: 'Découvrez les stacks et budgets d\'acteurs comparables pour mieux négocier et planifier.' },
      { titre: 'Transformation digitale et régulation', description: 'Évaluez les solutions de smart grid, data et conformité avec des retours d\'autres acteurs énergie et utilities.' },
      { titre: 'Benchmark fournisseurs', description: 'Négociez en vous appuyant sur les prix et usages partagés par vos pairs du secteur.' },
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

export default function AcheteurSecteurPage({ params }: { params: { secteur: string } }) {
  const secteur = params.secteur?.toLowerCase()
  const data = secteur ? SECTEURS[secteur] : null
  if (!data) notFound()

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main>
        <section className="relative w-full aspect-[21/9] min-h-[200px] bg-gradient-to-br from-primary-600 to-primary-800" aria-hidden />
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
            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
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

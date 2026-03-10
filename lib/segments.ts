export interface Segment {
  slug: string
  persona: 'acheteur' | 'editeur'
  title: string
  subtitle: string
  metaTitle: string
  metaDescription: string
  category: string // filtre sur PRODUCTS
  keywords: string[]
  heroStat: { value: string; label: string }
  cta: string
}

export const SEGMENTS: Segment[] = [
  {
    slug: 'crm',
    persona: 'acheteur',
    title: 'Comparer les prix CRM',
    subtitle: 'Ce que les entreprises françaises paient vraiment pour Salesforce, HubSpot et les autres',
    metaTitle: 'Prix CRM en France : benchmark données réelles 2025 | Side by SaaS',
    metaDescription:
      "Comparez les prix réels des CRM en France. Salesforce, HubSpot, Pipedrive : données d'achats anonymisées de 200+ entreprises françaises.",
    category: 'CRM',
    keywords: [
      'comparer prix CRM France',
      'benchmark CRM entreprise',
      'prix Salesforce entreprise',
      'HubSpot tarif réel',
    ],
    heroStat: { value: '99', label: 'contributions CRM anonymisées' },
    cta: 'Voir mes données CRM personnalisées',
  },
  {
    slug: 'rh',
    persona: 'acheteur',
    title: 'Benchmark outils RH',
    subtitle: 'Combien les entreprises paient-elles vraiment pour leurs logiciels RH ?',
    metaTitle: 'Prix logiciels RH en France : benchmark réel 2025 | Side by SaaS',
    metaDescription:
      "Benchmark des prix SIRH en France : BambooHR, Personio, Lucca. Données d'achats réels anonymisées par taille d'entreprise.",
    category: 'RH',
    keywords: [
      'benchmark SIRH France',
      'prix logiciel RH PME',
      'comparer outils RH entreprise',
      'BambooHR vs Personio prix',
    ],
    heroStat: { value: '41', label: 'contributions SIRH anonymisées' },
    cta: 'Voir mes données RH personnalisées',
  },
  {
    slug: 'collaboration',
    persona: 'acheteur',
    title: 'Benchmark outils de collaboration',
    subtitle: 'Slack, Microsoft 365, Notion : ce que vos pairs paient vraiment',
    metaTitle: 'Prix outils collaboration en France : Slack, Teams, Notion 2025 | Side by SaaS',
    metaDescription:
      'Comparez les prix réels des outils de collaboration : Slack, Microsoft 365, Notion. Benchmark anonymisé de 200+ entreprises françaises.',
    category: 'Collaboration',
    keywords: [
      'prix Slack entreprise France',
      'Microsoft 365 tarif réel',
      'benchmark outils collaboration',
      'comparer Slack Teams',
    ],
    heroStat: { value: '99', label: 'contributions collaboration anonymisées' },
    cta: 'Voir mes données collaboration',
  },
  {
    slug: 'gestion-projet',
    persona: 'acheteur',
    title: 'Benchmark outils de gestion de projet',
    subtitle: "Jira, Asana, Monday.com : les vrais prix par taille d'entreprise",
    metaTitle: 'Prix outils gestion de projet : Jira, Asana, Monday 2025 | Side by SaaS',
    metaDescription:
      "Benchmark des prix outils gestion de projet en France. Jira vs Asana vs Monday.com : données d'achats anonymisées.",
    category: 'Gestion de projet',
    keywords: [
      'prix Jira entreprise France',
      'Asana tarif réel PME',
      'comparer outils gestion projet',
      'Monday.com prix entreprise',
    ],
    heroStat: { value: '75', label: 'contributions gestion projet anonymisées' },
    cta: 'Voir mes données gestion de projet',
  },
  {
    slug: 'benchmark',
    persona: 'editeur',
    title: 'Benchmark prix éditeurs SaaS',
    subtitle: 'Comprenez où vous vous positionnez par rapport au marché réel',
    metaTitle: 'Benchmark prix SaaS éditeurs : positionnement marché 2025 | Side by SaaS',
    metaDescription:
      "Données de marché réelles pour les éditeurs SaaS : comparez votre pricing aux pratiques du marché. Données anonymisées d'acheteurs réels.",
    category: '',
    keywords: [
      'benchmark prix SaaS éditeur',
      'positionnement prix logiciel',
      'competitive pricing SaaS',
      'données marché SaaS France',
    ],
    heroStat: { value: '500+', label: 'acheteurs actifs sur la plateforme' },
    cta: 'Accéder aux données marché',
  },
]

export function getSegmentBySlug(slug: string): Segment | null {
  return SEGMENTS.find((s) => s.slug === slug) ?? null
}

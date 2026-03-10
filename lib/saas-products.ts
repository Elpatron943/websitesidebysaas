export interface SaasProduct {
  slug: string
  name: string
  category: string
  description: string
  website: string
  logoEmoji: string
  priceRange: { min: number; max: number; currency: string; unit: string }
  stats: {
    avgPriceMonthly: number
    companiesCount: number
    sizeBreakdown: { label: string; avg: number }[]
    topSectors: string[]
  }
}

export interface SaasComparison {
  slug: string
  productA: string // product slug
  productB: string // product slug
  category: string
  title: string
  metaDescription: string
}

export const PRODUCTS: SaasProduct[] = [
  {
    slug: 'salesforce',
    name: 'Salesforce Sales Cloud',
    category: 'CRM',
    description: 'CRM enterprise leader mondial. Hautement personnalisable, adapté aux grandes équipes commerciales.',
    website: 'https://salesforce.com',
    logoEmoji: '☁️',
    priceRange: { min: 75, max: 300, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 4200,
      companiesCount: 47,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 850 },
        { label: '50-250 employés', avg: 2800 },
        { label: '250-500 employés', avg: 6500 },
      ],
      topSectors: ['Technologie', 'Finance', 'Industrie'],
    },
  },
  {
    slug: 'hubspot',
    name: 'HubSpot CRM',
    category: 'CRM',
    description: 'CRM inbound marketing et ventes. Idéal pour les PME cherchant un outil tout-en-un.',
    website: 'https://hubspot.com',
    logoEmoji: '🧲',
    priceRange: { min: 0, max: 120, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 1850,
      companiesCount: 52,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 480 },
        { label: '50-250 employés', avg: 1600 },
        { label: '250-500 employés', avg: 3900 },
      ],
      topSectors: ['Commerce', 'Conseil', 'MédiasPub'],
    },
  },
  {
    slug: 'slack',
    name: 'Slack',
    category: 'Collaboration',
    description: "Messagerie d'équipe asynchrone. Standard de fait pour les équipes tech.",
    website: 'https://slack.com',
    logoEmoji: '💬',
    priceRange: { min: 0, max: 12, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 620,
      companiesCount: 38,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 180 },
        { label: '50-250 employés', avg: 580 },
        { label: '250-500 employés', avg: 1400 },
      ],
      topSectors: ['Technologie', 'Conseil', 'MédiasPub'],
    },
  },
  {
    slug: 'microsoft-365',
    name: 'Microsoft 365',
    category: 'Suite bureautique',
    description: 'Suite complète Microsoft : Teams, Office, OneDrive. Incontournable en entreprise.',
    website: 'https://microsoft.com/fr-fr/microsoft-365',
    logoEmoji: '🪟',
    priceRange: { min: 5, max: 22, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 890,
      companiesCount: 61,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 220 },
        { label: '50-250 employés', avg: 780 },
        { label: '250-500 employés', avg: 2100 },
      ],
      topSectors: ['Industrie', 'Finance', 'Commerce'],
    },
  },
  {
    slug: 'notion',
    name: 'Notion',
    category: 'Documentation',
    description: 'Wiki collaboratif et gestion de projets. Très populaire dans les startups et équipes produit.',
    website: 'https://notion.so',
    logoEmoji: '📝',
    priceRange: { min: 0, max: 15, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 320,
      companiesCount: 29,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 120 },
        { label: '50-250 employés', avg: 380 },
        { label: '250-500 employés', avg: 850 },
      ],
      topSectors: ['Technologie', 'MédiasPub', 'Conseil'],
    },
  },
  {
    slug: 'jira',
    name: 'Jira',
    category: 'Gestion de projet',
    description: 'Outil agile incontournable pour les équipes tech. Suivi de bugs, sprints, roadmaps.',
    website: 'https://atlassian.com/software/jira',
    logoEmoji: '🎯',
    priceRange: { min: 0, max: 16, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 540,
      companiesCount: 33,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 160 },
        { label: '50-250 employés', avg: 490 },
        { label: '250-500 employés', avg: 1200 },
      ],
      topSectors: ['Technologie', 'Conseil', 'Finance'],
    },
  },
  {
    slug: 'asana',
    name: 'Asana',
    category: 'Gestion de projet',
    description: "Gestion de tâches et projets d'équipe. Interface intuitive, forte adoption non-tech.",
    website: 'https://asana.com',
    logoEmoji: '✅',
    priceRange: { min: 0, max: 25, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 480,
      companiesCount: 27,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 140 },
        { label: '50-250 employés', avg: 420 },
        { label: '250-500 employés', avg: 1050 },
      ],
      topSectors: ['Commerce', 'MédiasPub', 'Conseil'],
    },
  },
  {
    slug: 'monday',
    name: 'Monday.com',
    category: 'Gestion de projet',
    description: 'Work OS flexible et visuel. Très polyvalent, adopté par des équipes variées.',
    website: 'https://monday.com',
    logoEmoji: '📊',
    priceRange: { min: 9, max: 19, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 560,
      companiesCount: 24,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 170 },
        { label: '50-250 employés', avg: 510 },
        { label: '250-500 employés', avg: 1300 },
      ],
      topSectors: ['Commerce', 'Industrie', 'Conseil'],
    },
  },
  {
    slug: 'bamboohr',
    name: 'BambooHR',
    category: 'RH',
    description: 'SIRH PME : congés, onboarding, performance. Simple à déployer.',
    website: 'https://bamboohr.com',
    logoEmoji: '🎋',
    priceRange: { min: 6, max: 12, currency: 'EUR', unit: 'employé/mois' },
    stats: {
      avgPriceMonthly: 720,
      companiesCount: 19,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 240 },
        { label: '50-250 employés', avg: 680 },
        { label: '250-500 employés', avg: 1800 },
      ],
      topSectors: ['Technologie', 'Commerce', 'Conseil'],
    },
  },
  {
    slug: 'personio',
    name: 'Personio',
    category: 'RH',
    description: 'SIRH tout-en-un pour PME européennes. Forte présence en France et Allemagne.',
    website: 'https://personio.com',
    logoEmoji: '👥',
    priceRange: { min: 4, max: 10, currency: 'EUR', unit: 'employé/mois' },
    stats: {
      avgPriceMonthly: 650,
      companiesCount: 22,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 200 },
        { label: '50-250 employés', avg: 620 },
        { label: '250-500 employés', avg: 1600 },
      ],
      topSectors: ['Technologie', 'Commerce', 'Industrie'],
    },
  },
  {
    slug: 'brevo',
    name: 'Brevo',
    category: 'Marketing Email',
    description: 'Email marketing + CRM SMB (ex-Sendinblue). Acteur français leader sur son segment.',
    website: 'https://brevo.com',
    logoEmoji: '📧',
    priceRange: { min: 0, max: 65, currency: 'EUR', unit: 'mois' },
    stats: {
      avgPriceMonthly: 180,
      companiesCount: 31,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 80 },
        { label: '50-250 employés', avg: 190 },
        { label: '250-500 employés', avg: 420 },
      ],
      topSectors: ['Commerce', 'MédiasPub', 'Conseil'],
    },
  },
  {
    slug: 'pennylane',
    name: 'Pennylane',
    category: 'Comptabilité',
    description: 'Comptabilité et facturation pour PME françaises. Intégration expert-comptable native.',
    website: 'https://pennylane.com',
    logoEmoji: '🪙',
    priceRange: { min: 49, max: 149, currency: 'EUR', unit: 'mois' },
    stats: {
      avgPriceMonthly: 95,
      companiesCount: 28,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 65 },
        { label: '50-250 employés', avg: 110 },
        { label: '250-500 employés', avg: 200 },
      ],
      topSectors: ['Technologie', 'Conseil', 'Commerce'],
    },
  },
  {
    slug: 'zendesk',
    name: 'Zendesk',
    category: 'Support Client',
    description: 'Helpdesk et ticketing omnicanal. Référence pour les équipes support B2B.',
    website: 'https://zendesk.com',
    logoEmoji: '🎧',
    priceRange: { min: 55, max: 115, currency: 'EUR', unit: 'agent/mois' },
    stats: {
      avgPriceMonthly: 1200,
      companiesCount: 25,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 330 },
        { label: '50-250 employés', avg: 1100 },
        { label: '250-500 employés', avg: 2800 },
      ],
      topSectors: ['Technologie', 'Commerce', 'Finance'],
    },
  },
  {
    slug: 'github',
    name: 'GitHub',
    category: 'Dev Tools',
    description: 'Hébergement de code et CI/CD. Standard mondial pour le développement logiciel.',
    website: 'https://github.com',
    logoEmoji: '🐙',
    priceRange: { min: 0, max: 19, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 380,
      companiesCount: 35,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 110 },
        { label: '50-250 employés', avg: 350 },
        { label: '250-500 employés', avg: 920 },
      ],
      topSectors: ['Technologie', 'Conseil', 'Finance'],
    },
  },
  {
    slug: 'confluence',
    name: 'Confluence',
    category: 'Documentation',
    description: 'Base de connaissances Atlassian. Souvent couplé à Jira dans les environnements tech.',
    website: 'https://atlassian.com/software/confluence',
    logoEmoji: '📚',
    priceRange: { min: 0, max: 11, currency: 'EUR', unit: 'utilisateur/mois' },
    stats: {
      avgPriceMonthly: 410,
      companiesCount: 26,
      sizeBreakdown: [
        { label: '10-50 employés', avg: 120 },
        { label: '50-250 employés', avg: 380 },
        { label: '250-500 employés', avg: 960 },
      ],
      topSectors: ['Technologie', 'Finance', 'Industrie'],
    },
  },
]

export function getProductBySlug(slug: string): SaasProduct | null {
  return PRODUCTS.find((p) => p.slug === slug) ?? null
}

export function getComparisons(): SaasComparison[] {
  const comparisons: SaasComparison[] = []
  for (let i = 0; i < PRODUCTS.length; i++) {
    for (let j = i + 1; j < PRODUCTS.length; j++) {
      const a = PRODUCTS[i]
      const b = PRODUCTS[j]
      comparisons.push({
        slug: `${a.slug}-vs-${b.slug}`,
        productA: a.slug,
        productB: b.slug,
        category: a.category === b.category ? a.category : 'SaaS',
        title: `${a.name} vs ${b.name} : ce que les entreprises paient vraiment`,
        metaDescription: `Comparez les prix réels de ${a.name} et ${b.name} basés sur des données d'achats anonymisées. Benchmark par taille d'entreprise et secteur.`,
      })
    }
  }
  return comparisons
}

export function getComparisonBySlug(slug: string): SaasComparison | null {
  return getComparisons().find((c) => c.slug === slug) ?? null
}

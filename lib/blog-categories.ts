/**
 * Catégories du blog Side by SaaS.
 * 8 catégories SEO orientées acheteurs IT.
 */

export const BLOG_CATEGORIES = [
  {
    slug: 'comparatifs',
    name: 'Comparatifs',
    emoji: '⚖️',
    description: 'X vs Y, benchmarks, comparaisons détaillées entre outils SaaS.',
    urlPrefix: '/compare',
    sortOrder: 1,
  },
  {
    slug: 'alternatives',
    name: 'Alternatives',
    emoji: '🔄',
    description: 'Les meilleures alternatives aux outils SaaS les plus connus.',
    urlPrefix: '/alternatives',
    sortOrder: 2,
  },
  {
    slug: 'pricing',
    name: 'Pricing & coûts',
    emoji: '💰',
    description: 'Grilles tarifaires, coûts réels et structures de prix des SaaS.',
    urlPrefix: '/pricing',
    sortOrder: 3,
  },
  {
    slug: 'avis',
    name: 'Avis utilisateurs',
    emoji: '⭐',
    description: 'Retours d\'expérience, avantages, inconvénients et notes réelles.',
    urlPrefix: '/reviews',
    sortOrder: 4,
  },
  {
    slug: 'guides-achat',
    name: 'Guides d\'achat',
    emoji: '🧭',
    description: 'Comment choisir, évaluer et sélectionner un SaaS adapté à vos besoins.',
    urlPrefix: '/guides',
    sortOrder: 5,
  },
  {
    slug: 'benchmarks',
    name: 'Benchmarks & études',
    emoji: '📊',
    description: 'Études de marché, paysages éditeurs et rapports de benchmark SaaS.',
    urlPrefix: '/benchmarks',
    sortOrder: 6,
  },
  {
    slug: 'templates-outils',
    name: 'Templates & outils',
    emoji: '🛠️',
    description: 'Templates d\'évaluation, grilles de comparaison, calculateurs ROI.',
    urlPrefix: '/templates',
    sortOrder: 7,
  },
  {
    slug: 'decouverte',
    name: 'Découverte d\'outils',
    emoji: '🔍',
    description: 'Les meilleurs SaaS par usage, secteur ou taille d\'équipe.',
    urlPrefix: '/discover',
    sortOrder: 8,
  },
  {
    slug: 'reglementation',
    name: 'Réglementation',
    emoji: '⚖️',
    description: 'NIS2, RGPD, facturation électronique et obligations réglementaires.',
    urlPrefix: '/reglementation',
    sortOrder: 9,
  },
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug']

export function getBlogCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}

export function getBlogCategoryName(slug: string): string {
  return getBlogCategoryBySlug(slug)?.name ?? slug
}

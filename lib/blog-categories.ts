/**
 * Catégories du blog Side by SaaS.
 * Catégories SEO orientées acheteurs de logiciels SaaS.
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
    slug: 'guides-achat',
    name: 'Guides d\'achat',
    emoji: '🧭',
    description: 'Comment choisir, évaluer et sélectionner un SaaS adapté à vos besoins.',
    urlPrefix: '/guides',
    sortOrder: 2,
  },
  {
    slug: 'benchmarks',
    name: 'Benchmarks & études',
    emoji: '📊',
    description: 'Études de marché, paysages éditeurs et rapports de benchmark SaaS.',
    urlPrefix: '/benchmarks',
    sortOrder: 3,
  },
  {
    slug: 'templates-outils',
    name: 'Templates & outils',
    emoji: '🛠️',
    description: 'Templates d\'évaluation, grilles de comparaison, calculateurs ROI.',
    urlPrefix: '/templates',
    sortOrder: 4,
  },
  {
    slug: 'reglementation',
    name: 'Réglementation',
    emoji: '⚖️',
    description: 'NIS2, RGPD, facturation électronique et obligations réglementaires.',
    urlPrefix: '/reglementation',
    sortOrder: 5,
  },
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug']

export function getBlogCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}

export function getBlogCategoryName(slug: string): string {
  return getBlogCategoryBySlug(slug)?.name ?? slug
}

/**
 * Catégories du blog Side by SaaS.
 */

export const BLOG_CATEGORIES = [
  { slug: 'pour-les-acheteurs', name: 'Pour les acheteurs', sortOrder: 1 },
  { slug: 'pour-les-editeurs', name: 'Pour les éditeurs', sortOrder: 2 },
  { slug: 'comparaison-benchmarks', name: 'Comparaison & benchmarks', sortOrder: 3 },
  { slug: 'prix-negociation', name: 'Prix & négociation', sortOrder: 4 },
  { slug: 'etudes-tendances', name: 'Études & tendances', sortOrder: 5 },
  { slug: 'actualites-sidebysaas', name: 'Actualités Side by SaaS', sortOrder: 6 },
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug']

export function getBlogCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}

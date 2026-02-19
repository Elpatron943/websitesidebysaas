/**
 * Catégories du blog Side by SaaS.
 */

export const BLOG_CATEGORIES = [
  { slug: 'comparaison-benchmarks', name: 'Comparaison & benchmarks', sortOrder: 1 },
  { slug: 'prix-negociation', name: 'Prix & négociation', sortOrder: 2 },
  { slug: 'etudes-tendances', name: 'Études & tendances', sortOrder: 3 },
] as const

export type BlogCategorySlug = (typeof BLOG_CATEGORIES)[number]['slug']

export function getBlogCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)
}

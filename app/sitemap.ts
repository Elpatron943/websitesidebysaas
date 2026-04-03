import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-posts'
import { getComparisons, PRODUCTS } from '@/lib/saas-products'
import { SEGMENTS } from '@/lib/segments'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://sidebysaas.com')

const locales = ['fr'] as const

const staticPaths = [
  '',
  '/about',
  '/features',
  '/pricing',
  '/contact',
  '/editeur',
  '/acheteur',
  '/blog',
  '/compare',
  '/docs',
  '/mentions',
  '/cgu',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const prefix = `/${locale}`

    // Pages statiques
    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}${prefix}${path}`,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      })
    }

    // Articles de blog
    for (const slug of getBlogPosts().map((p) => p.slug)) {
      entries.push({
        url: `${baseUrl}${prefix}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    // Pages landing segments (acheteur & editeur)
    for (const s of SEGMENTS) {
      entries.push({
        url: `${baseUrl}${prefix}/${s.persona}/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
      })
    }
  }

  // Pages compare produit vs produit (programmatic SEO)
  for (const c of getComparisons()) {
    entries.push({
      url: `${baseUrl}/fr/compare/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  // Pages prix par produit (programmatic SEO)
  for (const p of PRODUCTS) {
    entries.push({
      url: `${baseUrl}/fr/prix/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  return entries
}

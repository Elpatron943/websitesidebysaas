import type { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-posts'
import { getComparisons, PRODUCTS } from '@/lib/saas-products'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://sidebysaas.com')

const locales = ['fr', 'en'] as const

const staticPaths = ['', '/features', '/pricing', '/about', '/contact', '/editeur', '/acheteur', '/blog', '/mentions', '/cgu'] as const

const acheteurSecteurs = ['education', 'technologie', 'industrie', 'commerce-retail', 'secteur-public', 'services-professionnels', 'immobilier'] as const
const acheteurDirections = ['achats', 'finance', 'marketing', 'direction', 'rh', 'it', 'juridique'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    const prefix = `/${locale}`

    for (const path of staticPaths) {
      entries.push({
        url: `${baseUrl}${prefix}${path || ''}`,
        lastModified: new Date(),
        changeFrequency: path === '/blog' ? 'weekly' : 'monthly',
        priority: path === '' ? 1 : 0.8,
      })
    }

    for (const slug of getBlogPosts().map((p) => p.slug)) {
      entries.push({
        url: `${baseUrl}${prefix}/blog/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    }

    for (const secteur of acheteurSecteurs) {
      entries.push({
        url: `${baseUrl}${prefix}/acheteur/secteurs/${secteur}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }

    for (const sous of acheteurDirections) {
      entries.push({
        url: `${baseUrl}${prefix}/acheteur/directions/${sous}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      })
    }
  }

  // Pages compare (programmatic SEO)
  const compareUrls = getComparisons().map((c) => ({
    url: `${baseUrl}/fr/compare/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  entries.push(...compareUrls)

  // Pages prix (programmatic SEO)
  const prixUrls = PRODUCTS.map((p) => ({
    url: `${baseUrl}/fr/prix/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
  entries.push(...prixUrls)

  return entries
}

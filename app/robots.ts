import type { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL
  ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://sidebysaas.com')

export default function robots(): MetadataRoute.Robots {
  return {
    // Toutes les pages indexables sauf API et auth (auth géré sur app.sidebysaas.com)
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/auth'] },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

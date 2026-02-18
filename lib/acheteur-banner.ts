import path from 'path'
import fs from 'fs'

const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']

/**
 * Retourne l'URL publique de la bannière si un fichier existe dans public/banners/[category]/[slug].(jpg|png|webp).
 * Sinon retourne null (la page affichera le dégradé par défaut).
 */
export function getAcheteurBannerUrl(category: 'directions' | 'secteurs', slug: string): string | null {
  if (!slug || typeof slug !== 'string') return null
  const base = path.join(process.cwd(), 'public', 'banners', category)
  for (const ext of EXTENSIONS) {
    const filePath = path.join(base, `${slug}${ext}`)
    try {
      if (fs.existsSync(filePath)) return `/banners/${category}/${slug}${ext}`
    } catch {
      // ignore
    }
  }
  return null
}

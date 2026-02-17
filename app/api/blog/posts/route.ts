import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * API blog sans Supabase : retourne une liste vide (ou 404 pour un slug).
 * Les articles peuvent être fournis plus tard par un CMS ou des fichiers statiques.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')?.trim() || null

  if (slug) {
    return Response.json({ error: 'Not found' }, { status: 404 })
  }

  return Response.json({ posts: [] })
}

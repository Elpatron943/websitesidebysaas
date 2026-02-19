import { NextRequest } from 'next/server'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-posts'

export const dynamic = 'force-dynamic'

/**
 * API blog : sert les articles depuis lib/blog-posts.ts.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug')?.trim() || null
  const category = searchParams.get('category')?.trim() || null

  if (slug) {
    const post = getBlogPostBySlug(slug)
    if (!post) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }
    return Response.json({ post })
  }

  const posts = getBlogPosts(category || undefined)
  return Response.json({ posts })
}

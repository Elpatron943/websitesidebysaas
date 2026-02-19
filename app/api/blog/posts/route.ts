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

  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
  const allPosts = getBlogPosts(category || undefined)
  const total = allPosts.length
  const totalPages = Math.ceil(total / limit)
  const offset = (page - 1) * limit
  const posts = allPosts.slice(offset, offset + limit)
  return Response.json({
    posts,
    pagination: { page, limit, total, totalPages },
  })
}

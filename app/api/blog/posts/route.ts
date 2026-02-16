import { NextRequest } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')?.trim() || null
  const slug = searchParams.get('slug')?.trim() || null

  const supabase = await createClient()

  if (slug) {
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select('id, category_slug, title, slug, excerpt, body, published_at, created_at')
      .eq('slug', slug)
      .not('published_at', 'is', null)
      .lte('published_at', new Date().toISOString())
      .maybeSingle()
    if (error) return Response.json({ error: error.message }, { status: 500 })
    if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json({ post })
  }

  let query = supabase
    .from('blog_posts')
    .select('id, category_slug, title, slug, excerpt, published_at, created_at')
    .not('published_at', 'is', null)
    .lte('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (category) {
    query = query.eq('category_slug', category)
  }

  const { data, error } = await query

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ posts: data ?? [] })
}

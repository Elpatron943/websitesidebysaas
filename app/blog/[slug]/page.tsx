'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'

interface BlogPost {
  id: string
  category_slug: string
  title: string
  slug: string
  excerpt: string | null
  body: string | null
  published_at: string
  created_at: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    async function load() {
      setLoading(true)
      const res = await fetch(`/api/blog/posts?slug=${encodeURIComponent(slug)}`)
      if (!cancelled) {
        if (res.status === 404) {
          setNotFound(true)
          setPost(null)
        } else {
          const data = await res.json().catch(() => ({}))
          setPost(data.post ?? null)
          setNotFound(!data.post)
        }
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SiteHeader />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="text-slate-500">Chargement…</p>
        </main>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SiteHeader />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Article introuvable</h1>
          <Link href="/blog" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Retour au blog
          </Link>
        </main>
      </div>
    )
  }

  const categoryName = BLOG_CATEGORIES.find((c) => c.slug === post.category_slug)?.name ?? post.category_slug

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
        >
          ← Retour au blog
        </Link>
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
              {categoryName}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
              {post.title}
            </h1>
            <time
              dateTime={post.published_at}
              className="text-sm text-slate-500 block mb-6"
            >
              {new Date(post.published_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            {post.body ? (
              <div className="prose prose-slate max-w-none whitespace-pre-wrap text-slate-700">
                {post.body}
              </div>
            ) : post.excerpt ? (
              <p className="text-slate-600">{post.excerpt}</p>
            ) : null}
          </div>
        </article>
      </main>
    </div>
  )
}

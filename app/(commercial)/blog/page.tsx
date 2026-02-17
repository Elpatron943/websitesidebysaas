'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES, type BlogCategorySlug } from '@/lib/blog-categories'

interface BlogPost {
  id: string
  category_slug: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string
  created_at: string
}

const VALID_CATEGORY_SLUGS: Set<string> = new Set(BLOG_CATEGORIES.map((c) => c.slug))

function BlogPageContent() {
  const searchParams = useSearchParams()
  const categoryFromUrl = useMemo((): BlogCategorySlug | '' => {
    const c = searchParams.get('category')?.trim() ?? ''
    return (c && VALID_CATEGORY_SLUGS.has(c) ? c : '') as BlogCategorySlug | ''
  }, [searchParams])
  const [selectedCategory, setSelectedCategory] = useState<BlogCategorySlug | ''>(categoryFromUrl)

  useEffect(() => {
    setSelectedCategory(categoryFromUrl)
  }, [categoryFromUrl])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const url = selectedCategory
        ? `/api/blog/posts?category=${encodeURIComponent(selectedCategory)}`
        : '/api/blog/posts'
      const res = await fetch(url)
      const data = await res.json().catch(() => ({ posts: [] }))
      if (!cancelled) {
        setPosts(data.posts ?? [])
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [selectedCategory])

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Blog</h1>
            <p className="text-slate-600">
              Articles et actualités pour les acheteurs et éditeurs SaaS.
            </p>
          </div>
          <Link
            href="/"
            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>

        {/* Filtre par catégorie */}
        <div className="mb-8">
          <p className="text-sm font-medium text-slate-500 mb-2">Catégories</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory('')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
              }`}
            >
              Toutes
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => setSelectedCategory(cat.slug)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.slug
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des articles */}
        {loading ? (
          <div className="py-12 text-center text-slate-500">
            Chargement des articles…
          </div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600 mb-2">
              {selectedCategory
                ? 'Aucun article dans cette catégorie pour le moment.'
                : 'Aucun article publié pour le moment.'}
            </p>
            <p className="text-sm text-slate-500">
              Revenez bientôt pour découvrir nos contenus.
            </p>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {BLOG_CATEGORIES.find((c) => c.slug === post.category_slug)?.name ?? post.category_slug}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>
                  )}
                  <time
                    dateTime={post.published_at}
                    className="text-xs text-slate-400 mt-2 block"
                  >
                    {new Date(post.published_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}

export default function BlogPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50">
          <SiteHeader />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-slate-600">Chargement…</p>
          </main>
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  )
}

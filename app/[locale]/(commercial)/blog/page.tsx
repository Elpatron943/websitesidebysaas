'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES, type BlogCategorySlug } from '@/lib/blog-categories'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'

const CATEGORY_KEYS: Record<string, string> = {
  'comparaison-benchmarks': 'header.categoryComparison',
  'prix-negociation': 'header.categoryPricing',
  'etudes-tendances': 'header.categoryStudies',
}

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
const POSTS_PER_PAGE = 20

function BlogPageContent() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const categoryFromUrl = useMemo((): BlogCategorySlug | '' => {
    const c = searchParams.get('category')?.trim() ?? ''
    return (c && VALID_CATEGORY_SLUGS.has(c) ? c : '') as BlogCategorySlug | ''
  }, [searchParams])
  const pageFromUrl = useMemo(() => {
    const p = parseInt(searchParams.get('page') || '1', 10)
    return p >= 1 ? p : 1
  }, [searchParams])
  const [selectedCategory, setSelectedCategory] = useState<BlogCategorySlug | ''>(categoryFromUrl)
  const [currentPage, setCurrentPage] = useState(pageFromUrl)
  useEffect(() => { setSelectedCategory(categoryFromUrl) }, [categoryFromUrl])
  useEffect(() => { setCurrentPage(pageFromUrl) }, [pageFromUrl])
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [pagination, setPagination] = useState<{ page: number; total: number; totalPages: number } | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => { setCurrentPage(1) }, [selectedCategory])
  useEffect(() => {
    let cancelled = false
    async function load() {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedCategory) params.set('category', selectedCategory)
      params.set('page', String(currentPage))
      params.set('limit', String(POSTS_PER_PAGE))
      const res = await fetch(`/api/blog/posts?${params.toString()}`)
      const data = await res.json().catch(() => ({ posts: [], pagination: null }))
      if (!cancelled) {
        setPosts(data.posts ?? [])
        setPagination(data.pagination ?? null)
        setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [selectedCategory, currentPage])
  const goToPage = (page: number) => {
    const params = new URLSearchParams()
    if (selectedCategory) params.set('category', selectedCategory)
    if (page > 1) params.set('page', String(page))
    const qs = params.toString()
    router.push(pathname + (qs ? `?${qs}` : ''))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('blog.title')}</h1>
            <p className="text-slate-600">{t('blog.subtitle')}</p>
          </div>
          <Link href={prefix} className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            ← {t('common.backToHome')}
          </Link>
        </div>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => { setSelectedCategory(''); setCurrentPage(1); router.push(pathname) }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === '' ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}
            >
              {t('blog.all')}
            </button>
            {BLOG_CATEGORIES.map((cat) => (
              <button
                key={cat.slug}
                type="button"
                onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); router.push(`${pathname}?category=${encodeURIComponent(cat.slug)}`) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat.slug ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}
              >
                {t(CATEGORY_KEYS[cat.slug] ?? cat.slug)}
              </button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="py-12 text-center text-slate-500">{t('blog.loading')}</div>
        ) : posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600 mb-2">{selectedCategory ? t('blog.noPostsCategory') : t('blog.noPosts')}</p>
            <p className="text-sm text-slate-500">{t('blog.comeBack')}</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`${prefix}/blog/${post.slug}`} className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-200 hover:shadow-md transition-all">
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {t(CATEGORY_KEYS[post.category_slug] ?? post.category_slug)}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">{post.title}</h2>
                  {post.excerpt && <p className="text-slate-600 text-sm line-clamp-2">{post.excerpt}</p>}
                  <time dateTime={post.published_at} className="text-xs text-slate-400 mt-2 block">
                    {new Date(post.published_at).toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!loading && pagination && pagination.totalPages > 1 && (
          <nav className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              {pagination.page} / {pagination.totalPages}
              <span className="text-slate-500 ml-1">({pagination.total})</span>
            </p>
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page <= 1} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                ←
              </button>
              <button type="button" onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages} className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed">
                →
              </button>
            </div>
          </nav>
        )}
      </main>
    </div>
  )
}

export default function BlogPage() {
  const t = useTranslations()
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50">
          <SiteHeader />
          <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-slate-600">{t('common.loading')}</p>
          </main>
        </div>
      }
    >
      <BlogPageContent />
    </Suspense>
  )
}

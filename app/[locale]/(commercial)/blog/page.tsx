import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES, type BlogCategorySlug } from '@/lib/blog-categories'
import { getBlogPosts } from '@/lib/blog-posts'
import { fixMojibake } from '@/lib/fix-mojibake'
import { getMessages, t, isValidLocale, type Locale } from '@/lib/i18n'

const CATEGORY_KEYS: Record<string, string> = {
  'comparaison-benchmarks': 'header.categoryComparison',
  'prix-negociation': 'header.categoryPricing',
  'etudes-tendances': 'header.categoryStudies',
  reglementation: 'header.categoryRegulation',
}

const VALID_CATEGORY_SLUGS = new Set(BLOG_CATEGORIES.map((c) => c.slug))
const POSTS_PER_PAGE = 20

type Props = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string; page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : 'fr'
  const m = getMessages(lang)
  return {
    title: `${t(m, 'blog.title')} | Side by SaaS`,
    description: t(m, 'blog.subtitle'),
  }
}

export default async function BlogPage({ params, searchParams }: Props) {
  const { locale: localeParam } = await params
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'fr'
  const prefix = `/${locale}`
  const m = getMessages(locale)

  const resolvedSearch = await searchParams
  const categoryParam = resolvedSearch.category?.trim() ?? ''
  const category: BlogCategorySlug | '' =
    categoryParam && VALID_CATEGORY_SLUGS.has(categoryParam as BlogCategorySlug) ? (categoryParam as BlogCategorySlug) : ''
  const page = Math.max(1, parseInt(resolvedSearch.page || '1', 10) || 1)

  const allPosts = getBlogPosts(category || undefined)
  const total = allPosts.length
  const totalPages = Math.ceil(total / POSTS_PER_PAGE)
  const currentPage = Math.min(page, totalPages || 1)
  const offset = (currentPage - 1) * POSTS_PER_PAGE
  const posts = allPosts.slice(offset, offset + POSTS_PER_PAGE)

  const pagination = totalPages > 0 ? { page: currentPage, total, totalPages } : null

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(m, 'blog.title')}</h1>
            <p className="text-slate-600">{t(m, 'blog.subtitle')}</p>
          </div>
          <Link href={prefix} className="text-primary-600 hover:text-primary-700 font-medium text-sm">
            ← {t(m, 'common.backToHome')}
          </Link>
        </div>
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Link
              href={`${prefix}/blog`}
              className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === '' ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}
            >
              {t(m, 'blog.all')}
            </Link>
            {BLOG_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`${prefix}/blog?category=${encodeURIComponent(cat.slug)}`}
                className={`inline-block px-4 py-2 rounded-lg text-sm font-medium transition-colors ${category === cat.slug ? 'bg-primary-600 text-white' : 'bg-white text-slate-700 border border-slate-200 hover:border-primary-300 hover:bg-primary-50'}`}
              >
                {t(m, CATEGORY_KEYS[cat.slug] ?? cat.slug)}
              </Link>
            ))}
          </div>
        </div>
        {posts.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-600 mb-2">
              {category ? t(m, 'blog.noPostsCategory') : t(m, 'blog.noPosts')}
            </p>
            <p className="text-sm text-slate-500">{t(m, 'blog.comeBack')}</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={`${prefix}/blog/${post.slug}`}
                  className="block bg-white rounded-xl border border-slate-200 p-6 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
                    {t(m, CATEGORY_KEYS[post.category_slug] ?? post.category_slug)}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 mt-1 mb-2">{post.title}</h2>
                  {post.excerpt && (
                    <p className="text-slate-600 text-sm line-clamp-2">{fixMojibake(post.excerpt)}</p>
                  )}
                  <time
                    dateTime={post.published_at}
                    className="text-xs text-slate-400 mt-2 block"
                  >
                    {new Date(post.published_at).toLocaleDateString(
                      locale === 'en' ? 'en-GB' : 'fr-FR',
                      { day: 'numeric', month: 'long', year: 'numeric' }
                    )}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {pagination && pagination.totalPages > 1 && (
          <nav className="mt-10 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              {pagination.page} / {pagination.totalPages}
              <span className="text-slate-500 ml-1">({pagination.total})</span>
            </p>
            <div className="flex items-center gap-2">
              {pagination.page > 1 ? (
                <Link
                  href={
                    `${prefix}/blog` +
                    (() => {
                      const prev = pagination.page - 1
                      const q = new URLSearchParams()
                      if (category) q.set('category', category)
                      if (prev > 1) q.set('page', String(prev))
                      const s = q.toString()
                      return s ? `?${s}` : ''
                    })()
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  ←
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">
                  ←
                </span>
              )}
              {pagination.page < pagination.totalPages ? (
                <Link
                  href={
                    `${prefix}/blog` +
                    (() => {
                      const q = new URLSearchParams()
                      if (category) q.set('category', category)
                      q.set('page', String(pagination.page + 1))
                      return `?${q.toString()}`
                    })()
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                >
                  →
                </Link>
              ) : (
                <span className="px-4 py-2 rounded-lg text-sm font-medium border border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed">
                  →
                </span>
              )}
            </div>
          </nav>
        )}
      </main>
    </div>
  )
}

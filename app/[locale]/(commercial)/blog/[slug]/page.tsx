'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'
import { getSignupUrl } from '@/lib/commercial-auth-links'
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
  body: string | null
  published_at: string
  created_at: string
  reading_minutes?: number
}

export default function BlogPostPage() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`
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
          <p className="text-slate-500">{t('common.loading')}</p>
        </main>
      </div>
    )
  }

  if (notFound || !post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <SiteHeader />
        <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">{t('blog.articleNotFound')}</h1>
          <Link href={`${prefix}/blog`} className="text-primary-600 hover:text-primary-700 font-medium">
            ← {t('blog.backToBlog')}
          </Link>
        </main>
      </div>
    )
  }

  const categoryName = t(CATEGORY_KEYS[post.category_slug] ?? post.category_slug)

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href={`${prefix}/blog`} className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors">
          ← {t('blog.backToBlog')}
        </Link>
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">{categoryName}</span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-6">
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString(locale === 'en' ? 'en-GB' : 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
              {post.reading_minutes ? (
                <span>• {t('blog.readingTime')}: {post.reading_minutes} {t('blog.min')}</span>
              ) : null}
            </div>
            {post.body ? (
              <div dangerouslySetInnerHTML={{ __html: post.body }} />
            ) : post.excerpt ? (
              <p className="text-slate-600">{post.excerpt}</p>
            ) : null}
            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="rounded-xl bg-primary-50 border border-primary-100 p-6 text-center">
                <p className="text-slate-800 font-semibold mb-2">{t('blog.ctaTitle')}</p>
                <p className="text-slate-600 text-sm mb-4">{t('blog.ctaSubtitle')}</p>
                {getSignupUrl('/buyer') ? (
                  <a href={getSignupUrl('/buyer')!} className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all">
                    {t('blog.createBuyerAccount')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </a>
                ) : (
                  <Link href={`${prefix}/acheteur`} className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all">
                    {t('blog.discoverBuyer')}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}

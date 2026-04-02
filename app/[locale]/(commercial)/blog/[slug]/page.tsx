import Link from 'next/link'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getSignupUrl } from '@/lib/commercial-auth-links'
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog-posts'
import { fixMojibake } from '@/lib/fix-mojibake'
import { getMessages, t, isValidLocale, type Locale } from '@/lib/i18n'

const CATEGORY_KEYS: Record<string, string> = {
  'comparaison-benchmarks': 'header.categoryComparison',
  'prix-negociation': 'header.categoryPricing',
  'etudes-tendances': 'header.categoryStudies',
  reglementation: 'header.categoryRegulation',
}

type Props = { params: Promise<{ locale: string; slug: string }> }

const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  'obligation-de-vigilance-acheteurs-it-process-preuves': 'obligation-de-vigilance-urssaf-attestation-travail-dissimule',
}

const REG_FRAMEWORK_LABELS: Record<string, string> = {
  'nis2-checklist-fournisseurs-saas-2026': 'NIS2',
  'rgpd-checklist-achat-saas-2026': 'RGPD',
  'facturation-electronique-questions-choix-solution-2026': 'facturation électronique',
  'devoir-de-vigilance-achat-saas-2026': 'devoir de vigilance',
  'obligation-de-vigilance-achats-it-2026': 'obligation de vigilance (URSSAF)',
}

export async function generateStaticParams() {
  const posts = getBlogPosts()
  return ['fr', 'en'].flatMap((locale) =>
    posts.map((post) => ({ locale, slug: post.slug }))
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return { title: 'Article introuvable' }
  const description = post.excerpt ?? post.title
  const lang = isValidLocale(locale) ? locale : 'fr'
  return {
    title: `${post.title} | Side by SaaS`,
    description: description.slice(0, 160),
    alternates: { languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` } },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: localeParam, slug } = await params
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'fr'
  const prefix = `/${locale}`
  const m = getMessages(locale)

  const redirected = LEGACY_SLUG_REDIRECTS[slug]
  if (redirected) redirect(`${prefix}/blog/${redirected}`)

  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const categoryName = t(m, CATEGORY_KEYS[post.category_slug] ?? post.category_slug)
  const dateFormatted = new Date(post.published_at).toLocaleDateString(
    locale === 'en' ? 'en-GB' : 'fr-FR',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )
  const signupUrl = getSignupUrl(`${prefix}/acheteur`)
  const hasInlineCta =
    typeof post.body === 'string' &&
    post.body.includes('class="my-10 rounded-xl bg-primary-50 border border-primary-100 p-6 text-center"')
  const frameworkLabel =
    REG_FRAMEWORK_LABELS[post.id] ?? (post.title.split(':')[0] || post.title).trim()

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={`${prefix}/blog`}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
        >
          ← {t(m, 'blog.backToBlog')}
        </Link>
        <article className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-10">
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
              {categoryName}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-6">
              <time dateTime={post.published_at}>{dateFormatted}</time>
              {post.reading_minutes ? (
                <span>
                  • {t(m, 'blog.readingTime')}: {post.reading_minutes} {t(m, 'blog.min')}
                </span>
              ) : null}
            </div>
            {post.body ? (
              <div dangerouslySetInnerHTML={{ __html: fixMojibake(post.body) }} />
            ) : post.excerpt ? (
              <p className="text-slate-600">{fixMojibake(post.excerpt)}</p>
            ) : null}
            {post.category_slug === 'reglementation' ? (
              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="rounded-xl bg-primary-50 border border-primary-100 p-6 text-center">
                  <p className="text-slate-800 font-semibold mb-2">{t(m, 'blog.regCtaTitle')}</p>
                  <p className="text-slate-600 text-sm mb-4">
                    {t(m, 'blog.regCtaSubtitle').replace('{framework}', frameworkLabel)}
                  </p>
                  {signupUrl ? (
                    <a
                      href={signupUrl}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      {t(m, 'blog.regCtaButton')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`${prefix}/acheteur`}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      {t(m, 'blog.regCtaButton')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ) : !hasInlineCta ? (
              <div className="mt-10 pt-8 border-t border-slate-200">
                <div className="rounded-xl bg-primary-50 border border-primary-100 p-6 text-center">
                  <p className="text-slate-800 font-semibold mb-2">{t(m, 'blog.ctaTitle')}</p>
                  <p className="text-slate-600 text-sm mb-4">{t(m, 'blog.ctaSubtitle')}</p>
                  {signupUrl ? (
                    <a
                      href={signupUrl}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      {t(m, 'blog.createBuyerAccount')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href={`${prefix}/acheteur`}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      {t(m, 'blog.discoverBuyer')}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </main>
    </div>
  )
}

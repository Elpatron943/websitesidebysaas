'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/app/components/SiteHeader'
import { BLOG_CATEGORIES } from '@/lib/blog-categories'
import { getSignupUrl } from '@/lib/commercial-auth-links'
import { fixMojibake } from '@/lib/fix-mojibake'

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
  cta_object?: string
}

const REG_FRAMEWORK_LABELS: Record<string, string> = {
  'nis2-checklist-fournisseurs-saas-2026': 'NIS2',
  'rgpd-checklist-achat-saas-2026': 'RGPD',
  'facturation-electronique-questions-choix-solution-2026': 'facturation électronique',
  'devoir-de-vigilance-achat-saas-2026': 'devoir de vigilance',
  'obligation-de-vigilance-achats-it-2026': 'obligation de vigilance (URSSAF)',
}

export default function BlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = typeof params.slug === 'string' ? params.slug : ''
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (slug === 'obligation-de-vigilance-acheteurs-it-process-preuves') {
      router.replace('/blog/obligation-de-vigilance-urssaf-attestation-travail-dissimule')
    }
  }, [router, slug])

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
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 font-medium">
            ← Retour au blog
          </Link>
        </main>
      </div>
    )
  }

  const categoryName = BLOG_CATEGORIES.find((c) => c.slug === post.category_slug)?.name ?? post.category_slug
  const hasInlineCta =
    typeof post.body === 'string' &&
    post.body.includes('class="my-10 rounded-xl bg-primary-50 border border-primary-100 p-6 text-center"')
  const frameworkLabel =
    REG_FRAMEWORK_LABELS[post.id] ?? (post.title.split(':')[0] || post.title).trim()
  const templateObject = post.cta_object ?? (post.title.split(':')[0] || post.title).trim()

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
            <span className="text-xs font-semibold text-primary-600 uppercase tracking-wide">
              {categoryName}
            </span>
            <h1 className="text-3xl font-bold text-slate-900 mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-6">
              <time dateTime={post.published_at}>
                {new Date(post.published_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
              {post.reading_minutes ? (
                <span>• Temps de lecture : {post.reading_minutes} min</span>
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
                  <p className="text-slate-800 font-semibold mb-2">
                    Trouver des solutions conformes
                  </p>
                  <p className="text-slate-600 text-sm mb-4">
                    En vous inscrivant, vous pourrez identifier des solutions SaaS adaptées au cadre réglementaire que vous recherchez : {frameworkLabel}.
                  </p>
                  {getSignupUrl('/buyer') ? (
                    <a
                      href={getSignupUrl('/buyer')!}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      Trouver des solutions SaaS
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href="/fr/acheteur"
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      Trouver des solutions SaaS
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
                  <p className="text-slate-800 font-semibold mb-2">
                    Prêt à comparer vos outils SaaS avec des données réelles ?
                  </p>
                  <p className="text-slate-600 text-sm mb-4">
                    {post.category_slug === 'templates-outils'
                      ? `Vous voulez passer à l'étape supérieure avec un logiciel pour : ${templateObject}.`
                      : post.category_slug === 'comparatifs'
                        ? "En vous inscrivant, vous accédez aux prix payés par vos pairs (même secteur, même taille), aux fonctionnalités observées chez des utilisateurs réels et aux avis utilisateurs."
                        : "Rejoignez Side by SaaS et accédez aux prix pratiqués par d&apos;autres acheteurs."}
                  </p>
                  {getSignupUrl('/buyer') ? (
                    <a
                      href={getSignupUrl('/buyer')!}
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      Créer mon compte acheteur
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      href="/fr/acheteur"
                      className="inline-flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow transition-all"
                    >
                      Découvrir l&apos;espace acheteur
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

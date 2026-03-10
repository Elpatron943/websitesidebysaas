'use client'

import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'
import { NavLogo } from '@/app/components/NavLogo'
import { getSignupUrl } from '@/lib/commercial-auth-links'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'
import { SEGMENTS } from '@/lib/segments'

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export default function EditeurPage() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-14">
          <span className="inline-block text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
            {t('editeur.badge')}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            {t('editeur.title')}
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('editeur.subtitle')}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <div className="p-8 lg:p-10">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-6">
              {t('editeur.whatYouFind')}
            </h2>
            <ul className="space-y-2.5 text-slate-700 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5 font-bold">✓</span>
                <span><strong className="text-slate-800">{t('editeur.certification')}</strong> — {t('editeur.certificationDesc')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5 font-bold">✓</span>
                <span><strong className="text-slate-800">{t('editeur.forum')}</strong> — {t('editeur.forumDesc')}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 mt-0.5 font-bold">✓</span>
                <span><strong className="text-slate-800">{t('editeur.presence')}</strong> — {t('editeur.presenceDesc')}</span>
              </li>
            </ul>
            {getSignupUrl('/editor') ? (
              <a href={getSignupUrl('/editor')!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                {t('editeur.discoverPage')}
              </a>
            ) : (
              <a href={`${PLATFORM_URL}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 rounded-xl text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-sm">
                {t('editeur.discoverPage')}
              </a>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6"><span className="text-2xl text-amber-600 font-bold">✓</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('editeur.certifyTitle')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{t('editeur.certifyDesc')}</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6"><span className="text-2xl">🃏</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('editeur.battleCards')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{t('editeur.battleCardsDesc')}</p>
          </div>
          <div className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-amber-200 transition-colors">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6"><span className="text-2xl">📊</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('editeur.insight')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{t('editeur.insightDesc')}</p>
          </div>
        </div>

        {/* Explorer par catégorie */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Explorer par segment</h2>
            <p className="text-slate-600">Données de marché segmentées pour comprendre votre positionnement</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            {SEGMENTS.filter((s) => s.persona === 'editeur').map((seg) => (
              <Link
                key={seg.slug}
                href={`${prefix}/editeur/${seg.slug}`}
                className="bg-slate-50 rounded-xl border border-slate-200 p-6 hover:border-amber-300 hover:shadow-md transition-all group flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold uppercase tracking-wide text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                    {seg.category || 'Tous segments'}
                  </span>
                  <span className="text-slate-400 group-hover:text-amber-600 transition-colors">→</span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                  {seg.title}
                </h3>
                <p className="text-sm text-slate-500 flex-1 mb-4">{seg.subtitle}</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-amber-600">{seg.heroStat.value}</span>
                  <span className="text-xs text-slate-500">{seg.heroStat.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center bg-slate-50 rounded-2xl p-12 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{t('editeur.ctaTitle')}</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">{t('editeur.ctaSubtitle')}</p>
          {getSignupUrl('/editor') ? (
            <a href={getSignupUrl('/editor')!} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg">
              <span>📦</span> {t('editeur.createSpace')}
            </a>
          ) : (
            <a href={`${PLATFORM_URL}/auth/register?redirectTo=/editor`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg">
              <span>📦</span> {t('editeur.createSpace')}
            </a>
          )}
          <p className="text-sm text-slate-500 mt-4">{t('editeur.ctaFree')}</p>
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <NavLogo height={80} className="[filter:brightness(0)_invert(1)]" />
              <span className="text-slate-400">{t('footer.copyright')} {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm text-slate-400">
              <Link href={prefix} className="hover:text-white transition-colors">{t('common.backToHome')}</Link>
              <Link href={`${prefix}/mentions`} className="hover:text-white transition-colors">{t('footer.legal')}</Link>
              <Link href={`${prefix}/cgu`} className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

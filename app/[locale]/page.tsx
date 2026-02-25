'use client'

import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'
import { NavLogo } from '@/app/components/NavLogo'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`
  const platformUrl = PLATFORM_URL

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {t('home.problem.title')}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-6 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: t('home.problem.buyers').replace(t('home.problem.buyersBold'), `<strong class="text-slate-800">${t('home.problem.buyersBold')}</strong>`) }} />
          </p>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
            <span dangerouslySetInnerHTML={{ __html: t('home.problem.editors').replace(t('home.problem.editorsBold'), `<strong class="text-slate-800">${t('home.problem.editorsBold')}</strong>`) }} />
          </p>
          <p className="text-lg md:text-xl text-blue-700 font-medium mt-8">
            {t('home.problem.solution')}
          </p>
          <p className="mt-6 px-6 py-4 rounded-xl bg-slate-100 border border-slate-200 text-base md:text-lg text-slate-800 font-medium leading-relaxed">
            {t('home.problem.independence')}
          </p>
        </div>
      </section>

      <section className="bg-slate-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('home.who.title')}</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('home.who.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-8 lg:p-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 text-2xl">🛒</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{t('home.who.buyers')}</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{t('home.who.whyYou')}</h4>
                    <p className="text-slate-700 leading-relaxed">{t('home.who.buyersWhy')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('home.who.whatYouFind')}</h4>
                    <ul className="space-y-2.5 text-slate-700">
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">✓</span><span>{t('home.who.buyersFind1')}</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">✓</span><span>{t('home.who.buyersFind2')}</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">✓</span><span>{t('home.who.buyersFind3')}</span></li>
                      <li className="flex items-start gap-2"><span className="text-blue-600 mt-0.5">✓</span><span>{t('home.who.buyersFind4')}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                <Link href={`${prefix}/acheteur`} className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-lg">
                  {t('home.who.discoverBuyer')}
                </Link>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col">
              <div className="p-8 lg:p-10 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center shrink-0 text-2xl">📦</div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900">{t('home.who.editors')}</h3>
                </div>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">{t('home.who.whyYou')}</h4>
                    <p className="text-slate-700 leading-relaxed">{t('home.who.editorsWhy')}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">{t('home.who.whatYouFind')}</h4>
                    <ul className="space-y-2.5 text-slate-700">
                      <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span><span>{t('home.who.editorsFind1')}</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span><span>{t('home.who.editorsFind2')}</span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-600 mt-0.5">✓</span><span>{t('home.who.editorsFind3')}</span></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                <Link href={`${prefix}/editeur`} className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                  {t('home.who.discoverEditor')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('home.cta.title')}</h2>
          <p className="text-slate-600 mb-8">{t('home.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} className="w-full sm:w-auto bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
              {t('home.cta.createBuyer')}
            </a>
            <a href={`${platformUrl}/auth/register?redirectTo=/editor`} className="w-full sm:w-auto bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-50 transition-colors border-2 border-blue-600">
              {t('home.cta.createEditor')}
            </a>
          </div>
          <p className="text-sm text-slate-500 mt-6">{t('home.cta.free')}</p>
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <NavLogo height={80} className="[filter:brightness(0)_invert(1)]" />
              <span className="text-slate-400">{t('footer.copyright')} {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-1 text-sm text-slate-400">
              <Link href={`${prefix}/docs`} className="hover:text-white transition-colors">{t('common.documentation')}</Link>
              <Link href={`${prefix}/about`} className="hover:text-white transition-colors">{t('common.about')}</Link>
              <Link href={`${prefix}/contact`} className="hover:text-white transition-colors">{t('common.contact')}</Link>
              <Link href={`${prefix}/mentions`} className="hover:text-white transition-colors">{t('footer.legal')}</Link>
              <Link href={`${prefix}/cgu`} className="hover:text-white transition-colors">{t('footer.terms')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

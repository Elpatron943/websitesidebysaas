import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getMessages, t, isValidLocale, type Locale } from '@/lib/i18n'

const CGU_LAST_UPDATE = '2026-02-25'
const CONTACT_EMAIL = 'contact@sidebysaas.com'

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : 'fr'
  const m = getMessages(lang)
  return { title: `${t(m, 'cgu.title')} | Side by SaaS` }
}

export default async function CGUPage({ params }: Props) {
  const { locale: localeParam } = await params
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'fr'
  const prefix = `/${locale}`
  const m = getMessages(locale)

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href={prefix}
          className="inline-flex items-center gap-1 text-slate-500 hover:text-slate-800 text-sm font-medium mb-8 transition-colors"
        >
          ← {locale === 'en' ? 'Back to home' : 'Retour à l\'accueil'}
        </Link>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{t(m, 'cgu.title')}</h1>
        <p className="text-sm text-slate-500 mb-8">
          {t(m, 'cgu.lastUpdate')} : {CGU_LAST_UPDATE}
        </p>

        <div className="space-y-8">
          <section>
            <p className="text-slate-600">{t(m, 'cgu.intro')}</p>
            <p className="text-slate-600 mt-2">{t(m, 'cgu.acceptance')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.object')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.objectText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.use')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.useText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.liability')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.liabilityText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.ip')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.ipText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.modifications')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.modificationsText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.law')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.lawText')}</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">{t(m, 'cgu.contact')}</h2>
            <p className="text-slate-600">{t(m, 'cgu.contactText')}</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary-600 hover:underline font-medium">
              {CONTACT_EMAIL}
            </a>
          </section>
        </div>
      </main>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'
import { SiteHeader } from '@/app/components/SiteHeader'
import { getMessages, t, isValidLocale, type Locale } from '@/lib/i18n'

const COMPANY = {
  name: 'FRAIDGE',
  legalForm: 'SAS, société par actions simplifiée',
  address: '60 rue François Ier',
  postalCode: '75008',
  city: 'Paris',
  country: 'France',
  siren: '990 697 187',
  siret: '990 697 187 00013',
  capital: '1 000 €',
  activity: 'Programmation informatique (62.01Z)',
  creationDate: '28 août 2025',
  contactEmail: 'contact@sidebysaas.com',
}

type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const lang = isValidLocale(locale) ? locale : 'fr'
  const m = getMessages(lang)
  return { title: `${t(m, 'legal.title')} | Side by SaaS` }
}

export default async function LegalPage({ params }: Props) {
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
        <h1 className="text-3xl font-bold text-slate-900 mb-6">{t(m, 'legal.title')}</h1>
        <p className="text-slate-600 mb-8">{t(m, 'legal.intro')}</p>

        <section className="bg-white rounded-xl border border-slate-200 p-6 md:p-8 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">{t(m, 'legal.publisher')}</h2>
          <dl className="grid gap-2 text-sm">
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.company')}</dt>
              <dd className="text-slate-900">{COMPANY.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.legalForm')}</dt>
              <dd className="text-slate-900">{COMPANY.legalForm}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.headOffice')}</dt>
              <dd className="text-slate-900">
                {COMPANY.address}, {COMPANY.postalCode} {COMPANY.city}, {COMPANY.country}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.siren')}</dt>
              <dd className="text-slate-900">{COMPANY.siren}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.siret')}</dt>
              <dd className="text-slate-900">{COMPANY.siret}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.capital')}</dt>
              <dd className="text-slate-900">{COMPANY.capital}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.activity')}</dt>
              <dd className="text-slate-900">{COMPANY.activity}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.creationDate')}</dt>
              <dd className="text-slate-900">{COMPANY.creationDate}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">{t(m, 'legal.contact')}</dt>
              <dd className="text-slate-900">
                <a href={`mailto:${COMPANY.contactEmail}`} className="text-primary-600 hover:underline">
                  {COMPANY.contactEmail}
                </a>
              </dd>
            </div>
          </dl>
        </section>

        <p className="text-xs text-slate-500 mt-6">
          {locale === 'en'
            ? 'Source: French business directory (annuaire-entreprises.data.gouv.fr).'
            : 'Source : annuaire-entreprises.data.gouv.fr'}
        </p>
      </main>
    </div>
  )
}

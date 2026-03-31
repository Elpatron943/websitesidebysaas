'use client'

import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'
import { NavLogo } from '@/app/components/NavLogo'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

const testimonials = [
  {
    quote: "J'ai économisé 40% sur notre CRM en négociation grâce aux données de Side by SaaS. En 2 jours j'avais tous les arguments.",
    name: "Marc T.",
    title: "DSI, ETI industrielle 800 salariés",
    avatar: "MT",
  },
  {
    quote: "3 semaines de benchmark habituellement. Avec Side by SaaS, j'ai eu une vue marché complète en 2 jours. Incroyable.",
    name: "Julie R.",
    title: "IT Manager, Scale-up fintech",
    avatar: "JR",
  },
  {
    quote: "La seule source où je fais vraiment confiance aux prix. Pas du marketing, de vraies données d'achat.",
    name: "Karim B.",
    title: "Responsable Achats IT, Groupe retail",
    avatar: "KB",
  },
]

const communityPreviews = [
  {
    pseudo: "MarcT.",
    text: "Quelqu'un a comparé HubSpot vs Salesforce sur des contrats > 50 users récemment ?",
    size: "200-500 salariés", sector: "Finance", ago: "2h",
    replies: [
      { pseudo: "JulieR.", size: "100-200 salariés", sector: "Tech", text: "Oui, on a fait ça en janvier. HubSpot était 30% moins cher à périmètre égal.", ago: "1h45" },
      { pseudo: "AntoineD.", size: "500+ salariés", sector: "Retail", text: "Salesforce a beaucoup plus de flexibilité sur les intégrations, mais le coût d'implémentation est bien plus élevé.", ago: "1h20" },
      { pseudo: "SofiaL.", size: "50-100 salariés", sector: "Finance", text: "On a choisi HubSpot finalement. Le support et l'onboarding étaient vraiment meilleurs.", ago: "40min" },
    ],
  },
  {
    pseudo: "KarimB.",
    text: "Benchmark sécurité endpoint 2025 — je partage mes résultats après 6 mois",
    size: "50-200 salariés", sector: "Industrie", ago: "5h",
    replies: [
      { pseudo: "ClaireM.", size: "200-500 salariés", sector: "Santé", text: "Très intéressant, tu as testé CrowdStrike vs SentinelOne ?", ago: "4h30" },
      { pseudo: "NicolasP.", size: "100-200 salariés", sector: "Industrie", text: "On a les mêmes résultats sur SentinelOne. Excellent sur la détection, complexe à déployer.", ago: "3h" },
      { pseudo: "EmmaF.", size: "10-50 salariés", sector: "Tech", text: "Merci pour le partage. Tu peux détailler la méthode de scoring ?", ago: "2h" },
    ],
  },
]

export default function Home() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`
  const platformUrl = PLATFORM_URL

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FFFBF5', color: '#1C1917' }}>
      <SiteHeader />

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-28">
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest uppercase mb-4" style={{ color: '#16A34A' }}>
            {t('home.landing.heroBadge')}
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6" style={{ fontFamily: 'var(--font-sans)', color: '#1C1917' }}>
            Arrêtez de choisir vos SaaS<br className="hidden sm:block" /> à l&apos;aveugle.
          </h1>
          <p className="text-lg md:text-xl mb-3 max-w-2xl mx-auto leading-relaxed" style={{ color: '#44403C' }}>
            Des acheteurs comme vous partagent leurs vraies décisions d&apos;achat —<br className="hidden md:block" /> prix négociés, remises obtenues, retours d&apos;expérience honnêtes.
          </p>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-3 mb-10 mt-6">
            <div className="flex -space-x-2">
              {['MT','JR','KB','AB','SL'].map((initials) => (
                <div key={initials} className="w-9 h-9 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white" style={{ borderColor: '#FFFBF5', backgroundColor: '#16A34A' }}>
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium" style={{ color: '#57534E' }}>
              <strong style={{ color: '#1C1917' }}>2 847+</strong> acheteurs IT cette semaine
            </p>
          </div>
        </div>
      </section>

      {/* ENGAGEMENT : ACHETEURS / INDÉPENDANCE ÉDITEURS */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 -mt-4">
        <div
          className="rounded-2xl border p-6 md:p-8 shadow-sm"
          style={{ backgroundColor: '#ECFDF5', borderColor: '#86EFAC' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#15803D' }}>
            {t('home.landing.commitmentLabel')}
          </p>
          <h2 className="text-lg md:text-xl font-bold mb-4 leading-snug" style={{ color: '#14532D' }}>
            {t('home.landing.independenceTitle')}
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: '#166534' }}>
            {t('home.landing.independenceBody')}
          </p>
        </div>
      </section>

      {/* LE PROBLÈME */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: '#DC2626' }}>Le problème</p>
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1C1917' }}>
              Choisir un SaaS, c&apos;est encore trop souvent une prise de risque.
            </h2>
            <p className="text-base max-w-2xl mx-auto leading-relaxed" style={{ color: '#57534E' }}>
              Les acheteurs IT naviguent à l&apos;aveugle : démos trop lisses, comparatifs influencés par les éditeurs, tarifs opaques, et aucun moyen de savoir ce que les autres ont vraiment négocié.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎭',
                title: 'Des démos, pas des vérités',
                desc: 'Les éditeurs montrent leur meilleur jour. Vous ne voyez jamais les bugs, les frictions d\'onboarding, ni ce qui fait regretter le choix 6 mois plus tard.',
              },
              {
                icon: '💸',
                title: 'Des prix introuvables',
                desc: 'Les grilles tarifaires sont volontairement floues. Sans savoir ce que les autres ont payé, vous négociez dans le vide — et vous payez trop cher.',
              },
              {
                icon: '🔇',
                title: 'Des retours d\'expérience introuvables',
                desc: 'Les avis publics sont filtrés, incentivés ou vieux. Les vraies décisions d\'achat — ce qui a fait pencher la balance — restent dans les têtes.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border p-6" style={{ backgroundColor: '#FEF2F2', borderColor: '#FECACA' }}>
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: '#1C1917' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 rounded-2xl border p-6 flex items-start gap-4" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0' }}>
            <span className="text-2xl mt-0.5">✅</span>
            <div>
              <p className="font-bold mb-1" style={{ color: '#15803D' }}>Side by SaaS résout ça.</p>
              <p className="text-sm leading-relaxed" style={{ color: '#166534' }}>
                Des acheteurs IT partagent anonymement leurs vraies décisions — prix négociés, remises obtenues, raisons du choix final. Taille et secteur visibles pour que vous trouviez des pairs comparables.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{ backgroundColor: '#F5F0E8' }} className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1C1917' }}>
              Ils ont mieux choisi grâce à Side by SaaS
            </h2>
            <p style={{ color: '#57534E' }}>Acheteurs IT, DSI, responsables IT — leurs retours en direct.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="rounded-2xl p-6 shadow-sm border" style={{ backgroundColor: '#FFFBF5', borderColor: '#EDE5D8' }}>
                <p className="text-base leading-relaxed mb-5 italic" style={{ fontFamily: 'var(--font-serif)', color: '#292524' }}>
                  &quot;{t.quote}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ backgroundColor: '#16A34A' }}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-sm" style={{ color: '#1C1917' }}>{t.name}</p>
                    <p className="text-xs" style={{ color: '#78716C' }}>{t.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BUYER / EDITOR CARDS */}
      <section className="py-16 md:py-24" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1C1917' }}>{t('home.who.title')}</h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#57534E' }}>{t('home.who.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col" style={{ backgroundColor: '#FFFBF5', borderColor: '#D6D3D1' }}>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#DCFCE7' }}>🛒</div>
                  <h3 className="text-xl font-bold" style={{ color: '#1C1917' }}>{t('home.who.buyers')}</h3>
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: '#57534E' }}>{t('home.who.buyersWhy')}</p>
                <ul className="space-y-2">
                  {[t('home.who.buyersFind1'), t('home.who.buyersFind2'), t('home.who.buyersFind3'), t('home.who.buyersFind4')].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#44403C' }}>
                      <span style={{ color: '#16A34A' }} className="mt-0.5 font-bold">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link href={`${prefix}/acheteur`} className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold text-white transition-all" style={{ backgroundColor: '#16A34A' }}>
                  {t('home.who.discoverBuyer')}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow flex flex-col" style={{ backgroundColor: '#FFFBF5', borderColor: '#D6D3D1' }}>
              <div className="p-8 flex-1">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: '#FEF9C3' }}>📦</div>
                  <h3 className="text-xl font-bold" style={{ color: '#1C1917' }}>{t('home.who.editors')}</h3>
                </div>
                <p className="mb-4 leading-relaxed" style={{ color: '#57534E' }}>{t('home.who.editorsWhy')}</p>
                <ul className="space-y-2">
                  {[t('home.who.editorsFind1'), t('home.who.editorsFind2'), t('home.who.editorsFind3')].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: '#44403C' }}>
                      <span className="mt-0.5 font-bold" style={{ color: '#CA8A04' }}>✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="px-8 pb-8">
                <Link href={`${prefix}/editeur`} className="block w-full py-3.5 px-6 rounded-xl text-center font-semibold border-2 transition-all" style={{ borderColor: '#1C1917', color: '#1C1917' }}>
                  {t('home.who.discoverEditor')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNAUTÉ */}
      <section style={{ backgroundColor: '#F5F0E8' }} className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: '#1C1917' }}>
              🗣️ Communauté active
            </h2>
            <p style={{ color: '#57534E' }}>Des discussions en cours entre professionnels IT</p>
            <p className="text-xs mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full" style={{ backgroundColor: '#EDE5D8', color: '#78716C' }}>
              <span>🔒</span> Messages anonymes · taille et secteur visibles
            </p>
          </div>
          <div className="space-y-4 mb-8">
            {communityPreviews.map((item, i) => (
              <div key={i} className="rounded-xl border overflow-hidden" style={{ borderColor: '#EDE5D8' }}>
                {/* Post principal */}
                <div className="p-4" style={{ backgroundColor: '#FFFBF5' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ backgroundColor: '#16A34A' }}>
                      {item.pseudo.slice(0, 2).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: '#1C1917' }}>{item.pseudo}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>{item.size}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#EDE5D8', color: '#78716C' }}>{item.sector}</span>
                    <span className="text-xs ml-auto" style={{ color: '#78716C' }}>il y a {item.ago}</span>
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#1C1917' }}>{item.text}</p>
                </div>
                {/* Réponses */}
                <div style={{ backgroundColor: '#F5F0E8', borderTop: '1px solid #EDE5D8' }}>
                  {item.replies.map((reply, j) => (
                    <div key={j} className="px-4 py-3 flex items-start gap-2" style={{ borderTop: j > 0 ? '1px solid #EDE5D8' : undefined }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5" style={{ backgroundColor: '#78716C' }}>
                        {reply.pseudo.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                          <span className="text-xs font-semibold" style={{ color: '#1C1917' }}>{reply.pseudo}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#DCFCE7', color: '#15803D' }}>{reply.size}</span>
                          <span className="text-xs px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#EDE5D8', color: '#78716C' }}>{reply.sector}</span>
                          <span className="text-xs ml-auto" style={{ color: '#A8A29E' }}>il y a {reply.ago}</span>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#44403C' }}>{reply.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href={`${platformUrl}/forum`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all" style={{ backgroundColor: '#16A34A' }}>
              Rejoindre la communauté →
            </a>
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#FFFBF5' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-12" style={{ color: '#1C1917' }}>Comment ça marche — Simple.</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: '①', title: 'Recherchez', desc: 'Un SaaS, une catégorie, une comparaison spécifique.' },
              { n: '②', title: 'Comparez', desc: 'Sur des données vérifiées — prix réels, remises négociées, conditions contractuelles.' },
              { n: '③', title: 'Décidez', desc: 'En confiance, avec les retours de pairs qui ont fait le même achat.' },
            ].map((step) => (
              <div key={step.n} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold mb-4 text-white" style={{ backgroundColor: '#16A34A' }}>
                  {step.n}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ color: '#1C1917' }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#57534E' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ backgroundColor: '#F5F0E8' }} className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: '#1C1917' }}>{t('home.cta.title')}</h2>
          <p className="mb-8" style={{ color: '#57534E' }}>{t('home.cta.subtitle')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={`${platformUrl}/auth/register?redirectTo=/buyer`} target="_blank" rel="nofollow noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-bold text-white shadow-lg"
              style={{ backgroundColor: '#16A34A' }}>
              {t('home.cta.createBuyer')}
            </a>
            <a href={`${platformUrl}/auth/register?redirectTo=/editor`} target="_blank" rel="nofollow noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-lg font-semibold border-2"
              style={{ borderColor: '#1C1917', color: '#1C1917' }}>
              {t('home.cta.createEditor')}
            </a>
          </div>
          <p className="text-sm mt-6" style={{ color: '#78716C' }}>{t('home.cta.free')}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: '#1C1917', color: '#E7E5E4' }} className="border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <NavLogo height={80} className="[filter:brightness(0)_invert(1)]" />
              <span style={{ color: '#A8A29E' }}>{t('footer.copyright')} {new Date().getFullYear()}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-1 text-sm" style={{ color: '#A8A29E' }}>
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

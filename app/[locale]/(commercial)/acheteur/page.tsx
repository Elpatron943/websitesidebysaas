'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { NavLogo } from '@/app/components/NavLogo'
import { getLoginUrl, getSignupUrl } from '@/lib/commercial-auth-links'
import {
  fetchBuyerPricingTiers,
  formatEstimatedSavings,
  formatAnnualBillingDisplay,
  formatPriceDisplay,
  formatRentabilisation,
  getPricingTierForEffectif,
  FALLBACK_PRICING_TIERS,
  type BuyerPricingTierWithSize,
} from '@/lib/buyer-pricing-tiers'
import { getFicheViewsCapLabel } from '@/lib/buyer-fiche-quota'

// Exemple CRM pour la battle card et le sourcing (comparaison + filtrage par fonctionnalités)
const CRM_EXAMPLE: Record<string, { name: string; pricePerUserMonth: number; features: string[] }> = {
  'Nexus CRM': { name: 'Nexus CRM', pricePerUserMonth: 45, features: ['Automation des tâches', 'Reporting & tableaux de bord', 'API & intégrations', 'Support 24/7', 'Gestion du pipeline', 'Email intégré', 'Personnalisation des champs', 'Mobile', 'Gestion des contacts', 'Suivi des activités', 'Tableaux de bord personnalisables', 'Import/Export', 'Historique et audit'] },
  'Ventus Pro': { name: 'Ventus Pro', pricePerUserMonth: 75, features: ['Automation des tâches', 'Reporting & tableaux de bord', 'API & intégrations', 'Support 24/7', 'Gestion du pipeline', 'Email intégré', 'Personnalisation des champs', 'Mobile', 'IA prédictive', 'Gestion des contacts', 'Suivi des activités', 'Gestion des tâches', 'Tableaux de bord personnalisables', 'Import/Export', 'Rôles et permissions', 'Historique et audit'] },
  'Dealflow': { name: 'Dealflow', pricePerUserMonth: 14, features: ['Automation des tâches', 'Reporting & tableaux de bord', 'API & intégrations', 'Gestion du pipeline', 'Email intégré', 'Personnalisation des champs', 'Mobile', 'Gestion des contacts', 'Suivi des activités', 'Import/Export'] },
  'TeamPilot': { name: 'TeamPilot', pricePerUserMonth: 14, features: ['Automation des tâches', 'Reporting & tableaux de bord', 'API & intégrations', 'Support 24/7', 'Gestion du pipeline', 'Email intégré', 'Personnalisation des champs', 'Mobile', 'Gestion des contacts', 'Tableaux de bord personnalisables', 'Rôles et permissions', 'Historique et audit'] },
}
const CRM_IDS = Object.keys(CRM_EXAMPLE)
const ALL_FEATURES = Array.from(new Set(CRM_IDS.flatMap((id) => CRM_EXAMPLE[id].features)))

/** Éditeurs dont les features contiennent toutes les fonctionnalités demandées */
function getEditorsMatchingCriteria(selectedFeatures: Set<string>): string[] {
  if (selectedFeatures.size === 0) return []
  const selected = Array.from(selectedFeatures)
  return CRM_IDS.filter((id) => {
    const editorFeatures = new Set(CRM_EXAMPLE[id].features)
    return selected.every((f) => editorFeatures.has(f))
  })
}

// Ensemble des fonctionnalités CRM pour le sourcing (cases à cocher)
const CRM_FEATURES_SOURCING = [
  'Automation des tâches', 'Reporting & tableaux de bord', 'API & intégrations', 'Support 24/7',
  'Gestion du pipeline', 'Email intégré', 'Personnalisation des champs', 'Mobile', 'IA prédictive',
  'Gestion des contacts', 'Suivi des activités', 'Gestion des tâches', 'Tableaux de bord personnalisables',
  'Import/Export', 'Rôles et permissions', 'Historique et audit',
]

function BattleCardTable({ selectedIds, onBack }: { selectedIds: string[]; onBack: () => void }) {
  const selected = selectedIds.filter((id) => CRM_EXAMPLE[id])
  const bestValueId = selected.length >= 2
    ? selected.reduce((best, id) => {
        const c = CRM_EXAMPLE[id]
        const score = c.features.length / c.pricePerUserMonth
        const bestScore = CRM_EXAMPLE[best] ? CRM_EXAMPLE[best].features.length / CRM_EXAMPLE[best].pricePerUserMonth : 0
        return score > bestScore ? id : best
      }, selected[0])
    : null
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h3 className="text-xl font-bold text-slate-900">Battle Card CRM</h3>
        <button type="button" onClick={onBack} className="text-sm text-primary-600 hover:text-primary-700 font-medium">← Changer la sélection</button>
      </div>
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[600px] text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 font-semibold text-slate-700">Fonctionnalité / Prix</th>
              {selected.map((id) => (
                <th key={id} className={`px-4 py-3 font-semibold text-slate-700 text-center ${bestValueId === id ? 'bg-green-50' : ''}`}>
                  <span className="block">{CRM_EXAMPLE[id].name}</span>
                  {bestValueId === id && <span className="inline-block mt-1 px-2 py-0.5 text-xs font-bold text-green-800 bg-green-200 rounded-full">Meilleure qualité prix</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_FEATURES.map((feature) => (
              <tr key={feature} className="border-b border-slate-100">
                <td className="px-4 py-2.5 text-slate-700">{feature}</td>
                {selected.map((id) => (
                  <td key={id} className={`px-4 py-2.5 text-center ${bestValueId === id ? 'bg-green-50/50' : ''}`}>
                    {CRM_EXAMPLE[id].features.includes(feature) ? <span className="text-green-600 font-medium">✓</span> : <span className="text-slate-300">—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="border-t-2 border-slate-200 bg-slate-50 font-semibold">
              <td className="px-4 py-3 text-slate-700">Prix (€/utilisateur/mois)</td>
              {selected.map((id) => (
                <td key={id} className={`px-4 py-3 text-center ${bestValueId === id ? 'bg-green-50 text-green-800' : 'text-slate-800'}`}>{CRM_EXAMPLE[id].pricePerUserMonth} €</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p className="text-sm text-slate-500 text-center">La meilleure qualité prix est calculée selon le ratio nombre de fonctionnalités / prix.</p>
    </div>
  )
}

export default function AcheteurPage() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = pathname?.startsWith('/en') ? 'en' : 'fr'
  const prefix = `/${locale}`
  const [employees, setEmployees] = useState(50)
  const savingsRatePct = 32
  const [pricingTiers, setPricingTiers] = useState<BuyerPricingTierWithSize[]>([])
  const [pricingLoading, setPricingLoading] = useState(true)
  const [checkoutTierId, setCheckoutTierId] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [user, setUser] = useState<unknown>(null)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [demoForm, setDemoForm] = useState({ name: '', email: '', company: '', employees: '', message: '' })
  const [demoStatus, setDemoStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [demoError, setDemoError] = useState<string | null>(null)
  const [selectedSolutions, setSelectedSolutions] = useState<string[]>([])
  const [showBattleCard, setShowBattleCard] = useState(false)
  const [sourcingFeatures, setSourcingFeatures] = useState<Set<string>>(new Set())
  const [showSourcingResults, setShowSourcingResults] = useState(false)
  const [roiLevier, setRoiLevier] = useState<'efficacite' | 'revenus' | 'evitement' | 'consolidation' | null>(null)
  const [roiUsers, setRoiUsers] = useState(25)
  const [roiCostPerUserMonth, setRoiCostPerUserMonth] = useState(39)
  const [roiHourlyCost, setRoiHourlyCost] = useState(45)
  const [roiHoursSavedPerUserWeek, setRoiHoursSavedPerUserWeek] = useState(2)
  const [roiUpliftPct, setRoiUpliftPct] = useState(3)
  const [roiBaseRevenueMonth, setRoiBaseRevenueMonth] = useState(100000)
  const [roiAvoidedCostYear, setRoiAvoidedCostYear] = useState(50000)
  const [roiCurrentToolsCostYear, setRoiCurrentToolsCostYear] = useState(15000)
  /** Si > 0, coût annuel = ce forfait (sinon = utilisateurs × coût/mois × 12) */
  const [roiFlatCostYear, setRoiFlatCostYear] = useState(0)

  const sourcingMatchingEditors = getEditorsMatchingCriteria(sourcingFeatures)
  const hasSourcingSelection = sourcingFeatures.size > 0

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const handleSolutionClick = (solution: string) => {
    if (selectedSolutions.includes(solution)) setSelectedSolutions(selectedSolutions.filter((s) => s !== solution))
    else if (selectedSolutions.length < 4) setSelectedSolutions([...selectedSolutions, solution])
  }
  const handleLaunchBattle = () => {
    if (selectedSolutions.length < 2) return
    setShowBattleCard(true)
  }
  const toggleSourcingFeature = (feature: string) => {
    setSourcingFeatures((prev) => {
      const next = new Set(prev)
      if (next.has(feature)) next.delete(feature)
      else next.add(feature)
      return next
    })
  }

  const saasTools = employees <= 10 ? 25 : Math.min(152, Math.round(25 + (152 - 25) * (employees - 10) / (1000 - 10)))
  const annualSpend = employees * 4800
  const potentialSavings = annualSpend * (Math.max(0, Math.min(100, savingsRatePct)) / 100)
  const tiersForOffer = pricingTiers.length > 0 ? pricingTiers : FALLBACK_PRICING_TIERS
  const offerForEmployees = getPricingTierForEffectif(tiersForOffer, employees)

  const roiAnnualCost = roiFlatCostYear > 0
    ? Math.max(0, roiFlatCostYear)
    : Math.max(0, roiUsers) * Math.max(0, roiCostPerUserMonth) * 12
  const roiAnnualGain = roiLevier === 'efficacite'
    ? Math.max(0, roiUsers) * Math.max(0, roiHoursSavedPerUserWeek) * Math.max(0, roiHourlyCost) * 52
    : roiLevier === 'revenus'
      ? Math.max(0, roiBaseRevenueMonth) * 12 * (Math.max(0, roiUpliftPct) / 100)
      : roiLevier === 'evitement'
        ? Math.max(0, roiAvoidedCostYear)
        : roiLevier === 'consolidation'
          ? Math.max(0, roiCurrentToolsCostYear)
          : 0
  const roiAnnualNet = roiAnnualGain - roiAnnualCost
  const roiRatio = roiAnnualCost > 0 ? (roiAnnualNet / roiAnnualCost) : null
  const roiPaybackMonths = roiAnnualGain > 0 ? (roiAnnualCost / roiAnnualGain) * 12 : null
  const canShowRoiResult = roiLevier != null && roiAnnualCost > 0

  useEffect(() => {
    let cancelled = false
    async function load() {
      const tiers = await fetchBuyerPricingTiers()
      if (!cancelled) {
        setPricingTiers(tiers)
        setPricingLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Scroll vers #tarifs au chargement si l'URL contient le hash (lien depuis homepage / sous-menu Tarifs)
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.location.hash === '#tarifs') {
      const el = document.getElementById('tarifs')
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [])

  // Site commercial : pas de Supabase ; utilisateur toujours considéré non connecté ici.

  const openDemoModal = () => setShowDemoModal(true)
  const closeDemoModal = () => {
    setShowDemoModal(false)
    setDemoStatus('idle')
    setDemoError(null)
    setDemoForm({ name: '', email: '', company: '', employees: '', message: '' })
  }

  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDemoStatus('sending')
    setDemoError(null)
    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoForm.name.trim(),
          email: demoForm.email.trim(),
          company: demoForm.company.trim() || undefined,
          employees: demoForm.employees.trim() || undefined,
          message: demoForm.message.trim() || undefined,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setDemoError(data.error || 'Erreur lors de l\'envoi.')
        setDemoStatus('error')
        return
      }
      setDemoStatus('success')
    } catch {
      setDemoError('Une erreur est survenue. Réessayez.')
      setDemoStatus('error')
    }
  }

  const handleSubscribe = async (tier: BuyerPricingTierWithSize) => {
    setCheckoutError(null)
    if (!user) {
      const url = getSignupUrl(`${prefix}/acheteur`)
      if (url) window.location.href = url
      return
    }
    if (!tier.stripe_price_id && !(tier.size_tier != null && tier.size_tier.effectif_min <= 1000)) {
      router.push(`${prefix}/contact`)
      return
    }
    setCheckoutTierId(tier.id)
    const stripePriceId = tier.stripe_price_id === 'env_default' ? undefined : tier.stripe_price_id
    const tierEffectifMin = tier.size_tier?.effectif_min
    try {
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileType: 'buyer',
          ...(stripePriceId && { stripePriceId }),
          ...(tierEffectifMin != null && { tierEffectifMin }),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || res.statusText)
      if (data.url) window.location.href = data.url
      else throw new Error('URL de paiement manquante')
    } catch (e) {
      setCheckoutError(e instanceof Error ? e.message : 'Erreur lors de la souscription')
    } finally {
      setCheckoutTierId(null)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between gap-4">
            <Link href={prefix} className="flex items-center">
              <NavLogo height={90} />
            </Link>
            <div className="flex items-center gap-3">
              <Link href={prefix} className="text-slate-600 hover:text-slate-900 font-medium text-sm">
                ← Retour à l&apos;accueil
              </Link>
              {getSignupUrl(`${prefix}/acheteur`) ? (
                <a href={getSignupUrl(`${prefix}/acheteur`)!} className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors">
                  Créer mon compte acheteur
                </a>
              ) : (
                <span className="inline-flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-primary-600 text-white cursor-default">
                  Créer mon compte acheteur
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Intro : à quoi ça sert */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-primary-600 uppercase tracking-wide mb-2">Pour les acheteurs</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Comparez les prix réels, négociez en connaissance de cause
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Side by SaaS vous donne accès aux prix réellement payés par d&apos;autres entreprises, aux comparaisons de fonctionnalités et aux benchmarks. Évitez de surpayer vos logiciels SaaS.
          </p>
          {getSignupUrl(`${prefix}/acheteur`) ? (
            <a href={getSignupUrl(`${prefix}/acheteur`)!} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors shadow-sm">
              Créer mon compte acheteur
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </a>
          ) : (
            <span className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-lg font-semibold bg-primary-600 text-white cursor-default shadow-sm">
              Créer mon compte acheteur
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </span>
          )}
        </div>

        {/* 4 valeurs ajoutées */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl">💰</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Économiser</h3>
            <p className="text-slate-600 text-sm">Prix réellement payés par d&apos;autres entreprises. Négociez en connaissance de cause.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl">⚔️</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Comparer les fonctionnalités</h3>
            <p className="text-slate-600 text-sm">Forces et faiblesses de chaque solution, dans votre contexte.</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl">🔍</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sourcer de nouveaux fournisseurs</h3>
            <p className="text-slate-600 text-sm">Découvrez des alternatives performantes utilisées par des entreprises similaires.</p>
          </div>
          <button type="button" onClick={() => scrollTo('calcul-roi')} className="text-left bg-slate-50 p-6 rounded-xl border border-slate-200 hover:border-orange-200 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4"><span className="text-2xl">🔗</span></div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Calculer le ROI de mon SaaS</h3>
            <p className="text-slate-600 text-sm">Évitez les doublons et optimisez votre stack.</p>
            <p className="text-primary-600 font-medium text-sm mt-3">Tester la simulation →</p>
          </button>
        </div>

        {/* Économiser — Calculateur ROI */}
        <div id="calculateur-economies" className="bg-slate-50 rounded-2xl p-8 md:p-12 mb-16 scroll-mt-24 border-l-4 border-green-500">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0 text-xl">💰</div>
            <span className="text-sm font-semibold uppercase tracking-wide text-green-800">Économiser</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Estimez vos économies potentielles</h2>
          <div className="space-y-8 mb-8">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-4">
                Nombre d&apos;employés : <span className="text-primary-600 font-bold">{employees > 1000 ? '1000+' : employees}</span>
              </label>
              <input
                type="range"
                min="10"
                max="1500"
                value={Math.min(1500, Math.max(10, employees))}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-2"><span>10</span><span>1000+</span></div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Outils SaaS estimés : <span className="text-primary-600 font-bold">{saasTools}</span></label>
              <p className="text-xs text-slate-500">Source : Zylo 2025 — entreprises 1-500 sal. utilisent en moyenne 152 applications SaaS.</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Taux d&apos;économies (négociation) : <span className="text-primary-600 font-bold">{savingsRatePct}%</span>
              </label>
              <p className="text-xs text-slate-500">
                Moyenne des économies obtenues par les organisations qui négocient activement leurs contrats SaaS.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-primary-200">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl md:text-4xl font-bold text-primary-700">{Math.round(potentialSavings / 1000)}k€</span>
              <span className="text-slate-600">d&apos;économies potentielles par an</span>
            </div>
            <p className="text-sm text-slate-500 text-center mt-2">Sur un budget annuel estimé de {Math.round(annualSpend / 1000)}k€ (4 800€/employé/an)</p>
            {offerForEmployees && (
              <div className="mt-6 pt-4 border-t border-slate-200">
                <p className="text-sm font-medium text-slate-700 mb-2">Votre offre ({employees > 1000 ? '1000+' : employees} sal.) : {offerForEmployees.size_tier?.name ?? offerForEmployees.name}</p>
                <p className="text-sm text-slate-600">Prix d&apos;abonnement</p>
                <p className="text-slate-800 font-semibold">{formatPriceDisplay(offerForEmployees.price_per_month_eur, offerForEmployees.price_display_label, !(offerForEmployees.price_per_month_eur != null || (offerForEmployees.price_display_label != null && String(offerForEmployees.price_display_label).trim() !== '')))}</p>
                <p className="text-sm text-slate-600 mt-2">Temps pour rentabiliser</p>
                <p className="text-sm text-primary-700 font-medium">
                  {potentialSavings > 0 && (offerForEmployees.price_per_month_eur != null || offerForEmployees.price_per_year_eur != null)
                    ? formatRentabilisation(offerForEmployees.price_per_month_eur ?? 0, potentialSavings, offerForEmployees.price_per_year_eur)
                    : (offerForEmployees.price_per_month_eur == null && offerForEmployees.price_per_year_eur == null ? 'Sur devis' : '—')}
                </p>
                {(offerForEmployees.stripe_price_id || (offerForEmployees.size_tier && offerForEmployees.size_tier.effectif_min <= 1000)) && (
                  <button
                    type="button"
                    disabled={checkoutTierId === offerForEmployees.id}
                    onClick={() => handleSubscribe(offerForEmployees)}
                    className="mt-3 px-4 py-2 rounded-lg text-sm font-semibold border border-primary-300 bg-primary-50 text-primary-800 hover:bg-primary-100 disabled:opacity-60"
                  >
                    {checkoutTierId === offerForEmployees.id ? 'Redirection…' : 'Souscrire'}
                  </button>
                )}
                {!offerForEmployees.stripe_price_id && (!offerForEmployees.size_tier || (offerForEmployees.size_tier.effectif_min ?? 0) > 1000) && (
                  <button
                    type="button"
                    onClick={openDemoModal}
                    className="mt-3 px-4 py-2 rounded-lg text-sm font-medium bg-primary-600 text-white hover:bg-primary-700"
                  >
                    Sur mesure
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Comparer les fonctionnalités — Battle cards */}
        <div id="battle-cards" className="mb-16 scroll-mt-24 border border-slate-200 rounded-2xl p-8 md:p-10 bg-white">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0 text-xl">⚔️</div>
            <span className="text-sm font-semibold uppercase tracking-wide text-blue-800">Comparer les fonctionnalités</span>
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">Comparez vos solutions en un clic</h2>
            <p className="text-slate-600 mb-2">Sélectionnez jusqu&apos;à 4 solutions SaaS à comparer</p>
            <p className="text-sm text-slate-500">Exemple : CRM</p>
          </div>
          {!showBattleCard ? (
            <>
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                {CRM_IDS.map((solution) => (
                  <button
                    key={solution}
                    type="button"
                    onClick={() => handleSolutionClick(solution)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors border-2 ${
                      selectedSolutions.includes(solution) ? 'bg-primary-600 text-white border-primary-600' : 'bg-white text-slate-700 border-slate-300 hover:border-primary-600 hover:bg-primary-50'
                    }`}
                  >
                    {solution}
                    {selectedSolutions.includes(solution) && ' ✓'}
                  </button>
                ))}
              </div>
              {selectedSolutions.length > 0 && (
                <p className="text-center text-sm text-slate-600 mb-4">
                  {selectedSolutions.length} solution{selectedSolutions.length > 1 ? 's' : ''} sélectionnée{selectedSolutions.length > 1 ? 's' : ''}
                </p>
              )}
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleLaunchBattle}
                  disabled={selectedSolutions.length < 2}
                  className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
                    selectedSolutions.length >= 2 ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Lancer la Battle
                </button>
              </div>
            </>
          ) : (
            <BattleCardTable selectedIds={selectedSolutions} onBack={() => setShowBattleCard(false)} />
          )}
        </div>

        {/* Sourcer de nouveaux fournisseurs */}
        <div id="sourcer" className="bg-slate-50 rounded-2xl p-8 md:p-12 mb-16 scroll-mt-24 border-l-4 border-purple-500">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <span className="text-sm font-semibold uppercase tracking-wide text-purple-800">Sourcer de nouveaux fournisseurs</span>
          </div>
          <div className="flex items-start gap-4 mb-6">
            <div className="hidden sm:block w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">Sourcer de nouveaux fournisseurs</h2>
              <p className="text-slate-600 text-sm">Cochez les fonctionnalités attendues. Les éditeurs couvrant l&apos;ensemble de ces critères s&apos;afficheront sur la page de résultats.</p>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-700 mb-3">Fonctionnalités CRM</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
            {CRM_FEATURES_SOURCING.map((feature) => (
              <label key={feature} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={sourcingFeatures.has(feature)} onChange={() => toggleSourcingFeature(feature)} className="rounded border-slate-300 text-primary-600 focus:ring-primary-600" />
                <span className="text-slate-700 group-hover:text-slate-900">{feature}</span>
              </label>
            ))}
          </div>
          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setShowSourcingResults(true)
                setTimeout(() => document.getElementById('sourcing-resultats')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150)
              }}
              disabled={!hasSourcingSelection}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                hasSourcingSelection ? 'bg-primary-600 text-white hover:bg-primary-700 cursor-pointer' : 'bg-slate-200 text-slate-500 cursor-not-allowed'
              }`}
            >
              Voir les éditeurs qui couvrent ces critères
            </button>
            {!hasSourcingSelection && <p className="text-sm text-slate-500 mt-2">Sélectionnez au moins une fonctionnalité</p>}
          </div>

          {/* Page de résultats : éditeurs couvrant tous les critères */}
          {showSourcingResults && (
            <div id="sourcing-resultats" className="mt-10 pt-8 border-t border-slate-200 scroll-mt-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900">Résultats</h3>
                <button type="button" onClick={() => setShowSourcingResults(false)} className="text-sm text-primary-600 hover:text-primary-700 font-medium">Fermer les résultats</button>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                {sourcingFeatures.size} critère{sourcingFeatures.size > 1 ? 's' : ''} sélectionné{sourcingFeatures.size > 1 ? 's' : ''} — éditeurs couvrant l&apos;ensemble de ces fonctionnalités :
              </p>
              {sourcingMatchingEditors.length === 0 ? (
                <p className="text-slate-500 text-sm py-4">Aucun éditeur ne couvre l&apos;ensemble des critères sélectionnés. Essayez de retirer un ou plusieurs critères.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                  {sourcingMatchingEditors.map((id) => {
                    const ed = CRM_EXAMPLE[id]
                    return (
                      <div key={id} className="bg-white rounded-xl border-2 border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h4 className="font-bold text-slate-900">{ed.name}</h4>
                            <p className="text-primary-600 font-semibold mt-1">{ed.pricePerUserMonth} € <span className="text-slate-500 font-normal text-sm">/ utilisateur / mois</span></p>
                            <p className="text-slate-500 text-xs mt-2">{ed.features.length} fonctionnalités couvertes</p>
                          </div>
                          <span className="shrink-0 px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full">Couvre vos critères</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Calculer le ROI de mon SaaS */}
        <div id="calcul-roi" className="mb-16 scroll-mt-24">
          <div className="bg-slate-50 rounded-2xl border border-slate-200 border-l-4 border-orange-500 p-8 md:p-12 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm font-semibold uppercase tracking-wide text-orange-800">Calculer le ROI de mon SaaS</span>
            </div>

            {/* 1. Levier de valeur (catégorie) */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-slate-900 mb-1">1. Le levier de valeur (la catégorie)</h2>
              <p className="text-slate-600 text-sm mb-4">Choisissez un seul levier principal. On ne calcule pas le ROI de la même façon pour tous.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {[
                  { id: 'efficacite' as const, label: 'Efficacité opérationnelle', desc: 'On gagne du temps sur une tâche existante.' },
                  { id: 'revenus' as const, label: 'Génération de revenus', desc: "L'outil aide directement à vendre plus." },
                  { id: 'evitement' as const, label: 'Évitement de coûts / risques', desc: "L'outil remplace un prestataire ou évite une amende (ex. RGPD, cybersécurité)." },
                  { id: 'consolidation' as const, label: 'Consolidation', desc: "L'outil remplace 3 anciens outils." },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => { setRoiLevier(item.id) }}
                    className={`relative text-left px-5 py-4 rounded-xl border-2 transition-all ${
                      roiLevier === item.id
                        ? 'bg-orange-600 text-white border-orange-700 shadow-lg ring-2 ring-orange-400 ring-offset-2'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-orange-300 hover:bg-orange-50'
                    }`}
                  >
                    {roiLevier === item.id && (
                      <span className="absolute top-2 right-2 rounded-full bg-white/25 px-2 py-0.5 text-xs font-bold uppercase">Sélectionné</span>
                    )}
                    <span className="font-semibold block">{item.label}</span>
                    <span className={`text-sm mt-1 block ${roiLevier === item.id ? 'text-white' : 'text-slate-500'}`}>{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Mesure de gain (KPI) + coût SaaS */}
            <div className="pt-6 border-t border-slate-200">
              <h2 className="text-lg font-bold text-slate-900 mb-1">2. L&apos;unité de mesure de gain (le KPI)</h2>
              <p className="text-slate-600 text-sm mb-6">Quantifiez l&apos;impact avec une unité numérique, puis comparez au coût du SaaS.</p>

              <div className={`grid gap-4 mb-6 ${roiLevier === 'efficacite' ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nombre d&apos;utilisateurs</label>
                  <input type="number" min={0} value={roiUsers} onChange={(e) => setRoiUsers(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                  <p className="text-xs text-slate-500 mt-1">Utilisé pour le coût SaaS (si pas de forfait ci-dessous).</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Coût SaaS (€/utilisateur/mois)</label>
                  <input type="number" min={0} value={roiCostPerUserMonth} onChange={(e) => setRoiCostPerUserMonth(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                  <p className="text-xs text-slate-500 mt-1">Utilisé si vous ne saisissez pas de forfait annuel.</p>
                </div>
                {roiLevier === 'efficacite' && (
                  <div className="bg-white rounded-xl border border-slate-200 p-4">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Coût horaire moyen (€/h)</label>
                    <input type="number" min={0} value={roiHourlyCost} onChange={(e) => setRoiHourlyCost(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                    <p className="text-xs text-slate-500 mt-1">Pour convertir les heures gagnées en gain annuel.</p>
                  </div>
                )}
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-1">Ou coût annuel du SaaS en forfait (€/an)</label>
                <input type="number" min={0} placeholder="0 = calcul à partir des utilisateurs ci-dessus" value={roiFlatCostYear} onChange={(e) => setRoiFlatCostYear(Math.max(0, Number(e.target.value) || 0))} className="w-full max-w-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                <p className="text-xs text-slate-500 mt-1">Si vous saisissez un montant, il est utilisé comme coût annuel (les champs utilisateurs / €/mois sont ignorés pour le coût).</p>
              </div>

              {!roiLevier ? (
                <p className="text-sm text-slate-500">Sélectionnez un levier ci-dessus pour afficher les champs KPI.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-4">
                  {roiLevier === 'efficacite' && (
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-slate-700 font-medium mb-2">Heures gagnées par utilisateur et par semaine</p>
                      <input type="number" min={0} step={0.25} value={roiHoursSavedPerUserWeek} onChange={(e) => setRoiHoursSavedPerUserWeek(Math.max(0, Number(e.target.value) || 0))} className="w-full max-w-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                      <p className="text-xs text-slate-500 mt-1">Exemple : 2 h/semaine</p>
                    </div>
                  )}
                  {roiLevier === 'revenus' && (
                    <>
                      <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <p className="text-slate-700 font-medium mb-2">CA de base (€/mois)</p>
                        <input type="number" min={0} value={roiBaseRevenueMonth} onChange={(e) => setRoiBaseRevenueMonth(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                      </div>
                      <div className="bg-white rounded-xl border border-slate-200 p-4">
                        <p className="text-slate-700 font-medium mb-2">Gain estimé (%)</p>
                        <input type="number" min={0} step={0.1} value={roiUpliftPct} onChange={(e) => setRoiUpliftPct(Math.max(0, Number(e.target.value) || 0))} className="w-full max-w-xs px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                        <p className="text-xs text-slate-500 mt-1">Exemple : +3%</p>
                      </div>
                    </>
                  )}
                  {roiLevier === 'evitement' && (
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-slate-700 font-medium mb-2">Coût évité (€/an)</p>
                      <input type="number" min={0} value={roiAvoidedCostYear} onChange={(e) => setRoiAvoidedCostYear(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                      <p className="text-xs text-slate-500 mt-1">Exemple : 50 000 €/an</p>
                    </div>
                  )}
                  {roiLevier === 'consolidation' && (
                    <div className="bg-white rounded-xl border border-slate-200 p-4">
                      <p className="text-slate-700 font-medium mb-2">Coût actuel des outils remplacés (€/an)</p>
                      <input type="number" min={0} value={roiCurrentToolsCostYear} onChange={(e) => setRoiCurrentToolsCostYear(Math.max(0, Number(e.target.value) || 0))} className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-600 focus:border-transparent" />
                      <p className="text-xs text-slate-500 mt-1">Exemple : 15 000 €/an</p>
                    </div>
                  )}
                </div>
              )}

              {canShowRoiResult && (
                <div className="mt-8 bg-white rounded-2xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h3 className="text-lg font-bold text-slate-900">Résultat</h3>
                    {roiRatio != null && (
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${roiRatio >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        ROI annuel : {(roiRatio * 100).toFixed(0)}%
                      </span>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-500">Gain annuel estimé</p>
                      <p className="text-xl font-bold text-slate-900">{Math.round(roiAnnualGain).toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-500">Coût annuel SaaS</p>
                      <p className="text-xl font-bold text-slate-900">{Math.round(roiAnnualCost).toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-500">Net annuel</p>
                      <p className={`text-xl font-bold ${roiAnnualNet >= 0 ? 'text-green-700' : 'text-red-700'}`}>{Math.round(roiAnnualNet).toLocaleString('fr-FR')} €</p>
                    </div>
                    <div className="rounded-xl border border-slate-200 p-4">
                      <p className="text-xs text-slate-500">Payback</p>
                      <p className="text-xl font-bold text-slate-900">{roiPaybackMonths == null ? '—' : `${roiPaybackMonths.toFixed(1)} mois`}</p>
                    </div>
                    <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-xs text-amber-800 font-medium">Coût de l&apos;inaction</p>
                      <p className="text-xl font-bold text-amber-900">{Math.round(roiAnnualGain).toLocaleString('fr-FR')} €<span className="text-sm font-normal text-amber-700">/an</span></p>
                      <p className="text-xs text-amber-700 mt-1">Sur 3 ans : {Math.round(roiAnnualGain * 3).toLocaleString('fr-FR')} €</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mt-4">
                    <strong>Coût de l&apos;inaction</strong> : ce que vous renoncez à gagner (ou à éviter) chaque année en n&apos;adoptant pas l&apos;outil.
                  </p>
                  <p className="text-xs text-slate-500 mt-2">Estimation indicative : ajustez les hypothèses (utilisateurs, coût, KPI) pour refléter votre contexte.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Grille tarifaire */}
        <div id="tarifs" className="mt-16 scroll-mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Choisissez votre offre</h2>
            <p className="text-slate-600">Gratuit pour démarrer, puis tarifs selon la taille de votre entreprise</p>
          </div>
          {pricingLoading ? (
            <div className="text-center py-12 text-slate-500">Chargement des offres…</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white rounded-xl border-2 border-primary-200 p-6 flex flex-col shadow-sm">
                <div className="mb-4">
                  <span className="inline-block text-xs font-semibold text-primary-600 uppercase mb-1">Pour démarrer</span>
                  <h4 className="text-lg font-bold text-slate-900">Gratuit</h4>
                  <p className="text-2xl font-bold text-slate-900 mt-2">0 €<span className="text-base font-normal text-slate-500"> / mois</span></p>
                  <p className="text-sm text-slate-600 mt-2">Portefeuille, comparaison, 1 fiche par tranche de 5 avis</p>
                </div>
                <ul className="text-sm text-slate-600 space-y-1.5 mb-4">
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Portefeuille et suivi</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span> Comparaison des solutions</li>
                  <li className="flex items-start gap-2"><span className="text-green-600">✓</span> 1 fiche / 5 avis complets</li>
                </ul>
                <div className="mt-auto pt-4">
                  {getSignupUrl(`${prefix}/acheteur`) ? (
                    <a href={getSignupUrl(`${prefix}/acheteur`)!} className="block w-full py-3 px-4 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 text-center transition-colors">
                      Commencer gratuitement
                    </a>
                  ) : (
                    <span className="block w-full py-3 px-4 rounded-lg font-medium bg-primary-600 text-white text-center transition-colors cursor-default">
                      Commencer gratuitement
                    </span>
                  )}
                </div>
              </div>
              {(pricingTiers.length > 0 ? pricingTiers : FALLBACK_PRICING_TIERS).map((tier) => {
                const hasDisplayPrice = tier.price_per_month_eur != null || (tier.price_display_label != null && String(tier.price_display_label).trim() !== '')
                const isSurMesureDisplay = !hasDisplayPrice
                const canResolvePrice = tier.size_tier != null && tier.size_tier.effectif_min <= 1000
                const hasCheckout = !!tier.stripe_price_id || canResolvePrice
                const isCheckoutLoading = checkoutTierId === tier.id
                const priceLabel = formatPriceDisplay(tier.price_per_month_eur, tier.price_display_label, isSurMesureDisplay)
                const { annualLabel, engagementLabel } = formatAnnualBillingDisplay(tier.price_per_year_eur, tier.engagement_label)
                const savingsLabel = formatEstimatedSavings(tier.estimated_savings_min_eur, tier.estimated_savings_max_eur)
                const savingsForRentability = tier.estimated_savings_min_eur ?? tier.estimated_savings_max_eur ?? 0
                const rentabilisationLabel = (tier.price_per_month_eur != null || tier.price_per_year_eur != null) && savingsForRentability > 0
                  ? formatRentabilisation(tier.price_per_month_eur, savingsForRentability, tier.price_per_year_eur)
                  : null
                return (
                  <div key={tier.id} className="bg-white rounded-xl border-2 border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow">
                    <div className="mb-4">
                      <h4 className="text-lg font-bold text-slate-900">{tier.size_tier?.name ?? tier.name}</h4>
                      <p className="text-2xl font-bold text-primary-600 mt-2">{priceLabel}</p>
                      <p className="text-sm text-slate-600 mt-1">{getFicheViewsCapLabel(tier.size_tier?.effectif_min ?? null)}</p>
                      {annualLabel && <p className="text-sm text-slate-700 mt-1">Facturation annuelle : {annualLabel}</p>}
                      {engagementLabel && <p className="text-sm text-slate-500 mt-0.5">{engagementLabel}</p>}
                      {savingsLabel && <p className="text-sm text-slate-600 mt-2">Économies estimées : {savingsLabel}</p>}
                      {rentabilisationLabel && <p className="text-sm text-primary-700 font-medium mt-1">{rentabilisationLabel}</p>}
                    </div>
                    <div className="mt-auto pt-4">
                      {!hasCheckout ? (
                        <button
                          type="button"
                          onClick={openDemoModal}
                          className="w-full py-3 px-4 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 text-center transition-colors"
                        >
                          Sur mesure
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={isCheckoutLoading}
                          onClick={() => handleSubscribe(tier)}
                          className="w-full py-3 px-4 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60 transition-colors"
                        >
                          {isCheckoutLoading ? 'Redirection…' : 'Souscrire'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {checkoutError && <p className="text-center text-red-600 text-sm mt-4">{checkoutError}</p>}
          {!user && (
            <p className="text-center text-slate-500 text-sm mt-4">
              {getSignupUrl(`${prefix}/acheteur`) ? (
                <a href={getSignupUrl(`${prefix}/acheteur`)!} className="text-primary-600 hover:underline font-medium">Créer un compte</a>
              ) : (
                <span className="text-primary-600 font-medium">Créer un compte</span>
              )}{' '}
              pour souscrire en ligne.
            </p>
          )}
        </div>

        {/* CTA inscription */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">Pas encore inscrit ? Commencez gratuitement.</p>
          {getSignupUrl(`${prefix}/acheteur`) ? (
            <a href={getSignupUrl(`${prefix}/acheteur`)!} className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-primary-600 text-white hover:bg-primary-700 transition-colors">
              Créer mon compte acheteur
            </a>
          ) : (
            <span className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-lg font-semibold bg-primary-600 text-white cursor-default">
              Créer mon compte acheteur
            </span>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <Link href={prefix} className="flex items-center gap-2 text-slate-400 hover:text-white">
              <NavLogo height={80} />
              <span>© 2024</span>
            </Link>
            <Link href={prefix} className="text-slate-400 hover:text-white text-sm">Retour à l&apos;accueil</Link>
          </div>
        </div>
      </footer>

      {/* Modal Demande de démo (Sur mesure) */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeDemoModal}>
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900">Demande de démo</h3>
                <button type="button" onClick={closeDemoModal} className="text-slate-400 hover:text-slate-600 p-1" aria-label="Fermer">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <p className="text-slate-600 text-sm mb-6">
                Offre Sur mesure (1001+ salariés). L&apos;équipe commerciale vous recontactera à l&apos;adresse <strong>sales@sidebysaas.com</strong>.
              </p>
              {demoStatus === 'success' ? (
                <div className="text-center py-4">
                  <p className="text-green-700 font-medium">Demande envoyée.</p>
                  <p className="text-slate-600 text-sm mt-1">L&apos;équipe commerciale vous recontactera rapidement.</p>
                  <button type="button" onClick={closeDemoModal} className="mt-4 px-4 py-2 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700">Fermer</button>
                </div>
              ) : (
                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="demo-name" className="block text-sm font-medium text-slate-700 mb-1">Nom complet *</label>
                    <input id="demo-name" type="text" required value={demoForm.name} onChange={(e) => setDemoForm((f) => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" placeholder="Jean Dupont" />
                  </div>
                  <div>
                    <label htmlFor="demo-email" className="block text-sm font-medium text-slate-700 mb-1">Email professionnel *</label>
                    <input id="demo-email" type="email" required value={demoForm.email} onChange={(e) => setDemoForm((f) => ({ ...f, email: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" placeholder="jean@entreprise.com" />
                  </div>
                  <div>
                    <label htmlFor="demo-company" className="block text-sm font-medium text-slate-700 mb-1">Société</label>
                    <input id="demo-company" type="text" value={demoForm.company} onChange={(e) => setDemoForm((f) => ({ ...f, company: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" placeholder="Nom de l'entreprise" />
                  </div>
                  <div>
                    <label htmlFor="demo-employees" className="block text-sm font-medium text-slate-700 mb-1">Effectif (optionnel)</label>
                    <input id="demo-employees" type="text" value={demoForm.employees} onChange={(e) => setDemoForm((f) => ({ ...f, employees: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" placeholder="ex. 1000+" />
                  </div>
                  <div>
                    <label htmlFor="demo-message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea id="demo-message" rows={3} value={demoForm.message} onChange={(e) => setDemoForm((f) => ({ ...f, message: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent" placeholder="Votre demande ou contexte..." />
                  </div>
                  {demoError && <p className="text-red-600 text-sm">{demoError}</p>}
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeDemoModal} className="flex-1 py-2.5 rounded-lg font-medium border border-slate-300 text-slate-700 hover:bg-slate-50">Annuler</button>
                    <button type="submit" disabled={demoStatus === 'sending'} className="flex-1 py-2.5 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60">
                      {demoStatus === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

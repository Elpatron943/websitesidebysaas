export interface CompanySizeTier {
  id: string
  name: string
  effectif_min: number
  effectif_max: number | null
  sort_order: number
}

export interface BuyerPricingTier {
  id: string
  size_tier_id: string
  name: string
  stripe_price_id: string | null
  price_display_label: string | null
  price_per_month_eur: number | null
  price_per_year_eur: number | null
  engagement_label: string | null
  estimated_savings_min_eur: number | null
  estimated_savings_max_eur: number | null
  sort_order: number
  size_tier?: CompanySizeTier
}

export interface BuyerPricingTierWithSize {
  id: string
  size_tier_id: string
  name: string
  stripe_price_id: string | null
  price_display_label: string | null
  price_per_month_eur: number | null
  price_per_year_eur: number | null
  engagement_label: string | null
  estimated_savings_min_eur: number | null
  estimated_savings_max_eur: number | null
  sort_order: number
  size_tier: CompanySizeTier | null
}

/** Données tarifaires statiques (sans Supabase). */
const FALLBACK_SIZE_TIERS: CompanySizeTier[] = [
  { id: 'petite', name: 'Petite (1-50)', effectif_min: 1, effectif_max: 50, sort_order: 1 },
  { id: 'moyenne', name: 'Moyenne (51-250)', effectif_min: 51, effectif_max: 250, sort_order: 2 },
  { id: 'grande', name: 'Grande (251-1000)', effectif_min: 251, effectif_max: 1000, sort_order: 3 },
  { id: 'sur-mesure', name: 'Sur mesure (1001+)', effectif_min: 1001, effectif_max: null, sort_order: 4 },
]

/** Données tarifaires acheteur statiques (sans Supabase). */
export const FALLBACK_PRICING_TIERS: BuyerPricingTierWithSize[] = [
  { id: 'fallback-1', size_tier_id: 'petite', name: 'Tranche 1 - Petite (1-50)', stripe_price_id: 'env_default', price_display_label: '99 €/mois', price_per_month_eur: 99, price_per_year_eur: 1188, engagement_label: 'Engagement 12 mois', estimated_savings_min_eur: 12000, estimated_savings_max_eur: 240000, sort_order: 1, size_tier: FALLBACK_SIZE_TIERS[0] ?? null },
  { id: 'fallback-2', size_tier_id: 'moyenne', name: 'Tranche 2 - Moyenne (51-250)', stripe_price_id: 'env_default', price_display_label: '449 €/mois', price_per_month_eur: 449, price_per_year_eur: 5388, engagement_label: 'Engagement 12 mois', estimated_savings_min_eur: 240000, estimated_savings_max_eur: 1200000, sort_order: 2, size_tier: FALLBACK_SIZE_TIERS[1] ?? null },
  { id: 'fallback-3', size_tier_id: 'grande', name: 'Tranche 3 - Grande (251-1000)', stripe_price_id: 'env_default', price_display_label: '1 290 €/mois', price_per_month_eur: 1290, price_per_year_eur: 15480, engagement_label: 'Engagement 12 mois', estimated_savings_min_eur: 1200000, estimated_savings_max_eur: 4800000, sort_order: 3, size_tier: FALLBACK_SIZE_TIERS[2] ?? null },
  { id: 'fallback-4', size_tier_id: 'sur-mesure', name: 'Sur mesure (1001+)', stripe_price_id: null, price_display_label: null, price_per_month_eur: null, price_per_year_eur: null, engagement_label: null, estimated_savings_min_eur: null, estimated_savings_max_eur: null, sort_order: 4, size_tier: FALLBACK_SIZE_TIERS[3] ?? null },
]

/**
 * Récupère toutes les tranches d'effectif (données statiques, pas de Supabase).
 */
export async function fetchCompanySizeTiers(): Promise<CompanySizeTier[]> {
  return [...FALLBACK_SIZE_TIERS]
}

/**
 * Récupère les prix acheteur par tranche (données statiques, pas de Supabase).
 */
export async function fetchBuyerPricingTiers(): Promise<BuyerPricingTierWithSize[]> {
  return [...FALLBACK_PRICING_TIERS]
}

/**
 * Retourne la tranche d'effectif correspondant à un nombre de salariés.
 * Tranches 1-3 : effectif entre effectif_min et effectif_max.
 * Tranche 4 (sur mesure) : effectif >= 1001 (ou dernière tranche sans plafond).
 */
export function getSizeTierForEffectif(
  tiers: CompanySizeTier[],
  effectif: number
): CompanySizeTier | null {
  if (!Number.isFinite(effectif) || effectif < 0) return null
  for (const tier of tiers) {
    if (effectif < tier.effectif_min) continue
    if (tier.effectif_max == null) return tier // sur mesure
    if (effectif <= tier.effectif_max) return tier
  }
  return null
}

/**
 * Retourne l'offre tarifaire acheteur correspondant à un effectif.
 * Utilise size_tier (effectif_min / effectif_max) de chaque entrée.
 */
export function getPricingTierForEffectif(
  tiers: BuyerPricingTierWithSize[],
  effectif: number
): BuyerPricingTierWithSize | null {
  if (!Number.isFinite(effectif) || effectif < 0 || tiers.length === 0) return null
  for (const tier of tiers) {
    const s = tier.size_tier
    if (!s) continue
    if (effectif < s.effectif_min) continue
    if (s.effectif_max == null) return tier // 1000+
    if (effectif <= s.effectif_max) return tier
  }
  return null
}

/**
 * Formate une fourchette d'économies estimées (€/an) pour l'affichage.
 */
export function formatEstimatedSavings(
  minEur: number | null,
  maxEur: number | null
): string {
  if (minEur == null && maxEur == null) return 'Sur mesure'
  if (minEur != null && maxEur != null) {
    if (minEur >= 1_000_000) {
      return `${(minEur / 1_000_000).toFixed(1)} M€ - ${(maxEur / 1_000_000).toFixed(1)} M€ / an`
    }
    if (maxEur >= 1000) {
      return `${(minEur / 1000).toFixed(0)} k€ - ${(maxEur / 1000).toFixed(0)} k€ / an`
    }
    return `${minEur} € - ${maxEur} € / an`
  }
  if (minEur != null) return `À partir de ${minEur >= 1000 ? `${(minEur / 1000).toFixed(0)} k€` : `${minEur} €`} / an`
  if (maxEur != null) return `Jusqu'à ${maxEur >= 1000 ? `${(maxEur / 1000).toFixed(0)} k€` : `${maxEur} €`} / an`
  return ''
}

/**
 * Formate le prix d'abonnement pour l'affichage (ex. "99 €/mois").
 * Utilise price_per_month_eur si dispo, sinon price_display_label, sinon "Sur mesure".
 */
export function formatPriceDisplay(
  pricePerMonthEur: number | null,
  priceDisplayLabel: string | null,
  isSurMesure: boolean
): string {
  if (isSurMesure) return 'Sur mesure'
  if (pricePerMonthEur != null && Number.isFinite(pricePerMonthEur)) {
    return `${Math.round(pricePerMonthEur)} €/mois`
  }
  return priceDisplayLabel || '—'
}

/**
 * Retourne le libellé pour la facturation annuelle (ex. "990 €/an") et l'engagement si présents.
 */
export function formatAnnualBillingDisplay(
  pricePerYearEur: number | null,
  engagementLabel: string | null
): { annualLabel: string | null; engagementLabel: string | null } {
  const annualLabel = pricePerYearEur != null && Number.isFinite(pricePerYearEur) && pricePerYearEur > 0
    ? `${Math.round(pricePerYearEur)} €/an`
    : null
  const engagement = engagementLabel?.trim() || (annualLabel ? 'Engagement annuel' : null)
  return { annualLabel, engagementLabel: engagement }
}

/**
 * Calcule et formate le temps de rentabilisation : les économies annuelles couvrent le coût de l'abonnement.
 * En cas d'engagement annuel (pricePerYearEur renseigné), utilise ce montant comme coût annuel.
 * Durée en jours = (coût annuel / économies annuelles) × 365 pour rester cohérent avec une base annuelle.
 */
export function formatRentabilisation(
  pricePerMonthEur: number | null,
  annualSavingsEur: number,
  pricePerYearEur?: number | null
): string {
  const annualCost = pricePerYearEur != null && Number.isFinite(pricePerYearEur) && pricePerYearEur > 0
    ? pricePerYearEur
    : pricePerMonthEur != null && Number.isFinite(pricePerMonthEur) && pricePerMonthEur > 0
      ? pricePerMonthEur * 12
      : 0
  if (annualCost <= 0) return ''
  if (!Number.isFinite(annualSavingsEur) || annualSavingsEur <= 0) return ''
  const yearsToBreakEven = annualCost / annualSavingsEur
  if (yearsToBreakEven >= 1) {
    const n = Math.ceil(yearsToBreakEven)
    return n === 1 ? "Rentabilisée en 1 an" : `Rentabilisée en ${n} ans`
  }
  const monthsToBreakEven = yearsToBreakEven * 12
  if (monthsToBreakEven < 1) {
    const days = Math.ceil(yearsToBreakEven * 365)
    if (days <= 0) return "Rentabilisée en moins d'un jour"
    if (days === 1) return "Rentabilisée en 1 jour"
    return `Rentabilisée en ${days} jours`
  }
  const months = Math.ceil(monthsToBreakEven)
  if (months <= 1) return "Rentabilisée en moins d'un mois"
  return `Rentabilisée en ${months} mois`
}

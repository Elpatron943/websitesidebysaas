/**
 * Quota de consultation de fiches SaaS pour le plan gratuit :
 * 1 fiche complète consultable par tranche de 5 avis complets (contributions avec prix + avis fonctionnalités).
 */

import type { BuyerPlanType } from '@/lib/buyer-plan'

export interface FicheQuota {
  plan: BuyerPlanType | null
  completeContributions: number
  allowedViews: number
  usedViews: number
  canView: boolean
  /** Période annuelle (payant) : début, au format ISO */
  periodStart?: string
  /** Période annuelle (payant) : date anniversaire / fin, au format ISO */
  periodEnd?: string
}

/**
 * Détermine si une contribution compte comme "avis complet" (prix + au moins un avis sur les fonctionnalités).
 */
export function isCompleteContribution(contribution: {
  reference_price?: number | string | null
  context?: { feature_ratings?: Record<string, unknown> } | null
}): boolean {
  if (contribution.reference_price == null || Number.isNaN(Number(contribution.reference_price))) return false
  const ratings = contribution.context?.feature_ratings
  if (!ratings || typeof ratings !== 'object') return false
  return Object.keys(ratings).length > 0
}

/** Limite d'avis complets par utilisateur (option 1). */
export const MAX_COMPLETE_CONTRIBUTIONS_PER_USER = 5

/**
 * Nombre de fiches autorisées pour un gratuit : floor(avis_complets / 5).
 */
export function getAllowedFicheViews(completeContributions: number): number {
  return Math.floor(completeContributions / 5)
}

/**
 * Plafond de consultations de fiches par an (période annuelle date anniversaire)
 * pour les abonnés payants, au niveau entreprise, selon la tranche d'effectif.
 * effectif 1-50 = Petite, 51-250 = Moyenne, 251-1000 = Grande, 1001+ = Sur mesure.
 */
export const FICHE_VIEWS_CAP_BY_EFFECTIF: Record<string, number> = {
  petite: 50,    // 1-50 salariés
  moyenne: 150,  // 51-250
  grande: 500,   // 251-1000
  sur_mesure: 999999, // 1001+
}

/**
 * Retourne le plafond de consultations de fiches par an (période anniversaire)
 * pour un abonné payant, en fonction de l'effectif de son entreprise (tranche tarifaire).
 */
export function getMaxFicheViewsForPaidEffectif(effectif: number | null): number {
  const eff = effectif != null && Number.isFinite(effectif) ? effectif : 50
  if (eff <= 50) return FICHE_VIEWS_CAP_BY_EFFECTIF.petite
  if (eff <= 250) return FICHE_VIEWS_CAP_BY_EFFECTIF.moyenne
  if (eff <= 1000) return FICHE_VIEWS_CAP_BY_EFFECTIF.grande
  return FICHE_VIEWS_CAP_BY_EFFECTIF.sur_mesure
}

/**
 * Libellé du plafond de consultations pour l'affichage (ex. pricing landing).
 * effectifMin = effectif_min de la tranche (1, 51, 251, 1001).
 */
export function getFicheViewsCapLabel(effectifMin: number | null): string {
  const cap = getMaxFicheViewsForPaidEffectif(effectifMin ?? 50)
  if (cap >= 999999) return 'Consultations illimitées'
  return `${cap} consultations de fiches / an`
}

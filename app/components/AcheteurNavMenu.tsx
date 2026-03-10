'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type AcheteurNavMenuProps = {
  /** 'link' = use Next Link (app/page, SiteHeader), 'router' = use router.push (commercial page) */
  linkStyle?: 'link' | 'router'
  onNavigate?: () => void
  /** Quand false, le sous-menu ouvert est réinitialisé */
  isOpen?: boolean
  /** 'dropdown' = position absolue (desktop), 'inline' = dans le flux (menu mobile) */
  variant?: 'dropdown' | 'inline'
  /** Préfixe pour les liens (ex: /fr, /en) */
  localePrefix?: string
}

const DIRECTIONS = [
  { path: 'achats', label: 'Achats' },
  { path: 'finance', label: 'Finance' },
  { path: 'marketing', label: 'Marketing' },
  { path: 'direction', label: 'Direction' },
  { path: 'rh', label: 'RH' },
  { path: 'it', label: 'IT / DSI' },
  { path: 'juridique', label: 'Juridique' },
  { path: 'operations', label: 'Opérations' },
] as const

const SECTEURS = [
  { path: 'education', label: 'Éducation' },
  { path: 'technologie', label: 'Technologie' },
  { path: 'industrie', label: 'Industrie' },
  { path: 'commerce-retail', label: 'Commerce & Retail' },
  { path: 'secteur-public', label: 'Secteur public' },
  { path: 'services-professionnels', label: 'Services professionnels' },
  { path: 'immobilier', label: 'Immobilier' },
  { path: 'btp-construction', label: 'BTP & Construction' },
  { path: 'finance', label: 'Finance' },
  { path: 'sante', label: 'Santé' },
  { path: 'telecoms', label: 'Telecoms' },
  { path: 'tourisme-hotellerie', label: 'Tourisme & Hôtellerie' },
  { path: 'logistique-supply-chain', label: 'Logistique & Supply Chain' },
  { path: 'medias-communication', label: 'Médias & Communication' },
  { path: 'industrie-agroalimentaire', label: 'Industrie agroalimentaire' },
  { path: 'energie-utilities', label: 'Énergie & Utilities' },
] as const

const PLATFORM_URL = process.env.NEXT_PUBLIC_PLATFORM_URL || 'https://app.sidebysaas.com'

export function AcheteurNavMenu({ linkStyle = 'link', onNavigate, isOpen = true, variant = 'dropdown', localePrefix = '' }: AcheteurNavMenuProps) {
  const router = useRouter()
  const platformUrl = PLATFORM_URL
  const [expanded, setExpanded] = useState<'directions' | 'secteurs' | null>(null)
  const p = (path: string) => `${localePrefix}${path}`

  useEffect(() => {
    if (!isOpen) setExpanded(null)
  }, [isOpen])

  const nav = (href: string) => {
    onNavigate?.()
    if (linkStyle === 'router') router.push(href)
  }

  const itemClass = 'block w-full text-left px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium'
  const itemClassBlue = 'block w-full text-left px-4 py-2.5 text-primary-600 hover:bg-primary-50 font-semibold'
  const subItemClass = 'block w-full text-left pl-5 pr-4 py-2 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium'

  const wrapperClass = variant === 'inline'
    ? 'w-full py-2 border-b border-slate-100'
    : 'absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50 max-h-[85vh] overflow-y-auto'

  return (
    <div className={wrapperClass}>
      {/* Niveau 1 : sous-menus regroupés */}
      {linkStyle === 'link' ? (
        <Link href={p('/acheteur#tarifs')} className={`${itemClassBlue} border-b border-slate-100`} onClick={onNavigate}>Tarifs</Link>
      ) : (
        <button type="button" onClick={() => { nav(p('/acheteur#tarifs')); }} className={`${itemClassBlue} border-b border-slate-100 w-full`}>Tarifs</button>
      )}

      <div className="border-b border-slate-100">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded(expanded === 'directions' ? null : 'directions'); }}
          className="flex items-center justify-between w-full px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
        >
          <span>Par directions</span>
          <svg className={`w-4 h-4 transition-transform ${expanded === 'directions' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {expanded === 'directions' && (
          <div className="pb-2">
            {DIRECTIONS.map(({ path, label }) =>
              linkStyle === 'link' ? (
                <Link key={path} href={p(`/acheteur/directions/${path}`)} className={subItemClass} onClick={onNavigate}>{label}</Link>
              ) : (
                <button key={path} type="button" onClick={() => nav(p(`/acheteur/directions/${path}`))} className={subItemClass}>{label}</button>
              )
            )}
          </div>
        )}
      </div>

      <div className="border-b border-slate-100">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setExpanded(expanded === 'secteurs' ? null : 'secteurs'); }}
          className="flex items-center justify-between w-full px-4 py-2.5 text-slate-700 hover:bg-primary-50 hover:text-primary-700 font-medium"
        >
          <span>Par secteur d&apos;activité</span>
          <svg className={`w-4 h-4 transition-transform ${expanded === 'secteurs' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {expanded === 'secteurs' && (
          <div className="pb-2 max-h-[50vh] overflow-y-auto">
            {SECTEURS.map(({ path, label }) =>
              linkStyle === 'link' ? (
                <Link key={path} href={p(`/acheteur/secteurs/${path}`)} className={subItemClass} onClick={onNavigate}>{label}</Link>
              ) : (
                <button key={path} type="button" onClick={() => nav(p(`/acheteur/secteurs/${path}`))} className={subItemClass}>{label}</button>
              )
            )}
          </div>
        )}
      </div>

      <div className="pt-2">
        {linkStyle === 'link' ? (
          <Link href={p('/acheteur#calculateur-economies')} className={itemClass} onClick={onNavigate}>Par taille d&apos;entreprise</Link>
        ) : (
          <button type="button" onClick={() => nav(p('/acheteur#calculateur-economies'))} className={itemClass}>Par taille d&apos;entreprise</button>
        )}
      </div>

      <div className="border-t border-slate-100 mt-2 pt-2">
        <a
          href={`${platformUrl}/auth/register?redirectTo=/buyer`}
          target="_blank"
          rel="nofollow noopener noreferrer"
          onClick={onNavigate}
          className={itemClassBlue}
        >
          Je crée mon espace acheteur →
        </a>
      </div>
    </div>
  )
}

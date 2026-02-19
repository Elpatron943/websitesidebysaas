'use client'

import { useState } from 'react'
import Image from 'next/image'

const FALLBACK = (
  <span className="font-bold text-xl text-slate-900">Side by SaaS</span>
)

type NavLogoProps = {
  className?: string
  /** Hauteur du logo en pixels (la largeur suit la proportion de l'image). */
  height?: number
}

export function NavLogo({ className = '', height = 40 }: NavLogoProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return <span className={className}>{FALLBACK}</span>
  }

  return (
    <span className={`relative block shrink-0 ${className}`} style={{ height, width: height }}>
      <Image
        src="/logo/navicon.png"
        alt="Side by SaaS"
        fill
        className="object-contain object-left"
        onError={() => setFailed(true)}
        unoptimized
        sizes="200px"
      />
    </span>
  )
}

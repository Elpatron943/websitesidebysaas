/**
 * Liens de connexion et d'inscription pour le site commercial.
 * Tant que NEXT_PUBLIC_LOGIN_URL et NEXT_PUBLIC_SIGNUP_URL ne sont pas définis,
 * les CTA restent visibles mais ne pointent nulle part.
 */

function appendRedirect(base: string, redirectTo?: string): string {
  if (!redirectTo) return base
  const sep = base.includes('?') ? '&' : '?'
  return `${base}${sep}redirectTo=${encodeURIComponent(redirectTo)}`
}

export function getLoginUrl(redirectTo?: string): string | null {
  const base = process.env.NEXT_PUBLIC_LOGIN_URL
  if (!base || base.trim() === '') return null
  return appendRedirect(base.trim(), redirectTo)
}

export function getSignupUrl(redirectTo?: string): string | null {
  const base = process.env.NEXT_PUBLIC_SIGNUP_URL
  if (!base || base.trim() === '') return null
  return appendRedirect(base.trim(), redirectTo)
}

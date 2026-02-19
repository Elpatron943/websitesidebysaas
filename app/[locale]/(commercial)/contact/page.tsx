'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SiteHeader } from '@/app/components/SiteHeader'
import { useLocale, useTranslations } from '@/app/components/LocaleProvider'

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function Contact() {
  const t = useTranslations()
  const locale = useLocale()
  const prefix = `/${locale}`
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), message: message.trim() }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || t('contact.errorSend'))
        setStatus('error')
        return
      }
      setStatus('success')
      setEmail('')
      setMessage('')
    } catch {
      setError(t('contact.errorGeneric'))
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <SiteHeader />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">{t('contact.title')}</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-slate-600 mb-6">{t('contact.intro')}</p>

          {status === 'success' ? (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800 mb-6">
              <p className="font-medium">{t('contact.successTitle')}</p>
              <p className="text-sm mt-1">{t('contact.successBody')}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('contact.email')}
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder={t('contact.emailPlaceholder')}
                  disabled={status === 'sending'}
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-700 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  id="contact-message"
                  rows={6}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder={t('contact.messagePlaceholder')}
                  disabled={status === 'sending'}
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? t('common.loading') : t('common.send')}
              </button>
            </form>
          )}

          <div className="mt-6">
            <Link href={prefix} className="text-primary-600 hover:text-primary-700 font-medium">
              ← {t('common.backToHome')}
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

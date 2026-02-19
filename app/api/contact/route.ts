import { NextRequest } from 'next/server'
import { Resend } from 'resend'

const TO_EMAIL = 'sales@sidebysaas.com'
const FROM_EMAIL = process.env.RESEND_FROM ?? 'Contact Site <onboarding@resend.dev>'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = typeof body.email === 'string' ? body.email.trim() : ''
    const message = typeof body.message === 'string' ? body.message.trim() : ''

    if (!email || !message) {
      return Response.json(
        { error: 'Email et message sont requis.' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set')
      return Response.json(
        { error: 'Configuration email manquante.' },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `[Side by SaaS] Contact depuis le site — ${email}`,
      html: `
        <p><strong>Email du visiteur :</strong> ${escapeHtml(email)}</p>
        <p><strong>Message :</strong></p>
        <pre style="white-space: pre-wrap; font-family: inherit;">${escapeHtml(message)}</pre>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return Response.json(
        { error: error.message || 'Erreur lors de l\'envoi.' },
        { status: 500 }
      )
    }

    return Response.json({ success: true, id: data?.id })
  } catch (e) {
    console.error('Contact API error:', e)
    return Response.json(
      { error: 'Une erreur est survenue. Réessayez.' },
      { status: 500 }
    )
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

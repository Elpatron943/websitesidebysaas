import { NextResponse } from 'next/server'

const TELEGRAM_BOT_TOKEN = '8606405924:AAGg4E_6VpI11QraERL238v-hkmYcuhcsZA'
const TELEGRAM_CHAT_ID = '1559038390'
const WEBHOOK_SECRET = process.env.SUPABASE_WEBHOOK_SECRET ?? 'sidebysaas-webhook-secret'

async function sendTelegram(text: string) {
  await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: TELEGRAM_CHAT_ID,
      text,
      parse_mode: 'HTML',
    }),
  })
}

export async function POST(req: Request) {
  // Validate secret
  const secret = req.headers.get('x-webhook-secret')
  if (secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()

  // Supabase webhook payload: { type, table, schema, record, old_record }
  const record = body.record
  if (!record) return NextResponse.json({ ok: true })

  // Only act on arbitration_items approved
  if (body.table !== 'arbitration_items') return NextResponse.json({ ok: true })
  if (record.status !== 'approved') return NextResponse.json({ ok: true })

  const title = record.title ?? 'Sans titre'
  const decision = record.decision ?? ''

  const message = [
    `✅ <b>Arbitrage approuvé</b>`,
    ``,
    `📋 <b>${title}</b>`,
    decision ? `💬 Note : ${decision}` : '',
    ``,
    `GerardPhong va lancer le développement immédiatement.`,
  ]
    .filter(Boolean)
    .join('\n')

  await sendTelegram(message)

  return NextResponse.json({ ok: true })
}

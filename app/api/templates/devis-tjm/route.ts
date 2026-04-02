import { NextResponse } from 'next/server'
import ExcelJS from 'exceljs'

export const runtime = 'nodejs'

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

export async function GET() {
  const wb = new ExcelJS.Workbook()
  wb.creator = 'Side by SaaS'
  wb.created = new Date()

  const ws = wb.addWorksheet('Devis TJM')

  ws.columns = [
    { header: 'Champ', key: 'field', width: 34 },
    { header: 'Valeur', key: 'value', width: 22 },
    { header: 'Notes', key: 'notes', width: 60 },
  ]

  ws.getRow(1).font = { bold: true }
  ws.getRow(1).alignment = { vertical: 'middle' }
  ws.getRow(1).height = 22
  ws.views = [{ state: 'frozen', ySplit: 1 }]

  const rows: Array<[string, string | number, string]> = [
    ['Client', '', 'Optionnel'],
    ['Objet / mission', '', 'Optionnel'],
    ['Date du devis', new Date().toISOString().slice(0, 10), 'Format AAAA-MM-JJ'],
    ['Durée (jours)', 10, 'Nombre de jours vendus'],
    ['TJM (€/jour) – HT', 900, 'Taux journalier HT'],
    ['Remise (%)', 0, '0 à 100'],
    ['Frais (HT)', 0, 'Déplacements, achats refacturables…'],
    ['TVA (%)', 20, '0 à 100'],
    ['Acompte (%)', 30, 'Pour calculer un acompte (optionnel)'],
    ['Conditions de paiement (jours)', 30, 'Optionnel'],
  ]

  for (const [field, value, notes] of rows) ws.addRow({ field, value, notes })

  ws.addRow([])
  const kpiStart = ws.lastRow?.number ?? 1

  const addKpi = (label: string, formula: string, numFmt: string, notes: string) => {
    const r = ws.addRow({ field: label, value: '', notes })
    const cell = r.getCell(2)
    cell.value = { formula }
    cell.numFmt = numFmt
    r.font = { bold: true }
    r.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8FAFC' },
    }
    return r.number
  }

  // Inputs (fixed positions from our insert order above)
  const daysRow = 5
  const tjmRow = 6
  const discountRow = 7
  const feesRow = 8
  const vatRow = 9
  const depositRow = 10

  const netServicesRow = addKpi(
    'Total prestations (HT) après remise',
    `B${daysRow}*B${tjmRow}*(1-(B${discountRow}/100))`,
    '#,##0.00',
    'Jours × TJM × (1 - remise)'
  )
  const totalHtRow = addKpi('Total (HT)', `B${netServicesRow}+B${feesRow}`, '#,##0.00', 'Prestations + frais')
  const vatAmountRow = addKpi('TVA (€)', `B${totalHtRow}*(B${vatRow}/100)`, '#,##0.00', 'Total HT × TVA')
  const totalTtcRow = addKpi('Total (TTC)', `B${totalHtRow}+B${vatAmountRow}`, '#,##0.00', 'Total HT + TVA')
  const depositAmountRow = addKpi(
    'Acompte (€)',
    `B${totalTtcRow}*(B${depositRow}/100)`,
    '#,##0.00',
    'Total TTC × acompte (si applicable)'
  )

  // Data validation
  const pctCells = [
    ws.getRow(discountRow).getCell(2),
    ws.getRow(vatRow).getCell(2),
    ws.getRow(depositRow).getCell(2),
  ]
  for (const c of pctCells) {
    c.dataValidation = {
      type: 'whole',
      operator: 'between',
      showErrorMessage: true,
      allowBlank: false,
      formulae: [0, 100],
      errorTitle: 'Valeur invalide',
      error: 'La valeur doit être comprise entre 0 et 100.',
    }
    c.value = clamp(Number(c.value ?? 0), 0, 100)
  }

  // Light spacing / note
  ws.getCell('A1').note = 'Renseignez les champs dans la colonne Valeur.'
  ws.getRow(kpiStart).height = 6

  const buf = await wb.xlsx.writeBuffer()

  return new NextResponse(buf as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="modele-devis-tjm.xlsx"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}


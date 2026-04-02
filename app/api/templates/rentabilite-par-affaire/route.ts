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

  const ws = wb.addWorksheet('Rentabilité par affaire')

  ws.columns = [
    { header: 'Champ', key: 'field', width: 34 },
    { header: 'Valeur', key: 'value', width: 22 },
    { header: 'Notes', key: 'notes', width: 60 },
  ]

  ws.getRow(1).font = { bold: true }
  ws.getRow(1).alignment = { vertical: 'middle' }
  ws.getRow(1).height = 22

  const rows: Array<[string, string | number, string]> = [
    ['Nom de l’affaire', '', 'Optionnel (pour suivre plusieurs affaires)'],
    ['Montant (CA) – HT', 10000, 'Montant facturé sur l’affaire'],
    ['Coûts directs (externes) – HT', 0, 'Sous-traitance, achats, licences projet, frais variables…'],
    ['Temps vendu (jours)', 10, 'Jours facturés / vendus'],
    ['Temps consommé (jours)', 12, 'Jours réellement passés (delivery)'],
    ['TJM (€/jour)', 1000, 'Taux jour moyen'],
    ['Coût interne (€/jour)', 500, 'Coût complet moyen (chargé) par jour'],
    ['Probabilité de gagner (%)', 60, 'Pour calculer une valeur attendue (pipeline)'],
  ]

  for (const [field, value, notes] of rows) ws.addRow({ field, value, notes })

  ws.addRow([])
  const start = ws.lastRow?.number ?? 1

  const addKpi = (label: string, formula: string, notes: string) => {
    const r = ws.addRow({ field: label, value: '', notes })
    const cell = r.getCell(2)
    cell.value = { formula }
    cell.numFmt = '#,##0.00'
    return r.number
  }

  // Inputs (row numbers are fixed by our insert order above)
  const caRow = 3
  const directCostRow = 4
  const soldDaysRow = 5
  const consumedDaysRow = 6
  const tjmRow = 7
  const internalCostRow = 8
  const winProbRow = 9

  addKpi('CA (recalculé)', `B${soldDaysRow}*B${tjmRow}`, 'Temps vendu × TJM (si vous utilisez cette méthode)')
  addKpi('Coûts internes', `B${consumedDaysRow}*B${internalCostRow}`, 'Temps consommé × coût interne/jour')
  addKpi('Marge brute (€)', `B${caRow}-B${directCostRow}-(B${consumedDaysRow}*B${internalCostRow})`, 'CA – coûts directs – coûts internes')
  const marginPctRow = addKpi('Marge brute (%)', `(B${caRow}-B${directCostRow}-(B${consumedDaysRow}*B${internalCostRow}))/B${caRow}`, 'Marge brute / CA')
  ws.getRow(marginPctRow).getCell(2).numFmt = '0.00%'

  addKpi('Écart jours (consommé - vendu)', `B${consumedDaysRow}-B${soldDaysRow}`, 'Dérive planning simple')
  const expectedValueRow = addKpi('Valeur attendue (marge) (€)', `(B${caRow}-B${directCostRow}-(B${consumedDaysRow}*B${internalCostRow}))*(B${winProbRow}/100)`, 'Marge × probabilité de gagner')
  ws.getRow(expectedValueRow).getCell(2).numFmt = '#,##0.00'

  // Styling for KPI block
  for (let r = start + 1; r <= (ws.lastRow?.number ?? start); r++) {
    ws.getRow(r).font = { bold: true }
    ws.getRow(r).getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFF8FAFC' },
    }
  }

  // Data validation
  const probCell = ws.getRow(winProbRow).getCell(2)
  probCell.dataValidation = {
    type: 'whole',
    operator: 'between',
    showErrorMessage: true,
    allowBlank: false,
    formulae: [0, 100],
    errorTitle: 'Valeur invalide',
    error: 'La probabilité doit être comprise entre 0 et 100.',
  }
  probCell.value = clamp(Number(probCell.value ?? 60), 0, 100)

  ws.views = [{ state: 'frozen', ySplit: 1 }]
  ws.getCell('A1').note = 'Renseignez les champs dans la colonne Valeur.'

  const buf = await wb.xlsx.writeBuffer()

  return new NextResponse(buf as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="modele-rentabilite-par-affaire.xlsx"',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}


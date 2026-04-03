const REPLACEMENTS: ReadonlyArray<readonly [from: string, to: string]> = [
  // Common punctuation / symbols mojibake
  ['ÔÇª', '…'],
  ['ÔÇö', '—'],
  ['ÔÇô', '–'],
  ['Ôé¼', '€'],
  ['ÔåÆ', '→'],

  // CP850/UTF-8 mojibake commonly seen in FR content
  ['├Ç', 'À'],
  ['├ç', 'Ç'],
  ['├ë', 'É'],
  ['├á', 'à'],
  ['├®', 'é'],
  ['├¿', 'è'],
  ['├¬', 'ê'],
  ['├º', 'ç'],
  ['├«', 'î'],
  ['├ó', 'â'],
  ['├┤', 'ô'],
  ['├╗', 'û'],
  ['├╣', 'ù'],
  // UTF-8 œ (ligature) misread as two chars (e.g. c┼ôur → cœur)
  ['┼ô', 'œ'],
]

export function fixMojibake(input: string): string {
  let out = input
  for (const [from, to] of REPLACEMENTS) out = out.split(from).join(to)
  return out
}


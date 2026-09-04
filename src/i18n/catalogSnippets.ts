import { destylizeDashes, foldCopy, getLocale, isEnglish, translate } from '@/i18n'
import { READING_CHAPTERS } from '@/pages/readings/chapters'
import { READING_PACK, STATIC_DAILY_NOTE } from '@/pages/readings/readingCatalog'
import { PEOPLE_REPORT_META, PEOPLE_REPORT_SECTIONS } from '@/pages/people/reportContent'

export type CatalogSnippet = {
  fold: string
  key: string
  english: string
}

function fold(value: string) {
  return foldCopy(value).toLowerCase()
}

let snippetCache: CatalogSnippet[] | null = null

function add(out: CatalogSnippet[], english: string, key: string) {
  const folded = fold(english)
  if (!folded) return
  out.push({ fold: folded, key, english })
}

export function catalogSnippets(): CatalogSnippet[] {
  if (snippetCache) return snippetCache

  const out: CatalogSnippet[] = []

  for (const pack of READING_PACK) {
    add(out, pack.title, `readings.chapters.${pack.id}.title`)
    add(out, pack.blurb, `readings.chapters.${pack.id}.blurb`)
    for (const section of pack.sections) {
      add(out, section.title, `readings.content.${pack.id}.s${section.n}.title`)
      section.paragraphs.forEach((paragraph, i) => {
        add(out, paragraph, `readings.content.${pack.id}.s${section.n}.p${i + 1}`)
      })
    }
  }

  add(out, STATIC_DAILY_NOTE.headline, 'home.note.headline')
  add(out, STATIC_DAILY_NOTE.sub, 'home.note.sub')
  add(
    out,
    'You move fastest right after you decide — and slowest while you look for permission.',
    'home.note.headline',
  )
  add(
    out,
    'You move fastest right after you decide — and slowest while you look for permission',
    'home.note.headline',
  )

  add(out, PEOPLE_REPORT_META.shareQuote, 'people.report.meta.shareQuote')
  add(out, PEOPLE_REPORT_META.subtitle, 'people.report.meta.subtitle')
  add(out, PEOPLE_REPORT_META.closingTitle, 'people.report.meta.closingTitle')
  add(out, PEOPLE_REPORT_META.closingBody, 'people.report.meta.closingBody')
  for (const section of PEOPLE_REPORT_SECTIONS) {
    add(out, section.title, `people.report.sections.${section.n}.title`)
    section.paragraphs.forEach((paragraph, i) => {
      add(out, paragraph, `people.report.sections.${section.n}.p${i + 1}`)
    })
  }

  snippetCache = out.sort((a, b) => b.fold.length - a.fold.length)
  return snippetCache
}

/** Translate stored English catalog copy, including joined paragraphs and dash variants. */
export function localizeCatalogQuote(quote: string): string {
  const locale = getLocale()
  if (isEnglish(locale) || !quote.trim()) return quote

  const snippets = catalogSnippets()
  let rest = fold(quote)
  const parts: string[] = []

  while (rest.length) {
    rest = rest.replace(/^[\s“”"'.,;:!?-]+/, '')
    if (!rest) break
    const hit = snippets.find((snippet) => rest.startsWith(snippet.fold))
    if (!hit) break
    parts.push(translate(locale, hit.key, hit.english))
    rest = rest.slice(hit.fold.length)
  }

  const localized = parts.length ? parts.join(' ') : quote
  return destylizeDashes(localized)
}

export function localizeInsightSource(source: string): string {
  const locale = getLocale()
  if (isEnglish(locale) || !source.trim()) return source

  const folded = fold(source)
  if (folded === fold("Today's note") || folded === fold('Today’s note')) {
    return translate(locale, 'home.note.sourceDaily', source)
  }
  if (folded === fold('Mentor')) {
    return translate(locale, 'agent.actions.sourceMentor', source)
  }
  if (folded === fold('Insight')) {
    return translate(locale, 'insights.fallbackSource', source)
  }

  const chapter = READING_CHAPTERS.find((row) => fold(row.title) === folded)
  if (chapter) {
    return translate(locale, `readings.chapters.${chapter.id}.title`, source)
  }
  return source
}

export function localizeInsightDate(savedAt: string): string {
  const locale = getLocale()
  if (isEnglish(locale) || !savedAt.trim()) return savedAt
  const parsed = Date.parse(`${savedAt}, 2026`)
  if (Number.isNaN(parsed)) return savedAt
  return new Date(parsed).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric' })
}

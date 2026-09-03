import { supabase } from '@/integrations/supabase/client'
import type { ReadingChapter, ReadingChapterId } from './chapters'
import {
  READING_PACK,
  STATIC_DAILY_NOTE,
  countWords,
  packById,
  type ChapterPack,
} from './readingCatalog'

export type ChapterProgressRow = {
  id: string
  chapter_id: ReadingChapterId
  sort_order: number
  word_count: number
  read_time_min: number
  opened_at: string | null
  completed_at: string | null
  scroll_pct: number
  last_section_n: number
  content: ChapterPack
}

export type ReadingProgress = {
  chaptersTotal: number
  chaptersRead: number
  wordsTotal: number
  wordsRead: number
  /** 0–100, includes in-progress chapters (scroll), not only completed. */
  overallPct: number
  continueChapterId: ReadingChapterId
}

function asChapterId(raw: string): ReadingChapterId | null {
  return READING_PACK.some((p) => p.id === raw) ? (raw as ReadingChapterId) : null
}

function parseContent(raw: unknown, fallbackId: ReadingChapterId): ChapterPack {
  const catalog = packById(fallbackId)
  if (!raw || typeof raw !== 'object') {
    return catalog ?? READING_PACK[0]
  }
  const row = raw as Record<string, unknown>
  const sections = Array.isArray(row.sections) ? row.sections : []
  const parsed = sections
    .map((item, i) => {
      if (!item || typeof item !== 'object') return null
      const s = item as Record<string, unknown>
      const title = typeof s.title === 'string' ? s.title : ''
      const paragraphs = Array.isArray(s.paragraphs)
        ? s.paragraphs.filter((p): p is string => typeof p === 'string')
        : []
      if (!title || !paragraphs.length) return null
      return {
        n: typeof s.n === 'number' ? s.n : i + 1,
        title,
        paragraphs,
      }
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  if (!parsed.length && catalog) return catalog

  return {
    id: fallbackId,
    title: typeof row.title === 'string' ? row.title : catalog?.title ?? fallbackId,
    blurb: typeof row.blurb === 'string' ? row.blurb : catalog?.blurb ?? '',
    readTimeMin:
      typeof row.readTimeMin === 'number' ? row.readTimeMin : catalog?.readTimeMin ?? 6,
    sections: parsed.length ? parsed : catalog?.sections ?? [],
  }
}

function mapRow(row: Record<string, unknown>): ChapterProgressRow | null {
  const chapterId = typeof row.chapter_id === 'string' ? asChapterId(row.chapter_id) : null
  if (!chapterId) return null
  return {
    id: String(row.id),
    chapter_id: chapterId,
    sort_order: typeof row.sort_order === 'number' ? row.sort_order : 0,
    word_count: typeof row.word_count === 'number' ? row.word_count : 0,
    read_time_min: typeof row.read_time_min === 'number' ? row.read_time_min : 6,
    opened_at: typeof row.opened_at === 'string' ? row.opened_at : null,
    completed_at: typeof row.completed_at === 'string' ? row.completed_at : null,
    scroll_pct: typeof row.scroll_pct === 'number' ? row.scroll_pct : 0,
    last_section_n: typeof row.last_section_n === 'number' ? row.last_section_n : 0,
    content: parseContent(row.content, chapterId),
  }
}

function chapterViewPct(row: ChapterProgressRow) {
  if (row.completed_at) return 100
  return Math.min(100, Math.max(0, row.scroll_pct))
}

export function summarizeProgress(rows: ChapterProgressRow[]): ReadingProgress {
  const ordered = [...rows].sort((a, b) => a.sort_order - b.sort_order)
  const chaptersRead = ordered.filter((r) => r.completed_at).length
  const wordsTotal = ordered.reduce((n, r) => n + r.word_count, 0)
  const wordsRead = ordered.reduce((n, r) => {
    return n + Math.round((r.word_count * chapterViewPct(r)) / 100)
  }, 0)
  const overallPct = ordered.length
    ? Math.round(ordered.reduce((n, r) => n + chapterViewPct(r), 0) / ordered.length)
    : 0
  const continueRow =
    ordered.find((r) => !r.completed_at) ?? ordered[ordered.length - 1] ?? null
  return {
    chaptersTotal: ordered.length || READING_PACK.length,
    chaptersRead,
    wordsTotal,
    wordsRead,
    overallPct,
    continueChapterId: continueRow?.chapter_id ?? 'core-self',
  }
}

export function toListChapter(row: ChapterProgressRow): ReadingChapter {
  const sectionTotal = Math.max(1, row.content.sections.length)
  const read = Boolean(row.completed_at)
  const viewPct = chapterViewPct(row)
  let meta: string | undefined
  if (!read) {
    const fromScroll = Math.max(1, Math.round((viewPct / 100) * sectionTotal))
    const started = Boolean(row.opened_at) || viewPct > 0
    const sectionN = row.last_section_n > 0
      ? Math.min(row.last_section_n, sectionTotal)
      : started
        ? fromScroll
        : 0
    if (started) {
      meta = `${sectionN} of ${sectionTotal} · ${row.read_time_min} min`
    } else {
      meta = `${row.read_time_min} min`
    }
  }
  return {
    id: row.chapter_id,
    title: row.content.title,
    blurb: row.content.blurb,
    read,
    meta,
  }
}

export async function ensureReading(ownerProfileId: string): Promise<ChapterProgressRow[]> {
  const existing = await listChapterRows(ownerProfileId)
  if (existing.length >= READING_PACK.length) return existing

  const { data: reading, error: readingErr } = await supabase
    .from('readings')
    .upsert(
      { owner_profile_id: ownerProfileId, status: 'ready' },
      { onConflict: 'owner_profile_id' },
    )
    .select('id')
    .single()

  if (readingErr || !reading?.id) throw new Error(readingErr?.message ?? 'Could not start reading')

  const rows = READING_PACK.map((pack, index) => ({
    reading_id: reading.id,
    owner_profile_id: ownerProfileId,
    chapter_id: pack.id,
    sort_order: index,
    content: pack,
    word_count: countWords(pack),
    read_time_min: pack.readTimeMin,
  }))

  const { error: insertErr } = await supabase.from('reading_chapters').upsert(rows, {
    onConflict: 'reading_id,chapter_id',
    ignoreDuplicates: true,
  })
  if (insertErr) throw new Error(insertErr.message)

  return listChapterRows(ownerProfileId)
}

async function listChapterRows(ownerProfileId: string): Promise<ChapterProgressRow[]> {
  const { data, error } = await supabase
    .from('reading_chapters')
    .select(
      'id,chapter_id,sort_order,content,word_count,read_time_min,opened_at,completed_at,scroll_pct,last_section_n',
    )
    .eq('owner_profile_id', ownerProfileId)
    .order('sort_order', { ascending: true })

  if (error) throw new Error(error.message)
  return (data ?? [])
    .map((row) => mapRow(row as Record<string, unknown>))
    .filter((row): row is ChapterProgressRow => Boolean(row))
}

export async function getChapterRow(
  ownerProfileId: string,
  chapterId: string,
): Promise<ChapterProgressRow | null> {
  const id = asChapterId(chapterId)
  if (!id) return null
  const { data, error } = await supabase
    .from('reading_chapters')
    .select(
      'id,chapter_id,sort_order,content,word_count,read_time_min,opened_at,completed_at,scroll_pct,last_section_n',
    )
    .eq('owner_profile_id', ownerProfileId)
    .eq('chapter_id', id)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return data ? mapRow(data as Record<string, unknown>) : null
}

export async function markChapterOpened(rowId: string) {
  const { data, error: readErr } = await supabase
    .from('reading_chapters')
    .select('opened_at,last_section_n,scroll_pct')
    .eq('id', rowId)
    .maybeSingle()
  if (readErr) throw new Error(readErr.message)

  const patch: Record<string, unknown> = {}
  if (!data?.opened_at) patch.opened_at = new Date().toISOString()
  if (!data?.last_section_n) patch.last_section_n = 1
  if (!data?.scroll_pct) patch.scroll_pct = 8
  if (!Object.keys(patch).length) return

  const { error } = await supabase.from('reading_chapters').update(patch).eq('id', rowId)
  if (error) throw new Error(error.message)
}

export async function saveChapterProgress(input: {
  rowId: string
  scrollPct: number
  lastSectionN: number
  complete?: boolean
}) {
  const patch: Record<string, unknown> = {
    scroll_pct: Math.min(100, Math.max(0, Math.round(input.scrollPct))),
    last_section_n: Math.max(0, input.lastSectionN),
  }
  if (input.complete) {
    patch.completed_at = new Date().toISOString()
    patch.scroll_pct = 100
  }
  const { error } = await supabase.from('reading_chapters').update(patch).eq('id', input.rowId)
  if (error) throw new Error(error.message)
}

export async function ensureTodayNote(ownerProfileId: string): Promise<{
  headline: string
  sub: string
} | null> {
  const today = new Date().toISOString().slice(0, 10)
  const { data, error } = await supabase
    .from('daily_notes')
    .select('headline,sub')
    .eq('owner_profile_id', ownerProfileId)
    .eq('note_date', today)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (data?.headline) {
    const stored = String(data.headline)
    if (stored.includes('\u2014')) {
      const { error: refreshErr } = await supabase
        .from('daily_notes')
        .update({
          headline: STATIC_DAILY_NOTE.headline,
          sub: STATIC_DAILY_NOTE.sub,
        })
        .eq('owner_profile_id', ownerProfileId)
        .eq('note_date', today)
      if (refreshErr) throw new Error(refreshErr.message)
      return { headline: STATIC_DAILY_NOTE.headline, sub: STATIC_DAILY_NOTE.sub }
    }
    return {
      headline: stored,
      sub: typeof data.sub === 'string' && data.sub ? data.sub : STATIC_DAILY_NOTE.sub,
    }
  }

  const { data: inserted, error: insertErr } = await supabase
    .from('daily_notes')
    .upsert(
      {
        owner_profile_id: ownerProfileId,
        note_date: today,
        headline: STATIC_DAILY_NOTE.headline,
        sub: STATIC_DAILY_NOTE.sub,
      },
      { onConflict: 'owner_profile_id,note_date' },
    )
    .select('headline,sub')
    .single()

  if (insertErr) throw new Error(insertErr.message)
  return {
    headline: String(inserted?.headline ?? STATIC_DAILY_NOTE.headline),
    sub: typeof inserted?.sub === 'string' && inserted.sub ? inserted.sub : STATIC_DAILY_NOTE.sub,
  }
}

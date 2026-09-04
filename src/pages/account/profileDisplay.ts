import { getLocale, translate } from '@/i18n'

/** Calendar date from Postgres `date` / ISO, without UTC day-shift. */
export function formatBirthDate(iso: string | null | undefined): string | null {
  if (!iso) return null
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return null
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
  if (Number.isNaN(d.getTime())) return null
  return d.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatBirthTime(raw: string | null | undefined): string | null {
  if (!raw) return null
  const trimmed = raw.trim()
  if (!trimmed) return null
  return trimmed.slice(0, 5)
}

export function dateInputValue(iso: string | null | undefined): string {
  if (!iso) return ''
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  return m ? `${m[1]}-${m[2]}-${m[3]}` : ''
}

export function displayName(
  fullName: string | null | undefined,
  email: string | null | undefined,
): string {
  const name = fullName?.trim()
  if (name) return name
  const local = email?.split('@')[0]?.trim()
  if (local) return local
  if (getLocale() !== 'en') return translate(getLocale(), 'common.you', 'You')
  return 'You'
}

export function identityMetaLine(opts: {
  birthPlace?: string | null
  dob?: string | null
  birthTime?: string | null
}): string {
  const parts: string[] = []
  const place = opts.birthPlace?.trim()
  if (place) parts.push(place)
  const dob = formatBirthDate(opts.dob)
  if (dob) parts.push(dob)
  const time = formatBirthTime(opts.birthTime)
  if (time) parts.push(time)
  return parts.join(' · ')
}

export type QuizBirthdate = {
  day?: string | number
  month?: string | number
  year?: string | number
}

export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null
  const trimmed = email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return null
  return trimmed
}

export function parseBirthDate(raw: unknown): string | null {
  const birthdate = raw as QuizBirthdate | null
  if (birthdate?.day == null || birthdate?.month == null || birthdate?.year == null) return null

  const day = String(birthdate.day).trim()
  const month = String(birthdate.month).trim()
  const year = String(birthdate.year).trim()
  if (!day || !month || !/^\d+$/.test(day) || !/^\d+$/.test(month) || !/^\d{4}$/.test(year)) {
    return null
  }

  const y = Number(year)
  const m = Number(month)
  const d = Number(day)
  if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return null

  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export function parseBirthTime(known: unknown, time: unknown): string | null {
  if (typeof known === 'string' && known.toLowerCase() === 'no') return null
  if (typeof time !== 'string') return null
  const trimmed = time.trim()
  if (!/^\d{1,2}:\d{2}(:\d{2})?$/.test(trimmed)) return null
  const [h, m, s] = trimmed.split(':')
  const hour = Number(h)
  const minute = Number(m)
  if (hour > 23 || minute > 59) return null
  return `${String(hour).padStart(2, '0')}:${m}${s ? `:${s}` : ':00'}`
}

export function parseBirthPlace(answers: Record<string, unknown>): string | null {
  const label = typeof answers['birth-place'] === 'string' ? answers['birth-place'].trim() : ''
  if (label) return label
  const data = answers['birth-place-data'] as { label?: unknown } | undefined
  if (typeof data?.label === 'string' && data.label.trim()) return data.label.trim()
  return null
}

export function parseFullName(answers: Record<string, unknown>): string | null {
  if (typeof answers.name !== 'string') return null
  return answers.name.trim() || null
}

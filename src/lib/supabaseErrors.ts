/** PostgREST / Postgres codes for a missing table, view, or column. */
const MISSING_SCHEMA_CODES = new Set([
  'PGRST204',
  'PGRST205',
  '42P01',
  '42703',
])

export function isMissingRelationError(error: unknown): boolean {
  if (!error || typeof error !== 'object') return false
  const err = error as { code?: string; message?: string }
  if (err.code && MISSING_SCHEMA_CODES.has(err.code)) return true
  const message = (err.message ?? '').toLowerCase()
  return (
    message.includes('could not find the table') ||
    message.includes('does not exist') ||
    message.includes('schema cache')
  )
}

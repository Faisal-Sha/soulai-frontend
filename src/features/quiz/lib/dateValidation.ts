export interface BirthdateValue {
  day: string
  month: string
  year: string
}

const MIN_BIRTH_YEAR = 1900

/** Calendar-valid birthdate: real day/month/year, not in the future, year >= 1900 */
export function isValidBirthdate(d?: BirthdateValue | null): boolean {
  if (!d?.day || !d?.month || !d?.year || d.year.length !== 4) return false

  const month = Number(d.month)
  const day = Number(d.day)
  const year = Number(d.year)

  if (!Number.isInteger(month) || !Number.isInteger(day) || !Number.isInteger(year)) return false
  if (month < 1 || month > 12) return false
  if (day < 1 || day > 31) return false
  if (year < MIN_BIRTH_YEAR) return false

  // Reject impossible calendar dates (e.g. Feb 30, Apr 31)
  const date = new Date(year, month - 1, day)
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return false
  }

  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (date > today) return false

  return true
}

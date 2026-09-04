import { getLocale, translate } from '@/i18n'

export type PeopleEntryStatus = 'ready' | 'generating'

export type PeopleEntry = {
  id: string
  name: string
  /** One-line blurb under the name */
  summary: string
  status: PeopleEntryStatus
}

export function peopleListSubtitle(count: number) {
  if (count === 1) {
    const en = 'One person read against your profile.'
    return getLocale() !== 'en' ? translate(getLocale(), 'people.listSubtitle.one', en) : en
  }
  if (count === 3) {
    const en = 'Three people read against your profile.'
    return getLocale() !== 'en' ? translate(getLocale(), 'people.listSubtitle.three', en) : en
  }
  const en = `${count} people read against your profile.`
  return getLocale() !== 'en'
    ? translate(getLocale(), 'people.listSubtitle.many', en, { count })
    : en
}

export function compatHomeSummary(names: string[]) {
  if (!names.length) {
    const en = 'Add someone close to you'
    return getLocale() !== 'en' ? translate(getLocale(), 'people.compatHomeSummary.empty', en) : en
  }
  if (names.length === 1) return names[0]
  if (names.length === 2) {
    const en = `${names[0]} and ${names[1]}`
    return getLocale() !== 'en'
      ? translate(getLocale(), 'people.compatHomeSummary.two', en, { a: names[0], b: names[1] })
      : en
  }
  const extra = names.length - 2
  const en = `${names[0]}, ${names[1]} and ${extra} more`
  return getLocale() !== 'en'
    ? translate(getLocale(), 'people.compatHomeSummary.more', en, {
        a: names[0],
        b: names[1],
        n: extra,
      })
    : en
}

/** Figma preview list. `/people?people=demo` */
export const DEMO_PEOPLE: PeopleEntry[] = [
  {
    id: 'kate',
    name: 'Kate',
    summary: 'Reading you two…',
    status: 'generating',
  },
  {
    id: 'mark',
    name: 'Mark',
    summary: 'Two people who decide fast and explain slowly.',
    status: 'ready',
  },
  {
    id: 'anna',
    name: 'Anna',
    summary: 'You give her the version that is easiest to love.',
    status: 'ready',
  },
]

const DEMO_SUMMARY_KEYS: Record<string, string> = {
  kate: 'people.demo.kate',
  mark: 'people.demo.mark',
  anna: 'people.demo.anna',
}

export function getDemoPeople(): PeopleEntry[] {
  if (getLocale() === 'en') return DEMO_PEOPLE
  const locale = getLocale()
  return DEMO_PEOPLE.map((entry) => {
    const key = DEMO_SUMMARY_KEYS[entry.id]
    return key ? { ...entry, summary: translate(locale, key, entry.summary) } : entry
  })
}

export function initialFromName(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}

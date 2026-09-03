export type PeopleEntryStatus = 'ready' | 'generating'

export type PeopleEntry = {
  id: string
  name: string
  /** One-line blurb under the name */
  summary: string
  status: PeopleEntryStatus
}

export function peopleListSubtitle(count: number) {
  if (count === 1) return 'One person read against your profile.'
  if (count === 3) return 'Three people read against your profile.'
  return `${count} people read against your profile.`
}

export function compatHomeSummary(names: string[]) {
  if (!names.length) return 'Add someone close to you'
  if (names.length === 1) return names[0]
  if (names.length === 2) return `${names[0]} and ${names[1]}`
  const extra = names.length - 2
  return `${names[0]}, ${names[1]} and ${extra} more`
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

export function initialFromName(name: string): string {
  const trimmed = name.trim()
  return trimmed ? trimmed.charAt(0).toUpperCase() : '?'
}

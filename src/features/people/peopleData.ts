export type PeopleEntryStatus = 'ready' | 'generating'

export type PeopleEntry = {
  id: string
  name: string
  /** One-line blurb under the name */
  summary: string
  status: PeopleEntryStatus
}

/** Demo list — replace with listCompatibilityReports when wiring backend */
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

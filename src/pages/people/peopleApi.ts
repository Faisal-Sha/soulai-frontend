import { supabase } from '@/integrations/supabase/client'
import { DEMO_PEOPLE, type PeopleEntry, type PeopleEntryStatus } from './peopleData'
import {
  buildReportContent,
  parseReportContent,
  type StoredPeopleReport,
} from './reportContent'

export type PersonRecord = {
  id: string
  full_name: string
  birth_date: string
  birth_time: string | null
  birth_place: string | null
  status: PeopleEntryStatus
}

export type PersonReportRecord = {
  id: string
  person_id: string
  status: PeopleEntryStatus
  content: StoredPeopleReport | null
  share_token: string
}

const GENERATING_SUMMARY = 'Reading you two…'

function asStatus(raw: unknown): PeopleEntryStatus {
  return raw === 'ready' ? 'ready' : 'generating'
}

function summaryFromContent(content: StoredPeopleReport | null, status: PeopleEntryStatus) {
  if (status === 'generating') return GENERATING_SUMMARY
  const line = content?.sections[2]?.paragraphs[1] ?? content?.shareQuote
  if (!line) return 'Reading you two.'
  const sentence = line.split(/(?<=\.)\s/)[0]?.trim()
  return sentence || line.slice(0, 80)
}

export function toPeopleEntry(
  person: PersonRecord,
  content: StoredPeopleReport | null,
): PeopleEntry {
  return {
    id: person.id,
    name: person.full_name,
    status: person.status,
    summary: summaryFromContent(content, person.status),
  }
}

export async function listPeople(ownerProfileId: string): Promise<PeopleEntry[]> {
  const { data, error } = await supabase
    .from('people')
    .select('id,full_name,birth_date,birth_time,birth_place,status')
    .eq('owner_profile_id', ownerProfileId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  const rows = data ?? []
  if (!rows.length) return []

  const ids = rows.map((row) => String(row.id))
  const { data: reports, error: reportErr } = await supabase
    .from('people_reports')
    .select('person_id,content,status')
    .in('person_id', ids)

  if (reportErr) throw new Error(reportErr.message)

  const contentByPerson = new Map<string, StoredPeopleReport | null>()
  for (const report of reports ?? []) {
    contentByPerson.set(String(report.person_id), parseReportContent(report.content))
  }

  return rows.map((row) => {
    const person = mapPerson(row as Record<string, unknown>)
    return toPeopleEntry(person, contentByPerson.get(person.id) ?? null)
  })
}

export async function createPerson(input: {
  ownerProfileId: string
  fullName: string
  birthDate: string
  birthTime: string | null
  birthPlace: string | null
}): Promise<PersonRecord> {
  const { data, error } = await supabase
    .from('people')
    .insert({
      owner_profile_id: input.ownerProfileId,
      full_name: input.fullName,
      birth_date: input.birthDate,
      birth_time: input.birthTime,
      birth_place: input.birthPlace,
      status: 'generating',
    })
    .select('id,full_name,birth_date,birth_time,birth_place,status')
    .single()

  if (error || !data) throw new Error(error?.message ?? 'Could not save this person')

  const person = mapPerson(data as Record<string, unknown>)
  const { error: reportErr } = await supabase.from('people_reports').insert({
    person_id: person.id,
    owner_profile_id: input.ownerProfileId,
    status: 'generating',
  })
  if (reportErr) throw new Error(reportErr.message)
  return person
}

export async function getPerson(personId: string): Promise<PersonRecord | null> {
  const { data, error } = await supabase
    .from('people')
    .select('id,full_name,birth_date,birth_time,birth_place,status')
    .eq('id', personId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  return data ? mapPerson(data) : null
}

export async function getPersonReport(personId: string): Promise<PersonReportRecord | null> {
  const { data, error } = await supabase
    .from('people_reports')
    .select('id,person_id,status,content,share_token')
    .eq('person_id', personId)
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (!data) return null
  return {
    id: String(data.id),
    person_id: String(data.person_id),
    status: asStatus(data.status),
    content: parseReportContent(data.content),
    share_token: String(data.share_token),
  }
}

export async function markPersonReportReady(input: {
  ownerProfileId: string
  personId: string
  selfName: string
  partnerName: string
}): Promise<StoredPeopleReport> {
  const content = buildReportContent(input.selfName, input.partnerName)

  const { error: personErr } = await supabase
    .from('people')
    .update({ status: 'ready' })
    .eq('id', input.personId)
    .eq('owner_profile_id', input.ownerProfileId)

  if (personErr) throw new Error(personErr.message)

  const { data: existing } = await supabase
    .from('people_reports')
    .select('id')
    .eq('person_id', input.personId)
    .maybeSingle()

  if (existing?.id) {
    const { error } = await supabase
      .from('people_reports')
      .update({ status: 'ready', content })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase.from('people_reports').insert({
      person_id: input.personId,
      owner_profile_id: input.ownerProfileId,
      status: 'ready',
      content,
    })
    if (error) throw new Error(error.message)
  }

  return content
}

export function demoPerson(personId: string) {
  return DEMO_PEOPLE.find((p) => p.id === personId) ?? null
}

function mapPerson(row: Record<string, unknown>): PersonRecord {
  return {
    id: String(row.id),
    full_name: String(row.full_name),
    birth_date: String(row.birth_date),
    birth_time: typeof row.birth_time === 'string' ? row.birth_time : null,
    birth_place: typeof row.birth_place === 'string' ? row.birth_place : null,
    status: asStatus(row.status),
  }
}

import { supabase } from '@/integrations/supabase/client'
import { formatInsightDate } from './insightsStore'
import type { SavedInsight } from './insightsData'

export type InsightSourceKind = 'reading' | 'daily_note' | 'chat'

function mapRow(row: Record<string, unknown>): SavedInsight {
  const created = typeof row.created_at === 'string' ? row.created_at : null
  return {
    id: String(row.id),
    quote: String(row.quote),
    source: typeof row.source === 'string' ? row.source : 'Insight',
    savedAt: formatInsightDate(created ? new Date(created) : new Date()),
    clampLines: 3,
  }
}

export async function listSavedInsights(ownerProfileId: string): Promise<SavedInsight[]> {
  const { data, error } = await supabase
    .from('saved_insights')
    .select('id,quote,source,source_kind,created_at')
    .eq('owner_profile_id', ownerProfileId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []).map((row) => mapRow(row as Record<string, unknown>))
}

export async function quoteIsSaved(ownerProfileId: string, quote: string): Promise<boolean> {
  const text = quote.trim()
  if (!text) return false
  const { data, error } = await supabase
    .from('saved_insights')
    .select('id')
    .eq('owner_profile_id', ownerProfileId)
    .eq('quote', text)
    .maybeSingle()
  if (error) throw new Error(error.message)
  return Boolean(data?.id)
}

export async function saveInsight(input: {
  ownerProfileId: string
  quote: string
  source: string
  sourceKind: InsightSourceKind
}): Promise<SavedInsight | null> {
  const quote = input.quote.trim()
  if (!quote) return null

  const { data, error } = await supabase
    .from('saved_insights')
    .upsert(
      {
        owner_profile_id: input.ownerProfileId,
        quote,
        source: input.source.trim() || 'Insight',
        source_kind: input.sourceKind,
      },
      { onConflict: 'owner_profile_id,quote', ignoreDuplicates: true },
    )
    .select('id,quote,source,source_kind,created_at')
    .maybeSingle()

  if (error) throw new Error(error.message)
  if (data) return mapRow(data as Record<string, unknown>)

  const { data: existing, error: existingErr } = await supabase
    .from('saved_insights')
    .select('id,quote,source,source_kind,created_at')
    .eq('owner_profile_id', input.ownerProfileId)
    .eq('quote', quote)
    .maybeSingle()
  if (existingErr) throw new Error(existingErr.message)
  return existing ? mapRow(existing as Record<string, unknown>) : null
}

export async function deleteInsight(ownerProfileId: string, id: string) {
  const { error } = await supabase
    .from('saved_insights')
    .delete()
    .eq('id', id)
    .eq('owner_profile_id', ownerProfileId)
  if (error) throw new Error(error.message)
}

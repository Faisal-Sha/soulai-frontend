import type { SupabaseClient } from '@supabase/supabase-js'
import {
  calcDestinyMatrixFromIso,
  type DestinyMatrixValues,
} from '@/lib/destinyMatrixCalc'

export type DestinyMetricsClient = {
  from: SupabaseClient['from']
}

export async function upsertDestinyMetrics(
  client: DestinyMetricsClient,
  ownerProfileId: string,
  birthDate: string | null | undefined,
): Promise<DestinyMatrixValues | null> {
  const iso = (birthDate ?? '').trim()
  if (!iso || !ownerProfileId) return null

  const matrix = calcDestinyMatrixFromIso(iso)
  const { error } = await client.from('destiny_metrics').upsert(
    {
      owner_profile_id: ownerProfileId,
      title: 'My Destiny Matrix',
      matrix_type: 'personal',
      birth_date: iso,
      birth_date_partner: null,
      matrix_data: matrix,
    },
    { onConflict: 'owner_profile_id,matrix_type' },
  )
  if (error) throw error
  return matrix
}

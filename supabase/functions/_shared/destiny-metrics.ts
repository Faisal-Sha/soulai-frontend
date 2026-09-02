import type { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2'

function sumDigits(n: number): number {
  return String(Math.trunc(Math.abs(n)))
    .split('')
    .reduce((s, d) => s + Number(d), 0)
}

function reduceTo22(n: number): number {
  let x = Math.trunc(Math.abs(n))
  while (x > 22) x = sumDigits(x)
  return x === 0 ? 22 : x
}

function calcDestinyMatrix(isoDate: string): Record<string, number> {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim())
  if (!match) throw new Error('Birth date must be YYYY-MM-DD')
  const day = Number(match[3])
  const month = Number(match[2])
  const year = Number(match[1])
  const a = reduceTo22(day)
  const b = month
  const c = reduceTo22(sumDigits(year))
  const d = reduceTo22(a + b + c)
  const e = reduceTo22(a + b + c + d)
  const f = reduceTo22(a + b)
  const y = reduceTo22(c + d)
  const o = reduceTo22(f + y)
  const g = reduceTo22(b + c)
  const k = reduceTo22(a + d)
  const u = reduceTo22(g + k)
  const a1 = reduceTo22(a + e)
  const a2 = reduceTo22(a + a1)
  const d1 = reduceTo22(d + e)
  const d2 = reduceTo22(d + d1)
  const c1 = reduceTo22(c + e)
  const x = reduceTo22(d1 + c1)
  const x1 = reduceTo22(d1 + x)
  const c2 = reduceTo22(c + c1)
  const x2 = reduceTo22(x + c1)
  const e1 = reduceTo22(f + g + y + k)
  const e2 = reduceTo22(e + e1)
  const s1 = reduceTo22(e1 + f)
  const s2 = reduceTo22(f + s1)
  const s4 = reduceTo22(y + e1)
  const s3 = reduceTo22(y + s4)
  const p1 = reduceTo22(g + e1)
  const p2 = reduceTo22(g + p1)
  const p3 = reduceTo22(k + e1)
  const p4 = reduceTo22(k + p3)
  const b1 = reduceTo22(b + e)
  const b2 = reduceTo22(b + b1)
  const h = reduceTo22(b + d)
  const j = reduceTo22(a + c)
  const m = reduceTo22(h + j)
  const n = reduceTo22(f + y)
  const t = reduceTo22(g + k)
  const z = reduceTo22(n + t)
  const s = reduceTo22(m + z)
  const a3 = reduceTo22(a1 + e)
  const b3 = reduceTo22(b1 + e)
  const c3 = reduceTo22(c1 + e)
  const d3 = reduceTo22(d1 + e)
  const l = reduceTo22(a + b)
  const l1 = reduceTo22(a2 + b2)
  const l2 = reduceTo22(a1 + b1)
  const l3 = reduceTo22(a3 + b3)
  const l4 = reduceTo22(e + e)
  const l5 = reduceTo22(d1 + c1)
  const l6 = reduceTo22(d + c)
  return {
    a, b, c, d, e, f, y, o, g, k, u,
    a1, a2, d1, d2, c1, c2, x, x1, x2, e1, e2,
    s1, s2, s3, s4, p1, p2, p3, p4, b1, b2,
    h, j, m, n, t, z, s, a3, b3, c3, d3,
    l, l1, l2, l3, l4, l5, l6,
    healthPhysTotal: reduceTo22(a + a2 + a1 + a3 + e + c1 + c),
    healthEnergyTotal: reduceTo22(b + b2 + b1 + b3 + e + d1 + d),
    healthBalanceTotal: reduceTo22(l + l1 + l2 + l3 + l4 + l5 + l6),
    center: e, top: b, left: a, right: c, bottom: d,
    money: reduceTo22(c + a),
    love: reduceTo22(b + c),
    health: e,
  }
}

export async function upsertDestinyMetrics(
  admin: SupabaseClient,
  ownerProfileId: string,
  birthDate: string | null | undefined,
): Promise<void> {
  const iso = (birthDate ?? '').trim()
  if (!iso || !ownerProfileId) return

  const matrix = calcDestinyMatrix(iso)
  const { error } = await admin.from('destiny_metrics').upsert(
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
}

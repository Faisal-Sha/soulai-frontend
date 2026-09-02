/**
 * Matrix of Destiny calculator for V2.
 * Ported from the validated legacy engine (src/legacy/core/calc.ts + utils.ts).
 * Same geometry the agent Python calculator uses.
 */

export interface DestinyMatrixValues {
  a: number
  b: number
  c: number
  d: number
  e: number
  f: number
  y: number
  o: number
  g: number
  k: number
  u: number
  a1: number
  a2: number
  d1: number
  d2: number
  c1: number
  c2: number
  x: number
  x1: number
  x2: number
  e1: number
  e2: number
  s1: number
  s2: number
  s3: number
  s4: number
  p1: number
  p2: number
  p3: number
  p4: number
  b1: number
  b2: number
  h: number
  j: number
  m: number
  n: number
  t: number
  z: number
  s: number
  a3: number
  b3: number
  c3: number
  d3: number
  l: number
  l1: number
  l2: number
  l3: number
  l4: number
  l5: number
  l6: number
  healthPhysTotal: number
  healthEnergyTotal: number
  healthBalanceTotal: number
  center: number
  top: number
  left: number
  right: number
  bottom: number
  money: number
  love: number
  health: number
}

export type DestinyDob = { day: number; month: number; year: number }

export function sumDigits(n: number): number {
  return String(Math.trunc(Math.abs(n)))
    .split('')
    .reduce((s, d) => s + Number(d), 0)
}

export function reduceTo22(n: number): number {
  let x = Math.trunc(Math.abs(n))
  while (x > 22) x = sumDigits(x)
  return x === 0 ? 22 : x
}

export function parseBirthDate(isoDate: string): DestinyDob {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec((isoDate || '').trim())
  if (!match) throw new Error('Birth date must be YYYY-MM-DD')
  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 1900 || year > 2100) {
    throw new Error('Invalid birth date')
  }
  return { day, month, year }
}

function deriveMatrix(a: number, b: number, c: number, d: number, e: number): DestinyMatrixValues {
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
  const healthPhysTotal = reduceTo22(a + a2 + a1 + a3 + e + c1 + c)
  const healthEnergyTotal = reduceTo22(b + b2 + b1 + b3 + e + d1 + d)
  const healthBalanceTotal = reduceTo22(l + l1 + l2 + l3 + l4 + l5 + l6)
  const center = e
  const left = a
  const top = b
  const right = c
  const bottom = d
  const money = reduceTo22(right + a)
  const love = reduceTo22(top + right)
  const health = center

  return {
    a, b, c, d, e,
    f, y, o, g, k, u,
    a1, a2, d1, d2,
    c1, c2, x, x1, x2,
    e1, e2,
    s1, s2, s3, s4, p1, p2, p3, p4,
    b1, b2, h, j, m, n, t, z, s,
    a3, b3, c3, d3,
    l, l1, l2, l3, l4, l5, l6,
    healthPhysTotal, healthEnergyTotal, healthBalanceTotal,
    center, top, left, right, bottom, money, love, health,
  }
}

export function calcDestinyMatrix(dob: DestinyDob): DestinyMatrixValues {
  const a = reduceTo22(dob.day)
  const b = dob.month
  const c = reduceTo22(sumDigits(dob.year))
  const d = reduceTo22(a + b + c)
  const e = reduceTo22(a + b + c + d)
  return deriveMatrix(a, b, c, d, e)
}

export function calcDestinyMatrixFromIso(isoDate: string): DestinyMatrixValues {
  return calcDestinyMatrix(parseBirthDate(isoDate))
}

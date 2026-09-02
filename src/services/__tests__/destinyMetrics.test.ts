import { describe, expect, test } from 'vitest'
import { calcDestinyMatrix, parseBirthDate } from '@/lib/destinyMatrixCalc'

describe('destiny matrix calculator (legacy Ladini port)', () => {
  test('parses ISO birth dates', () => {
    expect(parseBirthDate('2003-09-15')).toEqual({ day: 15, month: 9, year: 2003 })
  })

  test('matches known Ladini fixtures', () => {
    const cases = [
      { dob: { day: 17, month: 1, year: 1993 }, expected: { center: 8, top: 1, left: 17, right: 22, bottom: 4, money: 12, love: 5 } },
      { dob: { day: 26, month: 7, year: 1991 }, expected: { center: 7, top: 7, left: 8, right: 20, bottom: 8, money: 10, love: 9 } },
      { dob: { day: 27, month: 7, year: 1991 }, expected: { center: 9, top: 7, left: 9, right: 20, bottom: 9, money: 11, love: 9 } },
      { dob: { day: 24, month: 5, year: 1971 }, expected: { center: 4, top: 5, left: 6, right: 18, bottom: 11, money: 6, love: 5 } },
    ]

    for (const { dob, expected } of cases) {
      const result = calcDestinyMatrix(dob)
      expect(result).toMatchObject(expected)
    }
  })
})

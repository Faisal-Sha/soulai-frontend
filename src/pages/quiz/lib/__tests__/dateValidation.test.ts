import { describe, expect, test } from 'vitest'
import { isValidBirthdate } from '../dateValidation'

describe('isValidBirthdate', () => {
  test('accepts a valid past date', () => {
    expect(isValidBirthdate({ day: '15', month: '6', year: '1990' })).toBe(true)
  })

  test('rejects impossible calendar dates', () => {
    expect(isValidBirthdate({ day: '31', month: '4', year: '1990' })).toBe(false)
    expect(isValidBirthdate({ day: '29', month: '2', year: '2023' })).toBe(false)
  })

  test('rejects years before 1900 and incomplete values', () => {
    expect(isValidBirthdate({ day: '1', month: '1', year: '1800' })).toBe(false)
    expect(isValidBirthdate({ day: '15', month: '6', year: '90' })).toBe(false)
    expect(isValidBirthdate(null)).toBe(false)
  })
})

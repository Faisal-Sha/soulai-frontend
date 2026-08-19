import { describe, expect, test } from 'vitest'
import { isMissingRelationError } from '../supabaseErrors'
import { isAdminPath, isLegacyPath, sanitizeRedirect } from '@/config/features'

describe('isMissingRelationError', () => {
  test('detects PostgREST missing-table codes', () => {
    expect(isMissingRelationError({ code: 'PGRST205', message: 'x' })).toBe(true)
    expect(isMissingRelationError({ code: '42P01', message: 'relation does not exist' })).toBe(true)
  })

  test('ignores other errors', () => {
    expect(isMissingRelationError({ code: '42501', message: 'permission denied' })).toBe(false)
    expect(isMissingRelationError(null)).toBe(false)
  })
})

describe('feature path gates', () => {
  test('classifies legacy and admin paths', () => {
    expect(isLegacyPath('/dashboard')).toBe(true)
    expect(isLegacyPath('/compatibility/report/abc')).toBe(true)
    expect(isLegacyPath('/account')).toBe(false)
    expect(isAdminPath('/admin')).toBe(true)
    expect(isAdminPath('/account')).toBe(false)
  })

  test('sends disabled legacy/admin redirects home', () => {
    expect(sanitizeRedirect(null)).toBe('/')
    expect(sanitizeRedirect('/dashboard')).toBe('/')
    expect(sanitizeRedirect('/admin')).toBe('/')
    expect(sanitizeRedirect('/account')).toBe('/account')
    expect(sanitizeRedirect('https://evil.example')).toBe('/')
  })
})

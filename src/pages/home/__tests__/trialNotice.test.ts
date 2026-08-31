import { describe, expect, test } from 'vitest'
import { isTrialEndingSoon, trialBannerCopy, trialDaysLeft } from '../trialNotice'

describe('trial ending window', () => {
  test('counts whole days until trial_end', () => {
    const now = Date.parse('2026-09-04T10:00:00.000Z')
    expect(trialDaysLeft('2026-09-07T10:00:00.000Z', now)).toBe(3)
  })

  test('is ending soon from 3 days left', () => {
    const row = {
      status: 'trialing',
      current_period_end: '2026-09-07T10:00:00.000Z',
    }
    expect(isTrialEndingSoon(row, Date.parse('2026-08-31T12:00:00.000Z'))).toBe(false)
    expect(isTrialEndingSoon(row, Date.parse('2026-09-04T10:00:00.000Z'))).toBe(true)
    expect(isTrialEndingSoon(row, Date.parse('2026-09-07T09:00:00.000Z'))).toBe(true)
  })

  test('banner names the $6.99 start date', () => {
    const copy = trialBannerCopy('2026-09-07T10:00:00.000Z', {
      now: Date.parse('2026-09-06T10:00:00.000Z'),
    })
    expect(copy.title).toBe('Your trial ends tomorrow.')
    expect(copy.detail).toMatch(/\$6\.99\/month starts/)
  })

  test('cancelled trial does not promise a charge', () => {
    const copy = trialBannerCopy('2026-09-07T10:00:00.000Z', {
      cancelled: true,
      now: Date.parse('2026-09-06T10:00:00.000Z'),
    })
    expect(copy.title).toBe('Your access ends tomorrow.')
    expect(copy.detail).toMatch(/cancelled/i)
    expect(copy.detail).not.toMatch(/\$6\.99\/month starts/)
  })
})

import { describe, expect, test } from 'vitest'
import { compatHomeSummary, peopleListSubtitle } from '../peopleData'
import { buildReportContent } from '../reportContent'

describe('people list copy', () => {
  test('home summary', () => {
    expect(compatHomeSummary([])).toBe('Add someone close to you')
    expect(compatHomeSummary(['Anna'])).toBe('Anna')
    expect(compatHomeSummary(['Anna', 'Mark'])).toBe('Anna and Mark')
    expect(compatHomeSummary(['Anna', 'Mark', 'Kate', 'Leo'])).toBe('Anna, Mark and 2 more')
  })

  test('list subtitle', () => {
    expect(peopleListSubtitle(1)).toMatch(/One person/)
    expect(peopleListSubtitle(3)).toMatch(/Three people/)
    expect(peopleListSubtitle(4)).toBe('4 people read against your profile.')
  })

  test('report swaps partner name', () => {
    const content = buildReportContent('Sam', 'Maya')
    expect(content.sections[2].paragraphs.join(' ')).toContain('Maya')
    expect(content.sections[2].paragraphs.join(' ')).not.toContain('Anna')
  })
})

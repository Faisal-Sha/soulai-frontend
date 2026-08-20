import { SAVED_INSIGHTS, type SavedInsight } from './insightsData'

const USER_KEY = 'soul-saved-insights-user'

export function formatInsightDate(d = new Date()) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

function readUserInsights(): SavedInsight[] {
  try {
    const raw = sessionStorage.getItem(USER_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as SavedInsight[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeUserInsights(items: SavedInsight[]) {
  sessionStorage.setItem(USER_KEY, JSON.stringify(items))
}

export function loadUserSavedInsights(): SavedInsight[] {
  return readUserInsights()
}

export function loadAllSavedInsights(options?: { includeDemo?: boolean }): SavedInsight[] {
  const includeDemo = options?.includeDemo ?? true
  const user = readUserInsights()
  if (!includeDemo) return user

  const userQuotes = new Set(user.map((item) => item.quote))
  const demo = SAVED_INSIGHTS.filter((item) => !userQuotes.has(item.quote))
  return [...user, ...demo]
}

export function addUserSavedInsight(input: {
  quote: string
  source: string
  clampLines?: 3 | 4
}): SavedInsight | null {
  const quote = input.quote.trim()
  if (!quote) return null

  const user = readUserInsights()
  const existing = user.find((item) => item.quote === quote)
  if (existing) return existing

  const insight: SavedInsight = {
    id: `user-${Date.now()}`,
    quote,
    source: input.source,
    savedAt: formatInsightDate(),
    ...(input.clampLines ? { clampLines: input.clampLines } : {}),
  }
  writeUserInsights([insight, ...user])
  return insight
}

export function removeUserSavedInsight(id: string) {
  writeUserInsights(readUserInsights().filter((item) => item.id !== id))
}

export function isQuoteSaved(quote: string): boolean {
  const normalized = quote.trim()
  if (!normalized) return false
  if (readUserInsights().some((item) => item.quote === normalized)) return true
  return SAVED_INSIGHTS.some((item) => item.quote === normalized)
}

export function getSavedInsightsCount(includeDemo = true): number {
  return loadAllSavedInsights({ includeDemo }).length
}

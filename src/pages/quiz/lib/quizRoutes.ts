import { QUIZ_FLOW } from '../data/quizFlow'
import { getScreenKeyFromFlow, KEY_BY_ROUTE, ROUTE_BY_KEY } from '../data/eventTaxonomy'
import type { QuizScreen } from '../types'

export function getRouteForScreen(screen: QuizScreen): string {
  const key = getScreenKeyFromFlow(screen)
  return ROUTE_BY_KEY[key] ?? '/quiz/welcome'
}

export function getRouteForIndex(idx: number): string {
  const screen = QUIZ_FLOW[idx]
  if (!screen) return '/quiz/welcome'
  return getRouteForScreen(screen)
}

export function getScreenKeyFromPath(pathname: string): string | null {
  const normalized = pathname.replace(/\/+$/, '') || '/quiz/welcome'
  if (normalized === '/quiz' || normalized === '/quiz/') {
    return 'welcome'
  }
  return KEY_BY_ROUTE[normalized] ?? null
}

export function findFlowIndexForPath(pathname: string): number {
  const key = getScreenKeyFromPath(pathname)
  if (!key) return 0
  const idx = QUIZ_FLOW.findIndex(screen => getScreenKeyFromFlow(screen) === key)
  return idx >= 0 ? idx : 0
}

export function findFlowIndexForScreenKey(screenKey: string): number {
  const idx = QUIZ_FLOW.findIndex(screen => getScreenKeyFromFlow(screen) === screenKey)
  return idx >= 0 ? idx : 0
}

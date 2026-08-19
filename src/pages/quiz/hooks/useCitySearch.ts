import { useEffect, useState } from 'react'
import { searchCities, type CitySearchResult } from '../services/citySearch'

const DEBOUNCE_MS = 400

export function useCitySearch(query: string) {
  const [results, setResults] = useState<CitySearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const trimmed = query.trim()
    if (trimmed.length < 2) {
      setResults([])
      setLoading(false)
      setError(null)
      return
    }

    const controller = new AbortController()
    setLoading(true)
    setError(null)

    const timer = window.setTimeout(() => {
      searchCities(trimmed, controller.signal)
        .then((cities) => {
          if (!controller.signal.aborted) {
            setResults(cities)
            setLoading(false)
          }
        })
        .catch((err: unknown) => {
          if (controller.signal.aborted) return
          if (err instanceof DOMException && err.name === 'AbortError') return
          setResults([])
          setLoading(false)
          setError(err instanceof Error ? err.message : 'Search failed')
        })
    }, DEBOUNCE_MS)

    return () => {
      controller.abort()
      window.clearTimeout(timer)
    }
  }, [query])

  return { results, loading, error }
}

import { useSearchParams } from 'react-router-dom'
import type { UTMParams } from '../types'

export function useUTMParams(): UTMParams {
  const [searchParams] = useSearchParams()
  return {
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
  }
}

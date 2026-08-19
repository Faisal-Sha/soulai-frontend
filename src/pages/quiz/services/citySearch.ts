export interface CitySearchResult {
  label: string
  city: string
  country?: string
  countryCode?: string
  state?: string
  latitude: number
  longitude: number
}

interface PhotonFeature {
  geometry: { coordinates: [number, number] }
  properties: {
    name?: string
    city?: string
    country?: string
    countrycode?: string
    state?: string
    county?: string
    osm_key?: string
    osm_value?: string
    type?: string
  }
}

const PLACE_VALUES = new Set(['city', 'town', 'village', 'hamlet'])

function isBirthPlaceFeature(props: PhotonFeature['properties']): boolean {
  if (props.osm_key === 'place' && props.osm_value && PLACE_VALUES.has(props.osm_value)) {
    return true
  }
  if (props.type === 'city' && props.osm_key === 'place') return true
  // Photon sometimes tags towns as type "city" with osm_value town
  if (props.osm_value && PLACE_VALUES.has(props.osm_value)) return true
  return false
}

function resolveCityName(props: PhotonFeature['properties']): string | null {
  if (isBirthPlaceFeature(props) && props.name) return props.name
  if (props.city) return props.city
  if (props.name && props.type === 'city') return props.name
  if (props.name && props.osm_key === 'place') return props.name
  return null
}

function formatCityLabel(city: string, props: PhotonFeature['properties']): string {
  const region = props.state ?? props.county
  const parts = [city, region, props.country].filter(Boolean)
  return parts.join(', ')
}

export function getCityDisplayMeta(result: CitySearchResult): string {
  const parts = [result.state, result.country].filter(Boolean)
  return parts.join(', ')
}

function normalizeFeature(feature: PhotonFeature): CitySearchResult | null {
  const { properties, geometry } = feature
  if (!geometry?.coordinates || geometry.coordinates.length !== 2) return null

  const city = resolveCityName(properties)
  if (!city) return null

  const [longitude, latitude] = geometry.coordinates
  return {
    label: formatCityLabel(city, properties),
    city,
    country: properties.country,
    countryCode: properties.countrycode?.toUpperCase(),
    state: properties.state ?? properties.county,
    latitude,
    longitude,
  }
}

function rankResult(result: CitySearchResult, feature: PhotonFeature): number {
  const props = feature.properties
  if (isBirthPlaceFeature(props)) return 0
  if (props.city) return 1
  return 2
}

/** Search cities/towns via Photon (OpenStreetMap). Min 2 chars. */
export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<CitySearchResult[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) return []

  const primary = await fetchPhoton(trimmed, signal, true)
  if (primary.length > 0) return primary

  return fetchPhoton(trimmed, signal, false)
}

async function fetchPhoton(
  query: string,
  signal: AbortSignal | undefined,
  useLayers: boolean,
): Promise<CitySearchResult[]> {
  const params = new URLSearchParams({
    q: query,
    limit: '12',
    lang: 'en',
  })
  if (useLayers) {
    params.append('layer', 'city')
    params.append('layer', 'locality')
  }

  const response = await fetch(`https://photon.komoot.io/api/?${params.toString()}`, {
    signal,
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch cities (${response.status})`)
  }

  const data = (await response.json()) as { features?: PhotonFeature[] }
  const features = data.features ?? []

  const seen = new Set<string>()
  return features
    .map((feature) => ({
      feature,
      result: normalizeFeature(feature),
    }))
    .filter((entry): entry is { feature: PhotonFeature; result: CitySearchResult } => {
      if (!entry.result) return false
      const key = entry.result.label.toLowerCase()
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .sort((a, b) => rankResult(a.result, a.feature) - rankResult(b.result, b.feature))
    .map((entry) => entry.result)
    .slice(0, 8)
}

// Type declarations for Meta Pixel, TikTok Pixel, and Yandex Metrica globals

interface Window {
  // Meta Pixel
  fbq?: {
    (
      action: 'track' | 'trackCustom' | 'init' | 'set',
      eventNameOrId: string,
      paramsOrValue?: Record<string, unknown> | string | boolean,
      optionsOrPixelId?: { eventID?: string } | string,
    ): void
    callMethod?: (...args: unknown[]) => void
    queue?: unknown[]
    loaded?: boolean
    version?: string
    push?: (...args: unknown[]) => void
  }
  _fbq?: unknown

  // TikTok Pixel
  ttq?: {
    track: (eventName: string, params?: Record<string, unknown>) => void
    identify: (params: Record<string, unknown>) => void
  }

  // Yandex Metrica
  ym?: (
    counterId: number,
    method: 'init' | 'hit' | 'reachGoal' | 'params',
    ...args: unknown[]
  ) => void
}

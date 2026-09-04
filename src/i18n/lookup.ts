export function lookup(dict: unknown, key: string): string | undefined {
  if (!key) return undefined
  let cur: unknown = dict
  for (const part of key.split('.')) {
    if (cur == null || typeof cur !== 'object') return undefined
    cur = (cur as Record<string, unknown>)[part]
  }
  return typeof cur === 'string' ? cur : undefined
}

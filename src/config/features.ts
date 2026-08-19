/** V2 safety gates. Unset or anything other than "true" is off. */

function envEnabled(
  name: 'VITE_ENABLE_ADMIN' | 'VITE_ENABLE_LEGACY_ROUTES' | 'VITE_ENABLE_AUTH',
): boolean {
  return import.meta.env[name] === 'true'
}

export const features = {
  /** Old admin dashboard (`/admin`) and `admins` table lookup. */
  admin: envEnabled('VITE_ENABLE_ADMIN'),
  /**
   * V1 screens that still hit tables/functions not in the v2 start set:
   * calculator, compatibility, avatar/dashboard/diary/notes, legacy profile.
   */
  legacyRoutes: envEnabled('VITE_ENABLE_LEGACY_ROUTES'),
  /** Require login for v2 retention screens. Off until v2 Auth is wired. */
  auth: envEnabled('VITE_ENABLE_AUTH'),
} as const

const LEGACY_PATHS = [
  '/calculator',
  '/compatibility',
  '/avatar',
  '/dashboard',
  '/diary',
  '/notes',
  '/profile',
] as const

export function isLegacyPath(pathname: string): boolean {
  return LEGACY_PATHS.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  )
}

export function isAdminPath(pathname: string): boolean {
  return pathname === '/admin' || pathname.startsWith('/admin/')
}

/** After login, send people to v2 home unless they were going somewhere still enabled. */
export function sanitizeRedirect(path: string | null | undefined): string {
  const fallback = '/'
  if (!path || !path.startsWith('/') || path.startsWith('//')) return fallback
  const pathname = path.split('?')[0] ?? path
  if (isAdminPath(pathname) && !features.admin) return fallback
  if (isLegacyPath(pathname) && !features.legacyRoutes) return fallback
  return path
}

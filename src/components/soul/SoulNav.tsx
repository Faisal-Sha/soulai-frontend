import { Link, useLocation } from 'react-router-dom'
import './soul-ui.css'
import navHome from './assets/nav-home.svg'
import navHomeActive from './assets/nav-home-active.svg'
import navReadings from './assets/nav-readings.svg'
import navReadingsActive from './assets/nav-readings-active.svg'
import navPeople from './assets/nav-people.svg'
import navPeopleActive from './assets/nav-people-active.svg'
import navProfile from './assets/nav-profile.svg'
import navProfileActive from './assets/nav-profile-active.svg'

export type SoulNavTab = 'home' | 'readings' | 'people' | 'profile'

export const SOUL_NAV_PATHS: Record<SoulNavTab, string> = {
  home: '/',
  readings: '/readings',
  people: '/people',
  profile: '/account',
}

const TABS: {
  id: SoulNavTab
  label: string
  path: string
  icon: string
  iconActive: string
}[] = [
  { id: 'home', label: 'Home', path: '/', icon: navHome, iconActive: navHomeActive },
  {
    id: 'readings',
    label: 'Readings',
    path: '/readings',
    icon: navReadings,
    iconActive: navReadingsActive,
  },
  { id: 'people', label: 'People', path: '/people', icon: navPeople, iconActive: navPeopleActive },
  {
    id: 'profile',
    label: 'Profile',
    path: '/account',
    icon: navProfile,
    iconActive: navProfileActive,
  },
]

export function soulNavTabFromPath(pathname: string): SoulNavTab | null {
  if (pathname === '/') return 'home'
  if (pathname.startsWith('/readings') || pathname.startsWith('/insights')) return 'readings'
  if (pathname.startsWith('/people')) return 'people'
  if (pathname.startsWith('/account')) return 'profile'
  return null
}

type SoulNavProps = {
  /** Override active tab. Default: inferred from the current route. */
  active?: SoulNavTab | null
  /** Dock = mobile pill. Desktop = header text+icon row (shared across app pages). */
  variant?: 'dock' | 'desktop'
  className?: string
}

/**
 * Shared app nav — same destinations on Home, Readings, People, Profile, and Chat.
 */
export function SoulNav({ active, variant = 'dock', className = '' }: SoulNavProps) {
  const { pathname } = useLocation()
  const current = active !== undefined ? active : soulNavTabFromPath(pathname)

  return (
    <nav
      className={`soul-nav${variant === 'desktop' ? ' soul-nav--desktop' : ''} ${className}`.trim()}
      aria-label="Main"
    >
      {TABS.map((tab) => {
        const isActive = current === tab.id
        return (
          <Link
            key={tab.id}
            to={tab.path}
            className={`soul-nav__item${isActive ? ' soul-nav__item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <img
              src={isActive ? tab.iconActive : tab.icon}
              alt=""
              width={variant === 'desktop' ? 18 : 20}
              height={variant === 'desktop' ? 18 : 20}
            />
            {tab.label}
          </Link>
        )
      })}
    </nav>
  )
}

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

const TABS: {
  id: SoulNavTab
  label: string
  icon: string
  iconActive: string
}[] = [
  { id: 'home', label: 'Home', icon: navHome, iconActive: navHomeActive },
  { id: 'readings', label: 'Readings', icon: navReadings, iconActive: navReadingsActive },
  { id: 'people', label: 'People', icon: navPeople, iconActive: navPeopleActive },
  { id: 'profile', label: 'Profile', icon: navProfile, iconActive: navProfileActive },
]

type SoulNavProps = {
  active?: SoulNavTab | null
  className?: string
  onChange?: (tab: SoulNavTab) => void
}

export function SoulNav({ active = 'home', className = '', onChange }: SoulNavProps) {
  return (
    <nav className={`soul-nav ${className}`.trim()} aria-label="Main">
      {TABS.map((tab) => {
        const isActive = active === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            className={`soul-nav__item${isActive ? ' soul-nav__item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onChange?.(tab.id)}
          >
            <img
              src={isActive ? tab.iconActive : tab.icon}
              alt=""
              width={20}
              height={20}
            />
            {tab.label}
          </button>
        )
      })}
    </nav>
  )
}

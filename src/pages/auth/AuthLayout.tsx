import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { SoulBrand } from '@/components/soul'
import './soul-auth.css'

type AuthLayoutProps = {
  bg: string
  name: string
  children: ReactNode
  /** Center the main block (check-email screens). */
  centered?: boolean
}

/**
 * Figma DEV · Sign in (952:6508)
 * Mobile full-bleed like quiz email; desktop centered column, no card.
 */
export function AuthLayout({ bg, name, children, centered = false }: AuthLayoutProps) {
  return (
    <div className="soul-auth" data-name={name}>
      <div className="soul-auth__bg" aria-hidden="true">
        <img className="soul-auth__bg-img" src={bg} alt="" />
        <div className="soul-auth__bg-dim" />
      </div>

      <div className="soul-auth__frame">
        <div className="soul-auth__scrim" aria-hidden="true" />

        <div className={centered ? 'soul-auth__content soul-auth__content--centered' : 'soul-auth__content'}>
          <header className="soul-auth__header">
            <Link to="/" className="soul-auth__brand-link" aria-label="Soul+AI home">
              <SoulBrand />
            </Link>
          </header>
          {children}
          <div className="soul-auth__spacer" />
        </div>
      </div>
    </div>
  )
}

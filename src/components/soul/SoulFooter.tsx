import type { HTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'

type SoulFooterProps = HTMLAttributes<HTMLElement> & {
  showDivider?: boolean
}

const NAV = [
  { to: '/contact', label: 'Support' },
  { to: '/about', label: 'About' },
  { to: '/account', label: 'Manage subscription' },
  { to: '/terms', label: 'Terms of Service' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/faq', label: 'Refund Policy' },
] as const

const SOCIAL = [
  { href: 'https://instagram.com', label: 'Instagram' },
  { href: 'https://facebook.com', label: 'Facebook' },
  { href: 'https://twitter.com', label: 'Twitter' },
  { href: 'https://youtube.com', label: 'Youtube' },
] as const

/**
 * Figma DEV · Section · Footer (1142:3577)
 */
export function SoulFooter({ className = '', showDivider = true, ...rest }: SoulFooterProps) {
  const { pathname } = useLocation()

  return (
    <footer
      className={['soul-footer', className].filter(Boolean).join(' ')}
      data-name="Section · Footer"
      {...rest}
    >
      {showDivider ? <hr className="soul-footer__divider" /> : null}
      <p className="soul-footer__tag">
        Helping you unlock your potential through ancient wisdom and modern technology.
      </p>
      <nav className="soul-footer__links" aria-label="Footer">
        {NAV.map((item) => (
          <Link key={item.to} to={item.to} aria-current={pathname === item.to ? 'page' : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
      <a className="soul-footer__email" href="mailto:support@soulplusai.com">
        support@soulplusai.com
      </a>
      <nav className="soul-footer__links" aria-label="Social">
        {SOCIAL.map((item) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
            {item.label}
          </a>
        ))}
      </nav>
      <p className="soul-footer__copy">© 2026 Soul+AI. All rights reserved.</p>
    </footer>
  )
}

import type { HTMLAttributes } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCopy } from '@/i18n'

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
const NAV_KEYS = [
  'common.footer.support',
  'common.footer.about',
  'common.footer.manageSubscription',
  'common.footer.terms',
  'common.footer.privacy',
  'common.footer.refund',
] as const

const SOCIAL_KEYS = [
  'common.footer.social.instagram',
  'common.footer.social.facebook',
  'common.footer.social.twitter',
  'common.footer.social.youtube',
] as const

export function SoulFooter({ className = '', showDivider = true, ...rest }: SoulFooterProps) {
  const { pathname } = useLocation()
  const t = useCopy()

  return (
    <footer
      className={['soul-footer', className].filter(Boolean).join(' ')}
      data-name="Section · Footer"
      {...rest}
    >
      {showDivider ? <hr className="soul-footer__divider" /> : null}
      <p className="soul-footer__tag">
        {t(
          'common.footer.tagline',
          'Helping you unlock your potential through ancient wisdom and modern technology.',
        )}
      </p>
      <nav className="soul-footer__links" aria-label="Footer">
        {NAV.map((item, i) => (
          <Link key={item.to} to={item.to} aria-current={pathname === item.to ? 'page' : undefined}>
            {t(NAV_KEYS[i], item.label)}
          </Link>
        ))}
      </nav>
      <a className="soul-footer__email" href="mailto:support@soulplusai.com">
        support@soulplusai.com
      </a>
      <nav className="soul-footer__links" aria-label="Social">
        {SOCIAL.map((item, i) => (
          <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
            {t(SOCIAL_KEYS[i], item.label)}
          </a>
        ))}
      </nav>
      <p className="soul-footer__copy">
        {t('common.footer.copyright', '© 2026 Soul+AI. All rights reserved.')}
      </p>
    </footer>
  )
}
